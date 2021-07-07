let core

window.onload = _=>{

	// const f = new Range({width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 4, step: .001, label: `F`, labelWidth: 200})

	// const vmat = new Range({width: 500, value: 0, class: `input`, min: 0, max: Math.PI * 2, scale: 4, step: .01, label: `Vᵀ rotation`, labelWidth: 200, formula: a=>a/Math.PI+`π`})
	// const emat = new Range({width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 4, step: .01, label: `Σ squishing`, labelWidth: 200})
	// const umat = new Range({width: 500, value: 0, class: `input`, min: 0, max: Math.PI * 2, scale: 4, step: .01, label: `U counter-rotation`, labelWidth: 200, formula: a=>`-${a/Math.PI}π`})
	// const l1 = new Range({width: 500, value: 0, class: `input`, min: 0, max: .01, scale: .5, step: .0001, label: `L1 rate`, labelWidth: 200})
	// const l2 = new Range({width: 500, value: 0, class: `input`, min: 0, max: 5, scale: .5, step: .001, label: `L2 rate`, labelWidth: 200})

	// const newData = new Button({class: `button`, n: `New dataset`})
	// const init = new Button({class: `button`, n: `Reinitialize`})
	// newData.style.backgroundColor = init.style.backgroundColor = `#FFF`
	// newData.style.boxShadow = init.style.boxShadow = `0 0 0 2px #000 inset`
	// newData.style.color = init.style.color = `#000`

	// document.body.appendChild(f)
	// document.body.appendChild(vmat)
	// document.body.appendChild(emat)
	// document.body.appendChild(umat)
	// document.body.appendChild(l1)
	// document.body.appendChild(l2)

	// document.body.appendChild(document.createElement('br'))

	// document.body.appendChild(newData)

	core = new Core(document.querySelector(`.canvas`))

	// f.data.onchange = v=>{
	// 	// core.values[0] = v
	// 	// core.reset()
	// 	// core.update()

	// 	core.f = v

	// 	if (v < .25){
	// 		core.values[0] = 1.3 * v * 4
	// 		core.values[1] = 0
	// 		core.values[2] = 0
	// 	} else if (v < .5) {
	// 		core.values[0] = 1.3
	// 		core.values[1] = (v - .25) * 4
	// 		core.values[2] = 0
	// 	} else if (v < .75) {
	// 		core.values[0] = 1.3
	// 		core.values[1] = 1
	// 		core.values[2] = 1 * (v - .5) * 4
	// 	}


	// 	core.reset()
	// 	core.update()


	// }
	// vmat.data.onchange = v=>{
	// 	core.values[0] = v
	// 	core.reset()
	// 	core.update()
	// }
	// emat.data.onchange = v=>{
	// 	core.values[1] = v
	// 	core.reset()
	// 	core.update()
	// }
	// umat.data.onchange = v=>{
	// 	core.values[2] = v
	// 	core.reset()
	// 	core.update()
	// }

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)

		this.fontSize = 24 * this.ratio
		this.ctx.font = this.fontSize + `px Verdana`
		this.ctx.textAlign = `center`
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

		this.F = 0
		this.f = 0
		this.center = {x: this.w / 2, y: this.h / 2}
		this.values = [0, 0, 0]

		this.shape = this.getShapePoints()
		this.initSystems()

		// this.reset()
		// this.update()

		this.cycle()
		

	}

	cycle(){

		requestAnimationFrame(_=>{this.cycle()})

		this.F += .0016
		this.F %= 1

		const f = Math.min(this.F * 1.25, 1)
		const f0 = Math.floor(f / .25)
		let ff = (f - f0 * .25) * 4
		ff = ff < 0.5 ? 4 * ff ** 3 : 1 - (-2 * ff + 2) ** 3 / 2

		this.f = f0 * .25 + ff * .25

		if (this.f < .25){
			this.values[0] = 1.3 * this.f * 4
			this.values[1] = 0
			this.values[2] = 0
		} else if (this.f < .5) {
			this.values[0] = 1.3
			this.values[1] = (this.f - .25) * 4
			this.values[2] = 0
		} else if (this.f < .75) {
			this.values[0] = 1.3
			this.values[1] = 1
			this.values[2] = 1 * (this.f - .5) * 4
		}

		this.reset()
		this.update()
	}

	drawSystems(){

		this.ctx.globalAlpha = 1
		const margin = this.w * .05
		const dw = (this.w - margin * 2) / 4
		const textHeight = this.center.y - dw * .6
		const lastPull = this.f > .75 ? (this.f - .75) * 4 : 0
		const lastDy = lastPull * dw * .2

		this.ctx.save()
		this.ctx.font = this.fontSize * 1.4 + `px Verdana`
		this.ctx.fillText(`X = U ⋅ Σ ⋅ Vᵀ`, this.w * .45, this.h * .9)
		this.ctx.restore()

		this.drawShape(this.system1, margin + 0, this.center.y - dw / 2, 		dw * .6, true)

		if (this.f > .75) this.ctx.globalAlpha = 1 - (this.f - .75) * 4
		if (this.f < .25) this.ctx.globalAlpha = this.f * 4
		this.ctx.fillText(`⋅ Vᵀ =`, margin + dw * .75 + lastPull * dw * .5, textHeight + lastDy)
		this.drawShape(this.system2, margin + dw, this.center.y - dw / 2, 		dw * .6, true)

		if (this.f < .5) this.ctx.globalAlpha = (this.f - .25) * 4
		if (this.f > .25) {
			this.drawShape(this.system3, margin + dw * 2, this.center.y - dw / 2, 	dw * .6)
			this.ctx.fillText(`⋅ Σ =`, margin + dw * 1.75, textHeight + lastDy)
		}

		if (this.f < .75) this.ctx.globalAlpha = (this.f - .5) * 4; else this.ctx.globalAlpha = 1
		if (this.f > .5) {
			this.drawShape(this.system4, margin + dw * 3, this.center.y - dw / 2, 	dw * .6)
			if (this.f > .75) this.ctx.globalAlpha = 1 - (this.f - .75) * 4
			this.ctx.fillText(`⋅ U =`, margin + dw * 2.75 - lastPull * dw * .5, textHeight + lastDy)
		}

		if (this.f > .75) this.ctx.globalAlpha = (this.f - .75) * 4; else this.ctx.globalAlpha = 0
		this.ctx.fillText(`⋅ X =`, margin + dw * 1.75, this.center.y - dw * .2)

	}

	initSystems(){

		this.system1 = {
			shape: this.getShapePoints(),
			base: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			},
			sigma: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			}
		}

		this.system2 = {
			shape: this.getShapePoints(),
			base: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			},
			sigma: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			}
		}

		this.system3 = {
			shape: this.getShapePoints(),
			base: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			},
			sigma: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			}
		}

		this.system4 = {
			shape: this.getShapePoints(),
			base: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			},
			sigma: {
				x: new Vector(1,0),
				y: new Vector(0,-1),
				o: new Vector()
			}
		}

	}

	reset(){


		for (let i = 0; i < this.system1.shape.length; i++){
			this.system1.shape[i].transformed = this.system1.shape[i].original.clone()
			this.system2.shape[i].transformed = this.system2.shape[i].original.clone()
			this.system3.shape[i].transformed = this.system3.shape[i].original.clone()
			this.system4.shape[i].transformed = this.system4.shape[i].original.clone()
		}

		this.system1.base = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system2.base = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system3.base = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system4.base = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}

		this.system1.sigma = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system2.sigma = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system3.sigma = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}
		this.system4.sigma = {x: new Vector(1,0), y: new Vector(0,-1), o: new Vector()}

		this.V = new Mat3()
		this.V.setRotation(0,0,-this.values[0])
		this.E = new Mat3([1 + this.values[1] * .5,0,0,0, 1 - (this.values[1] * .5),0,0,0,1])
		this.U = new Mat3()
		this.U.setRotation(0,0,this.values[2])

	}

	transformShapes(){

		for (let i = 0; i < this.system1.shape.length; i++){
			this.system4.shape[i].transformed.mult(this.V).mult(this.E).mult(this.U)
			this.system3.shape[i].transformed.mult(this.V).mult(this.E)
			this.system2.shape[i].transformed.mult(this.V)
		}

	}

	transformVectors(){

		this.system4.base.x.mult(this.V).mult(this.E).mult(this.U)
		this.system4.base.y.mult(this.V).mult(this.E).mult(this.U)
		this.system4.base.o.mult(this.V).mult(this.E).mult(this.U)

		this.system4.sigma.x.mult(this.E).mult(this.U)
		this.system4.sigma.y.mult(this.E).mult(this.U)
		this.system4.sigma.o.mult(this.E).mult(this.U)


		this.system3.base.x.mult(this.V).mult(this.E)
		this.system3.base.y.mult(this.V).mult(this.E)
		this.system3.base.o.mult(this.V).mult(this.E)

		this.system3.sigma.x.mult(this.E)
		this.system3.sigma.y.mult(this.E)
		this.system3.sigma.o.mult(this.E)


		this.system2.base.x.mult(this.V)
		this.system2.base.y.mult(this.V)
		this.system2.base.o.mult(this.V)


	}

	getShapePoints(){

		const precision = 48
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

	drawShape(system,tx,ty,w,nosigma){

		const center = {x: tx + w / 2, y: ty + w / 2}
		const scale = w / 2
		const s = system.shape

		if (!nosigma){
			this.ctx.save()
			this.ctx.translate(center.x, center.y)
			this.ctx.textAlign = `center`
			this.ctx.textBaseline = `middle`
			this.ctx.font = this.fontSize * .6 + `px Verdana`
			const textVector1 = system.sigma.x.sum(system.sigma.x.clone().normalize().mult(.3))
			const textVector2 = system.sigma.y.sum(system.sigma.y.clone().normalize().mult(.3))
			this.ctx.fillText(`σ₁`, textVector1.x * scale, textVector1.y * scale)
			this.ctx.fillText(`σ₂`, textVector2.x * scale, textVector2.y * scale)
			this.ctx.restore()

		//Sigma vectors

			this.ctx.save()
			this.ctx.translate(center.x, center.y)
			this.ctx.scale(scale, scale)

			this.ctx.beginPath()
			this.ctx.moveTo(system.sigma.x.x, system.sigma.x.y)
			this.ctx.lineTo(system.sigma.o.x, system.sigma.o.y)
			this.ctx.restore()
			this.ctx.strokeStyle = this.color.sigma
			this.ctx.stroke()

			this.ctx.save()
			this.ctx.translate(center.x, center.y)
			this.ctx.scale(scale, scale)
			this.ctx.beginPath()
			this.ctx.moveTo(system.sigma.o.x, system.sigma.o.y)
			this.ctx.lineTo(system.sigma.y.x, system.sigma.y.y)
			this.ctx.restore()
			this.ctx.strokeStyle = this.color.sigma
			this.ctx.stroke()
		}

		//Base vectors
		this.ctx.save()
		this.ctx.translate(center.x, center.y)
		this.ctx.scale(scale, scale)
		this.ctx.beginPath()
		this.ctx.moveTo(system.base.x.x, system.base.x.y)
		this.ctx.lineTo(system.base.o.x, system.base.o.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.x
		this.ctx.stroke()

		this.ctx.save()
		this.ctx.translate(center.x, center.y)
		this.ctx.scale(scale, scale)
		this.ctx.beginPath()
		this.ctx.moveTo(system.base.o.x, system.base.o.y)
		this.ctx.lineTo(system.base.y.x, system.base.y.y)
		this.ctx.restore()
		this.ctx.strokeStyle = this.color.y
		this.ctx.stroke()

		//Shape
		this.ctx.save()
		this.ctx.translate(center.x, center.y)
		this.ctx.scale(scale, scale)

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
		// this.ctx.fillStyle = `#FF0`
		// this.ctx.fillRect(0, 0, this.w, this.h)

		this.transformVectors()
		this.transformShapes()

		this.drawSystems()
		
	}

}
