let core
window.onload = ()=>{

	let manual = new Button({n: `Manual transformation`, class: `switch`})
	let parametric = new Button({n: `Channels`, class: `switch`})
	manual.classList.add(`active`, `left`)
	parametric.classList.add(`right`)
	
	let fi = new Range({ width: 480, value: 0.0001, class: `input`, min: 0.0001, max: Math.PI * 2, scale: 4, label: `Phi`, labelWidth: 80})
	let theta = new Range({ width: 480, value: 0.0001, class: `input`, min: 0.0001, max: Math.PI, scale: 2, label: `Theta`, labelWidth: 80})
	let scale = new Range({ width: 480, value: 1, class: `input`, min: 0.0001, max: 1, scale: 2, label: `Scale`, labelWidth: 80})

	let bitflip = new Button({n: `Bit flip`, class: `toggle`})
	let bitflipP = new Range({ width: 550, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 10})

	let dephase = new Button({n: `Dephasing`, class: `toggle`})
	let dephaseP = new Range({ width: 550, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 10})

	let bitphase = new Button({n: `Bit-phase flip`, class: `toggle`})
	let bitphaseP = new Range({ width: 550, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 10})

	let depolarize = new Button({n: `Depolarizing`, class: `toggle`})
	let depolarizeP = new Range({ width: 550, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 10})

	let ampdamp = new Button({n: `Amplitude damping`, class: `toggle`})
	let ampdampP = new Range({ width: 550, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 10})

	let controls = document.createElement(`div`)
	let channels = document.createElement(`div`)
	controls.classList.add(`controls`)

	core = new Core(fi, theta, controls)
	document.body.appendChild(controls)
	channels.classList.add(`hidden`)

	controls.appendChild(manual)
	controls.appendChild(parametric)

	controls.appendChild(fi)
	controls.appendChild(theta)
	controls.appendChild(scale)

	controls.appendChild(channels)
	channels.appendChild(bitflip)
	channels.appendChild(dephase)
	channels.appendChild(bitphase)
	channels.appendChild(depolarize)
	channels.appendChild(ampdamp)

	channels.appendChild(bitflipP)
	channels.appendChild(dephaseP)
	channels.appendChild(bitphaseP)
	channels.appendChild(depolarizeP)
	channels.appendChild(ampdampP)

	fi.data.onchange = v=>{
		core.state.fiTarget = core.state.thetaTarget = undefined
		core.state.fi = v
		core.update()
	}
	theta.data.onchange = v=>{
		core.state.fiTarget = core.state.thetaTarget = undefined
		core.state.theta = v
		core.update()
	}
	scale.data.onchange = v=>{
		core.state.scale = v
		core.update()
	}

	manual.data.onchange = v=>{
		channels.classList.add(`hidden`)
		scale.classList.remove(`hidden`)
		parametric.classList.remove(`active`)
		manual.classList.add(`active`)
		selectP()
		core.update()
	}

	parametric.data.onchange = v=>{
		channels.classList.remove(`hidden`)
		scale.classList.add(`hidden`)
		manual.classList.remove(`active`)
		parametric.classList.add(`active`)
		selectP(bitflipP, bitflip)
		core.update()
	}

	bitflip.data.onchange = v=>{
		selectP(bitflipP, bitflip)
		core.update()
	}

	bitflipP.data.onchange = v=>{
		core.state.bitflipP = v
		core.update()
	}

	dephase.data.onchange = v=>{
		selectP(dephaseP, dephase)
		core.update()
	}

	dephaseP.data.onchange = v=>{
		core.state.dephaseP = v
		core.update()
	}

	bitphase.data.onchange = v=>{
		selectP(bitphaseP, bitphase)
		core.update()
	}

	bitphaseP.data.onchange = v=>{
		core.state.bitphaseP = v
		core.update()
	}

	depolarize.data.onchange = v=>{
		selectP(depolarizeP, depolarize)
		core.update()
	}

	depolarizeP.data.onchange = v=>{
		core.state.depolarizeP = v
		core.update()
	}

	ampdamp.data.onchange = v=>{
		selectP(ampdampP, ampdamp)
		core.update()
	}

	ampdampP.data.onchange = v=>{
		core.state.ampdampP = v
		core.update()
	}

	function selectP(p, s){
		core.state.scale = 1
		bitflipP.data.update(0)
		core.state.bitflipP = 0
		dephaseP.data.update(0)
		core.state.dephaseP = 0
		bitphaseP.data.update(0)
		core.state.bitphaseP = 0
		depolarizeP.data.update(0)
		core.state.depolarizeP = 0
		ampdampP.data.update(0)
		core.state.ampdampP = 0
		bitflipP.classList.add(`hidden`)
		dephaseP.classList.add(`hidden`)
		bitphaseP.classList.add(`hidden`)
		depolarizeP.classList.add(`hidden`)
		ampdampP.classList.add(`hidden`)
		bitflip.classList.remove(`selected`)
		dephase.classList.remove(`selected`)
		bitphase.classList.remove(`selected`)
		depolarize.classList.remove(`selected`)
		ampdamp.classList.remove(`selected`)

		if (p) p.classList.remove(`hidden`)
		if (s) s.classList.add(`selected`)
	}

}

