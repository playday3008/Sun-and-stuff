let core;
window.onload = ()=>{

	let d = new Range({ width: 400, value: 1, class: `input`, min: .5, max: 1.5, scale: 4, label: `t<sub>1</sub> – t<sub>2</sub>`, labelWidth: 50})
	// let s = new Range({ width: 400, value: 1, class: `input`, min: .5, max: 1.5, scale: 4, label: `t<sub>2</sub>`, labelWidth: 50})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(d)
	// document.body.appendChild(s)

	d.data.onchange = v=>{
		core.doubleScale = v
		core.singleScale = 2 - v
		core.update()
	}
	// s.data.onchange = v=>{
	// 	core.singleScale = v
	// 	core.update()
	// }
}

class Core {

	constructor(canvas) {

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		//VISUALS
		this.unit = this.ratio * 50
		this.radius = this.ratio * 12
		this.hRadius = this.ratio * 8
		this.angle = .5
		this.gap = this.ratio * 3
		this.hUnit = this.unit * .7
		this.lineUnit = this.ratio * 3

		this.carbon = this.ctx.createRadialGradient(-this.radius * .3, -this.radius * .3, this.ratio, -this.radius * .3, -this.radius * .3, this.radius * 1.2)
		this.carbon.addColorStop(0, `#fff`)
		this.carbon.addColorStop(.1, `#679`)
		this.carbon.addColorStop(.9, `#334`)
		this.carbon.addColorStop(1, `#568`)

		this.hydrogen = this.ctx.createRadialGradient(-this.hRadius * .3, -this.hRadius * .3, this.ratio, -this.hRadius * .3, -this.hRadius * .3, this.hRadius * 1.2)
		this.hydrogen.addColorStop(0, `#fff`)
		this.hydrogen.addColorStop(.1, `#F26`)
		this.hydrogen.addColorStop(.9, `#829`)
		this.hydrogen.addColorStop(1, `#814`)

		//DATA
		this.doubleScale = 1
		this.singleScale = 1

		//GENERATED

		this.ctx.font = this.ratio * 18 + `px Arial`;
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.strokeStyle = `#345`

		this.update()
		this.run()

	}

	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this))
		this.draw()

	}

	update(){

		this.deltas = {
			dx: this.unit * this.doubleScale * Math.cos(this.angle),
			dy: this.unit * this.doubleScale * Math.sin(this.angle),
			sx: this.unit * this.singleScale * Math.cos(this.angle),
			sy: this.unit * this.singleScale * Math.sin(this.angle)
		}

		this.step = this.deltas.dx + this.deltas.sx

	}

	draw(){

		this.ctx.fillStyle = '#FAFAFC'
		this.ctx.fillRect(0, 0, this.w, this.h)

		this.ctx.save()
		this.ctx.translate(0, this.h/2)
		for (let i = 0; i < this.w; i+= this.step){

			//Doublebond
			this.ctx.lineWidth = this.lineUnit / (this.doubleScale**2)
			this.ctx.beginPath()
			this.ctx.moveTo(0,0)
			this.ctx.lineTo(this.deltas.dx, -this.deltas.dy)
			this.ctx.stroke()

			//Singlebond
			this.ctx.lineWidth = this.lineUnit / (this.singleScale**2)
			this.ctx.beginPath()
			this.ctx.moveTo(this.deltas.dx, -this.deltas.dy)
			this.ctx.lineTo(this.step, this.deltas.sy - this.deltas.dy)
			this.ctx.stroke()

			this.ctx.lineWidth = this.lineUnit
			//Hbond1
			this.ctx.beginPath()
			this.ctx.moveTo(0, 0)
			this.ctx.lineTo(0, this.hUnit)
			this.ctx.stroke()

			//Hbond2
			this.ctx.beginPath()
			this.ctx.moveTo(this.deltas.dx, -this.deltas.dy)
			this.ctx.lineTo(this.deltas.dx, -this.deltas.dy - this.hUnit)
			this.ctx.stroke()

			this.ctx.fillStyle = this.carbon

			//C1
			this.ctx.beginPath()
			this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

			//C2
			this.ctx.save()
			this.ctx.translate(this.deltas.dx, -this.deltas.dy)
			this.ctx.beginPath()
			this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
			this.ctx.restore()

			this.ctx.fillStyle = this.hydrogen

			//H1
			this.ctx.save()
			this.ctx.translate(0, this.hUnit)
			this.ctx.beginPath()
			this.ctx.arc(0,0, this.hRadius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
			this.ctx.restore()

			//H2
			this.ctx.save()
			this.ctx.translate(this.deltas.dx, -this.deltas.dy - this.hUnit)
			this.ctx.beginPath()
			this.ctx.arc(0,0, this.hRadius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
			this.ctx.restore()

			this.ctx.translate(this.step, this.deltas.sy - this.deltas.dy)

		}
		this.ctx.restore()

	}

}