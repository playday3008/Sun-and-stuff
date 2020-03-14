
function light(){
    if (arguments.length === 1){
        return l_handleColor(arguments[0]);
    } else {
        return l_handle_gradient(arguments);
    }
}

function l_handleColor(c){

    let color = new l_Color(c);
    return function(s){
        if (s === 'lab' && !color.lab) color.makeLab();
        return s === 'lab' ? color.lab : color.getRgbString();
    }
}

function l_handle_gradient() {
        let list = [];
        for (let a = 0; a < arguments[0].length; a++){
            list.push(new l_Color(arguments[0][a]));
        }
        let stops = arguments[1] ? arguments[1] : false;
        let newgrad = new l_Gradient(list,stops);
        return function(f,math,log){
            f = f < 0 ? 0 : f > 1 ? 1 : f;
            if (!log && typeof math === 'boolean') log = math;
            return math === 'hcl' ? newgrad.hclInt(f,log) : math === 'lab' ? newgrad.labInt(f,log) : math === 'hsv' ? newgrad.hsvInt(f,log) : newgrad.rgbaInt(f,log);
        }
}

class l_Color {

    constructor(c){

        this.masks = {
            rgba: /rgba?\((\s*\d+\s*,*){3}(\s*(\d?\.)?\d+)?\)/,
            extractRGBA: /(\d?\.)?\d+/g,
            hex: /#([A-Fa-f0-9]{3,4}){1,2}/,
            extractHEX: /[A-Fa-f0-9]/g,
            lab: /lab\((\s*\-*\d+(\.\d+)?\s*,*){3}\)/,
            extractLab: /\-?\d+(\.\d+)?/g,
            hcl: /hcl\((\s*\-*\d+(\.\d+)?\s*,*){3}\)/,
            extractHcl: /\-?\d+(\.\d+)?/g,
            hsl: /hsv\((\s*\-*\d+(\.\d+)?\s*,*){3}\)/,
            extractHsl: /\-?\d+(\.\d+)?/g
        }

        this.rgba = false;
        this.lab = false;
        this.hcl = false;
        this.hsl = false;

        //Initial extraction of rgb channels
        if (this.masks.rgba.test(c)){
            let rgba = c.match(this.masks.extractRGBA);
            this.rgba = [+rgba[0], +rgba[1], +rgba[2], rgba[3] ? +rgba[3] : 1];
        } else if (this.masks.hex.test(c)) {
            let hex = c.match(this.masks.extractHEX);
            if (hex.length === 3){
                this.rgba = [parseInt(hex[0]+hex[0],16), parseInt(hex[1]+hex[1],16), parseInt(hex[2]+hex[2],16), 1];
            } else if (hex.length === 6){
                this.rgba = [parseInt(hex[0]+hex[1],16), parseInt(hex[2]+hex[3],16), parseInt(hex[4]+hex[5],16), 1];
            } else if (hex.length === 4){
                this.rgba = [parseInt(hex[0]+hex[0],16), parseInt(hex[1]+hex[1],16), parseInt(hex[2]+hex[2],16), parseInt(hex[3]+hex[3],16)/256];
            } else if (hex.length === 8){
                this.rgba = [parseInt(hex[0]+hex[1],16), parseInt(hex[2]+hex[3],16), parseInt(hex[4]+hex[5],16), parseInt(hex[6]+hex[7],16)/256];
            }
        } else if (this.masks.lab.test(c)){
            let lab = c.match(this.masks.extractLab);
            this.lab = [+lab[0],+lab[1],+lab[2]];
        } else if (this.masks.hcl.test(c)){
            let hcl = c.match(this.masks.extractHcl);
            this.hcl = [+hcl[0],+hcl[1],+hcl[2]];
        } else if (this.masks.hsl.test(c)){
            let hsl = c.match(this.masks.extractHsl);
            this.hsl = [+hsl[0],+hsl[1],+hsl[2]];
        }
    }

