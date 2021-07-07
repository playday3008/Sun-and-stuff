//version 1.3
class Button {
	constructor(a){

		this.onchange = a.onchange ? a.onchange : _=>{}
		this.n = a.n || `Do something`
		this.class = a.class

		this.el = document.createElement(`div`)
		this.el.style.display = `inline-block`
		this.el.style.padding = `10px 18px`
		this.el.style.font = `600 15px Lato, sans-serif`
		this.el.style.cursor = `pointer`
		this.el.style.borderRadius = `3px`
		if (this.class) this.el.classList.add(this.class)
		this.el.data = this

		this.el.addEventListener('click',()=>{
			this.onchange()
		})

		this.el.innerText = this.n

		return  this.el
	}
}

class Toggle {
	constructor(a){

		this.onchange = a.onchange ? a.onchange : _=>{}
		this.n1 = a.n1 || `turn on`
		this.n2 = a.n2 || `turn off`
		this.class = a.class
		this.class2 = a.class2
		this.on = false;

		this.el = document.createElement(`div`)
		this.el.style.display = `inline-block`
		this.el.style.padding = `10px 18px`
		this.el.style.font = `600 15px Lato, sans-serif`
		this.el.style.cursor = `pointer`
		this.el.style.borderRadius = `3px`
		if (this.class) this.el.classList.add(this.class)
		this.el.data = this

		this.el.addEventListener('click',()=>{
			this.toggle()
		})

		this.updateVisual(this.on)

		return  this.el
	}

	toggle(on){
		this.on = on !== undefined ? on : !this.on
		this.updateVisual(this.on)
		if (on === undefined) this.onchange();
	}

	updateVisual(state){
		this.el.innerHTML = state ? this.n2 : this.n1
		if (this.class2 && !state) this.el.classList.remove(this.class2); else if (this.class2 && state) this.el.classList.add(this.class2)
	}
}

class Range {

