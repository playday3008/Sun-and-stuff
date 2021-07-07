let core
window.onload = ()=>{

	core = new Core();

}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 800
		this.h = 300

		this.speed = .01

		this.setup()
		this.addShapes()
		this.render()
		this.addLabels()
	}

	addLabels(){
		this.lMin = document.createElement(`div`)
		this.lMin.style.position = `absolute`
		let xy = this.getScreenUV(new THREE.Vector3(-3, 1.8, 0))
		this.lMin.style.top = xy.y * this.h + `px`
		this.lMin.style.left = xy.x * this.w + `px`
		this.lMin.style.transform = `translate(-50%,0)`
		this.lMin.style.color = `#fff`
		this.lMin.innerText = `Local minimum`
		document.body.appendChild(this.lMin)

		this.lMax = document.createElement(`div`)
		this.lMax.style.position = `absolute`
		xy = this.getScreenUV(new THREE.Vector3(0, 1.8, 0))
		this.lMax.style.top = xy.y * this.h + `px`
		this.lMax.style.left = xy.x * this.w + `px`
		this.lMax.style.transform = `translate(-50%,0)`
		this.lMax.style.color = `#fff`
		this.lMax.innerText = `Local maximum`
		document.body.appendChild(this.lMax)

		this.lSad = document.createElement(`div`)
		this.lSad.style.position = `absolute`
		xy = this.getScreenUV(new THREE.Vector3(3, 1.8, 0))
		this.lSad.style.top = xy.y * this.h + `px`
		this.lSad.style.left = xy.x * this.w + `px`
		this.lSad.style.transform = `translate(-50%,0)`
		this.lSad.style.color = `#fff`
		this.lSad.innerText = `Saddle point`
		document.body.appendChild(this.lSad)

	}


	setup(){

		this.scene = new THREE.Scene()
		// this.camera = new THREE.PerspectiveCamera(40, this.w / this.h, .1, 100)
		this.camera = new THREE.OrthographicCamera(this.w / -160, this.w / 160, this.h / 160, this.h / -160, .1, 100)
		this.camera.position.set(0,3,5)
		this.camera.lookAt(0, 0, 0)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0x111122)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

		//LIGHTS
		// let alight = new THREE.HemisphereLight(0xA66464, 0x2211AA, .9)
		// this.scene.add(alight)
		// let dlight = new THREE.DirectionalLight(0xffffFF, .4)
		// dlight.position.set(16, 6, 16)
		// this.scene.add(dlight)

		//MATERIALS
		this.normat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.VertexColors})

	}

	paint(g){
		for (let i = 0; i < g.faces.length; i++){
			for (let j = 0; j < 3; j++){
				let index = j === 0 ? 'a' : j === 1 ? 'b' : 'c'
				let f = g.vertices[g.faces[i][index]].y
				g.faces[i].vertexColors[j] = new THREE.Color(`rgb(221,73,104)`).lerp(new THREE.Color(`rgb(253,158,108)`), (f+1) * 1.2)
			}
		}
	}

	addShapes(){

		//Minimum
		this.minG = new THREE.Group()
		this.minG.position.set(-3, 0, 0)
		this.minGeo = new THREE.PlaneGeometry(2,2,64,64)
		this.minGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.minGeo.vertices.length; i++){
			let v = this.minGeo.vertices[i]
			v.y = v.x ** 2 + v.z ** 2 - 1
		}

		this.paint(this.minGeo)
		this.minGeo.computeFaceNormals()
		this.minGeo.computeVertexNormals()
		this.minSurf = new THREE.Mesh(this.minGeo, this.normat)
		this.minG.add(this.minSurf)

		let axis1 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		this.minG.add(axis1)

		this.scene.add(this.minG)

		//Maximum
		this.maxG = new THREE.Group()
		this.maxG.position.set(0, 0, 0)
		this.maxGeo = new THREE.PlaneGeometry(2,2,64,64)
		this.maxGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.maxGeo.vertices.length; i++){
			let v = this.maxGeo.vertices[i]
			v.y = (v.x ** 2 + v.z ** 2) * -1 + 1
		}

		this.paint(this.maxGeo)

		this.maxGeo.computeFaceNormals()
		this.maxGeo.computeVertexNormals()

		this.maxSurf = new THREE.Mesh(this.maxGeo, this.normat)
		this.maxG.add(this.maxSurf)

		let axis2 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		this.maxG.add(axis2)

		this.scene.add(this.maxG)

		//Saddle
		this.sadG = new THREE.Group()
		this.sadG.position.set(3, 0, 0)
		this.sadGeo = new THREE.PlaneGeometry(2,2,64,64)
		this.sadGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		for (let i = 0; i < this.sadGeo.vertices.length; i++){
			let v = this.sadGeo.vertices[i]
			v.y = (v.x ** 2 - v.z ** 2) * -1
		}

		this.paint(this.sadGeo)

		this.sadGeo.computeFaceNormals()
		this.sadGeo.computeVertexNormals()

		this.sadSurf = new THREE.Mesh(this.sadGeo, this.normat)
		this.sadG.add(this.sadSurf)

		let axis3 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		this.sadG.add(axis3)

		this.scene.add(this.sadG)

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

		this.minG.rotateY(this.speed)
		this.maxG.rotateY(this.speed)
		this.sadG.rotateY(this.speed)

	}

}