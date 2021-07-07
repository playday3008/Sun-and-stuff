let core;
window.onload = ()=>{

	let c = new Range({ width: 400, value: .6, class: `input`, min: .2, max: 2, scale: 6, step: .1, label: `Phase speed slowdown`, labelWidth: 200})
	let r = new Button({class: `button`, n: `Restart`})
	// let m = new Button({class: `button`, n: `Hermiocentric`})
	// let v = new Button({class: `button`, n: `Cythecentric`})
	// let e = new Button({class: `button`, n: `Geocentric`})
	// let ma = new Button({class: `button`, n: `Areiocentric`})
	// let j = new Button({class: `button`, n: `Jovicentric`})
	// let s = new Button({class: `button`, n: `Chronocentric`})
	// let u = new Button({class: `button`, n: `Uranocentric`})
	// let n = new Button({class: `button`, n: `Poseidocentric`})
	// let p = new Button({class: `button`, n: `Plutocentric`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(c)
	document.body.appendChild(r)
	// document.body.appendChild(m)
	// document.body.appendChild(v)
	// document.body.appendChild(e)
	// document.body.appendChild(ma)
	// document.body.appendChild(document.createElement(`br`))
	// document.body.appendChild(j)
	// document.body.appendChild(s)
	// document.body.appendChild(u)
	// document.body.appendChild(n)
	// document.body.appendChild(p)
	

	c.data.onchange = v=>{
		core.glassC = v
		core.reset()
	}
	r.data.onchange = v=>{
		core.reset()
	}
	// m.data.onchange = v=>{
	// 	core.setCenter(`mer`)
	// 	core.scale = 5e-7 * core.ratio
	// }
	// v.data.onchange = v=>{
	// 	core.setCenter(`ven`)
	// 	core.scale = 5e-7 * core.ratio
	// }
	// e.data.onchange = v=>{
	// 	core.setCenter(`ear`)
	// 	core.scale = 5e-7 * core.ratio
	// }
	// ma.data.onchange = v=>{
	// 	core.setCenter(`mar`)
	// 	core.scale = 5e-7 * core.ratio
	// }
	// j.data.onchange = v=>{
	// 	core.setCenter(`jup`)
	// 	core.scale = 2.5e-7 * core.ratio
	// }
	// s.data.onchange = v=>{
	// 	core.setCenter(`sat`)
	// 	core.scale = 1.5e-7 * core.ratio
	// }
	// u.data.onchange = v=>{
	// 	core.setCenter(`ura`)
	// 	core.scale = 5e-8 * core.ratio
	// }
	// n.data.onchange = v=>{
	// 	core.setCenter(`nep`)
	// 	core.scale = 5e-8 * core.ratio
	// }
	// p.data.onchange = v=>{
	// 	core.setCenter(`plu`)
	// 	core.scale = 3e-8 * core.ratio
	// }
}

