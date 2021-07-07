let core;
window.onload = ()=>{
	core = new CanvasHandler(document.querySelector('.canvas'));
	document.body.appendChild(new Range({
		width: 500,
		value: 1,
		class: `input`,
		min: 1,
		max: 2e2,
		scale: 5,
		finalMark: `to&nbsp;infinity`,
		log: 3,
		label: `Magnetic field`,
		labelWidth: 160,
		onchange: (v)=>{core.setValue(`b`,v)}
	}));
	document.body.appendChild(new Range({
		width: 500,
		value: 0,
		class: `input`,
		min: 0,
		max: 1,
		scale: 5,
		label: `Electric field`,
		labelWidth: 160,
		onchange: (v)=>{core.setValue(`e`,v)}
	}));


	document.body.appendChild(new Toggle({
		n1: `Enable edges`,
		n2: `Remove edges`,
		class: `go`,
		class2: `going`,
		onchange: ()=>{core.edges = !core.edges}
	}))

	document.body.appendChild(new Toggle({
		n1: `Enable field blocking`,
		n2: `Disable field blocking`,
		class: `go`,
		class2: `going`,
		onchange: ()=>{core.penetration = !core.penetration}
	}))
}

class CanvasHandler {

	constructor(canvas){

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');
		this.time = {
			tt: 0,
			dt: 0,
			lt: 0,
			scale: 1,
			frameId : false
		};

		//MODEL

		this.density = 5
		this.resolution = 48
		this.size = this.ratio * 36
		this.thickness = this.ratio * 20
		this.phaseSpeed = .1
		this.driftSpeed = 2
		this.spread = 5 * this.ratio
		this.edgeSpeed = 2 * this.ratio

		this.e = 0
		this.b = 1
		this.stepX = this.w / this.density
		this.stepY = this.h / this.density
		this.phase = 0
		this.radius
		this.electrons = []
		this.edges = false
		this.penetration = true
		this.landau = true

		this.spawn()

		//END

		this.vcanvas = document.createElement('canvas')
		this.vcanvas.width = this.w1 = this.size * 4
		this.vcanvas.height = this.h1 = this.size * 2
		this.vctx = this.vcanvas.getContext('2d');

		this.vcanvas2 = document.createElement('canvas')
		this.vcanvas2.width = this.w2 = this.size * 4
		this.vcanvas2.height = this.h2 = this.size * 2 + this.thickness * 2
		this.vctx2 = this.vcanvas2.getContext('2d');

		this.vcanvas3 = document.createElement('canvas')
		this.vcanvas3.width = this.w3 = this.w / 3
		this.vcanvas3.height = this.h3 = this.h / 3
		this.vctx3 = this.vcanvas3.getContext('2d')

		this.blur = this.ctx.createRadialGradient(0,0,0,0,0,this.thickness);
		this.blur.addColorStop(0,`rgba(251,251,190,1)`);
		this.blur.addColorStop(0.2,`rgba(253,158,108,.6)`);
		this.blur.addColorStop(0.4,`rgba(221,73,104,.2)`);
		this.blur.addColorStop(0.6,`rgba(140,40,129,.1)`);
		this.blur.addColorStop(0.8,`rgba(58,15,110,.1)`);
		this.blur.addColorStop(1,`rgba(0,0,0,0)`);

		this.ctx.font = this.ratio * 20 + 'px Times';

		this.cycle();
	}

	setValue(i,v){
		if (i === `b`){
			this.b = v;
		} else if (i === `e`){
			this.e = v;
		}
	}

	cycle() {

		this.time.frameId = requestAnimationFrame(this.cycle.bind(this));
		let now = window.performance.now();
		this.time.dt = Math.min(now - this.time.lt, 1000) * this.time.scale / 15;
		this.time.tt += this.time.dt;
		this.time.lt = now;
		
		this.frame(this.time.dt / 10);

	}

	spawn() {
		for (let y = 0; y <= this.density; y++){
			for (let x = 0; x < this.density + 2; x++){

				this.electrons.push({
					x: this.stepX * (x - 1),
					y: this.stepY * y,
					phase: 0,
					type: y === 0 ? `edgeU` : y === this.density ? `edgeD` : `free` 
				})

			}
		}
	}

