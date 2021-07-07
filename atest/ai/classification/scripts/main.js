let core

window.onload = ()=>{

    const r = new Button({class: `button`, n: `Randomize weights`})
    const c = new Button({class: `button`, n: `Clear`})
    const s = new Toggle({n1: `Stop`, n2: `Start`, class: `go`, class2: `stopped`})
    // const reg = new Toggle({n1: `+reg`, n2: `-reg`, class: `go`})
    const l = new Range({ width: 500, value: .05, class: `input`, min: .000001, max: 2, scale: 10, label: `Learning rate`, labelWidth: 160})
    const rt = new Toggle({n1: `L1`, n2: `L2`, class: `go`})
    const rr = new Range({ width: 500, value: 0, class: `input`, min: 0, max: 1, scale: 2, label: `Regularization rate`, labelWidth: 160, log: 6})
    const p = new Range({ width: 500, value: 4, class: `input`, min: 1, max: 5, scale: 4, label: `Polynomial degree`, labelWidth: 160, step: 1})
    
    const d_circle = new Button({class: `button`, n: `Ring`})
    const d_simple = new Button({class: `button`, n: `Trivial`})
    const d_bands = new Button({class: `button`, n: `Bands`})
    const d_trojans = new Button({class: `button`, n: `Trojans`})
    const d_ml = new Button({class: `button`, n: `Machine learning`})
    
    const setup = {layers: [20]}
    core = new Neuro(setup, document.querySelector(`.canvas`))

    document.body.appendChild(p)
    document.body.appendChild(l)
    document.body.appendChild(rr)
    const rt_label = document.createElement(`div`)
    rt_label.classList.add(`label`)
    rt_label.innerHTML = `Regularization type`
    document.body.appendChild(rt_label)
    document.body.appendChild(rt)
    document.body.appendChild(document.createElement(`br`))
    
    

    const d_label = document.createElement(`div`)
    d_label.classList.add(`label`)
    d_label.innerHTML = `Preset data`
    document.body.appendChild(d_label)

    document.body.appendChild(d_simple)
    document.body.appendChild(d_circle)
    document.body.appendChild(d_bands)
    document.body.appendChild(d_trojans)
    document.body.appendChild(d_ml)
    document.body.appendChild(document.createElement(`br`))

    document.body.appendChild(r)
    document.body.appendChild(c)
    document.body.appendChild(s)
    r.classList.add(`margined`)


    // reg.data.onchange = _=>{
    //     core.regularization = !core.regularization
    // }
    rr.data.onchange = v=>{
        core.regularizationRate = v
    }
    rt.data.onchange = _=>{
        core.l2 = !core.l2
    }
    r.data.onchange = _=>{
        core.randomizeWeights()
    }
    l.data.onchange = v=>{
        core.learningRate = v
    }
    c.data.onchange = _=>{
        core.testPoints = []
    }
    p.data.onchange = v=>{
        core.updateDegree(v)
    }
    s.data.onchange = _=>{
        core.alive = !core.alive
    }

    

    d_simple.data.onchange = _=>{
        core.testPoints = [{x: 0.54, y: -0.71, type: 1},{x: -0.325, y: -0.77, type: 1},{x: 0.145, y: -0.405, type: 1},{x: -0.23, y: -0.09, type: 1},{x: -0.7, y: 0.46, type: 1},{x: -0.385, y: 0.67, type: 1},{x: -0.4, y: 0.235, type: 1},{x: -0.755, y: -0.03, type: 1},{x: -0.775, y: -0.59, type: 1},{x: -0.39, y: -0.57, type: 1},{x: 0.575, y: -0.145, type: -1},{x: 0.235, y: 0.265, type: -1},{x: 0.33, y: 0.735, type: -1},{x: 0.05, y: 0.84, type: -1},{x: 0.595, y: 0.87, type: -1},{x: 0.785, y: 0.59, type: -1},{x: 0.54, y: 0.23, type: -1},{x: 0.915, y: -0.135, type: -1}]
    }
    d_circle.data.onchange = _=>{
        core.testPoints = [{x: -0.09, y: 0.175, type: 1},{x: -0.205, y: 0.145, type: 1},{x: -0.19, y: 0.05, type: 1},{x: -0.19, y: -0.07, type: 1},{x: -0.065, y: -0.13, type: 1},{x: 0.065, y: -0.16, type: 1},{x: 0.2, y: -0.11, type: 1},{x: 0.235, y: 0.025, type: 1},{x: 0.22, y: 0.095, type: 1},{x: 0.14, y: 0.205, type: 1},{x: -0.15, y: 0.215, type: 1},{x: -0.24, y: 0.15, type: 1},{x: -0.28, y: -0.07, type: 1},{x: -0.01, y: -0.135, type: 1},{x: 0.04, y: -0.105, type: 1},{x: 0.095, y: 0, type: 1},{x: 0.02, y: 0.055, type: 1},{x: -0.065, y: 0.025, type: 1},{x: -0.095, y: -0.025, type: 1},{x: -0.115, y: 0.035, type: 1},{x: -0.13, y: 0.18, type: 1},{x: 0.13, y: 0.235, type: 1},{x: 0.08, y: 0.11, type: 1},{x: -0.025, y: 0.13, type: 1},{x: -0.035, y: 0.215, type: 1},{x: -0.095, y: -0.57, type: -1},{x: -0.37, y: -0.57, type: -1},{x: -0.465, y: -0.47, type: -1},{x: -0.675, y: -0.17, type: -1},{x: -0.775, y: 0.225, type: -1},{x: -0.605, y: 0.5, type: -1},{x: -0.32, y: 0.63, type: -1},{x: 0.26, y: 0.675, type: -1},{x: 0.685, y: 0.475, type: -1},{x: 0.77, y: 0.145, type: -1},{x: 0.7, y: -0.295, type: -1},{x: 0.385, y: -0.6, type: -1},{x: -0.025, y: -0.755, type: -1},{x: -0.58, y: -0.65, type: -1},{x: -0.675, y: -0.44, type: -1},{x: -0.65, y: 0.08, type: -1},{x: -0.365, y: 0.505, type: -1},{x: 0.205, y: 0.715, type: -1},{x: 0.555, y: 0.555, type: -1},{x: 0.65, y: 0.375, type: -1},{x: 0.76, y: -0.06, type: -1},{x: 0.555, y: -0.455, type: -1},{x: 0.155, y: -0.655, type: -1},{x: -0.28, y: -0.645, type: -1},{x: -0.585, y: -0.375, type: -1},{x: -0.705, y: 0.165, type: -1},{x: -0.445, y: 0.605, type: -1},{x: -0.295, y: 0.67, type: -1},{x: 0, y: 0.695, type: -1},{x: 0.365, y: 0.61, type: -1},{x: 0.565, y: 0.485, type: -1},{x: 0.7, y: 0.27, type: -1},{x: 0.705, y: -0.14, type: -1},{x: 0.67, y: -0.4, type: -1},{x: 0.47, y: -0.64, type: -1},{x: 0.37, y: -0.715, type: -1},{x: 0.065, y: -0.72, type: -1}]
    }
    d_bands.data.onchange = _=>{
        core.testPoints = [{x: -0.145, y: -0.89, type: 1},{x: -0.145, y: -0.795, type: 1},{x: -0.145, y: -0.715, type: 1},{x: -0.155, y: -0.525, type: 1},{x: -0.16, y: -0.36, type: 1},{x: -0.16, y: -0.175, type: 1},{x: -0.17, y: -0.005, type: 1},{x: -0.18, y: 0.23, type: 1},{x: -0.185, y: 0.385, type: 1},{x: -0.19, y: 0.565, type: 1},{x: -0.19, y: 0.665, type: 1},{x: 0.155, y: 0.88, type: -1},{x: 0.13, y: 0.855, type: -1},{x: 0.135, y: 0.695, type: -1},{x: 0.16, y: 0.53, type: -1},{x: 0.165, y: 0.385, type: -1},{x: 0.17, y: 0.28, type: -1},{x: 0.185, y: 0.02, type: -1},{x: 0.2, y: -0.19, type: -1},{x: 0.175, y: -0.355, type: -1},{x: 0.18, y: -0.55, type: -1},{x: 0.18, y: -0.655, type: -1},{x: 0.185, y: -0.755, type: -1},{x: 0.2, y: -0.84, type: -1},{x: 0.56, y: -0.865, type: 1},{x: 0.555, y: -0.78, type: 1},{x: 0.55, y: -0.69, type: 1},{x: 0.545, y: -0.49, type: 1},{x: 0.55, y: -0.3, type: 1},{x: 0.55, y: -0.095, type: 1},{x: 0.545, y: 0.175, type: 1},{x: 0.55, y: 0.35, type: 1},{x: 0.56, y: 0.69, type: 1},{x: 0.555, y: 0.8, type: 1},{x: 0.555, y: 0.91, type: 1},{x: -0.665, y: -0.9, type: -1},{x: -0.65, y: -0.81, type: -1},{x: -0.635, y: -0.605, type: -1},{x: -0.635, y: -0.51, type: -1},{x: -0.65, y: -0.375, type: -1},{x: -0.655, y: -0.175, type: -1},{x: -0.665, y: 0.03, type: -1},{x: -0.67, y: 0.19, type: -1},{x: -0.675, y: 0.36, type: -1},{x: -0.68, y: 0.47, type: -1},{x: -0.69, y: 0.545, type: -1},{x: -0.69, y: 0.675, type: -1},{x: -0.695, y: 0.745, type: -1},{x: -0.7, y: 0.79, type: -1}]
    }
    d_trojans.data.onchange = _=>{
        core.testPoints = [{x: -0.91, y: -0.075, type: 1},{x: -0.87, y: -0.075, type: 1},{x: -0.805, y: -0.075, type: 1},{x: -0.69, y: -0.075, type: 1},{x: -0.555, y: -0.075, type: 1},{x: -0.435, y: -0.075, type: 1},{x: -0.28, y: -0.075, type: 1},{x: -0.14, y: -0.075, type: 1},{x: 0.03, y: -0.075, type: 1},{x: 0.19, y: -0.075, type: 1},{x: 0.285, y: -0.08, type: 1},{x: 0.535, y: -0.085, type: 1},{x: 0.59, y: -0.09, type: 1},{x: 0.7, y: -0.09, type: 1},{x: 0.795, y: -0.095, type: 1},{x: 0.82, y: -0.09, type: 1},{x: -0.88, y: 0.055, type: -1},{x: -0.825, y: 0.06, type: -1},{x: -0.78, y: 0.06, type: -1},{x: -0.635, y: 0.045, type: -1},{x: -0.5, y: 0.035, type: -1},{x: -0.445, y: 0.04, type: -1},{x: -0.275, y: 0.04, type: -1},{x: -0.07, y: 0.05, type: -1},{x: 0.07, y: 0.025, type: -1},{x: 0.235, y: 0.04, type: -1},{x: 0.35, y: 0.05, type: -1},{x: 0.43, y: 0.045, type: -1},{x: 0.52, y: 0.045, type: -1},{x: 0.56, y: 0.045, type: -1},{x: 0.68, y: 0.04, type: -1},{x: 0.715, y: 0.04, type: -1},{x: 0.785, y: 0.035, type: -1},{x: 0.87, y: 0.03, type: -1},{x: -0.115, y: -0.615, type: -1},{x: -0.14, y: -0.575, type: -1},{x: -0.14, y: -0.525, type: -1},{x: -0.09, y: -0.505, type: -1},{x: -0.02, y: -0.51, type: -1},{x: -0.01, y: -0.55, type: -1},{x: -0.015, y: -0.61, type: -1},{x: -0.065, y: -0.62, type: -1},{x: -0.09, y: -0.565, type: -1},{x: -0.045, y: -0.55, type: -1},{x: -0.09, y: 0.545, type: 1},{x: -0.115, y: 0.595, type: 1},{x: -0.13, y: 0.635, type: 1},{x: -0.04, y: 0.665, type: 1},{x: 0.02, y: 0.64, type: 1},{x: 0.03, y: 0.585, type: 1},{x: 0.015, y: 0.47, type: 1},{x: -0.045, y: 0.5, type: 1},{x: -0.075, y: 0.585, type: 1},{x: -0.035, y: 0.59, type: 1},{x: -0.03, y: 0.565, type: 1},{x: 0.545, y: 0.305, type: -1},{x: 0.85, y: 0.59, type: -1},{x: 0.765, y: 0.255, type: -1},{x: 0.41, y: 0.14, type: -1},{x: -0.605, y: 0.215, type: -1},{x: -0.825, y: 0.215, type: -1},{x: -0.33, y: 0.195, type: -1},{x: -0.565, y: 0.5, type: -1},{x: -0.835, y: 0.4, type: -1},{x: -0.9, y: 0.705, type: -1},{x: -0.73, y: 0.9, type: -1},{x: -0.85, y: -0.715, type: 1},{x: -0.835, y: -0.405, type: 1},{x: -0.64, y: -0.425, type: 1},{x: -0.455, y: -0.295, type: 1},{x: -0.25, y: -0.21, type: 1},{x: 0.43, y: -0.245, type: 1},{x: 0.45, y: -0.59, type: 1},{x: 0.505, y: -0.665, type: 1},{x: 0.755, y: -0.7, type: 1},{x: 0.77, y: -0.465, type: 1},{x: 0.65, y: -0.295, type: 1},{x: 0.525, y: -0.305, type: 1}]
    }
    d_ml.data.onchange = _=>{
        core.testPoints = [{x: -0.75, y: -0.7, type: 1},{x: -0.76, y: -0.62, type: 1},{x: -0.755, y: -0.585, type: 1},{x: -0.75, y: -0.55, type: 1},{x: -0.755, y: -0.495, type: 1},{x: -0.755, y: -0.465, type: 1},{x: -0.755, y: -0.44, type: 1},{x: -0.755, y: -0.685, type: 1},{x: -0.735, y: -0.68, type: 1},{x: -0.7, y: -0.645, type: 1},{x: -0.675, y: -0.625, type: 1},{x: -0.66, y: -0.6, type: 1},{x: -0.645, y: -0.605, type: 1},{x: -0.615, y: -0.635, type: 1},{x: -0.59, y: -0.66, type: 1},{x: -0.565, y: -0.685, type: 1},{x: -0.54, y: -0.71, type: 1},{x: -0.53, y: -0.7, type: 1},{x: -0.525, y: -0.66, type: 1},{x: -0.525, y: -0.63, type: 1},{x: -0.525, y: -0.595, type: 1},{x: -0.52, y: -0.55, type: 1},{x: -0.52, y: -0.51, type: 1},{x: -0.52, y: -0.48, type: 1},{x: -0.52, y: -0.45, type: 1},{x: -0.52, y: -0.44, type: 1},{x: -0.225, y: -0.715, type: -1},{x: -0.225, y: -0.69, type: -1},{x: -0.22, y: -0.64, type: -1},{x: -0.225, y: -0.61, type: -1},{x: -0.225, y: -0.58, type: -1},{x: -0.225, y: -0.55, type: -1},{x: -0.23, y: -0.53, type: -1},{x: -0.235, y: -0.455, type: -1},{x: -0.225, y: -0.49, type: -1},{x: -0.195, y: -0.455, type: -1},{x: -0.105, y: -0.455, type: -1},{x: -0.095, y: -0.45, type: -1},{x: -0.15, y: -0.455, type: -1},{x: -0.045, y: -0.46, type: -1},{x: -0.065, y: -0.465, type: -1},{x: -0.05, y: -0.5, type: -1},{x: -0.055, y: -0.52, type: -1},{x: -0.76, y: -0.165, type: -1},{x: -0.765, y: -0.125, type: -1},{x: -0.765, y: -0.085, type: -1},{x: -0.76, y: -0.045, type: -1},{x: -0.74, y: 0.06, type: -1},{x: -0.75, y: -0.01, type: -1},{x: -0.75, y: 0.03, type: -1},{x: -0.755, y: 0.075, type: -1},{x: -0.755, y: 0.11, type: -1},{x: -0.75, y: 0.13, type: -1},{x: -0.75, y: 0.16, type: -1},{x: -0.72, y: -0.005, type: -1},{x: -0.71, y: 0.005, type: -1},{x: -0.675, y: -0.005, type: -1},{x: -0.64, y: -0.01, type: -1},{x: -0.615, y: -0.005, type: -1},{x: -0.575, y: 0.005, type: -1},{x: -0.565, y: 0, type: -1},{x: -0.52, y: -0.165, type: -1},{x: -0.525, y: -0.135, type: -1},{x: -0.52, y: -0.085, type: -1},{x: -0.52, y: -0.045, type: -1},{x: -0.515, y: 0, type: -1},{x: -0.515, y: 0.03, type: -1},{x: -0.505, y: 0.085, type: -1},{x: -0.505, y: 0.115, type: -1},{x: -0.5, y: 0.15, type: -1},{x: -0.5, y: 0.15, type: -1},{x: -0.26, y: -0.185, type: 1},{x: -0.265, y: -0.185, type: 1},{x: -0.25, y: -0.13, type: 1},{x: -0.255, y: -0.1, type: 1},{x: -0.27, y: -0.065, type: 1},{x: -0.265, y: -0.035, type: 1},{x: -0.26, y: -0.005, type: 1},{x: -0.265, y: 0.03, type: 1},{x: -0.265, y: 0.06, type: 1},{x: -0.27, y: 0.09, type: 1},{x: -0.27, y: 0.115, type: 1},{x: -0.235, y: 0.12, type: 1},{x: -0.215, y: 0.115, type: 1},{x: -0.145, y: 0.1, type: 1},{x: -0.14, y: 0.11, type: 1},{x: -0.1, y: 0.105, type: 1},{x: -0.18, y: 0.11, type: 1},{x: -0.23, y: -0.015, type: 1},{x: -0.21, y: -0.02, type: 1},{x: -0.195, y: -0.02, type: 1},{x: -0.215, y: -0.175, type: 1},{x: -0.19, y: -0.18, type: 1},{x: -0.15, y: -0.175, type: 1},{x: -0.13, y: -0.175, type: 1},{x: -0.105, y: -0.175, type: 1},{x: -0.085, y: -0.17, type: 1},{x: -0.07, y: -0.17, type: 1},{x: 0.145, y: -0.18, type: -1},{x: 0.15, y: -0.16, type: -1},{x: 0.155, y: -0.145, type: -1},{x: 0.16, y: -0.11, type: -1},{x: 0.16, y: -0.085, type: -1},{x: 0.16, y: -0.035, type: -1},{x: 0.165, y: 0.015, type: -1},{x: 0.17, y: 0.055, type: -1},{x: 0.17, y: 0.08, type: -1},{x: 0.175, y: -0.22, type: -1},{x: 0.2, y: -0.225, type: -1},{x: 0.28, y: -0.22, type: -1},{x: 0.3, y: -0.195, type: -1},{x: 0.32, y: -0.155, type: -1},{x: 0.32, y: -0.13, type: -1},{x: 0.31, y: -0.105, type: -1},{x: 0.28, y: -0.065, type: -1},{x: 0.22, y: -0.045, type: -1},{x: 0.21, y: -0.04, type: -1},{x: -0.73, y: 0.495, type: 1},{x: -0.735, y: 0.46, type: 1},{x: -0.73, y: 0.445, type: 1},{x: -0.71, y: 0.415, type: 1},{x: -0.68, y: 0.395, type: 1},{x: -0.64, y: 0.39, type: 1},{x: -0.605, y: 0.39, type: 1},{x: -0.58, y: 0.395, type: 1},{x: -0.55, y: 0.42, type: 1},{x: -0.54, y: 0.45, type: 1},{x: -0.55, y: 0.51, type: 1},{x: -0.575, y: 0.56, type: 1},{x: -0.605, y: 0.6, type: 1},{x: -0.635, y: 0.615, type: 1},{x: -0.69, y: 0.655, type: 1},{x: -0.715, y: 0.69, type: 1},{x: -0.725, y: 0.71, type: 1},{x: -0.725, y: 0.745, type: 1},{x: -0.71, y: 0.745, type: 1},{x: -0.625, y: 0.74, type: 1},{x: -0.605, y: 0.74, type: 1},{x: -0.57, y: 0.74, type: 1},{x: -0.485, y: 0.74, type: 1},{x: -0.24, y: 0.385, type: -1},{x: -0.27, y: 0.41, type: -1},{x: -0.295, y: 0.52, type: -1},{x: -0.31, y: 0.47, type: -1},{x: -0.34, y: 0.535, type: -1},{x: -0.345, y: 0.57, type: -1},{x: -0.34, y: 0.615, type: -1},{x: -0.32, y: 0.655, type: -1},{x: -0.285, y: 0.685, type: -1},{x: -0.255, y: 0.705, type: -1},{x: -0.155, y: 0.705, type: -1},{x: -0.13, y: 0.69, type: -1},{x: -0.1, y: 0.64, type: -1},{x: -0.085, y: 0.59, type: -1},{x: -0.075, y: 0.54, type: -1},{x: -0.07, y: 0.49, type: -1},{x: -0.075, y: 0.45, type: -1},{x: -0.095, y: 0.415, type: -1},{x: -0.115, y: 0.38, type: -1},{x: -0.17, y: 0.375, type: -1},{x: -0.19, y: 0.375, type: -1},{x: 0.15, y: 0.445, type: 1},{x: 0.145, y: 0.415, type: 1},{x: 0.185, y: 0.365, type: 1},{x: 0.215, y: 0.355, type: 1},{x: 0.275, y: 0.35, type: 1},{x: 0.31, y: 0.365, type: 1},{x: 0.325, y: 0.385, type: 1},{x: 0.325, y: 0.41, type: 1},{x: 0.32, y: 0.46, type: 1},{x: 0.295, y: 0.5, type: 1},{x: 0.27, y: 0.53, type: 1},{x: 0.24, y: 0.555, type: 1},{x: 0.205, y: 0.605, type: 1},{x: 0.185, y: 0.635, type: 1},{x: 0.15, y: 0.66, type: 1},{x: 0.145, y: 0.67, type: 1},{x: 0.15, y: 0.675, type: 1},{x: 0.185, y: 0.67, type: 1},{x: 0.235, y: 0.665, type: 1},{x: 0.255, y: 0.66, type: 1},{x: 0.3, y: 0.655, type: 1},{x: 0.3, y: 0.66, type: 1},{x: 0.35, y: 0.665, type: 1},{x: 0.59, y: 0.36, type: -1},{x: 0.54, y: 0.39, type: -1},{x: 0.525, y: 0.46, type: -1},{x: 0.52, y: 0.495, type: -1},{x: 0.515, y: 0.555, type: -1},{x: 0.52, y: 0.585, type: -1},{x: 0.555, y: 0.605, type: -1},{x: 0.575, y: 0.62, type: -1},{x: 0.595, y: 0.63, type: -1},{x: 0.635, y: 0.635, type: -1},{x: 0.685, y: 0.62, type: -1},{x: 0.705, y: 0.585, type: -1},{x: 0.735, y: 0.52, type: -1},{x: 0.745, y: 0.47, type: -1},{x: 0.765, y: 0.385, type: -1},{x: 0.74, y: 0.36, type: -1},{x: 0.705, y: 0.33, type: -1},{x: 0.655, y: 0.29, type: -1},{x: 0.61, y: 0.3, type: -1},{x: 0.56, y: 0.315, type: -1},{x: 0.55, y: 0.345, type: -1},{x: -0.06, y: 0.11, type: 1}]
    }



    

}


