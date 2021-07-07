let core

window.onload = ()=>{

    const c = new Button({class: `button`, n: `Clear`})
    const re = new Button({class: `button`, n: `Reset model`})
    re.style.backgroundColor = c.style.backgroundColor = `#FFF`
    re.style.boxShadow = c.style.boxShadow = `0 0 0 2px #000 inset`
    re.style.color = c.style.color = `#000`
    
    const d_close = new Button({class: `button`, n: `Intersected`})
    const d_simple = new Button({class: `button`, n: `Trivial`})
    const d_u1 = new Button({class: `button`, n: `Balanced U`})
    const d_u2 = new Button({class: `button`, n: `Unbalanced U`})
    const d_rng = new Button({class: `button`, n: `Random`})
    
    const setup = {layers: [20]}
    core = new Neuro(setup, document.querySelector(`.canvas`))

    document.body.appendChild(d_simple)
    document.body.appendChild(d_close)
    document.body.appendChild(d_u1)
    document.body.appendChild(d_u2)
    document.body.appendChild(d_rng)
    document.body.appendChild(c)
    document.body.appendChild(re)

    c.data.onchange = _=>{
        core.initModel()
        core.testPoints = []
    }
    re.data.onchange = _=>{
        core.initModel()
    }

    d_simple.data.onchange = _=>{
        core.initModel()
        core.testPoints = [{"x":-0.315,"y":0.84,"type":1},{"x":0.055,"y":-0.045,"type":1},{"x":-0.4625,"y":-0.62,"type":1},{"x":-0.835,"y":0.375,"type":1},{"x":-0.4475,"y":0.285,"type":1},{"x":-0.8225,"y":-0.77,"type":1},{"x":-0.0825,"y":-0.695,"type":1},{"x":0.34,"y":0.615,"type":0},{"x":0.7125,"y":0.765,"type":0},{"x":0.4025,"y":-0.385,"type":0},{"x":0.7525,"y":-0.44,"type":0},{"x":0.5075,"y":-0.815,"type":0},{"x":0.9125,"y":0.205,"type":0},{"x":0.565,"y":0.185,"type":0},{"x":-0.2,"y":0.405,"type":1},{"x":-0.2575,"y":-0.345,"type":1},{"x":-0.6825,"y":-0.155,"type":1},{"x":-0.6425,"y":0.705,"type":1},{"x":0.03,"y":0.76,"type":1},{"x":0.295,"y":0.14,"type":0},{"x":0.2125,"y":-0.7,"type":1},{"x":0.3475,"y":-0.9,"type":0}]
    }
    d_close.data.onchange = _=>{
        core.initModel()
        core.testPoints = [{"x":-0.4025,"y":0.875,"type":1},{"x":0.25,"y":0.195,"type":1},{"x":-0.2425,"y":-0.395,"type":1},{"x":0.0825,"y":-0.885,"type":1},{"x":-0.0225,"y":0.19,"type":1},{"x":-0.78,"y":0.275,"type":1},{"x":-0.67,"y":-0.715,"type":1},{"x":-0.4275,"y":0.175,"type":1},{"x":-0.7975,"y":0.76,"type":1},{"x":0.0125,"y":0.73,"type":0},{"x":-0.18,"y":0.41,"type":0},{"x":0.215,"y":-0.29,"type":0},{"x":-0.0775,"y":-0.67,"type":0},{"x":0.6725,"y":-0.33,"type":0},{"x":0.7025,"y":0.29,"type":0},{"x":0.5625,"y":0.8,"type":0},{"x":0.94,"y":0.89,"type":0},{"x":0.87,"y":-0.625,"type":0},{"x":0.5,"y":-0.765,"type":0},{"x":-0.235,"y":0.23,"type":0},{"x":0.3675,"y":0.075,"type":1},{"x":-0.025,"y":-0.27,"type":0},{"x":0.2275,"y":-0.69,"type":0},{"x":-0.245,"y":0.87,"type":0},{"x":0.28,"y":0.845,"type":0},{"x":0.1825,"y":0.545,"type":0},{"x":0.4775,"y":-0.325,"type":0},{"x":0.905,"y":0.03,"type":0},{"x":-0.565,"y":-0.215,"type":1},{"x":-0.3975,"y":-0.84,"type":1},{"x":-0.875,"y":-0.305,"type":1},{"x":-0.8775,"y":-0.815,"type":1},{"x":-0.915,"y":0.805,"type":1}]
    }
    d_u1.data.onchange = _=>{
        core.initModel()
        core.testPoints = [{"x":-0.7125,"y":0.18,"type":1},{"x":-0.6975,"y":-0.09,"type":1},{"x":-0.62,"y":-0.38,"type":1},{"x":-0.5,"y":-0.555,"type":1},{"x":-0.34,"y":-0.65,"type":1},{"x":-0.135,"y":-0.61,"type":1},{"x":0.01,"y":-0.48,"type":1},{"x":0.0725,"y":-0.285,"type":1},{"x":0.1275,"y":-0.025,"type":1},{"x":0.1425,"y":0.23,"type":1},{"x":-0.715,"y":0.28,"type":1},{"x":-0.3,"y":-0.055,"type":0},{"x":-0.2975,"y":0.16,"type":0},{"x":-0.2175,"y":0.44,"type":0},{"x":-0.0875,"y":0.63,"type":0},{"x":0.055,"y":0.71,"type":0},{"x":0.2475,"y":0.695,"type":0},{"x":0.42,"y":0.54,"type":0},{"x":0.53,"y":0.17,"type":0},{"x":0.5275,"y":-0.135,"type":0},{"x":0.565,"y":-0.055,"type":0},{"x":0.5775,"y":-0.17,"type":0},{"x":0.5125,"y":0.065,"type":0},{"x":0.5175,"y":0.27,"type":0},{"x":0.4875,"y":0.37,"type":0},{"x":0.465,"y":0.46,"type":0},{"x":0.38,"y":0.645,"type":0},{"x":0.2975,"y":0.6,"type":0},{"x":0.31,"y":0.665,"type":0},{"x":0.1775,"y":0.7,"type":0},{"x":0.095,"y":0.765,"type":0},{"x":-0.0125,"y":0.66,"type":0},{"x":0.105,"y":0.685,"type":0},{"x":-0.16,"y":0.59,"type":0},{"x":-0.1575,"y":0.51,"type":0},{"x":-0.25,"y":0.38,"type":0},{"x":-0.2475,"y":0.305,"type":0},{"x":-0.285,"y":0.255,"type":0},{"x":-0.29,"y":0.09,"type":0},{"x":-0.315,"y":0.04,"type":0},{"x":-0.275,"y":-0.045,"type":0},{"x":-0.6775,"y":0.255,"type":1},{"x":-0.7,"y":0.075,"type":1},{"x":-0.7225,"y":-0.01,"type":1},{"x":-0.685,"y":-0.03,"type":1},{"x":-0.67,"y":-0.2,"type":1},{"x":-0.65,"y":-0.285,"type":1},{"x":-0.6575,"y":-0.36,"type":1},{"x":-0.5925,"y":-0.41,"type":1},{"x":-0.58,"y":-0.51,"type":1},{"x":-0.5375,"y":-0.52,"type":1},{"x":-0.46,"y":-0.65,"type":1},{"x":-0.445,"y":-0.59,"type":1},{"x":-0.4125,"y":-0.64,"type":1},{"x":-0.3725,"y":-0.7,"type":1},{"x":-0.2975,"y":-0.63,"type":1},{"x":-0.2675,"y":-0.7,"type":1},{"x":-0.215,"y":-0.61,"type":1},{"x":-0.195,"y":-0.64,"type":1},{"x":-0.2725,"y":-0.635,"type":1},{"x":-0.0975,"y":-0.61,"type":1},{"x":-0.0775,"y":-0.52,"type":1},{"x":-0.025,"y":-0.585,"type":1},{"x":-0.0075,"y":-0.42,"type":1},{"x":0.03,"y":-0.375,"type":1},{"x":0.055,"y":-0.2,"type":1},{"x":0.0875,"y":-0.185,"type":1},{"x":0.0925,"y":-0.095,"type":1},{"x":0.1525,"y":0.085,"type":1},{"x":0.0975,"y":0.005,"type":1},{"x":0.12,"y":0.13,"type":1},{"x":0.1675,"y":0.195,"type":1},{"x":-0.105,"y":0.58,"type":0},{"x":-0.0575,"y":0.61,"type":0},{"x":0.445,"y":0.425,"type":0},{"x":0.4875,"y":0.27,"type":0},{"x":0.58,"y":0.05,"type":0},{"x":0.53,"y":-0.04,"type":0}]
    }
    d_u2.data.onchange = _=>{
        core.initModel()
        core.testPoints = [{"x":-0.7025,"y":0.26,"type":1},{"x":0.135,"y":0.265,"type":1},{"x":-0.325,"y":0.065,"type":0},{"x":0.5725,"y":0.06,"type":0},{"x":-0.6775,"y":0.16,"type":1},{"x":-0.7025,"y":0.04,"type":1},{"x":-0.6475,"y":0.055,"type":1},{"x":-0.695,"y":0.095,"type":1},{"x":-0.7025,"y":0.205,"type":1},{"x":-0.66,"y":-0.075,"type":1},{"x":-0.63,"y":-0.185,"type":1},{"x":-0.56,"y":-0.38,"type":1},{"x":-0.4875,"y":-0.44,"type":1},{"x":-0.365,"y":-0.515,"type":1},{"x":-0.2225,"y":-0.54,"type":1},{"x":-0.0775,"y":-0.525,"type":1},{"x":-0.0025,"y":-0.39,"type":1},{"x":0.04,"y":-0.23,"type":1},{"x":0.0975,"y":0.015,"type":1},{"x":0.1575,"y":0.17,"type":1},{"x":0.1,"y":0.255,"type":1},{"x":0.1275,"y":0.13,"type":1},{"x":0.1225,"y":0.055,"type":1},{"x":0.095,"y":-0.055,"type":1},{"x":0.07,"y":-0.095,"type":1},{"x":0.0625,"y":-0.195,"type":1},{"x":0.05,"y":-0.33,"type":1},{"x":-0.0075,"y":-0.335,"type":1},{"x":-0.0325,"y":-0.475,"type":1},{"x":-0.045,"y":-0.51,"type":1},{"x":-0.1775,"y":-0.53,"type":1},{"x":-0.1575,"y":-0.61,"type":1},{"x":-0.115,"y":-0.52,"type":1},{"x":-0.2375,"y":-0.6,"type":1},{"x":-0.2775,"y":-0.555,"type":1},{"x":-0.3125,"y":-0.59,"type":1},{"x":-0.355,"y":-0.58,"type":1},{"x":-0.47,"y":-0.525,"type":1},{"x":-0.4425,"y":-0.495,"type":1},{"x":-0.4125,"y":-0.57,"type":1},{"x":-0.495,"y":-0.41,"type":1},{"x":-0.5625,"y":-0.375,"type":1},{"x":-0.5975,"y":-0.285,"type":1},{"x":-0.6075,"y":-0.215,"type":1},{"x":-0.6325,"y":-0.075,"type":1},{"x":-0.6425,"y":-0.255,"type":1},{"x":-0.6225,"y":-0.355,"type":1},{"x":-0.5375,"y":-0.475,"type":1},{"x":0.105,"y":-0.17,"type":1},{"x":0.1275,"y":-0.025,"type":1},{"x":0.1575,"y":0.105,"type":1},{"x":0.115,"y":0.21,"type":1},{"x":0.03,"y":-0.32,"type":1},{"x":0.0125,"y":-0.455,"type":1},{"x":-0.0375,"y":-0.43,"type":1},{"x":-0.0925,"y":-0.49,"type":1},{"x":-0.105,"y":-0.59,"type":1},{"x":-0.1975,"y":-0.595,"type":1},{"x":-0.3025,"y":0.255,"type":0},{"x":-0.22,"y":0.515,"type":0},{"x":-0.05,"y":0.67,"type":0},{"x":0.1475,"y":0.77,"type":0},{"x":0.2975,"y":0.675,"type":0},{"x":0.4625,"y":0.44,"type":0},{"x":0.535,"y":0.23,"type":0}]
    }
    d_rng.data.onchange = _=>{
        core.initModel()
        core.testPoints = []
        for (let i = 0; i < 16; i++){
            core.testPoints.push({x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, type: Math.random() > .5 ? 1 : 0})
        }
    }
}