	frame(delta) {

		//DATA
		this.radius = this.size / (this.b ** .5)
		let dp = this.phaseSpeed * this.b
		this.phase -= dp

		//GRAPHICS
		// this.ctx.globalCompositeOperation = `normal`
		this.ctx.fillStyle = `#112`
		this.ctx.fillRect(0, 0, this.w, this.h)
		// this.ctx.globalCompositeOperation = `screen`

		if (this.edges) this.renderEdgeElectron(this.electrons[0].x) // DIRTY HACK I KNOW
		this.renderFreeElectron(this.e)

		let lasty = -1
		for (let i = 0; i < this.electrons.length; i++){

			let e = this.electrons[i]
			let emult = this.penetration ? 1 : (Math.abs(e.y - this.h / 2) / this.h * 2)**2

			if (e.type === `free` || !this.edges){
				if (!this.penetration && lasty !== e.y) {
					this.renderFreeElectron(this.e * emult)
					lasty = e.y
				}
				e.phase -= dp
				e.x -= this.ratio * this.e / this.b * emult * this.driftSpeed
				if (e.x < -this.stepX) e.x += (this.w + this.stepX * 2)

				this.ctx.save()
				this.ctx.translate(-this.w2/2, -this.h2/2)
				this.ctx.drawImage(this.vcanvas2, e.x, e.y)
				this.ctx.restore()

			} else {

				e.x += this.edgeSpeed * (this.b + 9) / 10
				if (e.x < -this.stepX) {
					e.x += (this.w + this.stepX * 2)
				} else if (e.x > this.w + this.stepX) {
					e.x -= (this.w + this.stepX * 2)
				}

				if (e.type === `edgeU`){
					this.ctx.drawImage(this.vcanvas, e.x, e.y)
				} else {
					this.ctx.save()
					this.ctx.translate(this.w, this.h)
					this.ctx.scale(-1, -1)
					this.ctx.drawImage(this.vcanvas, e.x, this.h - e.y)
					this.ctx.restore()
				}
			}
		}

		if (this.landau) this.drawLandau()

	}

	drawLandau(){

		let c = this.vctx3
		let w = this.w3
		let h = this.h3
		let d = 5 * this.ratio

		c.fillStyle = `#FFF`
		c.strokeStyle = `#f00`
		c.lineWidth = this.ratio * 2
		c.fillRect(0,0,w,h)

		c.beginPath()

		let em = d * this.e * 6
		let fh = h - d

		let p1 = [d, this.edges ? d : fh - em]
		let p12 = [d*2, fh - em]
		let p21 = [d*2, fh - (this.penetration ? em : em / 2)]
		let p2 = [w/2, fh - em / 2]
		let p22 = [w - d*2, this.penetration ? fh : fh - em / 2]
		let p31 = [w - d*2, this.edges && !this.penetration ? h * 1.2 : fh]
		let p3 = [w - d, this.edges ? d : fh]

		c.moveTo(p1[0], p1[1])
		c.bezierCurveTo(p12[0], p12[1], p21[0], p21[1], p2[0], p2[1])
		c.bezierCurveTo(p22[0], p22[1], p31[0], p31[1], p3[0], p3[1])

		c.stroke()



		// this.ctx.globalCompositeOperation = `normal`
		this.ctx.drawImage(this.vcanvas3, this.w - w - d, this.h - h - d)

	}

	renderEdgeElectron(x){

		// this.vctx.fillStyle = `#00f`
		this.vctx.clearRect(0, 0, this.w1, this.h1)

		
			this.vctx.fillStyle = this.blur//`#006`
			for (let p = -this.radius * 2; p < this.radius * 2; p += this.radius * 4 / this.resolution){

				let px = p + this.radius * 2
				let py = Math.abs(Math.sin((x + p) / this.radius * 4 / Math.PI)) * this.radius
				let s = (1 - Math.abs(p / this.radius / 2)) / (this.b + 29) * 30

				this.vctx.save()
				this.vctx.translate(px, py)
				this.vctx.scale(s, s)
				this.vctx.beginPath()
				this.vctx.arc(0, 0, this.thickness, 0, Math.PI * 2)
				this.vctx.closePath()
				this.vctx.fill()
				this.vctx.restore()
			}

	}

	renderFreeElectron(e){

		// this.vctx2.fillStyle = `#ff0`
		this.vctx2.clearRect(0, 0, this.w2, this.h2)

		this.vctx2.save()
			this.vctx2.translate(this.w2 / 2, this.h2 / 2)
			this.vctx2.fillStyle = this.blur//`#000`
			for (let p = -Math.PI * 2; p < Math.PI * 2; p += Math.PI * 2 / this.resolution){
				this.vctx2.save()

				let px = Math.cos(p + this.phase) * this.radius + p * e * this.spread / this.b
				let py = Math.sin(p + this.phase) * this.radius
				let s = (1 - Math.abs(p / Math.PI / 2)) / (this.b + 29) * 30

				this.vctx2.translate(px, py)
				this.vctx2.scale(s, s)
				this.vctx2.beginPath()
				this.vctx2.arc(0, 0, this.thickness, 0, Math.PI * 2)
				this.vctx2.closePath()
				this.vctx2.fill()
				this.vctx2.restore()
			}
		this.vctx2.restore()

	}

}