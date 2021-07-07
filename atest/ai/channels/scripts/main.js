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

		this.f = .2
		this.f2 = .1
		this.df = .002
		this.df2 = .0005

		this.cellSize = Math.floor(this.w / 3)
		this.topMargin = (this.h - this.cellSize) * .6

		this.initImages()

	}

	initImages(){

		const source = new Image()
		source.src = `channels/img/kp.jpg`
		source.onload = _=>{

			const c = document.createElement(`canvas`)

			c.width = this.cellSize
			c.height = this.cellSize
			const ctx = c.getContext(`2d`)

			ctx.drawImage(source, 0, 0, this.cellSize, this.cellSize)

			const pixels = ctx.getImageData(0, 0, c.width, c.height)
			const red = ctx.createImageData(c.width, c.height)
			const green = ctx.createImageData(c.width, c.height)
			const blue = ctx.createImageData(c.width, c.height)

			this.channelsText = {r: [], g: [], b: []}

			for (let i = 0; i < pixels.data.length; i += 4){

				red.data[i] = pixels.data[i]
				green.data[i+1] = pixels.data[i+1]
				blue.data[i+2] = pixels.data[i+2]
				red.data[i+3] = green.data[i+3] = blue.data[i+3] = 255

				this.channelsText.r.push(pixels.data[i])
				this.channelsText.g.push(pixels.data[i+1])
				this.channelsText.b.push(pixels.data[i+2])
				
			}

			this.channels = {}

			this.channels.r = document.createElement(`canvas`)
			this.channels.g = document.createElement(`canvas`)
			this.channels.b = document.createElement(`canvas`)
			this.channels.r.width = this.channels.g.width = this.channels.b.width = c.width
			this.channels.r.height = this.channels.g.height = this.channels.b.height = c.height

			this.channels.r.getContext(`2d`).putImageData(red,0,0)
			this.channels.g.getContext(`2d`).putImageData(green,0,0)
			this.channels.b.getContext(`2d`).putImageData(blue,0,0)
			
			this.update()

		}

	}

	update(){

		requestAnimationFrame(_=>{this.update()})

		this.ctx.fillRect(0, 0, this.w, this.h)

		this.f = (this.f + this.df) % 1
		this.f2 = (this.f2 + this.df2) % 1

		// const f = this.f < .3 ? 0 : this.f < .5 ? Math.cos((this.f - .5) * 5 * Math.PI) * .5 + .5 : this.f < .8 ? 1 : Math.cos((this.f - .8) * 5 * Math.PI) * .5 + .5
		const f = this.f < .2 ? 0 : this.f < .5 ? 400 ** (2 * (this.f - .2) * 3.3333 - 2) : this.f < .7 ? 1 : 400 ** (-2 * (this.f - .7) * 3.3333)
		const f2 = this.f2 < .2 ? 0 : this.f2 < .5 ? -Math.cos((this.f2 - .2) * 3.3333 * Math.PI) * .5 + .5 : this.f2 < .7 ? 1 : Math.cos((this.f2 - .7) * 3.3333 * Math.PI) * .5 + .5
		const zoom = 1 + f2 * 50 * this.ratio
		const alfa = zoom < 20 * this.ratio ? (zoom - 15 * this.ratio) * .1 : 1

		this.ctx.save()
		this.ctx.translate(this.w * .5, this.h * .5)
		this.ctx.scale(zoom,zoom)
		this.ctx.globalCompositeOperation = `screen`

		const positivex = this.cellSize * f

		this.ctx.drawImage(this.channels.r, -this.cellSize * .5 - positivex, -this.cellSize * .5)
		this.ctx.drawImage(this.channels.g, -this.cellSize * .5, -this.cellSize * .5)
		this.ctx.drawImage(this.channels.b, -this.cellSize * .5 + positivex, -this.cellSize * .5)

		this.ctx.fillStyle = `#F00`
		this.ctx.fillText(`R`, -this.cellSize * f - 30 * this.ratio * (1 - f), -this.cellSize * .58)
		this.ctx.fillStyle = `#0F0`
		this.ctx.fillText(`G`, 0, -this.cellSize * .58)
		this.ctx.fillStyle = `#00F`
		this.ctx.fillText(`B`, this.cellSize * f + 30 * this.ratio * (1 - f), -this.cellSize * .58)

		this.ctx.font = `.25px monospace`
		this.ctx.globalAlpha = alfa
		this.ctx.translate(-this.cellSize * .5 + .5, -this.cellSize * .5 + .5)

		if (zoom > 15 * this.ratio){

			const minxy = Math.floor(this.cellSize / 2 - this.cellSize / zoom * 1.7)
			const dxy = Math.floor(this.cellSize / zoom * 2 * 1.7)

			for (let y = minxy; y < minxy + dxy; y++){
				for (let x = minxy; x < minxy + dxy; x++){

					let id = x + this.cellSize * y
					this.ctx.fillStyle = `#3F3`
					this.ctx.fillText(this.channelsText.g[id], x, y)
					this.ctx.fillStyle = `#F60`
					this.ctx.fillText(this.channelsText.r[id], x - positivex, y - .2)
					this.ctx.fillStyle = `#06F`
					this.ctx.fillText(this.channelsText.b[id], x + positivex, y + .2)

				}
			}

		}

		this.ctx.restore()


	}

}


