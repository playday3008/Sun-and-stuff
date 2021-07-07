let core

window.onload = ()=>{

    const e = new Button({class: `button`, n: `Emit photon`})
    // const s = new Toggle({n1: `Stop`, n2: `Start`, class: `go`, class2: `stopped`})
    const ls = new Range({ width: 500, value: 1, class: `input`, min: 0, max: 5, scale: 5, label: `Speed of light`, labelWidth: 160})
    const p1 = new Range({ width: 500, value: 0, class: `input`, min: 0, max: Math.PI, scale: 2, label: `Phase shift top`, labelWidth: 160, formula: v=>v===0 ? 0 : v===Math.PI ? `π` : v/Math.PI + `π`})
    const p2 = new Range({ width: 500, value: 0, class: `input`, min: 0, max: Math.PI, scale: 2, label: `Phase shift bottom`, labelWidth: 160, formula: v=>v===0 ? 0 : v===Math.PI ? `π` : v/Math.PI + `π`})
    
    core = new Core(document.querySelector(`.canvas`))

    document.body.appendChild(ls)
    document.body.appendChild(p1)
    document.body.appendChild(p2)
    document.body.appendChild(e)

    e.data.onchange = _=>{
        core.stuff[core.stuff.length - 1].emit()
    }
    ls.data.onchange = v=>{
        core.lightspeed = v * core.ratio
    }
    p1.data.onchange = v=>{
        core.stuff[2].delta = v
        core.stuff[3].updateGhosts(v - p2.data.value)
    }
    p2.data.onchange = v=>{
        core.stuff[4].delta = v
        core.stuff[3].updateGhosts(p1.data.value - v)
    }
    p1.addEventListener(`mouseenter`, e=>{
        core.preview = true
    })
    p1.addEventListener(`mouseleave`, e=>{
        core.preview = false
    })
    p2.addEventListener(`mouseenter`, e=>{
        core.preview = true
    })
    p2.addEventListener(`mouseleave`, e=>{
        core.preview = false
    })

}


class Core {

    constructor(canvas){

        this.canvas = canvas
        this.ratio = window.devicePixelRatio || 1
        this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
        this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
        this.ctx = this.canvas.getContext('2d')

        this.stuff = []
        this.lightspeed = 1 * this.ratio
        this.photonLength = 128 * this.ratio
        this.photonHalfLength = this.photonLength / 2
        this.unitAmplitude = 16 * this.ratio
        this.precision = 80
        this.photonLineWidth = this.ratio * 2
        this.pulsePeriod = 800
        this.preview = false

        this.ctx.fillStyle = `#112`
        this.colormap = light([`#ff8539`, `#48FF7B`])
        // this.colormap = light(`fire`)
        this.unit = this.ratio * 32

        this.setup(1)
        this.render()

    }

    setup(id){

        if (id === 1){

            let emitter = new Emitter(this, .1, .8)
            let halfMirror = new HalfMirror(this, .25, .8)
            let mirror2 = new Mirror(this, .25, .3)
            let mirror1 = new Mirror(this, .75, .8)
            let halfMirror2 = new HalfMirror(this, .75, .3)
            let detector2 = new Detector(this, .9, .3)
            let detector = new Detector(this, .75, .1)
            let phaseGate1 = new PhaseGate(this, .5, .3)
            let phaseGate2 = new PhaseGate(this, .5, .8)

            emitter.connect(halfMirror)
            halfMirror.connect(phaseGate2, mirror2)
            mirror1.connect(halfMirror2)
            mirror2.connect(phaseGate1)
            phaseGate1.connect(halfMirror2)
            phaseGate2.connect(mirror1)
            halfMirror2.connect(detector, detector2)

            this.stuff.push(detector)
            this.stuff.push(detector2)
            this.stuff.push(phaseGate1)
            this.stuff.push(halfMirror2)
            this.stuff.push(phaseGate2)
            this.stuff.push(mirror1)
            this.stuff.push(mirror2)
            this.stuff.push(halfMirror)
            this.stuff.push(emitter)

            halfMirror2.setupGhosts(.09 * this.ratio)
        }

    }

    render(){

        requestAnimationFrame(this.render.bind(this))
        this.update()
        this.display()

    }

    update(){
        for (let i = 0; i < this.stuff.length; i++){
            this.stuff[i].update()
        }
    }

    display(){

        this.ctx.fillRect(0, 0, this.w, this.h)

        for (let i = 0; i < this.stuff.length; i++){
            this.stuff[i].display()
        }

    }

}

