function lambda(l,f){
    let r = l > 450 && l < 700 ? l < 590 ? map(l,[450,590],[0,1],'soft') : map(l,[590,700],[1,0],'soft') : 0;
    let g = l > 400 && l < 650 ? l < 540 ? map(l,[400,540],[0,1],'soft') : map(l,[540,650],[1,0],'soft') : 0;
    let b = l > 380 && l < 540 ? l < 440 ? map(l,[380,440],[0,1],'soft') : map(l,[440,540],[1,0],'soft') : 0;
    let flux = r + g + b;
    let rn = r / flux;
    let gn = g / flux;
    let bn = b / flux;
    if (f){
        let scale = f / flux;
        r *= rn * scale;
        g *= gn * scale;
        b *= bn * scale;
    }
    return 'rgba('+Math.round(r*255)+','+Math.round(g*255)+','+Math.round(b*255)+',1)';
}

function Ramp(input){
    this.colors = [];
    this.stops = false;
    if (typeof input === 'object'){
        for (let i = 0; i < input.length; i++){
            this.colors.push(new Color(input[i], this, i));
        }
    } else if (typeof input === 'string'){
        let preset = input === 'fire' ? {colors: [[44,44,46,255],[103,48,43,255],[199,75,51,255],[249,157,80,255],[247,246,163,255]]} : input === 'sunshine' ? {colors: [[89,14,34,255],[12,3,68,255],[52,137,218,255],[255,255,255,255],[255,210,47,255],[174,67,13,255]]} : input === 'inferno' ? {colors: [[0,0,0,255],[58,15,110,255],[140,40,129,255],[221,73,104,255],[253,158,108,255],[251,251,190,255]]} : input === 'gothic' ? {colors: [[255,255,255,255],[252,237,177,255],[154,75,89,255],[32,42,66,255],[0,0,0,255]]} : input === 'radio' ? {colors: [[18,20,22],[32,64,96],[252,248,126]]} : input === 'landscape' ? {colors:[[7,4,33],[24,67,116],[87,196,180],[247,241,186],[138,119,42],[37,34,6],[245,249,255]], stops:[0,.4,.55,.6,.65,.8,1]} : input === 'greenLandscape' ? {colors:[[7,4,33],[24,67,116],[87,196,180],[247,241,186],[68,99,42],[17,24,6],[245,249,255]], stops:[0,.4,.55,.6,.65,.8,1]} : {colors: [[0,0,0],[255,255,255]]};
        this.stops = preset.stops ? preset.stops : false;
        for (let i = 0; i < preset.colors.length; i++){
            this.colors.push(new Color(preset.colors[i], this, i));
        }
    }
}

