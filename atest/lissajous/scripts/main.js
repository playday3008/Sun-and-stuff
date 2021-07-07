let core;
window.onload = ()=>{

	let f1 = new Range({ width: 500, value: 2, class: `input`, min: 1, max: 5, scale: 8, label: `2 Hz`, labelWidth: 160, step: .1})
	let f2 = new Range({ width: 500, value: 2.5, class: `input`, min: 1, max: 5, scale: 8, label: `2.5 Hz`, labelWidth: 160, step: .1})
	let s = new Range({ width: 500, value: Math.PI / 2, class: `input`, min: 0, max: Math.PI, scale: 4, label: `Phase shift`, labelWidth: 160, step: .01})
	
	core = new Core(document.querySelector('.vessel'))

	document.body.appendChild(f1)
	document.body.appendChild(f2)
	document.body.appendChild(s)

	f1.data.onchange = v=>{
		f1.data.lab.innerText = v + ` Hz`
		core.setFrequency(v,false)
	}
	f2.data.onchange = v=>{
		f2.data.lab.innerText = v + ` Hz`
		core.setFrequency(false,v)
	}
	s.data.onchange = v=>{
		core.setShift(v)
	}
}

class Core {

	constructor(canvas) {

		this.canvas = canvas;
		this.ratio = window.devicePixelRatio || 1;
		this.canvas.width = this.w = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.h = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		this.vCanvas = document.createElement('canvas');
		this.vCanvas.width = this.canvas.width;
		this.vCanvas.height = this.canvas.height;
		this.vctx = this.vCanvas.getContext('2d');

		//DATA
		this.f1 = 2
		this.f2 = 2.5
		this.resolution = 2048
		this.range = Math.PI * 22
		this.radius = this.h / 4
		this.speed = .01
		this.shift = Math.PI / 2

		this.step = this.range / this.resolution
		this.phase = 0

		this.ctx.font = this.ratio * 10 + `px Courier`;
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`
		this.ctx.lineWidth = this.ratio
		this.ctx.lineCap = `round`

		this.update()
		this.run()

	}

	handleMouse(e){
		this.state.mode = false
		this.controls.s.data.toggle(false)
		this.updateSystem((e.clientX * this.ratio - this.w/2) / this.w, (e.clientY * this.ratio - this.h/2) / (this.h / Math.PI / 8));
		this.controls.a.data.update(this.state.a);
		this.controls.v.data.update(this.state.v);
	}

	setFrequency(f1, f2){
		if (f1) this.f1 = f1
		if (f2) this.f2 = f2
		this.update()
	}

	setShift(s){
		this.shift = s
		this.update()
	}

	run() {

		this.frameID = requestAnimationFrame(this.run.bind(this));
		this.frame();

	}

	frame(){

		this.ctx.fillStyle = '#112';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.draw();

	}

	lcm(a,b,max){
		
		let ab = a > b
		if (!max) max = 10000

		for (let i = 1; i < max; i++){

			let n = (ab ? a : b) * i
			if (n % (ab ? b : a) === 0) return n

		}
		return max
	}

	update(){

		this.vctx.clearRect(0, 0, this.w, this.h)

		this.vctx.save()
		this.vctx.translate(this.w/2, this.h/2)

		this.vctx.strokeStyle = `#305082`
		this.vctx.lineWidth = this.ratio * 2
		this.vctx.beginPath()
		this.vctx.moveTo(this.radius, Math.cos(this.shift) * this.radius)
		for (let i = 1; i < this.resolution; i++){
			let x = Math.cos(this.step * i * this.f1) * this.radius
			let y = Math.cos(this.step * i * this.f2 + this.shift) * this.radius
			this.vctx.lineTo(x, y)
		}

		this.vctx.stroke()
		this.vctx.restore()

	}