class Neuro {

    constructor(p, canvas){

        this.resolution = 10
        this.colors = light(['#3A2F50', '#F5A897', '#FBF0CA'])
        this.touch = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

        this.fontSize = 12

        this.rocSamples = 8
        this.metrics = {
            accuracy: 0,
            erate: 0,
            precision: 0,
            recall: 0,
            f1: 0,
            roc: Array(this.rocSamples),
            rocauc: 0
        }

        this.testPoints = []
        this.initModel()
        this.initCanvas(canvas)
        this.setListeners()

        this.animate()

    }

    setListeners(){
        this.canvas.addEventListener(`mousedown`, e=>{

            let type = e.button === 0 ? 1 : 0

            let x = ((e.offsetX * this.ratio) - this.w / 2) / this.w * 2
            let y = ((e.offsetY * this.ratio) - this.h / 2) / this.h * 2

            if (x >= -1 && x <=1 && y >= -1 && y <=1) this.testPoints.push({x: x, y: y, type: type})
            // this.reset()
        })
        // this.canvas.addEventListener(`touchstart`, e=>{

        //     e.preventDefault()
        //     let type = e.touches.length > 1 ? -1 : 1

        //     let rect = e.target.getBoundingClientRect();
        //     let tx = e.targetTouches[type === 1 ? 0 : 1].pageX - rect.left;
        //     let ty = e.targetTouches[type === 1 ? 0 : 1].pageY - rect.top;

        //     let x = ((tx * this.ratio - this.fieldMarginX) - this.fieldSize / 2) / this.fieldSize * 2
        //     let y = ((ty * this.ratio - this.fieldMarginY) - this.fieldSize / 2) / this.fieldSize * 2

        //     if (x >= -1 && x <=1 && y >= -1 && y <=1) this.testPoints.push({x: x, y: y, type: type})
        // })
    }

