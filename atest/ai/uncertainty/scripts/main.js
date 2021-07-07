let core

window.onload = ()=>{

    const resample = new Button({class: `button`, n: `Resample and refit`})
    const reboot = new Button({class: `button`, n: `Resubsample`})
    // const re = new Button({class: `button`, n: `Reset model`})
    // re.style.backgroundColor = c.style.backgroundColor = `#FFF`
    // re.style.boxShadow = c.style.boxShadow = `0 0 0 2px #000 inset`
    // re.style.color = c.style.color = `#000`
    
    // const d_close = new Button({class: `button`, n: `Intersected`})
    // const d_simple = new Button({class: `button`, n: `Trivial`})
    // const d_u1 = new Button({class: `button`, n: `Balanced U`})
    // const d_u2 = new Button({class: `button`, n: `Unbalanced U`})
    // const d_rng = new Button({class: `button`, n: `Random`})
    
    core = new Core(document.querySelector(`.canvas`))

    document.body.appendChild(resample)
    document.body.appendChild(reboot)
    // document.body.appendChild(d_close)
    // document.body.appendChild(d_u1)
    // document.body.appendChild(d_u2)
    // document.body.appendChild(d_rng)
    // document.body.appendChild(c)
    // document.body.appendChild(re)

    resample.data.onchange = _=>{
        core.init()
        // core.updateVisuals()
    }
    reboot.data.onchange = _=>{
        core.initBootstraps(core.data.testPoints, core.bootstrapSamples)
        core.updateVisuals()
    }

    // c.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = []
    // }
    // re.data.onchange = _=>{
    //     core.initModel()
    // }

    // d_simple.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = [{"x":-0.315,"y":0.84,"type":1},{"x":0.055,"y":-0.045,"type":1},{"x":-0.4625,"y":-0.62,"type":1},{"x":-0.835,"y":0.375,"type":1},{"x":-0.4475,"y":0.285,"type":1},{"x":-0.8225,"y":-0.77,"type":1},{"x":-0.0825,"y":-0.695,"type":1},{"x":0.34,"y":0.615,"type":0},{"x":0.7125,"y":0.765,"type":0},{"x":0.4025,"y":-0.385,"type":0},{"x":0.7525,"y":-0.44,"type":0},{"x":0.5075,"y":-0.815,"type":0},{"x":0.9125,"y":0.205,"type":0},{"x":0.565,"y":0.185,"type":0},{"x":-0.2,"y":0.405,"type":1},{"x":-0.2575,"y":-0.345,"type":1},{"x":-0.6825,"y":-0.155,"type":1},{"x":-0.6425,"y":0.705,"type":1},{"x":0.03,"y":0.76,"type":1},{"x":0.295,"y":0.14,"type":0},{"x":0.2125,"y":-0.7,"type":1},{"x":0.3475,"y":-0.9,"type":0}]
    // }
    // d_close.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = [{"x":-0.4025,"y":0.875,"type":1},{"x":0.25,"y":0.195,"type":1},{"x":-0.2425,"y":-0.395,"type":1},{"x":0.0825,"y":-0.885,"type":1},{"x":-0.0225,"y":0.19,"type":1},{"x":-0.78,"y":0.275,"type":1},{"x":-0.67,"y":-0.715,"type":1},{"x":-0.4275,"y":0.175,"type":1},{"x":-0.7975,"y":0.76,"type":1},{"x":0.0125,"y":0.73,"type":0},{"x":-0.18,"y":0.41,"type":0},{"x":0.215,"y":-0.29,"type":0},{"x":-0.0775,"y":-0.67,"type":0},{"x":0.6725,"y":-0.33,"type":0},{"x":0.7025,"y":0.29,"type":0},{"x":0.5625,"y":0.8,"type":0},{"x":0.94,"y":0.89,"type":0},{"x":0.87,"y":-0.625,"type":0},{"x":0.5,"y":-0.765,"type":0},{"x":-0.235,"y":0.23,"type":0},{"x":0.3675,"y":0.075,"type":1},{"x":-0.025,"y":-0.27,"type":0},{"x":0.2275,"y":-0.69,"type":0},{"x":-0.245,"y":0.87,"type":0},{"x":0.28,"y":0.845,"type":0},{"x":0.1825,"y":0.545,"type":0},{"x":0.4775,"y":-0.325,"type":0},{"x":0.905,"y":0.03,"type":0},{"x":-0.565,"y":-0.215,"type":1},{"x":-0.3975,"y":-0.84,"type":1},{"x":-0.875,"y":-0.305,"type":1},{"x":-0.8775,"y":-0.815,"type":1},{"x":-0.915,"y":0.805,"type":1}]
    // }
    // d_u1.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = [{"x":-0.7125,"y":0.18,"type":1},{"x":-0.6975,"y":-0.09,"type":1},{"x":-0.62,"y":-0.38,"type":1},{"x":-0.5,"y":-0.555,"type":1},{"x":-0.34,"y":-0.65,"type":1},{"x":-0.135,"y":-0.61,"type":1},{"x":0.01,"y":-0.48,"type":1},{"x":0.0725,"y":-0.285,"type":1},{"x":0.1275,"y":-0.025,"type":1},{"x":0.1425,"y":0.23,"type":1},{"x":-0.715,"y":0.28,"type":1},{"x":-0.3,"y":-0.055,"type":0},{"x":-0.2975,"y":0.16,"type":0},{"x":-0.2175,"y":0.44,"type":0},{"x":-0.0875,"y":0.63,"type":0},{"x":0.055,"y":0.71,"type":0},{"x":0.2475,"y":0.695,"type":0},{"x":0.42,"y":0.54,"type":0},{"x":0.53,"y":0.17,"type":0},{"x":0.5275,"y":-0.135,"type":0},{"x":0.565,"y":-0.055,"type":0},{"x":0.5775,"y":-0.17,"type":0},{"x":0.5125,"y":0.065,"type":0},{"x":0.5175,"y":0.27,"type":0},{"x":0.4875,"y":0.37,"type":0},{"x":0.465,"y":0.46,"type":0},{"x":0.38,"y":0.645,"type":0},{"x":0.2975,"y":0.6,"type":0},{"x":0.31,"y":0.665,"type":0},{"x":0.1775,"y":0.7,"type":0},{"x":0.095,"y":0.765,"type":0},{"x":-0.0125,"y":0.66,"type":0},{"x":0.105,"y":0.685,"type":0},{"x":-0.16,"y":0.59,"type":0},{"x":-0.1575,"y":0.51,"type":0},{"x":-0.25,"y":0.38,"type":0},{"x":-0.2475,"y":0.305,"type":0},{"x":-0.285,"y":0.255,"type":0},{"x":-0.29,"y":0.09,"type":0},{"x":-0.315,"y":0.04,"type":0},{"x":-0.275,"y":-0.045,"type":0},{"x":-0.6775,"y":0.255,"type":1},{"x":-0.7,"y":0.075,"type":1},{"x":-0.7225,"y":-0.01,"type":1},{"x":-0.685,"y":-0.03,"type":1},{"x":-0.67,"y":-0.2,"type":1},{"x":-0.65,"y":-0.285,"type":1},{"x":-0.6575,"y":-0.36,"type":1},{"x":-0.5925,"y":-0.41,"type":1},{"x":-0.58,"y":-0.51,"type":1},{"x":-0.5375,"y":-0.52,"type":1},{"x":-0.46,"y":-0.65,"type":1},{"x":-0.445,"y":-0.59,"type":1},{"x":-0.4125,"y":-0.64,"type":1},{"x":-0.3725,"y":-0.7,"type":1},{"x":-0.2975,"y":-0.63,"type":1},{"x":-0.2675,"y":-0.7,"type":1},{"x":-0.215,"y":-0.61,"type":1},{"x":-0.195,"y":-0.64,"type":1},{"x":-0.2725,"y":-0.635,"type":1},{"x":-0.0975,"y":-0.61,"type":1},{"x":-0.0775,"y":-0.52,"type":1},{"x":-0.025,"y":-0.585,"type":1},{"x":-0.0075,"y":-0.42,"type":1},{"x":0.03,"y":-0.375,"type":1},{"x":0.055,"y":-0.2,"type":1},{"x":0.0875,"y":-0.185,"type":1},{"x":0.0925,"y":-0.095,"type":1},{"x":0.1525,"y":0.085,"type":1},{"x":0.0975,"y":0.005,"type":1},{"x":0.12,"y":0.13,"type":1},{"x":0.1675,"y":0.195,"type":1},{"x":-0.105,"y":0.58,"type":0},{"x":-0.0575,"y":0.61,"type":0},{"x":0.445,"y":0.425,"type":0},{"x":0.4875,"y":0.27,"type":0},{"x":0.58,"y":0.05,"type":0},{"x":0.53,"y":-0.04,"type":0}]
    // }
    // d_u2.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = [{"x":-0.7025,"y":0.26,"type":1},{"x":0.135,"y":0.265,"type":1},{"x":-0.325,"y":0.065,"type":0},{"x":0.5725,"y":0.06,"type":0},{"x":-0.6775,"y":0.16,"type":1},{"x":-0.7025,"y":0.04,"type":1},{"x":-0.6475,"y":0.055,"type":1},{"x":-0.695,"y":0.095,"type":1},{"x":-0.7025,"y":0.205,"type":1},{"x":-0.66,"y":-0.075,"type":1},{"x":-0.63,"y":-0.185,"type":1},{"x":-0.56,"y":-0.38,"type":1},{"x":-0.4875,"y":-0.44,"type":1},{"x":-0.365,"y":-0.515,"type":1},{"x":-0.2225,"y":-0.54,"type":1},{"x":-0.0775,"y":-0.525,"type":1},{"x":-0.0025,"y":-0.39,"type":1},{"x":0.04,"y":-0.23,"type":1},{"x":0.0975,"y":0.015,"type":1},{"x":0.1575,"y":0.17,"type":1},{"x":0.1,"y":0.255,"type":1},{"x":0.1275,"y":0.13,"type":1},{"x":0.1225,"y":0.055,"type":1},{"x":0.095,"y":-0.055,"type":1},{"x":0.07,"y":-0.095,"type":1},{"x":0.0625,"y":-0.195,"type":1},{"x":0.05,"y":-0.33,"type":1},{"x":-0.0075,"y":-0.335,"type":1},{"x":-0.0325,"y":-0.475,"type":1},{"x":-0.045,"y":-0.51,"type":1},{"x":-0.1775,"y":-0.53,"type":1},{"x":-0.1575,"y":-0.61,"type":1},{"x":-0.115,"y":-0.52,"type":1},{"x":-0.2375,"y":-0.6,"type":1},{"x":-0.2775,"y":-0.555,"type":1},{"x":-0.3125,"y":-0.59,"type":1},{"x":-0.355,"y":-0.58,"type":1},{"x":-0.47,"y":-0.525,"type":1},{"x":-0.4425,"y":-0.495,"type":1},{"x":-0.4125,"y":-0.57,"type":1},{"x":-0.495,"y":-0.41,"type":1},{"x":-0.5625,"y":-0.375,"type":1},{"x":-0.5975,"y":-0.285,"type":1},{"x":-0.6075,"y":-0.215,"type":1},{"x":-0.6325,"y":-0.075,"type":1},{"x":-0.6425,"y":-0.255,"type":1},{"x":-0.6225,"y":-0.355,"type":1},{"x":-0.5375,"y":-0.475,"type":1},{"x":0.105,"y":-0.17,"type":1},{"x":0.1275,"y":-0.025,"type":1},{"x":0.1575,"y":0.105,"type":1},{"x":0.115,"y":0.21,"type":1},{"x":0.03,"y":-0.32,"type":1},{"x":0.0125,"y":-0.455,"type":1},{"x":-0.0375,"y":-0.43,"type":1},{"x":-0.0925,"y":-0.49,"type":1},{"x":-0.105,"y":-0.59,"type":1},{"x":-0.1975,"y":-0.595,"type":1},{"x":-0.3025,"y":0.255,"type":0},{"x":-0.22,"y":0.515,"type":0},{"x":-0.05,"y":0.67,"type":0},{"x":0.1475,"y":0.77,"type":0},{"x":0.2975,"y":0.675,"type":0},{"x":0.4625,"y":0.44,"type":0},{"x":0.535,"y":0.23,"type":0}]
    // }
    // d_rng.data.onchange = _=>{
    //     core.initModel()
    //     core.testPoints = []
    //     for (let i = 0; i < 16; i++){
    //         core.testPoints.push({x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, type: Math.random() > .5 ? 1 : 0})
    //     }
    // }
}