class Device {

    constructor(core, u, v){
        this.core = core
        this.u = u
        this.v = v
        this.x = core.w * u
        this.y = core.h * v
        this.photons = []
    }

    displayPhotons(){
        for (let i = 0; i < this.photons.length; i++){

            if (!this.photons[i].ghost || this.core.preview){

                this.core.ctx.save()
                this.core.ctx.rotate(this.photons[i].a)
                this.core.ctx.translate(this.photons[i].f, 0)

                this.core.ctx.lineWidth = this.core.photonLineWidth
                this.core.ctx.strokeStyle = (this.photons[i].ghost ? `#FFF6` : this.photons[i].sh2 ? `#fff` : this.core.colormap.rgb(Math.abs(Math.PI - this.photons[i].sh % (Math.PI * 2)) / Math.PI)) //this.core.colormap.rgb(1 - this.photons[i].sh % (Math.PI * 2) / (Math.PI * 2)))
                this.core.ctx.beginPath()

                let start = false
                let etotal = 0
                for (let c = 0; c < this.core.precision; c++){

                    let x = -this.core.photonHalfLength + c * this.core.photonLength / this.core.precision

                    if (x + this.photons[i].f > 0){
                        if (x + this.photons[i].f < this.photons[i].d){
                            let dFactor = (this.core.photonHalfLength - Math.abs(x)) ** 2 / this.core.photonHalfLength ** 2

                            let e = Math.cos(x * this.photons[i].fr + this.photons[i].sh) * this.photons[i].am
                            if (this.photons[i].sh2) {
                                e += Math.cos(x * this.photons[i].fr + this.photons[i].sh2) * this.photons[i].am
                            }
                            etotal += e**2

                            let y = e * this.core.unitAmplitude * dFactor
                            
                            if (!start){
                                start = true
                                this.core.ctx.moveTo(x, y)
                            } else {
                                this.core.ctx.lineTo(x, y)
                            }
                        } else if (!this.photons[i].t){
                            this.photons[i].t = true
                            this.photons[i].trg.emit(this.photons[i])
                        }
                        
                    }
                }
                this.photons[i].e = etotal / this.core.precision * 2.15
                this.core.ctx.stroke()
                this.core.ctx.restore()
            }

        }
    }

    updatePhotons(){

        for (let i = 0; i < this.photons.length; i++){

            if (!this.photons[i].ghost){

                this.photons[i].f += this.core.lightspeed
                this.photons[i].p = Math.cos(this.photons[i].f * this.frequency)

                if (this.photons[i].f >= this.photons[i].d + this.core.photonLength / 2){
                    this.photons.splice(i,1)
                    i--
                }
            }

        }

    }

}

class PhaseGate extends Device{

    constructor(core, u, v){

            super(core, u, v)
            this.color = `#FEC`

            this.delta = 0

    }

    emit(p){
        this.photons.push({
            f: -this.core.photonLength / 2, 
            d: this.distance, 
            v: this.vector,
            a: Math.atan2(this.vector.y, this.vector.x),
            p: p.p,
            t: false,
            fr: p.fr,
            am: p.am,
            sh: p.sh + this.delta,
            sh2: false,
            trg: this.target,
            en: p.en
        })

    }

    update(){
        this.updatePhotons()
    }

    connect(n){
        this.target = n
        this.vector = {x: n.x - this.x, y: n.y - this.y}
        this.distance = ((n.x - this.x) ** 2 + (n.y - this.y) ** 2) ** .5
    }

    display(){
        this.core.ctx.save()

        this.core.ctx.strokeStyle = this.color
        this.core.ctx.lineWidth = this.core.ratio * 2  + this.core.ratio * this.delta * 6
        this.core.ctx.translate(this.x, this.y)
        this.core.ctx.beginPath()
        this.core.ctx.moveTo(0, -this.core.unit)
        this.core.ctx.lineTo(0, this.core.unit)
        this.core.ctx.stroke()

        this.displayPhotons()

        this.core.ctx.restore()
    }

}

class Emitter extends Device{

    constructor(core, u, v){

        super(core, u, v)
        this.color = `#fff`

        this.period = this.core.pulsePeriod
        this.timer = this.period
        this.frequency = .09 * this.core.ratio
        this.amplitude = 1

    }

