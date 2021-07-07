let core;
window.onload = ()=>{

	let sigma = new Range({ width: 500, value: .001, class: `input`, min: .0001, max: .2, scale: 5, label: `Descent rate`, labelWidth: 160})
	// let f2 = new Range({ width: 500, value: 2.5, class: `input`, min: 1, max: 5, scale: 8, label: `2.5 Hz`, labelWidth: 160, step: .1})
	// let s = new Range({ width: 500, value: Math.PI / 2, class: `input`, min: 0, max: Math.PI, scale: 4, label: `Phase shift`, labelWidth: 160, step: .01})
	let p = new Button({class: `button`, n: `New data`})
	let f = new Button({class: `button`, n: `New function`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(sigma)
	document.body.appendChild(p)
	document.body.appendChild(f)

	p.data.onchange = v=>{
		core.generatePoints()
	}
	f.data.onchange = v=>{
		core.generateRandomFunction()
		core.generatePoints()
	}
	sigma.data.onchange = v=>{
		core.generatePoints()
		core.sigma = v
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext('2d')

		this.vCanvas = document.createElement('canvas')
		this.vCanvas.width = this.w
		this.vCanvas.height = this.h
		this.vctx = this.vCanvas.getContext('2d')

		this.tCanvas = document.createElement('canvas')
		this.tCanvas.width = this.w
		this.tCanvas.height = this.h
		this.tctx = this.tCanvas.getContext('2d')

		//VISUALS
		this.margin = 50 * this.ratio
		this.fidelity = 128
		this.mainLineWidth = this.ratio * 3
		this.pointSize = this.ratio * 6

		//DATA
		this.pointCount = 10
		this.sigma = .001
		this.tolerance = .000001
		this.rangeX = [0, 4]
		this.rangeY = [-1, 1]
		this.f

		this.dx = (this.w - this.margin * 2) / (this.rangeX[1] - this.rangeX[0])
		this.dy = (this.h - this.margin * 2) / (this.rangeY[1] - this.rangeY[0])

		this.ctx.font = this.ratio * 14 + `px Courier`;
		// this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.lineWidth = this.ratio
		this.ctx.lineCap = `round`

		this.generateRandomFunction()
		this.generatePoints()
		this.run()

	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){

		this.averageCost = 0

		for (let i = 0; i < this.points.length; i++){

			let p = this.points[i]
			this.averageCost += (p.y - this.rangeY[0])
			if (!p.done){

				this.iterationsCount++
				let der = this.f(p.x + this.sigma) - this.f(p.x - this.sigma)

				p.lx = p.x
				p.ly = p.y
				p.x -= der
				p.y = this.f(p.x)

				if (Math.abs(der) < this.tolerance) {
					p.done = true
				} else if (p.x < this.rangeX[0] || p.x > this.rangeX[1]) {
					this.points.splice(i,1)
					i--
				}

			}

		}

		this.averageCost /= this.points.length

	}

	generateRandomFunction(){

		// this.f = x=>Math.sin(x)*Math.sin(x*3+4)
		let k1 = Math.random()*10 - 5
		let k2 = Math.random()*10 - 5
		this.f = x=>Math.sin(x)*Math.sin(x*k1 + k2)
		this.vDrawF()

	}

	generatePoints(){

		this.points = []
		this.iterationsCount = 0

		for (let i = 0; i < this.pointCount; i++){

			let p = {done: false, x: this.rangeX[0] + Math.random() * (this.rangeX[1] - this.rangeX[0])}
			p.y = this.f(p.x)
			this.points.push(p)

		}

		this.tctx.clearRect(0, 0, this.w, this.h)

	}

	vDrawF(){

		this.vctx.clearRect(0, 0, this.w, this.h)
		this.vctx.save()
		this.vctx.strokeStyle = `#305082`
		this.vctx.lineWidth = this.mainLineWidth
		this.vctx.translate(this.margin, this.h / 2)

		this.vctx.beginPath()
		for (let i = this.rangeX[0]; i < this.rangeX[1]; i+= (this.rangeX[1] - this.rangeX[0]) / this.fidelity){

			if (i === this.rangeX[0]) this.vctx.moveTo(i * this.dx, -this.f(i) * this.dy); else this.vctx.lineTo(i * this.dx, -this.f(i) * this.dy)

		}
		this.vctx.stroke()
		this.vctx.restore()
	}

	drawPoints(){

		this.ctx.save()
		this.ctx.translate(this.margin, this.h / 2)
		this.tctx.save()
		this.tctx.strokeStyle = `#ff853933`
		this.tctx.translate(this.margin, this.h / 2)

		for (let i = 0; i < this.points.length; i++){

			let p = this.points[i]
			this.ctx.fillStyle = p.done ? `#305082` : `#48FF7B` //`#ff8539` Yellow
			this.ctx.beginPath()
			this.ctx.arc(p.x * this.dx, -p.y * this.dy, this.pointSize, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			if (!p.done){

				this.tctx.beginPath()
				this.tctx.moveTo(p.lx * this.dx, -p.ly * this.dy)
				this.tctx.lineTo(p.x * this.dx, -p.y * this.dy)
				this.tctx.stroke()

			}

		}

		this.ctx.restore()
		this.tctx.restore()

	}

	drawLegend(){

		this.ctx.save()
		this.ctx.translate(this.margin, this.margin)
		this.ctx.fillStyle = `#fff`

		this.ctx.fillText(`Sigma: ${Math.floor(this.sigma*10000)/10000}`, 0, 0)
		this.ctx.fillText(`Iterations count: ${this.iterationsCount}`, 0, this.ratio * 18)
		this.ctx.fillText(this.averageCost ? `Average cost: ${Math.floor(this.averageCost*100)/100}` : `All points are gone :(`, 0, this.ratio * 36)
		
		this.ctx.restore()

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.drawImage(this.tCanvas, 0, 0)
		this.ctx.drawImage(this.vCanvas, 0, 0)

		this.drawPoints()
		this.drawLegend()

	}

}