let a = new Range({ width: 300, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `P`, labelWidth: 160})

class Core {

	constructor(fi, theta, controls){
		this.ratio = devicePixelRatio || 1
		this.w = 640
		this.h = 480

		this.fiControl = fi
		this.thetaControl = theta
		this.controls = controls

		this.reach = true

		//DATA
		this.state = {
			fi: .0001,
			theta: .0001,
			scale: 1,
			gx: 0,
			gy: 0,
			gz: 0,
			bitflipP: 0,
			dephaseP: 0,
			bitphaseP: 0,
			depolarizeP: 0,
			ampdampP: 0
		}

		this.setup()
		this.addShapes()
		// this.addStateString()
		// this.render()
		this.update()
		this.addLabels()

	}

	highlight(axe){
		if (axe === `x`){
			this.ax.material = this.highlightMat
		} else if (axe === `y`){
			this.ay.material = this.highlightMat
		} else if (axe === `z`){
			this.az.material = this.highlightMat
		} else {
			this.ax.material = this.axisMat
			this.ay.material = this.axisMat
			this.az.material = this.axisMat
		}
	}

	lockControls(b){
		if (b) {
			this.controls.classList.add(`disabled`)
		} else {
			this.controls.classList.remove(`disabled`)
		}
	}

	addLabels(){
		this.up = document.createElement(`div`)
		this.up.style.position = `absolute`
		let xy = this.getScreenUV(new THREE.Vector3(0, 1.3, 0))
		this.up.style.top = xy.y * this.h + `px`
		this.up.style.left = xy.x * this.w + `px`
		this.up.style.textAlign = `center`
		this.up.style.color = `#fff`
		this.up.innerText = `z`
		document.body.appendChild(this.up)

		// this.down = document.createElement(`div`)
		// this.down.style.position = `absolute`
		// xy = this.getScreenUV(new THREE.Vector3(0, -1.3, 0))
		// this.down.style.top = xy.y * this.h + `px`
		// this.down.style.left = xy.x * this.w + `px`
		// this.down.style.textAlign = `center`
		// this.down.style.color = `#fff`
		// this.down.innerText = `| 1 ⟩`
		// document.body.appendChild(this.down)

		this.positiveX = document.createElement(`div`)
		this.positiveX.style.position = `absolute`
		xy = this.getScreenUV(new THREE.Vector3(-1.1, 0, 0))
		this.positiveX.style.top = xy.y * this.h + `px`
		this.positiveX.style.left = xy.x * this.w + `px`
		this.positiveX.style.textAlign = `center`
		this.positiveX.style.color = `#fff`
		this.positiveX.innerText = `x`
		document.body.appendChild(this.positiveX)

		this.positiveY = document.createElement(`div`)
		this.positiveY.style.position = `absolute`
		xy = this.getScreenUV(new THREE.Vector3(0, 0, 1.1))
		this.positiveY.style.top = xy.y * this.h + `px`
		this.positiveY.style.left = xy.x * this.w + `px`
		this.positiveY.style.textAlign = `center`
		this.positiveY.style.color = `#fff`
		this.positiveY.innerText = `y`
		document.body.appendChild(this.positiveY)

	}

