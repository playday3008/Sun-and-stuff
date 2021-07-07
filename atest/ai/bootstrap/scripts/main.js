let core

window.onload = _=>{

	const ss = new Range({width: 500, value: 8, class: `input`, min: 3, max: 20, scale: 5, step: 1, label: `Sample size`, labelWidth: 200, formula: n=>Math.floor(n**2)})
	const bs = new Range({width: 500, value: 1000, class: `input`, min: 2, max: 3000, scale: 2, step: 1, label: `Bootstrap samples`, labelWidth: 200})
	const mid = new Range({width: 500, value: .5, class: `input`, min: .2, max: .8, scale: 14, step: .01, label: `Original ratio`, labelWidth: 200})

	document.body.appendChild(ss)
	document.body.appendChild(bs)
	document.body.appendChild(mid)

	core = new Core(document.querySelector(`.canvas`))

	ss.data.onchange = v=>{
		core.dataSqrt = v
		core.init()
	}
	bs.data.onchange = v=>{
		core.bsamples = v
		core.init()
	}
	mid.data.onchange = v=>{
		core.midpoint = (1 - v)
		core.init()
	}

}


class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 13 * this.ratio
		this.ctx.font = this.fontSize + `px Verdana`
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.textAlign = `center`

		this.color = {
			class: [`#F28F57`, `#75B1E9`],
			border: `#000`,
			label: `#112`,
			distribution: `#B0B0A4`,
			mean: `#8C8B88`,
			graph: `#f4f4ee`
		}
		this.margin = this.ratio * 60
		this.bigCell = this.h / 2 - this.margin * 2

		this.dataSqrt = 8
		this.bsamples = 1000
		this.maxBsamples = 5
		this.midpoint = .5

		this.init()
		
	}

	drawGraph(){

		this.ctx.save()
		this.ctx.translate(this.margin * 2 + this.bigCell, this.margin)

		const dx = this.w - this.margin * 3 - this.bigCell
		const dy = this.bigCell

		this.ctx.fillStyle = this.color.graph
		this.ctx.fillRect(0, 0, dx, dy)

		const refined = this.analyze(this.estimates)
		const step = dx / refined.normalized.length

		this.ctx.fillStyle = this.color.distribution

		for (let i = 0; i < refined.normalized.length; i++){

			// this.ctx.beginPath()
			// this.ctx.moveTo(step * i, dy)
			// this.ctx.lineTo(step * i, dy - dy * refined.normalized[i])
			// this.ctx.stroke()

			this.ctx.fillRect(step * i, dy, step + 1, -dy * refined.normalized[i])

		}

		//Mean
		this.ctx.strokeStyle = this.color.mean
		this.ctx.beginPath()
		this.ctx.moveTo(dx * refined.mean, 0)
		this.ctx.lineTo(dx * refined.mean, dy)
		this.ctx.stroke()

		//Labels
		this.ctx.fillStyle = this.color.label
		this.ctx.fillText(`0`, 0, dy + this.fontSize * 1.3)
		this.ctx.fillText(`1`, dx, dy + this.fontSize * 1.3)

		//Stdev
		const notch = dy * .03
		this.ctx.translate(dx * refined.mean, dy + notch)
		const x1 = -dx * refined.stdev * 2
		const x2 = dx * refined.stdev * 2
		const v1 = this.humanize(refined.mean - refined.stdev * 2)
		const v2 = this.humanize(refined.mean + refined.stdev * 2)
		this.ctx.strokeStyle = this.ctx.fillStyle = this.color.label
		this.ctx.beginPath()
		this.ctx.moveTo(x1, 0)
		this.ctx.lineTo(x1, notch)
		this.ctx.lineTo(x2, notch)
		this.ctx.lineTo(x2, 0)
		this.ctx.stroke()
		this.ctx.fillText(v1, x1, this.fontSize * 1.3 + notch)
		this.ctx.fillText(v2, x2, this.fontSize * 1.3 + notch)
		this.ctx.fillText(`4σ`, 0, this.fontSize * 2.3 + notch)
		this.ctx.fillText(`Bootstrap ratios mean: ${this.humanize(refined.mean)}`, 0, -dy - this.fontSize)

		this.ctx.restore()

		//Conclusion
		this.ctx.save()
		this.ctx.textAlign = `left`
		this.ctx.fillText(`We 95% sure that blue dot ratio in original population is between ${v1} and ${v2}`, this.margin, this.h - this.margin)
		this.ctx.restore()

	}

	humanize(n){

		return Math.floor(n * 100) / 100

	}

	analyze(d){

		const resolution = Math.min(this.dataSqrt ** 2 - 1, 1000)

		let max = -Infinity
		const normalized = Array(resolution).fill(0)

		let stdev = 0
		let mean = 0

		for (let i = 0; i < d.length; i++){
			
			const index = Math.floor(d[i] * resolution)
			normalized[index]++
			if (normalized[index] > max) max = normalized[index]

			mean += d[i] / d.length

		}

		for (let i = 0; i < d.length; i++){
			stdev += (d[i] - mean) ** 2 / (d.length - 1)
		}

		for (let i = 0; i < normalized.length; i++){
			normalized[i] /= max
		}

		// console.log(stdev**.5, mean)

		return {normalized: normalized, stdev: stdev**.5, mean: mean}

	}

	drawBootstraps(){


		let s = (this.w - this.margin * 2) / this.maxBsamples
		const notch = s / (this.maxBsamples - 1)

		for (let i = 0; i < Math.min(this.maxBsamples, this.bsamples); i++){

			this.drawData(this.bootstraps[i], this.margin + i * s, this.h / 2 + this.margin, s - notch, `Bootstrap ` + i)

		}

		if (this.bsamples > this.maxBsamples){

			this.ctx.fillText(`+` + (this.bsamples - this.maxBsamples), this.margin + this.maxBsamples * s + this.fontSize, this.h / 2 + this.margin + s / 2 - this.fontSize * .4)
		}

	}

	getBootstrap(d){

		const final = []

		for (let i = 0; i < d.length; i++){

			const id = Math.floor(Math.random() * d.length)
			final.push(d[id])

		}

		return final

	}

	drawData(d,x,y,s,label){

		this.ctx.save()
		this.ctx.translate(x,y)

		const deltaX = s / this.dataSqrt
		const unit = deltaX * .4
		const textUnit = s * .03

		for (let i = 0; i < d.length; i++){

			const dx = i % this.dataSqrt * deltaX + deltaX / 2
			const dy =Math.floor (i / this.dataSqrt) * deltaX + deltaX / 2

			this.ctx.fillStyle = this.color.class[d[i]]
			this.ctx.beginPath()
			this.ctx.arc(dx, dy, unit, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

		this.ctx.translate(s / 2, 0)
		this.ctx.font = textUnit * 3 + `px Verdana`
		this.ctx.fillStyle = this.color.label
		this.ctx.fillText(label, 0, -textUnit * 1.2)
		this.ctx.fillText(`ratio = ${this.humanize(this.getEstimate(d))}`, 0, s + textUnit * 3.2)

		this.ctx.restore()

	}

	getEstimate(d){

		let e = 0
		for (let i = 0; i < d.length; i++){
			if (d[i]) e++
		}
		return e / d.length

	}

	init(){

		this.data = []
		this.mean = 0
		const datasize = this.dataSqrt ** 2

		for (let i = 0; i < datasize; i++){

			const v = Math.random() > this.midpoint ? 1 : 0
			this.mean += v
			this.data.push(v)

		}

		this.mean /= datasize


		this.bootstraps = []
		this.estimates = []
		for (let i = 0; i < this.bsamples; i++){
			const data = this.getBootstrap(this.data, this.mean)
			this.estimates.push(this.getEstimate(data))
			this.bootstraps.push(data)
		}

		this.ctx.clearRect(0, 0, this.w, this.h)
		this.drawData(this.data, this.margin, this.margin, this.bigCell, `Random sample`)
		this.drawBootstraps()
		this.drawGraph()

	}

}
