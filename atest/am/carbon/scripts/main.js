let core
window.onload = ()=>{

	let f = new Range({ width: 500, value: .5, class: `input`, min: 0, max: 1, scale: 1, label: `Arrangement`, labelWidth: 180, step: .001, formula: v=>v===0?`Diamond`:`Graphite`})
	// let d = new Range({ width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 1, label: `Gap`, labelWidth: 180, step: .1})
	core = new Core()
	
	document.body.appendChild(f)
	// document.body.appendChild(d)
	f.data.onchange = v=>{
		core.updateLattice(v)
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
		this.h = 600

		this.speed = .005
		this.scale = 3
		this.delta = 1
		this.beauty = 128

		this.tx = false
		this.ty = false

		this.tst

		this.setup()
		this.tst()
		this.addShapes()
		this.render()
	}

	tst(){

		let mult = .43
		
		// let a = [[0,0,0],[0,0,1],[.8660254,0,-.5], [-.8660254,0,-.5]]

		// const add = []
		// for (let x = -1; x < 2; x++){
		// 	for (let j = 0; j < a.length; j++){
		// 		add.push([a[j][0] + 1.732051 * x, a[j][1], a[j][2]])
		// 	}
		// }
		// a = a.concat(add)

		// console.log(JSON.stringify(a))


		let a = [[-0.272609078,0,0.645],[-0.645,0,0.43],[-0.645,0,0],[-0.272609078,0,-0.215],[-1.017390922,0,0.645],[-1.38978193,0,0.43],[-1.38978193,0,0],[-1.017390922,0,-0.215],[0.47217285200000003,0,0.645],[0.09978193,0,0.43],[0.09978193,0,0],[0.47217285200000003,0,-0.215],[1.2169547820000002,0,0.645],[0.8445638599999999,0,0.43],[0.8445638599999999,0,0],[1.2169547820000002,0,-0.215],[-1.017390922,0,-0.645],[-0.645,0,-0.86],[-1.762172852,0,-0.215],[-1.762172852,0,-0.645],[-1.38978193,0,-0.86],[-0.272609078,0,-0.645],[0.09978193,0,-0.86],[0.4721729380000001,0,-0.645],[0.8445638599999999,0,-0.86],[1.2169547820000002,0,-0.645],[1.589345704,0,0],[1.589345704,0,0.43],[0.09978184399999995,1.29,0.86],[-0.272609078,1.29,0.645],[-0.272609078,1.29,0.215],[0.09978184399999995,1.29,0],[-0.645,1.29,0.86],[-1.017391008,1.29,0.645],[-1.017391008,1.29,0.215],[-0.645,1.29,0],[0.8445637739999999,1.29,0.86],[0.47217285200000003,1.29,0.645],[0.47217285200000003,1.29,0.215],[0.8445637739999999,1.29,0],[1.589345704,1.29,0.86],[1.2169547820000002,1.29,0.645],[1.2169547820000002,1.29,0.215],[1.589345704,1.29,0],[-0.645,1.29,-0.43],[-0.272609078,1.29,-0.645],[-1.38978193,1.29,0],[-1.38978193,1.29,-0.43],[-1.017391008,1.29,-0.645],[0.09978184399999995,1.29,-0.43],[0.47217285200000003,1.29,-0.645],[0.8445638599999999,1.29,-0.43],[1.2169547820000002,1.29,-0.645],[1.589345704,1.29,-0.43],[1.961736626,1.29,0.215],[1.961736626,1.29,0.645],[0.09978184399999995,-1.29,0.86],[-0.272609078,-1.29,0.645],[-0.272609078,-1.29,0.215],[0.09978184399999995,-1.29,0],[-0.645,-1.29,0.86],[-1.017391008,-1.29,0.645],[-1.017391008,-1.29,0.215],[-0.645,-1.29,0],[0.8445637739999999,-1.29,0.86],[0.47217285200000003,-1.29,0.645],[0.47217285200000003,-1.29,0.215],[0.8445637739999999,-1.29,0],[1.589345704,-1.29,0.86],[1.2169547820000002,-1.29,0.645],[1.2169547820000002,-1.29,0.215],[1.589345704,-1.29,0],[-0.645,-1.29,-0.43],[-0.272609078,-1.29,-0.645],[-1.38978193,-1.29,0],[-1.38978193,-1.29,-0.43],[-1.017391008,-1.29,-0.645],[0.09978184399999995,-1.29,-0.43],[0.47217285200000003,-1.29,-0.645],[0.8445638599999999,-1.29,-0.43],[1.2169547820000002,-1.29,-0.645],[1.589345704,-1.29,-0.43],[1.961736626,-1.29,0.215],[1.961736626,-1.29,0.645]]
		

		// const add = []
		// const add2 = []

		// for (let i = 0; i < a.length; i++){

		// 	add.push([a[i][0] + 0.8660254, a[i][1] + 3, a[i][2] + .5])
		// 	add2.push([a[i][0] + 0.8660254, a[i][1] - 3, a[i][2] + .5])

		// }
		

		// const weak = []
		// let min = Infinity

		// for (let i = 0; i < a.length; i++){
		// 	for (let j = 0; j < add.length; j++){
		// 		for (let k = 0; k < add2.length; k++){
					
		// 			const sum = Math.abs(a[i][0] - add[j][0]) + Math.abs(a[i][2] - add[j][2]) + Math.abs(a[i][0] - add2[k][0]) + Math.abs(a[i][2] - add2[k][2])

		// 			if (sum  < .000001){
		// 				weak.push([i, a.length + j])
		// 				weak.push([i, a.length * 2 + k])
		// 			}

		// 		}
		// 	}
		// }

		// console.log(a)

		// DUPLICATES
		// for (let i = 0; i < weak.length; i++){
		// 	for (let j = i + 1; j < weak.length; j++){

		// 		if (weak[i][0] === weak[j][0] && weak[i][1] === weak[j][1]){
		// 			weak.splice(j,1)
		// 			j--
		// 		}

		// 	}
		// }


		// a = a.concat(add)
		// a = a.concat(add2)




		// for (let i = 0; i < a.length; i++){
		// 	a[i][0] = (a[i][0] - 1.5) * mult
		// 	a[i][1] = (a[i][1] + 0) * mult
		// 	a[i][2] = (a[i][2] + 0) * mult 
		// }

		let links = []
		for (let i = 0; i < a.length; i++){
			for (let j = i + 1; j < a.length; j++){

				const v1 = a[i]
				const v2 = a[j]

				const d = ((a[i][0] - a[j][0]) ** 2 + (a[i][1] - a[j][1]) ** 2 + (a[i][2] - a[j][2]) ** 2) ** .5
				if (d < .44) {
					links.push([i,j])
				}

			}
		}


		this.tst = a

		// console.log(JSON.stringify(links))

		// DUPLICATES
		// for (let i = 0; i < a.length; i++){
		// 	for (let j = i + 1; j < a.length; j++){

		// 		if (((a[i][0] - a[j][0]) ** 2 + (a[i][1] - a[j][1]) ** 2 + (a[i][2] - a[j][2]) ** 2) ** .5 < .1){
		// 			a.splice(j,1)
		// 			console.log(`dup`)
		// 			j--
		// 		}

		// 	}
		// }

		// let a = [[0,0,0],[0,0,1],[0,1,0],[1,0,0],[0,1,1],[1,0,1],[1,1,0],[1,1,1],[0,0.5,0.5],[0.5,0,0.5],[0.5,0.5,0],[1,0.5,0.5],[0.5,1,0.5],[0.5,0.5,1],[0.25,0.25,0.25],[0.25,0.75,0.75],[0.75,0.25,0.75],[0.75,0.75,0.25],[-1,0,0],[-1,0,1],[-1,1,0],[0,0,0],[-1,1,1],[0,0,1],[0,1,0],[0,1,1],[-1,0.5,0.5],[-0.5,0,0.5],[-0.5,0.5,0],[0,0.5,0.5],[-0.5,1,0.5],[-0.5,0.5,1],[-0.75,0.25,0.25],[-0.75,0.75,0.75],[-0.25,0.25,0.75],[-0.25,0.75,0.25],[0,-1,0],[0,-1,1],[0,0,0],[1,-1,0],[0,0,1],[1,-1,1],[1,0,0],[1,0,1],[0,-0.5,0.5],[0.5,-1,0.5],[0.5,-0.5,0],[1,-0.5,0.5],[0.5,0,0.5],[0.5,-0.5,1],[0.25,-0.75,0.25],[0.25,-0.25,0.75],[0.75,-0.75,0.75],[0.75,-0.25,0.25],[0,0,-1],[0,0,0],[0,1,-1],[1,0,-1],[0,1,0],[1,0,0],[1,1,-1],[1,1,0],[0,0.5,-0.5],[0.5,0,-0.5],[0.5,0.5,-1],[1,0.5,-0.5],[0.5,1,-0.5],[0.5,0.5,0],[0.25,0.25,-0.75],[0.25,0.75,-0.25],[0.75,0.25,-0.25],[0.75,0.75,-0.75],[-1,-1,0],[-1,-1,1],[-1,0,0],[0,-1,0],[-1,0,1],[0,-1,1],[0,0,0],[0,0,1],[-1,-0.5,0.5],[-0.5,-1,0.5],[-0.5,-0.5,0],[0,-0.5,0.5],[-0.5,0,0.5],[-0.5,-0.5,1],[-0.75,-0.75,0.25],[-0.75,-0.25,0.75],[-0.25,-0.75,0.75],[-0.25,-0.25,0.25],[0,-1,-1],[0,-1,0],[0,0,-1],[1,-1,-1],[0,0,0],[1,-1,0],[1,0,-1],[1,0,0],[0,-0.5,-0.5],[0.5,-1,-0.5],[0.5,-0.5,-1],[1,-0.5,-0.5],[0.5,0,-0.5],[0.5,-0.5,0],[0.25,-0.75,-0.75],[0.25,-0.25,-0.25],[0.75,-0.75,-0.25],[0.75,-0.25,-0.75],[-1,0,-1],[-1,0,0],[-1,1,-1],[0,0,-1],[-1,1,0],[0,0,0],[0,1,-1],[0,1,0],[-1,0.5,-0.5],[-0.5,0,-0.5],[-0.5,0.5,-1],[0,0.5,-0.5],[-0.5,1,-0.5],[-0.5,0.5,0],[-0.75,0.25,-0.75],[-0.75,0.75,-0.25],[-0.25,0.25,-0.25],[-0.25,0.75,-0.75],[-1,-1,-1],[-1,-1,0],[-1,0,-1],[0,-1,-1],[-1,0,0],[0,-1,0],[0,0,-1],[0,0,0],[-1,-0.5,-0.5],[-0.5,-1,-0.5],[-0.5,-0.5,-1],[0,-0.5,-0.5],[-0.5,0,-0.5],[-0.5,-0.5,0],[-0.75,-0.75,-0.75],[-0.75,-0.25,-0.25],[-0.25,-0.75,-0.25],[-0.25,-0.25,-0.75]]

		

		// console.log(a)
		// console.log(JSON.stringify(a))

		// let a = [[0,0,0],[0,0,1],[0,1,0],[1,0,0],[0,1,1],[1,0,1],[1,1,0],[1,1,1],[0,0.5,0.5],[0.5,0,0.5],[0.5,0.5,0],[1,0.5,0.5],[0.5,1,0.5],[0.5,0.5,1],[0.25,0.25,0.25],[0.25,0.75,0.75],[0.75,0.25,0.75],[0.75,0.75,0.25],[-1,0,0],[-1,0,1],[-1,1,0],[-1,1,1],[-1,0.5,0.5],[-0.5,0,0.5],[-0.5,0.5,0],[-0.5,1,0.5],[-0.5,0.5,1],[-0.75,0.25,0.25],[-0.75,0.75,0.75],[-0.25,0.25,0.75],[-0.25,0.75,0.25],[0,-1,0],[0,-1,1],[1,-1,0],[1,-1,1],[0,-0.5,0.5],[0.5,-1,0.5],[0.5,-0.5,0],[1,-0.5,0.5],[0.5,-0.5,1],[0.25,-0.75,0.25],[0.25,-0.25,0.75],[0.75,-0.75,0.75],[0.75,-0.25,0.25],[0,0,-1],[0,1,-1],[1,0,-1],[1,1,-1],[0,0.5,-0.5],[0.5,0,-0.5],[0.5,0.5,-1],[1,0.5,-0.5],[0.5,1,-0.5],[0.25,0.25,-0.75],[0.25,0.75,-0.25],[0.75,0.25,-0.25],[0.75,0.75,-0.75],[-1,-1,0],[-1,-1,1],[-1,-0.5,0.5],[-0.5,-1,0.5],[-0.5,-0.5,0],[-0.5,-0.5,1],[-0.75,-0.75,0.25],[-0.75,-0.25,0.75],[-0.25,-0.75,0.75],[-0.25,-0.25,0.25],[0,-1,-1],[1,-1,-1],[0,-0.5,-0.5],[0.5,-1,-0.5],[0.5,-0.5,-1],[1,-0.5,-0.5],[0.25,-0.75,-0.75],[0.25,-0.25,-0.25],[0.75,-0.75,-0.25],[0.75,-0.25,-0.75],[-1,0,-1],[-1,1,-1],[-1,0.5,-0.5],[-0.5,0,-0.5],[-0.5,0.5,-1],[-0.5,1,-0.5],[-0.75,0.25,-0.75],[-0.75,0.75,-0.25],[-0.25,0.25,-0.25],[-0.25,0.75,-0.75],[-1,-1,-1],[-1,-0.5,-0.5],[-0.5,-1,-0.5],[-0.5,-0.5,-1],[-0.75,-0.75,-0.75],[-0.75,-0.25,-0.25],[-0.25,-0.75,-0.25],[-0.25,-0.25,-0.75]]
		// let links = []
		// let min = Infinity

		// for (let i = 0; i < a.length; i++){
		// 	for (let j = i + 1; j < a.length; j++){

		// 		const v1 = a[i]
		// 		const v2 = a[j]

		// 		const d = ((a[i][0] - a[j][0]) ** 2 + (a[i][1] - a[j][1]) ** 2 + (a[i][2] - a[j][2]) ** 2) ** .5
		// 		if (d < .44) {
		// 			links.push([i,j])
		// 		}

		// 	}
		// }

		// console.log(JSON.stringify(links))

	}

	hex(){

		for (let i = 0; i < this.topGeo.vertices.length; i++){
			let v = this.topGeo.vertices[i]

			let slope = .58
			if (v.z > 2 - v.x * slope) v.z = 2 - v.x * slope
			if (v.z > 2 + v.x * slope) v.z = 2 + v.x * slope
			if (-v.z > 2 - v.x * slope) v.z = -2 + v.x * slope
			if (-v.z > 2 + v.x * slope) v.z = -2 - v.x * slope

		}

	}

	// updateScale(s){
	// 	this.scale = s
	// 	for (let i = 0; i < this.topGeo.vertices.length; i++){
	// 		let v = this.topGeo.vertices[i]
	// 		v.y = Math.sqrt(this.delta + 4 * Math.cos(this.scale * v.x * Math.sqrt(3) / 2) * Math.cos(this.scale * v.z / 2) + 4 * Math.cos(this.scale * v.z / 2) ** 2) / this.scale// - .005
	// 	}
	// 	this.topGeo.computeFaceNormals()
	// 	this.topGeo.computeVertexNormals()
	// 	this.topSurf.geometry.elementsNeedUpdate = true
	// }

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
		const env = loader.load('carbon/img/ref.png')
		env.mapping = THREE.EquirectangularReflectionMapping
		env.encoding = THREE.sRGBEncoding
		this.carbonMaterial = new THREE.MeshLambertMaterial({envMap: env, color: `#777`, combine: THREE.AddOperation, reflectivity: .9})

		this.lineMaterialD = new THREE.LineBasicMaterial({color: 0x0000ff, transparent: true, opacity: 0})
		this.lineMaterialG = new THREE.LineBasicMaterial({color: 0xff0000, transparent: true, opacity: 0})

		this.linkMaterialD = new THREE.MeshLambertMaterial({color: `#FFF`, transparent: true, opacity: 0})
		this.linkMaterialG = new THREE.MeshLambertMaterial({color: `#FFF`, transparent: true, opacity: 0})

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

		// for (let i = 0; i < this.stuff.length; i++){

		// 	const a = this.stuff[i]

		// 	for (let j = 0; j < a.linksD.length; j++){

		// 		const l = a.linksD[j]

				// l.mesh.geometry.vertices[0].copy(a.position)
				// l.mesh.geometry.vertices[1].copy(l.to.position)
				// l.mesh.geometry.verticesNeedUpdate = true

			// }

		// 	for (let j = 0; j < a.linksG.length; j++){

		// 		const l = a.linksG[j]

		// 		l.mesh.geometry.vertices[0].copy(a.position)
		// 		l.mesh.geometry.vertices[1].copy(l.to.position)
		// 		// l.mesh.material.opacity = opacityG
		// 		l.mesh.geometry.verticesNeedUpdate = true

		// 	}

		// }

	}

	addLink(a1, a2, pos, s , mat){

		const v1 = a1[pos].clone()
		const v2 = a2[pos].clone()

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
		const geo = new THREE.SphereGeometry(.12, 48, 32)
		

		const coordsD = [[0,0,0],[0,0,1],[0,1,0],[1,0,0],[0,1,1],[1,0,1],[1,1,0],[1,1,1],[0,0.5,0.5],[0.5,0,0.5],[0.5,0.5,0],[1,0.5,0.5],[0.5,1,0.5],[0.5,0.5,1],[0.25,0.25,0.25],[0.25,0.75,0.75],[0.75,0.25,0.75],[0.75,0.75,0.25],[-1,0,0],[-1,0,1],[-1,1,0],[-1,1,1],[-1,0.5,0.5],[-0.5,0,0.5],[-0.5,0.5,0],[-0.5,1,0.5],[-0.5,0.5,1],[-0.75,0.25,0.25],[-0.75,0.75,0.75],[-0.25,0.25,0.75],[-0.25,0.75,0.25],[0,-1,0],[0,-1,1],[1,-1,0],[1,-1,1],[0,-0.5,0.5],[0.5,-1,0.5],[0.5,-0.5,0],[1,-0.5,0.5],[0.5,-0.5,1],[0.25,-0.75,0.25],[0.25,-0.25,0.75],[0.75,-0.75,0.75],[0.75,-0.25,0.25],[0,0,-1],[0,1,-1],[1,0,-1],[1,1,-1],[0,0.5,-0.5],[0.5,0,-0.5],[0.5,0.5,-1],[1,0.5,-0.5],[0.5,1,-0.5],[0.25,0.25,-0.75],[0.25,0.75,-0.25],[0.75,0.25,-0.25],[0.75,0.75,-0.75],[-1,-1,0],[-1,-1,1],[-1,-0.5,0.5],[-0.5,-1,0.5],[-0.5,-0.5,0],[-0.5,-0.5,1],[-0.75,-0.75,0.25],[-0.75,-0.25,0.75],[-0.25,-0.75,0.75],[-0.25,-0.25,0.25],[0,-1,-1],[1,-1,-1],[0,-0.5,-0.5],[0.5,-1,-0.5],[0.5,-0.5,-1],[1,-0.5,-0.5],[0.25,-0.75,-0.75],[0.25,-0.25,-0.25],[0.75,-0.75,-0.25],[0.75,-0.25,-0.75],[-1,0,-1],[-1,1,-1],[-1,0.5,-0.5],[-0.5,0,-0.5],[-0.5,0.5,-1],[-0.5,1,-0.5],[-0.75,0.25,-0.75],[-0.75,0.75,-0.25],[-0.25,0.25,-0.25],[-0.25,0.75,-0.75],[-1,-1,-1],[-1,-0.5,-0.5],[-0.5,-1,-0.5],[-0.5,-0.5,-1],[-0.75,-0.75,-0.75],[-0.75,-0.25,-0.25],[-0.25,-0.75,-0.25],[-0.25,-0.25,-0.75]]
		const linksD = [[0,14],[0,66],[0,74],[0,85],[1,29],[1,41],[2,30],[2,54],[3,43],[3,55],[4,15],[5,16],[6,17],[8,14],[8,15],[8,29],[8,30],[9,14],[9,16],[9,41],[9,43],[10,14],[10,17],[10,54],[10,55],[11,16],[11,17],[12,15],[12,17],[13,15],[13,16],[18,27],[18,92],[19,64],[20,84],[21,28],[22,27],[22,28],[23,27],[23,29],[23,64],[23,66],[24,27],[24,30],[24,84],[24,85],[25,28],[25,30],[26,28],[26,29],[31,40],[31,93],[32,65],[33,75],[34,42],[35,40],[35,41],[35,65],[35,66],[36,40],[36,42],[37,40],[37,43],[37,74],[37,75],[38,42],[38,43],[39,41],[39,42],[44,53],[44,94],[45,86],[46,76],[47,56],[48,53],[48,54],[48,85],[48,86],[49,53],[49,55],[49,74],[49,76],[50,53],[50,56],[51,55],[51,56],[52,54],[52,56],[57,63],[59,63],[59,64],[60,63],[60,65],[61,63],[61,66],[61,92],[61,93],[62,64],[62,65],[67,73],[69,73],[69,74],[69,93],[69,94],[70,73],[70,75],[71,73],[71,76],[72,75],[72,76],[77,83],[79,83],[79,84],[80,83],[80,85],[80,92],[80,94],[81,83],[81,86],[82,84],[82,86],[87,91],[88,91],[88,92],[89,91],[89,93],[90,91],[90,94]]

		const coordsG = [[-0.272609078,0,0.645],[-0.645,0,0.43],[-0.645,0,0],[-0.272609078,0,-0.215],[-1.017390922,0,0.645],[-1.38978193,0,0.43],[-1.38978193,0,0],[-1.017390922,0,-0.215],[0.47217285200000003,0,0.645],[0.09978193,0,0.43],[0.09978193,0,0],[0.47217285200000003,0,-0.215],[1.2169547820000002,0,0.645],[0.8445638599999999,0,0.43],[0.8445638599999999,0,0],[1.2169547820000002,0,-0.215],[-1.017390922,0,-0.645],[-0.645,0,-0.86],[-1.762172852,0,-0.215],[-1.762172852,0,-0.645],[-1.38978193,0,-0.86],[-0.272609078,0,-0.645],[0.09978193,0,-0.86],[0.4721729380000001,0,-0.645],[0.8445638599999999,0,-0.86],[1.2169547820000002,0,-0.645],[1.589345704,0,0],[1.589345704,0,0.43],[0.09978184399999995,1.29,0.86],[-0.272609078,1.29,0.645],[-0.272609078,1.29,0.215],[0.09978184399999995,1.29,0],[-0.645,1.29,0.86],[-1.017391008,1.29,0.645],[-1.017391008,1.29,0.215],[-0.645,1.29,0],[0.8445637739999999,1.29,0.86],[0.47217285200000003,1.29,0.645],[0.47217285200000003,1.29,0.215],[0.8445637739999999,1.29,0],[1.589345704,1.29,0.86],[1.2169547820000002,1.29,0.645],[1.2169547820000002,1.29,0.215],[1.589345704,1.29,0],[-0.645,1.29,-0.43],[-0.272609078,1.29,-0.645],[-1.38978193,1.29,0],[-1.38978193,1.29,-0.43],[-1.017391008,1.29,-0.645],[0.09978184399999995,1.29,-0.43],[0.47217285200000003,1.29,-0.645],[0.8445638599999999,1.29,-0.43],[1.2169547820000002,1.29,-0.645],[1.589345704,1.29,-0.43],[1.961736626,1.29,0.215],[1.961736626,1.29,0.645],[0.09978184399999995,-1.29,0.86],[-0.272609078,-1.29,0.645],[-0.272609078,-1.29,0.215],[0.09978184399999995,-1.29,0],[-0.645,-1.29,0.86],[-1.017391008,-1.29,0.645],[-1.017391008,-1.29,0.215],[-0.645,-1.29,0],[0.8445637739999999,-1.29,0.86],[0.47217285200000003,-1.29,0.645],[0.47217285200000003,-1.29,0.215],[0.8445637739999999,-1.29,0],[1.589345704,-1.29,0.86],[1.2169547820000002,-1.29,0.645],[1.2169547820000002,-1.29,0.215],[1.589345704,-1.29,0],[-0.645,-1.29,-0.43],[-0.272609078,-1.29,-0.645],[-1.38978193,-1.29,0],[-1.38978193,-1.29,-0.43],[-1.017391008,-1.29,-0.645],[0.09978184399999995,-1.29,-0.43],[0.47217285200000003,-1.29,-0.645],[0.8445638599999999,-1.29,-0.43],[1.2169547820000002,-1.29,-0.645],[1.589345704,-1.29,-0.43],[1.961736626,-1.29,0.215],[1.961736626,-1.29,0.645],
		[-0.4868419854325978,4.77730371554358,3.948056012529337],[-3.075141692029555,-4.371983091030732,-1.891501626108747],[-3.415879648864546,0.2430807107763,1.3484252067041975],[3.6785387741064106,2.4696108865879314,3.4235128327982327],[0.6832182122388542,1.2061486776180441,3.274836373909981],[0.3844246495658261,3.4930211464480045,0.536709860931051],[-4.395472576447741,4.365100178327644,3.0577447195814784],[1.2737149064805404,-0.26770342152387716,-1.6529136334084926],[-0.31817274487992986,4.164628726011522,-4.0557807431495485],[3.9371384237041624,0.1964980078967642,-4.421743829731017],[-3.6083213593036167,1.0505637132478078,4.5492008948523335]]
		const weaklinksG = [[0,29],[0,57],[2,35],[2,63],[4,33],[4,61],[6,46],[6,74],[8,37],[8,65],[10,31],[10,59],[12,41],[12,69],[14,39],[14,67],[16,48],[16,76],[21,45],[21,73],[23,50],[23,78],[25,52],[25,80],[26,43],[26,71]]
		const linksG = [[0,1],[0,9],[1,2],[1,4],[2,3],[2,7],[3,10],[3,21],[4,5],[5,6],[6,7],[6,18],[7,16],[8,9],[8,13],[9,10],[10,11],[11,14],[11,23],[12,13],[12,27],[13,14],[14,15],[15,25],[15,26],[16,17],[16,20],[17,21],[18,19],[19,20],[21,22],[22,23],[23,24],[24,25],[26,27],[28,29],[28,37],[29,30],[29,32],[30,31],[30,35],[31,38],[31,49],[32,33],[33,34],[34,35],[34,46],[35,44],[36,37],[36,41],[37,38],[38,39],[39,42],[39,51],[40,41],[40,55],[41,42],[42,43],[43,53],[43,54],[44,45],[44,48],[45,49],[46,47],[47,48],[49,50],[50,51],[51,52],[52,53],[54,55],[56,57],[56,65],[57,58],[57,60],[58,59],[58,63],[59,66],[59,77],[60,61],[61,62],[62,63],[62,74],[63,72],[64,65],[64,69],[65,66],[66,67],[67,70],[67,79],[68,69],[68,83],[69,70],[70,71],[71,81],[71,82],[72,73],[72,76],[73,77],[74,75],[75,76],[77,78],[78,79],[79,80],[80,81],[82,83]]


		for (let i = 0; i < coordsD.length; i++){

			const atom = {
				dPosition: new THREE.Vector3(coordsD[i][0], coordsD[i][1], coordsD[i][2]),
				gPosition: new THREE.Vector3(coordsG[i][0], coordsG[i][1], coordsG[i][2]),
				position: new THREE.Vector3(),
				mesh: new THREE.Mesh(geo, this.carbonMaterial),
				linksD: [],
				linksG: []
			}

			atom.position.copy(atom.gPosition)
			atom.mesh.position.copy(atom.position)
			this.scene.add(atom.mesh)
			this.stuff.push(atom)

		}

		//CYLINDERS
		for (let i = 0; i < linksD.length; i++){

			const a1 = this.stuff[linksD[i][0]]
			const a2 = this.stuff[linksD[i][1]]

			a1.linksD.push({to: a2, mesh: this.addLink(a1, a2, `dPosition`, .8, this.linkMaterialD), strength: .8})

		}

		for (let i = 0; i < linksG.length; i++){

			const a1 = this.stuff[linksG[i][0]]
			const a2 = this.stuff[linksG[i][1]]

			a1.linksG.push({to: a2, mesh: this.addLink(a1, a2, `gPosition`,  1, this.linkMaterialG), strength: 1})

		}

		for (let i = 0; i < weaklinksG.length; i++){

			const a1 = this.stuff[weaklinksG[i][0]]
			const a2 = this.stuff[weaklinksG[i][1]]

			a1.linksG.push({to: a2, mesh: this.addLink(a1, a2, `gPosition`, .1, this.linkMaterialG), strength: .1})

		}


		// for (let i = 0; i < linksD.length; i++){

		// 	const a1 = this.stuff[linksD[i][0]]
		// 	const a2 = this.stuff[linksD[i][1]]

		// 	const lg = new THREE.Geometry().setFromPoints([a1.dPosition, a2.dPosition])
		// 	const link = new THREE.Line(lg, this.lineMaterialD)
		// 	this.scene.add(link)

		// 	a1.linksD.push({to: a2, mesh: link, strength: 1})
		// 	a2.linksD.push({to: a1, mesh: link, strength: 1})

		// }

		// for (let i = 0; i < linksG.length; i++){

		// 	const a1 = this.stuff[linksG[i][0]]
		// 	const a2 = this.stuff[linksG[i][1]]

		// 	const lg = new THREE.Geometry().setFromPoints([a1.gPosition, a2.gPosition])
		// 	const link = new THREE.Line(lg, this.lineMaterialG)
		// 	this.scene.add(link)

		// 	a1.linksG.push({to: a2, mesh: link, strength: 1})
		// 	a2.linksG.push({to: a1, mesh: link, strength: 1})

		// }

		// for (let i = 0; i < weaklinksG.length; i++){

		// 	const a1 = this.stuff[weaklinksG[i][0]]
		// 	const a2 = this.stuff[weaklinksG[i][1]]

		// 	const lg = new THREE.Geometry().setFromPoints([a1.gPosition, a2.gPosition])
		// 	const link = new THREE.Line(lg, this.lineMaterialG)
		// 	this.scene.add(link)

		// 	a1.linksG.push({to: a2, mesh: link, strength: .1})
		// 	a2.linksG.push({to: a1, mesh: link, strength: .1})

		// }

		this.updateLattice(.5)


	}

	addShapes(){

		this.setupAtoms()

		// const coords = [
		// 	[0,0,0], [0,0,1], [0,1,0], [1,0,0], [0,1,1], [1,0,1], [1,1,0], [1,1,1],
		// 	[0,.5,.5], [.5,0,.5], [.5,.5,0], [1,.5,.5], [.5,1,.5], [.5,.5,1],
		// 	[.25,.25,.25], [.25,.75,.75], [.75,.25,.75], [.75,.75,.25]
		// ]

		// const links = [
		// 	[0,14], [4,15], [5, 16], [6, 17],
		// 	[14, 8], [14, 9], [14, 10], [15, 8], [15, 12], [15, 13], [16, 11], [16, 9], [16, 13], [17, 11], [17, 12], [17, 10]
		// ]

		// const geo = new THREE.SphereGeometry(.1, 48, 32)

		// for (let i = 0; i < coords.length; i++){
		// 	const atom = new THREE.Mesh(geo, this.carbonMaterial)
		// 	atom.position.set(coords[i][0], coords[i][1], coords[i][2])
		// 	this.scene.add(atom)
		// }

		// for (let i = 0; i < links.length; i++){

		// 	const p1 = coords[links[i][0]]
		// 	const p2 = coords[links[i][1]]

		// 	const lg = new THREE.Geometry().setFromPoints([new THREE.Vector3(p1[0], p1[1], p1[2]), new THREE.Vector3(p2[0], p2[1], p2[2])])
		// 	const link = new THREE.Line(lg, this.lineMaterial)
		// 	this.scene.add(link)

		// }

		// const atom = new THREE.Mesh(geo, this.carbonMaterial)
		// this.atoms.push(atom)

		// const atom2 = new THREE.Mesh(geo, this.carbonMaterial)
		// atom2.position.copy(new THREE.Vector3().setFromSphericalCoords(1, 0, 0))
		// this.atoms.push(atom2)

		// const atom3 = new THREE.Mesh(geo, this.carbonMaterial)
		// atom3.position.copy(new THREE.Vector3().setFromSphericalCoords(1, Math.PI * 2 / 3, 0))
		// this.atoms.push(atom3)

		// const atom4 = new THREE.Mesh(geo, this.carbonMaterial)
		// atom4.position.copy(new THREE.Vector3().setFromSphericalCoords(1, Math.PI * 2 / 3, Math.PI * 2 / 3))
		// this.atoms.push(atom4)

		// const atom5 = new THREE.Mesh(geo, this.carbonMaterial)
		// atom5.position.copy(new THREE.Vector3().setFromSphericalCoords(1, Math.PI * 2 / 3, Math.PI * 4 / 3))
		// this.atoms.push(atom5)

		// this.scene.add(atom, atom2, atom3, atom4, atom5)


		// this.topGeo = new THREE.PlaneGeometry(3.46,4,this.beauty,this.beauty)
		// this.topGeo.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))

		// // this.paint(this.topGeo)
		// this.topGeo.computeFaceNormals()
		// this.topGeo.computeVertexNormals()
		// this.topSurf = new THREE.Mesh(this.topGeo, this.normat)
		// this.lowSurf = this.topSurf.clone()
		// this.lowSurf.rotateX(Math.PI)
		// this.scene.add(this.topSurf)
		// this.scene.add(this.lowSurf)

		// // let axis1 = new THREE.GridHelper(2.2,8,0xffffff,0xaaaaaa)
		// // this.minG.add(axis1)

		// // this.scene.add(this.minG)

		// // this.hex()

		// this.updateScale(this.scale)

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