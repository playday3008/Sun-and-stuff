let core;
window.onload = ()=>{

	let r = new Range({ width: 400, value: .5, class: `input`, min: .5, max: 3, scale: 1, step: .5, label: `Change rate`, labelWidth: 120, trigger: `release`})
	let d = new Range({ width: 400, value: .1, class: `input`, min: 0, max: 3, scale: 1, label: `Delta`, labelWidth: 120, trigger: `release`})
	// let b = new Button({n: `Random structure`, class: `go`})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(r)
	document.body.appendChild(d)
	// document.body.appendChild(b)

	r.data.onchange = v=>{
		core.speed = v/10
		core.rollFilm()
	}
	d.data.onchange = v=>{
		core.delta = v/100
		core.generateBands(2)
	}
	// b.data.onchange = v=>{
	// 	core.generateBands(2)
	// }
}

class Core {

	constructor(canvas) {

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		this.vCanvas = document.createElement('canvas')
		this.vCanvas.width = this.w
		this.vCanvas.height = this.h
		this.vctx = this.vCanvas.getContext('2d')

		this.vCanvas2 = document.createElement('canvas')
		this.vCanvas2.width = this.w
		this.vCanvas2.height = this.h
		this.vctx2 = this.vCanvas2.getContext('2d')

		//VISUALS
		this.margin = 60 * this.ratio
		this.rangeY = 1
		this.mainline = this.ratio * 2
		this.visualSpeed = 1 * this.ratio
		this.radius = 8 * this.ratio

		//DATA
		this.speed = .05
		this.delta = .001

		//GENERATED
		this.t = this.t2 = this.t3 = 0
		this.snapshot = false
		this.lSnapshot = false

		this.ctx.font = this.ratio * 12 + `px Arial`;
		this.ctx.textAlign = `right`
		this.ctx.textBaseline = `middle`

		this.generateBands(2)
		this.run()

	}

	generateBands(n){

		this.bands = []
		let step = this.rangeY / n * 2

		this.bands.push(x=>.6 + Math.cos(x/5) * .5)
		this.bands.push(x=>1.2 - Math.cos(x/5) * .5)

		this.rollFilm()

	}

	rollFilm(){
		
		this.ps = [{band: 0, safety: 0, amplitude: 0, targetAmplitude: 1}]
		for (let i = 0; i < (this.w - this.margin * 2) / this.visualSpeed; i++){
			this.update(true)
			this.updateGraph()
		}

	}

	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	getSnapshot(t){

		let snapshot = []
		let energies = []
		for (let i = 0; i < this.bands.length; i++){
			energies.push(this.bands[i](t))
		}

		for (let i = 0; i < this.bands.length; i++){
			let d = 0
			let e1 = energies[i]
			for (let j = 0; j < this.bands.length; j++){
				if (i !== j){

					let e2 = energies[j]
					let sq = Math.sqrt((e2 - e1) ** 2 / 4 + this.delta)
					d += ((e2 + e1) / 2 + (j > i ? -sq : sq) - e1)

				}
			}
			snapshot.push(e1 + d)
		}
		return snapshot

	}

	updateP(restrict){

		this.gaps = []


		// Real energy level
		for (let i = 0; i < this.ps.length; i++){

			let p = this.ps[i]

			p.amplitude += (p.targetAmplitude - p.amplitude) * .1

			p.le = p.e
			p.e = this.snapshot[p.band]

			let closest = {id: 0, value: Infinity}

			for (let j = 0; j < this.bands.length; j++){

				let b = this.bands[j]
				if (p.band !== j){

					let e1 = this.bands[p.band](this.t)
					let e2 = this.bands[j](this.t)

					let dv = Math.abs(e2 - e1)
					if (dv < closest.value){
						closest.id = j
						closest.value = dv
					}

				}

			}


			let v1 = this.bands[closest.id](this.t)
			let v2 = this.bands[p.band](this.t)
			let newsign = Math.sign(v1 - v2)

			if (p.lastClosest && p.lastSign && (p.lastClosest.id === closest.id) && (p.lastSign !== newsign)){
				let jump = p.derivative * .000015 > this.delta
				if (jump){
					let transfer = this.delta === 0 ? 1 : Math.random()
					// let transfer = this.delta === 0 ? 1 : (p.derivative * .000015 - this.delta) / this.delta
					let n = this.isOccupied(p.lastClosest.id)
					if (n !== -1){
						this.ps[n].targetAmplitude += transfer * p.targetAmplitude
					} else {
						this.ps.push({band: p.lastClosest.id, amplitude: 0, targetAmplitude: transfer * p.targetAmplitude})
					}
					p.targetAmplitude = p.targetAmplitude - p.targetAmplitude * transfer
					if (p.targetAmplitude === 0) {
						this.ps.splice(i,1)
						i--
					}
				}
			}

			p.lastSign = newsign
			p.lastClosest = closest

		}

	}

