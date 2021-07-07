let core;
window.onload = ()=>{

	let stdev = new Range({ width: 400, value: 1, class: `input`, min: 0.0001, max: 5, scale: 5, label: `σ²`, labelWidth: 30})
	let mean = new Range({ width: 400, value: 0, class: `input`, min: -3, max: 3, scale: 6, label: `μ`, labelWidth: 30})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(stdev)
	document.body.appendChild(mean)
	

	stdev.data.onchange = v=>{
		core.stdev = Math.sqrt(v)
		core.draw()
	}
	mean.data.onchange = v=>{
		core.mean = v
		core.draw()
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

		this.domainX = [-5,5]
		this.domainY = [-0.1, 1.1]
		this.markLength = this.ratio * 4
		this.textMargin = this.ratio * 14
		this.mainline = this.ratio * 3

		this.mean = 0
		this.stdev = Math.sqrt(1)
		this.precision = .01

		this.ctx.font = `${18 * this.ratio}px Georgia`
		// this.ctx.textAlign = `right`

		this.vdraw()
		this.run()

	}

	run() {

		//requestAnimationFrame(this.run.bind(this))

		this.update()
		this.draw()

	}

	map(x,y){
		return {x: (x - this.domainX[0]) / (this.domainX[1] - this.domainX[0]) * this.w, y: this.h - (y - this.domainY[0]) / (this.domainY[1] - this.domainY[0]) * this.h}
	}

	vdraw(){

		this.vctx.lineWidth = this.ratio
		this.vctx.font = `${13 * this.ratio}px monospace`
		this.vctx.textAlign = `center`
		this.vctx.textBaseline = `middle`

		this.vctx.beginPath()
		let lb = this.map(this.domainX[0], 0)
		this.vctx.moveTo(lb.x, lb.y)
		let rb = this.map(this.domainX[1], 0)
		this.vctx.lineTo(rb.x, rb.y)
		this.vctx.stroke()

		this.vctx.beginPath()
		let t = this.map(0, this.domainY[1])
		this.vctx.moveTo(t.x, t.y)
		let b = this.map(0, 0)
		this.vctx.lineTo(b.x, b.y)
		this.vctx.stroke()

		for (let x = this.domainX[0] + 1; x <= this.domainX[1] - 1; x++){

			let mark = this.map(x, 0)
			this.vctx.beginPath()
			this.vctx.moveTo(mark.x, mark.y)
			this.vctx.lineTo(mark.x, mark.y - this.markLength)
			this.vctx.stroke()
			this.vctx.fillText(x, mark.x, mark.y + this.textMargin)

		}

		this.vctx.textAlign = `left`

		for (let y = 0.1; y <= this.domainY[1] - .1; y += .1){

			let mark = this.map(0, y)
			this.vctx.beginPath()
			this.vctx.moveTo(mark.x, mark.y)
			this.vctx.lineTo(mark.x + this.markLength, mark.y)
			this.vctx.stroke()
			this.vctx.fillText(Math.round(y * 100) / 100, mark.x + this.textMargin, mark.y)

		}

		let hi = this.map(4.8, 0)
		this.vctx.font = `${18 * this.ratio}px monospace`
		this.vctx.fillText(`χ`, hi.x, hi.y + this.textMargin)


	}

	f(x){

		return Math.exp(-.5 * ((x - this.mean) / this.stdev) ** 2) / (this.stdev * (Math.PI * 2) ** .5)

	}

	drawCurve(){

		this.ctx.strokeStyle = this.ctx.fillStyle = `#F62E21`
		this.ctx.lineWidth = this.mainline
		this.ctx.beginPath()
		for (let x = this.domainX[0]; x <= this.domainX[1]; x += this.precision){

			let c = this.map(x, this.f(x))
			if (x === this.domainX[0]){
				this.ctx.moveTo(c.x, c.y)
			} else {
				this.ctx.lineTo(c.x, c.y)
			}

		}
		this.ctx.stroke()

		let cutoff = 4.6
		let txtc = this.map(cutoff, this.f(cutoff))
		this.ctx.fillText(`φ`, txtc.x, txtc.y - this.textMargin)

		this.ctx.strokeStyle = this.ctx.fillStyle = `#8145FF`
		this.ctx.beginPath()
		let sum = 0
		let norm = (this.domainX[1] - this.domainX[0] + 10) / this.precision / 20
		let sum4
		for (let x = this.domainX[0] - 5; x <= this.domainX[1] + 5; x += this.precision){
			sum += this.f(x) / norm
			if (x >= this.domainX[0] && x <= this.domainX[1]){
				let c = this.map(x, sum)
				if (x === this.domainX[0]){
					this.ctx.moveTo(c.x, c.y)
				} else {
					this.ctx.lineTo(c.x, c.y)
				}
			}
			if (x >= cutoff){
				sum4 = this.map(x, sum)
				cutoff = Infinity
			}

		}
		this.ctx.stroke()

		this.ctx.fillText(`Φ`, sum4.x, sum4.y + this.textMargin * 1.6)

	}

	update(){

	}

	draw(){

		this.ctx.fillStyle = '#fff'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		
		this.ctx.drawImage(this.vCanvas, 0, 0)
		this.drawCurve()


	}

}