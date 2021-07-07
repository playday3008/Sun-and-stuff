let core;
window.onload = ()=>{

	// let speed = new Range({ width: 400, value: 1, class: `input`, min: 1, max: 1000, scale: 1, label: `Samples per frame`, labelWidth: 160})
	let r = new Button({class: `button`, n: `Restart`})
	
	core = new Core(document.querySelector('.vessel'))

	// document.body.appendChild(speed)
	document.body.appendChild(r)

	// speed.data.onchange = v=>{
	// 	core.ppf = v
	// }
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

		this.vcanvas = document.createElement(`canvas`)
		this.vcanvas.width = this.w
		this.vcanvas.height = this.h
		this.vctx = this.vcanvas.getContext(`2d`)

		this.r = this.ratio * 2
		this.bigR = this.ratio * 16
		this.speed = this.ratio * 4
		this.n = 4000
		this.points = []
		for (let i = 0; i < this.n; i++){
			this.points.push({x: Math.random()*this.w, y: Math.random()*this.h})
		}
		this.ball = {x: this.w / 2, y: this.h / 2, vx: 0, vy: 0}

		this.run()

	}

	reset(){
		this.vctx.clearRect(0, 0, this.w, this.h)
		this.ball = {x: this.w / 2, y: this.h / 2, vx: 0, vy: 0}
	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){

		for (let i = 0; i < this.points.length; i++){
			this.points[i].x += (Math.random() - .5) * this.speed
			this.points[i].y += (Math.random() - .5) * this.speed

			if (this.points[i].x > this.w) this.points[i].x %= this.w
			if (this.points[i].x < 0) this.points[i].x += this.w
			if (this.points[i].y > this.h) this.points[i].y %= this.h
			if (this.points[i].y < 0) this.points[i].y += this.h
		}

		this.ball.vx += (Math.random() - .5) * .2
		this.ball.vy += (Math.random() - .5) * .2

		this.ball.x += this.ball.vx
		this.ball.y += this.ball.vy

		if (this.ball.x > this.w) 	this.ball.x %= this.w
		if (this.ball.x < 0) 		this.ball.x += this.w
		if (this.ball.y > this.h) 	this.ball.y %= this.h
		if (this.ball.y < 0) 		this.ball.y += this.h

		this.ball.vx *= .99
		this.ball.vy *= .99

	}


	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.fillStyle = `#fff9`
		for (let i = 0; i < this.points.length; i++){
			this.ctx.fillRect(this.points[i].x, this.points[i].y, this.r, this.r)
		}

		this.ctx.fillStyle = `#48FF7B`
		this.ctx.beginPath()
		this.ctx.arc(this.ball.x, this.ball.y, this.bigR, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		this.vctx.fillStyle = `#ff${40 + Math.floor(Math.sin(performance.now() / 10000) * 40)}39`
		this.vctx.fillRect(this.ball.x, this.ball.y, this.r, this.r)

		this.ctx.drawImage(this.vcanvas, 0, 0)
		

	}

}