	draw(){

		//Prerendered path with green trace
		this.vctx.save()
		this.vctx.strokeStyle = `#48FF7B`
		this.vctx.lineCap = `round`
		this.vctx.lineWidth = this.ratio * 3
		this.vctx.beginPath()
		this.vctx.moveTo(Math.cos(this.phase * this.f1) * this.radius + this.w/2, Math.cos(this.phase * this.f2 + this.shift) * this.radius + this.h / 2)
		this.phase += this.speed
		let x = Math.cos(this.phase * this.f1) * this.radius + this.w/2
		let y = Math.cos(this.phase * this.f2 + this.shift) * this.radius + this.h / 2
		this.vctx.lineTo(x, y)
		this.vctx.stroke()
		this.vctx.restore()
		this.ctx.drawImage(this.vCanvas, 0, 0)

		//Top oscillator
		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = `#305082`
		this.ctx.translate(this.w/2, this.radius / 2)
		this.ctx.beginPath()
		this.ctx.moveTo(-this.radius, 0)
		this.ctx.lineTo(this.radius, 0)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(-this.radius, 0)
		this.ctx.lineTo(-this.radius, this.ratio * 4)
		this.ctx.stroke()
		this.ctx.fillText(`-1`, -this.radius, -this.ratio * 10)

		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(0, this.ratio * 4)
		this.ctx.stroke()
		this.ctx.fillText(`0`, 0, -this.ratio * 10)

		this.ctx.beginPath()
		this.ctx.moveTo(this.radius, 0)
		this.ctx.lineTo(this.radius, this.ratio * 4)
		this.ctx.stroke()
		this.ctx.fillText(`1`, this.radius, -this.ratio * 10)

		this.ctx.restore()

		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = `#ff8539`
		this.ctx.beginPath()
		this.ctx.arc(x, this.radius / 2, this.ratio * 4, 0, Math.PI * 2)
		this.ctx.fill()

		this.ctx.setLineDash([0,this.ratio * 12])
		this.ctx.beginPath()
		this.ctx.moveTo(x, this.radius / 2)
		this.ctx.lineTo(x, y)
		this.ctx.stroke()
		this.ctx.restore()

		//Left oscillator
		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = `#305082`
		this.ctx.translate(this.radius / 2, this.h/2)
		this.ctx.beginPath()
		this.ctx.moveTo(0, -this.radius)
		this.ctx.lineTo(0, this.radius)
		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.moveTo(0, -this.radius)
		this.ctx.lineTo(this.ratio * 4, -this.radius)
		this.ctx.stroke()
		this.ctx.fillText(`-1`, -this.ratio * 10, -this.radius)

		this.ctx.beginPath()
		this.ctx.moveTo(0, 0)
		this.ctx.lineTo(this.ratio * 4, 0)
		this.ctx.stroke()
		this.ctx.fillText(`0`, -this.ratio * 10, 0)

		this.ctx.beginPath()
		this.ctx.moveTo(0, this.radius)
		this.ctx.lineTo(this.ratio * 4, this.radius)
		this.ctx.stroke()
		this.ctx.fillText(`1`, -this.ratio * 10, this.radius)

		this.ctx.restore()

		this.ctx.save()
		this.ctx.fillStyle = this.ctx.strokeStyle = `#ff8539`
		this.ctx.beginPath()
		this.ctx.arc(this.radius / 2, y, this.ratio * 4, 0, Math.PI * 2)
		this.ctx.fill()

		this.ctx.setLineDash([0,this.ratio * 12])
		this.ctx.beginPath()
		this.ctx.moveTo(this.radius / 2, y)
		this.ctx.lineTo(x, y)
		this.ctx.stroke()
		this.ctx.restore()

		//White ball
		this.ctx.save()
		this.ctx.fillStyle = `#FFF`
		this.ctx.translate(x, y)
		this.ctx.beginPath()
		this.ctx.arc(0, 0, this.ratio * 4, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()
		this.ctx.restore()

	}

}