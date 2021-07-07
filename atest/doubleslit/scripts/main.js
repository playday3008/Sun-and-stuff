let core;
window.onload = ()=>{

	// let r = new Button({class: `button`, n: `Restart`})
	let c = new Range({ width: 400, value: 3.2, class: `input`, min: 1, max: 10, scale: 1, label: `Contrast`, labelWidth: 120})
	let p = new Range({ width: 400, value: 0, class: `input`, min: -.5, max: .5, scale: 2, label: `Phase shift`, labelWidth: 120})
	let s = new Range({ width: 400, value: .1, class: `input`, min: 0.01, max: .45, scale: 2, label: `Slit gap`, labelWidth: 120})
	let f = new Range({ width: 400, value: .7, class: `input`, min: 0.1, max: 2, scale: 2, label: `Frequency`, labelWidth: 120})
	let d = new Range({ width: 400, value: 0, class: `input`, min: 0, max: 3, scale: 3, label: `Decoherence`, labelWidth: 120})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(c)
	document.body.appendChild(p)
	document.body.appendChild(s)
	document.body.appendChild(f)
	document.body.appendChild(d)

	c.data.onchange = v=>{
		core.contrast = v * 10
	}
	p.data.onchange = v=>{
		core.source.v = .5 + v
		core.initMap()
	}
	s.data.onchange = v=>{
		core.slit1.v = .5 - v
		core.slit2.v = .5 + v
		core.initMap()
	}
	f.data.onchange = v=>{
		core.period = 1/v
		core.initMap()
	}
	d.data.onchange = v=>{
		// core.decoherence = v === 0 ? 0 : v + 1
		core.decoherence = v + 1
		core.initMap()
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)

		this.downscale = 4 * this.ratio

		this.vcanvas = document.createElement(`canvas`)
		this.vcanvas.width = this.ws = this.w / this.downscale
		this.vcanvas.height = this.hs = this.h / this.downscale
		this.vctx = this.vcanvas.getContext(`2d`)

		this.wallWidth = this.ratio * 5
		this.slitWidth = this.ratio * 6
		this.contrast = 32
		this.posmap = light(`fire`)
		this.negmap = light(`ice`)
		this.detectorWidth = -this.ratio * 60

		this.period = 1.4
		this.decoherence = 1
		this.epsilon = 1e-3

		this.source = 	{u: 0, 	v: .5}
		this.slit1 = 	{u: .5, v: .4}
		this.slit2 = 	{u: .5, v: .6}		

		this.slowdown = 300

		this.fade = 1 * this.period / (this.ws * this.slit1.u)

		this.initMap()

		this.run()

	}

	updateSlitPhases(){
		this.slit1.p = Math.sqrt((this.slit1.u * this.ws - this.source.u * this.ws) ** 2 + (this.slit1.v * this.hs - this.source.v * this.hs) ** 2) / this.period
		this.slit2.p = Math.sqrt((this.slit2.u * this.ws - this.source.u * this.ws) ** 2 + (this.slit2.v * this.hs - this.source.v * this.hs) ** 2) / this.period
		this.slit1.dp = this.slit1.p / this.decoherence
		this.slit2.dp = this.slit2.p / this.decoherence
	}

	initMap(){

		this.detector = {
			signal: [],
			max: 0
		}

		this.slit1.x = this.w * this.slit1.u
		this.slit1.y = this.h * this.slit1.v
		this.slit2.x = this.w * this.slit2.u
		this.slit2.y = this.h * this.slit2.v

		this.updateSlitPhases()

		this.map = []
		for (let i = 0; i < this.ws * this.hs; i++){

			let x = i % this.ws
			let y = Math.floor(i / this.ws)

			let cell = {
				ds0: Math.sqrt((x - this.source.u * this.ws) ** 2 + (y - this.source.v * this.hs) ** 2) / this.period,
				ds1: Math.sqrt((x - this.slit1.u * this.ws) ** 2 + (y - this.slit1.v * this.hs) ** 2) / this.period,
				ds2: Math.sqrt((x - this.slit2.u * this.ws) ** 2 + (y - this.slit2.v * this.hs) ** 2) / this.period,
				a: Math.atan2(y - this.source.v * this.hs, x - this.source.u * this.ws),
				u: x / this.ws,
				v: y / this.hs
			}
			cell.dsd0 = cell.ds0 / this.decoherence
			cell.dsd1 = cell.ds1 / this.decoherence
			cell.dsd2 = cell.ds2 / this.decoherence

			this.map.push(cell)
		}
	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){

		// if (this.decoherence){
		// 	this.decoherence = Math.random() * 100
		// }

		let di = 0
		this.id = this.ctx.createImageData(this.ws, this.hs)
		for (let i = 0; i < this.id.data.length; i += 4){

			let cell = this.map[i / 4]
			let t = performance.now() / this.slowdown
			let e = 0

			if (cell.u <= this.slit1.u){
				e = Math.cos(cell.ds0 - t / this.period) / (cell.ds0**.5 || this.epsilon)
				// if (this.decoherence) {
					// e += Math.cos(cell.dsd0 - t / this.period / this.decoherence) / (cell.dsd0 || this.epsilon)
				// }
			} else {
				e = (Math.cos(cell.ds1 - t / this.period * this.decoherence + this.slit1.p) / (cell.ds1**.5 || this.epsilon) + Math.cos(cell.ds2 - t / this.period + this.slit2.p) / (cell.ds2**.5 || this.epsilon)) * this.fade
				// if (this.decoherence) {
					// e += (Math.cos(cell.dsd1 - t / this.period / this.decoherence + this.slit1.dp) / (cell.dsd1**.5 || this.epsilon) + Math.cos(cell.dsd2 - t / this.period / this.decoherence + this.slit2.dp) / (cell.dsd2**.5 || this.epsilon)) * this.fade
				// }

				if (!((i / 4 + 1) % this.ws)){
					if (!this.detector.signal[di]) this.detector.signal[di] = 0
					let p = e**2
					this.detector.signal[di] += p
					if (this.detector.signal[di] > this.detector.max) this.detector.max = this.detector.signal[di]
					di++
				}
				e = Math.tanh(e*this.contrast)
			}

			
			
			let c = e > 0 ? this.posmap.rawrgb(e) : this.negmap.rawrgb(1+e)

			this.id.data[i] = c[0]
			this.id.data[i + 1] = c[1]
			this.id.data[i + 2] = c[2]
			this.id.data[i + 3] = 255

		}
		this.vctx.putImageData(this.id, 0, 0)


	}

	drawSlits(){

		this.ctx.fillStyle = `#112`
		this.ctx.fillRect(this.slit1.x, 0, this.wallWidth, this.slit1.y)
		this.ctx.fillRect(this.slit1.x, this.slit1.y + this.slitWidth, this.wallWidth, this.slit2.y - this.slit1.y - this.slitWidth)
		this.ctx.fillRect(this.slit1.x, this.slit2.y + this.slitWidth, this.wallWidth, this.h)

	}

	drawDetector(){
		this.ctx.save()
		this.ctx.strokeStyle = `#fff`
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.translate(this.w - this.ratio * 5, 0)
		this.ctx.beginPath()
		for (let i = 0; i < this.detector.signal.length; i++){
			if (i===0) this.ctx.moveTo(this.detectorWidth * this.detector.signal[i] / this.detector.max, this.downscale * i); else this.ctx.lineTo(this.detectorWidth * this.detector.signal[i] / this.detector.max, this.downscale * i)
		}

		this.ctx.stroke()
		this.ctx.restore()
	}


	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.drawImage(this.vcanvas, 0, 0, this.w, this.h)
		this.drawSlits()
		this.drawDetector()
		

	}

}