let core

window.onload = _=>{

	const s = new Range({width: 500, value: 12.2, class: `input`, min: 0, max: 50, scale: 4, label: `Simulation speed`, labelWidth: 200, step: .01, log: 4})

	document.body.appendChild(s)

	core = new Core(document.querySelector(`.canvas`))

	s.data.onchange = v=>{
		core.setSpeed(v)
	}

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.ctx.font = 4 * this.ratio + `px Tahoma`
		this.ctx.lineWidth = this.ratio
		this.ctx.textBaseline = `middle`
		this.ctx.textAlign = `center`

		this.bwMap = light()
		this.plusMap = light(`fire`)
		this.minusMap = light(`ice`).reverse()

		this.kernel = [-1,0,1,-2,0,2,-1,0,1]
		this.current = {}

		this.frame = {
			x: 0,
			y: 0
		}

		this.f = 0
		this.df = .000002

		this.field = {
			x: 80 * this.ratio, 
			y: 260 * this.ratio,
			cellSize: 10 * this.ratio
		}
		this.field2 = {
			x: 400 * this.ratio + 10 * this.ratio, 
			y: 260 * this.ratio + 10 * this.ratio,
			cellSize: 10 * this.ratio
		}

		this.inter = {
			x: 155 * this.ratio,
			y: 110 * this.ratio,
			s: 4,
			x1: 520 * this.ratio,
			y1: 150 * this.ratio
		}

		this.initImage()

	}

	setSpeed(s){

		this.df = s * .00001

	}

	initImage(){

		this.source = new Image()
		this.source.src = `convolutionSteps/img/source.png`
		this.source.onload = _=>{

			const c = document.createElement(`canvas`)
			c.width = 28
			c.height = 28
			const ctx = c.getContext(`2d`)

			ctx.drawImage(this.source, 0, 0)
			const pixels = ctx.getImageData(0, 0, 28, 28)
			const vector = []

			for (let i = 0; i < pixels.data.length; i += 4){
				vector.push(pixels.data[i] / 255)
			}

			this.data = vector

			this.updateCurrentData()
			this.update()

		}

		this.data = new Array(28 * 28)
		this.cdata = new Array(26 * 26)

	}

	update(){

		requestAnimationFrame(_=>{this.update()})

		this.ctx.clearRect(0, 0, this.w, this.h)

		this.f += this.df
		if (this.f >= 1) {
			this.f = 0
			this.cdata = new Array(26 * 26)
		}

		if (this.updateFramePosition()) this.updateCurrentData()


		this.drawOriginal()
		this.drawConvolved()
		this.drawKernel()
		this.drawIntermediate()
		this.drawFrame()

	}

	updateCurrentData(){

		this.cdata[this.frame.x + this.frame.y * 26 - 1] = this.sum
		
		this.originalPixels = [
			this.data[this.frame.y * 28 + this.frame.x],
			this.data[this.frame.y * 28 + this.frame.x + 1],
			this.data[this.frame.y * 28 + this.frame.x + 2],
			this.data[this.frame.y * 28 + this.frame.x + 28],
			this.data[this.frame.y * 28 + this.frame.x + 29],
			this.data[this.frame.y * 28 + this.frame.x + 30],
			this.data[this.frame.y * 28 + this.frame.x + 56],
			this.data[this.frame.y * 28 + this.frame.x + 57],
			this.data[this.frame.y * 28 + this.frame.x + 58]
		]
		
		this.convolvedPixels = [
			this.originalPixels[0] * this.kernel[0],
			this.originalPixels[1] * this.kernel[1],
			this.originalPixels[2] * this.kernel[2],
			this.originalPixels[3] * this.kernel[3],
			this.originalPixels[4] * this.kernel[4],
			this.originalPixels[5] * this.kernel[5],
			this.originalPixels[6] * this.kernel[6],
			this.originalPixels[7] * this.kernel[7],
			this.originalPixels[8] * this.kernel[8]
		]

		this.sum = this.convolvedPixels.reduce((a,v)=>a+v)
		

	}

	updateFramePosition(){

		let changed = false

		const p = this.f * 676
		const x = Math.floor(p % 26)
		const y = Math.floor(p / 26)

		this.subf = p % 26 % 1
		// this.subf = -Math.cos((p % 26 % 1) * Math.PI) * .5 + .5

		if (this.frame.x !== x) changed = true

		this.frame.x = x
		this.frame.y = y

		return changed

	}

	drawKernel(){
		this.ctx.save()
		this.ctx.translate(this.inter.x, this.inter.y)
		this.ctx.scale(this.inter.s, this.inter.s)
		const margin = this.ratio * .2

		this.ctx.fillStyle = `#EED`

		this.ctx.fillRect(0, 0, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize + margin, 0, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize * 2 + margin * 2, 0, this.field.cellSize, this.field.cellSize)

		this.ctx.fillRect(0, this.field.cellSize + margin, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize + margin, this.field.cellSize + margin, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize * 2 + margin * 2, this.field.cellSize + margin, this.field.cellSize, this.field.cellSize)

		this.ctx.fillRect(0, this.field.cellSize * 2 + margin * 2, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize + margin, this.field.cellSize * 2 + margin * 2, this.field.cellSize, this.field.cellSize)
		this.ctx.fillRect(this.field.cellSize * 2 + margin * 2, this.field.cellSize * 2 + margin * 2, this.field.cellSize, this.field.cellSize)

		this.ctx.fillStyle = `#665`
		const h = this.field.cellSize / 2
		this.ctx.fillText(this.kernel[0] + `×`, h, h)
		this.ctx.fillText(this.kernel[1] + `×`, h + this.field.cellSize + margin, h)
		this.ctx.fillText(this.kernel[2] + `×`, h + this.field.cellSize * 2 + margin * 2, h)

		this.ctx.fillText(this.kernel[3] + `×`, h, h + this.field.cellSize + margin)
		this.ctx.fillText(this.kernel[4] + `×`, h + this.field.cellSize + margin, h + this.field.cellSize + margin)
		this.ctx.fillText(this.kernel[5] + `×`, h + this.field.cellSize * 2 + margin * 2, h + this.field.cellSize + margin)

		this.ctx.fillText(this.kernel[6] + `×`, h, h + this.field.cellSize * 2 + margin * 2)
		this.ctx.fillText(this.kernel[7] + `×`, h + this.field.cellSize + margin, h + this.field.cellSize * 2 + margin * 2)
		this.ctx.fillText(this.kernel[8] + `×`, h + this.field.cellSize * 2 + margin * 2, h + this.field.cellSize * 2 + margin * 2)

		this.ctx.restore()
	}

	drawIntermediate(){

		let scale = this.inter.s
		const position = [this.inter.x, this.inter.y]
		let margin = this.ratio * .2
		let delta = this.field.cellSize

		if (this.subf < .2){

			// const f = this.subf / .2
			const f = -Math.cos((this.subf / .2) * Math.PI) * .5 + .5
			scale = 1 + f * (this.inter.s - 1)
			
			const p1x = this.field.x + this.field.cellSize * this.frame.x
			const p1y = this.field.y + this.field.cellSize * this.frame.y

			position[0] = p1x + (position[0] - p1x) * f
			position[1] = p1y + (position[1] - p1y) * f
			margin = margin * f

		} else if (this.subf < .4){

		} else if (this.subf < .6){

			// const f = (this.subf - .4) / .2
			const f = -Math.cos(((this.subf - .4) / .2) * Math.PI) * .5 + .5
			position[0] = position[0] + (this.inter.x1 - position[0]) * f
			position[1] = position[1] + (this.inter.y1 - position[1]) * f
			delta = this.field.cellSize * (1 - f)

		} else if (this.subf < .8){

			
			// position[0] = this.inter.x1
			// position[1] = this.inter.y1
			// delta = 0

			// const f = (this.subf - .6) / .2
			const f = -Math.cos(((this.subf - .6) / .2) * Math.PI) * .5 + .5
			const p1x = this.inter.x1
			const p1y = this.inter.y1
			const p2x = this.field2.x + this.field.cellSize * this.frame.x
			const p2y = this.field2.y + this.field.cellSize * this.frame.y

			position[0] = p1x + (p2x - p1x) * f
			position[1] = p1y + (p2y - p1y) * f

			scale = 1 + (scale - 1) * (1 - f)
			delta = 0
			margin = 0

		} else {

			position[0] = this.field2.x + this.field.cellSize * this.frame.x
			position[1] = this.field2.y + this.field.cellSize * this.frame.y

			scale = 1
			delta = 0
			margin = 0

		}

		const colors = []
		for (let i = 0; i < this.originalPixels.length; i++){
			if (this.subf < .2){
				colors[i] = this.bwMap.rgb(this.originalPixels[i])
			} else if (this.subf < .4){
				const f = (this.subf - .2) / .2
				const c1 = this.bwMap.rawrgb(this.originalPixels[i])
				const c2 = this.convolvedPixels[i] >= 0 ? this.plusMap.rawrgb(this.convolvedPixels[i] / 2) : this.minusMap.rawrgb(-this.convolvedPixels[i] / 2)
				colors[i] = `rgb(${c1[0] + (c2[0] - c1[0]) * f}, ${c1[1] + (c2[1] - c1[1]) * f}, ${c1[2] + (c2[2] - c1[2]) * f})`
			} else if (this.subf < .6){
				const f = (this.subf - .4) / .2
				const c1 = this.convolvedPixels[i] >= 0 ? this.plusMap.rawrgb(this.convolvedPixels[i] / 2) : this.minusMap.rawrgb(-this.convolvedPixels[i] / 2)
				const c2 = this.sum >= 0 ? this.plusMap.rawrgb(this.sum / 2) : this.minusMap.rawrgb(-this.sum / 2)
				colors[i] = `rgb(${c1[0] + (c2[0] - c1[0]) * f}, ${c1[1] + (c2[1] - c1[1]) * f}, ${c1[2] + (c2[2] - c1[2]) * f})`
			} else {
				colors[i] = this.sum >= 0 ? this.plusMap.rgb(this.sum / 2) : this.minusMap.rgb(-this.sum / 2)
			}
		}

		this.ctx.save()
		this.ctx.translate(position[0], position[1])
		this.ctx.scale(scale, scale)

		this.ctx.fillStyle = colors[0]
		this.ctx.fillRect(0, 0, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[1]
		this.ctx.fillRect(delta + margin, 0, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[2]
		this.ctx.fillRect(delta * 2 + margin * 2, 0, this.field.cellSize, this.field.cellSize)

		this.ctx.fillStyle = colors[3]
		this.ctx.fillRect(0, delta + margin, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[4]
		this.ctx.fillRect(delta + margin, delta + margin, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[5]
		this.ctx.fillRect(delta * 2 + margin * 2, delta + margin, this.field.cellSize, this.field.cellSize)

		this.ctx.fillStyle = colors[6]
		this.ctx.fillRect(0, delta * 2 + margin * 2, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[7]
		this.ctx.fillRect(delta + margin, delta * 2 + margin * 2, this.field.cellSize, this.field.cellSize)
		this.ctx.fillStyle = colors[8]
		this.ctx.fillRect(delta * 2 + margin * 2, delta * 2 + margin * 2, this.field.cellSize, this.field.cellSize)


		//TEXT
		const texts = []
		for (let i = 0; i < this.originalPixels.length; i++){
			if (this.subf < .2){
				texts[i] = this.originalPixels[i].toFixed(1)
			} else if (this.subf < .4){
				const f = (this.subf - .2) / .2
				const t1 = this.originalPixels[i]
				const t2 = this.convolvedPixels[i]
				texts[i] = (t1 + (t2 - t1) * f).toFixed(1)
			} else if (this.subf < .6){
				texts[i] = this.convolvedPixels[i].toFixed(1)
			} else {
				texts[i] = i===0 ? this.sum.toFixed(1) : ``
			}
		}
		const h = this.field.cellSize / 2
		this.ctx.fillStyle = `#6F9`
		this.ctx.fillText(texts[0], h, h)
		this.ctx.fillText(texts[1], h + delta + margin, h)
		this.ctx.fillText(texts[2], h + delta * 2 + margin * 2, h)

		this.ctx.fillText(texts[3], h, h + delta + margin)
		this.ctx.fillText(texts[4], h + delta + margin, h + delta + margin)
		this.ctx.fillText(texts[5], h + delta * 2 + margin * 2, h + delta + margin)

		this.ctx.fillText(texts[6], h, h + delta * 2 + margin * 2)
		this.ctx.fillText(texts[7], h + delta + margin, h + delta * 2 + margin * 2)
		this.ctx.fillText(texts[8], h + delta * 2 + margin * 2, h + delta * 2 + margin * 2)

		this.ctx.restore()


		//Happening text
		this.ctx.save()
		this.ctx.font = 16*this.ratio + `px Tahoma`
		this.ctx.translate(this.w/2, this.ratio * 56)
		this.ctx.fillStyle = `#000`
		this.ctx.fillText(this.subf < .2 ? `Reading pixels` : this.subf < .4  ? `Multiplying pixels values by kernel values` : this.subf < .6 ? `Summing up all the products` : this.subf < .8 ? `Writing the sum to the filtered image` : `Ready to move to the next pixel`, 0, 0)
		this.ctx.restore()
		
		

	}

	drawOriginal(){
		if (this.originalPixelsImage){
			this.ctx.drawImage(this.originalPixelsImage, this.field.x, this.field.y)
		} else {
			this.originalPixelsImage = document.createElement(`canvas`)
			this.originalPixelsImage.width = this.field.cellSize * 28
			this.originalPixelsImage.height = this.field.cellSize * 28
			const ctx = this.originalPixelsImage.getContext(`2d`)

			for (let i = 0; i < this.data.length; i++){

				const d = this.data[i]
				const x = i % 28
				const y = Math.floor(i / 28)

				ctx.fillStyle = this.bwMap.rgb(d)
				ctx.fillRect(this.field.cellSize * x, this.field.cellSize * y, this.field.cellSize, this.field.cellSize)

			}
		}
	}

	drawConvolved(){
		for (let i = 0; i < this.cdata.length; i++){

			const d = this.cdata[i]
			const x = i % 26
			const y = Math.floor(i / 26)

			this.ctx.fillStyle = d === undefined ? `#FFF` : d >= 0 ? this.plusMap.rgb(d/2) : this.minusMap.rgb(-d/2)
			this.ctx.fillRect(this.field2.x + this.field2.cellSize * x, this.field2.y + this.field2.cellSize * y, this.field2.cellSize, this.field2.cellSize)
		}
	}

	drawFrame(){

		this.ctx.strokeStyle = `#6F9`
		let notchx = 0
		let notchy = 0
		if (this.subf > .8){
			if (this.frame.x === 25) {
				const f = (this.subf - .8) / .2
				notchx = f * -this.field.cellSize * 25
				notchy = f * this.field.cellSize
			} else {
				notchx = (this.subf - .8) / .2 * this.field.cellSize
			}
		}

		for (let x = 0; x < 4; x++){

			this.ctx.beginPath()
			this.ctx.moveTo(this.field.x + this.field.cellSize * this.frame.x + this.field.cellSize * x + notchx, this.field.y + this.field.cellSize * this.frame.y + notchy)
			this.ctx.lineTo(this.field.x + this.field.cellSize * this.frame.x + this.field.cellSize * x + notchx, this.field.y + this.field.cellSize * (this.frame.y + 3) + notchy)
			this.ctx.stroke()

		}

		for (let y = 0; y < 4; y++){

			this.ctx.beginPath()
			this.ctx.moveTo(this.field.x + this.field.cellSize * this.frame.x + notchx, this.field.y + this.field.cellSize * this.frame.y + this.field.cellSize * y + notchy)
			this.ctx.lineTo(this.field.x + this.field.cellSize * (this.frame.x + 3) + notchx, this.field.y + this.field.cellSize * this.frame.y + this.field.cellSize * y + notchy)
			this.ctx.stroke()

		}

	}

}


