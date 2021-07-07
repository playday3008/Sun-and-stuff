class CanvasHandler {

	constructor(canvas){

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');


		//MODEL
		this.steps = 8
		this.nodes = 4

		//PREFS
		this.state = 0
		this.radius = 3 * this.ratio
		this.stepX = this.w / this.steps
		this.stepY = this.h / this.nodes
		this.initStates()
		this.rule = v=>v

		this.cycle();
	}

	initStates(){

		this.states = {}

		for (let i = 0; i < this.steps; i++){
			this.states[i] = {}
			this.states[i].nodes = {}
			for (let j = 0; j < this.nodes; j++){
				this.states[i].nodes[j] = {value: 0, target: 0, links: {}, position: {x: this.stepX * +i + this.stepX / 2, y: this.stepY * +j + this.stepY / 2}}
			}
		}

		this.reset()

	}

	setRule(l,c,r){
		this.rule = v=>l?v-1:c?v:v+1
	}

	cycle() {

		requestAnimationFrame(this.cycle.bind(this))
		this.draw()

	}

	reset(){
		for (let i in this.states){
			for (let j in this.states[i].nodes){
				this.states[i].nodes[j].target = 0
				this.states[i].nodes[j].links = {}
			}
		}
		this.state = 0
		this.states[0].nodes[1].target = 1

	}

	step(){

		if (this.state + 1 < this.steps){

			let cs = this.states[this.state].nodes
			let ns = this.states[this.state + 1].nodes

			for (let i in cs){

				let next = this.rule(+i)
				if (next >= this.nodes) {next = this.nodes - 1} else if (next < 0) next = 0

				if (cs[i].target) {
					cs[i].target = 0
					ns[next].target = 1

					if (!cs[i].links[next]) {cs[i].links[next] = {value: 1, node: ns[next]}} else {cs[i].links[next].value++}
				}

			}

			this.state++

		} else {
			this.reset()
		}

		return this.state + 1 < this.steps ? `normal` : `reset`

	}

	draw(){

		this.ctx.clearRect(0, 0, this.w, this.h)

		for (let i in this.states){
			for (let j in this.states[i].nodes){
				let n = this.states[i].nodes[j]

				if (n.target !== n.value) n.value += (n.target - n.value) / 16

				this.ctx.save()
				this.ctx.strokeStyle = `#0006`
				for (let l in n.links){
					if (n.links[l].value){
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
				this.ctx.restore()


			}
		}
	}
}

let core
function redistribute(v, a,p1,p2){
    if (v === 0){
    	p1.update(1)
    	p2.update(0)
    } else {
    	p1.update(0)
    	p2.update(0)
    }

}
window.onload = ()=>{
	let r1 = new Range({label: `Transition to the left`, width: 50, min: 0, max: 1, scale: 1, value: 0, class: `input`, labelWidth: 180, step: 1})
    let r2 = new Range({label: `Transition to the center`, width: 50, min: 0, max: 1, scale: 1, value: 1, class: `input`, labelWidth: 180, step: 1})
    let r3 = new Range({label: `Transition to the right`, width: 50, min: 0, max: 1, scale: 1, value: 0, class: `input`, labelWidth: 180, step: 1})
	let b = new Button({class: `button`, n: `Make step`})

	core = new CanvasHandler(document.querySelector('.canvas'))
	document.body.appendChild(r1)
	document.body.appendChild(r2)
	document.body.appendChild(r3)
	document.body.appendChild(b)

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

}