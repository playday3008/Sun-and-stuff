let core

window.onload = _=>{

	const s = new Range({width: 280, value: 1, class: `input`, min: 1, max: 3, scale: 2, label: `Stride`, labelWidth: 80, step: 1})
	const p = new Range({width: 280, value: 0, class: `input`, min: 0, max: 1, scale: 1, label: `Padding`, labelWidth: 80, step: 1})
	const k1 = new Button({n: `Edges`, class: `go`})
	const k2 = new Button({n: `Blur`, class: `go`})
	const k3 = new Button({n: `Sharpen`, class: `go`})
	const k4 = new Button({n: `Top sobel`, class: `go`})
	const k5 = new Button({n: `Bottom sobel`, class: `go`})
	const k6 = new Button({n: `Left sobel`, class: `go`})
	const k7 = new Button({n: `Right sobel`, class: `go`})
	const k8 = new Button({n: `Identity`, class: `go`})

	const rgb = new Button({n: `All`, class: `go`})
	const r = new Button({n: `R`, class: `go`})
	r.classList.add(`redChannel`)
	const g = new Button({n: `G`, class: `go`})
	g.classList.add(`greenChannel`)
	const b = new Button({n: `B`, class: `go`})
	b.classList.add(`blueChannel`)

	const dual = document.createElement(`div`)
	dual.classList.add(`dual`)
	document.body.appendChild(dual)

	const left = document.createElement(`div`)
	left.classList.add(`left`)
	dual.appendChild(left)

	const right = document.createElement(`div`)
	right.classList.add(`right`)
	dual.appendChild(right)

	const kerCont = document.createElement(`div`)
	kerCont.classList.add(`kernelContainer`)
	right.appendChild(kerCont)

	left.appendChild(s)
	left.appendChild(p)

	const rgb_label = document.createElement(`div`)
    rgb_label.classList.add(`label`)
    rgb_label.innerHTML = `Channels`
    left.appendChild(rgb_label)

    left.appendChild(rgb)
    rgb.classList.add(`active`)
    left.appendChild(r)
    left.appendChild(g)
    left.appendChild(b)

    left.appendChild(document.createElement(`br`))

	const kernel_label = document.createElement(`div`)
    kernel_label.classList.add(`label`)
    kernel_label.innerHTML = `Kernels`
    left.appendChild(kernel_label)

    left.appendChild(k1)
    left.appendChild(k2)
    left.appendChild(k3)
    left.appendChild(k4)
    left.appendChild(k5)
    left.appendChild(k6)
    left.appendChild(k7)
    left.appendChild(k8)

	core = new Core(document.querySelector(`.canvas`), document.querySelector(`.original`), document.querySelector(`.source`), kerCont, document.querySelector(`.overlayOriginal`), document.querySelector(`.overlayConvolved`))

	rgb.data.onchange = v=>{
		core.channels = 0
		handleRgb(rgb, [r,g,b])
	}
	r.data.onchange = v=>{
		core.channels = 1
		handleRgb(r, [rgb,g,b])
	}
	g.data.onchange = v=>{
		core.channels = 2
		handleRgb(g, [r,rgb,b])
	}
	b.data.onchange = v=>{
		core.channels = 3
		handleRgb(b, [r,g,rgb])
	}

	s.data.onchange = v=>{
		core.stride = v
	}
	p.data.onchange = v=>{
		core.padding = v
	}
	k1.data.onchange = v=>{
		core.setkernel([-1,-1,-1,-1,8,-1,-1,-1,-1])
	}
	k2.data.onchange = v=>{
		core.setkernel([.0625, .125, .0625, .125, .25, .125, .0625, .125, .0625])
	}
	k3.data.onchange = v=>{
		core.setkernel([0, -1, 0, -1, 5, -1, 0, -1, 0])
	}
	k4.data.onchange = v=>{
		core.setkernel([1, 2, 1, 0, 0, 0, -1, -2, -1])
	}
	k5.data.onchange = v=>{
		core.setkernel([-1, -2, -1, 0, 0, 0, 1, 2, 1])
	}
	k6.data.onchange = v=>{
		core.setkernel([-1, 0, 1, -2, 0, 2, -1, 0, 1])
	}
	k7.data.onchange = v=>{
		core.setkernel([1, 0, -1, 2, 0, -2, 1, 0, -1])
	}
	k8.data.onchange = v=>{
		core.setkernel([0, 0, 0, 0, 1, 0, 0, 0, 0])
	}

	function handleRgb(a,p){
		a.classList.add(`active`)
		for (let i = 0; i < p.length; i++){
			p[i].classList.remove(`active`)
		}
	}

}