class Core {

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)

		this.vCanvas = document.createElement(`canvas`)
		this.vCanvas.width = this.w
		this.vCanvas.height = this.h
		this.vctx = this.vCanvas.getContext(`2d`)

		//Data
		this.glassTop = this.h/2
		this.glassBottom = this.h - this.h/4
		this.glassC = 0.6
		this.angle = 1
		this.spread = Math.PI / 2
		this.raysPerCast = 20
		this.speed = this.ratio
		this.source = {x: 100 * this.ratio, y: 100 * this.ratio}
		this.destination = {x: this.w / 1.2, y: this.h - this.ratio * 50}
		this.slack = 10 * this.ratio

		// this.fill = this.ctx.createRadialGradient(0, 0, this.ratio, 0, 0, this.w)
		// this.fill.addColorStop(0, `#f00`)
		// this.fill.addColorStop(1, `#00f`)

		// this.rays = []
		// this.finish = false
		// this.castRays({x: this.source.x, y: this.source.y}, this.angle, this.spread, this.speed, `top`, [{x: 100 * this.ratio, y: 100 * this.ratio}])

		this.vctx.lineWidth = this.ratio
		this.ctx.fillStyle = '#112'
		this.ctx.font = 14 * this.ratio + `px Georgia`
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.reset()

		this.run()

	}

	reset(){
		this.rays = []
		this.finish = false
		this.vctx.clearRect(0, 0, this.w, this.h)
		this.castRays({x: this.source.x, y: this.source.y}, this.angle, this.spread, this.speed, `top`, [{x: 100 * this.ratio, y: 100 * this.ratio}])
	}

	run() {

		requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	castRays(o, a, spr, spd, type, nodes){



		for (let i = 0; i < this.raysPerCast; i++){

			let ra = a + i / this.raysPerCast * spr - spr / 2
			let ray = {x: o.x, y: o.y, lx: o.x, ly: o.y, a: ra, dx: Math.cos(ra) * spd, dy: Math.sin(ra) * spd, type: type, nodes: nodes}
			this.rays.push(ray)

		}



	}

	update(){

		let raysToCast = []
		let finish = false

		for (let i = 0; i < this.rays.length; i++){

			this.rays[i].lx = this.rays[i].x
			this.rays[i].ly = this.rays[i].y
			this.rays[i].x += this.rays[i].dx
			this.rays[i].y += this.rays[i].dy

			if (this.rays[i].type === `top` && this.rays[i].y > this.glassTop){

				// console.log(this.rays[i].nodes.length)
				let ray = {x: this.rays[i].x, y: this.rays[i].y, a: this.rays[i].a, type: `middle`, nodes: [{x: this.rays[i].nodes[0].x, y: this.rays[i].nodes[0].y}]}
				ray.nodes.push({x: this.rays[i].x, y: this.rays[i].y})
				raysToCast.push(ray)
				this.rays.splice(i,1)
				i--

			} else if (this.rays[i].type === `middle` && this.rays[i].y > this.glassBottom){

				let ray = {x: this.rays[i].x, y: this.rays[i].y, a: this.rays[i].a, type: `bottom`, nodes: [{x: this.rays[i].nodes[0].x, y: this.rays[i].nodes[0].y}, {x: this.rays[i].nodes[1].x, y: this.rays[i].nodes[1].y}]}
				ray.nodes.push({x: this.rays[i].x, y: this.rays[i].y})
				raysToCast.push(ray)
				this.rays.splice(i,1)
				i--

			} else if (this.rays[i].type === `bottom` && Math.abs(this.rays[i].y - this.destination.y) < this.slack && Math.abs(this.rays[i].x - this.destination.x) < this.slack){

				let line = this.rays[i].nodes
				line.push({x: this.destination.x, y: this.destination.y})
				finish = line
				break;

			} else if (this.rays[i].x > this.w || this.rays[i].x < 0 || this.rays[i].y > this.h || this.rays[i].y < 0){
				this.rays.splice(i,1)
				i--
			}

		}

		for (let i = 0; i < raysToCast.length; i++){
			
			this.castRays({x: raysToCast[i].x, y: raysToCast[i].y}, raysToCast[i].a, this.spread, this.speed * (raysToCast[i].type === `middle` ? this.glassC : 1), raysToCast[i].type, raysToCast[i].nodes)

		}

		if (finish){

			this.rays = []
			this.finish = finish
			this.vctx.fillStyle = `#112A`
			this.vctx.fillRect(0, 0, this.w, this.h)

		}

	}

	draw(){

		this.ctx.save()
		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.drawRays()
		this.drawGlass()

		this.ctx.fillStyle = `#48FF7B`
		this.ctx.beginPath()
		this.ctx.arc(this.destination.x, this.destination.y, this.ratio * 6, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		this.ctx.beginPath()
		this.ctx.arc(this.source.x, this.source.y, this.ratio * 6, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()

		//Labels
		this.ctx.fillText(`Light source`, this.source.x, this.source.y - this.ratio * 16)
		this.ctx.fillText(`Observer`, this.destination.x, this.destination.y - this.ratio * 16)
		this.ctx.fillStyle = `#fff6`
		this.ctx.fillText(`${this.glassC} x`, this.ratio * 10, this.glassBottom - this.ratio * 16)
		this.ctx.fillText(`1 x`, this.ratio * 10, this.glassBottom + this.ratio * 24)

		this.ctx.restore()

	}

	drawRays(){

		if (!this.finish){

			this.vctx.strokeStyle = `#ff8539`
			// let f = Math.sin(performance.now() / 300) * .5 + .5
			// this.vctx.strokeStyle = `rgb(${150 + Math.floor(155 * f)}, 96, ${100 - Math.floor(f * 100)})`

			for (let i = 0; i < this.rays.length; i++){

				this.vctx.beginPath()
				this.vctx.moveTo(this.rays[i].lx, this.rays[i].ly)
				this.vctx.lineTo(this.rays[i].x, this.rays[i].y)
				this.vctx.stroke()

			}
		} else {

			this.vctx.strokeStyle = `#48FF7B`
			this.vctx.lineWidth = this.ratio * 2

			this.vctx.beginPath()
			this.vctx.moveTo(this.finish[0].x, this.finish[0].y)
			this.vctx.lineTo(this.finish[1].x, this.finish[1].y)
			this.vctx.lineTo(this.finish[2].x, this.finish[2].y)
			this.vctx.lineTo(this.finish[3].x, this.finish[3].y)
			this.vctx.stroke()

		}

		this.ctx.drawImage(this.vCanvas,0,0)

	}

	drawGlass(){

		this.ctx.fillStyle = `#fff2`
		this.ctx.fillRect(0, this.glassTop, this.w, this.glassBottom - this.glassTop)

	}

}