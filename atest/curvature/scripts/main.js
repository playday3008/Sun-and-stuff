let core
// let tst = []
window.onload = ()=>{

	let m = new Range({ width: 500, value: 0, class: `input`, min: -4, max: 4, scale: 8, label: `Mass`, labelWidth: 80, step: .1})
	let sq = new Toggle({n1: `Hide Berry curvature`, n2: `Show Berry curvature`, class: `go`})
	let ve = new Toggle({n1: `Hide vectors`, n2: `Show vectors`, class: `go`})
	let en = new Toggle({n1: `Hide energy bands`, n2: `Show energy bands`, class: `go`})
	let map = new Toggle({n1: `Show mapping`, n2: `Hide mapping`, class: `go`})
	// let d = new Range({ width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 1, label: `Gap`, labelWidth: 180, step: .01})
	core = new Core()
	document.body.appendChild(m)
	document.body.appendChild(sq)
	document.body.appendChild(ve)
	document.body.appendChild(en)
	document.body.appendChild(map)
	// document.body.appendChild(d)
	let sl = false

	m.data.onchange = v=>{
		// sl = false
		// core.removeScanline()
		if (sl) map.click()
		core.m = v
		core.updateGeometry()
	}
	sq.data.onchange = v=>{
		core.square.visible = !core.square.visible
	}
	ve.data.onchange = v=>{
		core.vg.visible = !core.vg.visible
		core.svg.visible = !core.svg.visible
	}
	en.data.onchange = v=>{
		core.topSurf.visible = !core.topSurf.visible
		core.lowSurf.visible = !core.lowSurf.visible
	}
	map.data.onchange = v=>{
		if (!sl){
			sl = true
			core.animateVectors()
		} else {
			sl = false
			core.removeScanline()
		}
	}
	// d.data.onchange = v=>{
	// 	core.delta = v + 1
	// 	core.updateScale(core.scale)
	// }

}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 800
		this.h = 400

		this.speed = .005
		this.m = 0
		this.beauty = 32
		this.c_pos = light(`fire`)
		this.c_neg = light(`ice`)

		this.tx = false
		this.ty = false

		this.setup()
		this.addShapes()
		this.render()
	}

	updateScale(s){
		
	}

	setup(){

		this.scene = new THREE.Scene()
		this.camShellX = new THREE.Group()
		this.camShellY = new THREE.Group()
		this.sphereShell = new THREE.Group()
		this.bandShell = new THREE.Group()
		this.camera = new THREE.PerspectiveCamera(40, this.w / this.h, .01, 100)
		this.camera.position.set(0,3,10)
		this.camera.lookAt(0, 0, 0)
		this.bandShell.translateX(4)
		this.camShellX.rotateX(-.1)
		this.camShellY.rotateY(-.5)
		this.sphereShell.translateX(-3)
		this.sphereShell.scale.set(1.6,1.6,1.6)
		this.camShellX.add(this.camera)
		this.camShellY.add(this.camShellX)
		this.scene.add(this.camShellY)
		this.scene.add(this.sphereShell)
		this.scene.add(this.bandShell)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0xffffff)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

		//LIGHTS
		let alight = new THREE.HemisphereLight(0xFFFFFF, 0xFFDDAA, .5)
		this.scene.add(alight)

		let dlight = new THREE.PointLight(0xffBB44, .6)
		dlight.position.set(0, 0, 0)
		this.scene.add(dlight)

		let dlight2 = new THREE.PointLight(0xAACCFF, .3)
		dlight2.position.set(-15, 0, 0)
		this.scene.add(dlight2)

		//MATERIALS
		this.normat = new THREE.MeshNormalMaterial({side: THREE.DoubleSide})
		this.colormat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors})
		this.whitemat = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, roughness: 1, color: 0xDDDDDD})
		this.fillmat = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.VertexColors, transparent: true, opacity: 0})

		//CONTROLS
		this.renderer.domElement.addEventListener('mousedown', e=>{this.down = true})
		this.renderer.domElement.addEventListener('mouseup', e=>{this.down = false})
		this.renderer.domElement.addEventListener('mousemove', e=>{
			if (this.down) {
				this.camShellY.rotateY(e.movementX * -.01)
				this.camShellX.rotateX(e.movementY * -.01)
			}
		})
		this.renderer.domElement.addEventListener('touchmove', e=>{
			if (this.tx && this.ty){
				let dx = e.touches[0].clientX - this.tx
				let dy = e.touches[0].clientY - this.ty
				this.camShellY.rotateY(dx * -.01)
				this.camShellX.rotateX(dy * -.01)
			}
			this.tx = e.touches[0].clientX
			this.ty = e.touches[0].clientY
		})
		this.renderer.domElement.addEventListener('touchend', _=>{
			this.tx = this.ty = false
		})
		this.renderer.domElement.addEventListener('wheel', e=>{
			e.preventDefault()
			this.camera.position.z += e.deltaY * .01
			if (this.camera.position.z < 4) this.camera.position.z = 4
			if (this.camera.position.z > 16) this.camera.position.z = 16
		})

	}

	paint(g){
		
		for (let i = 0; i < g.faces.length; i++){
			for (let j = 0; j < 3; j++){
				let index = j === 0 ? 'a' : j === 1 ? 'b' : 'c'
				let v = g.vertices[g.faces[i][index]]
				let eps = 0.000000001//0.001


				// let gvec = this.getG(v.x, v.z)
				// let dot
				// if (Math.abs(gvec.x) < eps && Math.abs(gvec.y) < eps && Math.abs(gvec.z) < eps){
				// 	dot = 1
					
				// } else {
				// let gx = this.getG(v.x - eps, v.z)
				// let gy = this.getG(v.x, v.z - eps)
				// gx.sub(this.getG(v.x + eps, v.z))
				// gy.sub(this.getG(v.x, v.z + eps))
				// gx.normalize()
				// gy.normalize()
				// gx.cross(gy)
				// gvec.normalize()
				// dot = gvec.dot(gx)
				// }

				let gvec = this.getG(v.x, v.z).normalize()
				let gx = this.getG(v.x + eps, v.z).normalize()
				let gy = this.getG(v.x, v.z + eps).normalize()
				gx.sub(gvec).multiplyScalar(1/eps)
				gy.sub(gvec).multiplyScalar(1/eps)
				gx.cross(gy)
				let dot = gvec.dot(gx)
				dot = (Math.abs(gvec.x) < eps && Math.abs(gvec.y) < eps && Math.abs(gvec.z) < eps) ? 1 : Math.tanh(dot / 4)

				let color = dot >= 0 ? new THREE.Color(this.c_pos.rgb(dot)) : new THREE.Color(this.c_neg.rgb(1+dot))

				g.faces[i].vertexColors[j] = color
			}
		}

	}

	addShapes(){

		//Surfaces
		this.topGeo = new THREE.PlaneGeometry(Math.PI * 2, Math.PI * 2,this.beauty,this.beauty)
		this.topGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))
		this.topSurf = new THREE.Mesh(this.topGeo, this.whitemat)
		this.lowSurf = this.topSurf.clone()
		this.lowSurf.rotateX(Math.PI)
		this.bandShell.add(this.topSurf)
		this.bandShell.add(this.lowSurf)
		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]
			v.y = this.getG(v.x, v.z).length()
		}
		this.topGeo.computeFaceNormals()
		this.topGeo.computeVertexNormals()
		// this.topSurf.geometry.elementsNeedUpdate = true
		this.squareGeo = new THREE.PlaneGeometry(Math.PI * 2, Math.PI * 2, 32, 32)
		this.squareGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))
		this.square = new THREE.Mesh(this.squareGeo, this.colormat)
		this.paint(this.square.geometry)
		this.bandShell.add(this.square)

		//Sphere
		this.sphereGeo = new THREE.SphereGeometry(1, 32, 24)
		this.sphere = new THREE.Mesh(this.sphereGeo, this.whitemat)
		this.sphereShell.add(this.sphere)

		//Vectors
		this.vg = new THREE.Group()
		this.svg = new THREE.Group()
		this.bandShell.add(this.vg)
		this.sphereShell.add(this.svg)
		this.planeVectors = []
		this.sphereVectors = []
		for (let x = -Math.PI; x <= Math.PI; x += Math.PI / 12){
			for (let y = -Math.PI; y <= Math.PI; y += Math.PI / 12){

				let g = this.getG(x,y)
				let v1 = new THREE.Vector3(x, 0, y)
				let scale = 1
				let v2 = new THREE.Vector3(x + g.x * scale, g.z * scale, y + g.y * scale)
				let curve = new THREE.LineCurve3(v1,v2)
				// let tube = new THREE.TubeGeometry(curve, 4, .02, 3, true)
				// let l = new THREE.Mesh(tube, this.fillmat)
				let geo = new THREE.BufferGeometry().setFromPoints([v1, v2])
				let l = new THREE.Line(geo, new THREE.LineBasicMaterial({color:`#fff`}))

				this.vg.add(l)
				this.planeVectors.push(l)

				let s1 = new THREE.Vector3(0,0,0)
				let s2 = new THREE.Vector3(g.x, g.z, g.y).normalize()
				s2.multiply(new THREE.Vector3(3,3,3))
				let c2 = new THREE.LineCurve3(s1,s2)
				// let t2 = new THREE.TubeBufferGeometry(c2, 4, .01, 3, true)
				// let l2 = new THREE.Mesh(t2, this.fillmat)
				let geo2 = new THREE.BufferGeometry().setFromPoints([s1, s2])
				let l2 = new THREE.Line(geo2, new THREE.LineBasicMaterial({color:`#fff`}))

				this.svg.add(l2)
				this.sphereVectors.push(l2)

			}
		}

		//Scanline
		

		this.updateGeometry()

	}

	getG(x,y){
		return new THREE.Vector3(Math.sin(x), this.m - Math.cos(x) - Math.cos(y), Math.sin(y))
	}
	
	updateGeometry(){
		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]
			v.y = this.getG(v.x, v.z).length()
		}
		this.topGeo.computeFaceNormals()
		this.topGeo.computeVertexNormals()
		this.topSurf.geometry.elementsNeedUpdate = true

		this.paint(this.square.geometry)
		this.square.geometry.elementsNeedUpdate = true

		for (let i = 0; i < this.planeVectors.length; i++){
			
			let geo = this.planeVectors[i].geometry
			// let color = new THREE.Color(`#00f`).lerp(new THREE.Color(`#f00`), Math.abs(geo.attributes.position.array[0]) / Math.PI).lerp(new THREE.Color(`#0f0`), Math.abs(geo.attributes.position.array[2]) / Math.PI)
			let color = new THREE.Color(`rgb(${Math.floor(Math.abs(geo.attributes.position.array[0]) / Math.PI * 256)}, ${Math.floor(Math.abs(geo.attributes.position.array[2]) / Math.PI * 256)}, 190)`)
			let g = this.getG(geo.attributes.position.array[0],geo.attributes.position.array[2])
			geo.attributes.position.array[3] = geo.attributes.position.array[0] + g.x * .4
			geo.attributes.position.array[4] = geo.attributes.position.array[1] + g.z * .4
			geo.attributes.position.array[5] = geo.attributes.position.array[2] + g.y * .4
			geo.dispose()
			this.planeVectors[i].material.color = color

			let geo2 = this.sphereVectors[i].geometry
			g.normalize()
			geo2.attributes.position.array[3] = g.x * 1.2
			geo2.attributes.position.array[4] = g.z * 1.2
			geo2.attributes.position.array[5] = g.y * 1.2
			geo2.dispose()
			this.sphereVectors[i].material.color = color
		}
	}

	removeScanline(){
		clearInterval(this.aInt)
		if (this.scanLine) this.bandShell.remove(this.scanLine)
		if (this.targetLine) this.sphereShell.remove(this.targetLine)
	}

	initScanline(){

		this.removeScanline()

		let delta = Math.PI / 64
		let scanVectors = []
		let targetVectors = []
		let x = -Math.PI, y = -Math.PI//, dir = true
		let colors = []
		while(y <= Math.PI){
			scanVectors.push(new THREE.Vector3(x,.1,y))
			colors.push(new THREE.Color(Math.abs(x) / Math.PI, Math.abs(y) / Math.PI, .7))
			let g = this.getG(x,y)
			targetVectors.push(new THREE.Vector3(g.x,g.z,g.y).normalize().multiplyScalar(1.1))
			//x += dir ? delta : -delta
			x += delta
			if (x > Math.PI){
				//dir = !dir
				y += delta
				x = -Math.PI
				//x += dir ? delta : -delta
			}
		}
		let scanGeo = new THREE.Geometry().setFromPoints(scanVectors)
		scanGeo.colors = colors
		let targetGeo = new THREE.Geometry().setFromPoints(targetVectors)
		targetGeo.colors = colors
		this.scanLine = new THREE.Line(scanGeo, this.fillmat)
		this.targetLine = new THREE.Line(targetGeo, this.fillmat)
		this.bandShell.add(this.scanLine)
		this.sphereShell.add(this.targetLine)
		// this.scanLine.visible = false
		// this.targetLine.visible = false
		// this.targetLine.geometry.drawRange.count = 0
		// setTimeout(_=>{this.scanLine.geometry._bufferGeometry.drawRange.count = 0},0)
	}

	animateVectors(){
		// let aStep = 0
		// this.topSurf.visible = false
		// this.lowSurf.visible = false
		// this.square.visible = false
		// for (let i = 0; i < this.planeVectors.length; i++){
		// 	this.planeVectors[i].visible = false
		// 	this.sphereVectors[i].visible = false
		// }
		// let aInt = setInterval(_=>{
		// 	this.planeVectors[aStep].visible = true
		// 	this.sphereVectors[aStep].visible = true
		// 	aStep++
		// 	if (aStep >= this.planeVectors.length){
		// 		this.topSurf.visible = true
		// 		this.lowSurf.visible = true
		// 		this.square.visible = true
		// 		clearInterval(aInt)
		// 	}
		// },30)
		this.fillmat.opacity = 0
		this.initScanline()

		let i = 0
		this.aInt = setInterval(_=>{
			// this.targetLine.geometry.drawRange.count = i
			// this.scanLine.geometry.drawRange.count = i
			this.targetLine.geometry._bufferGeometry.drawRange.count = i
			this.scanLine.geometry._bufferGeometry.drawRange.count = i
			i+=20
			if (i >= this.targetLine.geometry._bufferGeometry.attributes.position.count){
				clearInterval(this.aInt)
			}
			this.fillmat.opacity = 1
		},15)

	}

	render(){

		requestAnimationFrame(this.render.bind(this))
		this.update()
		this.renderer.render(this.scene, this.camera)

	}

	update(){

		// this.sphere.geometry.faces[this.brush].vertexColors[0] = new THREE.Color(0xff0000)
		// this.sphere.geometry.faces[this.brush].vertexColors[1] = new THREE.Color(0xff0000)
		// this.sphere.geometry.faces[this.brush++].vertexColors[2] = new THREE.Color(0xff0000)
		// this.sphere.geometry.elementsNeedUpdate = true

	}

}