    getRgbString() {
        if (!this.rgba){
            if (this.lab.length){
                this.rgbFromLab();
            } else if (this.hcl.length){
                this.labFromHcl();
                this.rgbFromLab();
            } else if (this.hsl.length){
                this.rgbFromHsl();
            }
        }
        return 'rgba('+this.rgba[0]+','+this.rgba[1]+','+this.rgba[2]+','+this.rgba[3]+')';
    }

    makeLab(){
        if (!this.lab){
            let r,g,b,x,y,z;
            r = this.rgba[0] / 255 <= .04045 ? this.rgba[0] / 3294.6 : Math.pow((this.rgba[0]/255 + .055) / 1.055, 2.4);
            g = this.rgba[1] / 255 <= .04045 ? this.rgba[1] / 3294.6 : Math.pow((this.rgba[1]/255 + .055) / 1.055, 2.4);
            b = this.rgba[2] / 255 <= .04045 ? this.rgba[2] / 3294.6 : Math.pow((this.rgba[2]/255 + .055) / 1.055, 2.4);
            x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.950470;
            y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b);
            z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.088830;
            x = x > 0.008856452 ? Math.pow(x, 1 / 3) : x / 0.12841855 + 0.137931034;
            y = y > 0.008856452 ? Math.pow(y, 1 / 3) : y / 0.12841855 + 0.137931034;
            z = z > 0.008856452 ? Math.pow(z, 1 / 3) : z / 0.12841855 + 0.137931034;
            this.lab = [116 * y - 16, 500 * (x - y), 200 * (y - z)];
        }
    }

    makeHcl(){
        if (!this.hcl){
            let lab, l, a, b, h, c;
            this.makeLab();
            lab = this.lab;
            l = lab[0], a = lab[1], b = lab[2];
            c = Math.sqrt(a*a + b*b);
            h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360;
            if (c < .001) this.achromatic = true;
            this.hcl = [h, c, l];
        }
    }

    makeHsv(){
        let h,s,r,g,b,max,min,delta;
        r = this.rgba[0]/255;
        g = this.rgba[1]/255;
        b = this.rgba[2]/255;
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
        this.hsv = [h,s,max];
    }

    rgbFromLab(){
        let l = this.lab[0], a = this.lab[1], b = this.lab[2], x, y, z, r, g;
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
        this.rgba = [r,g,b,1];
    }
    labFromHcl(){
        let h, c, l;
        h = this.hcl[0];
        c = this.hcl[1];
        l = this.hcl[2];
        h *= Math.PI / 180;
        this.lab = [l, Math.cos(h) * c, Math.sin(h) * c];
    }
    rgbFromHsl(){
        let r,g,b,h,i,f,p,q,t;
        if (this.hsl[0] > 360) this.hsl[0] %= 360;
        if (this.hsl[1] === 0){
            r = g = b = this.hsl[2];
        } else {
            h = this.hsl[0] / 60;
            i = Math.floor(h);
            f = h - i;
            p = this.hsl[2] * (1 - this.hsl[1]);
            q = this.hsl[2] * (1 - this.hsl[1] * f);
            t = this.hsl[2] * (1 - this.hsl[1] * (1 - f));
            if (i === 0) {
                r = this.hsl[2];
                g = t;
                b = p;
            } else if (i === 1){
                r = q;
                g = this.hsl[2];
                b = p;
            } else if (i === 2){
                r = p;
                g = this.hsl[2];
                b = t;
            } else if (i === 3){
                r = p;
                g = q;
                b = this.hsl[2];
            } else if (i === 4) {
                r = t;
                g = p;
                b = this.hsl[2];
            } else {
                r = this.hsl[2];
                g = p;
                b = q;
            }
        }
        this.rgba = [Math.round(r*255),Math.round(g*255),Math.round(b*255),1];
    }
}