class Neuro {

    constructor(p, canvas){

        this.learningRate = .05
        this.regularizationRate = 0
        this.regerror = 0
        this.l2 = false
        this.resolution = 8
        this.colors = light(`depth`)
        this.positiveColors = light(`fire`)
        this.negativeColors = light(`depth`)
        this.alive = true
        this.touch = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

        this.rule = (x, y) => x ** 2 + y ** 2 > .4 ? 1 : -1
        this.polyText = [`x`, `y`, `xy`, `x²`,`y²`,`x³`,`y³`,`x²y`, `y²x`, `x⁴`, `y⁴`, `x³y`, `y³x`, `x²y²`, `x⁵`, `y⁵`, `x⁴y`, `y⁴x`, `y³x²`, `x³y²`]

        this.initTestPoints(0)
        this.buildLayers(p.layers)
        this.initCanvas(canvas)
        this.setListeners()
        this.updateDegree(4)

        this.animate()

    }

    setListeners(){
        this.canvas.addEventListener(`mousedown`, e=>{

            let type = e.button === 0 ? 1 : -1

            let x = ((e.offsetX * this.ratio - this.fieldMarginX) - this.fieldSize / 2) / this.fieldSize * 2
            let y = ((e.offsetY * this.ratio - this.fieldMarginY) - this.fieldSize / 2) / this.fieldSize * 2

            if (x >= -1 && x <=1 && y >= -1 && y <=1) this.testPoints.push({x: x, y: y, type: type})
            // this.reset()
        })
        this.canvas.addEventListener(`touchstart`, e=>{

            e.preventDefault()
            let type = e.touches.length > 1 ? -1 : 1

            let rect = e.target.getBoundingClientRect();
            let tx = e.targetTouches[type === 1 ? 0 : 1].pageX - rect.left;
            let ty = e.targetTouches[type === 1 ? 0 : 1].pageY - rect.top;

            let x = ((tx * this.ratio - this.fieldMarginX) - this.fieldSize / 2) / this.fieldSize * 2
            let y = ((ty * this.ratio - this.fieldMarginY) - this.fieldSize / 2) / this.fieldSize * 2

            if (x >= -1 && x <=1 && y >= -1 && y <=1) this.testPoints.push({x: x, y: y, type: type})
        })
    }