    animate(){

        requestAnimationFrame(this.animate.bind(this))
        // this.testTrain(64)
        this.updateModel(64)
        this.updateVisuals()

    }

    initModel(){

        this.model = {
            lrate: 1,
            features: [0, 0, 0]
        }

        this.model.f = (x,y) => 1/(1 + Math.exp(-(this.model.features[0] + this.model.features[1] * x + this.model.features[2] * y))) 
    }

    updateModel(n){

        if (this.testPoints.length){

            for (let c = 0; c < n; c++){

                const averages = [0,0,0]

                for (let i = 0; i < this.testPoints.length; i++){

                    const p = this.testPoints[i]
                    let e = p.type - this.model.f(p.x, p.y)
                    e *= (1-e)

                    averages[0] += e
                    averages[1] += e * p.x
                    averages[2] += e * p.y

                }

                this.model.features[0] += averages[0] * this.model.lrate / this.testPoints.length
                this.model.features[1] += averages[1] * this.model.lrate / this.testPoints.length
                this.model.features[2] += averages[2] * this.model.lrate / this.testPoints.length

            }

            for (let i = 0; i < this.testPoints.length; i++){

                const prevalue = this.model.f(this.testPoints[i].x, this.testPoints[i].y)
                this.testPoints[i].prevalue = prevalue
                this.testPoints[i].preclass = prevalue > .5 ? 1 : 0

            }
        }

    }