class Core{

	constructor(canvas, original, source, kernel, overlayOriginal, overlayConvolved) {

		this.source = source
		this.canvas = canvas
		this.kernelContainer = kernel
		this.ratio = 1
		this.resolution = 48

		this.canvas.width = this.w = this.resolution
		this.canvas.height = this.h = this.resolution
		this.ctx = this.canvas.getContext(`2d`)
		this.ctx.lineWidth = this.ratio
		this.ctx.font = 10 * this.ratio + `px Monospace`
		this.ctx.textAlign = `center`
		this.ctx.textBaseline = `middle`

		this.original = original
		this.original.width = this.w
		this.original.height = this.h
		this.octx = this.original.getContext(`2d`)

		this.overlayOriginal = overlayOriginal
		this.overlayOriginal.width = 400 * devicePixelRatio
		this.overlayOriginal.height = 400 * devicePixelRatio
		this.ooctx = this.overlayOriginal.getContext(`2d`)

		this.overlayConvolved = overlayConvolved
		this.overlayConvolved.width = 400 * devicePixelRatio
		this.overlayConvolved.height = 400 * devicePixelRatio
		this.occtx = this.overlayConvolved.getContext(`2d`)

		this.ooctx.lineWidth = this.occtx.lineWidth = devicePixelRatio * 2

		this.channels = 0
		this.selectedPixel = -1
		this.realPixelSize = this.overlayOriginal.width / this.resolution

		this.padding = 0
		this.stride = 1
		this.kernel = [	-1,-1,-1,
						-1,8,-1,
						-1,-1,-1
		]

		this.setListeners()
		this.createKernelControl()
		this.initCamera()

	}

	setListeners(){

		this.overlayOriginal.addEventListener(`mousemove`, e=>{
			const x = Math.floor(e.offsetX / 400 * this.resolution)
			const y = Math.floor(e.offsetY / 400 * this.resolution)
			this.selectedPixel = x + y * this.resolution
			this.kernelContainer.classList.add(`reduced`)
			
		})
		this.overlayOriginal.addEventListener(`mouseout`, _=>{
			this.selectedPixel = -1
			this.setkernel(this.kernel)
			this.kernelContainer.classList.remove(`reduced`)
		})

	}

	setkernel(k){
		this.kernel = k
		for (let i = 0; i < this.kernelContainer.children.length; i++){

			const cell = this.kernelContainer.children[i]
			const value = cell.children[0]

			cell.kernelMemory = this.kernel[i]
			value.innerHTML = Math.floor(this.kernel[i] * 100) / 100
			const rgbv = Math.floor((this.kernel[i] + 2) / 4 * 256)
			cell.style.background = `rgb(${rgbv},${rgbv},${rgbv})`
			value.style.color = (this.kernel[i] >= 0 ? `#000` : `#FFF`)

		}
	}