class Core {

    constructor(canvas){

        this.resolution = 40
        this.colors = light(['#3A2F50', '#F5A897', '#FBF0CA'])
        this.touch = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

        this.labelColors = {
            accuracy: `#377eb8`,
            erate: `#e41a1c`,
            precision: `#4daf4a`,
            recall: `#984ea3`,
            f1: `#ff7f00`,
            rocauc: `#9A67DA`
        }

        this.sampleSize = 128
        this.rocSamples = 8
        this.bootstrapSamples = 1000
        this.bootstrapsShown = 8
        this.modelPrecision = 600

        this.fieldNeedsUpdate = true

        this.initCanvas(canvas)
        this.init()

    }

    init(){

        this.initModel()
        this.initData()
        requestIdleCallback(_=>{
            this.trainModel()
            this.fieldNeedsUpdate = true
            this.initBootstraps(this.data.testPoints, this.bootstrapSamples)
            this.updateVisuals()
        })
        this.updateVisuals()

    }

    initBootstraps(d,n){

        this.data.bootstraps = []
        this.data.bootstrapMetrics = []

        for (let i = 0; i < this.bootstrapSamples; i++){

            this.data.bootstraps.push([])

            for (let j = 0; j < d.length; j++){
                const id = Math.floor(Math.random() * d.length)
                this.data.bootstraps[i].push(d[id])
            }

            this.data.bootstrapMetrics.push(this.getMetrics(this.data.bootstraps[i]))
        }

        this.refined = this.refine(this.data.bootstrapMetrics)

    }

