var Vector = function(x,y){                               //VERCTORS & MATH
                this.x = x ? x : 0;
                this.y = y ? y : 0;
            }

Vector.prototype.magnitude = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vector.prototype.normalize = function(){
    var mag = this.magnitude();
    if (mag != 0){
        this.x = this.x / mag;
        this.y = this.y / mag;
    }
}
Vector.prototype.add = function(v2,b){
    if (!b){
        this.x += v2.x;
        this.y += v2.y;
    } else {
        this.x += v2;
        this.y += b;
    }
}
Vector.prototype.mult = function(n){
    if (typeof n == 'object'){
        return this.x * n.x + this.y * n.y;
    } else {
        this.x *= n;
        this.y *= n;
    }
}
Vector.prototype.clone = function(){
    return new Vector(this.x,this.y);
}
Vector.prototype.rotate = function(angle){
    let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
}
Vector.prototype.angle = function(v){
    if (v){
        return Math.acos((this.x * v.x + this.y * v.y)/(this.magnitude()*v.magnitude()));
    } else {
        return Math.atan2(this.y, this.x);
    }
}
Vector.prototype.getProjection = function(v){
    let value = v.mult(this) / v.magnitude();
    let projection = v.clone();
    projection.normalize();
    projection.mult(value);
    return projection;
}
Vector.prototype.clamp = function(a,b){
    this.x = this.x > b ? b : this.x < a ? a : this.x;
    this.y = this.y > b ? b : this.x < a ? a : this.y;
}
function getDistanceVector(v1,v2){
    return new Vector(v2.x-v1.x,v2.y-v1.y);
}
function goodAngle(ang){
    var good = ang % (Math.PI*2);
    if (good > Math.PI) {good = good - Math.PI*2;} else if (good < Math.PI * -1) {good = Math.PI*2 + good}
    return good; 
}
function map(value,domain,range,easing){
    if (easing){
      return range[0] + (range[1] - range[0]) * interCubeDecel((value - domain[0]) / (domain[1] - domain[0]));
    } else {
        return range[0] + (range[1] - range[0]) * (value - domain[0]) / (domain[1] - domain[0]);
    }
};
function mapColor(fraction,stops,colors){
        fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
        let marker = undefined;
        for (let i = 1; i < stops.length; i++){
            if (fraction <= stops[i]){
                marker = i - 1;
                break;
            }
        }
        try{
        if (marker != undefined){
            let from = stops[marker]
            let to = stops[marker + 1];
            let colorFrom = colors[marker];
            let colorTo = colors[marker + 1];
            let r = Math.floor(map(fraction,[from,to],[colorFrom[0],colorTo[0]]));
            let g = Math.floor(map(fraction,[from,to],[colorFrom[1],colorTo[1]]));
            let b = Math.floor(map(fraction,[from,to],[colorFrom[2],colorTo[2]]));
            let a = map(fraction,[from,to],[colorFrom[3],colorTo[3]]);

            r = r < 0 ? 0 : r > 255 ? 255 : r;
            g = g < 0 ? 0 : g > 255 ? 255 : g;
            b = b < 0 ? 0 : b > 255 ? 255 : b;
            a = a < 0 ? 0 : a > 1 ? 1 : a;

            return [r,g,b,a];
        }
    } catch (err){
        console.log(colors,marker);
    }
    }                                                       //END
    
