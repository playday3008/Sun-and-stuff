let core;
window.onload = ()=>{

	let speed = new Range({ width: 300, value: 1, class: `input`, min: 1, max: 1000, scale: 1, label: `Samples per frame`, labelWidth: 160})
	let r = new Button({class: `button`, n: `Restart`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(speed)
	document.body.appendChild(r)

	speed.data.onchange = v=>{
		core.ppf = v
	}
	r.data.onchange = v=>{
		core.reset()
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

		this.gCanvas = document.createElement(`canvas`)
		this.gCanvas.width = this.w * .6
		this.gCanvas.height = this.ratio * 160
		this.gctx = this.gCanvas.getContext(`2d`)
		this.g2Canvas = document.createElement(`canvas`)
		this.g2Canvas.width = this.gCanvas.width
		this.g2Canvas.height = this.gCanvas.height
		this.g2ctx = this.g2Canvas.getContext(`2d`)

		this.count = 0
		this.piCount = 0
		this.ppf = 1
		this.pointSize = this.ratio * 1
		this.margin = this.ratio * 76
		this.error = false
		this.iteration = 0

		this.ctx.textAlign = `left`

		this.predraw()
		this.run()

	}
	reset(){
		this.count = 0
		this.piCount = 0
		this.iteration = 0
		this.error = false
		this.vctx.clearRect(0, 0, this.w, this.h)
		this.gctx.clearRect(0, 0, this.gCanvas.width, this.gCanvas.height)
		this.predraw()
	}

	predraw(){

		this.vctx.strokeStyle = `#0003`
		this.vctx.lineWidth = this.ratio * 2
		this.vctx.beginPath()
		this.vctx.arc(this.w / 2, this.h / 2, this.w / 2 - this.ratio * 2, 0, Math.PI * 2)
		this.vctx.closePath()
		this.vctx.stroke()

		this.gctx.font = this.ratio * 16 + `px Georgia`
		this.gctx.textAlign = `left`
		this.gctx.textBaseline = `middle`
		this.gctx.fillStyle = `#112`
		this.gctx.fillText(`Error over time:`, this.gCanvas.width / 2, this.gCanvas.height / 2)
		// this.gctx.fillRect(0,0,this.gCanvas.width, this.gCanvas.height)

	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){


		for (let i = 0; i < this.ppf; i++){
			let p = {x: Math.random() * this.w, y: Math.random() * this.h, time: this.liveTime}
			p.isInside = (p.x - this.w / 2) ** 2 + (p.y - this.h / 2) ** 2 < (this.w / 2) ** 2
			this.count++
			if (p.isInside) this.piCount++
			this.drawVPoint(p)
		}
		this.iteration++
		
	}

	drawVPoint(p){

		let delta = Math.floor(Math.random() * 40 - 20)
		this.vctx.fillStyle = p.isInside ? `rgb(${164+delta},${233+delta},${191+delta})` : `rgb(${227+delta},${86+delta},${95+delta})`
		this.vctx.beginPath()
		this.vctx.arc(p.x, p.y, this.pointSize, 0, Math.PI * 2)
		this.vctx.closePath()
		this.vctx.fill()

	}

	drawGraph(){

		this.gctx.fillStyle = `#112`

		this.g2ctx.clearRect(0, 0, this.gCanvas.width, this.gCanvas.height)
		this.g2ctx.drawImage(this.gCanvas, -1, 0)
		this.gctx.clearRect(0, 0, this.gCanvas.width, this.gCanvas.height)
		this.gctx.drawImage(this.g2Canvas, 0, 0)

		let y = Math.round(this.error / .1 * this.gCanvas.height)
		this.gctx.fillRect(this.gCanvas.width - 1, this.gCanvas.height - y, 1, y)

		this.ctx.drawImage(this.gCanvas, this.margin, this.margin + this.ratio * 144)

	}

	draw(){

		this.ctx.fillStyle = '#fff'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.drawImage(this.vCanvas, 0, 0)

		this.ctx.fillStyle = `#000`
		let pi = this.piCount / this.count * 4
		this.error = Math.abs(pi - Math.PI)
		let precision = this.count.toString().length

		this.vctx.font = this.ctx.font = this.ratio * 16 + `px Georgia`
		this.ctx.fillText(`Total points: ${this.count}`, this.margin, this.margin + this.ratio * 48)
		this.ctx.fillText(`Inside circle: ${this.piCount}`, this.margin, this.margin + this.ratio * 72)
		this.ctx.fillText(`Monte Carlo π = ${pi.toFixed(precision)}`, this.margin, this.margin + this.ratio * 96)
		this.ctx.fillText(`Error: ${this.error}`, this.margin, this.margin + this.ratio * 120)

		this.vctx.font = this.ctx.font = this.ratio * 12 + `px Georgia`
		this.ctx.fillText(`0.1`, this.margin + this.gCanvas.width + this.ratio * 4, this.margin + this.ratio * 152)
		this.ctx.fillText(`0`, this.margin + this.gCanvas.width + this.ratio * 4, this.margin + this.ratio * 144 + this.gCanvas.height)

		this.drawGraph()

	}

}