    refine(d){

        const keys = Object.keys(d[0])
        const resolution = Math.min(this.data.testPoints.length - 1, 1000)
        const refined = {}

        for (let k of keys) {

            let max = -Infinity
            const normalized = Array(resolution).fill(0)

            let stdev = 0
            let mean = 0

            for (let i = 0; i < d.length; i++){
                
                const index = Math.floor(d[i][k] * resolution)
                normalized[index]++
                if (normalized[index] > max) max = normalized[index]

                mean += d[i][k] / d.length

            }

            for (let i = 0; i < d.length; i++){
                stdev += (d[i][k] - mean) ** 2 / (d.length - 1)
            }

            for (let i = 0; i < normalized.length; i++){
                normalized[i] /= max
            }

            // console.log(k,mean,stdev**.5)
            refined[k] = {mean: mean, stdev: stdev ** .5, normalized: normalized}
        }

        return refined

    }

    trainModel(){
        this.updateModel(this.modelPrecision)
        this.data.metrics = this.getMetrics(this.data.testPoints)
    }

    initData(){

        this.data = {
            testPoints: [],
            metrics: {},
            bootstraps: [],
            bootstrapMetrics: [],
            refined: {}
        }

        for (let i = 0; i < this.sampleSize; i++){

            const x = Math.random() * 2 - 1
            const y = Math.random() * 2 - 1
            const d = (x ** 2 + y ** 2) ** .5
            const type = .4 + Math.random() * .2 < d ? 0 : 1

            this.data.testPoints.push({x: x, y: y, type: type})

        }

    }