// function light() {
//     if (arguments.length > 1){
//             return handle_gradient(arguments);
//     } else if (arguments[0]==='fire'){
//         return handle_gradient(['rgba(44,44,46,1)','rgba(103,48,43,1)','rgba(187,69,47,1)','rgba(252,151,66,1)','rgba(255,246,150,1)','rgba(255,252,245,1)'],[0,.2,.35,.7,.92,1]);
//     } else if (arguments[0]==='ice'){
//         return handle_gradient(['rgba(183,247,247,1)','rgba(71,116,206,1)','rgba(44,44,46,1)']);
//     } else if (arguments[0]==='inferno'){
//         return handle_gradient(['rgba(0,0,0,1)','rgba(58,15,110,1)','rgba(140,40,129,1)','rgba(221,73,104,1)','rgba(253,158,108,1)','rgba(251,251,190,1)'])
//     } else if (arguments[0]==='radio'){
//         return handle_gradient(['rgb(18,20,22)','rgb(32,64,96)','rgb(252,248,126)'], [0,.3,1]);
//     } else if (arguments[0]==='depth'){
//         return handle_gradient(['#2D044E','#205677','#35B37C','#CEF799']);
//     } else if (arguments[0]==='density'){
//         return handle_gradient(['rgba(246,237,223,1)','rgba(249,157,80,1)','rgba(199,71,55,1)','rgba(103,42,73,1)','rgba(68,28,62,1)'],[0,.3,.6,.85,1]);
//     } else if (arguments[0]==='sunshine'){
//         return handle_gradient(['rgba(89,14,34,1)','rgba(12,3,68,1)','rgba(52,137,218,1)','rgba(255,255,255,1)','rgba(255,210,47,1)','rgba(174,67,13,1)'],[0,.2,.5,.7,.8,1]);
//     } else if (arguments[0]==='bloom'){
//         return handle_gradient(['rgb(255,255,237)','rgb(253,223,111)','rgb(255,138,35)','rgb(165,10,49)','rgb(94,14,63)'],[0,.3,.6,.85,1]);
//     } else {
//         return handle_color(arguments[0]);
//         // return handle_gradient(['rgb(0,0,0)','rgb(255,255,255)']);
//     }
// }
// function handle_gradient() {
//     if (arguments[0].length){
//         let list = [];
//         for (let a = 0; a < arguments[0].length; a++){
//             list.push(new l_Color(arguments[0][a]));
//         }
//         let stops = arguments[1] ? arguments[1] : false;
//         let newgrad = new l_Gradient(list,stops);
//         return function(f,math,log){
//             f = f < 0 ? 0 : f > 1 ? 1 : f;
//             if (!log && typeof math === 'boolean') log = math;
//             return math === 'hcl' ? newgrad.hclInt(f,log) : math === 'lab' ? newgrad.labInt(f,log) : math === 'hsv' ? newgrad.hsvInt(f,log) : newgrad.rgbaInt(f,log);
//         }
//     }
// }
// function handle_color() {
//     let color = new l_Color(arguments[0]);
//     return function(math){
//         return math === 'hcl' ? {h: color.hcl[0], c: color.hcl[1], l: color.hcl[2]} : color.rgba;
//     }
// }

// class l_Color {

//     constructor(c){

//         this.masks = {
//             rgba: /rgba?\((\s*\d+\s*,*){3,4}\)/,
//             extractRGBA: /(\d?\.)?\d+/g,
//             hex: /#?([A-Fa-f0-9]{3,4}){1,2}/,
//             extractHEX: /[A-Fa-f0-9]/g,
//             lab: /lab/
//         }

//         this.rgba = false;
//         this.lab = false;
//         this.hcl = false;
//         this.hsl = false;