    animate(){

        requestAnimationFrame(this.animate.bind(this))
        this.testTrain(64)

    }

    initTestPoints(n){
        this.testPoints = []
        for (let i = 0; i < n; i++){
            let x = Math.random() * 2 - 1
            let y = Math.random() * 2 - 1
            this.testPoints.push({x: x, y: y, type: this.rule(x,y)})
        }
    }

    randomizeWeights(){

        for (let i = 1; i < this.layers.length; i++){
            for (let j = 0; j < this.layers[i].length; j++){

                const n = this.layers[i][j]
                n.bias = 0
                if (n.input.length){

                    for (let k = 0; k < n.input.length; k++){

                        n.input[k].weight = Math.random() * 2 - 1

                    }

                }

            }
        }

    }

    buildLayers(l){

        l.push(1) // Define one output node manually

        this.layers = []

        for (let i = 0; i < l.length; i++){

            let layer = []
            for (let j = 0; j < l[i]; j++){
                if (l[i] === 1){
                    layer.push(new Node(i, 10))
                } else {
                    layer.push(new Node(i, j))
                }
            }

            this.layers.push(layer)

        }

        for (let i = 0; i < this.layers.length; i++){

            for (let j = 0; j < this.layers[i].length; j++){
                
                if (this.layers[i+1]){

                    for (let k = 0; k < this.layers[i+1].length; k++){

                        this.layers[i][j].connect(this.layers[i+1][k])

                    }

                }

            }

        }

        this.inputLayer = this.layers[0]
        this.outputLayer = this.layers[this.layers.length - 1]

    }