    animate(){

        requestAnimationFrame(this.animate.bind(this))
        this.updateVisuals()

    }

    initModel(){

        this.nn = new Skynet({layers: [2,8,8,1]})

    }

    updateModel(n){

        if (this.data.testPoints.length){

            for (let c = 0; c < n; c++){

                for (let i = 0; i < this.data.testPoints.length; i++){

                    const input = new Matrix(1,2).setFromArray([this.data.testPoints[i].x, this.data.testPoints[i].y])
                    const output = new Matrix(1,1).setFromArray([this.data.testPoints[i].type])

                    this.nn.train(input, output)

                }

                this.nn.applyAdjustments()

            }

            for (let i = 0; i < this.data.testPoints.length; i++){

                const prevalue = this.getClassAtPoint(this.data.testPoints[i].x, this.data.testPoints[i].y)
                this.data.testPoints[i].prevalue = prevalue
                this.data.testPoints[i].preclass = prevalue > .5 ? 1 : 0

            }

        }

    }

    getClassAtPoint(x,y){
        this.nn.feedForward(new Matrix(1,2).setFromArray([x,y]))
        return this.nn.getResultArray()[0]
    }


    initCanvas(canvas){

        this.canvas = canvas
        this.ratio = devicePixelRatio || 1
        this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
        this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
        this.ctx = this.canvas.getContext(`2d`)

        this.fcanvas = document.createElement(`canvas`)
        this.fcanvas.width = this.w / this.resolution
        this.fcanvas.height = this.w / this.resolution
        this.fctx = this.fcanvas.getContext(`2d`)

        this.fontSize = 16 * this.ratio

        // this.loss = {last: 0, new: 0}

        // this.dotSize = 4 * this.ratio
        // this.marginX = this.marginY = this.h * .05

        this.ctx.font = this.fontSize + `px Verdana`
        // this.ctx.textBaseline = `middle`

    }

