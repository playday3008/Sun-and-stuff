let core

window.onload = _=>{

	const spd = new Range({width: 500, value: 1, class: `input`, min: 1, step: 1, max: 8, scale: 7, label: `Simulation speed`, labelWidth: 200, formula: x=>`x${Math.round(x)}`})
	const nodes = new Range({width: 500, value: 3, class: `input`, min: 2, step: 1, max: 5, scale: 3, label: `Clusters`, labelWidth: 200})
	const rst = new Button({class: `button`, n: `New dataset`})
	const cls = new Button({class: `button`, n: `New clusters`})
	

	document.body.appendChild(spd)
	document.body.appendChild(nodes)
	document.body.appendChild(rst)
	document.body.appendChild(cls)

	core = new Core(document.querySelector(`.canvas`))

	spd.data.onchange = v=>{
		core.speed = v
	}
	nodes.data.onchange = v=>{
		core.k = v
		core.resample(true)
	}
	rst.data.onchange = v=>{
		core.resample()
	}
	cls.data.onchange = v=>{
		core.resample(true)
	}

}

class Core{

	constructor(canvas) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 18 * this.ratio
		this.ctx.font = this.fontSize + `px Georgia`
		this.ctx.lineWidth = this.ratio * 2

		this.color = {
			point: `#AAA`
		}
		this.colors = [
			`#F28F57`,
			`#75B1E9`,
			`#A5DA8C`,
			`#F67E86`,
			`#C37EFA`,
			`#e31a1c`,
			`#fdbf6f`,
			`#ff7f00`,
			`#cab2d6`,
			`#6a3d9a`
		]

		this.text = [`Assigning each point to its nearest cluster`,`Calculating new mean for each cluster`, `Means stabilized, finished clustering.`]

		this.nnodes = 5
		this.npoints = 256
		this.radius = this.ratio * 4
		this.textMargin = 32 * this.ratio

		this.deltaMeanThreshold = .00001
		this.k = 3
		this.speed = 1
		this.mode = -1
		this.frame = 0

