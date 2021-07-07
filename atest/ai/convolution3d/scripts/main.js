let core

window.onload = _=>{

	const s = new Range({width: 500, value: .15, class: `input`, min: 0, max: 1, scale: 1, label: `Look inside`, labelWidth: 200})
	const o = new Range({width: 500, value: 1, class: `input`, min: .1, max: 1, scale: 1, label: `Opacity`, labelWidth: 200})

	document.body.appendChild(s)
	document.body.appendChild(o)


	core = new Core(document.querySelector(`.canvas`))

	s.data.onchange = v=>{
		core.spreads = [1+v * .8, 1+v * .5]
	}
	o.data.onchange = v=>{
		core.opacity = v
	}

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 18 * this.ratio
		this.ctx.font = this.fontSize + `px Georgia`
		this.ctx.textAlign = `center`

		this.dataSize = 5
		this.cellSize = this.h * .1
		this.pause = 60
		this.spreads = [1 + .15 * .8, 1 + .15 * .5]
		this.opacity = 1
		
		this.init()
		this.cycle()

	}

	cycle(){

		requestAnimationFrame(_=>{this.cycle()})

		for (let i = 0; i < this.input.length; i++){
			this.input[i].fade *= .95
		}
		this.draw()

		this.frame++
		if (this.frame > this.pause){

			this.frame = 0
			this.updateKernel()
			this.updateState()

		}

	}

	updateKernel(){

		let dx = 0
		let dy = 0
		let dz = 0
		
		if (this.max.x + 1 < this.dataSize){
			dx = 1
			this.max.x++
		} else {
			dx = -this.dataSize + 3
			this.max.x = 2
			if (this.max.y + 1 < this.dataSize){
				dy = 1
				this.max.y++
			} else {
				dy = -this.dataSize + 3
				this.max.y = 2
				if (this.max.z + 1 < this.dataSize){
					dz = 1
					this.max.z++
				} else {
					dz = -this.dataSize + 3
					this.max.z = 2
					for (let i = 0; i < this.output.length; i++){
						this.output[i].fade = 0
						this.output[i].on = false
					}
				}
			}
		}

		for (let i = 0; i < this.kernel.length; i++){
			this.kernel[i][0] += dx
			this.kernel[i][1] += dy
			this.kernel[i][2] += dz
		}

	}

	updateState(){

		for (let i = 0; i < this.input.length; i++){
			if (this.input[i].on) this.input[i].fade = 1
			this.input[i].on = false
		}

		for (let i = 0; i < this.kernel.length; i++){

			const index = this.kernel[i][2] + this.kernel[i][1] * this.dataSize + this.kernel[i][0] * this.dataSize ** 2
			this.input[index].on = true

		}

		for (let i = 0; i < this.output.length; i++){
			if (this.output[i].on) this.output[i].fade = 1
			this.output[i].on = false
		}

		const ix = this.max.x - 2
		const iy = this.max.y - 2
		const iz = this.max.z - 2
		// console.log(this.max)
		const index = iz + iy * (this.dataSize - 2) + ix * (this.dataSize - 2) ** 2
		this.output[index].on = true

	}

	init(){

		const input = []
		const output = []

		this.initImage()

		for (let x = 0; x < this.dataSize; x++){
			for (let y = 0; y < this.dataSize; y++){
				for (let z = 0; z < this.dataSize; z++){

					input.push({
						x: x,
						y: y,
						z: z,
						on: false,
						fade: 0
					})

				}
			}
		}

		for (let x = 0; x < this.dataSize - 2; x++){
			for (let y = 0; y < this.dataSize - 2; y++){
				for (let z = 0; z < this.dataSize - 2; z++){

					output.push({
						x: x,
						y: y,
						z: z,
						on: false,
						fade: 0
					})

				}
			}
		}

		this.input = input
		this.inputSorted = [...input]
		this.inputSorted.sort((a,b)=>b.x + b.y + b.z - a.x - a.y - a.z)

		this.output = output
		this.outputSorted = [...output]
		this.outputSorted.sort((a,b)=>b.x + b.y + b.z - a.x - a.y - a.z)

		this.frame = 0
		this.kernel = [[0,0,0], [0,0,1], [0,0,2], [0,1,0], [0,1,1], [0,1,2], [0,2,0], [0,2,1], [0,2,2], [1,0,0], [1,0,1], [1,0,2], [1,1,0], [1,1,1], [1,1,2], [1,2,0], [1,2,1], [1,2,2], [2,0,0], [2,0,1], [2,0,2], [2,1,0], [2,1,1], [2,1,2], [2,2,0], [2,2,1], [2,2,2]]
		this.max = {x: 2, y: 2, z: 2}
		this.updateState()

	}

	initImage(){

		this.cellNormal = this.drawCube(`#C8CCD7`, `#979BB0`, `#D9DCE4`)
		this.cellHigh = this.drawCube(`#E55555`, `#CC4354`, `#F67356`)

	}

	drawCube(dif, sha, hig){

		const points = [[0, -.5], [.43, -.25], [.43, .25], [0, .5], [-.43, .25], [-.43, -.25]]

		const img = document.createElement(`canvas`)
		img.width = this.cellSize
		img.height = this.cellSize
		const ctx = img.getContext(`2d`)

		ctx.translate(img.width / 2, img.height / 2)

		ctx.fillStyle = dif
		ctx.beginPath()
		ctx.moveTo(points[0][0] * this.cellSize, points[0][1] * this.cellSize)
		for (let i = 1; i < points.length; i++){
			ctx.lineTo(points[i][0] * this.cellSize, points[i][1] * this.cellSize)
		}
		ctx.closePath()
		ctx.fill()

		ctx.fillStyle = sha
		ctx.beginPath()
		ctx.moveTo(points[1][0] * this.cellSize, points[1][1] * this.cellSize)
		ctx.lineTo(points[2][0] * this.cellSize, points[2][1] * this.cellSize)
		ctx.lineTo(points[3][0] * this.cellSize, points[3][1] * this.cellSize)
		ctx.lineTo(0, 0)
		ctx.closePath()
		ctx.fill()

		ctx.fillStyle = hig
		ctx.beginPath()
		ctx.moveTo(points[0][0] * this.cellSize, points[0][1] * this.cellSize)
		ctx.lineTo(points[1][0] * this.cellSize, points[1][1] * this.cellSize)
		ctx.lineTo(0, 0)
		ctx.lineTo(points[5][0] * this.cellSize, points[5][1] * this.cellSize)
		ctx.closePath()
		ctx.fill()

		return img

	}

	draw(){

		this.ctx.clearRect(0, 0, this.w, this.h)

		this.ctx.save()
		this.ctx.translate(this.w / 3, this.h / 2)

		for (let i = 0; i < this.inputSorted.length; i++){

			const x = this.inputSorted[i].x * this.cellSize * .43 * this.spreads[0] - this.inputSorted[i].y * this.cellSize * .43 * this.spreads[0] - this.cellSize * .5
			const y = this.inputSorted[i].z * this.cellSize * .5 * this.spreads[1]  - this.inputSorted[i].x * this.cellSize * .25 * this.spreads[0] -this.inputSorted[i].y * this.cellSize * .25 * this.spreads[0] - this.cellSize * .5

			if (this.inputSorted[i].on){
				this.ctx.globalAlpha = 1
				this.ctx.drawImage(this.cellHigh, x, y)
			} else {
				this.ctx.globalAlpha = this.opacity
				this.ctx.drawImage(this.cellNormal, x, y)
				if (this.inputSorted[i].fade){
					this.ctx.save()
					this.ctx.globalAlpha = this.inputSorted[i].fade
					this.ctx.drawImage(this.cellHigh, x, y)
					this.ctx.restore()
				}
			}
			

		}

		this.ctx.restore()

		this.ctx.save()
		this.ctx.translate(this.w / 5 * 4, this.h / 2)

		for (let i = 0; i < this.outputSorted.length; i++){

			const x = this.outputSorted[i].x * this.cellSize * .43 * this.spreads[0] - this.outputSorted[i].y * this.cellSize * .43 * this.spreads[0] - this.cellSize * .5
			const y = this.outputSorted[i].z * this.cellSize * .5 * this.spreads[1]  - this.outputSorted[i].x * this.cellSize * .25 * this.spreads[0] -this.outputSorted[i].y * this.cellSize * .25 * this.spreads[0] - this.cellSize * .5

			if (this.outputSorted[i].on){
				this.ctx.globalAlpha = 1
				this.ctx.drawImage(this.cellHigh, x, y)
			} else if (this.outputSorted[i].fade){
				this.ctx.globalAlpha = this.opacity
				this.ctx.drawImage(this.cellNormal, x, y)
			}
			

		}

		this.ctx.restore()

		this.ctx.fillText(`3-dimensional input space`, this.w / 3, this.h * .15)
		this.ctx.fillText(`3-dimensional filtered space`, this.w / 5 * 4, this.h * .15)

	}

}