    checkXY(x, y){

        this.activate(this.getInput(x,y))
        return this.outputLayer[0].signal

    }

    testTrain(n){

        if (this.alive) {

            let totalLoss = 0

            for (let m = 0; m < n; m++){
                for (let i = 0; i < this.testPoints.length; i++){

                    let x = this.testPoints[i].x
                    let y = this.testPoints[i].y

                    let input = this.getInput(x,y)

                    this.activate(input)
                    this.teach(this.testPoints[i].type)

                    totalLoss += this.outputLayer[0].error

                }
                this.updateWB()
                totalLoss /= this.testPoints.length
                totalLoss += this.regError
            }

            this.loss.last = this.loss.new
            this.loss.new = totalLoss //this.awakeNodes
        }

        this.updateVisuals()

    }

    train(n){

        for (let i = 0; i < n; i++){

            let x = Math.random() * 2 - 1
            let y = Math.random() * 2 - 1

            let input = this.getInput(x,y)

            this.activate(input)
            this.teach(this.rule(x,y))


        }

        this.updateVisuals()

    }

    getInput(x, y){
        return [x,y,x*y,x**2,y**2,x**3,y**3,x**2*y, y**2*x,x**4,y**4,x**3*y,y**3*x,x**2*y**2,x**5,y**5,x**4*y,y**4*x,x**3*y**2,y**3*x**2]
    }

