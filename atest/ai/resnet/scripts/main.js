let core

window.onload = _=>{

	const s = new Range({width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 4, label: `Steps`, labelWidth: 100})
	const t = new Toggle({n1: `Skipping is on`, n2: `Skipping is off`, class: `go`})

	document.body.appendChild(s)
	document.body.appendChild(t)

	core = new Core(document.querySelector(`.canvas`))

	s.data.onchange = v=>{
		core.f = v
		core.update()
	}

	t.data.onchange = v=>{
		core.resnet = !core.resnet
		core.update()
	}

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 16 * this.ratio
		this.ctx.font = this.fontSize + `px Verdana`
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.strokeStyle = `#336`
		this.ctx.textBaseline = `middle`
		// this.ctx.textAlign = `center`
		this.ctx.imageSmoothingEnabled = false

		this.size = 28
		this.kernel = [[1,2,1,0,0,0,-1,-2,-1], [-1,0,1,-2,0,2,-1,0,1]]
		this.data = {}
		this.positiveMap = light(`fire`)
		this.negativeMap = light(`ice`).reverse()

		this.f = 0
		this.df = .0005
		this.steps = [`original`, `c1`, `bn1`, `relu1`, `c2`, `bn2`, `sum`, `relu2`]
		this.stepNames = [`Original image`, `Convolution 1`, `Batch norm 1`, `Relu 1`, `Convolution 2`, `Batch norm 2`, `Add original`, `Relu 2`]
		this.steplength = 1 / (this.steps.length - 1)
		this.resnet = true

		this.margin = this.h * .12
		this.subMargin = this.margin * .2
		this.cellHeight = (this.h - this.margin * 2) / (this.steps.length - 1)

		this.initImages()

	}

	setSpeed(s){

		this.df = s * .00001

	}

	initImages(){

		this.source = new Image()
		this.source.src = `resnet/img/source.png`
		this.source.onload = _=>{

			const c = document.createElement(`canvas`)
			c.width = this.size
			c.height = this.size
			const ctx = c.getContext(`2d`)
			ctx.drawImage(this.source, 0, 0)
			const pixels = ctx.getImageData(0, 0, this.size, this.size)
			const vector = []
			for (let i = 0; i < pixels.data.length; i += 4){
				const value = pixels.data[i] / 255
				vector.push(value)
			}
			this.data.original = {image: c, data: vector}

			this.data.c1 = this.convolve(this.data.original, this.kernel[0])
			this.data.bn1 = this.batchNorm(this.data.c1)
			this.data.relu1 = this.relu(this.data.bn1)
			this.data.c2 = this.convolve(this.data.relu1, this.kernel[1])
			this.data.bn2 = this.batchNorm(this.data.c2)
			this.data.sum = this.sum(this.data.bn2, this.data.original, .4)
			this.data.relu2 = this.relu(this.data.sum)
			this.data.relu3 = this.relu(this.data.bn2)

			this.update()

		}

	}

	batchNorm(block){

		const data = block.data
		const mean = block.mean

		let stdev = 0
		for (let d of data){
			stdev += (d - mean) ** 2
		}
		stdev = (stdev / data.length) ** .5

		const c = document.createElement(`canvas`)
		c.width = this.size
		c.height = this.size
		const ctx = c.getContext(`2d`)
		const pixels = ctx.createImageData(this.size, this.size)
		const vector = []

		for (let i = 0; i < data.length; i++){

			const value = (data[i] - mean) / stdev
			vector.push(value)
			const color = value < 0 ? this.negativeMap.rawrgb(-value) : this.positiveMap.rawrgb(value) //Math.max(Math.min(Math.floor(value * 255), 255), 0)

			pixels.data[i * 4] = color[0]
			pixels.data[i * 4 + 1] = color[1]
			pixels.data[i * 4 + 2] = color[2]
			pixels.data[i * 4 + 3] = 255

		}

		ctx.putImageData(pixels, 0, 0)
		return {image: c, data: vector}

	}

	convolve(block, kernel){

		const data = block.data
		const c = document.createElement(`canvas`)
		c.width = this.size
		c.height = this.size
		const ctx = c.getContext(`2d`)
		const pixels = ctx.createImageData(this.size, this.size)
		const vector = []

		let mean = 0

		for (let i = 0; i < data.length; i++){

			const x = i % this.size
			const y = Math.floor(i / this.size)
			const isLeft = x === 0
			const isTop = y === 0
			const isRight = x === this.size - 1
			const isBottom = y === this.size - 1

			let value = 0
			value += (isLeft || isTop) ? 0 : kernel[0] * data[i - 1 - this.size]
			value += isTop ? 0 : kernel[1] * data[i - this.size]
			value += (isRight || isTop) ? 0 : kernel[2] * data[i + 1 - this.size]
			value += isLeft ? 0 : kernel[3] * data[i - 1]
			value += kernel[4] * data[i]
			value += isRight ? 0 : kernel[5] * data[i + 1]
			value += (isLeft || isBottom) ? 0 : kernel[6] * data[i - 1 + this.size]
			value += isBottom ? 0 : kernel[7] * data[i + this.size]
			value += (isRight || isBottom) ? 0 : kernel[8] * data[i + 1 + this.size]

			vector.push(value)
			const color = value < 0 ? this.negativeMap.rawrgb(-value) : this.positiveMap.rawrgb(value)//Math.max(Math.min(Math.floor(value * 255), 255), 0)
			mean += value

			pixels.data[i * 4] = color[0]
			pixels.data[i * 4 + 1] = color[1]
			pixels.data[i * 4 + 2] = color[2]
			pixels.data[i * 4 + 3] = 255

		}

		mean /= data.length

		ctx.putImageData(pixels, 0, 0)

		return {image: c, data: vector, mean: mean}

	}

	relu(block){

		const data = block.data

		const c = document.createElement(`canvas`)
		c.width = this.size
		c.height = this.size
		const ctx = c.getContext(`2d`)
		const pixels = ctx.createImageData(this.size, this.size)
		const vector = []

		for (let i = 0; i < data.length; i++){

			const value = data[i] < 0 ? 0 : data[i]
			vector.push(value)
			const color = value < 0 ? this.negativeMap.rawrgb(-value) : this.positiveMap.rawrgb(value)

			pixels.data[i * 4] = color[0]
			pixels.data[i * 4 + 1] = color[1]
			pixels.data[i * 4 + 2] = color[2]
			pixels.data[i * 4 + 3] = 255

		}

		ctx.putImageData(pixels, 0, 0)
		return {image: c, data: vector}

	}

	sum(block_a, block_b, k){

		const data1 = block_a.data
		const data2 = block_b.data

		const c = document.createElement(`canvas`)
		c.width = this.size
		c.height = this.size
		const ctx = c.getContext(`2d`)
		const pixels = ctx.createImageData(this.size, this.size)
		const vector = []

		for (let i = 0; i < data1.length; i++){

			const value = data1[i] + data2[i] * k
			vector.push(value)
			const color = value < 0 ? this.negativeMap.rawrgb(-value) : this.positiveMap.rawrgb(value)

			pixels.data[i * 4] = color[0]
			pixels.data[i * 4 + 1] = color[1]
			pixels.data[i * 4 + 2] = color[2]
			pixels.data[i * 4 + 3] = 255

		}

		ctx.putImageData(pixels, 0, 0)
		return {image: c, data: vector}

	}

	update(){

		// requestAnimationFrame(_=>{this.update()})
		// this.f += this.df
		// if (this.f >= 1) this.f = this.f % 1
		this.ctx.clearRect(0, 0, this.w, this.h)

		this.f = Math.min(this.f, .999999999)
		let subf = (this.f % this.steplength) / this.steplength
		subf = subf < 0.5 ? 4 * subf ** 3 : 1 - (-2 * subf + 2) ** 3 / 2
		const i = Math.min(Math.floor(this.f / this.steplength), this.steps.length - 2)

		// let image1 = this.data[this.steps[i]].image
		// let image2 = this.data[this.steps[i + 1]].image
		// if (!this.resnet){
		// 	if (i === 5){
		// 		image2 = this.data.bn2.image
		// 	} else if (i === 6){
		// 		image1 = this.data.bn2.image
		// 		image2 = this.data.relu3.image
		// 	}	
		// }

		//ALT
		const cellSize = this.h * .3
		const dy = (this.h - cellSize) / this.steps.length

		this.ctx.save()
		this.ctx.fillStyle = `#FFF`

		for (let j = 0; j < this.steps.length; j++){

			if (j > (i + 1)) break
			if (j > i) this.ctx.globalAlpha = subf

			// if (j === i + 1) {
			// 	this.ctx.save()
			// 	this.ctx.globalAlpha = subf * .3
			// 	this.ctx.fillStyle = `#FFF`
			// 	this.ctx.fillRect(0,0,this.w * .5, this.h)
			// 	this.ctx.restore()
			// }
			// if (j === i) {
			// 	this.ctx.save()
			// 	this.ctx.globalAlpha = .4
			// 	this.ctx.fillStyle = `#FFF`
			// 	this.ctx.fillRect(0,0,this.w * .5, this.h)
			// 	this.ctx.restore()
			// }
			// if (j < i) this.ctx.globalAlpha = .3
			let image = this.data[this.steps[j]].image
			if (!this.resnet && j === 6) continue//image = this.data.bn2.image
			if (!this.resnet && j === 7) image = this.data.relu3.image
			const x = dy * (j - 1) + dy * (j === i+1 ? subf : 1)
			const y = x
			const frame = this.ratio * 6
			this.ctx.fillRect(x - frame, y - frame, cellSize + frame * 2, cellSize + frame * 2)
			this.ctx.drawImage(image, x, y, cellSize, cellSize)

		}

		if (this.resnet && i === 5){
			this.ctx.globalAlpha = subf < .95 ? subf < .02 ? subf * 50 : 1 : 1 - ((subf - .95) * 20)
			this.ctx.drawImage(this.data.original.image, dy * 6 * subf, dy * 6 * subf + dy * 4 * Math.sin(subf * Math.PI), cellSize, cellSize)
		}

		this.ctx.restore()


		// //Image
		// this.ctx.save()
		// this.ctx.drawImage(image1, 0, 0, this.h, this.h)
		// this.ctx.globalAlpha = subf
		// this.ctx.drawImage(image2, 0, 0, this.h, this.h)
		// this.ctx.restore()

		//Scheme
		this.ctx.save()
		this.ctx.translate(this.w * .5 + this.margin, this.margin)

		this.ctx.save()
		this.ctx.strokeStyle = `#b2bdd2`

		this.ctx.beginPath()
		this.ctx.moveTo(this.w * .02, this.cellHeight * .25)
		this.ctx.lineTo(this.w * .02, this.cellHeight * .6)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(this.w * .02, this.cellHeight * 5.4)
		this.ctx.lineTo(this.w * .02, this.cellHeight * (this.resnet ? 5.7 : 6.7))
		this.ctx.stroke()

		if (this.resnet){
			const r = this.w * .05
			this.ctx.beginPath()
			this.ctx.moveTo(this.w * .16, 0)
			this.ctx.lineTo(this.w * .2, 0)
			this.ctx.arc(this.w * .2, r, r, -Math.PI / 2, 0)
			this.ctx.lineTo(this.w * .2 + r, this.cellHeight * 6 - r)
			this.ctx.arc(this.w * .2, this.cellHeight * 6 - r, r, 0, Math.PI / 2)
			this.ctx.lineTo(this.w * .14, this.cellHeight * 6)
			this.ctx.stroke()
		}

		this.ctx.setLineDash([this.ratio * 8, this.ratio * 4])
		this.ctx.strokeRect(-this.subMargin, this.cellHeight * .6, this.w * .2, this.cellHeight * 4.8)
		this.ctx.restore()

		for (let j = 0; j < this.steps.length; j++){
			this.ctx.fillStyle = i + subf >= (j - .1) ? `#000` : `#666`
			if (j !== 6 || this.resnet) this.ctx.fillText(this.stepNames[j], 0, this.cellHeight * j)
		}

		const h = i * this.cellHeight + this.cellHeight * subf
		this.ctx.beginPath()
		this.ctx.moveTo(-(this.margin - this.subMargin), h)
		this.ctx.lineTo(-this.subMargin * 2, h)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.moveTo(-(this.margin - this.subMargin * 1.5), h - this.subMargin * .5)
		this.ctx.lineTo(-(this.margin - this.subMargin), h)
		this.ctx.lineTo(-(this.margin - this.subMargin * 1.5), h + this.subMargin * .5)
		this.ctx.stroke()
		this.ctx.restore()

		this.ctx.restore()

	}

}


