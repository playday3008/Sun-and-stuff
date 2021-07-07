let core
window.onload = ()=>{

	// let f = new Range({ width: 500, value: .5, class: `input`, min: 0, max: 1, scale: 1, label: `Arrangement`, labelWidth: 180, step: .001, formula: v=>v===0?`Diamond`:`Graphite`})
	// let d = new Range({ width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 1, label: `Gap`, labelWidth: 180, step: .1})
	core = new Core()
	
	// document.body.appendChild(f)
	// document.body.appendChild(d)
	// f.data.onchange = v=>{
	// 	core.updateLattice(v)
	// }
	// d.data.onchange = v=>{
	// 	core.delta = v + 1
	// 	core.updateScale(core.scale)
	// }

}

class Core {

	constructor(){
		this.ratio = devicePixelRatio || 1
		this.w = 800
		this.h = 600

		this.tx = false
		this.ty = false

		this.setup()
		this.addShapes()
		this.render()
	}

	tst(){

		//Dupe
		for (let x = -1; x <= 0; x++){
			for (let y = -1; y <= 0; y++){
				for (let z = -1; z <= 0; z++){
					
					for (let i = 0; i < pre_coords.length; i++){

						const a = pre_coords[i][0] + x
						const b = pre_coords[i][1] + y
						const c = pre_coords[i][2] + z
						const t = pre_type[i]

						type.push(t)
						coords.push([a,b,c])

					}

				}
			}	
		}

		//CLONES
		for (let i = 0; i < coords.length; i++){
			for (let j = i + 1; j < coords.length; j++){
				
				if (coords[i][0] === coords[j][0] && coords[i][1] === coords[j][1] && coords[i][2] === coords[j][2]){

					coords.splice(j,1)
					type.splice(j,1)
					j--

				}
			}
		}

		//LINKS
		for (let i = 0; i < coords.length; i++){
			for (let j = i + 1; j < coords.length; j++){
				
				const d = ((coords[i][0] - coords[j][0]) ** 2 + (coords[i][1] - coords[j][1]) ** 2 + (coords[i][2] - coords[j][2]) ** 2) ** .5
				if (d < .5){
					links.push([i,j])
				}

			}
		}
	}

