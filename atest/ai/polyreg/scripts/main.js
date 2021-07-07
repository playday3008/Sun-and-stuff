let core

window.onload = _=>{

	const d = new Range({width: 500, value: 5, class: `input`, min: 1, max: 5, scale: 4, step: 1, label: `Max degree`, labelWidth: 200})
	const l1 = new Range({width: 500, value: .0, class: `input`, min: 0, max: .05, scale: 1, label: `L1 rate`, labelWidth: 200})
	const l2 = new Range({width: 500, value: .0, class: `input`, min: 0, max: 1, scale: 1, label: `L2 rate`, labelWidth: 200})

	const p1 = new Button({class: `button`, n: `Quadratic`})
	const p2 = new Button({class: `button`, n: `Stray points`})
	const p3 = new Button({class: `button`, n: `Overfitting`})
	const p4 = new Button({class: `button`, n: `Random 8`})
	const p5 = new Button({class: `button`, n: `Cubic`})

	const clear = new Button({class: `button`, n: `Clear`})
	const init = new Button({class: `button`, n: `Reinitialize`})
	clear.style.backgroundColor = init.style.backgroundColor = `#FFF`
	clear.style.boxShadow = init.style.boxShadow = `0 0 0 2px #000 inset`
	clear.style.color = init.style.color = `#000`

	document.body.appendChild(d)
	document.body.appendChild(l1)
	document.body.appendChild(l2)

	document.body.appendChild(p1)
	document.body.appendChild(p5)
	document.body.appendChild(p2)
	document.body.appendChild(p3)
	document.body.appendChild(p4)

	document.body.appendChild(document.createElement('br'))

	document.body.appendChild(clear)
	document.body.appendChild(init)

	core = new Core(document.querySelector(`.canvas`))

	d.data.onchange = v=>{
		core.degree = v
		core.initPoly()
	}
	l1.data.onchange = v=>{
		core.l1rate = v
	}
	l2.data.onchange = v=>{
		core.l2rate = v
	}
	clear.data.onchange = _=>{
		core.points = []
	}
	init.data.onchange = v=>{
		core.initPoly(true)
	}
	p1.data.onchange = _=>{
		core.points = [{"position":{"x":186,"y":172},"value":{"x":0.11625,"y":0.8566666666666667}},{"position":{"x":694,"y":1048},"value":{"x":0.43375,"y":0.12666666666666668}},{"position":{"x":1348,"y":192},"value":{"x":0.8425,"y":0.84}},{"position":{"x":782,"y":1080},"value":{"x":0.48875,"y":0.1}},{"position":{"x":1138,"y":690},"value":{"x":0.71125,"y":0.425}},{"position":{"x":970,"y":982},"value":{"x":0.60625,"y":0.18166666666666667}},{"position":{"x":1262,"y":398},"value":{"x":0.78875,"y":0.6683333333333333}},{"position":{"x":1408,"y":32},"value":{"x":0.88,"y":0.9733333333333334}},{"position":{"x":300,"y":520},"value":{"x":0.1875,"y":0.5666666666666667}},{"position":{"x":494,"y":886},"value":{"x":0.30875,"y":0.26166666666666666}},{"position":{"x":384,"y":696},"value":{"x":0.24,"y":0.42}},{"position":{"x":578,"y":1004},"value":{"x":0.36125,"y":0.16333333333333333}},{"position":{"x":640,"y":990},"value":{"x":0.4,"y":0.175}},{"position":{"x":238,"y":338},"value":{"x":0.14875,"y":0.7183333333333334}},{"position":{"x":138,"y":80},"value":{"x":0.08625,"y":0.9333333333333333}},{"position":{"x":856,"y":1016},"value":{"x":0.535,"y":0.15333333333333332}},{"position":{"x":1068,"y":876},"value":{"x":0.6675,"y":0.27}},{"position":{"x":1090,"y":770},"value":{"x":0.68125,"y":0.35833333333333334}},{"position":{"x":1202,"y":546},"value":{"x":0.75125,"y":0.545}},{"position":{"x":1296,"y":272},"value":{"x":0.81,"y":0.7733333333333333}},{"position":{"x":1390,"y":116},"value":{"x":0.86875,"y":0.9033333333333333}},{"position":{"x":1006,"y":882},"value":{"x":0.62875,"y":0.265}},{"position":{"x":814,"y":1028},"value":{"x":0.50875,"y":0.14333333333333334}},{"position":{"x":732,"y":1060},"value":{"x":0.4575,"y":0.11666666666666667}},{"position":{"x":542,"y":908},"value":{"x":0.33875,"y":0.24333333333333335}},{"position":{"x":432,"y":766},"value":{"x":0.27,"y":0.3616666666666667}},{"position":{"x":268,"y":454},"value":{"x":0.1675,"y":0.6216666666666667}},{"position":{"x":222,"y":246},"value":{"x":0.13875,"y":0.795}}]
		core.initPoly(true)
	}
	p5.data.onchange = _=>{
		core.points = [{"position":{"x":306,"y":178},"value":{"x":0.19125,"y":0.8516666666666667}},{"position":{"x":1294,"y":1132},"value":{"x":0.80875,"y":0.056666666666666664}},{"position":{"x":598,"y":780},"value":{"x":0.37375,"y":0.35}},{"position":{"x":1026,"y":908},"value":{"x":0.64125,"y":0.24333333333333335}},{"position":{"x":282,"y":252},"value":{"x":0.17625,"y":0.79}},{"position":{"x":250,"y":64},"value":{"x":0.15625,"y":0.9466666666666667}},{"position":{"x":372,"y":378},"value":{"x":0.2325,"y":0.685}},{"position":{"x":378,"y":548},"value":{"x":0.23625,"y":0.5433333333333333}},{"position":{"x":498,"y":662},"value":{"x":0.31125,"y":0.4483333333333333}},{"position":{"x":438,"y":524},"value":{"x":0.27375,"y":0.5633333333333334}},{"position":{"x":440,"y":640},"value":{"x":0.275,"y":0.4666666666666667}},{"position":{"x":350,"y":318},"value":{"x":0.21875,"y":0.735}},{"position":{"x":314,"y":358},"value":{"x":0.19625,"y":0.7016666666666667}},{"position":{"x":390,"y":468},"value":{"x":0.24375,"y":0.61}},{"position":{"x":420,"y":562},"value":{"x":0.2625,"y":0.5316666666666666}},{"position":{"x":586,"y":754},"value":{"x":0.36625,"y":0.37166666666666665}},{"position":{"x":532,"y":744},"value":{"x":0.3325,"y":0.38}},{"position":{"x":666,"y":846},"value":{"x":0.41625,"y":0.295}},{"position":{"x":822,"y":890},"value":{"x":0.51375,"y":0.25833333333333336}},{"position":{"x":848,"y":858},"value":{"x":0.53,"y":0.285}},{"position":{"x":752,"y":858},"value":{"x":0.47,"y":0.285}},{"position":{"x":848,"y":924},"value":{"x":0.53,"y":0.23}},{"position":{"x":970,"y":914},"value":{"x":0.60625,"y":0.23833333333333334}},{"position":{"x":966,"y":870},"value":{"x":0.60375,"y":0.275}},{"position":{"x":940,"y":882},"value":{"x":0.5875,"y":0.265}},{"position":{"x":1114,"y":922},"value":{"x":0.69625,"y":0.23166666666666666}},{"position":{"x":1178,"y":1000},"value":{"x":0.73625,"y":0.16666666666666666}},{"position":{"x":1230,"y":1060},"value":{"x":0.76875,"y":0.11666666666666667}},{"position":{"x":1300,"y":1138},"value":{"x":0.8125,"y":0.051666666666666666}},{"position":{"x":1316,"y":1188},"value":{"x":0.8225,"y":0.01}},{"position":{"x":1292,"y":1098},"value":{"x":0.8075,"y":0.085}},{"position":{"x":1208,"y":990},"value":{"x":0.755,"y":0.175}},{"position":{"x":1138,"y":956},"value":{"x":0.71125,"y":0.20333333333333334}},{"position":{"x":1050,"y":924},"value":{"x":0.65625,"y":0.23}},{"position":{"x":734,"y":834},"value":{"x":0.45875,"y":0.305}},{"position":{"x":620,"y":788},"value":{"x":0.3875,"y":0.3433333333333333}},{"position":{"x":480,"y":674},"value":{"x":0.3,"y":0.43833333333333335}},{"position":{"x":464,"y":596},"value":{"x":0.29,"y":0.5033333333333333}},{"position":{"x":380,"y":440},"value":{"x":0.2375,"y":0.6333333333333333}},{"position":{"x":338,"y":406},"value":{"x":0.21125,"y":0.6616666666666666}},{"position":{"x":284,"y":214},"value":{"x":0.1775,"y":0.8216666666666667}},{"position":{"x":268,"y":150},"value":{"x":0.1675,"y":0.875}},{"position":{"x":224,"y":90},"value":{"x":0.14,"y":0.925}},{"position":{"x":234,"y":34},"value":{"x":0.14625,"y":0.9716666666666667}},{"position":{"x":544,"y":728},"value":{"x":0.34,"y":0.3933333333333333}},{"position":{"x":706,"y":830},"value":{"x":0.44125,"y":0.30833333333333335}},{"position":{"x":808,"y":860},"value":{"x":0.505,"y":0.2833333333333333}},{"position":{"x":904,"y":882},"value":{"x":0.565,"y":0.265}}]
		core.initPoly(true)
	}
	p2.data.onchange = _=>{
		core.points = [{"position":{"x":158,"y":978},"value":{"x":0.09875,"y":0.185}},{"position":{"x":828,"y":828},"value":{"x":0.5175,"y":0.31}},{"position":{"x":1488,"y":176},"value":{"x":0.93,"y":0.8533333333333334}},{"position":{"x":1236,"y":590},"value":{"x":0.7725,"y":0.5083333333333333}},{"position":{"x":500,"y":990},"value":{"x":0.3125,"y":0.175}},{"position":{"x":38,"y":920},"value":{"x":0.02375,"y":0.23333333333333334}},{"position":{"x":1042,"y":692},"value":{"x":0.65125,"y":0.42333333333333334}},{"position":{"x":440,"y":286},"value":{"x":0.275,"y":0.7616666666666667}},{"position":{"x":1434,"y":1082},"value":{"x":0.89625,"y":0.09833333333333333}}]
		core.initPoly(true)
	}
	p3.data.onchange = _=>{
		core.points = [{"position":{"x":126,"y":1064},"value":{"x":0.07875,"y":0.11333333333333333}},{"position":{"x":1538,"y":98},"value":{"x":0.96125,"y":0.9183333333333333}},{"position":{"x":518,"y":794},"value":{"x":0.32375,"y":0.3383333333333333}},{"position":{"x":1194,"y":360},"value":{"x":0.74625,"y":0.7}},{"position":{"x":226,"y":696},"value":{"x":0.14125,"y":0.42}},{"position":{"x":892,"y":670},"value":{"x":0.5575,"y":0.44166666666666665}},{"position":{"x":1324,"y":146},"value":{"x":0.8275,"y":0.8783333333333333}},{"position":{"x":22,"y":1124},"value":{"x":0.01375,"y":0.06333333333333334}}]
		core.initPoly(true)
	}
	
	p4.data.onchange = _=>{
		const points = []

		for (let i = 0; i < 8; i++){

			const x = .1 + Math.random() * core.w * .9
			const y = .1 + Math.random() * core.h * .9

			points.push({
				position: {
					x: x, 
					y: y
				},
				value: {
					x: x / core.w,
					y: (core.h - y) / core.h
				}
			})

		}

		core.points = points
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
		this.ctx.lineWidth = this.ratio
		
		this.color = {
			pale: `#FAFAF9`,
			paleVeil: `#FAFAF9AA`,
			class: `#666`,
			axes: `#BBB`,
			line: `#000`,
			text: `#446`,
			error: `#F62`,
			overlay: `#333`,
			positive: `#FA8652`,
			negative: `#898AD4`
		}
		this.weightNames = [`β₀`, `β₁`, `β₂`, `β₃`, `β₄`, `β₅`]
		this.points = []
		this.pointRadius = this.ratio * 4
		this.notch = this.ratio * 6
		// this.scale = .01 / this.ratio
		// this.dx = 1 / this.scale
		// this.range = 1
		this.precision = 256
		this.l1rate = 0
		this.l2rate = 0

		this.mse = 0
		this.mae = 0
		this.mape = 0
		this.msle = 0
		this.rse = 0
		this.rae = 0

		this.learningRate = 1
		this.degree = 5
		this.initPoly()

		this.setListeners()
		this.update()
	}

	initPoly(drop){

		const weights = []
		this.noise = Math.random()
		for (let i = 0; i <= this.degree; i++){
			weights.push(this.weights && !drop ? (this.weights[i] || 0) : 0)
		}

		this.weights = weights

	}

	getValue(x){

		let value = 0
		for (let i = 0; i < Math.min(this.weights.length, this.points.length); i++){
			value += this.weights[i] * x ** i
		}
		return value

	}

	setListeners(){

		this.canvas.addEventListener(`mousedown`, e=>{
			const x = e.offsetX * this.ratio
			const y = e.offsetY * this.ratio
			const point = {
				position: {
					x: x, 
					y: y
				},
				value: {
					x: x / this.w,
					y: (this.h - y) / this.h
				}
			}
			this.points.push(point)
			// this.initPoly(true)
		})

	}

	adjust(n){

		this.mse = 0
		this.mae = 0
		this.mape = 0
		this.msle = 0
		this.rse = 0
		this.rae = 0

		let Tbar = 0
		for (let i = 0; i < this.points.length; i++){Tbar += this.getValue(this.points[i].value.x)}
		Tbar /= this.points.length

		for (let i = 0; i < this.points.length; i++){
			this.mse += (this.points[i].value.y - this.getValue(this.points[i].value.x)) ** 2
			this.mae += Math.abs(this.points[i].value.y - this.getValue(this.points[i].value.x))
			this.mape += Math.abs((this.points[i].value.y - this.getValue(this.points[i].value.x)) / (this.points[i].value.y || .0000001))
			this.msle += (Math.log(this.getValue(this.points[i].value.x) + 1) - Math.log(this.points[i].value.y + 1)) ** 2
			
			this.rse += (this.points[i].value.y - Tbar) ** 2
			this.rae += Math.abs(this.points[i].value.y - Tbar)
		}

		this.rse = this.mse / this.rse
		this.rae = this.mse / this.rae
		this.mse /= this.points.length
		this.mae /= this.points.length
		this.mape /= this.points.length

		if (this.points.length > 0){

			for (let e = 0; e < n; e++){

				// const gradient = Array(this.weights.length).fill(0)
				// let noise = 0

				// for (let i = 0; i < this.points.length; i++){

				// 	const p = this.points[i]
				// 	const error = p.value.y - this.getValue(p.value.x)
				// 	for (let j = 0; j < this.weights.length; j++){
				// 		gradient[j] += (p.value.x / this.range) ** j * error
				// 	}
				// 	noise += error

				// }

				// for (let i = 0; i < this.weights.length; i++){

				// 	const l1 = this.l1rate * Math.sign(this.weights[i]) / (i + 1)
				// 	const l2 = this.l2rate * 2 * (this.weights[i] / (i + 1))

				// 	this.weights[i] += (2 * gradient[i] / this.points.length - l1 - l2) * this.learningRate
				// 	//this.weights[i] = Math.min(Math.max(-10 / (i + 1), this.weights[i]), 10 / (i + 1))
				// }
				// this.noise += noise * this.learningRate

				const gradient = Array(this.weights.length).fill(0)
				const means = Array(gradient.length).fill(0)
				const stdevs = Array(gradient.length).fill(1)

				for (let i = 1; i < this.points.length; i++){
					for (let j = 1; j < gradient.length; j++){
						means[j] += this.points[i].value.x ** j / this.points.length
					}
				}
				for (let i = 1; i < this.points.length; i++){
					for (let j = 1; j < gradient.length; j++){
						stdevs[j] += (means[j] - this.points[i].value.x ** j) ** 2 / this.points.length
					}
				}

				

				for (let i = 0; i < this.points.length; i++){

					const p = this.points[i]
					const error = p.value.y - this.getValue(p.value.x)
					for (let j = 0; j < this.weights.length; j++){
						// gradient[j] += (p.value.x ** j - means[j]) / stdevs[j] * error // this.range
						gradient[j] += p.value.x ** j * error / 2
					}

				}

				for (let i = 0; i < Math.min(this.weights.length, this.points.length); i++){

					const l1 = i ? this.l1rate * Math.sign(this.weights[i]) / 3 ** (i + 1) : 0
					const l2 = i ? this.l2rate * 2 * (this.weights[i] / 3 ** (i + 1)) : 0

					this.weights[i] += (gradient[i] / this.points.length - l1 - l2) * this.learningRate
					this.weights[i] = Math.min(Math.max(-100 / (i + 1), this.weights[i]), 100 / (i + 1))
				}

			}
		}

	}

	drawPoints(){

		for (let p of this.points){

			const px = p.value.x * this.w
			const py = this.h - p.value.y * this.h

			this.ctx.strokeStyle = this.color.error
			this.ctx.beginPath()
			this.ctx.moveTo(px, py)
			const y = this.h - this.getValue(p.value.x) * this.h
			this.ctx.lineTo(px, y)
			this.ctx.stroke()

			this.ctx.fillStyle = this.color.class
			this.ctx.beginPath()
			this.ctx.arc(px, py, this.pointRadius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			this.ctx.fillStyle = this.color.error
			this.ctx.beginPath()
			this.ctx.arc(px, y, this.pointRadius * .6, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

	}

	drawAxes(){

		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = this.color.axes
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.font = this.notch * 2 + `px monospace`
		this.ctx.lineWidth = this.ratio

		// this.ctx.beginPath()
		// this.ctx.moveTo(0, this.h * .5)
		// this.ctx.lineTo(this.w, this.h * .5)
		// this.ctx.stroke()

		// this.ctx.beginPath()
		// this.ctx.moveTo(this.w * .5, 0)
		// this.ctx.lineTo(this.w * .5, this.h)
		// this.ctx.stroke()

		this.ctx.translate(0, this.h)
		for (let x = 0; x < .99; x+=.1){

			// this.ctx.beginPath()
			// this.ctx.moveTo(x * this.w, 0)
			// this.ctx.lineTo(x * this.w, -this.notch)
			// this.ctx.stroke()
			this.ctx.fillText(Math.floor(x * 10) / 10, x === 0 ? -this.notch * 2 : x * this.w, -this.notch * 2)

		}

		for (let y = 0; y < 1; y+=.1){

			if (y === 0) continue
			// this.ctx.beginPath()
			// this.ctx.moveTo(0, -y * this.h)
			// this.ctx.lineTo(this.notch, -y * this.h)
			// this.ctx.stroke()
			this.ctx.fillText(Math.floor(-y * 10) / 10, this.notch * 2.8, -y * this.h)

		}

		this.ctx.restore()

	}

	drawLine(){

		this.ctx.save()
		this.ctx.strokeStyle = this.color.line
		this.ctx.translate(0, this.h)
		this.ctx.scale(1,-1)
		this.ctx.lineWidth = this.ratio * 4

		const dx = this.w / this.precision
		this.ctx.beginPath(0, this.getValue(0) * this.h)

		for (let x = 0; x < 1; x += 1 / this.precision){
			this.ctx.lineTo(x * this.w, this.getValue(x) * this.h)
		}

		this.ctx.stroke()
		this.ctx.restore()

	}

	drawTextOverlay(){

		const margin = this.fontSize * 2

		this.ctx.fillStyle = this.color.paleVeil
		this.ctx.fillRect(0, 0, this.fontSize * 10, this.h * .6)

		this.ctx.save()
		this.ctx.translate(this.notch * 2, this.notch * 2)
		this.ctx.textBaseline = `top`
		this.ctx.fillStyle = this.color.text
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.fillText(this.getFormula(), 0, 0)

		this.ctx.translate(0, this.fontSize * 3)

		const w = this.fontSize * 10
		for (let i = 0; i < this.weights.length; i++){
			
			this.ctx.strokeStyle = this.weights[i] < 0 ? this.color.negative : this.color.positive
			this.ctx.fillText(this.weightNames[i] + ` `, 0, 0)
			this.ctx.beginPath()
			this.ctx.moveTo(margin, this.fontSize * .5)
			this.ctx.lineTo(margin + Math.abs(this.weights[i]) * w, this.fontSize * .5)
			this.ctx.stroke()

			this.ctx.translate(0, this.fontSize * 1.5)

		}

		this.ctx.translate(0, this.fontSize * 2)

		if (!isNaN(this.mse)){

			this.ctx.fillText(`MSE: ${this.civilize(this.mse)}`, 0, 0)
			this.ctx.fillText(`RMSE: ${this.civilize(this.mse ** .5)}`, 0, this.fontSize * 1.5)
			this.ctx.fillText(`MAE: ${this.civilize(this.mae)}`, 0, this.fontSize * 3)
			this.ctx.fillText(`MAPE: ${this.civilize(this.mape * 100)}%`, 0, this.fontSize * 4.5)
			this.ctx.fillText(`RMSLE: ${this.civilize(this.msle ** .5)}`, 0, this.fontSize * 6)
			this.ctx.fillText(`RSE: ${this.civilize(this.rse)}`, 0, this.fontSize * 7.5)
			this.ctx.fillText(`RAE: ${this.civilize(this.rae)}`, 0, this.fontSize * 9)

		}

		this.ctx.restore()

	}

	getFormula(){

		let string = `y = `
		for (let i = 0; i < this.weights.length; i++){
			string += this.civilize(i === 0 ? this.weights[i] : Math.abs(this.weights[i])) + this.getXPower(i) + ((i === this.weights.length - 1) ? `` : (this.weights[i + 1] > 0 ? ` + ` : ` – `))
		}
		return string
	}

	getXPower(p){

		const powers = [``,`x`,`x²`,`x³`,`x⁴`,`x⁵`]
		return powers[p]

	}

	civilize(n){
		return Math.floor(n * 1000) / 1000
	}

	update(){

		requestAnimationFrame(_=>{this.update()})

		this.ctx.fillStyle = this.color.pale
		this.ctx.fillRect(0, 0, this.w, this.h)

		this.drawAxes()
		this.drawLine()
		this.drawPoints()
		this.drawTextOverlay()

		this.adjust(10000 / this.points.length)

	}

}