		this.gauss = this.getGaussianGenerator(.125)
		this.resample()
		this.cycle()
		// this.goForClustering()

	}

	cycle(){

		requestAnimationFrame(_=>{this.cycle()})

		if (this.mode === 0){

			if (this.frame < this.points.length){

				for (let f = 0; f < this.speed; f++){

					let p = this.points[Math.floor(this.frame)]

					if (p) {
						let minDistance = Infinity
						let minIndex = 0

						for (let i = 0; i < this.clusters.length; i++){

							const c = this.clusters[i]
							const distance = (((p.x - c.mean.x) ** 2 + (p.y - c.mean.y) ** 2)) ** .5
							if (distance < minDistance) {
								minDistance = distance
								minIndex = i
							}

						}

						this.clusters[minIndex].points.push(p)
						p.color = this.clusters[minIndex].color
						p.pop = 1
						p.closestClusterId = minIndex
						this.frame++

						this.update()
					}
				}

			} else {
				const finished = this.calculateMeans(this.clusters)
				this.frame = 0
				this.mode = 1
				if (finished){
					this.mode = 2
					this.update()
				}
			}

		} else if (this.mode === 1){

			if (this.frame < 200 / this.speed) {

				let f = Math.min(1, this.frame / 200 * this.speed)
				f = f < 0.5 ? 4 * f ** 3 : 1 - (-2 * f + 2) ** 3 / 2

				for (let i = 0; i < this.clusters.length; i++){
					const c = this.clusters[i]
					c.mean.x = c.previousMean.x + (c.nextMean.x - c.previousMean.x) * f
					c.mean.y = c.previousMean.y + (c.nextMean.y - c.previousMean.y) * f

				}

				this.frame++

				this.update()

			} else {

				this.resetColors()
				for (let i = 0; i < this.clusters.length; i++){
					const c = this.clusters[i]
					c.mean.x = c.nextMean.x
					c.mean.y = c.nextMean.y
				}
				this.frame = 0
				this.mode = 0

			}

		}

	}

	resample(keepData){
		if (!keepData) {this.points = this.getPoints(this.nnodes)}
		this.resetColors()
		this.initClusters()
	}

	calculateMeans(){

		let maxDelta = 0
			
		for (let i = 0; i < this.clusters.length; i++){

			const c = this.clusters[i]

			let sumX = 0
			let sumY = 0

			for (let j = 0; j < c.points.length; j++){

				sumX += c.points[j].x
				sumY += c.points[j].y

			}

			sumX /= c.points.length
			sumY /= c.points.length

			c.previousMean = {x: c.mean.x, y: c.mean.y}
			c.nextMean = {x: sumX, y: sumY}

			maxDelta = Math.max(maxDelta, ((c.nextMean.x - c.previousMean.x) ** 2 + (c.nextMean.y - c.previousMean.y) ** 2) ** .5)

			c.points = []

		}

		return maxDelta < this.deltaMeanThreshold

	}

	initClusters(){

		this.frame = 0
		this.clusters = []
		for (let i = 0; i < this.k; i++){

			const p = this.points[Math.floor(Math.random() * (this.points.length + 1))]
			p.color = this.colors[i]

			this.clusters.push({
				color: this.colors[i],
				mean: {x: p.x, y: p.y},
				previousMean: {x: p.x, y: p.y},
				nextMean: {x: p.x, y: p.y},
				points : [p],
				sigma: 0
			})

		}
		this.mode = 0

	}

	resetColors(){

		for (let i = 0; i < this.points.length; i++){
			this.points[i].color = this.color.point
		}

	}


	drawNodes(){

		this.ctx.save()
		this.ctx.scale(1,-1)
		this.ctx.translate(0, -this.h)

		for (let i = 0; i < this.points.length; i++){

			const p = this.points[i]

			this.ctx.fillStyle = p.color
			this.ctx.beginPath()
			this.ctx.arc(p.x * this.w, p.y * this.h, this.radius + p.pop * this.radius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()
			p.pop = Math.max(p.pop - .05, 0)

			if (p.pop > .9){

				
				const c = this.clusters[p.closestClusterId]

				if (c){
					this.ctx.strokeStyle = `#F41`
					this.ctx.lineWidth = this.ratio * 2

					this.ctx.beginPath()
					this.ctx.moveTo(p.x * this.w, p.y * this.h)
					this.ctx.lineTo(c.mean.x * this.w, c.mean.y * this.h)
					this.ctx.stroke()
				}

				

			}

		}

		for (let i = 0; i < this.clusters.length; i++){

			const c = this.clusters[i]
			this.ctx.strokeStyle = `#112`
			this.ctx.lineWidth = this.ratio * 2
			const x = c.mean.x * this.w
			const y = c.mean.y * this.h
			const cross = this.ratio * 10

			this.ctx.beginPath()
			this.ctx.moveTo(x, y - cross)
			this.ctx.lineTo(x, y + cross)
			this.ctx.stroke()

			this.ctx.beginPath()
			this.ctx.moveTo(x - cross, y)
			this.ctx.lineTo(x + cross, y)
			this.ctx.stroke()

			// this.ctx.fillRect(c.mean.x * this.w - 5, c.mean.y * this.h - 5, 10, 10)

		}

		this.ctx.restore()

		this.ctx.fillText(this.text[this.mode], this.textMargin, this.textMargin)

	}

	getPoints(n){

		const points = []

		for (let i = 0; i < n; i++){

			const x = .5 + this.gauss()
			const y = .5 + this.gauss()
			const nn = Math.floor(Math.random() * this.npoints)

			for (let j = 0; j < nn; j++){
				points.push({
					color: this.color.point,
					x: x + this.gauss() * .35,
					y: y + this.gauss() * .35,
					pop: .5
				})
			}

		}

		return points

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

	update(){

		//requestAnimationFrame(_=>{this.update()})

		this.ctx.clearRect(0, 0, this.w, this.h)

		this.drawNodes()


	}

}