    drawPoints(d,x,y,w){

        const dotSize = w * .01

        this.ctx.save()
        this.ctx.translate(x + w / 2, y + w / 2)

        for (let i = 0; i < d.length; i++){

            this.ctx.fillStyle = d[i].type === 1 ? `#123` : `#fff`
            this.ctx.beginPath()
            this.ctx.arc(d[i].x * w / 2, d[i].y * w / 2, dotSize, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()

        }

        this.ctx.restore()

    }

    drawField(x,y,w){

        if (this.fieldNeedsUpdate){
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
            this.fieldNeedsUpdate = false
        }

        this.ctx.drawImage(this.fcanvas, x, y, w, w)

    }

    drawMetrics(m,r,x,y){

        const lh = this.fontSize * 2.1

        this.ctx.save()
        this.ctx.fillStyle = `#000`
        this.ctx.textAlign = `left`
        this.ctx.textBaseline = `top`
        this.ctx.translate(x,y)

        this.ctx.fillStyle = this.labelColors.accuracy
        this.ctx.fillText(`Accuracy: ${this.humanize(m.accuracy)} ± ${this.humanize(r.accuracy.stdev * 2)}`, 0, 0)
        this.ctx.fillStyle = this.labelColors.erate
        this.ctx.fillText(`Error rate: ${this.humanize(m.erate)} ± ${this.humanize(r.erate.stdev * 2)}`, 0, lh)
        this.ctx.fillStyle = this.labelColors.precision
        this.ctx.fillText(`Precision: ${this.humanize(m.precision)} ± ${this.humanize(r.precision.stdev * 2)}`, 0, lh * 2)
        this.ctx.fillStyle = this.labelColors.recall
        this.ctx.fillText(`Recall: ${this.humanize(m.recall)} ± ${this.humanize(r.recall.stdev * 2)}`, 0, lh * 3)
        this.ctx.fillStyle = this.labelColors.f1
        this.ctx.fillText(`F1: ${this.humanize(m.f1)} ± ${this.humanize(r.f1.stdev * 2)}`, 0, lh * 4)
        this.ctx.fillStyle = this.labelColors.rocauc
        this.ctx.fillText(`ROC AUC: ${this.humanize(m.rocauc)} ± ${this.humanize(r.rocauc.stdev * 2)}`, 0, lh * 5)

        this.ctx.restore()

    }

    getMetrics(d){

        const metrics = {
            accuracy: 0,
            erate: 0,
            precision: 0,
            recall: 0,
            f1: 0,
            // roc: Array(this.rocSamples),
            rocauc: 0
        }
        let accuracy = 0
        let truepositives = 0
        let positives = 0
        let falsenegatives = 0
        let tpr = Array(this.rocSamples).fill(0)
        let fpr = Array(this.rocSamples).fill(0)
        let rocauc = 0

        for (let i = 0; i < d.length; i++){
            if (d[i].type === d[i].preclass) accuracy++
            if (d[i].type > .5){
                positives++
                if (d[i].preclass >= .5){
                    truepositives++
                }
            } else {
                if (d[i].preclass >= .5){
                    falsenegatives++
                }
            }
            for (let j = 0; j < this.rocSamples; j++){
                const mu = 1 - j / this.rocSamples
                if (d[i].type > .5 && d[i].prevalue >= mu) tpr[j]++
                if (d[i].type < .5 && d[i].prevalue >= mu) fpr[j]++
            }
        }

        metrics.accuracy = accuracy / d.length
        metrics.erate = 1 - metrics.accuracy
        metrics.precision = truepositives / positives
        metrics.recall = truepositives / (truepositives + falsenegatives) || 0
        metrics.f1 = 2 * metrics.precision * metrics.recall / (metrics.precision + metrics.recall) || 0

        for (let j = 0; j < this.rocSamples; j++){
            tpr[j] /= positives
            fpr[j] /= (d.length - positives)
        }
        tpr.unshift(0)
        fpr.unshift(0)
        tpr.push(1)
        fpr.push(1)
        // for (let j = 0; j < tpr.length; j++){
        //     metrics.roc[j] = [tpr[j], fpr[j]]
        // }
        
        for (let i = 0; i < tpr.length; i++){
            if (fpr[i] !== (fpr[i-1] || 0)){
                const dx = (fpr[i] || 0) - (fpr[i-1] || 0)
                const dy = (tpr[i] || 0) - (tpr[i-1] || 0)
                rocauc += (tpr[i-1] || 0) * dx + dx * dy * .5
            }
        }
        metrics.rocauc = rocauc

        return metrics

    }

    humanize(n){
        return Math.round(n * 100) / 100
    }

    drawGraph(r,x,y,dx,dy){

        const step = dx / (r[Object.keys(r)[0]].normalized.length - 1)
        const graphStep = dy / 6
        const gap = this.ratio * 2
        const dh = graphStep - gap
        // const substep = step / Object.keys(r).length
        // const colors = [`#F005`, `#FF05`, `#0F05`, `#0FF5`, `#00F5`, `#F0F5`]

        this.ctx.save()
        this.ctx.translate(x, y)
        // this.ctx.lineWidth = this.ratio

        let i = 0

        for (let k in r){

            const currentH = i * graphStep

            this.ctx.globalAlpha = 1
            this.ctx.fillStyle = `#f4f4ee`
            this.ctx.fillRect(0, currentH, dx, dh)

            this.ctx.globalAlpha = .5

            this.ctx.fillStyle = this.labelColors[k] //colors[subx]

            // this.ctx.beginPath()
            // this.ctx.moveTo(0, dy - dy * r[k].normalized[0])
            for (let i = 1; i < r[k].normalized.length; i++){

                // this.ctx.lineTo(step * i, dy - dy * r[k].normalized[i])

                // const y = dy - dy * r[k].normalized[i]
                // this.ctx.beginPath()
                // this.ctx.moveTo(step * i, y)
                // this.ctx.lineTo(step * (i + 1), y)
                // this.ctx.stroke()
                this.ctx.fillRect(step * i, currentH + dh, step, -dh * r[k].normalized[i])


            }
            // this.ctx.stroke()

            i++

        }

        this.ctx.restore()

        this.ctx.save()
        this.ctx.font = dy * .07 + `px Verdana`
        this.ctx.textAlign = `center`
        this.ctx.fillStyle = `#000`
        this.ctx.translate(x + dx/2, y - dy * .04)
        this.ctx.fillText(`Bootstrap metrics distribution`,0,0)
        this.ctx.fillText(`0`, -dx*.5,0)
        this.ctx.fillText(`1`, dx*.5,0)
        this.ctx.restore()

    }

    updateVisuals(){

        this.ctx.fillStyle = `#FFF`
        this.ctx.fillRect(0, 0, this.w, this.h)

        // this.ctx.restore()

        const w = this.h / 2
        const margin = w * .04

        this.drawPlot(this.data.testPoints, 0, this.fontSize * 2, w, `Original sample`)
        
        const step = this.w / this.bootstrapsShown

        if (this.data.bootstraps.length){
            for (let i = 0; i < this.bootstrapsShown - 1; i++){
                this.drawPlot(this.data.bootstraps[i], i * step, this.h - step, step - margin, `Bootstrap ${i}`)
            }
            this.ctx.fillStyle = `#000`
            this.ctx.fillText(`+${this.bootstrapSamples - this.bootstrapsShown + 1}`, (this.bootstrapsShown - 1) * step, this.h - step/2)
            this.drawMetrics(this.data.metrics, this.refined, w + margin * 2, this.fontSize * 2.6)
            this.drawGraph(this.refined, w * 2.2, this.fontSize * 2, w * 1.7, w)
        }
        
    }

    drawPlot(d,x,y,w,label){
        this.drawField(x,y,w)
        this.drawPoints(d,x,y,w)
        if (label){

            this.ctx.save()
            this.ctx.font = w * .07 + `px Verdana`
            this.ctx.textAlign = `center`
            this.ctx.fillStyle = `#000`
            this.ctx.translate(x + w/2, y - w * .04)
            this.ctx.fillText(label,0,0)
            this.ctx.restore()

        }
    }

}

class Skynet {

