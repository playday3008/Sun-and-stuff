let core

const presets = [
	[{u: 0.4975, v: 0.345, class: 0},{u: 0.3375, v: 0.415, class: 0},{u: 0.35, v: 0.62, class: 0},{u: 0.6025, v: 0.6225, class: 0},{u: 0.66, v: 0.35, class: 0},{u: 0.4775, v: 0.4675, class: 0},{u: 0.4875, v: 0.6025, class: 0},{u: 0.6975, v: 0.8225, class: 1},{u: 0.825, v: 0.6075, class: 1},{u: 0.8975, v: 0.305, class: 1},{u: 0.74, v: 0.1725, class: 1},{u: 0.5475, v: 0.1725, class: 1},{u: 0.505, v: 0.0875, class: 1},{u: 0.3325, v: 0.185, class: 1},{u: 0.115, v: 0.385, class: 1},{u: 0.1825, v: 0.7, class: 1},{u: 0.3475, v: 0.835, class: 1},{u: 0.5775, v: 0.845, class: 1},{u: 0.7375, v: 0.9675, class: 2},{u: 0.8825, v: 0.9025, class: 2},{u: 0.96, v: 0.775, class: 2},{u: 0.985, v: 0.59, class: 2},{u: 0.97, v: 0.1025, class: 2},{u: 0.8325, v: 0.0225, class: 2},{u: 0.1625, v: 0.01, class: 2},{u: 0.0475, v: 0.1525, class: 2},{u: 0, v: 0.345, class: 2},{u: 0.0125, v: 0.6775, class: 2},{u: 0.1475, v: 0.87, class: 2},{u: 0.31, v: 0.96, class: 2},{u: 0.7225, v: 0.02, class: 2},{u: 0.235, v: 0.2775, class: 1},{u: 0.285, v: 0.8025, class: 1},{u: 0.7875, v: 0.8, class: 1}],
	[{u: 0.115, v: 0.1225, class: 0},{u: 0.115, v: 0.195, class: 0},{u: 0.115, v: 0.3, class: 0},{u: 0.1075, v: 0.4125, class: 0},{u: 0.1075, v: 0.54, class: 0},{u: 0.1125, v: 0.69, class: 0},{u: 0.105, v: 0.8075, class: 0},{u: 0.1075, v: 0.89, class: 0},{u: 0.255, v: 0.1225, class: 1},{u: 0.255, v: 0.2125, class: 1},{u: 0.265, v: 0.3425, class: 1},{u: 0.2525, v: 0.4375, class: 1},{u: 0.27, v: 0.5875, class: 1},{u: 0.2475, v: 0.6775, class: 1},{u: 0.2525, v: 0.7975, class: 1},{u: 0.2525, v: 0.8975, class: 1},{u: 0.4175, v: 0.1275, class: 2},{u: 0.42, v: 0.22, class: 2},{u: 0.42, v: 0.29, class: 2},{u: 0.4225, v: 0.41, class: 2},{u: 0.4225, v: 0.5575, class: 2},{u: 0.4225, v: 0.6675, class: 2},{u: 0.415, v: 0.7575, class: 2},{u: 0.4275, v: 0.8875, class: 2},{u: 0.5975, v: 0.1175, class: 0},{u: 0.5975, v: 0.2125, class: 0},{u: 0.605, v: 0.355, class: 0},{u: 0.5925, v: 0.4625, class: 0},{u: 0.5975, v: 0.5925, class: 0},{u: 0.6, v: 0.6975, class: 0},{u: 0.595, v: 0.8225, class: 0},{u: 0.595, v: 0.9225, class: 0},{u: 0.75, v: 0.1125, class: 1},{u: 0.7525, v: 0.2325, class: 1},{u: 0.7525, v: 0.3375, class: 1},{u: 0.7525, v: 0.4925, class: 1},{u: 0.7525, v: 0.6275, class: 1},{u: 0.76, v: 0.735, class: 1},{u: 0.76, v: 0.81, class: 1},{u: 0.755, v: 0.915, class: 1},{u: 0.9025, v: 0.1075, class: 2},{u: 0.9025, v: 0.1975, class: 2},{u: 0.9025, v: 0.3425, class: 2},{u: 0.8925, v: 0.485, class: 2},{u: 0.895, v: 0.61, class: 2},{u: 0.9, v: 0.73, class: 2},{u: 0.9, v: 0.8575, class: 2},{u: 0.8975, v: 0.935, class: 2}],
	[{u: 0.06, v: 0.5525, class: 0},{u: 0.14, v: 0.5625, class: 0},{u: 0.2225, v: 0.565, class: 0},{u: 0.41, v: 0.595, class: 0},{u: 0.5425, v: 0.5825, class: 0},{u: 0.7175, v: 0.555, class: 0},{u: 0.805, v: 0.59, class: 0},{u: 0.905, v: 0.585, class: 0},{u: 0.1025, v: 0.4375, class: 1},{u: 0.215, v: 0.4725, class: 1},{u: 0.4175, v: 0.4725, class: 1},{u: 0.62, v: 0.455, class: 1},{u: 0.7575, v: 0.485, class: 1},{u: 0.89, v: 0.495, class: 1},{u: 0.945, v: 0.4925, class: 1},{u: 0.4825, v: 0.215, class: 2},{u: 0.47, v: 0.27, class: 2},{u: 0.5625, v: 0.2975, class: 2},{u: 0.57, v: 0.215, class: 2},{u: 0.455, v: 0.7875, class: 2},{u: 0.4225, v: 0.8625, class: 2},{u: 0.5275, v: 0.8875, class: 2},{u: 0.565, v: 0.8225, class: 2},{u: 0.235, v: 0.28, class: 1},{u: 0.09, v: 0.1325, class: 1},{u: 0.3925, v: 0.0975, class: 1},{u: 0.67, v: 0.11, class: 1},{u: 0.7425, v: 0.31, class: 1},{u: 0.9125, v: 0.27, class: 1},{u: 0.8625, v: 0.0875, class: 1},{u: 0.5675, v: 0.0675, class: 1},{u: 0.5375, v: 0.5, class: 1},{u: 0.68, v: 0.2675, class: 1},{u: 0.545, v: 0.405, class: 1},{u: 0.7675, v: 0.7725, class: 0},{u: 0.9, v: 0.7025, class: 0},{u: 0.2175, v: 0.71, class: 0},{u: 0.155, v: 0.9075, class: 0},{u: 0.47, v: 0.9675, class: 0},{u: 0.8075, v: 0.8525, class: 0},{u: 0.285, v: 0.8375, class: 0},{u: 0.215, v: 0.8075, class: 0},{u: 0.67, v: 0.9325, class: 0},{u: 0.6575, v: 0.8475, class: 0},{u: 0.5925, v: 0.92, class: 0}],
	[{u: 0.1125, v: 0.2075, class: 0},{u: 0.1125, v: 0.25, class: 0},{u: 0.11, v: 0.3075, class: 0},{u: 0.11, v: 0.39, class: 0},{u: 0.1425, v: 0.2175, class: 0},{u: 0.1425, v: 0.24, class: 0},{u: 0.1725, v: 0.2675, class: 0},{u: 0.2025, v: 0.2925, class: 0},{u: 0.245, v: 0.26, class: 0},{u: 0.2875, v: 0.22, class: 0},{u: 0.285, v: 0.29, class: 0},{u: 0.2875, v: 0.35, class: 0},{u: 0.2825, v: 0.3875, class: 0},{u: 0.37, v: 0.22, class: 1},{u: 0.3725, v: 0.2725, class: 1},{u: 0.3725, v: 0.335, class: 1},{u: 0.375, v: 0.3925, class: 1},{u: 0.43, v: 0.3925, class: 1},{u: 0.48, v: 0.3925, class: 1},{u: 0.5275, v: 0.395, class: 1},{u: 0.53, v: 0.36, class: 1},{u: 0.12, v: 0.4975, class: 2},{u: 0.12, v: 0.53, class: 2},{u: 0.12, v: 0.57, class: 2},{u: 0.12, v: 0.6275, class: 2},{u: 0.12, v: 0.66, class: 2},{u: 0.1625, v: 0.6025, class: 2},{u: 0.1875, v: 0.6025, class: 2},{u: 0.22, v: 0.6025, class: 2},{u: 0.255, v: 0.6025, class: 2},{u: 0.285, v: 0.49, class: 2},{u: 0.285, v: 0.5425, class: 2},{u: 0.285, v: 0.575, class: 2},{u: 0.285, v: 0.6125, class: 2},{u: 0.285, v: 0.64, class: 2},{u: 0.285, v: 0.6825, class: 2},{u: 0.3725, v: 0.48, class: 0},{u: 0.3725, v: 0.5125, class: 0},{u: 0.3725, v: 0.5975, class: 0},{u: 0.3725, v: 0.665, class: 0},{u: 0.4325, v: 0.67, class: 0},{u: 0.48, v: 0.67, class: 0},{u: 0.4075, v: 0.56, class: 0},{u: 0.4425, v: 0.56, class: 0},{u: 0.475, v: 0.56, class: 0},{u: 0.3925, v: 0.4725, class: 0},{u: 0.435, v: 0.4725, class: 0},{u: 0.48, v: 0.4725, class: 0},{u: 0.5075, v: 0.4775, class: 0},{u: 0.375, v: 0.555, class: 0},{u: 0.3725, v: 0.6325, class: 0},{u: 0.59, v: 0.4825, class: 1},{u: 0.59, v: 0.51, class: 1},{u: 0.59, v: 0.5525, class: 1},{u: 0.59, v: 0.59, class: 1},{u: 0.59, v: 0.645, class: 1},{u: 0.59, v: 0.665, class: 1},{u: 0.61, v: 0.4725, class: 1},{u: 0.64, v: 0.4725, class: 1},{u: 0.67, v: 0.4725, class: 1},{u: 0.6825, v: 0.5075, class: 1},{u: 0.68, v: 0.555, class: 1},{u: 0.6625, v: 0.57, class: 1},{u: 0.6425, v: 0.575, class: 1},{u: 0.62, v: 0.575, class: 1},{u: 0.145, v: 0.7725, class: 1},{u: 0.1725, v: 0.74, class: 1},{u: 0.2375, v: 0.7475, class: 1},{u: 0.255, v: 0.775, class: 1},{u: 0.2375, v: 0.8275, class: 1},{u: 0.1875, v: 0.885, class: 1},{u: 0.14, v: 0.9175, class: 1},{u: 0.14, v: 0.95, class: 1},{u: 0.2, v: 0.955, class: 1},{u: 0.23, v: 0.955, class: 1},{u: 0.26, v: 0.9575, class: 1},{u: 0.3775, v: 0.755, class: 2},{u: 0.36, v: 0.77, class: 2},{u: 0.36, v: 0.8125, class: 2},{u: 0.3475, v: 0.87, class: 2},{u: 0.35, v: 0.915, class: 2},{u: 0.39, v: 0.95, class: 2},{u: 0.445, v: 0.95, class: 2},{u: 0.4775, v: 0.9175, class: 2},{u: 0.49, v: 0.86, class: 2},{u: 0.49, v: 0.795, class: 2},{u: 0.46, v: 0.745, class: 2},{u: 0.405, v: 0.7425, class: 2},{u: 0.575, v: 0.75, class: 0},{u: 0.5875, v: 0.7275, class: 0},{u: 0.64, v: 0.7225, class: 0},{u: 0.67, v: 0.7275, class: 0},{u: 0.6825, v: 0.77, class: 0},{u: 0.6775, v: 0.815, class: 0},{u: 0.625, v: 0.855, class: 0},{u: 0.585, v: 0.9025, class: 0},{u: 0.575, v: 0.9575, class: 0},{u: 0.6275, v: 0.9575, class: 0},{u: 0.6725, v: 0.9575, class: 0},{u: 0.7, v: 0.9575, class: 0},{u: 0.7725, v: 0.7375, class: 1},{u: 0.7675, v: 0.7675, class: 1},{u: 0.7675, v: 0.8075, class: 1},{u: 0.75, v: 0.8925, class: 1},{u: 0.76, v: 0.8525, class: 1},{u: 0.7625, v: 0.9325, class: 1},{u: 0.8075, v: 0.95, class: 1},{u: 0.865, v: 0.9325, class: 1},{u: 0.8975, v: 0.8675, class: 1},{u: 0.8975, v: 0.8075, class: 1},{u: 0.8825, v: 0.7475, class: 1},{u: 0.8375, v: 0.7225, class: 1},{u: 0.7875, v: 0.7225, class: 1}]
]