    updateDegree(n){

        for (let i = 2; i < this.inputLayer.length; i++){
            this.inputLayer[i].silent = true
        }

        if (n > 1){
            this.inputLayer[2].silent = false
            this.inputLayer[3].silent = false
            this.inputLayer[4].silent = false
            this.awakeNodes = 5
        }
        if (n > 2){
            this.inputLayer[5].silent = false
            this.inputLayer[6].silent = false
            this.inputLayer[7].silent = false
            this.inputLayer[8].silent = false
            this.awakeNodes = 9
        }
        if (n > 3){
            this.inputLayer[9].silent = false
            this.inputLayer[10].silent = false
            this.inputLayer[11].silent = false
            this.inputLayer[12].silent = false
            this.inputLayer[13].silent = false
            this.awakeNodes = 14
        }
        if (n > 4){
            this.inputLayer[14].silent = false
            this.inputLayer[15].silent = false
            this.inputLayer[16].silent = false
            this.inputLayer[17].silent = false
            this.inputLayer[18].silent = false
            this.inputLayer[19].silent = false
            this.awakeNodes = 20
        }

    }

    activate(v){

        if (v.length === this.inputLayer.length){
            for (let i = 0; i < this.inputLayer.length; i++){
                this.inputLayer[i].signal = v[i]
            }

            for (let i = 1; i < this.layers.length; i++){
                for (let j = 0; j < this.layers[i].length; j++){
                    this.layers[i][j].update()
                }
            }
        }

        // this.updateVisuals()

    }

