let core

window.onload = _=>{

	core = new Core(document.querySelector(`.canvas`))

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)

		this.ctx.font = `800 ` + 32 * this.ratio + `px Georgia`
		this.ctx.textBaseline = `middle`
		this.ctx.textAlign = `center`
		this.ctx.imageSmoothingEnabled = false

		this.color = {
			base: `#e9e9e0`,
			padding: `#f1f1f1`,
			frame: `#5351ab`,
			dot: `#1123`
		}

		this.f = this.ff = this.n = 0
		this.df = .0005
		this.divisions = 7
		this.cellSize = Math.floor(this.h * .6)
		this.unit = Math.floor(this.cellSize / this.divisions)
		this.hair = this.ratio
		this.ctx.lineWidth = this.hair * 2

		this.topMargin = (this.h - this.cellSize) * .5
		this.leftMargin = (this.w - this.cellSize * 2) * .33

		this.update()

	}

	update(){

		requestAnimationFrame(_=>{this.update()})
		this.ctx.clearRect(0, 0, this.w, this.h)
		this.f = (this.f + this.df) % 1
		this.ff = this.f * this.divisions ** 2 % 1
		this.n = Math.floor(this.divisions ** 2 * this.f)

		this.drawBacks()
		this.drawFrame()

	}

	drawFrame(){

		let dx = this.unit * (this.n % this.divisions) - this.unit
		let dy = this.unit * Math.floor(this.n / this.divisions) - this.unit

		if (this.ff > .8){
			dx += ((this.n + 1) % this.divisions) ? this.unit * (this.ff - .8) * 5 : -this.unit * (this.divisions - 1) * (this.ff - .8) * 5
			dy += (this.n + 1 === this.divisions ** 2) ? -this.unit * (this.divisions - 1) * (this.ff - .8) * 5 : ((this.n + 1) % this.divisions) ? 0 : this.unit * (this.ff - .8) * 5
		}

		this.ctx.save()
		this.ctx.translate(this.leftMargin + dx, this.topMargin + dy)

		this.ctx.strokeStyle = this.color.frame
		for (let i = 0; i < 9; i++){

			this.ctx.strokeRect(this.unit * (i % 3), this.unit * Math.floor(i / 3), this.unit, this.unit)

		}

		this.ctx.restore()

	}

	drawBacks(){

		this.ctx.save()

		this.ctx.translate(this.leftMargin - this.unit, this.topMargin - this.unit)
		for (let i = 0; i < (this.divisions + 2) ** 2; i++){

			const x = this.unit * (i % (this.divisions + 2))
			const y = this.unit * Math.floor(i / (this.divisions + 2))
			const edge = (y === 0 || x === 0 || x > this.unit * this.divisions || y > this.unit * this.divisions)

			this.ctx.fillStyle = edge ? this.color.padding : this.color.base
			this.ctx.fillRect(x + this.hair, y + this.hair, this.unit - this.hair * 2, this.unit - this.hair * 2)

			if (!edge){
				this.ctx.fillStyle = this.color.dot
				this.ctx.beginPath()
				this.ctx.arc(x + this.unit * .5, y + this.unit * .5, this.hair * 1.6, 0, Math.PI * 2)
				this.ctx.closePath()
				this.ctx.fill()
			}
			
		}

		this.ctx.restore()

		this.ctx.save()

		this.ctx.translate(this.leftMargin * 2 + this.cellSize, this.topMargin)
		
		for (let i = 0; i < this.divisions ** 2; i++){

			this.ctx.fillStyle = i > this.n ? this.color.base : this.color.frame
			this.ctx.fillRect(this.unit * (i % this.divisions) + this.hair, this.unit * Math.floor(i / this.divisions) + this.hair, this.unit - this.hair * 2, this.unit - this.hair * 2)
		}

		this.ctx.restore()

	}

}


