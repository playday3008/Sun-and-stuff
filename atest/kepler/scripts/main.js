let core;
window.onload = ()=>{

	// let speed = new Range({ width: 400, value: 1, class: `input`, min: 1, max: 1000, scale: 1, label: `Samples per frame`, labelWidth: 160})
	// let r = new Button({class: `button`, n: `Restart`})
	
	core = new Core(document.querySelector('.vessel'))

	// document.body.appendChild(speed)
	// document.body.appendChild(r)

	// speed.data.onchange = v=>{
	// 	core.ppf = v
	// }
	// r.data.onchange = v=>{
	// 	core.reset()
	// }
}

//AND NOW SUPERFINE!!!!!!!

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

		this.color = light(`fire`)
		this.c = {x: this.w * 3 / 4, y: this.h/2}
		this.points = []
		this.framesPerSector = 16
		this.frame = this.framesPerSector
		this.transform = false
		this.r = this.ratio * 8
		this.R = this.ratio * 16
		this.planet = {x: this.w / 8, y: 0, vx: 0, vy: this.ratio * -5.1}

		
		this.ctx.font = `${14 * this.ratio}px Georgia`

		this.run()

	}

	predraw(){

		this.vctx.beginPath()
		this.vctx.strokeStyle = `#48FF7B66`
		this.vctx.lineWidth = this.ratio

		for (let a = 0; a < Math.PI * 2; a += .01){
			this.vctx.save()
			this.vctx.translate(this.c.x, this.c.y)
			this.vctx.rotate(a)
			let r = this.getDistAtAngle(a)

			if (a === 0) this.vctx.moveTo(r, 0); else this.vctx.lineTo(r, 0)

			this.vctx.restore()
		}

		this.vctx.closePath()
		this.vctx.stroke()

	}



	drawPlanet(){

		this.ctx.save()
		this.ctx.translate(this.c.x, this.c.y)

		this.ctx.fillStyle = `#fff`
		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.R, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		this.ctx.fillStyle = `#fff`//`#48FF7B`
		this.ctx.beginPath()
		this.ctx.arc(this.planet.x, this.planet.y, this.r, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		let v1 = {x: -this.planet.x, y: -this.planet.y}
		let v2 = {x: this.planet.vx, y: this.planet.vy}
		let v2mag = Math.sqrt(v2.x ** 2 + v2.y ** 2)
		let value = (v1.x * v2.x + v1.y * v2.y) / v2mag
		v2.x *= value / v2mag
		v2.y *= value / v2mag

		let v3 = {x: -v2.y, y: v2.x}
		let value2 = (v1.x * v3.x + v1.y * v3.y) / value
		v3.x *= value2 / value
		v3.y *= value2 / value

		this.drawArrow(this.planet.x, this.planet.y, v2.x, v2.y, this.planet.f, `#0BD8E5`)
		this.drawArrow(this.planet.x, this.planet.y, v3.x, v3.y, this.planet.f, `#A4E9BF`)
		this.drawArrow(this.planet.x, this.planet.y, -this.planet.x, -this.planet.y, this.planet.f, `#fff9`)

		this.ctx.fillStyle = `#0BD8E5`
		let xt = this.planet.x + v2.x * this.planet.f
		let yt = this.planet.y + v2.y * this.planet.f - this.ratio * 14
		this.ctx.fillText(`F`, xt, yt)
		this.ctx.fillText(`t`, xt + this.ratio * 10, yt + this.ratio * 4)
		this.ctx.fillStyle = `#A4E9BF`
		let xn = this.planet.x + v3.x * this.planet.f
		let yn = this.planet.y + v3.y * this.planet.f - this.ratio * 14
		this.ctx.fillText(`F`, xn, yn)
		this.ctx.fillText(`n`, xn + this.ratio * 9, yn + this.ratio * 4)

		this.ctx.restore()

	}

	drawArrow(x, y, dx, dy, s, c){

		this.ctx.save()
		let r = Math.sqrt(dx**2 + dy**2) * s
		let d = this.ratio * 4
		this.ctx.translate(x, y)
		this.ctx.rotate(Math.atan2(dy, dx))
		this.ctx.strokeStyle = this.ctx.fillStyle = c
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(r, 0)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(r + d * 3,0)
		this.ctx.lineTo(r, -d)
		this.ctx.lineTo(r, d)
		this.ctx.closePath()
		this.ctx.fill()

		this.ctx.restore()

	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){

		if (this.frame > 0){
			this.points.push([this.planet.x, this.planet.y])
			this.frame--
		} else {
			this.drawSector()
			this.points = [[this.planet.x, this.planet.y]]
			this.frame = this.framesPerSector
		}

		let r2 = (this.planet.x ** 2 + this.planet.y ** 2)
		let r = Math.sqrt(r2)
		let f = 1250 * this.ratio ** 3 / r2
		let dp = [-this.planet.x / r * f, -this.planet.y / r * f]

		this.planet.f = f * 8

		this.planet.vx += dp[0]
		this.planet.vy += dp[1]

		this.planet.x += this.planet.vx
		this.planet.y += this.planet.vy


	}

	drawSector(){

		this.vctx.save()
		this.vctx.translate(this.c.x, this.c.y)
		this.vctx.fillStyle = this.color.rgb(Math.sin(performance.now() / 10000) * .25 + .25)
		this.vctx.beginPath()
		this.vctx.moveTo(0, 0)
		for (let i = 0; i < this.points.length; i++){
			this.vctx.lineTo(this.points[i][0], this.points[i][1])
		}
		this.vctx.closePath()
		this.vctx.fill()
		this.vctx.restore()

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx.drawImage(this.vcanvas, 0, 0)
		this.drawPlanet()
		

	}

}