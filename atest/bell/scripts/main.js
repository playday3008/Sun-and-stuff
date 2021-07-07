let core

window.onload = ()=>{

    const det = new Button({class: `button`, n: `Deterministic`})
    const qua = new Button({class: `button`, n: `Quantum`})
    const pr = new Button({class: `button`, n: `PR Box`})

    const c = new Button({class: `button`, n: `Iterate`})
    const c100 = new Button({class: `button`, n: `Iterate 500 times`})
    let iReady = true
    let i = 0
    
    core = new Core(document.querySelector(`.canvas`))

    document.body.appendChild(det)
    document.body.appendChild(qua)
    document.body.appendChild(pr)

    document.body.appendChild(document.createElement(`br`))

    document.body.appendChild(c)
    document.body.appendChild(c100)

    highlight(det)

    det.data.onchange = _=>{
        i = 0
        core.reset(0)
        highlight(det)
    }
    qua.data.onchange = _=>{
        i = 0
        core.reset(1)
        highlight(qua)
    }
    pr.data.onchange = _=>{
        i = 0
        core.reset(2)
        highlight(pr)
    }
 
    c.data.onchange = _=>{
        core.cycle(1)
    }
    c100.data.onchange = _=>{
        if (iReady){
            i = 500
            iReady = false
            function i100(){
                if (i > 0){
                    // requestAnimationFrame(i100)
                    setTimeout(i100, 5)
                    i--
                } else {
                    iReady = true
                }
                core.cycle(1)
            }
            i100()
        }
    }

    function highlight(el){
        det.classList.remove(`active`)
        qua.classList.remove(`active`)
        pr.classList.remove(`active`)

        el.classList.add(`active`)
    }

}


class Core {

    constructor(canvas){

        this.canvas = canvas
        this.ratio = window.devicePixelRatio || 1
        this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
        this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
        this.ctx = this.canvas.getContext('2d')

        this.scanvas = document.createElement(`canvas`)
        this.scanvas.width = this.w - this.ratio * 64
        this.scanvas.height = this.h / 5
        this.sctx = this.scanvas.getContext('2d')
        this.sctx.font = `400 ` + 12 * this.ratio + `px monospace`
        this.sctx.textAlign = `right`
        this.sctx.textBaseline = `middle`

        this.mode = 0

        this.colors = [`#fff3`, `#48FF7B`, `#FF8539`]
        this.ctx.fillStyle = `#112`
        this.ctx.font = `400 ` + 32 * this.ratio + `px Georgia`
        this.ctx.textAlign = `center`
        this.ctx.textBaseline = `middle`

        this.reset(0)
        

    }

    reset(m){
        this.mode = m
        this.scoreIndex = 0
        this.resetGraph()
        this.alice = {
            state: -10
        }
        this.bob = {
            state: -10
        }
        this.state = [-10, -10, -10, -10]
        this.score = 0
        this.lastScore = 0
        this.history = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this.correlations = [0, 0, 0, 0]
        this.display()

    }

    resetGraph(){
        this.sctx.clearRect(0, 0, this.scanvas.width, this.scanvas.height)
        this.sctx.strokeStyle = `#fff3`
        this.sctx.fillStyle = `#fff6`
        this.sctx.lineWidth = this.ratio

        //0
        this.sctx.beginPath()
        this.sctx.moveTo(0, this.scanvas.height / 2)
        this.sctx.lineTo(this.scanvas.width - this.ratio * 32, this.scanvas.height / 2)
        this.sctx.stroke()
        this.sctx.fillText(`0`, this.scanvas.width, this.scanvas.height * 0.5)

        //+4
        this.sctx.beginPath()
        this.sctx.moveTo(0, this.scanvas.height * 0.1)
        this.sctx.lineTo(this.scanvas.width - this.ratio * 32, this.scanvas.height * 0.1)
        this.sctx.stroke()
        this.sctx.fillText(`4`, this.scanvas.width, this.scanvas.height * 0.1)

        //-4
        this.sctx.beginPath()
        this.sctx.moveTo(0, this.scanvas.height * 0.9)
        this.sctx.lineTo(this.scanvas.width - this.ratio * 32, this.scanvas.height * 0.9)
        this.sctx.stroke()
        this.sctx.fillText(`-4`, this.scanvas.width, this.scanvas.height * 0.9)

        this.sctx.lineWidth = this.ratio * 2

    }