    emit(){

        let allow = true

        for (let i = 0; i < this.photons.length; i++){

            if (this.photons[i].f < this.core.photonHalfLength){
                return
            }

        }

        this.photons.push({
            f: -this.core.photonLength / 2, 
            d: this.distance, 
            v: this.vector,
            a: Math.atan2(this.vector.y, this.vector.x),
            p: 0,
            t: false,
            fr: this.frequency,
            am: this.amplitude,
            sh: 0,
            sh2: false,
            trg: this.target
        })

    }

    connect(n){
        this.target = n
        this.vector = {x: n.x - this.x, y: n.y - this.y}
        this.distance = ((n.x - this.x) ** 2 + (n.y - this.y) ** 2) ** .5
    }

    update(){

        this.updatePhotons()

    }

    display(){

        this.core.ctx.save()

        this.core.ctx.fillStyle = this.color
        this.core.ctx.translate(this.x, this.y)
        this.core.ctx.beginPath()
        this.core.ctx.moveTo(0, 0)
        this.core.ctx.lineTo(-this.core.unit, -this.core.unit/2)
        this.core.ctx.lineTo(-this.core.unit, this.core.unit/2)
        this.core.ctx.closePath()
        this.core.ctx.fill()

        this.displayPhotons()

        this.core.ctx.restore()

    }

}

class HalfMirror extends Device {

    constructor(core, u, v){

        super(core, u, v)
        this.weakColor = `#fff3`
        this.strongColor = `#fff6`

    }

    emit(p){

        let a1 = Math.atan2(this.vector1.y, this.vector1.x)
        let a2 = Math.atan2(this.vector2.y, this.vector2.x)

        let p1 = {
            f: -this.core.photonLength / 2, 
            d: this.distance1, 
            v: this.vector1,
            a: a1,
            p: p.p,
            t: false,
            fr: p.fr,
            am: p.am / (2 ** .5),
            sh: p.sh + (p.a === a1 || p.a !== 0 ? 0 : Math.PI),
            sh2: false,
            trg: this.target1
        }
        let p2 = {
            f: -this.core.photonLength / 2, 
            d: this.distance2, 
            v: this.vector2,
            a: a2,
            p: p.p,
            t: false,
            fr: p.fr,
            am: p.am / (2 ** .5),
            sh: p.sh + (p.a === a2 || p.a !== 0 ? 0 : Math.PI),
            sh2: false,
            trg: this.target2
        }

        p1.en = [p2]
        p2.en = [p1]

        this.photons.push(p1)
        this.photons.push(p2)

    }

    setupGhosts(fr){

        let a1 = Math.atan2(this.vector1.y, this.vector1.x)
        let a2 = Math.atan2(this.vector2.y, this.vector2.x)

        this.ghost1 = {
            f: this.distance1 / 2, 
            d: this.distance1, 
            v: this.vector1,
            a: a1,
            p: 0,
            t: false,
            fr: fr,
            am: .5,
            sh: Math.PI,
            sh2: Math.PI * 3,
            trg: this.target1,
            ghost: true
        }

        this.ghost2 = {
            f: this.distance2 / 2, 
            d: this.distance2, 
            v: this.vector2,
            a: a2,
            p: 0,
            t: false,
            fr: fr,
            am: .5,
            sh: Math.PI,
            sh2: Math.PI * 2,
            trg: this.target2,
            ghost: true
        }

        this.photons.push(this.ghost1)
        this.photons.push(this.ghost2)

    }

    updateGhosts(sh){
        this.ghost1.sh2 = Math.PI * 3 + sh
        this.ghost2.sh2 = Math.PI * 2 + sh

    }

    connect(n1, n2){
        this.target1 = n1
        this.target2 = n2
        this.vector1 = {x: n1.x - this.x, y: n1.y - this.y}
        this.vector2 = {x: n2.x - this.x, y: n2.y - this.y}
        this.distance1 = ((n1.x - this.x) ** 2 + (n1.y - this.y) ** 2) ** .5
        this.distance2 = ((n2.x - this.x) ** 2 + (n2.y - this.y) ** 2) ** .5
    }

    update(){

        for (let i = 0; i < this.photons.length; i++){
            for (let j = i + 1; j < this.photons.length; j++){
                if (!this.photons[i].ghost && this.photons[i].a === this.photons[j].a && Math.abs(this.photons[i].f - this.photons[j].f) < this.core.photonLength){
                    
                    this.photons[i].am = .5
                    this.photons[i].sh2 = this.photons[j].sh
                    this.photons[i].en.concat(this.photons[j].en)
                    this.photons.splice(j,1)
                    j--

                }
            }   
        }

        this.updatePhotons()

    }