    getClassAtPoint(x,y){
        return this.model.f(x, y)
    }


    initCanvas(canvas){

        this.canvas = canvas
        this.ratio = window.devicePixelRatio || 1
        this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
        this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
        this.ctx = this.canvas.getContext(`2d`)

        this.fcanvas = document.createElement(`canvas`)
        this.fcanvas.width = this.w / this.resolution
        this.fcanvas.height = this.h / this.resolution
        this.fctx = this.fcanvas.getContext(`2d`)

        this.loss = {last: 0, new: 0}

        this.dotSize = 4 * this.ratio
        this.marginX = this.marginY = this.h * .05

        this.ctx.font = this.fontSize * this.ratio + `px Verdana`
        this.ctx.textBaseline = `middle`

    }

    drawTestData(){

        this.ctx.save()
        this.ctx.translate(this.w / 2, this.h / 2)

        for (let i = 0; i < this.testPoints.length; i++){

            this.ctx.fillStyle = this.testPoints[i].type === 1 ? `#123` : `#fff`
            this.ctx.beginPath()
            this.ctx.arc(this.testPoints[i].x * this.w / 2, this.testPoints[i].y * this.h / 2, this.dotSize, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()

        }

        if (!this.testPoints.length) {
            this.ctx.save()
            this.ctx.textAlign = `center`
            this.ctx.fillText(this.touch ? `Tap here to plot data with one class` : `Click here to plot data with one class.`,0,0)
            this.ctx.fillText(this.touch ? `Hold finger somewhere and tap here for another` : `Right-click for another.`,0,this.ratio * 18)
            this.ctx.restore()
        }

        this.ctx.restore()

    }

    drawField(){

        this.fctx.clearRect(0,0,this.fcanvas.width,this.fcanvas.height)

        let pixels = this.fctx.createImageData(this.fcanvas.width, this.fcanvas.height)

        for (let i = 0; i < pixels.data.length; i += 4){

            let x = ((i / 4) % this.fcanvas.width) / this.fcanvas.width * 2 - 1
            let y = Math.floor((i / 4) / this.fcanvas.width) / this.fcanvas.height * 2 - 1

            const color = this.colors.rawrgb(this.getClassAtPoint(x,y))
            
            pixels.data[i] = color[0]
            pixels.data[i+1] = color[1]
            pixels.data[i+2] = color[2]
            pixels.data[i+3] = 255

        }

        this.fctx.putImageData(pixels,0,0)

        this.ctx.drawImage(this.fcanvas, 0, 0, this.w, this.h)

    }

    updateMetrics(){

        let accuracy = 0
        let truepositives = 0
        let positives = 0
        let falsenegatives = 0
        let tpr = Array(this.rocSamples).fill(0)
        let fpr = Array(this.rocSamples).fill(0)
        let rocauc = 0

        for (let i = 0; i < this.testPoints.length; i++){
            if (this.testPoints[i].type === this.testPoints[i].preclass) accuracy++
            if (this.testPoints[i].type > .5){
                positives++
                if (this.testPoints[i].preclass >= .5){
                    truepositives++
                }
            } else {
                if (this.testPoints[i].preclass >= .5){
                    falsenegatives++
                }
            }
            for (let j = 0; j < this.rocSamples; j++){
                const mu = 1 - j / this.rocSamples
                if (this.testPoints[i].type > .5 && this.testPoints[i].prevalue >= mu) tpr[j]++
                if (this.testPoints[i].type < .5 && this.testPoints[i].prevalue >= mu) fpr[j]++
            }
        }

        this.metrics.accuracy = accuracy / this.testPoints.length
        this.metrics.erate = 1 - this.metrics.accuracy
        this.metrics.precision = truepositives / positives
        this.metrics.recall = truepositives / (truepositives + falsenegatives)
        this.metrics.f1 = 2 * this.metrics.precision * this.metrics.recall / (this.metrics.precision + this.metrics.recall)

        for (let j = 0; j < this.rocSamples; j++){
            tpr[j] /= positives
            fpr[j] /= (this.testPoints.length - positives)
        }
        tpr.unshift(0)
        fpr.unshift(0)
        tpr.push(1)
        fpr.push(1)
        for (let j = 0; j < tpr.length; j++){
            this.metrics.roc[j] = [tpr[j], fpr[j]]
        }
        
        for (let i = 0; i < tpr.length; i++){
            if (fpr[i] !== (fpr[i-1] || 0)){
                const dx = (fpr[i] || 0) - (fpr[i-1] || 0)
                const dy = (tpr[i] || 0) - (tpr[i-1] || 0)
                rocauc += (tpr[i-1] || 0) * dx + dx * dy * .5
            }
        }

        this.metrics.rocauc = rocauc

        this.ctx.fillStyle = `#FFF8`
        this.ctx.fillRect(0,0,this.w * .22, this.h * .54)

        this.ctx.save()
        this.ctx.translate(this.marginX, this.marginX)
        this.ctx.fillStyle = `#000`
        this.ctx.fillText(`Accuracy: ` + (this.humanize(this.metrics.accuracy) || `—`),0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        this.ctx.fillText(`Error rate: ` + (isNaN(this.metrics.erate) ? `—` : this.humanize(this.metrics.erate)),0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        this.ctx.fillText(`Precision: ` + (this.humanize(this.metrics.precision) || `—`),0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        this.ctx.fillText(`Recall: ` + (this.humanize(this.metrics.recall) || `—`),0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        this.ctx.fillText(`F1: ` + (this.humanize(this.metrics.f1) || `—`),0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        this.ctx.fillText(`ROC AUC: ` + (this.humanize(this.metrics.rocauc) || `—`),0,0)

        this.ctx.translate(0, this.fontSize * 5.6)
        this.ctx.fillText(`ROC curve:`,0,0)
        this.ctx.translate(0, this.fontSize * 2.8)
        const w = this.w * .15
        const h = this.h * .1
        const notch = w * .04
        this.ctx.fillStyle = `#FFF8`
        this.ctx.lineWidth = this.ratio
        this.ctx.fillRect(-notch,-notch,w+notch*2,h+notch*2)
        if (this.testPoints.length){
            this.ctx.beginPath()
            this.ctx.moveTo(this.metrics.roc[0][1] * w, h - this.metrics.roc[0][0] * h)
            for (let j = 0; j < this.metrics.roc.length; j++){
                const r = this.metrics.roc[j]
                this.ctx.lineTo(r[1] * w, h - r[0] * h)
            }
            this.ctx.stroke()
        }

        this.ctx.restore()


    }

    humanize(n){
        return Math.round(n * 100) / 100
    }

    updateVisuals(){

        this.ctx.fillStyle = `#FFF`
        this.ctx.fillRect(0, 0, this.w, this.h)

        this.ctx.restore()

        this.drawField()
        this.drawTestData()
        this.updateMetrics()
        
    }

}