    constructor(a){

        this.activation = v=>Math.tanh(v)
        this.activationDer = v=>1-(Math.tanh(v)**2)

        this.learningRate = .005
        this.regularizationRate = 0

        this.buildLayers(a.layers || [2,2,2])

    }

    getGenerator(stdev){

        let y2
        let use_last = false
        return function() {
            let y1
            if (use_last) {
               y1 = y2
               use_last = false
            }
            else {
                let x1, x2, w
                do {
                     x1 = 2.0 * Math.random() - 1.0
                     x2 = 2.0 * Math.random() - 1.0
                     w  = x1 * x1 + x2 * x2              
                } while (w >= 1.0)
                w = Math.sqrt((-2.0 * Math.log(w))/w)
                y1 = x1 * w
                y2 = x2 * w
                use_last = true
           }

           let retval = stdev * y1
           return retval
        }

    }

    buildLayers(l){

        this.layers = []

        for (let i = 0; i < l.length; i++){

            const generator = this.getGenerator((1 / l[i]) ** .5)

            this.layers.push({
                values: new Matrix(1,l[i]),
                biases: new Matrix(1, l[i]).setFromGenerator(generator),
                weights: i === l.length - 1 ? false : new Matrix(l[i],l[i+1]).setFromGenerator(generator),
                db: [],
                dw: []
            })

        }

    }

