let core;
window.onload = ()=>{

	let sigma = new Range({ width: 400, value: .0005, class: `input`, min: .0001, max: .1, scale: 5, label: `Descent rate`, labelWidth: 160})
	let p = new Button({class: `button`, n: `New points`})
	let f = new Button({class: `button`, n: `Random function`})
	let f1 = new Button({class: `button`, n: `x⁴ + y⁴ - 2xy`})
	let f2 = new Button({class: `button`, n: `Monkey saddle`})
	let f3 = new Button({class: `button`, n: `Hyperbolic paraboloid`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(sigma)
	document.body.appendChild(p)
	document.body.appendChild(f)
	document.body.appendChild(document.createElement('br'))
	document.body.appendChild(f1)
	document.body.appendChild(f2)
	document.body.appendChild(f3)

	p.data.onchange = v=>{
		core.generatePoints()
	}
	f.data.onchange = v=>{
		core.generateRandomFunction()
		core.generatePoints()
	}
	f1.data.onchange = v=>{
		core.f = (x,y)=>{return x**4 + y**4 - 2 * x * y}
		core.fText = `x⁴ + y⁴ - 2xy`
		core.vDrawF()
		core.generatePoints()
	}
	f2.data.onchange = v=>{
		core.f = (x,y)=>x**3 - 3 * x * y ** 2
		core.fText = `x³ - 3xy²`
		core.vDrawF()
		core.generatePoints()
	}
	f3.data.onchange = v=>{
		core.f = (x,y)=>x**2 - y**2
		core.fText = `x² - y²`
		core.vDrawF()
		core.generatePoints()
	}
	sigma.data.onchange = v=>{
		core.generatePoints()
		core.sigma = v * core.ratio
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext('2d')

		this.vCanvas = document.createElement('canvas')
		this.vCanvas.width = this.w
		this.vCanvas.height = this.h
		this.vctx = this.vCanvas.getContext('2d')

		this.tCanvas = document.createElement('canvas')
		this.tCanvas.width = this.w
		this.tCanvas.height = this.h
		this.tctx = this.tCanvas.getContext('2d')

		//VISUALS
		this.margin = 20 * this.ratio
		this.pointSize = this.ratio * 4
		this.bands = 64
		this.scheme = [[0,0,0],[58,15,110],[140,40,129],[221,73,104],[253,158,108],[251,251,190]]//[[94,79,162],[105,195,165],[235,247,260],[254,208,126],[231,89,72],[158,1,66]]//[[94,14,63],[165,10,49],[255,138,35],[253,223,111],[255,255,237]]

		//DATA
		this.pointCount = 64
		this.sigma = .0005 * this.ratio
		this.tolerance = .000001
		this.rangeX = [-1, 1]
		this.rangeY = [-1, 1]
		this.rangeZ = [-1, 2]
		this.f

		this.dx = this.w / (this.rangeX[1] - this.rangeX[0])
		this.dy = this.h / (this.rangeY[1] - this.rangeY[0])

		this.ctx.font = this.ratio * 12 + `px Arial`;
		// this.ctx.textAlign = `center`
		// this.ctx.textBaseline = `middle`
		this.ctx.lineWidth = this.ratio
		this.ctx.lineCap = `round`

		this.generateRandomFunction()
		this.generatePoints()
		this.run()

	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	getColor(uv){
		if (uv >= 1) return this.scheme[this.scheme.length - 1]
		if (uv <= 0) return this.scheme[0]

		let l = this.scheme.length - 1
		let c1 = Math.floor(uv * l)
		let c2 = c1+1
		let f = (uv - c1 / l) / (c2 / l - c1 / l)

		return [Math.floor(this.lerp(this.scheme[c1][0], this.scheme[c2][0], f)), Math.floor(this.lerp(this.scheme[c1][1], this.scheme[c2][1], f)), Math.floor(this.lerp(this.scheme[c1][2], this.scheme[c2][2], f))]

	}

	lerp(a, b, f){
		return a + (b - a) * f;
	}

	update(){

		this.averageCost = 0

		for (let i = 0; i < this.points.length; i++){

			let p = this.points[i]
			this.averageCost += (p.z - this.rangeZ[0])
			if (!p.done){

				this.iterationsCount++
				let der = [this.f(p.x + this.sigma, p.y) - this.f(p.x - this.sigma, p.y), this.f(p.x, p.y + this.sigma) - this.f(p.x, p.y - this.sigma)]
				p.lx = p.x
				p.ly = p.y
				p.x -= der[0]
				p.y -= der[1]
				p.z = this.f(p.x, p.y)

				if (Math.abs(der[0]) + Math.abs(der[1]) < this.tolerance) {
					p.done = true
				} else if (p.x < this.rangeX[0] || p.x > this.rangeX[1] || p.y < this.rangeY[0] || p.y > this.rangeY[1]) {
					this.points.splice(i,1)
					i--
				}

			}

		}

		this.averageCost /= this.points.length

	}

	generateRandomFunction(){

		// this.f = (x,y)=>x**3 - 3 * x * y ** 2 //Monkey saddle

		// this.f = (x,y)=>{return x**4 + y**4 - 2 * x * y}

		let k1 = Math.random() * 2
		let k2 = Math.random() * 2
		let k1a = Math.random() * 10 - 5
		let k2a = Math.random() * 10 - 5

		let k3 = Math.random() * 6
		let k4 = Math.random() * 6
		let k3a = Math.random() * 10 - 5
		let k4a = Math.random() * 10 - 5

		let k5 = Math.random() * 10 - 5
		let k6 = Math.random() * 20 - 10
		this.f = (x,y)=>{return Math.sin(k1 * x + k1a) / 2 + Math.sin(k3 * x + k3a) / 4 + Math.sin(k2 * y + k2a) / 2 + Math.sin(k4 * y + k4a) / 4 +  x * x * y * y + .5}
		this.fText = `½sin(${k1.toFixed(2)}x + ${k1a.toFixed(2)}) + ¼sin(${k3.toFixed(2)}x + ${k3a.toFixed(2)}) + ½sin(${k2.toFixed(2)}y + ${k2a.toFixed(2)}) + ¼sin(${k4.toFixed(2)}y + ${k4a.toFixed(2)}) + x²y² + ½`

		this.vDrawF()

	}

	generatePoints(){

		this.points = []
		this.iterationsCount = 0

		for (let i = 0; i < this.pointCount; i++){

			let p = {done: false, x: this.rangeX[0] + Math.random() * (this.rangeX[1] - this.rangeX[0]), y: this.rangeY[0] + Math.random() * (this.rangeY[1] - this.rangeY[0])}
			p.z = this.f(p.x, p.y)
			this.points.push(p)

		}

		this.tctx.clearRect(0, 0, this.w, this.h)

	}

	pToXy(i){

		let x = this.rangeX[0] + i % this.w / this.w * (this.rangeX[1] - this.rangeX[0])
		let y = this.rangeY[0] + Math.floor(i / this.w) / this.h * (this.rangeY[1] - this.rangeY[0])
		return [x, y]

	}

	vDrawF(){

		this.vctx.clearRect(0, 0, this.w, this.h)
		this.vctx.save()

		let pixels = this.vctx.createImageData(this.w, this.h)
		for (let i = 0; i < pixels.data.length; i += 4){

			let xy = this.pToXy(i / 4)
			let zUV = (this.f(xy[0], xy[1]) - this.rangeZ[0]) / (this.rangeZ[1] - this.rangeZ[0])
			let v = this.bands ? Math.floor(zUV * this.bands) / this.bands : zUV
			let c = this.getColor(v)

			pixels.data[i] = c[0]
			pixels.data[i+1] = c[1]
			pixels.data[i+2] = c[2]
			pixels.data[i+3] = 255

		}
		this.vctx.putImageData(pixels, 0, 0)

		this.vctx.restore()
	}

	drawPoints(){

		this.ctx.save()
		this.ctx.translate(-this.rangeX[0] * this.dx, -this.rangeY[0] * this.dy)
		this.tctx.save()
		this.tctx.strokeStyle = `#afa3`
		this.tctx.translate(-this.rangeX[0] * this.dx, -this.rangeY[0] * this.dy)

		for (let i = 0; i < this.points.length; i++){

			let p = this.points[i]
			this.ctx.fillStyle = p.done ? `#FFF3` : `#48FF7B` //`#ff8539` Yellow
			this.ctx.beginPath()
			this.ctx.arc(p.x * this.dx, p.y * this.dy, this.pointSize, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			if (!p.done){

				this.tctx.beginPath()
				this.tctx.moveTo(p.lx * this.dx, p.ly * this.dy)
				this.tctx.lineTo(p.x * this.dx, p.y * this.dy)
				this.tctx.stroke()

			}

		}

		this.ctx.restore()
		this.tctx.restore()

	}

	drawLegend(){

		this.ctx.save()
		// this.ctx.globalCompositeOperation = `difference`
		this.ctx.translate(this.margin, this.h - this.margin - this.ratio * 54)
		this.ctx.fillStyle = `#fff`


		this.ctx.fillText(`Rate: ${Math.floor(this.sigma*10000)/10000}`, 0, this.ratio * 0)
		this.ctx.fillText(`Iterations count: ${this.iterationsCount}`, 0, this.ratio * 18)
		this.ctx.fillText(this.averageCost ? `Average value: ${Math.floor(this.averageCost*100)/100}` : `Local minima are somewhere else`, 0, this.ratio * 36)
		this.ctx.fillText(`Function: ` + this.fText, 0, this.ratio * 54)
		
		this.ctx.restore()

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.save()
		this.ctx.translate(0, this.h)
		this.ctx.scale(1,-1)

		this.ctx.drawImage(this.vCanvas, 0, 0)
		this.ctx.drawImage(this.tCanvas, 0, 0)
		this.drawPoints()

		this.ctx.restore()

		this.drawLegend()

	}

}