function Color(input,ramp,id){
    this.ramp = ramp || false;
    this.id = id || false;
    this.achromatic = false;
    this.hsv = function(){
        if (!this.hsvChannels){
            this.getHsv();
        }
        return this.hsvChannels;
    }.bind(this);
    this.lab = function(){
        if (!this.labChannels){
            this.getLab();
        }
        return this.labChannels;
    }
    this.hcl = function(){
        if (!this.hclChannels){
            this.getHcl();
        }
        return this.hclChannels;
    }
    this.mask = {
        rgba: /rgba?\(\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(\d+)?(\.\d+)?\s*)?\)/,
        extractRGBA: /(\d?\.)?\d+/g,
        hex: /#?([A-Fa-f0-9]{3}){1,2}/
    }
    this.hsvChannels = false;
    this.labChannels = false;
    this.hclChannels = false;
    this.channels = (function(input){
        if (typeof input === 'string'){
            let rgba = this.mask.rgba.test(input);
            let hex = this.mask.hex.test(input);
            if (rgba){
                let channels = input.match(this.mask.extractRGBA);
                if (channels.length === 3 || channels.length === 4){
                    for (let i = 0; i < channels.length; i++){
                        channels[i] = +channels[i];
                    }
                    if (channels.length === 3) channels[3] = 1;
                    return channels;
                }
            } else if (hex){
                return hexToRgbAChannels(input);
            }
        } else if (typeof input === 'object'){
            let channels = input;
            if (!channels[3]) channels.push(1);
            return channels;
        } else {
            console.log('Unknown color shit');
        }
    }.bind(this))(input);
    this.rgbString = 'rgba('+Math.round(this.channels[0])+','+Math.round(this.channels[1])+','+Math.round(this.channels[2])+','+this.channels[3]+')';
}
Color.prototype.getHsv = function(rgb){
    let h,s,r,g,b,max,min,delta;
    r = this.channels[0]/255;
    g = this.channels[1]/255;
    b = this.channels[2]/255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    delta = max - min;
    if (delta === 0){
        s = h = 0;
        this.achromatic = true;
    } else {
        h = max === r ? 60 * (((g - b)/delta) + (g < b ? 6 : 0)) : max === g ? 60 * ((b - r)/delta + 2) : 60 * ((r - g)/delta + 4);
        s = max === 0 ? 0 : delta / max;
    }
    this.hsvChannels = [h,s,max];
}
Color.prototype.getLab = function(){
    let r,g,b,x,y,z;
    r = this.channels[0] / 255 <= .04045 ? this.channels[0] / 3294.6 : Math.pow((this.channels[0]/255 + .055) / 1.055, 2.4);
    g = this.channels[1] / 255 <= .04045 ? this.channels[1] / 3294.6 : Math.pow((this.channels[1]/255 + .055) / 1.055, 2.4);
    b = this.channels[2] / 255 <= .04045 ? this.channels[2] / 3294.6 : Math.pow((this.channels[2]/255 + .055) / 1.055, 2.4);

    x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.950470;
    y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b);
    z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.088830;
    x = x > 0.008856452 ? Math.pow(x, 1 / 3) : x / 0.12841855 + 0.137931034;
    y = y > 0.008856452 ? Math.pow(y, 1 / 3) : y / 0.12841855 + 0.137931034;
    z = z > 0.008856452 ? Math.pow(z, 1 / 3) : z / 0.12841855 + 0.137931034;

    this.labChannels = [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
Color.prototype.getHcl = function(){
    let lab, l, a, b, h, c;
    lab = this.lab();
    l = lab[0], a = lab[1], b = lab[2];
    c = Math.sqrt(a*a + b*b);
    h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360;
    if (c < .001) this.achromatic = true;
    this.hclChannels = [h, c, l];
}
function hclToRgb(hcl){
    let rgb = labToRgb(hclToLab(hcl));
    rgb[0] = rgb[0] < 0 ? 0 : rgb[0] > 255 ? 255 : rgb[0];
    rgb[1] = rgb[1] < 0 ? 0 : rgb[1] > 255 ? 255 : rgb[1];
    rgb[2] = rgb[2] < 0 ? 0 : rgb[2] > 255 ? 255 : rgb[2];
    return rgb;
}
function hclToLab(hcl){
    let h, c, l;
    h = hcl[0];
    c = hcl[1];
    l = hcl[2];
    h *= Math.PI / 180;
    return [l, Math.cos(h) * c, Math.sin(h) * c];
}
function labToRgb(lab){
    let l = lab[0], a = lab[1], b = lab[2], x, y, z;
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;

    x = x > 0.206896552 ? Math.pow(x, 3) * 0.950470 : 0.1220579792 * (x - 0.137931034);
    y = y > 0.206896552 ? Math.pow(y, 3) : 0.12841855 * (y - 0.137931034);
    z = z > 0.206896552 ? Math.pow(z, 3) * 1.088830 : 0.1398259698 * (z - 0.137931034);

    r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
    g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
    b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
    r = Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
    g = Math.round(255 * (g <= 0.00304 ? 12.92 * g : 1.055 * Math.pow(g, 1 / 2.4) - 0.055));
    b = Math.round(255 * (b <= 0.00304 ? 12.92 * b : 1.055 * Math.pow(b, 1 / 2.4) - 0.055));

    return [r,g,b];
}
function hsvToRgb(hsv){
    let r,g,b,h,i,f,p,q,t;
    if (hsv[0] > 360) hsv[0] %= 360;
    if (hsv[1] === 0){
        r = g = b = hsv[2];
    } else {
        h = hsv[0] / 60;
        i = Math.floor(h);
        f = h - i;
        p = hsv[2] * (1 - hsv[1]);
        q = hsv[2] * (1 - hsv[1] * f);
        t = hsv[2] * (1 - hsv[1] * (1 - f));
        if (i === 0) {
            r = hsv[2];
            g = t;
            b = p;
        } else if (i === 1){
            r = q;
            g = hsv[2];
            b = p;
        } else if (i === 2){
            r = p;
            g = hsv[2];
            b = t;
        } else if (i === 3){
            r = p;
            g = q;
            b = hsv[2];
        } else if (i === 4) {
            r = t;
            g = p;
            b = hsv[2];
        } else {
            r = hsv[2];
            g = p;
            b = q;
        }
    }
    return [Math.round(r*255),Math.round(g*255),Math.round(b*255),1];
}

function light(){
    if (arguments.length == 1){
        if (arguments[0] instanceof Color){
            return arguments[0];
        } else {
            if (arguments[0].length > 1 && typeof arguments[0][0] != 'number'){
                return new Ramp(arguments[0])
            } else {
                return new Color(arguments[0]);
            }
        }
    } else {
        let ramp, domain, interpolation, result, mode, stops;
        if (arguments[0] instanceof Ramp) {
            ramp = arguments[0];
        } else {
            ramp = new Ramp(arguments[0]);
        }
        if (arguments[1].length == 2){
            domain = arguments[1];
        }
        interpolation = arguments[2] ? arguments[2] : 'rgb';
        mode = arguments[3] ? arguments[3] : false;
        stops = ramp.stops ? ramp.stops : false;
        return function(value){
            return lightMap((value - domain[0]) / (domain[1] - domain[0]), ramp, stops, interpolation, mode).rgbString;
        }
    }
}



function map(value,domain,range,interpolation){
    if (interpolation === 'decel'){
        return range[0] + (range[1] - range[0]) * interCubeDecel((value - domain[0]) / (domain[1] - domain[0]));
    } else if (interpolation === 'accel') {
        return range[0] + (range[1] - range[0]) * interCubeAccel((value - domain[0]) / (domain[1] - domain[0]));
    } else if (interpolation === 'elastic'){
        return range[0] + (range[1] - range[0]) * invert(elastic)((value - domain[0]) / (domain[1] - domain[0]));
    } else if (interpolation === 'soft'){
        return range[0] + (range[1] - range[0]) * interCubeFull((value - domain[0]) / (domain[1] - domain[0]));
    } else { //Linear
        return range[0] + (range[1] - range[0]) * (value - domain[0]) / (domain[1] - domain[0]);
    }
};
function lightMap(frac,ramp,stps,interpolation,mode){
        let fraction = frac > 1 ? 1 : frac < 0 ? 0 : frac;
        let marker = undefined;
        let stops = [];

        if (mode){
            if (typeof mode === 'object'){
                if (mode[0] == 'log'){
                    if (fraction != 1){
                        fraction = Math.abs(Math.log(fraction) / mode[1]);
                        fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
                    }
                } else {
                    stops = mode;
                }
            } else {
                if (mode === 'logR' && fraction != 1){
                    fraction = Math.abs(Math.log(fraction) / 80);
                    fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
                } else if (mode === 'logU' && fraction != 1){
                    fraction = Math.abs(Math.log(fraction) / 27);
                    fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
                } else if (mode === 'logC' && fraction != 1){
                    fraction = Math.abs(Math.log(fraction) / 20);
                    fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
                }
            }
        } else {
            stops = stps || [];
        }
        if (stops.length === 0){
            for (let i = 0; i <= 1.0000001; i += 1 / (ramp.colors.length - 1)){
                stops.push(i);
            }
            stops[stops.length - 1] = 1;
        }

        for (let i = 1; i < stops.length; i++){
            if (fraction <= stops[i]){
                marker = i - 1;
                break;
            }
        }
        if (marker != undefined){
            let from = stops[marker];
            let to = stops[marker + 1];
            let startColor = ramp.colors[marker], endColor = ramp.colors[marker + 1], startValues, endValues, final = [];
            if (interpolation === 'rgb'){
                startValues = startColor.channels;
                endValues = endColor.channels;
            } else if (interpolation == 'hsv'){
                startValues = startColor.hsv();
                endValues = endColor.hsv();
                if (startColor.achromatic){
                    startValues[0] = endValues[0];
                } else if (endColor.achromatic){
                    endValues[0] = startValues[0];
                }
                if (startValues[0] < endValues[0]){
                    if (endValues[0] - startValues[0] > startValues[0] + 360 - endValues[0]) startValues[0] += 360;
                } else {
                    if (startValues[0] - endValues[0] > endValues[0] + 360 - startValues[0]) endValues[0] += 360;
                }
            } else if (interpolation == 'lab'){
                startValues = startColor.lab();
                endValues = endColor.lab();
            } else if (interpolation == 'hcl'){
                startValues = startColor.hcl();
                endValues = endColor.hcl();
                if (startColor.achromatic){
                    startValues[0] = endValues[0];
                } else if (endColor.achromatic){
                    endValues[0] = startValues[0];
                }
                if (startValues[0] < endValues[0]){
                    if (endValues[0] - startValues[0] > startValues[0] + 360 - endValues[0]) startValues[0] += 360;
                } else {
                    if (startValues[0] - endValues[0] > endValues[0] + 360 - startValues[0]) endValues[0] += 360;
                }
            }
            for (let i = 0; i < startValues.length; i++){
                final.push(map(fraction,[from,to],[startValues[i],endValues[i]]));
            }

            if (interpolation === 'rgb') {
                return new Color(final);
            } else if (interpolation === 'hsv'){
                return new Color(hsvToRgb(final));
            } else if (interpolation === 'lab'){
                return new Color(labToRgb(final));
            } else if (interpolation === 'hcl'){
                return new Color(hclToRgb(final));
            }
            return final;
        }
        console.log('Something just wrong',colors,marker);
    
} 

function hexToRgbAChannels(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255, 1];
    }
    throw new Error('Very bad hex');
}

//window.alive = new Light();