    display(){
        this.core.ctx.save()

        this.core.ctx.fillStyle = this.color
        this.core.ctx.translate(this.x, this.y)
        this.core.ctx.beginPath()
        this.core.ctx.moveTo(-this.core.unit, -this.core.unit)
        this.core.ctx.lineTo(this.core.unit, -this.core.unit)
        this.core.ctx.lineTo(-this.core.unit, this.core.unit)
        this.core.ctx.closePath()
        this.core.ctx.fillStyle = this.weakColor
        this.core.ctx.fill()
        this.core.ctx.beginPath()
        this.core.ctx.moveTo(this.core.unit, -this.core.unit)
        this.core.ctx.lineTo(this.core.unit, this.core.unit)
        this.core.ctx.lineTo(-this.core.unit, this.core.unit)
        this.core.ctx.closePath()
        this.core.ctx.fillStyle = this.strongColor
        this.core.ctx.fill()

        this.displayPhotons()

        this.core.ctx.restore()

    }

}
class Mirror extends Device{

    constructor(core, u, v){

        super(core, u, v)
        this.color = `#fff6`

    }

    emit(p){
        this.photons.push({
            f: -this.core.photonLength / 2, 
            d: this.distance, 
            v: this.vector,
            a: Math.atan2(this.vector.y, this.vector.x),
            p: p.p,
            t: false,
            fr: p.fr,
            am: p.am,
            sh: p.sh + Math.PI,
            sh2: false,
            trg: this.target,
            en: p.en
        })

    }

    connect(n){
        this.target = n
        this.vector = {x: n.x - this.x, y: n.y - this.y}
        this.distance = ((n.x - this.x) ** 2 + (n.y - this.y) ** 2) ** .5
    }

    update(){

        this.updatePhotons()

    }

    display(){
        this.core.ctx.save()

        this.core.ctx.strokeStyle = this.color
        this.core.ctx.lineWidth = this.core.ratio * 4
        this.core.ctx.translate(this.x, this.y)
        this.core.ctx.beginPath()
        this.core.ctx.moveTo(-this.core.unit, this.core.unit)
        this.core.ctx.lineTo(this.core.unit, -this.core.unit)
        this.core.ctx.stroke()

        this.displayPhotons()

        this.core.ctx.restore()

    }

}

class Detector {

    constructor(core, u, v){

        this.core = core
        this.x = core.w * u
        this.y = core.h * v
        this.u = u
        this.v = v
        this.color = `#fff`

        this.pulseTime = 60
        this.timer = 0
        this.pulsing = false

    }

    update(){

    }

    pulse(){

        this.pulsing = true
        this.timer = 0

    }

    emit(p){
        if (!p.ghost){

            // let chance = p.am ** 2
            // let chance = Math.abs(Math.cos(p.sh) * p.am + (p.sh2 !== false ? Math.cos(p.sh2) * p.am : 1))
            if (p.checked || Math.random() < p.e){
                p.am = 0
                p.e = 0
                if (p.en){
                    for (let i = 0; i < p.en.length; i++){
                        p.en[i].am = 0
                        p.en[i].e = 0
                    }
                }
                this.pulse()
            } else {
                p.checked = true
                if (p.en){
                    for (let i = 0; i < p.en.length; i++){
                        p.en[i].checked = true
                    }
                }
            }
        }
        
    }

    display(){

        this.core.ctx.save()
        this.core.ctx.fillStyle = this.color
        this.core.ctx.translate(this.x, this.y)
        this.core.ctx.beginPath()
        this.core.ctx.arc(0,0, this.core.ratio * 10, 0, Math.PI * 2)
        this.core.ctx.closePath()
        this.core.ctx.fill()

        if (this.pulsing){

            let f = this.timer / this.pulseTime
            this.core.ctx.strokeStyle = this.color
            this.core.ctx.globalAlpha = 1-f
            this.core.ctx.lineWidth = this.core.ratio * 10 * (1 - f)
            this.core.ctx.beginPath()
            this.core.ctx.arc(0,0, this.core.ratio * 10 + f**.5 * this.core.ratio * 40, 0, Math.PI * 2)
            this.core.ctx.closePath()
            this.core.ctx.stroke()

            this.timer++

            if (this.timer >= this.pulseTime){
                this.timer = 0
                this.pulsing = false
            }
        }

        this.core.ctx.restore()

    }

}
