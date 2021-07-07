let core;
window.onload = ()=>{

	let d = new Range({ width: 400, value: 0, class: `input`, min: -.6, max: .6, scale: 4, label: `Delta`, labelWidth: 120, step: .01})
	// let b = new Button({n: `Random structure`, class: `go`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(d)
	// document.body.appendChild(b)

	d.data.onchange = v=>{
		core.delta = v
	}
	// b.data.onchange = v=>{
	// 	core.generateBands(5)
	// }
}

class Core {

	constructor(canvas) {

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		//VISUALS
		this.radius = 10 * this.ratio
		this.atoms = 7
		this.margin = 80 * this.ratio
		this.mainLine = this.ratio * 2
		this.accuracy = .05

		//DATA
		this.delta = 0

		//GENERATED
		this.step = (this.w - this.margin * 2) / (this.atoms - 1)

		this.ctx.font = this.ratio * 18 + `px Arial`;
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`

		this.run()

	}

	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}


	update(){

		//TEMP
		// this.delta = Math.sin(performance.now() / 1000) * .6

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.w, this.h)

		this.drawLattice()
		this.drawPlot()

	}

	map(n){
		return n * this.h / 8
	}

	f(x){
		return .4142135624 * Math.sqrt(1 + this.delta ** 2 + (1 - this.delta ** 2) * Math.cos(x))
	}

	drawPlot(){

		this.ctx.save()
		this.ctx.strokeStyle = `#fff6`
		this.ctx.translate(this.w/2, this.h/3*2)

		//Axis
		this.ctx.beginPath()
		this.ctx.moveTo(0, this.map(-2))
		this.ctx.lineTo(0, this.map(2))
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(this.map(-4), 0)
		this.ctx.lineTo(this.map(4), 0)
		this.ctx.stroke()

		//Plot
		this.ctx.strokeStyle = `#48FF7B`
		this.ctx.lineWidth = this.mainLine

		this.ctx.beginPath()
		this.ctx.moveTo(this.map(-4), 3 * this.map(this.f(-4)))
		for (let x = -4; x < 4; x+=this.accuracy){
			this.ctx.lineTo(this.map(x), 3 * this.map(this.f(x)))
		}
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(this.map(-4), 3 * this.map(-this.f(-4)))
		for (let x = -4; x < 4; x+=this.accuracy){
			this.ctx.lineTo(this.map(x), 3 * this.map(-this.f(x)))
		}
		this.ctx.stroke()

		//text

		this.ctx.fillStyle = `#fff`
		this.ctx.fillText(`E`, 0, this.map(-2.2))
		this.ctx.fillText(`k`, this.map(4.2), 0)

		this.ctx.restore()

	}

	drawLattice(){

		for (let i = 1; i < this.atoms; i+=2){
			let x1 = this.margin + (i-1) * this.step
			let x2 = this.margin + (i) * this.step + this.delta * this.step
			let x3 = this.margin + (i+1) * this.step
			let gap1 = x2 - x1
			let gap2 = x3 - x2
			let k1 = this.step / gap1
			let k2 = this.step / gap2
			let t1 = this.radius * k1 / 3
			let t2 = this.radius * k2 / 3
			this.ctx.fillStyle = `rgba(118, 158, 255, ${k1 * .3 - .1})`
			this.ctx.fillRect(x1, this.margin - t1, gap1, t1 * 2)
			this.ctx.fillStyle = `rgba(118, 158, 255, ${k2 * .3 - .1})`
			this.ctx.fillRect(x2, this.margin - t2, gap2, t2 * 2)

		}

		this.ctx.fillStyle = `#fff`
		for (let i = 0; i < this.atoms; i++){
			let x = this.margin + i * this.step
			if ((i+1)%2===0) {
				x += this.delta * this.step
			}
			this.ctx.beginPath()
			this.ctx.arc(x, this.margin, this.radius, 0, Math.PI * 2)
			this.ctx.fill()

		}
	}

}