    teach(v){

        let o = this.outputLayer[0]
        o.outDer = o.getErrorDer(o.signal, v)
        o.error = o.getError(o.signal, v)

        for (let i = this.layers.length - 1; i > 0; i--){

            for (let j = 0; j < this.layers[i].length; j++){
                let n = this.layers[i][j]
                if (!n.silent){
                    n.inDer = n.outDer //* n.activationDer(n.signal)
                    n.inDerTotal += n.inDer
                    n.totalDers++


                }
            }

            for (let j = 0; j < this.layers[i].length; j++){
                let n = this.layers[i][j]
                for (let k = 0; k < n.input.length; k++){

                    if (!n.input[k].node.silent){
                        n.input[k].errDer = n.inDer * n.input[k].node.signal
                        n.input[k].errDerTotal += n.input[k].errDer
                        n.input[k].totalDers++ 
                    }

                }
            }

            for (let j = 0; j < this.layers[i-1].length; j++){
                let n = this.layers[i-1][j]
                if (!n.silent){
                    n.outDer = 0
                    for (let k = 0; k < n.output.length; k++){
                        n.outDer += n.output[k].input[j].weight * n.output[k].inDer
                    }
                }
            }
        }
    }

    updateWB(){
        this.regError = 0

        for (let i = 1; i < this.layers.length; i++){
            for (let j = 0; j < this.layers[i].length; j++){
                let n = this.layers[i][j]
                if (n.totalDers){
                    n.bias = n.bias - this.learningRate * n.inDerTotal / n.totalDers
                    n.inDerTotal = 0
                    n.totalDers = 0
                }

                let linkError = 0

                for (let k = 0; k < n.input.length; k++){
                    let l = n.input[k]
                    let regDer = l.node.regularizationDer(l.weight, this.l2)
                    if (l.totalDers && !l.node.silent){
                        let old = l.weight
                        l.weight = l.weight - (this.learningRate / l.totalDers) * l.errDerTotal
                        let regweight = l.weight - this.learningRate * this.regularizationRate * regDer
                        if (!this.l2 && l.weight * regweight < 0) l.weight = 0; else l.weight = regweight
                        
                        linkError += l.node.regularization(l.weight, this.l2)
                        l.errDerTotal = 0
                        l.totalDers = 0
                    }
                }

                this.regError += this.regularizationRate * linkError
            }
        }
    }

