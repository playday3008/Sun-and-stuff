let core;
window.onload = ()=>{

	let speed = new Range({ width: 400, value: 30, class: `input`, min: 2, max: 60, scale: 1, label: `Time scale`, labelWidth: 160})
	let h = new Button({class: `button`, n: `Heliocentric`})
	let m = new Button({class: `button`, n: `Hermiocentric`})
	let v = new Button({class: `button`, n: `Cythecentric`})
	let e = new Button({class: `button`, n: `Geocentric`})
	let ma = new Button({class: `button`, n: `Areiocentric`})
	let j = new Button({class: `button`, n: `Jovicentric`})
	let s = new Button({class: `button`, n: `Chronocentric`})
	let u = new Button({class: `button`, n: `Uranocentric`})
	let n = new Button({class: `button`, n: `Poseidocentric`})
	let p = new Button({class: `button`, n: `Plutocentric`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(speed)
	document.body.appendChild(h)
	document.body.appendChild(m)
	document.body.appendChild(v)
	document.body.appendChild(e)
	document.body.appendChild(ma)
	document.body.appendChild(document.createElement(`br`))
	document.body.appendChild(j)
	document.body.appendChild(s)
	document.body.appendChild(u)
	document.body.appendChild(n)
	document.body.appendChild(p)
	

	speed.data.onchange = v=>{
		core.timeScale = v
	}
	h.data.onchange = v=>{
		core.setCenter(false)
		core.scale = 5e-7 * core.ratio
	}
	m.data.onchange = v=>{
		core.setCenter(`mer`)
		core.scale = 5e-7 * core.ratio
	}
	v.data.onchange = v=>{
		core.setCenter(`ven`)
		core.scale = 5e-7 * core.ratio
	}
	e.data.onchange = v=>{
		core.setCenter(`ear`)
		core.scale = 5e-7 * core.ratio
	}
	ma.data.onchange = v=>{
		core.setCenter(`mar`)
		core.scale = 5e-7 * core.ratio
	}
	j.data.onchange = v=>{
		core.setCenter(`jup`)
		core.scale = 2.5e-7 * core.ratio
	}
	s.data.onchange = v=>{
		core.setCenter(`sat`)
		core.scale = 1.5e-7 * core.ratio
	}
	u.data.onchange = v=>{
		core.setCenter(`ura`)
		core.scale = 5e-8 * core.ratio
	}
	n.data.onchange = v=>{
		core.setCenter(`nep`)
		core.scale = 5e-8 * core.ratio
	}
	p.data.onchange = v=>{
		core.setCenter(`plu`)
		core.scale = 3e-8 * core.ratio
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)

		this.vCanvas = document.createElement(`canvas`)
		this.vCanvas.width = this.w
		this.vCanvas.height = this.h
		this.vctx = this.vCanvas.getContext(`2d`)

		//Data
		this.bodies = {
			sun: {last: false, current: false, angle: NaN, aop: 0, ecc: 0, rad: 695510,	color: `#fff`, name: `Sun`},
			mer: {last: false, current: false, angle: 0,	apo: 57909227,			ecc: .20563593,	inc: 6.34,	rad: 2439.7,	sid: 58.646, 		lan: Math.PI / 180 * 48.331, 	aop: Math.PI / 180 * 29.124,		tilt: 0.034,	color: `#ffbaa8`, name: 'Mercury'},
			ven: {last: false, current: false, angle: 0,	apo: 108208930,			ecc: .0068,		inc: 2.5,	rad: 6051.8,	sid: 243.025, 		lan: Math.PI / 180 * 76.680, 	aop: Math.PI / 180 * 54.884,		tilt: 177.36,	color: `#e3d084`, name: 'Venus'},
			ear: {last: false, current: false, angle: 0,	apo: 149598261,			ecc: .01671,	inc: .028, 	rad: 6371,		sid: 365.256366004, lan: Math.PI / 180 * -.2, 		aop: Math.PI / 180 * 1.99,	 		tilt: 0.41,	 	color: `#7CB9F6`, name: 'Earth'},
			mar: {last: false, current: false, angle: 0,	apo: 227943820,			ecc: .0933941,	inc: 1.67,	rad: 3389.5,	sid: 686.98, 		lan: Math.PI / 180 * 49.558,	aop: Math.PI / 180 * 286.502,		tilt: 25.19,	color: `#ec6327`, name: 'Mars'},
			jup: {last: false, current: false, angle: 0,	apo: 778547200,			ecc: .048775,	inc: 0.32,	rad: 69911,		sid: 4332.589, 		lan: Math.PI / 180 * 100.464,	aop: Math.PI / 180 * 273.867,		tilt: 3.13,	 	color: `#a78a71`, name: 'Jupiter'},
			sat: {last: false, current: false, angle: 0,	apo: 1433449370,		ecc: .05555,	inc: 0.93,	rad: 58232,		sid: 10759.22, 		lan: Math.PI / 180 * 113.665,	aop: Math.PI / 180 * 339.392,		tilt: 26.73,	color: `#d2b179`, name: 'Saturn'},
			ura: {last: false, current: false, angle: 0,	apo: 2876679082,		ecc: .046381,	inc: 1.02,	rad: 25362,		sid: 30685.4, 		lan: Math.PI / 180 * 74.006,	aop: Math.PI / 180 * 96.998857,		tilt: 97.77,	color: `#bee1e1`, name: 'Uranus'},
			nep: {last: false, current: false, angle: 0,	apo: 4503443661,		ecc: .009456,	inc: 0.72,	rad: 24622,		sid: 60190.03, 		lan: Math.PI / 180 * 131.784,	aop: Math.PI / 180 * 276.336,		tilt: 28.32,	color: `#4379d1`, name: 'Neptune'},
			plu: {last: false, current: false, angle: 0,	apo: 7375930000,	ecc: .2488273,	inc: 17.4,	rad: 1187,		sid: 90553.02, 		lan: Math.PI / 180 * 110.299,	aop: Math.PI / 180 * 113.834,		tilt: 122.53,	color: `#ee4512`, name: 'Pluto'}
		}
		this.center = false//`ear`

		//Visuals
		this.scale = 5e-7 * this.ratio
		this.timeScale = 30
		this.precision = .01
		this.orbitBuffer = 1000
		this.ctx.font = 12 * this.ratio + `px Georgia`
		this.ctx.textBaseline = `middle`

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.run()

	}

	getDistAtAngle(c, a){

		return c.apo ? c.apo * this.scale * (1 - c.ecc ** 2) / (1 + c.ecc * Math.cos(a)) : 0

	}

	setCenter(c){
		this.center = c
		this.vctx.clearRect(0, 0, this.w, this.h)
		for (let i in this.bodies){
			this.bodies[i].last = false
			this.bodies[i].current = false
		}
	}

	drawOrbits(){

		this.vctx.save()
		this.vctx.lineWidth = this.ratio
		this.vctx.globalAlpha = .4

		for (let i in this.bodies) {

			let c = this.bodies[i]
			if (c.last && c.current){
				this.vctx.strokeStyle = c.color
				this.vctx.beginPath()
				this.vctx.setTransform(c.last[1])
				this.vctx.moveTo(c.last[0], 0)
				this.vctx.setTransform(c.current[1])
				this.vctx.lineTo(c.current[0], 0)
				this.vctx.stroke()

			}

		}

		this.vctx.restore()

	}

	drawBodies() {

		this.ctx.save()
		this.ctx.translate(this.w / 2, this.h / 2)

		let cr = 0, ca = 0
		if (this.center) {
			cr = this.getDistAtAngle(this.bodies[this.center], this.bodies[this.center].angle)
			ca = this.bodies[this.center].angle + this.bodies[this.center].aop
			this.ctx.rotate(ca)
			this.ctx.translate(-cr, 0)
			
		}

		for (let i in this.bodies){

			let c = this.bodies[i]

			this.ctx.save()
			this.ctx.rotate(c.aop + c.angle - ca)

			this.ctx.fillStyle = c.color
			let r = this.getDistAtAngle(c, c.angle)
			c.last = c.current
			c.current = [r, this.ctx.getTransform()]
			this.ctx.translate(r,0)

			this.ctx.beginPath()
			this.ctx.arc(0, 0, (c.name === `Sun` ? 6 : 3) * this.ratio, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			if (c.name !== `Sun`) this.ctx.rotate(-c.angle-c.aop); else this.ctx.rotate(-ca)
			this.ctx.fillText(c.name, this.ratio * 12, 0)

			this.ctx.restore()

		}

		this.ctx.restore()
	}

	run() {

		requestAnimationFrame(this.run.bind(this))

		for (let i = 0; i < 5; i++){
			this.update()
			this.draw()
		}

	}

	update(){

		for (let i in this.bodies){

			let c = this.bodies[i]
			if (!isNaN(c.angle)){
				let r = this.getDistAtAngle(c, c.angle)
				c.angle -= this.timeScale * Math.sqrt(1 / r) / r * this.ratio * .3
			}
		}

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.drawImage(this.vCanvas, 0, 0)

		this.drawOrbits()
		this.drawBodies()

	}

}