    feedForward(v){

        if (v.array.length === this.layers[0].values.h){

            this.layers[0].values.copyFrom(v)

            for (let i = 0; i < this.layers.length - 1; i++){

                const l = this.layers[i]
                const n = this.layers[i+1]
                n.preactivation = l.weights.multiply(l.values).sum(n.biases)
                n.values = this.activate(n.preactivation)

            }
            
        } else {
            console.log(`Activation vector mismatch`)
        }

    }

    backPropagate(mi, mc){
        
        const lastLayer = this.layers[this.layers.length - 1]

        lastLayer.errors = new Matrix(1, lastLayer.values.array.length)
        lastLayer.activationDers = this.activate(lastLayer.values, true)

        for (let i = 0; i < lastLayer.values.array.length; i++){
            lastLayer.errors.array[i] = 2 * (mc.array[i] - lastLayer.values.array[i])
        }
        for (let li = this.layers.length - 2; li >= 0; li--){

            const l = this.layers[li]

            const wtransposed = l.weights.getTransposed()
            
            l.errors = wtransposed.multiply(this.layers[li + 1].errors)
            l.activationDers = this.activate(l.values, true)


        }


        //Calculating adjustments for weights and biases
        for (let i = 1; i < this.layers.length; i++){

            const db = this.layers[i].errors.multiply(this.learningRate).elementWise(this.layers[i].activationDers)
            const dw = db.multiply(this.layers[i - 1].values.getTransposed())

            //REGULARIZATION
            for (let j = 0; j < dw.array.length; j++){

                dw.array[j] += -this.layers[i-1].weights.array[j] / this.layers[i-1].weights.h * this.regularizationRate * this.learningRate

            }

            this.layers[i].db.push(db)
            this.layers[i-1].dw.push(dw)

        }
    }