    initCanvas(canvas){

        this.canvas = canvas
        this.ratio = window.devicePixelRatio || 1
        this.canvas.width = this.w = this.canvas.clientWidth * this.ratio
        this.canvas.height = this.h = this.canvas.clientHeight * this.ratio
        this.ctx = this.canvas.getContext(`2d`)

        this.fieldSize = this.h
        this.fieldMarginX = this.w - this.fieldSize
        this.fieldMarginY = this.h - this.fieldSize

        this.fcanvas = document.createElement(`canvas`)
        this.fcanvas.width = this.fcanvas.height = this.fieldSize / this.resolution
        this.fctx = this.fcanvas.getContext(`2d`)

        this.lcanvas = document.createElement(`canvas`)
        this.lcanvas.width = this.w / 2
        this.lcanvas.height = this.h
        this.lctx = this.lcanvas.getContext(`2d`)
        this.lctx.strokeStyle = `#FFF`
        this.lctx.fillStyle = `#112`
        this.lctx.lineWidth = this.ratio * 2

        this.loss = {last: 0, new: 0}

        this.nodeSize = 10 * this.ratio
        this.marginX = 60 * this.ratio
        this.marginY = 30 * this.ratio
        this.paddingX = 360 * this.ratio
        this.paddingY = 16 * this.ratio
        this.linkUnit = 4 * this.ratio

        this.dotSize = 4 * this.ratio

        this.ctx.font = 12 * this.ratio + `px Monospace`
        this.ctx.textBaseline = `middle`

    }

    drawError(){

        const l = this.lctx

        l.drawImage(this.lcanvas,-1,0)
        l.fillStyle = `#112`
        l.fillRect(this.lcanvas.width - 1, 0, 2, this.lcanvas.height)

        // l.beginPath()
        // l.moveTo(this.lcanvas.width - 1, Math.max(this.lcanvas.height - this.lcanvas.height * Math.tanh(this.loss.last / 200), 0))
        // l.lineTo(this.lcanvas.width, Math.max(this.lcanvas.height - this.lcanvas.height * Math.tanh(this.loss.new / 200), 0))

        l.fillStyle = `#ccf4`
        // l.lineTo(this.lcanvas.width, this.lcanvas.height)
        // l.lineTo(this.lcanvas.width - 1, this.lcanvas.height)
        // l.closePath()
        // l.fill()
        let y = Math.max(this.lcanvas.height - this.lcanvas.height * Math.tanh(this.loss.last / 1), 0)
        l.fillRect(this.lcanvas.width - 1, y, 1, this.lcanvas.height - y)

        // l.stroke()


        this.ctx.drawImage(this.lcanvas, 0, this.h - this.lcanvas.height)

        this.ctx.textAlign = `left`
        this.ctx.fillStyle = `#fff`
        let loss = Math.floor(this.loss.new * 1e3) / 1e3
        this.ctx.fillText(`Average loss: ` + (loss === 0 ? `<.001` : loss), this.ratio * 20, this.h - this.ratio * 20)

    }

