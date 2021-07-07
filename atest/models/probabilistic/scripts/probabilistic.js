class CanvasHandler {

	constructor(canvas){

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');


		//MODEL
		this.steps = 4
		this.nodes = 7

		//PREFS
		this.radius = 3 * this.ratio
		this.stepX = this.w / this.steps
		this.stepY = this.h / this.nodes
		this.fat = this.ratio * 10
		this.total = 0
		this.initStates()
		this.setRule(0.333, 0.333, 0.333)

		this.cycle();
	}

	initStates(){

		this.states = {}

		for (let i = 0; i < this.steps; i++){
			this.states[i] = {}
			this.states[i].nodes = {}
			for (let j = 0; j < this.nodes; j++){
				this.states[i].nodes[j] = {value: 0, target: 0, hits: 0, links: {}, position: {x: this.stepX * +i + this.stepX / 2, y: this.stepY * +j + this.stepY / 2}}
			}
		}

		this.reset()

	}

	setRule(l,c,r){
		this.rule = v=>{
			let rnd = Math.random()
			return rnd < l ? v - 1 : rnd < l + c ? v : v + 1
		}
	}

	cycle() {

		requestAnimationFrame(this.cycle.bind(this))
		this.update()
		this.draw()

	}

	reset(hard){
		for (let i in this.states){
			for (let j in this.states[i].nodes){
				this.states[i].nodes[j].target = 0
				if (hard) {
					this.states[i].nodes[j].links = {}
					this.states[i].nodes[j].hits = 0
				}
			}
		}
		if (hard) this.total = 0
		this.state = 0
		this.states[0].nodes[3].target = 1

	}

	chain(delay){
		for (let i = 0; i < 100; i++){

			this.step()

		}
	}

	step(){

		if (this.state + 1 < this.steps){

			let cs = this.states[this.state].nodes
			let ns = this.states[this.state + 1].nodes

			for (let i in cs){

				let next = this.rule(+i)
				if (next >= this.nodes) {next = this.nodes-1} else if (next < 0) next = 0

				if (cs[i].target) {
					cs[i].target = 0
					ns[next].target = 1
					if (this.state + 1 === this.steps - 1) {
						ns[next].hits++
						this.total++
					}

					if (!cs[i].links[next]) {cs[i].links[next] = {value: 1, node: ns[next]}} else {cs[i].links[next].value++}
				}

			}

			this.state++

		} else {
			this.reset()
		}

		return this.state + 1 < this.steps ? `normal` : `reset`

	}

	update(){

	}

	draw(){

		this.ctx.clearRect(0, 0, this.w, this.h)

		for (let i in this.states){
			for (let j in this.states[i].nodes){
				let n = this.states[i].nodes[j]

				if (n.target !== n.value) n.value += (n.target - n.value) / 8

				this.ctx.save()
				this.ctx.lineWidth = this.ratio * 2
				for (let l in n.links){
					if (n.links[l].value){
						this.ctx.strokeStyle = `rgba(0,0,0,${Math.tanh(n.links[l].value / 10)})`
						this.ctx.beginPath()
						this.ctx.moveTo(n.position.x, n.position.y)
						this.ctx.lineTo(n.links[l].node.position.x, n.links[l].node.position.y)
						this.ctx.stroke()
					}

				}
				this.ctx.restore()

				this.ctx.save()
				this.ctx.fillStyle = `rgba(${n.value * 107},${n.value * 52},${n.value * 256},${n.value * .8 + .2})`
				this.ctx.translate(n.position.x, n.position.y)
				this.ctx.beginPath()
				this.ctx.arc(0, 0, this.radius + this.radius * n.value * 2, 0, Math.PI * 2)
				this.ctx.closePath()
				this.ctx.fill()

				if (+i === this.steps-1){
					
					this.ctx.fillStyle = `#6B34E1`
					let k = n.hits / this.total
					this.ctx.fillRect(this.radius * 5, -this.fat/2, k * (this.stepX/2 - this.radius * 5), this.fat)

				}

				this.ctx.restore()

			}
		}
	}
}

let core
function redistribute(v, a,p1,p2){

    let sigma = .001
    let p1v = Math.max(p1.value, sigma)
    let p2v = Math.max(p2.value, sigma)
    let sum = p1v + p2v
    let dif = 1 - v
    let norm = dif / sum
    p1.update(p1v * norm)
    p2.update(p2v * norm)

}
window.onload = ()=>{
	let r1 = new Range({label: `Transition to the left`, width: 300, min: 0, max: 1, scale: 2, value: .333, class: `input`, labelWidth: 180})
    let r2 = new Range({label: `Transition to the center`, width: 300, min: 0, max: 1, scale: 2, value: .333, class: `input`, labelWidth: 180})
    let r3 = new Range({label: `Transition to the right`, width: 300, min: 0, max: 1, scale: 2, value: .333, class: `input`, labelWidth: 180})
	let b = new Button({class: `button`, n: `Make step`})
	let b2 = new Button({class: `button`, n: `Iterate 100 times`})
	let b3 = new Button({class: `button`, n: `Clear`})
	core = new CanvasHandler(document.querySelector('.canvas'))
	document.body.appendChild(r1)
	document.body.appendChild(r2)
	document.body.appendChild(r3)
	document.body.appendChild(b)
	document.body.appendChild(b2)
	document.body.appendChild(b3)
	r1.data.onchange = v=>{
		redistribute(v, r1.data, r2.data, r3.data)
		core.setRule(r1.data.value, r2.data.value, r3.data.value)
	}
	r2.data.onchange = v=>{
		redistribute(v, r2.data, r1.data, r3.data)
		core.setRule(r1.data.value, r2.data.value, r3.data.value)
	}
	r3.data.onchange = v=>{
		redistribute(v, r3.data, r1.data, r2.data)
		core.setRule(r1.data.value, r2.data.value, r3.data.value)
	}
	b.data.onchange = v=>{
		let s = core.step()
		b.innerText = s === `normal` ? `Make step` : `Reset`
	}
	b2.data.onchange = v=>{
		core.chain()
	}
	b3.data.onchange = v=>{
		core.reset(true)
	}

}