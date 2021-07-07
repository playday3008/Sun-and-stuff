let core;
window.onload = ()=>{

	// let d = new Button({ n: `New seed`, class: `go`})
	
	core = new Core(document.querySelector('.vessel'))

	// document.body.appendChild(d)

	// d.data.onchange = v=>{
	// 	core.generate()
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
		this.margin = this.ratio * 60
		this.cells = 6
		this.radius = this.ratio * 4
		this.drainSpeed = .04

		//DATA
		this.timeStep = 15
		this.population = 6

		//GENERATED
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.font = this.ratio * 18 + `px Arial`;
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.strokeStyle = `#345`

		this.generate()
		this.update()
		this.run()

	}

	shuffle(a) {
	    for (let i = a.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [a[i], a[j]] = [a[j], a[i]]
	    }
	}

	generate(){

		this.nodes = []
		let step = (this.h - this.margin * 2) / this.cells
		for (let x = this.margin; x <= this.w - this.margin; x += step){
			let a = []
			this.nodes.push(a)
			for (let y = this.margin; y <= this.h - this.margin; y += step){
				a.push({x: x, y: y, e: false})
			}
		}

		let popX = []
		let popY = []
		for (let i = 0; i < this.nodes.length; i++){popX.push(i)}
		for (let i = 0; i < this.nodes[0].length; i++){popY.push(i)}
		this.shuffle(popX)
		this.shuffle(popY)

		for (let i = 0; i < this.population; i++){

			this.nodes[popX.pop()][popY.pop()].e = {targetNode: false, f: 0, timer: 500 + Math.random() * 2000}

		}

	}

	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this))
		this.update()
		this.draw()

	}

	update(){

		for (let i = 0; i < this.nodes.length; i++){
			for (let j = 0; j < this.nodes[i].length; j++){

				let n = this.nodes[i][j]
				if (n.e){

					if (n.e.timer > 0){
						n.e.timer -= this.timeStep
					} else {
						n.e.timer = Infinity
						let neighbours = []
						for (let dx = -1; dx < 2; dx++){
							for (let dy = -1; dy < 2; dy++){
								if (!(dx === 0 && dy === 0) && !(dx === dy) && !(dx === -dy) && this.nodes[i+dx] && this.nodes[i+dx][j+dy] && this.nodes[i+dx][j+dy].e === false){
									neighbours.push(this.nodes[i+dx][j+dy])
								}
							}
						}
						let pick = Math.floor(Math.random() * (neighbours.length))

						n.e.targetNode = neighbours[pick]
						n.e.targetNode.e = {targetNode: false, f: 1, timer: Infinity}
					}

					if (n.e.targetNode){

						n.e.f += this.drainSpeed
						n.e.targetNode.e.f -= this.drainSpeed

						if (n.e.f >= 1){

							n.e.targetNode.e.f = 0
							n.e.targetNode.e.timer = 500 + Math.random() * 2000
							n.e = false

						}

					}

				}

			}
		}

	}

	draw(){

		this.ctx.fillStyle = '#112'
		this.ctx.fillRect(0, 0, this.w, this.h)


		for (let i = 0; i < this.nodes.length; i++){
			for (let j = 0; j < this.nodes[i].length; j++){
				
				this.ctx.fillStyle = `#fff3`
				let n = this.nodes[i][j]
				
				let s = 1
				if (n.e){
					this.ctx.fillStyle = `#48FF7B`
					this.ctx.strokeStyle = `#48FF7B78`
					s = (1 - n.e.f) * 1 + 1
					if (n.e.targetNode){
						this.ctx.save()
						this.ctx.globalAlpha = (1 - n.e.f)**2
						this.ctx.beginPath()
						this.ctx.moveTo(n.x, n.y)
						this.ctx.lineTo(n.e.targetNode.x, n.e.targetNode.y)
						this.ctx.stroke()
						this.ctx.restore()

					}
				}
				this.ctx.beginPath()
				this.ctx.arc(n.x, n.y, this.radius * s, 0, Math.PI * 2)
				this.ctx.closePath()
				this.ctx.fill()

			}
		}
		
		this.ctx.restore()

	}

}