    drawTestData(){

        this.ctx.save()
        this.ctx.translate(this.fieldMarginX + this.fieldSize / 2, this.fieldMarginY + this.fieldSize / 2)

        for (let i = 0; i < this.testPoints.length; i++){

            // this.ctx.fillStyle = this.testPoints[i].type === 1 ? this.colors.rgb(0) : this.colors.rgb(1)
            // this.ctx.fillStyle = this.testPoints[i].type === 1 ? `#48FF7B` : `#ff8539`
            this.ctx.fillStyle = this.testPoints[i].type === 1 ? `#424` : `#fff`
            this.ctx.beginPath()
            this.ctx.arc(this.testPoints[i].x * this.fieldSize / 2, this.testPoints[i].y * this.fieldSize / 2, this.dotSize, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()

        }

        if (!this.testPoints.length) {
            this.ctx.save()
            this.ctx.textAlign = `center`
            this.ctx.fillText(this.touch ? `Tap here to plot data with class 1` : `Click here to plot data with class 1.`,0,0)
            this.ctx.fillText(this.touch ? `Hold finger somewhere and tap here for -1 class` : `Right-click for -1 class.`,0,this.ratio * 18)
            this.ctx.restore()
        }

        this.ctx.restore()

    }

    drawField(){

        this.fctx.clearRect(0,0,this.fcanvas.width,this.fcanvas.height)

        let pixels = this.fctx.createImageData(this.fcanvas.width, this.fcanvas.width)

        for (let i = 0; i < pixels.data.length; i += 4){

            let x = ((i / 4) % this.fcanvas.width) / this.fcanvas.width * 2 - 1
            let y = Math.floor((i / 4) / this.fcanvas.width) / this.fcanvas.height * 2 - 1

            const color = this.colors.rawrgb(this.checkXY(x,y) * .5 + .5)
            
            pixels.data[i] = color[0]
            pixels.data[i+1] = color[1]
            pixels.data[i+2] = color[2]
            pixels.data[i+3] = 255

        }

        this.fctx.putImageData(pixels,0,0)

        this.ctx.drawImage(this.fcanvas, this.fieldMarginX, this.fieldMarginY, this.fieldSize, this.fieldSize)

    }

    updateVisuals(){

        this.ctx.fillStyle = `#112`
        this.ctx.fillRect(0, 0, this.w, this.h)

        this.drawError()

        this.ctx.save()
        this.ctx.translate(this.marginX, this.marginY)
        this.ctx.fillStyle = `#fff`

        for (let i = 0; i < this.layers.length; i++){

            for (let j = 0; j < this.layers[i].length; j++){

                const n = this.layers[i][j]

                if (n.input.length){

                    for (let k = 0; k < n.input.length; k++){

                        if (!n.input[k].node.silent){

                            this.ctx.strokeStyle = n.input[k].weight > 0 ? `#48FF7B` : `#ff8539`
                            // this.ctx.strokeStyle = n.input[k].weight > 0 ? `#FFEC8B` : `#5A0DFF`
                            const f = Math.tanh(n.input[k].weight / 16)
                            // this.ctx.strokeStyle = n.input[k].weight > 0 ? this.positiveColors.rgb(f) : this.negativeColors.rgb(-f)
                            this.ctx.lineWidth = Math.abs(this.linkUnit * Math.tanh(n.input[k].weight / 16))

                            const x1 = this.paddingX * n.idx
                            const x2 = this.paddingX * n.input[k].node.idx
                            const mx = x1 + (x2 - x1) / 2
                            const y1 = this.paddingY * n.idy
                            const y2 = this.paddingY * n.input[k].node.idy

                            this.ctx.beginPath()
                            this.ctx.moveTo(x1, y1)
                            this.ctx.bezierCurveTo(mx, y1, mx, y2, x2, y2)
                            this.ctx.stroke()
                        }

                    }
                } else {
                    this.ctx.save()
                    if (n.silent) this.ctx.globalAlpha = .2
                    this.ctx.textAlign = `left`
                    const x = this.paddingX * n.idx - this.ratio * 36
                    const y = this.paddingY * n.idy
                    this.ctx.fillText(this.polyText[j], x, y)
                    this.ctx.restore()
                }

            }

        }

        // for (let i = 1; i < this.layers.length; i++){

        //     for (let j = 0; j < this.layers[i].length; j++){
        //         const n = this.layers[i][j]
        //         this.ctx.fillStyle = n.bias > 0 ? `#48FF7B` : `#ff8539`
        //         this.ctx.beginPath()
        //         this.ctx.arc(this.paddingX * n.idx, this.paddingY * n.idy, this.nodeSize + this.nodeSize * Math.abs(Math.tanh(n.bias)), 0, Math.PI * 2)
        //         this.ctx.closePath()
        //         this.ctx.fill()

        //     }
        // }

        this.ctx.restore()

        this.drawField()
        this.drawTestData()
        

    }

}

class Node {

    constructor(idx, idy){
        this.bias = 0
        this.input = []
        this.output = []
        this.signal = 0
        this.idx = idx
        this.idy = idy
        this.outDer = 0
        this.inDer = 0
        this.inDerTotal = 0
        this.totalDers = 0
        // this.activation = v => Math.tanh(v)
        // this.activationDer = v => 1 - (Math.tanh(v) ** 2)
        this.activation = v => 1 / (1 + Math.exp(-v))
        this.activationDer = v => {
            let o = this.activation(v)
            return o * (1 - o)
        }

        this.regularization = (w,l2) => l2 ? w**2 * .5 : Math.abs(w)
        this.regularizationDer = (w, l2) => l2 ? w : (w > 0 ? 1 : w < 0 ? -1 : 0)

        this.getError = (v, t) => Math.log(1 + Math.exp(-t * v))
        this.getErrorDer = (v, t) => this.clamp(-t * Math.exp(-t*v)) / this.clamp(1 + Math.exp(-t*v))
    }

    connect(node){

        this.output.push(node)
        node.input.push({node: this, weight: 0, errDer: 0, errDerTotal: 0, totalDers: 0})

    }

    update(){

        let value = this.bias

        for (let i = 0; i < this.input.length; i++){

            if (!this.input[i].node.silent){
                value += this.input[i].weight * this.input[i].node.signal
            }

        }

        this.signal = value//this.activation(value)

    }

    clamp(v){
        return Math.max(-1e12, Math.min(1e12,v))
    }

}
