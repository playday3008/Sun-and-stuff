class CanvasHandler {

	constructor(canvas){

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');


		//MODEL
		this.steps = 6
		this.nodes = 7

		//PREFS
		this.radius = 3 * this.ratio
		this.stepX = this.w / this.steps
		this.stepY = this.h / this.nodes
		this.fat = this.ratio * 10
		this.total = 0
		this.initStates()
		this.setRule(.333, .333, .333)

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

	getDensityGenerator(mean, stdev) {
	    
	    return function(x) {
	        
	    	return (1 / stdev * ((Math.PI * 2) ** .5)) * Math.exp(-((x - mean)**2) / (2 * (stdev**2)))

	   }
	}

	setRule(l,c,r){

		let u = [{r: l, fi: Math.PI / 4}, {r: c, fi: 0}, {r: r, fi: Math.PI / 4 * 3}]

		this.matrix = []
		for (let i = 0; i < this.nodes; i++){
			for (let j = 0; j < this.nodes; j++){

				this.matrix.push(j===i ? u[1] : j === i - 1 ? u[2] : j=== i + 1 ? u[0] : {r: 0, fi: Math.PI / 2})

			}
		}

	}

	matMult(v, m){

		let vector = []
		let max = .0000001

		for (let i = 0; i < v.length; i++){

			let nv = 0
			for (let j = 0; j < v.length; j++){
				let a = v[j]
				let p = m[i * v.length + j].r
				let fi = m[i * v.length + j].fi
				nv += a * p * Math.cos(fi)
			}
			max = Math.max(Math.abs(nv), max)
			vector.push(nv || 0)

		}
		//Normalize
		for (let i = 0; i < vector.length; i++) {vector[i] /= max}
		return vector

	}

	cycle() {

		requestAnimationFrame(this.cycle.bind(this))
		this.update()
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
		this.states[0].nodes[3].target = 1

	}

	chain(delay){
		if (!delay) delay = 500
		for (let i = 0; i < this.steps; i++){

			this.step()

		}
		setTimeout(_=>{this.reset()}, delay)
	}

	step(){

		if (this.state + 1 < this.steps){

			let cs = this.states[this.state].nodes
			let ns = this.states[this.state + 1].nodes

			let stateVector = []
			for (let i in cs) {
				stateVector.push(cs[i].target);
				if (cs[i].target !== 0){
					if (ns[+i-1]) {if (cs[i].links[+i-1]) cs[i].links[+i-1].value++; else cs[i].links[+i-1] = {value: 1, node: ns[+i-1]}}
					if (ns[i]) {if (cs[i].links[i]) cs[i].links[i].value++; else cs[i].links[i] = {value: 1, node: ns[i]}}
					if (ns[+i+1]) {if (cs[i].links[i+1]) cs[i].links[+i+1].value++; else cs[i].links[+i+1] = {value: 1, node: ns[+i+1]}}
				}
				cs[i].target = 0
			}
			let newVector = this.matMult(stateVector, this.matrix)
			for (let i in ns) {ns[i].target = newVector[i]}
			
			this.state++

		} else if (this.state < this.steps){

			//Collapse
			let maxi
			let probs = []
			let total = 0
			for (let i in this.states[this.steps - 1].nodes){
				let p = Math.abs(this.states[this.steps - 1].nodes[i].target)
				total += p
				probs.push(p)
			}
			for (let i = 0; i < probs.length; i++){probs[i] /= total}
			total = 0
			let godPlaysDice = Math.random()
			for (let i = 0; i < probs.length; i++){
				if (probs[i] + total > godPlaysDice){
					maxi = i+``;
					break;
				}
				total += probs[i]
			}

			for (let i in this.states[this.steps - 1].nodes){
				if (i !== maxi){
					this.states[this.steps - 1].nodes[i].target = 0
				} else {
					this.states[this.steps - 1].nodes[i].target = 1
				}
			}

			this.state++

		} else {
			this.reset()
		}

		return this.state + 1 < this.steps ? `normal` : this.state < this.steps ? `collapse` : `reset`

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
				let k = Math.abs(n.value)
				this.ctx.fillStyle = (this.state + 1 <= this.steps) ? `rgb(${Math.floor(k * 255)}, ${Math.floor(k * 191)}, ${Math.floor(k * 96)})` : `rgba(${Math.floor(k * 107)}, ${Math.floor(k * 52)}, ${Math.floor(k * 256)}, ${k * .8 + .2})`
				this.ctx.translate(n.position.x, n.position.y)
				this.ctx.beginPath()
				this.ctx.arc(0, 0, this.radius + this.radius * Math.abs(n.value || 0) * 2, 0, Math.PI * 2)
				this.ctx.closePath()
				this.ctx.fill()

				if (+i === this.steps-1){
					
					this.ctx.fillStyle = `#FF1741`
					let k = n.hits / this.total
					this.ctx.fillRect(this.radius * 3, -this.fat/2, k * (this.stepX/2 - this.radius * 3), this.fat)

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
		b.innerText = s === `normal` ? `Make step` : s === `collapse` ? `Collapse` : `Reset`
	}

	let fi1 = document.createElement(`img`)
	fi1.src = `quantum/img/fi1.svg`
	r1.appendChild(fi1)

	let fi2 = document.createElement(`img`)
	fi2.src = `quantum/img/fi2.svg`
	r2.appendChild(fi2)

	let fi3 = document.createElement(`img`)
	fi3.src = `quantum/img/fi3.svg`
	r3.appendChild(fi3)

}