window.onload = _=>{

	const d = new Range({width: 300, value: 21, class: `input`, min: 1, max: 21, scale: 10, label: `Max tree depth`, labelWidth: 160, step: 1})
	const e = new Range({width: 300, value: 0, class: `input`, min: 0, max: 1, scale: 5, label: `Entropy threshold`, labelWidth: 160, step: .05})
	const m = new Range({width: 300, value: 0, class: `input`, min: 1, max: 10, scale: 3, label: `Min samples per leaf`, labelWidth: 160, step: 1})
	const r = new Button({n: `Clear`, class: `go`})
	const rnd = new Button({n: `Random`, class: `go`})
	const p1 = new Button({n: `Circles`, class: `go`})
	const p2 = new Button({n: `Bands`, class: `go`})
	const p3 = new Button({n: `Trojans`, class: `go`})
	const p4 = new Button({n: `Machine learning`, class: `go`})

	const one = new Button({n: `1`, class: `go`})
	one.classList.add(`active`, `one`)
	const two = new Button({n: `2`, class: `go`})
	two.classList.add(`two`)
	const three = new Button({n: `3`, class: `go`})
	three.classList.add(`three`)

	core = new Core(document.querySelector(`.canvas`), document.querySelector(`.tree`))

	const class_label = document.createElement(`div`)
    class_label.classList.add(`label`, `padded`)
    class_label.innerHTML = `Class to draw`
    document.body.appendChild(class_label)
    document.body.appendChild(one)
    document.body.appendChild(two)
    document.body.appendChild(three)
    document.body.appendChild(r)

	document.body.appendChild(d)
	document.body.appendChild(e)
	document.body.appendChild(m)

	const preset_label = document.createElement(`div`)
    preset_label.classList.add(`label`)
    preset_label.innerHTML = `Presets`
	
	document.body.appendChild(preset_label)
	document.body.appendChild(p1)
	document.body.appendChild(p2)
	document.body.appendChild(p3)
	document.body.appendChild(document.createElement(`br`))
	document.body.appendChild(p4)
	document.body.appendChild(rnd)

	one.data.onchange = v=>{
		core.activeType = 0
		setButtons(one, [two, three])
	}
	two.data.onchange = v=>{
		core.activeType = 1
		setButtons(two, [one, three])
	}
	three.data.onchange = v=>{
		core.activeType = 2
		setButtons(three, [two, one])
	}

	d.data.onchange = v=>{
		core.updateData({depth: v})
	}
	e.data.onchange = v=>{
		core.updateData({entropy: v})
	}
	m.data.onchange = v=>{
		core.updateData({items: v})
	}
	r.data.onchange = _=>{
		core.clear()
	}
	// p1.classList.add(`margined`)
	p4.classList.add(`margined`)
	rnd.data.onchange = _=>{
		core.initRandom(20)
	}

	p1.data.onchange = _=>{
		core.clear()
		core.updateData({d: presets[0]})
	}
	p2.data.onchange = _=>{
		core.clear()
		core.updateData({d: presets[1]})
	}
	p3.data.onchange = _=>{
		core.clear()
		core.updateData({d: presets[2]})
	}
	p4.data.onchange = _=>{
		core.clear()
		core.updateData({d: presets[3]})
	}

	function setButtons(a,p){

		a.classList.add(`active`)
		for (let i = 0; i < p.length; i++){
			p[i].classList.remove(`active`)
		}

	}

}

