let core
window.onload = ()=>{

	let s = new Range({ width: 500, value: 3, class: `input`, min: 2, max: 8, scale: 6, label: `Reciprocal lattice range`, labelWidth: 180, step: .1})
	core = new Core()
	document.body.appendChild(s)
	s.data.onchange = v=>{
		core.updateScale(v)
	}

}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 800
		this.h = 600

		this.speed = .005
		this.scale = 3
		this.beauty = 256

		this.tx = false
		this.ty = false

		this.setup()
		this.addShapes()
		this.render()
	}

	updateScale(s){
		this.scale = s
		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]
			v.y = Math.sqrt(1 + 4 * Math.cos(this.scale * v.x * Math.sqrt(3) / 2) * Math.cos(this.scale * v.z / 2) + 4 * Math.cos(this.scale * v.z / 2) ** 2) / this.scale - .005
		}
		this.topGeo.computeFaceNormals()
		this.topGeo.computeVertexNormals()
		this.topSurf.geometry.elementsNeedUpdate = true
	}

	setup(){

		this.scene = new THREE.Scene()
		this.cgx = new THREE.Group()
		this.cgy = new THREE.Group()
		this.camera = new THREE.PerspectiveCamera(80, this.w / this.h, .01, 100)
		this.camera.position.set(0,0,4)
		this.camera.lookAt(0, 0, 0)
		this.cgx.rotateX(-.1)
		this.cgy.rotateY(-.5)
		this.cgx.add(this.camera)
		this.cgy.add(this.cgx)
		this.scene.add(this.cgy)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0xFFFFFF)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

		//LIGHTS
		let alight = new THREE.HemisphereLight(0xFFFFFF, 0x221155, .5)
		this.scene.add(alight)

		let dlight = new THREE.PointLight(0xffBB44, .8)
		dlight.position.set(2, 0, 0)
		this.scene.add(dlight)

		let dlight2 = new THREE.PointLight(0xAACCFF, .9)
		dlight2.position.set(-8, 0, 0)
		this.scene.add(dlight2)

		//MATERIALS
		this.normat = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors, roughness: .8})

		//CONTROLS
		this.renderer.domElement.addEventListener('mousemove', e=>{
			if (e.which) {
				this.cgy.rotateY(e.movementX * -.01)
				this.cgx.rotateX(e.movementY * -.01)
			}
		})
		this.renderer.domElement.addEventListener('touchmove', e=>{
			if (this.tx && this.ty){
				let dx = e.touches[0].clientX - this.tx
				let dy = e.touches[0].clientY - this.ty
				this.cgy.rotateY(dx * -.01)
				this.cgx.rotateX(dy * -.01)
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
			if (this.camera.position.z < 0) this.camera.position.z = 0
			if (this.camera.position.z > 4) this.camera.position.z = 4
		})

	}

	paint(g){
		for (let i = 0; i < g.faces.length; i++){
			for (let j = 0; j < 3; j++){
				let index = j === 0 ? 'a' : j === 1 ? 'b' : 'c'
				let f = g.vertices[g.faces[i][index]].y
				g.faces[i].vertexColors[j] = new THREE.Color(`rgb(255,144,130)`).lerp(new THREE.Color(`rgb(255,255,255)`), f > 1 ? 1 : f < 0 ? 0 : f)
			}
		}
	}

	addShapes(){

		this.topGeo = new THREE.PlaneGeometry(4,4,this.beauty,this.beauty)
		this.topGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]
			v.y = Math.sqrt(1 + 4 * Math.cos(this.scale * v.x * Math.sqrt(3) / 2) * Math.cos(this.scale * v.z / 2) + 4 * Math.cos(this.scale * v.z / 2) ** 2) / this.scale - .008
		}

		// this.paint(this.topGeo)
		this.topGeo.computeFaceNormals()
		this.topGeo.computeVertexNormals()
		this.topSurf = new THREE.Mesh(this.topGeo, this.normat)
		this.lowSurf = this.topSurf.clone()
		this.lowSurf.rotateX(Math.PI)
		this.scene.add(this.topSurf)
		this.scene.add(this.lowSurf)

		// let axis1 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		// this.minG.add(axis1)

		// this.scene.add(this.minG)

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

		// this.cgy.rotateY(this.speed)
		// this.cgx.rotation.x = Math.cos(performance.now() / 5000) * .1
		// this.camera.position.z = 3 + Math.cos(performance.now() / 9000) * .8

	}

}