    applyAdjustments(){

        for (let i = 0; i < this.layers.length; i++){

            const l = this.layers[i]

            if (l.db.length){
                
                let db = new Matrix(l.biases.w, l.biases.h)
                for (let j = 0; j < l.db.length; j++){
                    db = db.sum(l.db[j])
                }
                db.multiply(1/l.db.length)
                l.biases = l.biases.sum(db)

                l.db = []

            }

            if (l.dw.length){
                
                let dw = new Matrix(l.weights.w, l.weights.h)
                for (let j = 0; j < l.dw.length; j++){
                    dw = dw.sum(l.dw[j])
                }
                dw.multiply(1/l.dw.length)
                l.weights = l.weights.sum(dw)

                l.dw = []
            }

        }

    }

    train(mi, mc){

        this.feedForward(mi)
        this.backPropagate(mi, mc)
        

    }

    activate(m, back){

        const result = new Matrix(m.w, m.h)

        for (let i = 0; i < result.array.length; i++){
            result.array[i] = back ? this.activationDer(m.array[i]) : this.activation(m.array[i])
        }

        return result

    }

    getResultArray(){

        return this.layers[this.layers.length - 1].values.array

    }

    randomizeWB(){

        for (let l of this.layers){

            const generator = this.getGenerator((1 / l.biases.h) ** .5)

            if (l.biases) l.biases = new Matrix(l.biases.w, l.biases.h).setFromGenerator(generator)
            if (l.weights) l.weights = new Matrix(l.weights.w, l.weights.h).setFromGenerator(generator)

        }

    }
}

class Matrix{

    constructor(x,y){

        this.array = []
        this.w = x
        this.h = y
        for (let i = 0; i < x*y; i++){
            this.array.push(0)
        }

    }

    copyFrom(m){

        for (let i = 0; i < this.array.length; i++){

            this.array[i] = m.array[i]

        }

        return this

    }

    setFromArray(a){
        for (let i = 0; i < a.length; i++){
            this.array[i] = a[i]
        }
        return this
    }

    setRandom(){
        for (let i = 0; i < this.array.length; i++){
            this.array[i] = Math.random() * 2 - 1
        }
        return this
    }

    setFromGenerator(g){
        for (let i = 0; i < this.array.length; i++){
            this.array[i] = g()
        }
        return this
    }

    getTransposed(){


        const result = new Matrix(this.h, this.w)

        for (let i = 0; i < this.array.length; i++){

            const rx = Math.floor(i / this.w)
            const ry = i % this.w

            result.array[rx + this.h * ry] = this.array[i]

        }

        return result

    }

    getAbsoluteColumn(){

        const result = new Matrix(1, this.h)
        result.array = []

        for (let i = 0; i < this.h; i++){

            let sum = 0
            for (let j = 0; j < this.w; j++){
                sum += Math.abs(this.array[j + i * this.w])
            }
            result.array.push(sum)

        }

        return result

    }

    multiply(m){

        let result

        if (m instanceof Matrix){

            result = new Matrix(m.w, this.h)
            result.array = []

            for (let i = 0; i < this.h; i++){
                for (let j = 0; j < m.w; j++){

                    let sum = 0
                    for (let k = 0; k < this.w; k++){
                        sum += this.array[k + i * this.w] * m.array[j + k * m.w]
                    }
                    result.array.push(sum)

                }
            }

        } else {

            result = new Matrix(this.w, this.h)

            for (let i = 0; i < this.array.length; i++){

                result.array[i] = this.array[i] * m

            }

        }

        return result

    }

    elementWise(m){

        if (this.w === m.w && this.h === m.h){

            const result = new Matrix(this.w, this.h)
            for (let i = 0; i < this.array.length; i++){
                result.array[i] = this.array[i] * m.array[i]
            }

            return result

        }

    }

    sum(m){

        if (this.w === m.w && this.h === m.h){

            const result = new Matrix(this.w, this.h)
            for (let i = 0; i < this.array.length; i++){
                result.array[i] = this.array[i] + m.array[i]
            }
            return result

        } else {
            console.log(`Dimensions mismatch in sum`)
        }

    }

}