	createKernelControl(){

		const cellSize = 64

		const container = this.kernelContainer

		for (let i = 0; i < 9; i++){

			const cell = document.createElement(`div`)
			cell.classList.add(`cell`)
			container.appendChild(cell)

			const value = document.createElement(`div`)
			value.classList.add(`value`)
			cell.appendChild(value)

			const rgbv = Math.floor((this.kernel[i] + 2) / 4 * 256)
			cell.style.background = `rgb(${rgbv},${rgbv},${rgbv})`
			value.style.color = (this.kernel[i] >= 0 ? `#000` : `#FFF`)
			value.innerHTML = this.kernel[i]
			cell.kernelMemory = this.kernel[i]

			cell.addEventListener(`click`, e=>{
				const v = (e.offsetX / cellSize - .5) * 4
				value.innerHTML = Math.floor(v * 100) / 100
				const rgbv = Math.floor(e.offsetX * 2.56)
				this.kernel[i] = v
				cell.kernelMemory = this.kernel[i]
			})
			cell.addEventListener(`mousemove`, e=>{
				const v = (e.offsetX / cellSize - .5) * 4
				this.kernel[i] = v
				const rgbv = Math.floor(e.offsetX * 2.56)
				value.innerHTML = Math.floor(v * 100) / 100
				value.style.color = (v >= 0 ? `#000` : `#FFF`)
				cell.style.background = `rgb(${rgbv},${rgbv},${rgbv})`
			})
			cell.addEventListener(`mouseleave`, e=>{
				this.kernel[i] = cell.kernelMemory
				value.innerHTML = Math.floor(this.kernel[i] * 100) / 100
				const rgbv = Math.floor((this.kernel[i] + 2) / 4 * 256)
				cell.style.background = `rgb(${rgbv},${rgbv},${rgbv})`
				value.style.color = (this.kernel[i] >= 0 ? `#000` : `#FFF`)
			})

		}

	}

