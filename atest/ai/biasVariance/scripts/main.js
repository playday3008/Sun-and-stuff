let core

window.onload = _=>{

	const d = new Range({width: 500, value: 5, class: `input`, min: 1, max: 10, scale: 9, step: 1, label: `Max degree`, labelWidth: 200})
	const l1 = new Range({width: 500, value: 0, class: `input`, min: 0, max: .01, scale: .5, step: .0001, label: `L1 rate`, labelWidth: 200})
	const l2 = new Range({width: 500, value: 0, class: `input`, min: 0, max: 5, scale: .5, step: .001, label: `L2 rate`, labelWidth: 200})

	// const p1 = new Button({class: `button`, n: `Quadratic`})
	// const p2 = new Button({class: `button`, n: `Stray points`})
	// const p3 = new Button({class: `button`, n: `Overfitting`})
	// const p4 = new Button({class: `button`, n: `Random 8`})
	// const p5 = new Button({class: `button`, n: `Cubic`})

	const newData = new Button({class: `button`, n: `New dataset`})
	const init = new Button({class: `button`, n: `Reinitialize`})
	newData.style.backgroundColor = init.style.backgroundColor = `#FFF`
	newData.style.boxShadow = init.style.boxShadow = `0 0 0 2px #000 inset`
	newData.style.color = init.style.color = `#000`

	document.body.appendChild(d)
	document.body.appendChild(l1)
	document.body.appendChild(l2)

	// document.body.appendChild(p1)
	// document.body.appendChild(p5)
	// document.body.appendChild(p2)
	// document.body.appendChild(p3)
	// document.body.appendChild(p4)

	document.body.appendChild(document.createElement('br'))

	document.body.appendChild(newData)
	// document.body.appendChild(init)

	core = new Core(document.querySelector(`.canvas`))

	d.data.onchange = v=>{
		// core.regression.init(v)
		// core.trainRegression()
		core.updateModels(v)
	}
	l1.data.onchange = v=>{
		// core.regression.l1rate = v
		// core.trainRegression()
		// core.updateModels(false,v,false)
		core.l1 = v
		for (let m of core.models){
			m.l1rate = v
		}
	}
	l2.data.onchange = v=>{
		// core.regression.l2rate = v
		// core.trainRegression()
		// core.updateModels(false,false,v)
		core.l2 = v
		for (let m of core.models){
			m.l2rate = v
		}
	}
	newData.data.onchange = _=>{
		core.initData()
		core.updateModels()
	}
	init.data.onchange = v=>{
		core.updateModels(false, core.l1, core.l2)
	}

}

class Regression {

	constructor(a){

		this.degree = a.degree || 2
		this.trainPoints = []
		this.l1rate = a.l1 || 0
		this.l2rate = a.l2 || 0
		this.lrate = .1

		this.range = a.range || 1

		this.init(this.degree)

	}

	init(d){

		this.weights = Array(d + 1).fill(0)

	}

	getValue(x){

		let value = 0
		for (let i = 0; i < this.weights.length; i++){
			value += this.weights[i] * x ** i
		}
		return value

	}

	adjust(n){

		if (this.trainPoints.length > 0){

			for (let e = 0; e < n; e++){

				const gradient = Array(this.weights.length).fill(0)
				const means = Array(gradient.length).fill(0)
				const stdevs = Array(gradient.length).fill(1)

				for (let i = 1; i < this.trainPoints.length; i++){
					for (let j = 1; j < gradient.length; j++){
						means[j] += this.trainPoints[i].value.x ** j / this.trainPoints.length
					}
				}
				for (let i = 1; i < this.trainPoints.length; i++){
					for (let j = 1; j < gradient.length; j++){
						stdevs[j] += (means[j] - this.trainPoints[i].value.x ** j) ** 2 / this.trainPoints.length
					}
				}
				// if (e===0 && performance.now()<50) console.log(means, stdevs)

				

				for (let i = 0; i < this.trainPoints.length; i++){

					const p = this.trainPoints[i]
					
					const error = p.value.y - this.getValue(p.value.x)
					for (let j = 0; j < this.weights.length; j++){
						// gradient[j] += (p.value.x / this.range * .5) ** j * error// / (j+1) ** (j+1)
						// gradient[j] += (p.value.x / this.range / (j+1)) ** j * error
						gradient[j] += (p.value.x ** j - means[j]) / stdevs[j] * error / this.range
					}

				}

				for (let i = 0; i < this.weights.length; i++){

					const l1 = i ? this.l1rate * Math.sign(this.weights[i]) / 3 ** (i + 1) : 0
					const l2 = i ? this.l2rate * 2 * (this.weights[i] / 3 ** (i + 1)) : 0

					this.weights[i] += (2 * gradient[i] / this.trainPoints.length - l1 - l2) * this.lrate
					this.weights[i] = Math.min(Math.max(-10 / (i + 1), this.weights[i]), 10 / (i + 1))
				}
			}
		}

	}

