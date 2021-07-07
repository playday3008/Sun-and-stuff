let core

window.onload = _=>{

	
	// const bs = new Range({width: 500, value: 1000, class: `input`, min: 2, max: 3000, scale: 2, step: 1, label: `Bootstrap samples`, labelWidth: 200})
	// const mid = new Range({width: 500, value: .5, class: `input`, min: .2, max: .8, scale: 14, step: .01, label: `Original ratio`, labelWidth: 200})

	
	// document.body.appendChild(bs)
	// document.body.appendChild(mid)

	core = new Core(document.querySelector(`.canvas`))

	const s = new Range({width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 2, step: .01, label: `Nanoparticle size`, labelWidth: 200, formula: e=>(core.realRange[0] + e * (core.realRange[1] - core.realRange[0]))+` nm`})
	document.body.appendChild(s)

	s.data.onchange = v=>{
		core.updateSize(v)
	}
	// bs.data.onchange = v=>{
	// 	core.bsamples = v
	// 	core.init()
	// }
	// mid.data.onchange = v=>{
	// 	core.midpoint = (1 - v)
	// 	core.init()
	// }

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
		this.ctx.textAlign = `center`
		
		this.realRange = [180, 400]
		this.realColors = light([`#424142`, `#6856FF`, `#34C8A4`, `#73DE4F`, `#B1E540`, `#E5D544`, `#E24259`, `#424242`])
		this.minSize = this.w * .02
		this.maxSize = this.minSize * this.realRange[1]/this.realRange[0]
		this.beadSize = this.minSize
		this.realScale = this.realRange[0] / this.minSize / 2
		this.sizeVariation = .05
		this.jitter = this.beadSize * .2
		this.margin = {x: this.w * .05, y: this.h * .1}

		this.init()
		this.draw()
		
	}

	updateSize(f){

		this.beadSize = this.minSize + f * (this.maxSize - this.minSize)
		this.updateBeads()
		this.draw()

	}

	updateBeads(){
		this.beads = []

		// for (let y = 0; y <= this.h; y += this.beadSize){
		// 	for (let x = 0; x <= this.w; x += this.beadSize){

		// 		const bead = {
		// 			x: x + (Math.random() * 2 - 1) * this.jitter, 
		// 			y: y + (Math.random() * 2 - 1) * this.jitter,
		// 			radius: this.beadSize + (Math.random() * 2 - 1) * this.sizeVariation
		// 		}

		// 		this.beads.push(bead)

		// 	}
		// }

		// this.beads = this.shuffle(this.beads)

		// for (let i = 0; i < this.beads.length; i++){

		// 	const bead = this.beads[i]
		// 	bead.radius = this.beadSize
		// 	bead.radius += (Math.random() * 2 - 1) * this.sizeVariation * bead.radius

		// 	const max = 100 + 155 * (i / this.beads.length)
		// 	const v = [Math.floor(max*.7), Math.floor(max*.8), Math.floor(max * .9)]

		// 	const shade = this.ctx.createRadialGradient(0, -bead.radius * .2, 0, 0, 0, bead.radius)
		// 	shade.addColorStop(0, `rgb(${v[0]},${v[0]},${v[0]})`)
		// 	shade.addColorStop(.8, `rgb(${v[1]},${v[1]},${v[1]})`)
		// 	shade.addColorStop(1, `rgb(${v[2]},${v[2]},${v[2]})`)

		// 	bead.shade = shade

		// }
		let vTop = [178,204,230]
		let vBottom = [138,164,190]
		const shadeBottom = this.ctx.createRadialGradient(0, -this.beadSize * .2, 0, 0, 0, this.beadSize)
		shadeBottom.addColorStop(0, `rgb(${vBottom[0]},${vBottom[0]},${vBottom[0]})`)
		shadeBottom.addColorStop(.8, `rgb(${vBottom[1]},${vBottom[1]},${vBottom[1]})`)
		shadeBottom.addColorStop(1, `rgb(${vBottom[2]},${vBottom[2]},${vBottom[2]})`)
		const shadeTop = this.ctx.createRadialGradient(0, -this.beadSize * .2, 0, 0, 0, this.beadSize)
		shadeTop.addColorStop(0, `rgb(${vTop[0]},${vTop[0]},${vTop[0]})`)
		shadeTop.addColorStop(.8, `rgb(${vTop[1]},${vTop[1]},${vTop[1]})`)
		shadeTop.addColorStop(1, `rgb(${vTop[2]},${vTop[2]},${vTop[2]})`)

		for (let y = 0; y < this.h + this.beadSize; y += this.beadSize * 2){
			for (let x = 0; x < this.w + this.beadSize; x += this.beadSize * 2){

				const beadBottom = {
					x: x + (Math.random() * 2 - 1) * this.jitter + this.beadSize, 
					y: y + (Math.random() * 2 - 1) * this.jitter + this.beadSize,
					radius: this.beadSize + (Math.random() * 2 - 1) * this.sizeVariation,
					shade: shadeBottom
				}

				const beadTop = {
					x: x + (Math.random() * 2 - 1) * this.jitter, 
					y: y + (Math.random() * 2 - 1) * this.jitter,
					radius: this.beadSize + (Math.random() * 2 - 1) * this.sizeVariation,
					shade: shadeTop
				}

				this.beads.push(beadBottom)
				this.beads.push(beadTop)

			}
		}

	}

	init(){

		this.updateBeads()

	}

	shuffle(a){

		let currentIndex = a.length,  randomIndex

		while (0 !== currentIndex){

		  randomIndex = Math.floor(Math.random() * currentIndex)
		  currentIndex--

		  [a[currentIndex], a[randomIndex]] = [a[randomIndex], a[currentIndex]]
		}

		return a

	}

	showScale(){

		const notchy = this.h * .02
		const notchx = this.w * .2223

		this.ctx.save()
		this.ctx.lineWidth = this.ratio * 4
		this.ctx.fillStyle = this.ctx.strokeStyle = `#000`

		this.ctx.textAlign = `left`
		this.ctx.fillText(`Nanoparticle size: ${Math.floor(this.beadSize * this.realScale * 2)}nm`, this.margin.x, this.margin.y + this.fontSize)
		this.ctx.translate(this.margin.x, this.h - this.margin.y)
		this.ctx.textAlign = `center`

		this.ctx.beginPath()
		this.ctx.moveTo(0, -notchy)
		this.ctx.lineTo(0, 0)
		this.ctx.lineTo(notchx, 0)
		this.ctx.lineTo(notchx, -notchy)
		this.ctx.stroke()

		this.ctx.fillText(`${Math.round(notchx * this.realScale)} nm ~ size of bacteria`, notchx / 2, this.fontSize * 1.4)

		this.ctx.restore()

	}

	drawColor(){

		const side = this.w * .3

		this.ctx.save()
		this.ctx.translate(this.w - this.margin.x - side, this.h - this.margin.y - side)
		this.ctx.fillStyle = this.realColors.rgb((this.beadSize - this.minSize) / (this.maxSize - this.minSize))
		this.ctx.fillRect(0,0,side,side)

		this.ctx.fillStyle = `#FFF`
		this.ctx.fillText(`Perceived color`, side / 2, this.fontSize * 2)

		this.ctx.restore()

	}

	draw(){

		this.ctx.fillStyle = `#666`
		this.ctx.fillRect(0, 0, this.w, this.h)

		const q = this.w * this.h / this.beadSize ** 2
		

		for (let i = 0; i < this.beads.length; i++){

			const b = this.beads[i]

			this.ctx.save()
			this.ctx.fillStyle = b.shade
			this.ctx.translate(b.x, b.y)
			this.ctx.beginPath()
			this.ctx.arc(0, 0, b.radius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
			this.ctx.restore()

		}

		this.showScale()
		this.drawColor()

	}

}