	initCamera(){

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
		        this.source.srcObject = stream
		        this.source.play()
		        this.source.onloadeddata = _=>{
		        	this.run()
		        }
		        
		    })
		} else {

			this.source = new Image()
			this.source.src = `data:image/png;base64,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`
			this.run()

		}

	}

	run(){
		requestAnimationFrame(this.run.bind(this))
		this.setup(this.source)
		this.convolute(this.pixels)
		this.updateKernelImage()
	}

	updateKernelImage(){

		if (this.selectedPixel !== -1){

			const x = this.selectedPixel % this.resolution
			const y = Math.floor(this.selectedPixel / this.resolution)
			const isLeft = (x === 0)
			const isRight = (x === this.resolution - 1)
			const isTop = (y === 0)
			const isBottom = (y === this.resolution - 1)

			for (let i = 0; i < this.kernelContainer.children.length; i++){

				const cell = this.kernelContainer.children[i]
				const value = cell.children[0]

				const dx = i % 3 - 1
				const dy = Math.floor(i / 3) - 1

				let cellRed = 0
				let cellGreen = 0
				let cellBlue = 0
				const index = (this.selectedPixel + dx + dy * this.resolution) * 4
				const edgeCase = (isLeft && dx === -1) || (isRight && dx === 1) || (isTop && dy === -1) || (isBottom && dy === 1)

				if (!edgeCase){
					cellRed = this.pixels.data[index]
					cellGreen = this.pixels.data[index + 1]
					cellBlue = this.pixels.data[index + 2]
				}

				cell.style.background = `rgb(${cellRed},${cellGreen},${cellBlue})`
				const kernelValue = Math.floor(this.kernel[i] * 100) / 100
				value.innerHTML = (!edgeCase || this.padding) ? this.channels ? `${edgeCase ? 0 : this.pixels.data[index + this.channels - 1]}&nbsp;×&nbsp;${kernelValue}` : (edgeCase ? 0 : `${this.pixels.data[index]}&nbsp;×&nbsp;${kernelValue}<br/>${this.pixels.data[index+1]}&nbsp;×&nbsp;${kernelValue}<br/>${this.pixels.data[index+2]}&nbsp;×&nbsp;${kernelValue}`) : ``

			}
		}

	}

	setup(img){

		this.ctx.fillStyle = `#000`
		this.ctx.fillRect(0, 0, this.w, this.h)

		const scale = Math.max(this.w / (img.naturalWidth || img.clientWidth), this.h / (img.naturalHeight || img.clientHeight))
		this.ctx.save()
		this.ctx.translate(this.w/2, this.h/2)
		this.ctx.scale(scale, scale)
		this.ctx.drawImage(img, -img.naturalWidth / 2 || -img.clientWidth / 2, -img.naturalHeight / 2 || -img.clientHeight / 2)
		this.ctx.restore()

		this.octx.drawImage(this.canvas, 0, 0)

		this.pixels = this.ctx.getImageData(0,0,this.w,this.h)
		if (this.channels){

			for (let i = 0; i < this.pixels.data.length; i += 4){

				this.pixels.data[i] = this.channels === 1 ? this.pixels.data[i] : 0
				this.pixels.data[i + 1] = this.channels === 2 ? this.pixels.data[i + 1] : 0
				this.pixels.data[i + 2] = this.channels === 3 ? this.pixels.data[i + 2] : 0

			}

			this.octx.putImageData(this.pixels, 0, 0)

		}

		this.ooctx.clearRect(0, 0, this.overlayOriginal.width, this.overlayOriginal.height)
		this.occtx.clearRect(0, 0, this.overlayOriginal.width, this.overlayOriginal.height)

		if (this.selectedPixel !== -1){

			this.ooctx.save()
			this.ooctx.translate((this.selectedPixel % this.resolution - 1) * this.realPixelSize, Math.floor(this.selectedPixel / this.resolution - 1) * this.realPixelSize)
			this.ooctx.strokeStyle = `#FF0`
			this.ooctx.strokeRect(0, 0, this.realPixelSize * 3, this.realPixelSize * 3)
			this.ooctx.restore()

			const edgeCase = !this.padding && (this.selectedPixel < this.resolution || this.selectedPixel >= this.resolution * (this.resolution - 1) || !(this.selectedPixel % this.resolution) || !((this.selectedPixel + 1) % this.resolution))

			if (!edgeCase){
				this.occtx.save()
				this.occtx.translate((this.selectedPixel % this.resolution) * this.realPixelSize, Math.floor(this.selectedPixel / this.resolution) * this.realPixelSize)
				this.occtx.strokeStyle = `#0F0`
				this.occtx.strokeRect(0, 0, this.realPixelSize, this.realPixelSize)
				this.occtx.restore()
			}

		}

	}

	convolute(pixels){

		let timer = performance.now()
		let ws = Math.ceil(this.w / this.stride)
		let hs = Math.ceil(this.h / this.stride)
		let out = this.ctx.createImageData(ws, hs)

		const right = 4
		const down = this.w * 4
		const up = -down
		const left = -4

		const p = pixels.data

		for (let y = 1 - this.padding; y < this.h - 1 + this.padding; y += this.stride){
			for (let x = 1 - this.padding; x < this.w - 1 + this.padding; x += this.stride){


				const i = y * this.w * 4 + x * 4
				const is = Math.floor(y / this.stride) * ws * 4 + Math.floor(x / this.stride) * 4

				const le = (x === 0)
				const te = (y === 0)
				const re = (x === this.w - 1)
				const be = (y === this.h - 1)

				let values = []

				for (let j = 0; j < 3; j++){
					let tl = (le || te ? 0 : p[i + up + left + j] * this.kernel[0])
					let tc = (te ? 0 : p[i + up + j] * this.kernel[1])
					let tr = (re || te ? 0 : p[i + up + right + j] * this.kernel[2])
					let cl = (le ? 0 : p[i + left + j] * this.kernel[3])
					let cc = p[i + j] * this.kernel[4]
					let cr = (re ? 0 : p[i + right + j] * this.kernel[5])
					let bl = (le || be ? 0 : p[i + down + left + j] * this.kernel[6])
					let bc = (be ? 0 : p[i + down + j] * this.kernel[7])
					let br = (re || be ? 0 : p[i + down + right + j] * this.kernel[8])
					values[j] = Math.max(0, Math.floor(tl + tc + tr + cl + cc + cr + bl + bc + br))
				}

				if (this.channels){
					// out.data[is] = this.channels === 1 ? values[this.channels-1] : 0
					// out.data[is + 1] = this.channels === 2 ? values[this.channels-1] : 0
					// out.data[is + 2] = this.channels === 3 ? values[this.channels-1] : 0
					out.data[is] = values[this.channels-1]
					out.data[is + 1] = values[this.channels-1]
					out.data[is + 2] = values[this.channels-1]
					out.data[is + 3] = 255
				} else {
					out.data[is] = values[0]
					out.data[is + 1] = values[1]
					out.data[is + 2] = values[2]
					out.data[is + 3] = 255
				}

			}
		}
		
		this.convoluted = out

		this.ctx.clearRect(0, 0, this.w, this.h)
		let d = (this.w - this.w / this.stride) / 2
		this.ctx.putImageData(this.convoluted, d, d)

	}

}


