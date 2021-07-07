let core
window.onload = ()=>{

	let t = new Range({ width: 400, value: 0, class: `input`, min: 0, max: 5, scale: 1, label: `Complexity`, labelWidth: 160, step: 1})
	let v = new Toggle({n1: `Hide vertices`, n2: `Show vertices`, class: `toggle`})
	let e = new Toggle({n1: `Hide edges`, n2: `Show edges`, class: `toggle`})
	let f = new Toggle({n1: `Hide faces`, n2: `Show faces`, class: `toggle`})

	core = new Core();
	document.body.appendChild(t)
	document.body.appendChild(v)
	document.body.appendChild(e)
	document.body.appendChild(f)

	t.data.onchange = v=>{
		core.updateTorus(v)
		core.updateSphere(v)
	}
	v.data.onchange = v=>{
		core.toggleVertices(!core.spherePoints.visible)
	}
	e.data.onchange = v=>{
		core.toggleEdges(!core.sphereWire.visible)
	}
	f.data.onchange = v=>{
		core.toggleFaces(!core.sphere.visible)
	}
}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 640
		this.h = 480

		this.setup()
		this.addLabels()
		this.addShapes()
		this.render()
	}

	addLabels(){
		this.sLabel = document.createElement(`div`)
		this.sLabel.style.position = `absolute`
		this.sLabel.style.width = this.w / 2 + `px`
		this.sLabel.style.top = this.h / 1.2 + `px`
		this.sLabel.style.left = `0px`
		this.sLabel.style.textAlign = `center`
		this.sLabel.style.color = `#fff`
		this.sLabel.innerText = `123`
		document.body.appendChild(this.sLabel)

		this.tLabel = document.createElement(`div`)
		this.tLabel.style.position = `absolute`
		this.tLabel.style.width = this.w / 2 + `px`
		this.tLabel.style.top = this.h / 1.2 + `px`
		this.tLabel.style.left = this.w * .5 + `px`
		this.tLabel.style.textAlign = `center`
		this.tLabel.style.color = `#fff`
		this.tLabel.innerText = `123`
		document.body.appendChild(this.tLabel)
	}

	setup(){

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(50, this.w / this.h, .1, 100)
		this.camera.position.set(0,-5,2)
		this.camera.lookAt(0, 0, 0)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0x111122)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

	}

	addShapes(){

		let alight = new THREE.HemisphereLight(0x5587AC, 0x664422, .6)
		this.scene.add(alight)

		let dlight = new THREE.DirectionalLight(0xffffee, .8)
		dlight.position.set(-1, -1, 1)
		this.scene.add(dlight)

		this.material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
		this.material.flatShading = true

		this.pointMat = new THREE.PointsMaterial({color: 0xFF2459, size: .1})
		this.pointMat.depthTest = false

		this.lineMat = new THREE.LineBasicMaterial({color: 0x99FF69})
		this.lineMat.depthTest = false

		this.sg = new THREE.Group()
		this.tg = new THREE.Group()
		this.sg.position.set(-1.5, 0, 0)
		this.tg.position.set(1.5, 0, 0)
		this.scene.add(this.sg)
		this.scene.add(this.tg)

		this.updateTorus(0)
		this.updateSphere(0)

	}

	updateTorus(n){
		if (n%1 === 0 && n < 8){
			let v1 = true
			let v2 = true
			let v3 = true
			if (this.torusGeometry){
				v1 = this.torus.visible
				v2 = this.torusPoints.visible
				v3 = this.torusWire.visible
				this.tg.remove(this.torus)
				this.tg.remove(this.torusWire)
				this.tg.remove(this.torusPoints)
			}
			this.torusGeometry = new THREE.TorusGeometry(1, .4, 2**n + 2, 2*2**n + 2)
			this.torus = new THREE.Mesh(this.torusGeometry, this.material)
			this.tg.add(this.torus)
			this.torus.visible = v1

			this.torusPoints = new THREE.Points(this.torusGeometry, this.pointMat)
			this.tg.add(this.torusPoints)
			this.torusPoints.visible = v2

			let wire = new THREE.WireframeGeometry(this.torusGeometry)
			this.torusWire = new THREE.LineSegments(wire, this.lineMat)
			this.tg.add(this.torusWire)
			this.torusWire.visible = v3

			this.tLabel.innerHTML = `<span style="color:#FF2459">${this.torusGeometry.vertices.length}</span> – <span style="color:#99FF69">${this.torusGeometry.vertices.length + this.torusGeometry.faces.length}</span> + <span style="color:#FEFAE3">${this.torusGeometry.faces.length}</span> = 0`
		}


	}

	updateSphere(n){

		if (n%1 === 0 && n < 8){
			let v1 = true
			let v2 = true
			let v3 = true
			if (this.sphereGeometry){
				v1 = this.sphere.visible
				v2 = this.spherePoints.visible
				v3 = this.sphereWire.visible
				this.sg.remove(this.sphere)
				this.sg.remove(this.sphereWire)
				this.sg.remove(this.spherePoints)
			}
			this.sphereGeometry = new THREE.TetrahedronGeometry(1.2, n)
			this.sphere = new THREE.Mesh(this.sphereGeometry, this.material)
			this.sg.add(this.sphere)
			this.sphere.visible = v1

			this.spherePoints = new THREE.Points(this.sphereGeometry, this.pointMat)
			this.spherePoints.scale.set(1.01, 1.01, 1.01)
			this.sg.add(this.spherePoints)
			this.spherePoints.visible = v2

			let wire = new THREE.WireframeGeometry(this.sphereGeometry)
			this.sphereWire = new THREE.LineSegments(wire, this.lineMat)
			this.sg.add(this.sphereWire)
			this.sphereWire.visible = v3

			this.sLabel.innerHTML = `<span style="color:#FF2459">${this.sphereGeometry.vertices.length}</span> – <span style="color:#99FF69">${this.sphereGeometry.faces.length + this.sphereGeometry.vertices.length - 2}</span> + <span style="color:#FEFAE3">${this.sphereGeometry.faces.length}</span> = 2`
		}


	}

	toggleEdges(on){
		if (on){
			this.torusWire.visible = true
			this.sphereWire.visible = true
		} else {
			this.torusWire.visible = false
			this.sphereWire.visible = false
		}
		
	}

	toggleVertices(on){
		if (on){
			this.torusPoints.visible = true
			this.spherePoints.visible = true
		} else {
			this.torusPoints.visible = false
			this.spherePoints.visible = false
		}
	}
	toggleFaces(on){
		if (on){
			this.torus.visible = true
			this.sphere.visible = true
		} else {
			this.torus.visible = false
			this.sphere.visible = false
		}
	}

	render(){

		requestAnimationFrame(this.render.bind(this))
		this.update()
		this.renderer.render(this.scene, this.camera)

	}

	update(){

		this.tg.rotateX(.006)
		this.tg.rotateY(.002)

		this.sg.rotateX(.006)
		this.sg.rotateY(.002)

	}

}