	train(p,n){

		this.trainPoints = p
		this.adjust(n)

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
			class: `#666`,
			training: `#6C6`,
			axes: `#BBB`,
			line: `#000`,
			text: `#446`,
			error: `#F93`,
			true: `#0001`

		}
		this.classColors = light(`depth`) //light(['#3A2F50', '#F5A897', '#FBF0CA'])
		this.warnColors = light([this.color.text, `#F62`])
		// this.weightNames = [`β₀`, `β₁`, `β₂`, `β₃`, `β₄`, `β₅`]
		this.pointRadius = this.ratio * 4
		this.notch = this.ratio * 6
		this.scale = .02
		this.dx = devicePixelRatio / this.scale
		this.range = Math.ceil(this.w * .5 / this.dx)
		this.precision = 256
		this.dataSize = 30
		this.fits = 3
		this.degree = 5
		this.maxDegree = 10
		// this.l1 = 0
		// this.l2 = 0

		this.f = x=>Math.cos(x * .6) + x * .2//(x/4 - 1)**2 * -1 + 3

		this.grng = this.getGaussianGenerator(.7)

		// this.regression = new Regression({degree: 5, range: this.range})

		this.initGraph()
		this.initData()
		this.updateModels(this.degree)
		this.update()
		
		// this.trainRegression()

	}

	initGraph(){
		this.graph = []
		for (let i = 0; i < this.maxDegree; i++){
			this.graph.push({b:false, v:false})
		}
	}

	updateModels(d,l1,l2){

		if (d) {this.degree = d}
		if (l1 != null) {this.l1 = l1}
		if (l2 != null) {this.l2 = l2}

		this.initModels(this.degree,this.l1,this.l2)
		// this.trainModels()
		// this.update()
	}

	initModels(d,l1,l2){

		this.models = []
		for (let i = 0; i < this.fits; i++){
			this.models[i] = new Regression({degree: d || 5, range: this.range, l1: l1 || 0, l2: l2 || 0})
		}

	}

	// trainRegression(){
	// 	this.regression.train(this.trainingPoints, 50000)
	// 	this.update()
	// }

	trainModels(){
		for (let i = 0; i < this.fits; i++){
			this.models[i].train(this.subsets[i], 100)
			// this.update()
		}
	}

	initData(){

		this.points = []
		this.subsets = Array(this.fits)
		for (let i = 0; i < this.fits; i++){
			this.subsets[i] = []
		}
		
		const f = this.f
		const n = this.dataSize

		for (let i = 0, sid = 0; i < n; i++, sid++){

			const x = -this.range + this.range * 2 / n * (i+.5)
			const y = f(x) + this.grng()
			const coords = this.getCoords(x,y)
			sid = sid % this.fits

			const point = {
				position: {x: coords[0], y: coords[1]},
				value: {x: x, y: y},
				color: this.classColors.rgb(sid / this.fits)
			}

			this.points.push(point)
			this.subsets[sid].push(point)
		}

		this.trainingPoints = this.subsets[0]
	}

	getCoords(x,y){

		const cx = this.w / 2 + x / this.scale * this.ratio
		const cy = this.h / 2 - y / this.scale * this.ratio
		return [cx, cy]

	}

	getGaussianGenerator(stdev){

		let y2
		let use_last = false
		return function() {
		    let y1
		    if (use_last) {
		       y1 = y2
		       use_last = false
		    }
		    else {
		        let x1, x2, w
		        do {
		             x1 = 2.0 * Math.random() - 1.0
		             x2 = 2.0 * Math.random() - 1.0
		             w  = x1 * x1 + x2 * x2              
		        } while (w >= 1.0)
		        w = Math.sqrt((-2.0 * Math.log(w))/w)
		        y1 = x1 * w
		        y2 = x2 * w
		        use_last = true
		   }

		   let retval = stdev * y1
		   return retval
		}

	}

	drawPoints(){

		for (let p of this.points){

			this.ctx.fillStyle = p.color
			this.ctx.beginPath()
			this.ctx.arc(p.position.x, p.position.y, this.pointRadius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

	}

	drawGraph(){

		const spanX = this.w * .635
		const spanY = this.h * .2

		this.ctx.save()
		this.ctx.translate(this.w * .275, this.h * .75)

		this.ctx.fillStyle = `#FFF`
		this.ctx.fillRect(0,0,spanX,spanY)

		//BIAS
		this.ctx.lineWidth = this.ratio * 3
		for (let i = 0; i < this.graph.length; i++){
			if (this.graph[i].b !== false) {
				this.ctx.strokeStyle = `#75B1E9`
				this.ctx.beginPath()
				this.ctx.moveTo(i / (this.graph.length - 1) * (spanX - this.ratio * 9), spanY)
				this.ctx.lineTo(i / (this.graph.length - 1) * (spanX - this.ratio * 9), spanY - Math.min(this.graph[i].b * 6, spanY))
				this.ctx.stroke()

				this.ctx.strokeStyle = `#F67E86`
				this.ctx.beginPath()
				this.ctx.moveTo(i / (this.graph.length - 1) * (spanX - this.ratio * 9) + this.ratio * 6, spanY)
				this.ctx.lineTo(i / (this.graph.length - 1) * (spanX - this.ratio * 9) + this.ratio * 6, spanY - Math.min(this.graph[i].v, spanY))
				this.ctx.stroke()
			}
		}


		// //BIAS
		// this.ctx.strokeStyle = `#00F`
		// this.ctx.beginPath()
		// this.ctx.moveTo(0, spanY - this.graph[0].b * 10)
		// for (let i = 1; i < this.graph.length; i++){
		// 	if (this.graph[i].b !== false) this.ctx.lineTo(i / this.graph.length * spanX, spanY - this.graph[i].b * 10)
		// }
		// this.ctx.stroke()

		// //VARIANCE
		// this.ctx.strokeStyle = `#F00`
		// this.ctx.beginPath()
		// this.ctx.moveTo(0, spanY - this.graph[0].v)
		// for (let i = 1; i < this.graph.length; i++){
		// 	if (this.graph[i].v !== false) this.ctx.lineTo(i / this.graph.length * spanX, spanY - this.graph[i].v)
		// }
		// this.ctx.stroke()

		this.ctx.restore()

	}

	drawErrorPlot(){

		let min = Infinity
		let max = -Infinity
		let bias = 0
		let variance = 0

		for (let m of this.models){

			for (let p of m.trainPoints){

				const e = (p.value.y - m.getValue(p.value.x)) ** 2
				bias += e

			}

			for (let p of this.points){

				const e = (p.value.y - m.getValue(p.value.x)) ** 2
				variance += e

			}

		}

		this.bias = bias
		this.variance = variance
		this.graph[this.degree - 1].b = this.bias
		this.graph[this.degree - 1].v = this.variance


		this.ctx.save()
		// this.ctx.fillStyle = this.color.text
		// this.ctx.strokeStyle = this.color.text
		this.ctx.fillStyle = this.ctx.strokeStyle = `#75B1E9`//this.warnColors.rgb(this.bias / 8)
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.translate(this.fontSize, this.fontSize * 2)
		this.ctx.fillText(`Bias: ${this.civilize(this.bias)}`, 0, 0)

		this.ctx.translate(0, this.fontSize * .4)
		this.ctx.beginPath()
		this.ctx.moveTo(0,0)
		this.ctx.lineTo(this.w / 2 * this.bias / 10 ,0)
		this.ctx.stroke()

		this.ctx.fillStyle = this.ctx.strokeStyle = `#F67E86`//this.warnColors.rgb(this.variance / 300)
		this.ctx.translate(0, this.fontSize * 1.4)
		this.ctx.fillText(`Variance: ${this.civilize(this.variance)}`, 0, 0)

		this.ctx.translate(0, this.fontSize * .4)
		this.ctx.beginPath()
		this.ctx.moveTo(0,0)
		this.ctx.lineTo(this.w / 2 * this.variance / 800 ,0)
		this.ctx.stroke()

		this.ctx.restore()

	}

	drawAxes(){

		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = this.color.axes
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.font = this.notch * 2 + `px monospace`
		this.ctx.lineWidth = this.ratio

		this.ctx.beginPath()
		this.ctx.moveTo(0, this.h * .5)
		this.ctx.lineTo(this.w, this.h * .5)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(this.w * .5, 0)
		this.ctx.lineTo(this.w * .5, this.h)
		this.ctx.stroke()

		this.ctx.translate(this.w * .5, this.h * .5)
		for (let x = -this.range; x <= this.range; x ++){

			this.ctx.beginPath()
			this.ctx.moveTo(x * this.dx, 0)
			this.ctx.lineTo(x * this.dx, -this.notch)
			this.ctx.stroke()
			this.ctx.fillText(x, x === 0 ? -this.notch * 2 : x * this.dx, this.notch * 2)

		}

		for (let y = -this.range; y <= this.range; y++){

			if (y === 0) continue
			this.ctx.beginPath()
			this.ctx.moveTo(0, y * this.dx)
			this.ctx.lineTo(this.notch, y * this.dx)
			this.ctx.stroke()
			this.ctx.fillText(-y, -this.notch * 2.4, y * this.dx)

		}

		this.ctx.restore()

	}

	drawModels(){

		for (let i = 0; i < this.fits; i++){

			this.drawRegression(this.models[i],this.classColors.rgb(i / this.fits))

		}

	}

	drawRegression(r,c){

		this.ctx.save()
		this.ctx.strokeStyle = c || this.color.line
		this.ctx.translate(this.w * .5, this.h * .5)
		this.ctx.scale(1,-1)
		this.ctx.lineWidth = this.ratio * 2

		const dx = this.w / this.precision
		this.ctx.beginPath(0, r.getValue(0) * this.dx)

		for (let x = -this.range; x < this.range; x += (this.range * 2 / this.precision)){
			this.ctx.lineTo(x * this.dx, r.getValue(x) * this.dx)
		}

		this.ctx.stroke()
		this.ctx.restore()

		this.ctx.strokeStyle = this.color.error
		for (let p of r.trainPoints){
			
			this.ctx.beginPath()
			this.ctx.moveTo(p.position.x, p.position.y)
			const y = -r.getValue(p.value.x) / this.scale * this.ratio + this.h / 2
			this.ctx.lineTo(p.position.x, y)
			this.ctx.stroke()
		}

	}

	drawTrueFunction(){

		this.ctx.save()
		this.ctx.strokeStyle = this.color.true
		this.ctx.translate(this.w * .5, this.h * .5)
		this.ctx.scale(1,-1)
		this.ctx.lineWidth = this.ratio * 4

		const dx = this.w / this.precision
		this.ctx.beginPath(0, this.f(0) * this.dx)

		for (let x = -this.range; x < this.range; x += (this.range * 2 / this.precision)){
			this.ctx.lineTo(x * this.dx, this.f(x) * this.dx)
		}

		this.ctx.stroke()
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
		this.trainModels()

		this.drawTrueFunction()
		this.drawModels()
		this.drawPoints()
		this.drawErrorPlot()
		this.drawGraph()

	}

}
