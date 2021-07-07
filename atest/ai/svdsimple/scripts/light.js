//Sunandstuff helper for color handling. Best regards to chroma.js

function light(){

	let packs = {
		fire: {
			colors: ['rgba(44,44,46,1)','rgba(103,48,43,1)','rgba(187,69,47,1)','rgba(252,151,66,1)','rgba(255,246,150,1)','rgba(255,252,245,1)'],
			stops: [0,.2,.35,.7,.92,1]
		},
		ice: {
			colors: ['rgba(183,247,247,1)','rgba(71,116,206,1)','rgba(44,44,46,1)']
		},
		inferno: {
			colors: ['rgba(0,0,0,1)','rgba(58,15,110,1)','rgba(140,40,129,1)','rgba(221,73,104,1)','rgba(253,158,108,1)','rgba(251,251,190,1)']
		},
		radio: {
			colors: ['rgb(18,20,22)','rgb(32,64,96)','rgb(252,248,126)'],
			stops: [0,.3,1]
		},
		depth: {
			colors: ['#2D044E','#205677','#35B37C','#CEF799']
		},
		density: {
			colors: ['rgba(246,237,223,1)','rgba(249,157,80,1)','rgba(199,71,55,1)','rgba(103,42,73,1)','rgba(68,28,62,1)'],
			stops: [0,.3,.6,.85,1]
		},
		sunshine: {
			colors: ['rgba(89,14,34,1)','rgba(12,3,68,1)','rgba(52,137,218,1)','rgba(255,255,255,1)','rgba(255,210,47,1)','rgba(174,67,13,1)'],
			stops: [0,.2,.5,.7,.8,1]
		},
		bloom: {
			colors: ['rgb(255,255,237)','rgb(253,223,111)','rgb(255,138,35)','rgb(165,10,49)','rgb(94,14,63)'],
			stops: [0,.3,.6,.85,1]
		},
		landscape: {
			colors:['rgb(7,4,33)', 'rgb(24,67,116)', 'rgb(87,196,180)', 'rgb(247,241,186)', 'rgb(138,119,42)', 'rgb(37,34,6)', 'rgb(245,249,255)'],
			stops:[0,.4,.55,.6,.65,.8,1]
		},
		gothic: {
			colors: ['rgb(255,255,255,255)', 'rgb(252,237,177,255)', 'rgb(154,75,89,255)', 'rgb(32,42,66,255)', 'rgb(0,0,0,255)']
		},
		royal: {
			colors: ['rgb(0,0,0,255)','rgb(24,40,85,255)','rgb(121,61,143,255)','rgb(255,228,133,255)','rgb(255,255,255,255)'],
			stops: [0,.3,.6,.8,1]
		},
		copper: {
			colors: ['#010A07', '#013543', '#0D7391', '#93D872', '#FFBD13', '#E57A00'],
			stops: [0, .15, .35, .5, .75, 1]
		}
	}

	class Scale {

    	constructor(){
    		// console.log(arguments[0])
		    this.colorList = arguments[0].map(c => new Color(c))
		    this.colorStops = arguments[1] || this.getAutoStops()
		    this.mode = `rgb`
		    this.log = false

    	}

    	reverse(){
    		this.colorList.reverse()
    		this.colorStops.reverse()
    		return this
    	}

    	getAutoStops(){

    		let stops = []
    		let unit = 1 / (this.colorList.length - 1)
    		for (let i = 0; i < this.colorList.length; i++){
    			stops.push(unit * i)
    		}
    		return stops

    	}

    	setMode(i){
    		this.mode = i
    	}

    	setLog(b){
    		if (b) this.log = b; else this.log = false
    	}

    	rawrgb(f){
    		f = f < 0 ? 0 : f > 1 ? 1 : f
    		return this.mode === 'hcl' ? this.hclInt(f) : this.mode === 'lab' ? this.labInt(f) : this.mode === 'hsv' ? this.hsvInt(f) : this.rgbaInt(f)
    	}

    	rgb(f){
    		let raw = this.rawrgb(f)
    		return `rgba(${raw[0]},${raw[1]},${raw[2]},${raw[3]})`
    	}

    	lerp(a,b,f) {
	        return a + (b - a) * f
	    }

	    toLog(f){
	        return Math.exp(Math.log(f) / Math.log(this.log > 0 ? Math.E * this.log : (1 + Math.E / -this.log)))
	    }

	    getRange(f){
	    	if (f >= 1) return {s_0: this.colorList[this.colorList.length - 1], s_1: this.colorList[this.colorList.length - 1], ff: 0}
			if (f <= 0) return {s_0: this.colorList[0], s_1: this.colorList[0], ff: 0}
			let unit = 1 / (this.colorList.length - 1)
			let index = Math.floor(f / unit)
			let ff = (f % unit) * (this.colorList.length - 1)
			return {s_0: this.colorList[index], s_1: this.colorList[index + 1], ff: ff}
	    }

	    rgbaInt(f){
	        if (this.log) f = this.toLog(f)
	        let p = this.getRange(f)
	        let r = Math.floor(this.lerp(p.s_0.rgba[0],p.s_1.rgba[0],p.ff))
	        let g = Math.floor(this.lerp(p.s_0.rgba[1],p.s_1.rgba[1],p.ff))
	        let b = Math.floor(this.lerp(p.s_0.rgba[2],p.s_1.rgba[2],p.ff))
	        let a = Math.floor(this.lerp(p.s_0.rgba[3],p.s_1.rgba[3],p.ff))
	        return [r, g, b, a]
	    }

	    hclInt(f){
	        if (this.log) f = this.toLog(f)
	        let p = this.getRange(f)
	        for (let i = 0; i < this.colorList.length; i++) {this.colorList[i].makeHcl()}
	        let angles = this.getCorrectHue(p.s_0.hcl[0], p.s_1.hcl[0])
	        let h = this.lerp(angles[0],angles[1],p.ff)
	        let c = this.lerp(p.s_0.hcl[1], p.s_1.hcl[1],p.ff)
	        let l = this.lerp(p.s_0.hcl[2], p.s_1.hcl[2],p.ff)

	        let rgb = this.hclToRgb([h,c,l])
	        return [rgb[0],rgb[1],rgb[2],1]
	    }
	    labInt(f){
	        if (this.log) f = this.toLog(f)
	        let p = this.getRange(f);
	        for (let i = 0; i < this.colorList.length; i++) {this.colorList[i].makeLab()}
	        let l = this.lerp(p.s_0.lab[0],p.s_1.lab[0],p.ff)
	        let a = this.lerp(p.s_0.lab[1],p.s_1.lab[1],p.ff)
	        let b = this.lerp(p.s_0.lab[2],p.s_1.lab[2],p.ff)
	        let rgb = this.labToRgb([l,a,b])
	        return [rgb[0],rgb[1],rgb[2],1]

	    }

	    hsvInt(f,log){
	        if (this.log) f = this.toLog(f)
	        let p = this.getRange(f);
	        for (let i = 0; i < this.colorList.length; i++) {this.colorList[i].makeHsv()}
	        let angles = this.getCorrectHue(p.s_0.hsv[0], p.s_1.hsv[0])
	        let h = this.lerp(angles[0], angles[1],p.ff)
	        let s = this.lerp(p.s_0.hsv[1],p.s_1.hsv[1],p.ff)
	        let v = this.lerp(p.s_0.hsv[2],p.s_1.hsv[2],p.ff)
	        let rgb = this.hsvToRgb([h,s,v])
	        return [rgb[0],rgb[1],rgb[2],1]

	    }
	    getCorrectHue(h1, h2){
	        if (h1 < h2){
	            if (h2 - h1 > h1 + 360 - h2) h1 += 360
	        } else {
	            if (h1 - h2 > h2 + 360 - h1) h2 += 360
	        }
	        return [h1, h2]
	    }
	    hclToRgb(hcl){
	        let rgb = this.labToRgb(this.hclToLab(hcl))
	        rgb[0] = rgb[0] < 0 ? 0 : rgb[0] > 255 ? 255 : rgb[0]
	        rgb[1] = rgb[1] < 0 ? 0 : rgb[1] > 255 ? 255 : rgb[1]
	        rgb[2] = rgb[2] < 0 ? 0 : rgb[2] > 255 ? 255 : rgb[2]
	        return rgb
	    }

	    hclToLab(hcl){
	        let h, c, l
	        h = hcl[0]
	        c = hcl[1]
	        l = hcl[2]
	        h *= Math.PI / 180
	        return [l, Math.cos(h) * c, Math.sin(h) * c]
	    }
	    labToRgb(lab){
	        let l = lab[0], a = lab[1], b = lab[2], x, y, z, r, g
	        y = (l + 16) / 116
	        x = isNaN(a) ? y : y + a / 500
	        z = isNaN(b) ? y : y - b / 200

	        x = x > 0.206896552 ? Math.pow(x, 3) * 0.950470 : 0.1220579792 * (x - 0.137931034)
	        y = y > 0.206896552 ? Math.pow(y, 3) : 0.12841855 * (y - 0.137931034)
	        z = z > 0.206896552 ? Math.pow(z, 3) * 1.088830 : 0.1398259698 * (z - 0.137931034)

	        r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z
	        g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
	        b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z
	        r = Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055))
	        g = Math.round(255 * (g <= 0.00304 ? 12.92 * g : 1.055 * Math.pow(g, 1 / 2.4) - 0.055))
	        b = Math.round(255 * (b <= 0.00304 ? 12.92 * b : 1.055 * Math.pow(b, 1 / 2.4) - 0.055))

	        return [r,g,b]
	    }
	    hsvToRgb(hsv){
	        let r,g,b,h,i,f,p,q,t
	        if (hsv[0] > 360) hsv[0] %= 360
	        if (hsv[1] === 0){
	            r = g = b = hsv[2]
	        } else {
	            h = hsv[0] / 60
	            i = Math.floor(h)
	            f = h - i
	            p = hsv[2] * (1 - hsv[1])
	            q = hsv[2] * (1 - hsv[1] * f)
	            t = hsv[2] * (1 - hsv[1] * (1 - f))
	            if (i === 0) {
	                r = hsv[2]
	                g = t
	                b = p
	            } else if (i === 1){
	                r = q
	                g = hsv[2]
	                b = p
	            } else if (i === 2){
	                r = p
	                g = hsv[2]
	                b = t
	            } else if (i === 3){
	                r = p
	                g = q
	                b = hsv[2]
	            } else if (i === 4) {
	                r = t
	                g = p
	                b = hsv[2]
	            } else {
	                r = hsv[2]
	                g = p
	                b = q
	            }
	        }
	        return [Math.round(r*255),Math.round(g*255),Math.round(b*255),1]
	    }

    }

    class Color {

    	constructor(c){

	        this.rgba = false
	        this.lab = false
	        this.hcl = false
	        this.hsl = false
	        this.parseColor(c)

    	}

    	parseColor(c){

    		let masks = {
	            rgba: /rgba?\(\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(\d+)?(\.\d+)?\s*)?\)/,
	            extractRGBA: /(\d?\.)?\d+/g,
	            hex: /#?([A-Fa-f0-9]{3}){1,2}/,
	            extractHEX: /[A-Fa-f0-9]/g
	        }

    		if (masks.rgba.test(c)){
	            let essence = c.match(masks.extractRGBA)
	            this.rgba = [+essence[0], +essence[1], +essence[2], essence[3] ? +essence[3] : 1]
	        } else if (masks.hex.test(c)) {
	            let essence = c.match(masks.extractHEX)
	            if (essence.length === 3){
	                this.rgba = [parseInt(essence[0]+essence[0],16), parseInt(essence[1]+essence[1],16), parseInt(essence[2]+essence[2],16), 1]
	            } else if (essence.length === 6){
	                this.rgba = [parseInt(essence[0]+essence[1],16), parseInt(essence[2]+essence[3],16), parseInt(essence[4]+essence[5],16), 1]
	            }
	        }
    	}

    	makeLab(){
	        if (!this.lab){
	            let r,g,b,x,y,z
	            r = this.rgba[0] / 255 <= .04045 ? this.rgba[0] / 3294.6 : Math.pow((this.rgba[0]/255 + .055) / 1.055, 2.4)
	            g = this.rgba[1] / 255 <= .04045 ? this.rgba[1] / 3294.6 : Math.pow((this.rgba[1]/255 + .055) / 1.055, 2.4)
	            b = this.rgba[2] / 255 <= .04045 ? this.rgba[2] / 3294.6 : Math.pow((this.rgba[2]/255 + .055) / 1.055, 2.4)
	            x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.950470
	            y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b)
	            z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.088830
	            x = x > 0.008856452 ? Math.pow(x, 1 / 3) : x / 0.12841855 + 0.137931034
	            y = y > 0.008856452 ? Math.pow(y, 1 / 3) : y / 0.12841855 + 0.137931034
	            z = z > 0.008856452 ? Math.pow(z, 1 / 3) : z / 0.12841855 + 0.137931034
	            this.lab = [116 * y - 16, 500 * (x - y), 200 * (y - z)]
	        }
	    }

	    makeHcl(){
	        if (!this.hcl){
	            let lab, l, a, b, h, c
	            this.makeLab()
	            lab = this.lab
	            l = lab[0], a = lab[1], b = lab[2]
	            c = Math.sqrt(a*a + b*b)
	            h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360
	            if (c < .001) this.achromatic = true
	            this.hcl = [h, c, l]
	        }
	    }

	    makeHsv(){
	        let h,s,r,g,b,max,min,delta
	        r = this.rgba[0]/255
	        g = this.rgba[1]/255
	        b = this.rgba[2]/255
	        max = Math.max(r, g, b)
	        min = Math.min(r, g, b)
	        delta = max - min
	        if (delta === 0){
	            s = h = 0
	            this.achromatic = true
	        } else {
	            h = max === r ? 60 * (((g - b)/delta) + (g < b ? 6 : 0)) : max === g ? 60 * ((b - r)/delta + 2) : 60 * ((r - g)/delta + 4)
	            s = max === 0 ? 0 : delta / max
	        }
	        this.hsv = [h,s,max]
	    }

    }

    if (!arguments[0]) return new Scale([`rgb(0,0,0)`, `rgb(255,255,255)`])
	if (packs[arguments[0]]){
		return new Scale(packs[arguments[0]].colors, packs[arguments[0]].stops)
	} else if (arguments.length > 1){
        let range
        if ((arguments[0][0] && arguments[1][0] !== undefined) && (arguments[0].length === arguments[1].length) && (typeof arguments[1][0] === 'number')) {
            range = arguments[1]
            return new Scale(arguments[0], range)
        } else {
            return new Scale(arguments)
        }
    } else {
    	return new Scale(arguments[0])
    }

}