    cycle(n){
        for (let i = 0; i < (n || 1); i++){
            this.update()
        }
        this.display()
    }

    getR(){
        //Get random 1 or 0
        return Math.random() > .5 ? 1 : 0
    }


    update(){

        this.alice.state = this.getR() ? 0 : 1
        this.bob.state = this.getR() ? 0 : 1
        let n = this.alice.state * 2 + this.bob.state

        if (this.mode === 0){
            this.state = [this.getR(), this.getR(), this.getR(), this.getR()]
        } else {

            // let chances = (this.mode === 1) ? [0.07322330470336312, 0.42677669529663687] : [0, 0.5]
            let chances = (this.mode === 1) ? [0.42677669529663687, 0.07322330470336312] : [0.5, 0]
            let sequence = (this.alice.state === 1 && this.bob.state === 1) ? [1,0,0,1] : [0,1,1,0]
            let accumulation = 0
            let choice = 0
            let random = Math.random()
            for (let i = 0; i < sequence.length; i++){
                accumulation += chances[sequence[i]]
                if (random < accumulation){
                    choice = i
                    break
                }
            }

            this.state = choice === 0 ? [0, 0, 0, 0] : choice === 1 ? [0, 0, 1, 1] : choice === 2 ? [1, 1, 0, 0] : [1, 1, 1, 1]
        }

        if (this.state[this.alice.state] === 0 && this.state[2 + this.bob.state] === 0) this.history[n][0]++
        if (this.state[this.alice.state] === 0 && this.state[2 + this.bob.state] === 1) this.history[n][1]++
        if (this.state[this.alice.state] === 1 && this.state[2 + this.bob.state] === 0) this.history[n][2]++
        if (this.state[this.alice.state] === 1 && this.state[2 + this.bob.state] === 1) this.history[n][3]++

        this.correlations[n] = (this.history[n][0] + this.history[n][3] - this.history[n][1] - this.history[n][2]) / (this.history[n][0] + this.history[n][1] + this.history[n][2] + this.history[n][3])
        this.lastScore = this.score
        this.score = this.correlations[0] + this.correlations[1] + this.correlations[2] - this.correlations[3]

        //Score graph
        if (this.scoreIndex < this.w){
            this.sctx.strokeStyle = `#fff`
            this.sctx.beginPath()
            this.sctx.moveTo(this.scoreIndex - 1, this.scanvas.height / 2 - this.lastScore * this.scanvas.height * .1)
            this.sctx.lineTo(this.scoreIndex, this.scanvas.height / 2 - this.score * this.scanvas.height * .1)
            this.sctx.stroke()
            this.scoreIndex++
        }

    }

