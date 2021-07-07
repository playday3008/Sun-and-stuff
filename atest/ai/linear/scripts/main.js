let core

window.onload = _=>{

	const w = new Range({width: 500, value: 1, class: `input`, min: -5, max: 5, scale: 10, label: `Manual weight`, labelWidth: 200})
	const b = new Range({width: 500, value: 0, class: `input`, min: -5, max: 5, scale: 10, label: `Manual bias`, labelWidth: 200})
	const lr = new Range({width: 500, value: .001, class: `input`, min: 0, max: .01, scale: 1, label: `Learning rate`, labelWidth: 200})

	const p1 = new Button({class: `button`, n: `Line-ish`})
	const p2 = new Button({class: `button`, n: `Stray points`})
	const p3 = new Button({class: `button`, n: `Blob`})
	const p4 = new Button({class: `button`, n: `Random 32`})

	const clear = new Button({class: `button`, n: `Clear`})
	clear.style.backgroundColor = `#67595f`

	document.body.appendChild(w)
	document.body.appendChild(b)
	document.body.appendChild(lr)

	document.body.appendChild(p1)
	document.body.appendChild(p2)
	document.body.appendChild(p3)
	document.body.appendChild(p4)

	document.body.appendChild(clear)

	core = new Core(document.querySelector(`.canvas`), w, b)

	w.data.onchange = v=>{
		core.weight = v
	}
	b.data.onchange = v=>{
		core.bias = v
	}
	clear.data.onchange = _=>{
		core.points = []
	}
	lr.data.onchange = v=>{
		core.learningRate = v
	}
	p1.data.onchange = _=>{
		core.points = [{"position":{"x":130,"y":184},"value":{"x":-6.7,"y":4.16}},{"position":{"x":320,"y":264},"value":{"x":-4.8,"y":3.36}},{"position":{"x":570,"y":346},"value":{"x":-2.3000000000000003,"y":2.54}},{"position":{"x":802,"y":460},"value":{"x":0.02,"y":1.4000000000000001}},{"position":{"x":1040,"y":550},"value":{"x":2.4,"y":0.5}},{"position":{"x":1334,"y":684},"value":{"x":5.34,"y":-0.84}},{"position":{"x":1542,"y":744},"value":{"x":7.42,"y":-1.44}},{"position":{"x":1588,"y":772},"value":{"x":7.88,"y":-1.72}},{"position":{"x":1292,"y":664},"value":{"x":4.92,"y":-0.64}},{"position":{"x":1024,"y":532},"value":{"x":2.24,"y":0.68}},{"position":{"x":810,"y":434},"value":{"x":0.1,"y":1.6600000000000001}},{"position":{"x":560,"y":358},"value":{"x":-2.4,"y":2.42}},{"position":{"x":410,"y":250},"value":{"x":-3.9,"y":3.5}},{"position":{"x":204,"y":282},"value":{"x":-5.96,"y":3.18}},{"position":{"x":78,"y":212},"value":{"x":-7.22,"y":3.88}},{"position":{"x":60,"y":158},"value":{"x":-7.4,"y":4.42}},{"position":{"x":214,"y":230},"value":{"x":-5.86,"y":3.7}},{"position":{"x":540,"y":356},"value":{"x":-2.6,"y":2.44}},{"position":{"x":764,"y":434},"value":{"x":-0.36,"y":1.6600000000000001}},{"position":{"x":690,"y":384},"value":{"x":-1.1,"y":2.16}},{"position":{"x":808,"y":454},"value":{"x":0.08,"y":1.46}},{"position":{"x":990,"y":542},"value":{"x":1.9000000000000001,"y":0.58}},{"position":{"x":1216,"y":636},"value":{"x":4.16,"y":-0.36}},{"position":{"x":1402,"y":748},"value":{"x":6.0200000000000005,"y":-1.48}},{"position":{"x":1538,"y":786},"value":{"x":7.38,"y":-1.86}},{"position":{"x":1450,"y":684},"value":{"x":6.5,"y":-0.84}},{"position":{"x":934,"y":470},"value":{"x":1.34,"y":1.3}},{"position":{"x":900,"y":512},"value":{"x":1,"y":0.88}},{"position":{"x":630,"y":406},"value":{"x":-1.7,"y":1.94}},{"position":{"x":400,"y":324},"value":{"x":-4,"y":2.7600000000000002}},{"position":{"x":470,"y":310},"value":{"x":-3.3000000000000003,"y":2.9}},{"position":{"x":308,"y":226},"value":{"x":-4.92,"y":3.74}},{"position":{"x":1114,"y":608},"value":{"x":3.14,"y":-0.08}},{"position":{"x":1226,"y":590},"value":{"x":4.26,"y":0.1}}]
	}
	p2.data.onchange = _=>{
		core.points = [{"position":{"x":64,"y":942},"value":{"x":-7.36,"y":-3.42}},{"position":{"x":288,"y":822},"value":{"x":-5.12,"y":-2.22}},{"position":{"x":364,"y":882},"value":{"x":-4.36,"y":-2.82}},{"position":{"x":620,"y":770},"value":{"x":-1.8,"y":-1.7}},{"position":{"x":856,"y":740},"value":{"x":0.56,"y":-1.4000000000000001}},{"position":{"x":1216,"y":718},"value":{"x":4.16,"y":-1.18}},{"position":{"x":1392,"y":588},"value":{"x":5.92,"y":0.12}},{"position":{"x":1598,"y":546},"value":{"x":7.98,"y":0.54}},{"position":{"x":1328,"y":640},"value":{"x":5.28,"y":-0.4}},{"position":{"x":986,"y":702},"value":{"x":1.86,"y":-1.02}},{"position":{"x":686,"y":830},"value":{"x":-1.1400000000000001,"y":-2.3000000000000003}},{"position":{"x":424,"y":800},"value":{"x":-3.7600000000000002,"y":-2}},{"position":{"x":222,"y":916},"value":{"x":-5.78,"y":-3.16}},{"position":{"x":220,"y":916},"value":{"x":-5.8,"y":-3.16}},{"position":{"x":88,"y":896},"value":{"x":-7.12,"y":-2.96}},{"position":{"x":58,"y":856},"value":{"x":-7.42,"y":-2.56}},{"position":{"x":256,"y":864},"value":{"x":-5.44,"y":-2.64}},{"position":{"x":602,"y":896},"value":{"x":-1.98,"y":-2.96}},{"position":{"x":664,"y":802},"value":{"x":-1.36,"y":-2.02}},{"position":{"x":502,"y":816},"value":{"x":-2.98,"y":-2.16}},{"position":{"x":948,"y":682},"value":{"x":1.48,"y":-0.8200000000000001}},{"position":{"x":1172,"y":662},"value":{"x":3.72,"y":-0.62}},{"position":{"x":1108,"y":738},"value":{"x":3.08,"y":-1.3800000000000001}},{"position":{"x":860,"y":782},"value":{"x":0.6,"y":-1.82}},{"position":{"x":1430,"y":662},"value":{"x":6.3,"y":-0.62}},{"position":{"x":1538,"y":668},"value":{"x":7.38,"y":-0.68}},{"position":{"x":174,"y":332},"value":{"x":-6.26,"y":2.68}},{"position":{"x":522,"y":120},"value":{"x":-2.7800000000000002,"y":4.8}},{"position":{"x":1522,"y":998},"value":{"x":7.22,"y":-3.98}},{"position":{"x":1542,"y":566},"value":{"x":7.42,"y":0.34}},{"position":{"x":388,"y":838},"value":{"x":-4.12,"y":-2.38}},{"position":{"x":132,"y":862},"value":{"x":-6.68,"y":-2.62}}]
	}
	p3.data.onchange = _=>{
		core.points = [{"position":{"x":1096,"y":484},"value":{"x":2.96,"y":1.16}},{"position":{"x":976,"y":660},"value":{"x":1.76,"y":-0.6}},{"position":{"x":1236,"y":714},"value":{"x":4.36,"y":-1.1400000000000001}},{"position":{"x":1172,"y":890},"value":{"x":3.72,"y":-2.9}},{"position":{"x":1074,"y":774},"value":{"x":2.74,"y":-1.74}},{"position":{"x":1286,"y":526},"value":{"x":4.86,"y":0.74}},{"position":{"x":1442,"y":414},"value":{"x":6.42,"y":1.86}},{"position":{"x":1444,"y":414},"value":{"x":6.44,"y":1.86}},{"position":{"x":1444,"y":612},"value":{"x":6.44,"y":-0.12}},{"position":{"x":1402,"y":742},"value":{"x":6.0200000000000005,"y":-1.42}},{"position":{"x":1072,"y":618},"value":{"x":2.72,"y":-0.18}},{"position":{"x":1070,"y":616},"value":{"x":2.7,"y":-0.16}},{"position":{"x":924,"y":596},"value":{"x":1.24,"y":0.04}},{"position":{"x":1066,"y":514},"value":{"x":2.66,"y":0.86}},{"position":{"x":1066,"y":514},"value":{"x":2.66,"y":0.86}},{"position":{"x":1222,"y":452},"value":{"x":4.22,"y":1.48}},{"position":{"x":1220,"y":634},"value":{"x":4.2,"y":-0.34}},{"position":{"x":1038,"y":716},"value":{"x":2.38,"y":-1.16}},{"position":{"x":976,"y":798},"value":{"x":1.76,"y":-1.98}},{"position":{"x":1190,"y":672},"value":{"x":3.9,"y":-0.72}},{"position":{"x":1178,"y":580},"value":{"x":3.7800000000000002,"y":0.2}},{"position":{"x":1164,"y":498},"value":{"x":3.64,"y":1.02}},{"position":{"x":1340,"y":628},"value":{"x":5.4,"y":-0.28}},{"position":{"x":1288,"y":754},"value":{"x":4.88,"y":-1.54}},{"position":{"x":1288,"y":754},"value":{"x":4.88,"y":-1.54}},{"position":{"x":1188,"y":754},"value":{"x":3.88,"y":-1.54}},{"position":{"x":1048,"y":620},"value":{"x":2.48,"y":-0.2}},{"position":{"x":1006,"y":478},"value":{"x":2.06,"y":1.22}},{"position":{"x":1288,"y":468},"value":{"x":4.88,"y":1.32}},{"position":{"x":1326,"y":336},"value":{"x":5.26,"y":2.64}},{"position":{"x":1428,"y":472},"value":{"x":6.28,"y":1.28}},{"position":{"x":1472,"y":550},"value":{"x":6.72,"y":0.5}},{"position":{"x":1502,"y":714},"value":{"x":7.0200000000000005,"y":-1.1400000000000001}},{"position":{"x":1562,"y":538},"value":{"x":7.62,"y":0.62}},{"position":{"x":1502,"y":318},"value":{"x":7.0200000000000005,"y":2.82}},{"position":{"x":484,"y":944},"value":{"x":-3.16,"y":-3.44}},{"position":{"x":416,"y":1078},"value":{"x":-3.84,"y":-4.78}},{"position":{"x":266,"y":944},"value":{"x":-5.34,"y":-3.44}},{"position":{"x":238,"y":786},"value":{"x":-5.62,"y":-1.86}},{"position":{"x":90,"y":866},"value":{"x":-7.1000000000000005,"y":-2.66}},{"position":{"x":168,"y":1030},"value":{"x":-6.32,"y":-4.3}},{"position":{"x":610,"y":720},"value":{"x":-1.9000000000000001,"y":-1.2}},{"position":{"x":422,"y":800},"value":{"x":-3.7800000000000002,"y":-2}},{"position":{"x":750,"y":828},"value":{"x":-0.5,"y":-2.2800000000000002}},{"position":{"x":784,"y":674},"value":{"x":-0.16,"y":-0.74}},{"position":{"x":658,"y":822},"value":{"x":-1.42,"y":-2.22}},{"position":{"x":470,"y":862},"value":{"x":-3.3000000000000003,"y":-2.62}},{"position":{"x":944,"y":736},"value":{"x":1.44,"y":-1.36}},{"position":{"x":1176,"y":324},"value":{"x":3.7600000000000002,"y":2.7600000000000002}},{"position":{"x":1254,"y":184},"value":{"x":4.54,"y":4.16}},{"position":{"x":1400,"y":174},"value":{"x":6,"y":4.26}},{"position":{"x":1500,"y":884},"value":{"x":7,"y":-2.84}},{"position":{"x":1558,"y":990},"value":{"x":7.58,"y":-3.9}},{"position":{"x":1272,"y":820},"value":{"x":4.72,"y":-2.2}},{"position":{"x":1458,"y":848},"value":{"x":6.58,"y":-2.48}},{"position":{"x":1524,"y":814},"value":{"x":7.24,"y":-2.14}},{"position":{"x":662,"y":998},"value":{"x":-1.3800000000000001,"y":-3.98}},{"position":{"x":322,"y":542},"value":{"x":-4.78,"y":0.58}},{"position":{"x":1108,"y":374},"value":{"x":3.08,"y":2.2600000000000002}}]
	}
	p4.data.onchange = _=>{
		const points = []

		for (let i = 0; i < 32; i++){

			const x = Math.random() * core.w
			const y = Math.random() * core.h

			points.push({
				position: {
					x: x, 
					y: y
				},
				value: {
					x: (x - core.w * .5) * core.scale,
					y: -(y - core.h * .5) * core.scale
				}
			})

		}

		core.points = points
	}

}

