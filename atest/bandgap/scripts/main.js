let core
window.onload = ()=>{

	let r = new Range({ width: 400, value: -.2, class: `inputG`, min: -.5, max: .5, scale: 2, label: `Mass`, labelWidth: 120, step: .01})

	core = new Core();

	document.body.appendChild(r)

	r.data.onchange = v=>{
		core.setM(-v)
	}

}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 640
		this.h = 380

		// Visuals
		this.speed = .01

		//Data
		this.m = .2

		this.setup()
		this.addShapes()
		this.render()
		this.addLabels()
	}

	addLabels(){
		let bulk = document.createElement('div')
		bulk.style.position = `absolute`
		bulk.style.top = `70px`
		bulk.style.left = `100px`
		bulk.innerHTML = `Bulk state`
		document.body.appendChild(bulk)

		let surf = document.createElement('div')
		surf.style.position = `absolute`
		surf.style.top = `70px`
		surf.style.left = `470px`
		surf.innerHTML = `Surface state`
		document.body.appendChild(surf)
	}

	setup(){

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(40, this.w / this.h, .1, 100)
		this.camera.position.set(0,1.5,4)
		this.camera.lookAt(0, 0, 0)
		this.camera.position.set(1.5,1.5,4)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0xFFFFFF)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

		//LIGHTS
		let light = new THREE.PointLight(0xffffff, 1, 100)
		light.position.set(1, 2, 2)
		// light.position.set(1.9, .7, .5)
		this.scene.add(light)

		let light2 = new THREE.PointLight(0xffffff, 1, 100)
		light2.position.set(0, 0, 0)
		this.scene.add(light2)

		let light3 = new THREE.PointLight(0xffffff, 1, 100)
		light3.position.set(3, 0, 0)
		this.scene.add(light3)

		//MATERIALS
		this.tstMat = new THREE.MeshStandardMaterial({flatShading: true, vertexColors: THREE.VertexColors})
		this.normat = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors})
		this.boxMaterial = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors})

	}

	paint(g,m){
		for (let i = 0; i < g.faces.length; i++){
			for (let j = 0; j < 3; j++){
				let index = j === 0 ? 'a' : j === 1 ? 'b' : 'c'
				let color = new THREE.Color(`rgb(253,158,108)`).lerp(new THREE.Color(`rgb(253,15,64)`), Math.max(Math.min((m + .25) * 2, 1),0) )
				color.lerp( new THREE.Color(`#08f`), Math.max(Math.min((1 - Math.abs(m)) ** 32, 1),0) )
				let f = Math.abs(g.vertices[g.faces[i][index]].y - .2)
				g.faces[i].vertexColors[j] = color.lerp(new THREE.Color(`#112`), f)
			}
		}
	}
	paintCube(c){
		let g = c.geometry
		for (let i = 0; i < g.faces.length; i++){
			for (let j = 0; j < 3; j++){
				let index = j === 0 ? 'a' : j === 1 ? 'b' : 'c'

				let v = new THREE.Vector3(g.vertices[g.faces[i][index]].x, g.vertices[g.faces[i][index]].y, g.vertices[g.faces[i][index]].z)
				v.add(c.position)

				let iclass = (this.m * 2 + .5)
				let power = Math.abs(this.m) * 20
				let d = Math.max((v.x/.5)**power, (v.y/.75)**power, (v.z / .5)**power)
				if (this.m > 0) d = (1 - this.m)**16


				if (iclass > 1) iclass = 1; else if (iclass < 0) iclass = 0
				let color = new THREE.Color(`rgb(253,158,108)`).lerp(new THREE.Color(`rgb(253,15,64)`), iclass)
				color.lerp(new THREE.Color(`#08f`), d)
				g.faces[i].vertexColors[j] = color
			}
		}
	}

	addShapes(){

		this.g = new THREE.Group()

		//TOP PARABOLOID
		this.topGeo = new THREE.PlaneGeometry(2,2,32,32)
		this.topGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]
			let mag = Math.sqrt(v.x ** 2 + v.z ** 2)
			if (mag > .1){
			let r = Math.max(Math.abs(v.x), Math.abs(v.z))
			v.x = v.x / mag * r
			v.z = v.z / mag * r
			}
		}

		//TOP CAP
		this.topGeo.computeFaceNormals()
		this.topGeo.computeVertexNormals()
		this.topSurf = new THREE.Mesh(this.topGeo, this.normat)

		//BOTTOM
		this.botSurf = this.topSurf.clone()
		this.botSurf.rotateX(Math.PI)

		let axis2 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)

		this.g.add(axis2)
		this.g.add(this.topSurf)
		this.g.add(this.botSurf)

		//TOP SURFACE PARABOLOID
		this.topGeo2 = new THREE.PlaneGeometry(2,2,32,32)
		this.topGeo2.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.topGeo2.vertices.length; i++){
			let v = this.topGeo2.vertices[i]
			let mag = Math.sqrt(v.x ** 2 + v.z ** 2)
			if (mag > .1){
			let r = Math.max(Math.abs(v.x), Math.abs(v.z))
			v.x = v.x / mag * r
			v.z = v.z / mag * r
			}
		}

		//TOP SURFACE CAP
		this.topGeo2.computeFaceNormals()
		this.topGeo2.computeVertexNormals()
		this.topSurf2 = new THREE.Mesh(this.topGeo2, this.normat)
		this.topSurf2.position.set(6,0,0)

		//BOTTOM SURFACE
		this.botSurf2 = this.topSurf2.clone()
		this.botSurf2.rotateX(Math.PI)

		let axis3 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		axis3.position.set(6,0,0)

		this.g.add(axis3)
		this.g.add(this.topSurf2)
		this.g.add(this.botSurf2)

		this.g.scale.set(.5, .5, .5)
		this.scene.add(this.g)

		//Box
		this.bg = new THREE.Group()
		this.boxes = []
		this.boxGeo = new THREE.BoxGeometry(.5,.5,.5,5, 5, 5)

		let box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.position.set(.25,0,-.25)
		// this.bg.add(box)
		// this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.scale.set(-1,-1,-1)
		box.position.set(-.25,0,-.25)
		this.bg.add(box)
		this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.scale.set(1,-1,1)
		box.position.set(.25,0,.25)
		this.bg.add(box)
		this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.scale.set(-1,-1,1)
		box.position.set(-.25,0,.25)
		this.bg.add(box)
		this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.scale.set(1,1,-1)
		box.position.set(.25,.5,-.25)
		this.bg.add(box)
		this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.scale.set(-1,1,-1)
		box.position.set(-.25,.5,-.25)
		this.bg.add(box)
		this.boxes.push(box)

		box = new THREE.Mesh(this.boxGeo, this.tstMat)
		box.position.set(.25,.5,.25)
		this.bg.add(box)
		this.boxes.push(box)

		this.bg.position.set(1.5,0,0)
		this.bg.rotateY(.5)
		this.scene.add(this.bg)

		this.updateSurfaces()

	}

	setM(m){
		this.m = m
		this.updateSurfaces()
	}

	updateSurfaces(){
		for (let i = 0; i < this.topSurf.geometry.vertices.length; i++){
			let v = this.topSurf.geometry.vertices[i]
			v.y = Math.sqrt(v.x ** 2 + v.z ** 2 + Math.abs(this.m))
		}

		for (let i = 0; i < this.boxes.length; i++){
			this.paintCube(this.boxes[i])
			this.boxes[i].geometry.elementsNeedUpdate = true
		}
		
		this.paint(this.topSurf.geometry, this.m)
		// if (this.m >= 0) {
			for (let i = 0; i < this.topSurf2.geometry.vertices.length; i++){
				let v = this.topSurf2.geometry.vertices[i]
				v.y = Math.sqrt(v.x ** 2 + v.z ** 2 + Math.abs(this.m >= 0 ? this.m : 0))
			}
			this.paint(this.topSurf2.geometry, this.m >= 0 ? this.m : 0)
			this.topSurf2.geometry.elementsNeedUpdate = true
		// }
		
		this.topSurf.geometry.elementsNeedUpdate = true
		
	}
	
	getScreenUV(v){
		v = v.clone()
		v.project(this.camera)
		return {x: v.x * .5 + .5, y: -v.y * .5 + .5}
	}

	render(){

		requestAnimationFrame(this.render.bind(this))
		this.update()
		this.renderer.render(this.scene, this.camera)

	}

	update(){
		// this.bg.rotateY(.01)
	}

}