    display(){

        this.ctx.fillStyle = `#112`
        this.ctx.fillRect(0, 0, this.w, this.h)

        //Alice
        this.ctx.save()

        this.ctx.translate(this.w / 4, this.h / 4)
        this.ctx.fillStyle = `#FFF`
        this.ctx.fillText(`Alice choses`, 0, 0)
        this.ctx.fillText(`and gets`, 0, this.ratio * 128)

        let shift = this.ratio * 8
        this.ctx.fillStyle = this.ctx.strokeStyle = this.alice.state < 0 ? this.colors[0] : `#fff`
        this.ctx.lineWidth = this.ratio * 2
        this.ctx.beginPath()
        this.ctx.arc(-shift, this.ratio * 64, this.ratio * 16, Math.PI / 2, Math.PI * 3 / 2)
        this.ctx.lineTo(shift, this.ratio * 48)
        this.ctx.arc(shift, this.ratio * 64, this.ratio * 16, Math.PI * 3 / 2, Math.PI / 2)
        this.ctx.lineTo(-shift, this.ratio * 80)
        this.ctx.closePath()
        this.ctx.stroke()
        if (this.alice.state >= 0){
            this.ctx.beginPath()
            this.ctx.arc(this.alice.state === 0 ? -shift : shift, this.ratio * 64, this.ratio * 12, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
        }

        this.ctx.fillStyle = this.state[this.alice.state] === 0 ? this.colors[2] : this.state[this.alice.state] === 1 ? this.colors[1] : this.colors[0]
        this.ctx.beginPath()
        this.ctx.arc(0, this.ratio * 192, this.ratio * 16, 0, Math.PI * 2)
        this.ctx.closePath()
        this.ctx.fill()

        this.ctx.restore()

        //Bob
        this.ctx.save()

        this.ctx.translate(this.w / 4 * 3, this.h / 4)
        this.ctx.fillStyle = `#FFF`
        this.ctx.fillText(`Bob choses`, 0, 0)
        this.ctx.fillText(`and gets`, 0, this.ratio * 128)

        this.ctx.fillStyle = this.ctx.strokeStyle = this.bob.state < 0 ? this.colors[0] : `#fff`
        this.ctx.lineWidth = this.ratio * 2
        this.ctx.beginPath()
        this.ctx.arc(-shift, this.ratio * 64, this.ratio * 16, Math.PI / 2, Math.PI * 3 / 2)
        this.ctx.lineTo(shift, this.ratio * 48)
        this.ctx.arc(shift, this.ratio * 64, this.ratio * 16, Math.PI * 3 / 2, Math.PI / 2)
        this.ctx.lineTo(-shift, this.ratio * 80)
        this.ctx.closePath()
        this.ctx.stroke()
        if (this.bob.state >= 0){
            this.ctx.beginPath()
            this.ctx.arc(this.bob.state === 0 ? -shift : shift, this.ratio * 64, this.ratio * 12, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
        }

        this.ctx.fillStyle = this.state[this.bob.state + 2] === 0 ? this.colors[2] : this.state[this.bob.state + 2] === 1 ? this.colors[1] : this.colors[0]
        this.ctx.beginPath()
        this.ctx.arc(0, this.ratio * 192, this.ratio * 16, 0, Math.PI * 2)
        this.ctx.closePath()
        this.ctx.fill()

        this.ctx.restore()

        //State
        if (this.mode === 0){

            this.ctx.save()
            this.ctx.globalAlpha = .1
            let margin = this.ratio * 128
            let height = this.h - margin * 2
            let step = height / 15
            this.ctx.translate(this.w / 2, margin - this.ratio * 32)

            let statebin = `` + this.state[0] + this.state[1] + this.state[2] + this.state[3]
            let currentY = 0

            for (let i = 0; i < 16; i++){

                let bin = (i >>> 0).toString(2)
                if (bin.length === 1) {bin = `000` + bin} else if (bin.length === 2) {bin = `00` + bin} else if (bin.length === 3) {bin = `0` + bin}
                for (let j = 0; j < 4; j++){
                    this.ctx.save()
                    if (j === this.alice.state || j - 2 === this.bob.state){
                        this.ctx.globalAlpha = .3
                    }
                    if (statebin === bin) {
                        currentY = i * step
                        if (j === 0 && this.alice.state === 0){
                            this.ctx.globalAlpha = 1
                        } else if (j === 1 && this.alice.state === 1){
                            this.ctx.globalAlpha = 1
                        } else if (j === 2 && this.bob.state === 0){
                            this.ctx.globalAlpha = 1
                        } else if (j === 3 && this.bob.state === 1){
                            this.ctx.globalAlpha = 1
                        } else {
                            // this.ctx.globalAlpha = .3
                        }
                    }
                    this.ctx.fillStyle = bin[j] === `1` ? this.colors[1] : this.colors[2]//this.state[i] === 0 ? this.colors[1] : this.state[i] === 1 ? this.colors[2] : this.colors[0]
                    this.ctx.beginPath()
                    this.ctx.arc(-this.ratio * 32 + this.ratio * j * 24, i * step, this.ratio * 6, 0, Math.PI * 2)
                    this.ctx.closePath()
                    this.ctx.fill()
                    this.ctx.restore()
                }

            }

            //Links
            if (this.alice.state > -1 && this.bob.state > -1){
                this.ctx.globalAlpha = .5
                this.ctx.lineWidth = this.ratio * 2

                this.ctx.strokeStyle = this.state[this.alice.state] === 0 ? this.colors[2] : this.colors[1]
                this.ctx.beginPath()
                this.ctx.moveTo(-this.ratio * 64, currentY)
                this.ctx.bezierCurveTo(-this.ratio * 128, currentY, -this.w * .2 + this.ratio * 64, this.ratio * 246, -this.w * .2, this.ratio * 246)
                this.ctx.stroke()

                this.ctx.strokeStyle = this.state[this.bob.state + 2] === 0 ? this.colors[2] : this.colors[1]
                this.ctx.beginPath()
                this.ctx.moveTo(this.ratio * 64, currentY)
                this.ctx.bezierCurveTo(this.ratio * 128, currentY, this.w * .2 - this.ratio * 64, this.ratio * 246, this.w * .2, this.ratio * 246)
                this.ctx.stroke()
            }


            this.ctx.restore()

        } else {

            this.ctx.save()
            this.ctx.globalAlpha = .1
            let margin = this.ratio * 128
            let height = this.h - margin * 2
            let step = height / 15
            this.ctx.translate(this.w / 2, margin + this.ratio * 96)

            let statebin = `` + this.state[0] + this.state[2]

            for (let i = 0; i < 4; i++){

                let bin = (i >>> 0).toString(2)
                if (bin.length === 1) {bin = `0` + bin}
                let chances = (this.mode === 1) ? [0.42677669529663687, 0.07322330470336312] : [0.5, 0]
                if (this.alice.state === 1 && this.bob.state === 1){
                    this.ctx.globalAlpha = (i === 0 || i === 3) ? chances[1] : chances[0]
                } else if (this.alice.state > -1) {
                    this.ctx.globalAlpha = (i === 0 || i === 3) ? chances[0] : chances[1]
                } else {
                    this.ctx.globalAlpha = .1
                }
                
                for (let j = 0; j < 2; j++){
                    this.ctx.save()
                    this.ctx.fillStyle = bin[j] === `1` ? this.colors[1] : this.colors[2]
                    this.ctx.beginPath()
                    this.ctx.arc(-this.ratio * 8 + this.ratio * j * 24, i * step, this.ratio * 6, 0, Math.PI * 2)
                    this.ctx.closePath()
                    this.ctx.fill()
                    this.ctx.restore()
                }

                //Links
                if (this.alice.state > -1 && this.bob.state > -1){
                    // this.ctx.globalAlpha = .5
                    this.ctx.lineWidth = this.ratio * 2

                    this.ctx.strokeStyle = bin[0] === `1` ? this.colors[1] : this.colors[2]
                    this.ctx.beginPath()
                    this.ctx.moveTo(-this.ratio * 64, i * step)
                    this.ctx.bezierCurveTo(-this.ratio * 128, i * step, -this.w * .2 + this.ratio * 64, this.ratio * 118, -this.w * .2, this.ratio * 118)
                    this.ctx.stroke()

                    this.ctx.strokeStyle = bin[1] === `1` ? this.colors[1] : this.colors[2]
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.ratio * 64, i * step)
                    this.ctx.bezierCurveTo(this.ratio * 128, i * step, this.w * .2 - this.ratio * 64, this.ratio * 118, this.w * .2, this.ratio * 118)
                    this.ctx.stroke()
                }

            }

            this.ctx.restore()

        }

        //Score
        this.ctx.save()
        this.ctx.textAlign = `left`
        this.ctx.fillStyle = `#fff8`
        this.ctx.font = `400 ` + 18 * this.ratio + `px Georgia`
        this.ctx.fillText(`Score: ` + Math.round(this.score * 100) / 100, this.ratio * 32, this.h - this.scanvas.height - this.ratio * 26)
        this.ctx.restore()

        //Header
        this.ctx.save()
        this.ctx.translate(this.w / 2, 0)
        this.ctx.fillStyle = `#fff`
        this.ctx.font = `400 ` + 18 * this.ratio + `px Georgia`
        this.ctx.fillText((this.mode === 0 ? `Deterministic` : this.mode === 1 ? `Quantum` : `PR box`) + ` output`, 0, this.ratio * 48)

        this.ctx.restore()

        this.ctx.drawImage(this.scanvas, this.ratio * 32, this.h - this.scanvas.height - this.ratio * 16)


    }

}