	update(restrict){

		this.t += this.speed
		this.t2 = this.t + 0.05 * (this.w/2 - this.margin) / this.visualSpeed
		this.t3 = this.t - 0.05 * (this.w/2 - this.margin) / this.visualSpeed

		this.updateP(restrict)

	}

	mapY(n){

		return (this.h - this.margin) - n / this.rangeY * (this.h / 2 - this.margin)

	}

	updateGraph(){

		let snapshot = this.getSnapshot(this.t2)
		let lSnapshot = this.getSnapshot(this.t2 - this.speed)

		// this.vctx2.drawImage(this.vCanvas2, -this.visualSpeed, 0)
		// this.vctx2.clearRect(0, 0, this.w / 2, this.h)
		// this.vctx2.fillStyle = `#112`
		// this.vctx2.fillRect(this.w - this.margin, 0, this.margin, this.h)

		// this.vctx2.save()
		// this.vctx2.strokeStyle = `#ff0`
		// this.vctx2.lineWidth = this.mainline

		// let x2 = this.w - this.margin

		// for (let b = 0; b < this.bands.length; b++){

		// 	this.vctx2.strokeStyle = `#305082`

		// 	let p = this.mapY(lSnapshot[b])
		// 	let n = this.mapY(snapshot[b])

		// 	this.vctx2.beginPath()
		// 	this.vctx2.moveTo(x2 - this.visualSpeed, p)
		// 	this.vctx2.lineTo(x2, n)

		// 	this.vctx2.stroke()

		// }

		// this.vctx2.restore()

		this.vctx.drawImage(this.vCanvas, -this.visualSpeed * this.speed / .05, 0)
		this.vctx.clearRect(0, 0, this.margin, this.h)
		this.vctx.fillStyle = `#112`
		this.vctx.fillRect(this.w - this.margin, 0, this.margin, this.h)

		this.vctx.save()
		this.vctx.strokeStyle = `#ff0`
		this.vctx.lineWidth = this.mainline

		let x = this.w - this.margin
		this.lSnapshot = this.lSnapshot ? JSON.parse(JSON.stringify(this.snapshot)) : this.getSnapshot(this.t - this.speed)
		this.snapshot = this.getSnapshot(this.t)

		for (let b = 0; b < this.bands.length; b++){

			this.vctx.strokeStyle = `#305082`

			let p = this.mapY(lSnapshot[b])
			let n = this.mapY(snapshot[b])

			this.vctx.beginPath()
			this.vctx.moveTo(x - (this.visualSpeed * this.speed / .05), p)
			this.vctx.lineTo(x, n)

			this.vctx.stroke()

		}

		// for (let i = 0; i < this.ps.length; i++){
		// 	this.vctx.fillStyle  = `#48FF7B66`
		// 	this.vctx.fillRect(x - this.visualSpeed - this.mainline/2, this.mapY(this.ps[i].e), this.mainline, this.mainline)
		// }


		this.vctx.restore()

	}

	isOccupied(b){
		for (let i = 0; i < this.ps.length; i++){
			if (this.ps[i].band === b) return i
		}
		return -1
	}

	drawP(){

		this.ctx.save()
		this.ctx.fillStyle = `#48FF7B`

		this.vctx.fillStyle  = `rgb(72, 255, 123)`

		for (let i = 0; i < this.ps.length; i++){

			this.ctx.save()

			let x = this.w / 2
			let y = this.mapY(this.ps[i].e)
			let dx = this.speed * 800
			let dy = (y - this.mapY(this.ps[i].le)) * 20// * this.speed * 100
			let angle = Math.atan2(dy, dx)
			this.ps[i].derivative = Math.sqrt(dx * dx + dy * dy)

			let r = dx / 3 * this.ps[i].amplitude
			let thickR = this.mainline + r

			this.ctx.translate(x,y)
			this.ctx.rotate(angle)
			this.ctx.scale(1,.5)
			

			let eFill = this.ctx.createRadialGradient(0,0,this.mainline,0,0, thickR)
			eFill.addColorStop(0, `#48FF7Bff`)
			eFill.addColorStop(1, `#48FF7B00`)
			this.ctx.fillStyle = eFill

			this.ctx.fillRect(-thickR, -thickR, thickR*2, thickR*2)

			this.ctx.restore()
		}

		this.ctx.restore()

	}

	drawLabels(){

		this.ctx.save()

		for (let b = 0; b < this.bands.length; b++){
			this.ctx.fillStyle = `#305082`
			let snapshot = this.getSnapshot(this.t3)
			this.ctx.fillText(`| ${b} ⟩`, this.margin / 3 * 2, this.mapY(snapshot[b]))
		}

		this.ctx.restore()

	}

	draw(){

		this.updateGraph()

		this.ctx.lineWidth = this.ratio
		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.w, this.h)
		this.ctx.drawImage(this.vCanvas, 0, 0)
		this.ctx.drawImage(this.vCanvas2, 0, 0)

		this.drawP()
		this.drawLabels()

	}

}