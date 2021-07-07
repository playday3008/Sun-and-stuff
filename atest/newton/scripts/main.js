let core;
window.onload = ()=>{

	let speed = new Range({ width: 400, value: 1, class: `input`, min: .5, max: 12, scale: 1, label: `Simulation speed`, labelWidth: 160})
	let r = new Button({class: `button`, n: `Start over`})
	// let f = new Button({class: `button`, n: `Random function`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(speed)
	document.body.appendChild(r)
	// document.body.appendChild(f)

	speed.data.onchange = v=>{
		core.speed = v
	}
	r.data.onchange = v=>{
		core.reset()
	}
	// sigma.data.onchange = v=>{
	// 	core.generatePoints()
	// 	core.sigma = v
	// }
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
		this.eps = .000001
		this.deltas = []

		//Visuals
		this.wToX = w => (w - this.w/2) / this.w * 3 - .5
		this.xToW = x => (x + .5) / 3 * this.w + this.w / 2
		this.yToH = y => -(y - 1.4) * this.h * .3

		this.precision = 128
		this.r = this.ratio * 6
		this.step = this.w / this.precision
		this.dash = [this.ratio * 5, this.ratio * 5]
		this.speed = 1

		this.vctx.font = this.ctx.font = this.ratio * 18 + `px Georgia`
		this.ctx.textAlign = `center`

		this.generateFunction()
		this.reset()
		this.run()

	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	reset(){

		this.phase = 0
		this.pf = 0
		this.duration = 4000
		this.done = false
		this.time = 0
		this.deltas = []

		this.point = {x: -1.8}
		this.updatePoint()
		this.nextX = this.point.x1
		this.prevX = this.point.x
	}

	update(){

		if (Math.abs(this.prevX - this.nextX) > 1e-5){

			// let time = performance.now() % this.duration
			this.time += 15 * this.speed
			this.time %= this.duration
			let lastPhase = this.phase
			this.phase = Math.floor(this.time / this.duration * 4)
			this.pf = this.time / this.duration * 4 - this.phase

			if (lastPhase > this.phase){
				this.deltas.push(Math.abs(this.prevX))
				this.point.x = this.nextX
				this.updatePoint()
				this.nextX = this.point.x1
				this.prevX = this.point.x
			}

		} else if (!this.done){
			this.done = true
		}

	}

	updatePoint(){

		this.point.y = this.f(this.point.x)
		this.point.fDer = this.getDerivativeFunction(this.f)
		this.point.fDer2 = this.getDerivativeFunction(this.point.fDer)
		this.point.x1 = this.point.x - this.point.fDer(this.point.x)/this.point.fDer2(this.point.x)

	}

	generateFunction(){

		this.f = x=> (x * .7)**4 - Math.cos(x * 4) * .05
		// this.f = x=>Math.cos(x + 1.8) * Math.cos(x*2+4) + 2
		this.vDrawF()

	}

	getDerivativeFunction(f){

		return x=>{
			let dx = 1e-4 * x
			return (f(x + dx) - f(x - dx)) / (2 * dx)
		}

	}

	drawPoint(){

		this.ctx.save()
		this.ctx.translate(0, this.h / 2)

		//qx
		if (!this.done){
			this.ctx.strokeStyle = `#48FF7B`
			this.ctx.lineWidth = this.ratio * 2

			this.ctx.beginPath()
			for (let i = 0; i < this.precision; i++){

				let x = this.wToX(i * this.step)
				let dx = x - this.point.x
				let y = this.point.y + this.point.fDer(this.point.x) * dx + this.point.fDer2(this.point.x) / 2 * dx ** 2

				if (i === 0) this.ctx.moveTo(i * this.step, this.yToH(y)); else this.ctx.lineTo(i * this.step, this.yToH(y))
			}

			this.ctx.stroke()


		
			//Points
			let x1 = this.xToW(this.nextX)
			let y1 = this.yToH(this.point.y + this.point.fDer(this.prevX) * (this.nextX - this.prevX) + this.point.fDer2(this.prevX) / 2 * (this.nextX - this.prevX) ** 2)
			let y2 = this.yToH(this.f(this.nextX))

			this.ctx.globalAlpha = (this.phase === 0) ? 0 : (this.phase === 1) ? this.pf ** .5 : (this.phase === 2) ? 1 : 0
			
			this.ctx.fillStyle = this.ctx.strokeStyle = `#48FF7B`
			this.ctx.beginPath()
			this.ctx.arc(x1, y1, this.r, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			this.ctx.save()
			this.ctx.lineWidth = this.ratio
			this.ctx.setLineDash(this.dash)
			this.ctx.globalAlpha /= 2
			this.ctx.beginPath()
			this.ctx.moveTo(x1, -this.h/2)
			this.ctx.lineTo(x1, this.h/2)
			this.ctx.stroke()
			this.ctx.restore()
			
			this.ctx.globalAlpha = (this.phase < 2) ? 0 : (this.phase === 2) ? this.pf ** .5 : (this.phase === 2) ? 1 : 1

			this.ctx.fillStyle = `#305082`
			this.ctx.beginPath()
			this.ctx.arc(x1, y2, this.r, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
		}

		//Point itself
		this.ctx.globalAlpha = 1
		this.ctx.fillStyle = `#fff`
		this.ctx.beginPath()
		let x = this.xToW(this.point.x)
		let y = this.yToH(this.point.y)
		this.ctx.arc(x, y, this.r, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		if (this.phase === 3){

			this.point.x = this.prevX + (Math.sin(this.pf * Math.PI / 2)) * (this.nextX - this.prevX)
			this.updatePoint()

		}
		

		this.ctx.restore()

	}

	drawDelta(){

		this.ctx.save()
		this.ctx.translate(this.w * .6, this.h * .3)

		this.ctx.fillStyle = `#112C`
		this.ctx.fillRect(0, 0, this.ratio * 200, -this.ratio * 120)

		this.ctx.strokeStyle = this.ctx.fillStyle = `#fff8`
		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(0, -this.ratio * 120)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(this.ratio * 200, 0)
		this.ctx.stroke()

		this.ctx.font = this.ratio * 11 + `px Georgia`
		this.ctx.textAlign = `right`
		this.ctx.fillText(`iteration`, this.ratio * 200, this.ratio * 14)
		this.ctx.fillText(`cost`, -this.ratio * 8, -this.ratio * 116)

		this.ctx.fillStyle = `#ff8539`
		this.ctx.strokeStyle = `#ff853980`

		this.ctx.beginPath()
		for (let i = 0; i < this.deltas.length; i++){
			let d = this.deltas[i]
			if (i === 0) this.ctx.moveTo(i * this.ratio * 24, - d * this.ratio * 60); else this.ctx.lineTo(i * this.ratio * 24, - d * this.ratio * 60)
		}
		this.ctx.stroke()

		for (let i = 0; i < this.deltas.length; i++){

			let d = this.deltas[i]
			this.ctx.beginPath()
			this.ctx.arc(i * this.ratio * 24, - d * this.ratio * 60, this.r/2, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

		this.ctx.restore()

	}

	vDrawF(){


		this.vctx.strokeStyle = this.vctx.fillStyle = `#305082`
		this.vctx.save()
		this.vctx.translate(0, this.h / 2)

		this.vctx.lineWidth = this.ratio * 2

		this.vctx.beginPath()
		// this.vctx.moveTo(0, this.yToH(this.f(0)))

		for (let i = 0; i < this.precision; i++){

			let x = this.wToX(i * this.step)
			let y = this.f(x)

			if (i===0) this.vctx.moveTo(i * this.step, this.yToH(y)); else this.vctx.lineTo(i * this.step, this.yToH(y))

		}
		this.vctx.stroke()
		this.vctx.restore()

		this.vctx.fillText(`ƒ(𝑥)`, this.ratio * 20, this.h - this.ratio * 20)
		this.vctx.fillStyle = `#48FF7B`
		this.vctx.fillText(`q(𝑥)`, this.ratio * 70, this.h - this.ratio * 20)

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.drawImage(this.vCanvas, 0, 0)
		this.drawPoint()
		this.drawDelta()

	}

}