//         if (this.masks.rgba.test(c)){
//             let essence = c.match(this.masks.extractRGBA);
//             this.rgba = [+essence[0], +essence[1], +essence[2], essence[3] ? +essence[3] : 1];
//         } else if (this.masks.hex.test(c)) {
//             let essence = c.match(this.masks.extractHEX);
//             if (essence.length === 3){
//                 this.rgba = [parseInt(essence[0]+essence[0],16), parseInt(essence[1]+essence[1],16), parseInt(essence[2]+essence[2],16), 1];
//             } else if (essence.length === 6){
//                 this.rgba = [parseInt(essence[0]+essence[1],16), parseInt(essence[2]+essence[3],16), parseInt(essence[4]+essence[5],16), 1];
//             }
//         } else if (this.masks.lab.test(c)){
//             console.log('this is lab!');
//         }

//     }

//     makeLab(){

//         if (!this.lab){

//             let r,g,b,x,y,z;
//             r = this.rgba[0] / 255 <= .04045 ? this.rgba[0] / 3294.6 : Math.pow((this.rgba[0]/255 + .055) / 1.055, 2.4);
//             g = this.rgba[1] / 255 <= .04045 ? this.rgba[1] / 3294.6 : Math.pow((this.rgba[1]/255 + .055) / 1.055, 2.4);
//             b = this.rgba[2] / 255 <= .04045 ? this.rgba[2] / 3294.6 : Math.pow((this.rgba[2]/255 + .055) / 1.055, 2.4);

//             x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / 0.950470;
//             y = (0.2126729 * r + 0.7151522 * g + 0.0721750 * b);
//             z = (0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / 1.088830;
//             x = x > 0.008856452 ? Math.pow(x, 1 / 3) : x / 0.12841855 + 0.137931034;
//             y = y > 0.008856452 ? Math.pow(y, 1 / 3) : y / 0.12841855 + 0.137931034;
//             z = z > 0.008856452 ? Math.pow(z, 1 / 3) : z / 0.12841855 + 0.137931034;

//             this.lab = [116 * y - 16, 500 * (x - y), 200 * (y - z)];

//         }
//     }

//     makeHcl(){
//         if (!this.hcl){
//             let lab, l, a, b, h, c;
//             this.makeLab();
//             lab = this.lab;
//             l = lab[0], a = lab[1], b = lab[2];
//             c = Math.sqrt(a*a + b*b);
//             h = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360;
//             if (c < .001) this.achromatic = true;
//             this.hcl = [h, c, l];
//         }
//     }

//     makeHsv(){
//         let h,s,r,g,b,max,min,delta;
//         r = this.rgba[0]/255;
//         g = this.rgba[1]/255;
//         b = this.rgba[2]/255;
//         max = Math.max(r, g, b);
//         min = Math.min(r, g, b);
//         delta = max - min;
//         if (delta === 0){
//             s = h = 0;
//             this.achromatic = true;
//         } else {
//             h = max === r ? 60 * (((g - b)/delta) + (g < b ? 6 : 0)) : max === g ? 60 * ((b - r)/delta + 2) : 60 * ((r - g)/delta + 4);
//             s = max === 0 ? 0 : delta / max;
//         }
//         this.hsv = [h,s,max];
//     }

// }

class l_Gradient {

    constructor(colors, stops){

        this.colors = colors;
        if (stops && stops.length === this.colors.length){
            this.stops = stops;
        } else {
            this.stops = [];
            for (let i = 0; i < this.colors.length; i++){
                this.stops.push(1 / (this.colors.length - 1) * i);
            }
        }
    }

    getRange(f){
        f = f < 0 ? 0 : f > 1 ? 1 : f;
        let s_0, s_1;
        for (let s = 0; s < this.stops.length; s++){
            if (f <= this.stops[s]) {
                s_0 = this.stops[s-1] !== undefined ? s-1 : s;
                s_1 = s;
                break;
            }
        }

        let ff = s_0 === s_1 ? f : (f - this.stops[s_0]) / (this.stops[s_1] - this.stops[s_0]);

        return {s_0: s_0,s_1: s_1,ff: ff};
    }

    lerp(a,b,f) {
        return a + (b - a) * f;
    }

