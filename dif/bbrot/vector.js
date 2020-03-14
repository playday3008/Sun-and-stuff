class Vector {
    constructor(x, y){
        this.x = x || 0;
        this.y = y !== undefined ? y : this.x;
    }
    add(v){
        if (v instanceof Vector){
            this.x += v.x;
            this.y += v.y;
        }
    }
    sum(v){
        if (v instanceof Vector){
            return new Vector(this.x + v.x, this.y + v.y);
        } else if (typeof v === 'number'){
            return new Vector(this.x + v, this.y + v);
        }
    }
    dif(v){
        if (v instanceof Vector){
            return new Vector(this.x - v.x, this.y - v.y);
        } else if (typeof v === 'number'){
            return new Vector(this.x - v, this.y - v);
        }
    }
    flip(){
        return new Vector(this.y, this.x);
    }
    step(v){
        if (v instanceof Vector){
            return new Vector(this.x < v.x ? 0 : 1, this.y < v.y ? 0 : 1);
        } else if (typeof v === 'number'){
            return new Vector(this.x < v ? 0 : 1, this.y < v ? 0 : 1);
        }
    }
    floor(){
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }
    sub(v){
        if (v instanceof Vector){
            this.x -= v.x;
            this.y -= v.y;
        }   
    }
    distanceTo(v){
        if (v instanceof Vector){
            return new Vector(v.x - this.x, v.y - this.y);
        }
    }
    mult(s){
        if (typeof s === 'number'){
            this.x *= s;
            this.y *= s;
        } else if (s instanceof Vector){
            return this.x * s.x + this.y * s.y;
        }
    }
    mag(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    mag2(){
       return this.x * this.x + this.y * this.y;
    }
    normalize(){
        let mag = this.mag();
        if (mag != 0){
            this.x /= mag;
            this.y /= mag;
        }
    }
    clone(){
        return new Vector(this.x, this.y);
    }
    angle(v){
        if (v instanceof Vector){
            let a = Math.acos(this.mult(v) / (this.mag() * v.mag()));
            return isNaN(a) ? 0 : a;
        } else if (v === undefined) {
            return Math.atan2(this.y, this.x);
        }
    }
    rotate(a){
        if (typeof a === 'number'){
            let x = this.x * Math.cos(a) - this.y * Math.sin(a);
            let y = this.x * Math.sin(a) + this.y * Math.cos(a);
            this.x = x;
            this.y = y;
        }
    }
    projectTo(v){
        if (v instanceof Vector){
            let value = v.mult(this) / v.mag();
            let v2 = v.clone();
            v2.normalize();
            v2.mult(value);
            return v2;
        }
    }
    limitXY(x,y){
        if (typeof x === 'number' && typeof y === 'number'){
            if (this.x > 0 && this.x > x) {
                this.x = x;
            } else if (this.x < 0 && this.x < -x){
                this.x = -x;
            }
            if (this.y > 0 && this.y > y) {
                this.y = y;
            } else if (this.y < 0 && this.y < -y){
                this.y = -y;
            }
        }
    }
}

function goodAngle(a){
    var good = a % (Math.PI * 2);
    if (good > Math.PI) {
        good -= Math.PI * 2;
    } else if (good < -Math.PI) {
        good += Math.PI * 2;
    }
    return good; 
}
