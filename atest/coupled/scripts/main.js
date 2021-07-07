let core;
window.onload = ()=>{

	let p1 = new Range({ width: 500, value: .005, class: `input`, min: .001, max: .01, scale: 1, label: `Orange oscillator frequency`, labelWidth: 220, formula: v=>Math.floor(v*10000), step: .0005})
	let p2 = new Range({ width: 500, value: .005, class: `input`, min: .001, max: .01, scale: 1, label: `Green oscillator frequency`, labelWidth: 220, formula: v=>Math.floor(v*10000), step: .0005})
	let l = new Range({ width: 500, value: .0001, class: `input`, min: .00001, max: .0005, scale: 1, label: `Coupling`, labelWidth: 220, formula: v=>v*10000})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(p1)
	document.body.appendChild(p2)
	document.body.appendChild(l)

	l.data.onchange = v=>{
		core.linkTension = v
		core.restart()
	}
	p1.data.onchange = v=>{
		core.baseTension = v
		core.restart()
	}
	p2.data.onchange = v=>{
		core.passiveTension = v
		core.restart()
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		this.vCanvas = document.createElement('canvas');
		this.vCanvas.width = this.canvas.width;
		this.vCanvas.height = this.canvas.height;
		this.vctx = this.vCanvas.getContext('2d');

		//DATA
		this.baseTension = .005
		this.passiveTension = .005
		this.linkTension = .0001
		this.friction = 0

		this.p1 = {p: .1, v: 0}
		this.p2 = {p: .66, v: 0}
		this.margin = this.ratio * 100
		this.unit = this.h - this.margin * 2
		this.radius = 10 * this.ratio
		this.mode = 0
		this.scrollSpeed = 1
		this.energy = 0

		this.ctx.font = this.ratio * 10 + `px Courier`;
		// this.ctx.textBaseline = `middle`
		this.ctx.textAlign = `center`
		// this.canvas.addEventListener(`mousemove`, e=>{if (e.buttons) {this.handleMouse(e)}});
		// this.canvas.addEventListener(`click`, e=>{this.handleMouse(e)});

		this.run()

	}


	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	restart(){
		this.p1.p = .1
		this.p1.v = 0
		this.p2.v = 0
		this.p2.p = .66
	}

	updateSettings(p1){

		this.p1.v = 0
		this.p2.v = 0
		this.p2.p = .66

		this.p1.p = p1

	}

	update(){

		let vs1 = Math.sign(this.p1.v)
		let vs2 = Math.sign(this.p2.v)

		this.p1.pp = this.p1.p
		this.p2.pp = this.p2.p

		let f = (this.p2.p - this.p1.p - .66) * this.linkTension

		let f1 = (.33 - this.p1.p) * this.baseTension
		this.p1.v += (f1 + f)
		this.p1.v *= (1 - this.friction)
		this.p1.p += this.p1.v

		//let f2 = (.66 - this.p2.p) * this.baseTension
		let f2 = (.66 - this.p2.p) * this.passiveTension
		this.p2.v += (f2 - f)
		this.p2.v *= (1 - this.friction)
		this.p2.p += this.p2.v

		if (vs1 !== Math.sign(this.p1.v)) this.p1.a = (Math.abs(this.p1.p - .33))
		if (vs2 !== Math.sign(this.p2.v)) this.p2.a = (Math.abs(this.p2.p - .66))

		if (this.p1.a && this.p2.a){
			this.energy = (this.p1.a ** 2 * this.baseTension / (this.p1.a ** 2 * this.baseTension + this.p2.a ** 2 * this.passiveTension)) * .1 + this.energy * .9
		}

	}

	updateGraph(){

		this.vctx.drawImage(this.vCanvas, this.scrollSpeed, 0)

		this.vctx.fillStyle = `#112`
		this.vctx.fillRect(0,0,this.scrollSpeed,this.h)

		this.vctx.lineCap = `round`
		this.vctx.lineWidth = this.ratio * 2

		this.vctx.strokeStyle = `#ff8539`
		this.vctx.beginPath()
		this.vctx.moveTo(0, this.margin + this.unit * this.p1.p)
		this.vctx.lineTo(this.scrollSpeed, this.margin + this.unit * this.p1.pp)
		this.vctx.stroke()

		this.vctx.strokeStyle = `#48FF7B`
		this.vctx.beginPath()
		this.vctx.moveTo(0, this.margin + this.unit * this.p2.p)
		this.vctx.lineTo(this.scrollSpeed, this.margin + this.unit * this.p2.pp)
		this.vctx.stroke()

	}

	draw(){

		this.updateGraph()

		this.ctx.lineWidth = this.ratio
		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.w, this.h)
		this.ctx.drawImage(this.vCanvas, this.margin, 0)

		// //Bar
		// this.ctx.strokeStyle = `#fff`
		// this.ctx.beginPath()
		// this.ctx.moveTo(this.margin, this.margin)
		// this.ctx.lineTo(this.margin, this.h - this.margin)
		// this.ctx.stroke()

		//Springs
		this.ctx.strokeStyle = `#305082`
		this.ctx.lineWidth = this.ratio * (1 - (this.p2.p - this.p1.p))**2 * this.radius 
		this.ctx.beginPath()
		this.ctx.moveTo(this.margin, this.margin + this.unit * this.p1.p)
		this.ctx.lineTo(this.margin, this.margin + this.unit * this.p2.p)
		this.ctx.stroke()

		// this.ctx.strokeStyle = `#ff853966`
		this.ctx.lineWidth = this.ratio * (1 - this.p1.p)**2 * this.radius / 2
		this.ctx.beginPath()
		this.ctx.moveTo(this.margin, this.margin)
		this.ctx.lineTo(this.margin, this.margin + this.unit * this.p1.p)
		this.ctx.stroke()

		// this.ctx.strokeStyle = `#48FF7B66`
		this.ctx.lineWidth = this.ratio * (this.p2.p)**2 * this.radius / 2
		this.ctx.beginPath()
		this.ctx.moveTo(this.margin, this.margin + this.unit * this.p2.p)
		this.ctx.lineTo(this.margin, this.h - this.margin)
		this.ctx.stroke()

		//P1
		this.ctx.fillStyle = `#ff8539`
		this.ctx.beginPath()
		this.ctx.arc(this.margin, this.margin + this.unit * this.p1.p, this.radius, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		//P2
		this.ctx.fillStyle = `#48FF7B`
		this.ctx.beginPath()
		this.ctx.arc(this.margin, this.margin + this.unit * this.p2.p, this.radius, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		//ENERGY
		this.ctx.save()
		this.ctx.translate(this.w - this.margin, this.h - this.margin / 2)

		this.ctx.fillStyle = `#48FF7B`
		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		this.ctx.fillStyle = `#ff8539`
		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2 * this.energy)
		this.ctx.lineTo(0, 0)
		this.ctx.closePath()
		this.ctx.fill()

		this.ctx.fillStyle = `#fff`
		this.ctx.fillText(`Energy ratio`, 0, -this.radius * 4)

		this.ctx.restore()

	}

}