    rgbaInt(f,log){

        if (log) f = this.toLog(f,log);
        let p = this.getRange(f);
        let r = Math.floor(this.lerp(this.colors[p.s_0].rgba[0],this.colors[p.s_1].rgba[0],p.ff));
        let g = Math.floor(this.lerp(this.colors[p.s_0].rgba[1],this.colors[p.s_1].rgba[1],p.ff));
        let b = Math.floor(this.lerp(this.colors[p.s_0].rgba[2],this.colors[p.s_1].rgba[2],p.ff));
        let a = this.lerp(this.colors[p.s_0].rgba[3],this.colors[p.s_1].rgba[3],p.ff);

        return 'rgba('+r+','+g+','+b+','+a+')';

    }

    hclInt(f,log){

        if (log) f = this.toLog(f,log);
        let p = this.getRange(f);
        for (let c in this.colors) {this.colors[c].makeHcl()};

        let angle = this.correctHue(this.colors[p.s_0].hcl[0], this.colors[p.s_1].hcl[0]);

        let h = this.lerp(angle[0],angle[1],p.ff);
        let c = this.lerp(this.colors[p.s_0].hcl[1],this.colors[p.s_1].hcl[1],p.ff);
        let l = this.lerp(this.colors[p.s_0].hcl[2],this.colors[p.s_1].hcl[2],p.ff);

        return new l_Color('hcl('+h+','+c+','+l+')').getRgbString();

    }

    labInt(f,log){

        if (log) f = this.toLog(f,log);
        let p = this.getRange(f);
        for (let c in this.colors) {this.colors[c].makeLab()};

        let l = this.lerp(this.colors[p.s_0].lab[0],this.colors[p.s_1].lab[0],p.ff);
        let a = this.lerp(this.colors[p.s_0].lab[1],this.colors[p.s_1].lab[1],p.ff);
        let b = this.lerp(this.colors[p.s_0].lab[2],this.colors[p.s_1].lab[2],p.ff);


        return new l_Color('lab('+l+','+a+','+b+')').getRgbString();
        // let rgb = this.labToRgb([l,a,b]);
        // return 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',1)';

    }

    hsvInt(f,log){

        if (log) f = this.toLog(f,log);
        let p = this.getRange(f);
        for (let c in this.colors) {this.colors[c].makeHsv()};

        let angle = this.correctHue(this.colors[p.s_0].hsv[0], this.colors[p.s_1].hsv[0]);

        // return Math.exp(i / length * Math.log(length));

        let h = this.lerp(angle[0],angle[1],p.ff);
        let s = this.lerp(this.colors[p.s_0].hsv[1],this.colors[p.s_1].hsv[1],p.ff);
        let v = this.lerp(this.colors[p.s_0].hsv[2],this.colors[p.s_1].hsv[2],p.ff);

        return new l_Color('hsv('+h+','+s+','+v+')').getRgbString();
        // let rgb = this.hsvToRgb([h,s,v]);
        // return 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',1)';

    }

    toLog(f,p){
        return p >= 0 ? Math.log(f) / (p ? p : 2) + 1 : Math.log(1-f)/p;
    }

    correctHue(h1, h2){

        if (h1 < h2){
            if (h2 - h1 > h1 + 360 - h2) h1 += 360;
        } else {
            if (h1 - h2 > h2 + 360 - h1) h2 += 360;
        }
        return [h1, h2];

    }

}

// function isItDark(color){
//         let c = new l_Color(color);
//         // let max = Math.max(c.rgba[0],c.rgba[1],c.rgba[2]);
//         // let min = Math.min(c.rgba[0],c.rgba[1],c.rgba[2]);
//         // let q = Math.exp(3 * (min / max) / 100);
//         // let l = ((q * max) + ((1 - q) * min))/255;
//         // return l > .85 ? false : true;

//         // return c.lab[3]
//         c.makeLab();
//         return c.lab[0] < 70 ? true : false;
// }