let core

window.onload = _=>{

	const vmat = new Range({width: 500, value: 0, class: `input`, min: 0, max: Math.PI * 2, scale: 4, step: .01, label: `Vᵀ rotation`, labelWidth: 200, formula: a=>a/Math.PI+`π`})
	const emat = new Range({width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 4, step: .01, label: `Σ squishing`, labelWidth: 200})
	const umat = new Range({width: 500, value: 0, class: `input`, min: 0, max: Math.PI * 2, scale: 4, step: .01, label: `U counter-rotation`, labelWidth: 200, formula: a=>`-${a/Math.PI}π`})
	// const l1 = new Range({width: 500, value: 0, class: `input`, min: 0, max: .01, scale: .5, step: .0001, label: `L1 rate`, labelWidth: 200})
	// const l2 = new Range({width: 500, value: 0, class: `input`, min: 0, max: 5, scale: .5, step: .001, label: `L2 rate`, labelWidth: 200})

	// const newData = new Button({class: `button`, n: `New dataset`})
	// const init = new Button({class: `button`, n: `Reinitialize`})
	// newData.style.backgroundColor = init.style.backgroundColor = `#FFF`
	// newData.style.boxShadow = init.style.boxShadow = `0 0 0 2px #000 inset`
	// newData.style.color = init.style.color = `#000`

	document.body.appendChild(vmat)
	document.body.appendChild(emat)
	document.body.appendChild(umat)
	// document.body.appendChild(l1)
	// document.body.appendChild(l2)

	// document.body.appendChild(document.createElement('br'))

	// document.body.appendChild(newData)

	core = new Core(document.querySelector(`.canvas`))

	vmat.data.onchange = v=>{
		core.values[0] = v
		core.reset()
		core.update()
	}
	emat.data.onchange = v=>{
		core.values[1] = v
		core.reset()
		core.update()
	}
	umat.data.onchange = v=>{
		core.values[2] = v
		core.reset()
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
		this.ctx.lineWidth = this.ratio * 3
		this.scale = 100 * this.ratio

		this.color = {
			axes: `#DDD`,
			shape: `#334`,
			x: `#F28F57`,
			y: `#75B1E9`,
			matrix: `#000`,
			sigma: `#E0D9C7`
		}

		this.center = {x: this.w / 2, y: this.h * .4}
		this.values = [0, 0, 0]

		this.shape = this.getShapePoints()

		this.reset()
		this.update()
		

	}

	drawMatrices(){

		const margin = this.w * .1
		const w = this.h / 4
		this.ctx.save()
		this.ctx.translate(margin, this.h - w - w * .2)

		this.ctx.font = w * .2
		this.ctx.fillStyle = this.color.matrix
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`

		this.ctx.fillText(`X =`, 0, w/2)
		this.ctx.fillText(`×`, w * 1.4, w/2)
		this.ctx.fillText(`×`, w * 2.8, w/2)

		this.drawMatrix2x(this.U, w * .2, 0, w, `U`)
		this.drawMatrix2x(this.E, w * 1.6, 0, w, `Σ`)
		this.drawMatrix2x(this.V, w * 3, 0, w, `Vᵀ`)

		this.ctx.restore()
	}

	drawMatrix2x(m, tx, ty, w, label){

		const serif = w * .04
		const font = w * .14

		this.ctx.save()
		this.ctx.translate(tx, ty)
		this.ctx.lineWidth = w * .014
		this.ctx.font = font + `px Verdana`

		this.ctx.strokeStyle = this.ctx.fillStyle = this.color.matrix
		this.ctx.beginPath()
		this.ctx.moveTo(serif, 0)
		this.ctx.lineTo(0,0)
		this.ctx.lineTo(0,w)
		this.ctx.lineTo(serif,w)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.moveTo(w - serif, 0)
		this.ctx.lineTo(w,0)
		this.ctx.lineTo(w,w)
		this.ctx.lineTo(w - serif,w)
		this.ctx.stroke()

		const margin = w / 4
		const dx = (w - margin * 2)

		for (let i = 0; i < m.data.length; i++){

			const x = margin + (i % 3) * dx
			const y = margin + Math.floor(i / 3) * dx

			if ((i % 3) < 2 && Math.floor(i / 3) < 2){
				this.ctx.fillText(this.civilize(m.data[i]), x, y)
			}

		}
		this.ctx.font = font * .8 + `px Verdana`
		this.ctx.fillText(label, w/2, -font)

		this.ctx.restore()


	}

	drawMatrix(m, tx, ty, w, label){

		const serif = w * .04
		const font = w * .1

		this.ctx.save()
		this.ctx.translate(tx, ty)
		this.ctx.lineWidth = w * .01
		this.ctx.font = font + `px Verdana`

		this.ctx.strokeStyle = this.ctx.fillStyle = this.color.matrix
		this.ctx.beginPath()
		this.ctx.moveTo(serif, 0)
		this.ctx.lineTo(0,0)
		this.ctx.lineTo(0,w)
		this.ctx.lineTo(serif,w)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.moveTo(w - serif, 0)
		this.ctx.lineTo(w,0)
		this.ctx.lineTo(w,w)
		this.ctx.lineTo(w - serif,w)
		this.ctx.stroke()

		const margin = w / 6
		const dx = (w - margin * 2) / 2

		for (let i = 0; i < m.data.length; i++){

			const x = margin + (i % 3) * dx
			const y = margin + Math.floor(i / 3) * dx
			this.ctx.fillText(this.civilize(m.data[i]), x, y)

		}

		this.ctx.fillText(label, w/2, -font)

		this.ctx.restore()


	}

	drawAxes(){

		const range = 10
		const delta = .5

		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.lineWidth = .01
		this.ctx.strokeStyle = this.color.axes

		for (let x = -range; x <= range; x += delta){

			const v1 = new Vector(x, range).mult(this.V).mult(this.E).mult(this.U)
			const v2 = new Vector(x, -range).mult(this.V).mult(this.E).mult(this.U)

			this.ctx.beginPath()
			this.ctx.moveTo(v1.x, v1.y)
			this.ctx.lineTo(v2.x, v2.y)
			this.ctx.stroke()

		}

		for (let y = -range; y <= range; y += delta){

			const v1 = new Vector(-range, y).mult(this.V).mult(this.E).mult(this.U)
			const v2 = new Vector(range, y).mult(this.V).mult(this.E).mult(this.U)

			this.ctx.beginPath()
			this.ctx.moveTo(v1.x, v1.y)
			this.ctx.lineTo(v2.x, v2.y)
			this.ctx.stroke()

		}

		this.ctx.restore()

	}

	reset(){

		for (let i = 0; i < this.shape.length; i++){
			this.shape[i].transformed = this.shape[i].original.clone()
		}

		this.base = {
			x: new Vector(1,0),
			y: new Vector(0,-1),
			o: new Vector()
		}
		this.sigma = {
			x: new Vector(1,0),
			y: new Vector(0,-1),
			o: new Vector()
		}

		this.V = new Mat3()
		this.V.setRotation(0,0,-this.values[0])
		this.E = new Mat3([1 + this.values[1] * .5,0,0,0, 1 - (this.values[1] * .5),0,0,0,1])
		this.U = new Mat3()
		this.U.setRotation(0,0,this.values[2])
	}

	transformShape(m){

		for (let i = 0; i < this.shape.length; i++){
			this.shape[i].transformed.mult(m)
		}

	}

	transformVectors(){
		this.base.x.mult(this.V).mult(this.E).mult(this.U)
		this.base.y.mult(this.V).mult(this.E).mult(this.U)
		this.base.o.mult(this.V).mult(this.E).mult(this.U)

		this.sigma.x.mult(this.E).mult(this.U)
		this.sigma.y.mult(this.E).mult(this.U)
		this.sigma.o.mult(this.E).mult(this.U)
	}

	getShapePoints(){

		const precision = 100
		const radius = 1
		const shape = []

		for (let i = -Math.PI; i < Math.PI; i += Math.PI * 2 / precision){

			const v = new Vector(Math.cos(i), Math.sin(i))

			shape.push({
				original: v,
				transformed: v
			})

		}
		return shape

	}

	drawShape(s){

		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		const textVector1 = this.sigma.x.sum(this.sigma.x.clone().normalize().mult(.2))
		const textVector2 = this.sigma.y.sum(this.sigma.y.clone().normalize().mult(.2))
		this.ctx.fillText(`σ₁`, textVector1.x * this.scale, textVector1.y * this.scale)
		this.ctx.fillText(`σ₂`, textVector2.x * this.scale, textVector2.y * this.scale)
		this.ctx.restore()

		//Sigma vectors
		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)

		this.ctx.beginPath()
		this.ctx.moveTo(this.sigma.x.x, this.sigma.x.y)
		this.ctx.lineTo(this.sigma.o.x, this.sigma.o.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.sigma
		this.ctx.stroke()

		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.beginPath()
		this.ctx.moveTo(this.sigma.o.x, this.sigma.o.y)
		this.ctx.lineTo(this.sigma.y.x, this.sigma.y.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.sigma
		this.ctx.stroke()


		//Base vectors
		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.beginPath()
		this.ctx.moveTo(this.base.x.x, this.base.x.y)
		this.ctx.lineTo(this.base.o.x, this.base.o.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.x
		this.ctx.stroke()

		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)
		this.ctx.beginPath()
		this.ctx.moveTo(this.base.o.x, this.base.o.y)
		this.ctx.lineTo(this.base.y.x, this.base.y.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.y
		this.ctx.stroke()

		//Shape
		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.scale, this.scale)

		this.ctx.beginPath()
		this.ctx.moveTo(s[0].transformed.x, s[0].transformed.y)

		for (let i = 1; i < s.length; i++){

			this.ctx.lineTo(s[i].transformed.x, s[i].transformed.y)

		}

		this.ctx.closePath()
		this.ctx.restore()

		this.ctx.strokeStyle = this.color.shape
		this.ctx.stroke()
		
	}

	civilize(n){
		return Math.floor(n * 100) / 100
	}

	update(){

		this.ctx.clearRect(0, 0, this.w, this.h)
		this.drawAxes()

		this.transformVectors()

		this.transformShape(this.V)
		this.transformShape(this.E)
		this.transformShape(this.U)

		this.drawAxes()
		this.drawShape(this.shape)

		this.drawMatrices()
		
	}

}