	addStateString(){
		this.expression = document.createElement(`div`)
		this.expression.style.position = `absolute`
		this.expression.style.top = `10px`
		this.expression.style.left = `10px`
		this.expression.style.color = `#fff`
		this.expression.style.fontSize = `12px`
		this.expression.innerText = `| 0 ⟩`
		document.body.appendChild(this.expression)
	}

	setup(){

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(10, this.w / this.h, .1, 100)
		this.camera.position.set(-10,10,10)
		this.camera.lookAt(0, 0, 0)
		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setClearColor(0x111122)
		this.renderer.setSize(this.w, this.h)
		this.renderer.setPixelRatio(this.ratio)
		document.body.appendChild(this.renderer.domElement)

	}

	addShapes(){

		//LIGHTS
		let alight = new THREE.HemisphereLight(0xA66464, 0x2211AA, .9)
		this.scene.add(alight)
		let dlight = new THREE.DirectionalLight(0xffffFF, .6)
		dlight.position.set(-6, 6, -4)
		this.scene.add(dlight)

		//MATERIALS
		this.sphereMat = new THREE.MeshBasicMaterial({transparent: true, opacity: .2, color: 0xAAFF99, wireframe: true})
		this.arrowMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide})
		this.circleMat = new THREE.LineBasicMaterial({color: 0xAABBff})
		this.axisMat = new THREE.LineBasicMaterial({color: 0xFFFFFF, transparent: true, opacity: .8})
		this.highlightMat = new THREE.LineBasicMaterial({color: 0xFFFF00})
		this.circleMat.depthTest = this.axisMat.depthTest = this.highlightMat.depthTest = false

		//ROTATION GROUPS
		this.ext = new THREE.Group()
		this.scene.add(this.ext)

		this.int = new THREE.Group()
		this.ext.add(this.int)

		//Sphere
		this.sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1,18,12), this.sphereMat)
		this.scene.add(this.sphere)

		//Vector
		this.vector = new THREE.Vector3(0, 1, 0)
		this.arrow = new THREE.Mesh(new THREE.CylinderBufferGeometry(.02, .02, .7, 6, 1, false), this.arrowMat)
		this.arrow.position.set(0, .35, 0)
		this.cone = new THREE.Mesh(new THREE.ConeBufferGeometry(.04, .3), this.arrowMat)
		this.cone.position.set(0, .85, 0)
		this.int.add(this.arrow)
		this.int.add(this.cone)

		//Disk
		this.disk = new THREE.Mesh(new THREE.CircleBufferGeometry(.04, 32), this.arrowMat)
		this.disk.rotation.x = -Math.PI/2
		this.disk.position.set(0, 1, 0)
		this.int.add(this.disk)

		//Circles
		let circle = new THREE.CircleGeometry(1, 48)
		circle.vertices.shift()
		this.circleTheta = new THREE.LineLoop(circle, this.circleMat)
		this.int.add(this.circleTheta)

		this.circleFi = new THREE.LineLoop(circle, this.circleMat)
		this.circleFi.rotation.x = Math.PI / 2
		this.ext.add(this.circleFi)

		//Axes
		let ax = [new THREE.Vector3(-1,0,0), new THREE.Vector3(1,0,0)]
		this.ax = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ax), this.axisMat)
		this.scene.add(this.ax)

		let ay = [new THREE.Vector3(0,-1,0), new THREE.Vector3(0,1,0)]
		this.ay = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ay), this.axisMat)
		this.scene.add(this.ay)

		let az = [new THREE.Vector3(0,0,-1), new THREE.Vector3(0,0,1)]
		this.az = new THREE.Line(new THREE.BufferGeometry().setFromPoints(az), this.axisMat)
		this.scene.add(this.az)



	}
	
	getScreenUV(v){
		v = v.clone()
		v.project(this.camera)
		return {x: v.x * .5 + .5, y: -v.y * .5 + .5}
	}

	// render(){

	// 	requestAnimationFrame(this.render.bind(this))
	// 	this.update()

	// }
	xyzFromP(fi, theta){
		return {x: Math.cos(fi) * Math.sin(theta), y: Math.sin(fi) * Math.sin(theta), z: Math.cos(theta)}
	}
	pFromXyz(x, y, z){
		let fi = Math.atan2(y,x)
		return {fi: fi < 0 ? fi + Math.PI * 2 : fi, theta: Math.acos(z)}
	}

	resetExt(){
		this.state.gx = this.state.gy = this.state.gz = 0
		this.ext.rotation.set(0, 0, 0)
	}

	update(){

		let st = [this.state.scale * (1 - 2*this.state.dephaseP) * (1 - 2*this.state.bitphaseP) * (1 - 2*this.state.depolarizeP) * (1 - this.state.ampdampP) ** .5, this.state.scale * (1 - 2*this.state.bitflipP) * (1 - 2*this.state.dephaseP) * (1 - 2*this.state.depolarizeP) * (1 - this.state.ampdampP) ** .5, this.state.scale * (1 - 2*this.state.bitflipP) * (1 - 2*this.state.bitphaseP) * (1 - 2*this.state.depolarizeP) * (1 - this.state.ampdampP)]
		this.sphere.scale.set(st[0], st[2], st[1])
		this.sphere.position.y = this.state.ampdampP
		this.ext.scale.set(st[0], st[2], st[1])
		this.ext.position.y = this.state.ampdampP

		if (Math.abs(this.state.gx - this.ext.rotation.x) > .001 || Math.abs(this.state.gy - this.ext.rotation.z) > .001 || Math.abs(this.state.gz - this.ext.rotation.y) > .001){
			this.reach = false
			this.ext.rotation.x = this.ext.rotation.x + (this.state.gx - this.ext.rotation.x) * .08
			this.ext.rotation.z = this.ext.rotation.z + (this.state.gy - this.ext.rotation.z) * .08
			this.ext.rotation.y = this.ext.rotation.y + (this.state.gz - this.ext.rotation.y) * .08
		} else if (!this.reach){
			this.reach = true
			this.resetExt()
			this.state.theta = this.state.thetaNext
			this.state.fi = this.state.fiNext
			this.thetaControl.data.update(this.state.theta)
			this.fiControl.data.update(this.state.fi)
			this.lockControls(false)

			if (this.sequence){
				this.sequence()
				this.sequence = false
			}
				
		}

		if (this.state.thetaTarget !== undefined || this.state.fiTarget !== undefined){
			this.state.fi = this.state.fi + (this.state.fiTarget - this.state.fi) * .08
			this.state.theta = this.state.theta + (this.state.thetaTarget - this.state.theta) * .08
			this.fiControl.data.update(this.state.fi)
			this.thetaControl.data.update(this.state.theta)

			if ((Math.abs(this.state.fiTarget - this.state.fi) < .001) && (Math.abs(this.state.thetaTarget - this.state.theta) < .001)){
				this.state.fiTarget = this.state.thetaTarget = undefined
			}

		}

		this.circleFi.position.set(0, Math.cos(this.state.theta), 0)
		let s = Math.max(Math.sin(this.state.theta), .01)
		this.circleFi.scale.set(s, s, s)

		this.int.rotation.y = this.state.fi
		this.int.rotation.z = this.state.theta

		// this.expression.innerHTML = `|ψ〉 = ${Math.round(Math.cos(this.state.theta/2)*1000)/1000} | 0 〉 + ${Math.round(Math.sin(this.state.theta/2)*1000)/1000} <i>e</i><sup><i>i</i> ${Math.round(this.state.fi/Math.PI * 100)/100}π</sup> | 1 〉<br/>P | 1 〉= ${Math.round(Math.sin(this.state.theta/2)**2 * 100) / 100}`

		this.renderer.render(this.scene, this.camera)

	}

}