	setup(){

		this.scene = new THREE.Scene()
		this.cgx = new THREE.Group()
		this.cgy = new THREE.Group()
		this.camera = new THREE.PerspectiveCamera(80, this.w / this.h, .01, 100)
		// this.camera = new THREE.OrthographicCamera(-4,4,-4,4,.1,100)
		this.camera.position.set(0,0,3)
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

		let dlight = new THREE.PointLight(0xffFFFF, .6)
		dlight.position.set(2, 0, 0)
		this.scene.add(dlight)

		let dlight2 = new THREE.PointLight(0xAACCFF, .7)
		dlight2.position.set(-8, 0, 0)
		this.scene.add(dlight2)

		//MATERIALS
		const loader = new THREE.TextureLoader()
		const env = loader.load('sic_lattice/img/ref.png')
		env.mapping = THREE.EquirectangularReflectionMapping
		env.encoding = THREE.sRGBEncoding

		this.carbonMaterial = new THREE.MeshLambertMaterial({envMap: env, color: `#777`, combine: THREE.AddOperation, reflectivity: .9})
		this.siliconMaterial = new THREE.MeshLambertMaterial({envMap: env, color: `#FFF`, combine: THREE.AddOperation, reflectivity: .9})
		this.linkMaterial = new THREE.MeshLambertMaterial({color: `#FFF`})

		//CONTROLS
		this.renderer.domElement.addEventListener('mousedown', e=>{this.down = true})
		this.renderer.domElement.addEventListener('mouseup', e=>{this.down = false})
		this.renderer.domElement.addEventListener('mousemove', e=>{
			if (this.down) {
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

	updateLattice(f){

		
		const posF = Math.min(Math.max((f / 10 * 12) - .1, 0), 1)
		const ff = (Math.cos(Math.PI * (posF * 2 + 1)) + 1) / 2

		for (let i = 0; i < this.stuff.length; i++){

			const a = this.stuff[i]

			a.position.lerpVectors(a.dPosition, a.gPosition, posF)
			a.position.multiplyScalar(1 + ff * 1)
			a.mesh.position.copy(a.position)

		}

		const opacityD = Math.max(1 - f * 10, 0)
		const opacityG = Math.max((f - .9) * 10, 0)

		this.linkMaterialD.opacity = opacityD
		this.linkMaterialG.opacity = opacityG

	}

	addLink(a1, a2, s , mat){

		const v1 = a1.position.clone()
		const v2 = a2.position.clone()

		const distance = v1.distanceTo(v2)
		const position  = v2.clone().add(v1).divideScalar(2)
		const strength = s * .03

		const cGeo = new THREE.CylinderGeometry(strength, strength,distance,10,10,false);

		const orientation = new THREE.Matrix4()
		const offsetRotation = new THREE.Matrix4()
		const offsetPosition = new THREE.Matrix4()
		orientation.lookAt(v1,v2,new THREE.Vector3(0,1,0))
		offsetRotation.makeRotationX(Math.PI * .5)
		orientation.multiply(offsetRotation)
		cGeo.applyMatrix4(orientation)

		const mesh = new THREE.Mesh(cGeo, mat)
		mesh.position.copy(position)
		this.scene.add(mesh)

		return mesh

	}

	setupAtoms(){

		this.stuff = []
		const carbonGeo = new THREE.SphereGeometry(.12, 48, 32)
		const siliconGeo = new THREE.SphereGeometry(.2, 48, 32)

		const type = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1]
		const coords = [[-1,-1,0],[0,-1,-1],[-1,0,-1],[0,0,0],[-0.5,-1,-0.5],[-0.5,0,-0.5],[-1,-0.5,-0.5],[-0.5,-0.5,-1],[0,-0.5,-0.5],[-0.5,-0.5,0],[-0.25,-0.75,-0.75],[-0.75,-0.75,-0.25],[-0.75,-0.25,-0.75],[-0.25,-0.25,-0.25],[-1,-1,1],[0,-1,0],[-1,0,0],[0,0,1],[-0.5,-1,0.5],[-0.5,0,0.5],[-1,-0.5,0.5],[0,-0.5,0.5],[-0.5,-0.5,1],[-0.25,-0.75,0.25],[-0.75,-0.75,0.75],[-0.75,-0.25,0.25],[-0.25,-0.25,0.75],[0,0,-1],[-1,1,-1],[0,1,0],[-0.5,1,-0.5],[-1,0.5,-0.5],[-0.5,0.5,-1],[0,0.5,-0.5],[-0.5,0.5,0],[-0.25,0.25,-0.75],[-0.75,0.25,-0.25],[-0.75,0.75,-0.75],[-0.25,0.75,-0.25],[-1,0,1],[-1,1,0],[0,1,1],[-0.5,1,0.5],[-1,0.5,0.5],[0,0.5,0.5],[-0.5,0.5,1],[-0.25,0.25,0.25],[-0.75,0.25,0.75],[-0.75,0.75,0.25],[-0.25,0.75,0.75],[1,-1,-1],[1,0,0],[0.5,-1,-0.5],[0.5,0,-0.5],[0.5,-0.5,-1],[1,-0.5,-0.5],[0.5,-0.5,0],[0.75,-0.75,-0.75],[0.25,-0.75,-0.25],[0.25,-0.25,-0.75],[0.75,-0.25,-0.25],[0,-1,1],[1,-1,0],[1,0,1],[0.5,-1,0.5],[0.5,0,0.5],[1,-0.5,0.5],[0.5,-0.5,1],[0.75,-0.75,0.25],[0.25,-0.75,0.75],[0.25,-0.25,0.25],[0.75,-0.25,0.75],[1,0,-1],[0,1,-1],[1,1,0],[0.5,1,-0.5],[0.5,0.5,-1],[1,0.5,-0.5],[0.5,0.5,0],[0.75,0.25,-0.75],[0.25,0.25,-0.25],[0.25,0.75,-0.75],[0.75,0.75,-0.25],[1,1,1],[0.5,1,0.5],[1,0.5,0.5],[0.5,0.5,1],[0.75,0.25,0.25],[0.25,0.25,0.75],[0.25,0.75,0.25],[0.75,0.75,0.75]]
		const links = [[0,11],[1,10],[2,12],[3,13],[3,46],[3,70],[3,80],[4,10],[4,11],[5,12],[5,13],[5,35],[5,36],[6,11],[6,12],[7,10],[7,12],[8,10],[8,13],[8,58],[8,59],[9,11],[9,13],[9,23],[9,25],[14,24],[15,23],[15,58],[16,25],[16,36],[17,26],[17,88],[18,23],[18,24],[19,25],[19,26],[19,46],[19,47],[20,24],[20,25],[21,23],[21,26],[21,69],[21,70],[22,24],[22,26],[27,35],[27,59],[28,37],[29,38],[29,89],[30,37],[30,38],[31,36],[31,37],[32,35],[32,37],[33,35],[33,38],[33,80],[33,81],[34,36],[34,38],[34,46],[34,48],[39,47],[40,48],[41,49],[42,48],[42,49],[43,47],[43,48],[44,46],[44,49],[44,88],[44,89],[45,47],[45,49],[50,57],[51,60],[51,87],[52,57],[52,58],[53,59],[53,60],[53,79],[53,80],[54,57],[54,59],[55,57],[55,60],[56,58],[56,60],[56,68],[56,70],[61,69],[62,68],[63,71],[64,68],[64,69],[65,70],[65,71],[65,87],[65,88],[66,68],[66,71],[67,69],[67,71],[72,79],[73,81],[74,82],[75,81],[75,82],[76,79],[76,81],[77,79],[77,82],[78,80],[78,82],[78,87],[78,89],[83,90],[84,89],[84,90],[85,87],[85,90],[86,88],[86,90]]

		for (let i = 0; i < coords.length; i++){

			const atom = {
				position: new THREE.Vector3(coords[i][0], coords[i][1], coords[i][2]),
				mesh: new THREE.Mesh(type[i] ? siliconGeo : carbonGeo, type[i] ? this.siliconMaterial : this.carbonMaterial),
				links: []
			}

			atom.mesh.position.copy(atom.position)
			this.scene.add(atom.mesh)
			this.stuff.push(atom)

		}

		//CYLINDERS
		for (let i = 0; i < links.length; i++){

			const a1 = this.stuff[links[i][0]]
			const a2 = this.stuff[links[i][1]]

			a1.links.push({to: a2, mesh: this.addLink(a1, a2, .8, this.linkMaterial), strength: .8})

		}

	}

	addShapes(){

		this.setupAtoms()

	}
	
	getScreenUV(v){
		v = v.clone()
		v.project(this.camera)
		return {x: v.x * .5 + .5, y: -v.y * .5 + .5}
	}

	render(){

		requestAnimationFrame(this.render.bind(this))
		this.renderer.render(this.scene, this.camera)

	}


}