class Core{

	constructor(canvas, treePot) {

		this.treePot = treePot
		this.canvas = canvas
		this.ratio = window.devicePixelRatio || 1
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.ctx.lineWidth = this.ratio
		this.ctx.font = 10 * this.ratio + `px Monospace`
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`

		this.r = this.ratio * 4
		this.colors = {
			0: `#48FF7B`,
			1: `#FF8D53`,
			2: `#08073A`
		}
		this.backColors = {
			0: `#709B72`,
			1: `#FEE6A7`,
			2: `#474673`
		}
		this.subdivisions = 200
		this.activeType = 0

		// this.data = []
		// this.tst()
		this.setListeners()
		this.initRandom(20)

		// this.draw()

	}

	initRandom(n){

		if (this.setup) this.clear()

		let set = []
		for (let i = 0; i < n; i++){

			let dice = Math.random()
			set.push({u: Math.random(), v: Math.random(), class: dice < .33 ? 0 : dice < .66 ? 1 : 2})

		}

		this.updateData({d: set})

	}

	setListeners(){
		this.canvas.addEventListener(`mousedown`, e=>{

            let type = e.button === 0 ? 0 : 1

            let u = e.offsetX * this.ratio / this.w
            let v = e.offsetY * this.ratio / this.h

            // this.updateData({d:{u: u, v: v, class: type}})
            this.updateData({d:{u: u, v: v, class: this.activeType}})

        })
        this.canvas.addEventListener(`touchstart`, e=>{

            e.preventDefault()
            let type = e.touches.length > 1 ? 1 : 0

            let rect = e.target.getBoundingClientRect();
            let tx = e.targetTouches[type === 1 ? 0 : 1].pageX - rect.left;
            let ty = e.targetTouches[type === 1 ? 0 : 1].pageY - rect.top;

            let u = tx * this.ratio / this.w
            let v = ty * this.ratio / this.h

            // this.updateData({d:{u: u, v: v, class: type}})
            this.updateData({d:{u: u, v: v, class: this.activeType}})
        })
	}

	updateData(a){

		if (!this.setup){
			this.setup = {
				trainingSet: [],
				categoryAttr: `class`,
				maxTreeDepth: false,
				entropyThrehold: false,
				minItemsCount: 0
			}
		}

		if (a.d) {
			if (a.d.length){
				for (let i = 0; i < a.d.length; i++){
					this.setup.trainingSet.push(a.d[i])
				}

			} else {
				this.setup.trainingSet.push(a.d)
			}
		}
		if (a.depth !== undefined) this.setup.maxTreeDepth = a.depth
		if (a.entropy !== undefined) this.setup.entropyThrehold = a.entropy
		if (a.items !== undefined) this.setup.minItemsCount = a.items

		this.dt = new dt.DecisionTree(this.setup)
		this.draw()

	}

	clear(){

		if (this.setup){
			this.setup.trainingSet = []
		}
		this.draw()

	}

	getTree(tree){
		if (tree.category) {
			const cat = (tree.category === '0' ? 'green' : tree.category === '1' ? 'red' : 'blue')
	        return  `<ul><li><span class="${cat}">${cat}</span></li></ul>`
	    }
		return `<ul><li><span>${tree.attribute === `u` ? `x` : `y`} ${tree.predicateName} ${Math.floor(tree.pivot * 100)}%</span><ul><li><span class="blank">👍🏼</span>${this.getTree(tree.match)}</li><li><span class="blank">👎🏼</span>${this.getTree(tree.notMatch)}</li></ul></li></ul>`
	}

	draw(){

		this.ctx.fillStyle = `#112`
		this.ctx.fillRect(0, 0, this.w, this.h)

		//Background
		if (this.setup && this.setup.trainingSet.length){
			const cellSize = this.w / this.subdivisions
			for (let v = 0; v < 1; v += 1 / this.subdivisions){
				for (let u = 0; u < 1; u += 1 / this.subdivisions){
					
					let c = this.dt.predict({u: u, v: v})
					this.ctx.fillStyle = this.backColors[c]
					this.ctx.fillRect(u * this.w, v * this.h, cellSize, cellSize)

				}
			}
		}

		//Points
		for (let i = 0; i < this.setup.trainingSet.length; i++){

			let p = this.setup.trainingSet[i]

			this.ctx.fillStyle = this.colors[p.class]
			this.ctx.beginPath()
			this.ctx.arc(p.u * this.w, p.v * this.h, this.r, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

		this.treePot.innerHTML = `<h2>Which color is at coordinates x and y?</h2>` + this.getTree(this.dt.root)

	}
}