class Core{

	constructor(canvas, weightElement, biasElement) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 13 * this.ratio
		this.ctx.font = this.fontSize + `px Verdana`
		this.ctx.lineWidth = this.ratio

		this.weightElement = weightElement
		this.biasElement = biasElement
		
		this.color = {
			pale: `#FAFAF9`,
			class: `#666`,
			axes: `#BBB`,
			line: `#0003`,
			mse: `#EC5959`,
			mae: `#7163C7`,
			overlay: `#333`
		}
		this.points = []
		this.mse = 0
		this.mae = 0
		this.error = 0
		this.weight = 1
		this.bias = 0
		this.mse_weight = 1
		this.mse_bias = 0
		this.mae_weight = 1
		this.mae_bias = 0
		this.learningRate = .001
		this.pointRadius = this.ratio * 4
		this.notch = this.ratio * 6
		this.scale = .01
		this.dx = 1 / this.scale
		this.range = Math.ceil(this.w * .5 / this.dx)

		this.setListeners()
		this.update()
	}

	setListeners(){

		this.canvas.addEventListener(`mousedown`, e=>{
			const x = e.offsetX * this.ratio
			const y = e.offsetY * this.ratio
			const point = {
				position: {
					x: x, 
					y: y
				},
				value: {
					x: (x - this.w * .5) * this.scale,
					y: -(y - this.h * .5) * this.scale
				}
			}
			this.points.push(point)
		})

	}

	adjust(){

		if (this.points.length > 0){

			let mse = 0
			let mae = 0
			let error = 0

			let av_mse_weight = 0
			let av_mse_bias = 0
			let av_mae_weight = 0
			let av_mae_bias = 0

			for (let p of this.points){

				const ae = p.value.y - (p.value.x * this.mae_weight + this.mae_bias) > 0 ? 1 : -1
				const se = 2 * (p.value.y - (p.value.x * this.mse_weight + this.mse_bias))

				mse += (p.value.y - (p.value.x * this.mse_weight + this.mse_bias)) ** 2
				mae += Math.abs(p.value.y - (p.value.x * this.mae_weight + this.mae_bias))
				error += (p.value.y - (p.value.x * this.weight + this.bias)) ** 2

				av_mse_weight += se * p.value.x * this.learningRate
				av_mse_bias += se * this.learningRate * 10

				av_mae_weight += ae * p.value.x * this.learningRate
				av_mae_bias += ae * this.learningRate * 10

			}

			this.mse = mse / this.points.length
			this.mae = mae / this.points.length
			this.error = error / this.points.length

			this.mse_weight += av_mse_weight / this.points.length
			this.mse_bias += av_mse_bias / this.points.length
			this.mae_weight += av_mae_weight / this.points.length
			this.mae_bias += av_mae_bias / this.points.length

			this.weightElement.data.update(this.weight)
			this.biasElement.data.update(this.bias)

		}

	}

	drawPoints(){

		for (let p of this.points){

			this.ctx.fillStyle = this.color.class
			this.ctx.beginPath()
			this.ctx.arc(p.position.x, p.position.y, this.pointRadius, 0, Math.PI * 2)
			this.ctx.closePath()
			this.ctx.fill()

		}

	}

	drawAxes(){

		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = this.color.axes
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.font = this.notch * 2 + `px monospace`
		this.ctx.lineWidth = this.ratio

		this.ctx.beginPath()
		this.ctx.moveTo(0, this.h * .5)
		this.ctx.lineTo(this.w, this.h * .5)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(this.w * .5, 0)
		this.ctx.lineTo(this.w * .5, this.h)
		this.ctx.stroke()

		this.ctx.translate(this.w * .5, this.h * .5)
		for (let x = -this.range; x <= this.range; x++){

			this.ctx.beginPath()
			this.ctx.moveTo(x * this.dx, 0)
			this.ctx.lineTo(x * this.dx, -this.notch)
			this.ctx.stroke()
			this.ctx.fillText(x, x === 0 ? -this.notch * 2 : x * this.dx, this.notch * 2)

		}

		for (let y = -this.range; y <= this.range; y++){

			if (y === 0) continue
			this.ctx.beginPath()
			this.ctx.moveTo(0, y * this.dx)
			this.ctx.lineTo(this.notch, y * this.dx)
			this.ctx.stroke()
			this.ctx.fillText(-y, -this.notch * 2.4, y * this.dx)

		}

		this.ctx.restore()

	}

	drawLines(){

		this.ctx.save()
		this.ctx.translate(this.w * .5, this.h * .5)
		this.ctx.scale(1,-1)
		this.ctx.lineWidth = this.ratio * 4

		//MSE
		this.ctx.strokeStyle = this.color.mse
		this.ctx.beginPath()
		this.ctx.moveTo(-this.range * this.dx, -this.range * this.dx * this.mse_weight + this.mse_bias * this.dx)
		this.ctx.lineTo(this.range * this.dx, this.range * this.dx * this.mse_weight + this.mse_bias * this.dx)
		this.ctx.stroke()

		//MSE
		this.ctx.strokeStyle = this.color.mae
		this.ctx.beginPath()
		this.ctx.moveTo(-this.range * this.dx, -this.range * this.dx * this.mae_weight + this.mae_bias * this.dx)
		this.ctx.lineTo(this.range * this.dx, this.range * this.dx * this.mae_weight + this.mae_bias * this.dx)
		this.ctx.stroke()

		//Manual
		this.ctx.strokeStyle = this.color.line
		this.ctx.beginPath()
		this.ctx.moveTo(-this.range * this.dx, -this.range * this.dx * this.weight + this.bias * this.dx)
		this.ctx.lineTo(this.range * this.dx, this.range * this.dx * this.weight + this.bias * this.dx)
		this.ctx.stroke()

		this.ctx.restore()

	}

	drawTextOverlay(){

		const margin = this.fontSize * 14

		this.ctx.save()
		this.ctx.translate(this.notch * 2, this.notch * 2)
		this.ctx.textBaseline = `top`
		this.ctx.fillStyle = this.color.mse
		this.ctx.fillText(`Mean square error`, 0, 0)
		this.ctx.fillText(this.civilize(this.mse), margin, 0)
		// this.ctx.fillText(`MSE method equation:`, 0, this.h - this.fontSize * 6)
		this.ctx.fillText(`y = ${this.civilize(this.mse_weight)}x ${this.mse_bias < 0 ? '–' : '+'} ${this.civilize(Math.abs(this.mse_bias))}`, margin * 1.4, 0)
		this.ctx.fillStyle = this.color.mae
		this.ctx.fillText(`Mean absolute error`, 0, this.fontSize * 1.4)
		this.ctx.fillText(this.civilize(this.mae), margin, this.fontSize * 1.4)
		// this.ctx.fillText(`MAE method equation:`, 0, this.h - this.fontSize * 4.6)
		this.ctx.fillText(`y = ${this.civilize(this.mae_weight)}x ${this.mae_bias < 0 ? '–' : '+'} ${this.civilize(Math.abs(this.mae_bias))}`, margin * 1.4, this.fontSize * 1.4)
		this.ctx.fillStyle = this.color.overlay
		this.ctx.fillText(`Your mean square error`, 0, this.fontSize * 2.8)
		this.ctx.fillText(this.civilize(this.error), margin, this.fontSize * 2.8)
		// this.ctx.fillText(`Your equation:`, 0, this.h - this.fontSize * 3.2)
		this.ctx.fillText(`y = ${this.civilize(this.weight)}x ${this.bias < 0 ? '–' : '+'} ${this.civilize(Math.abs(this.bias))}`, margin * 1.4, this.fontSize * 2.8)
		this.ctx.restore()

		
		if (!this.points.length){
			this.ctx.save()
			this.ctx.fillStyle = this.color.overlay
			this.ctx.textAlign = `center`
			this.ctx.textBaseline = `middle`
			this.ctx.fillText(`Click to create points`, this.w * .75, this.h * .75)
			this.ctx.restore()
		}

	}

	civilize(n){
		return Math.floor(n * 1000) / 1000
	}

	update(){

		requestAnimationFrame(_=>{this.update()})

		this.ctx.fillStyle = this.color.pale
		this.ctx.fillRect(0, 0, this.w, this.h)

		this.drawAxes()
		this.drawPoints()
		this.drawLines()
		this.drawTextOverlay()

		this.adjust()

	}

}
