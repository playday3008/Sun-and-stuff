let core

window.onload = _=>{

	const f = new Range({width: 500, value: 0, class: `input`, min: 0, max: 100, scale: 4, label: `%`, labelWidth: 100})
	// const t = new Toggle({n1: `Skipping is on`, n2: `Skipping is off`, class: `go`})

	document.body.appendChild(f)
	// document.body.appendChild(t)

	core = new Core(document.querySelector(`.canvas`), f)

	f.data.onchange = v=>{
		core.auto = false
		core.f = Math.min(v * .01, .999999)
	}

	// t.data.onchange = v=>{
	// 	core.resnet = !core.resnet
	// 	core.update()
	// }

}

class Core{

	constructor(canvas, fslider) {

		this.canvas = canvas
		this.ratio = devicePixelRatio
		this.canvas.width = this.w = this.canvas.offsetWidth * this.ratio
		this.canvas.height = this.h = this.canvas.offsetHeight * this.ratio
		this.ctx = this.canvas.getContext(`2d`)
		this.fontSize = 24 * this.ratio
		this.ctx.font = this.fontSize + `px Georgia`
		this.ctx.lineWidth = this.ratio * 2
		this.ctx.strokeStyle = `#558`
		this.ctx.textBaseline = `middle`
		this.ctx.textAlign = `center`

		this.fslider = fslider

		this.steps = 13
		this.stepFrames = 60
		this.f = 0
		this.subf = 0
		this.df = 1 / (this.steps * this.stepFrames)
		this.i = 0

		this.auto = true

		this.codex = {
			"0": {s: [0,0,0,1], a: [0,1,0,1]},
			"1": {s: [1,0,1,1], a: [1,1,0,1]},
			"2": {s: [2,0,2,1], a: [2,1,0,1]},
			"3": {s: [3,0,3,1], a: [3,1,0,1]},
			"4": {s: [0,1,4,1], a: [4,1,0,1]},
			"5": {s: [1,1,5,1], a: [5,1,0,1]},
			"6": {s: [2,1,6,1], a: [5,1,1,1,0,2]},
			"7":  {a: [4,1,1,1,1,2,3,3]},
			"8":  {a: [3,1,1,1,2,2,2,3]},
			"9": {a: [2,1,1,1,3,2,2,3]},
			"10": {a: [1,1,1,1,0,3,2,3]},
			"11": {a: [0,1,1,1,1,3,2,3]}
		}
		this.states = {
			"0": `Feed forward`,
			"1": `Feed forward`,
			"2": `Feed forward`,
			"3": `Feed forward`,
			"4": `Feed forward`,
			"5": `Loss calculation`,
			"6": `Backpropagation`,
			"7": `Backpropagation`,
			"8": `Backpropagation`,
			"9": `Backpropagation`,
			"10":`Backpropagation`,
			"11":`Backpropagation`,
			"12": `Updating weights`
		}

		this.init()

	}

	init(){

		this.sprite = new Image()
		this.sprite.src = `chainrule/img/sprite.png`
		this.sprite.iw = 4
		this.sprite.size = Math.floor(this.w / 7)//128 * this.ratio
		this.sprite.cell = 256
		this.sprite.onload = _=>{this.update()}

	}

	update(){

		requestAnimationFrame(_=>{this.update()})

		this.ctx.clearRect(0, 0, this.w, this.h)

		if (this.auto){
			this.f += this.df
			if (this.f > 1) this.f = this.f % 1; else if (this.f === 1) this.f = .99999
			this.fslider.data.update(this.f * 100)
		}

		this.i = Math.floor(this.f * this.steps)
		this.subf = this.f * this.steps % (this.i || 1)

		for (let i in this.codex){
			const s = this.codex[i].s
			const a = this.codex[i].a

			if (s){
				this.ctx.save()
				this.ctx.globalAlpha = this.i < +i ? .3 : 1
				this.putSprite(s[0],s[1],s[2],s[3])
				this.ctx.restore()
			}

			if (a) {
				this.drawArcArrow(a[0], a[1], a[2], this.i < +i ? 0 : this.i === +i ? this.subf : 1, a[4], a[5], a[6], a[7])
			}
		}

		this.putSprite(3,1,0,2)
		this.drawYLine(this.i === 5 ? this.subf : this.i > 5 ? 1 : 0)

		this.drawStatus()

	}

	drawStatus(){

		this.ctx.save()
		this.ctx.translate(this.w * .5, this.sprite.size * .5)
		this.ctx.fillText(this.states[this.i], 0, 0)
		this.ctx.restore()

	}

	drawYLine(f){

		if (!f) return

		f = f < 0.5 ? 8 * f ** 4 : 1 - (-2 * f + 2) ** 4 / 2

		const s = this.sprite.size
		const ft1 = .890932988
		const ft2 = .9575746196
		this.ctx.strokeStyle = `#EDDCBB`

		this.ctx.beginPath()
		this.ctx.moveTo(s * 1, s * 2.5)
		this.ctx.lineTo(s * (1 + 5.25 * (f > ft1 ? 1 : f / ft1)), s * 2.5)
		if (f > ft1) this.ctx.arc(s * 6.25, s * 2.25, s * .25, Math.PI * .5, Math.PI * (.5 - .5 * (f > ft2 ? 1 : (f - ft1) / (ft2 - ft1))), 1)
		if (f > ft2) this.ctx.lineTo(s * 6.5, s * (2.25 - .25 * (f - ft2) / (1 - ft2)))
		this.ctx.stroke()

	}

	drawArcArrow(ix0, iy0, backwards, f, sx, sy, s2x, s2y){

		this.ctx.save()
		this.ctx.strokeStyle = backwards ? `#ED7C59` : `#76A0DF`
		this.ctx.translate((ix0 + 1) * this.sprite.size, (iy0 + .5) * this.sprite.size)
		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.sprite.size * .5, backwards ? Math.PI * .3 : -Math.PI * .7, backwards ? Math.PI * .3 + Math.PI * .4 * f : -Math.PI * .7 + Math.PI * .4 * f)
		this.ctx.stroke()

		this.ctx.globalAlpha = f

		if (sx !== undefined && sy !== undefined){
			this.putSprite(sx, sy, -.5, backwards ? .25 : -1.25)
		}
		if (s2x !== undefined && s2y !== undefined){
			this.putSprite(s2x, s2y, 0, backwards ? .25 : -1.25)
		}

		this.ctx.restore()

	}

	putSprite(ix, iy, iw, ih){

		this.ctx.drawImage(this.sprite, ix * this.sprite.cell, iy * this.sprite.cell, this.sprite.cell, this.sprite.cell, iw * this.sprite.size, ih * this.sprite.size, this.sprite.size, this.sprite.size)

	}

}