	constructor(a){

		if (!a) a = {}
		this.w = a.width || 300
		this.gap = 600 / this.w
		this.class = a.class
		this.value = a.value || 0
		let min = (a.min || 0), max = (a.max || 1)
		this.inv = min > max
		this.min = this.inv ? max : min
		this.max = this.inv ? min : max
		this.range = this.max - this.min
		this.scale = a.scale || false
		this.finalMark = a.finalMark
		this.trigger = a.trigger || `change`
		this.log = a.log
		this.step = a.step
		this.label = a.label
		this.formula = typeof a.formula === `function` ? a.formula : v=>Math.round(v*100)/100
		this.labelWidth = a.labelWidth
		this.onchange = a.onchange ? a.onchange : _=>{}

		this.wrap = document.createElement('div')
		if (this.class) this.wrap.classList.add(this.class)
		this.wrap.data = this

		this.innerWrap = document.createElement('div');
		this.innerWrap.style.display = `inline-block`
		this.innerWrap.style.verticalAlign = `super`
		this.innerWrap.style.position = `relative`
		this.innerWrap.style.width = this.w + `px`
		this.innerWrap.style.height = 2 + `px`
		this.wrap.appendChild(this.innerWrap)

		this.el = document.createElement('div')
		this.el.style.width = `100%`
		this.el.style.height = `100%`
		this.el.style.display = `inline-block`
		this.el.style.borderRadius = `6px`
		this.el.style.background = `#DDDDDB`
		this.innerWrap.appendChild(this.el)

		this.fill = document.createElement('div')
		this.fill.classList.add(`ss_rangeFill`)
		this.fill.style.background = `#000`
		this.fill.style.height = `300%`
		this.fill.style.borderRadius = `6px`
		this.fill.style.marginTop = `-2px`
		this.el.appendChild(this.fill)

		this.pluck = document.createElement('div')
		this.pluck.classList.add(`ss_rangePluck`)
		this.pluck.style.position = `absolute`
		this.pluck.style.borderRadius = `50%`
		this.pluck.style.top = `3px`
		this.pluck.style.transform = `translate(-13px,0)`
		this.pluck.style.background = `#fff`
		this.pluck.style.border = `3px solid #000`
		this.pluck.style.height = this.pluck.style.width = `14px`
		this.el.appendChild(this.pluck)

		this.control = document.createElement(`input`)
		this.control.setAttribute(`type`, `range`)
		this.control.setAttribute(`step`, a.step ? a.step : (this.max - this.min) / 1000)
		this.control.setAttribute(`min`, this.min)
		this.control.setAttribute(`max`, this.max)
		this.control.setAttribute(`value`, this.value)
		this.control.classList.add('ss_control')
		this.control.style.width = `100%`
		this.control.style.height = `48px`
		this.control.style.position = `absolute`
		this.control.style.top = `-12px`
		this.control.style.left = `0`
		this.control.style.cursor = `pointer`
		this.control.style.margin = `0`
		this.control.style.opacity = .001
		this.innerWrap.appendChild(this.control)

		this.control.addEventListener(`input`, e=>{
			this.handleChange(e)
		})
		if (this.trigger === `release`){
			this.control.addEventListener(`change`, e=>{this.handleTrigger(e)})
		}
		this.control.addEventListener(`touchstart`, e=>{this.handleTouch(e)})
		this.control.addEventListener(`touchmove`, e=>{this.handleTouch(e)})
		if (this.trigger === `release`){
			this.control.addEventListener(`touchend`, e=>{this.handleTrigger(e)})
		}

		if (this.label){
			this.lab = document.createElement('div')
			this.lab.innerText = this.label
			this.lab.style.display = `inline-block`
			if (this.labelWidth) this.lab.style.width = this.labelWidth + `px`
			this.lab.style.font = `16px Lato, sans-serif`
			this.lab.style.margin = `0 24px 0 0`
			this.wrap.prepend(this.lab)
		}

		if (this.scale){
			this.marks = document.createElement(`div`)
			this.marks.style.pointerEvents = `none`
			this.marks.style.width = this.w + `px`
			this.marks.style.position = `relative`
			this.innerWrap.appendChild(this.marks)

			for (let i = 0; i <= 1; i += 1 / this.scale){
				let mark = document.createElement('div');
				mark.style.position = `absolute`
				mark.style.textAlign = `center`
				mark.style.width = `60px`
				mark.style.margin = `6px 0 0 -30px`
				mark.style.font = `10px Lato, sans-serif`
				mark.style.left = (this.inv ? (1 - i) * 100 + `%` : i * 100 + `%`)
				mark.innerHTML = (this.finalMark && i===1) ? this.finalMark : this.formula(this.min + (this.log ? this.toLog(i,this.log) : i) * this.range)
				this.marks.appendChild(mark)
			}
		}

		this.update();

		return this.wrap
	}

	handleChange(e){

		this.update(+this.control.value)
		if (this.trigger !== `release`) this.handleTrigger(e)
		// this.onchange(this.value);

	}

	handleTrigger(e){

		this.onchange(this.value);

	}

	handleTouch(e){
		let f = (e.touches[0].clientX - innerWidth/5) / (innerWidth - innerWidth * 2 / 5)
		if (f < 0) f = 0; else if (f > 1) f = 1

		this.control.value = this.min + this.range * f
		this.handleChange()

	}

	update(v){
		if (v !== undefined) {
			if (this.log) v = this.min + this.toLog((v - this.min)/this.range, this.log) * this.range;
			this.value =  (this.inv ? this.max + this.min - v : v)
		}
		if (this.value > this.max) {this.value = this.control.value = this.max} else if (this.value < this.min) {this.value = this.control.value = this.min}
		let w = ((this.log ? +this.control.value : this.value) - this.min) / this.range * (100-this.gap) + this.gap + `%`;
		this.fill.style.width = w
		this.pluck.style.left = w
	}

	toLog(f, p){
		return Math.exp(p * Math.log(f))
	}

}