// V 3.0 with rotation and mat4
class Mat3 {
    constructor(a){

        this.data = (typeof a === `object` && a.length === 9) ? a : [1,0,0,0,1,0,0,0,1];

    }

    mult(m2){
        if (m2 instanceof Mat3){
        this.data = [this.data[0] * m2.data[0] + this.data[1] * m2.data[3] + this.data[2] * m2.data[6], this.data[0] * m2.data[1] + this.data[1] * m2.data[4] + this.data[2] * m2.data[7], this.data[0] * m2.data[2] + this.data[1] * m2.data[5] + this.data[2] * m2.data[8],
                this.data[3] * m2.data[0] + this.data[4] * m2.data[3] + this.data[5] * m2.data[6], this.data[3] * m2.data[1] + this.data[4] * m2.data[4] + this.data[5] * m2.data[7], this.data[3] * m2.data[2] + this.data[4] * m2.data[5] + this.data[5] * m2.data[8],
                this.data[6] * m2.data[0] + this.data[7] * m2.data[3] + this.data[8] * m2.data[6], this.data[6] * m2.data[1] + this.data[7] * m2.data[4] + this.data[8] * m2.data[7], this.data[6] * m2.data[2] + this.data[7] * m2.data[5] + this.data[8] * m2.data[8]]
        }
    }

    setRotation(x,y,z){

        this.data = [1,0,0,0,1,0,0,0,1]

        if (x!==undefined){
            this.mult(new Mat3([1,0,0,0,Math.cos(x),-Math.sin(x),0,Math.sin(x),Math.cos(x)]))
        }
        if (y!==undefined){
            this.mult(new Mat3([Math.cos(y),0,Math.sin(y),0,1,0,-Math.sin(y),0,Math.cos(y)]))
        }
        if (z!==undefined){
            this.mult(new Mat3([Math.cos(z),Math.sin(z),0,-Math.sin(z),Math.cos(z),0,0,0,1]))
        }

        return this
        
    }
}

class Mat4 {
    constructor(a){

        this.data = (typeof a === `object` && a.length === 16) ? a : [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

    }

    mult(m2){
        if (m2 instanceof Mat4){
        this.data = [this.data[0] * m2.data[0] + this.data[1] * m2.data[4] + this.data[2] * m2.data[8] + this.data[3] * m2.data[12], this.data[0] * m2.data[1] + this.data[1] * m2.data[5] + this.data[2] * m2.data[9] + this.data[3] * m2.data[13], this.data[0] * m2.data[2] + this.data[1] * m2.data[6] + this.data[2] * m2.data[10] + this.data[3] * m2.data[14],this.data[0] * m2.data[3] + this.data[1] * m2.data[7] + this.data[2] * m2.data[11] + this.data[3] * m2.data[15],this.data[4] * m2.data[0] + this.data[5] * m2.data[4] + this.data[6] * m2.data[8] + this.data[7] * m2.data[12], this.data[4] * m2.data[1] + this.data[5] * m2.data[5] + this.data[6] * m2.data[9] + this.data[7] * m2.data[13], this.data[4] * m2.data[2] + this.data[5] * m2.data[6] + this.data[6] * m2.data[10] + this.data[7] * m2.data[14],this.data[4] * m2.data[3] + this.data[5] * m2.data[7] + this.data[6] * m2.data[11] + this.data[7] * m2.data[15],this.data[8] * m2.data[0] + this.data[9] * m2.data[4] + this.data[10] * m2.data[8] + this.data[11] * m2.data[12], this.data[8] * m2.data[1] + this.data[9] * m2.data[5] + this.data[10] * m2.data[9] + this.data[11] * m2.data[13], this.data[8] * m2.data[2] + this.data[9] * m2.data[6] + this.data[10] * m2.data[10] + this.data[11] * m2.data[14],this.data[8] * m2.data[3] + this.data[9] * m2.data[7] + this.data[10] * m2.data[11] + this.data[11] * m2.data[15],this.data[12] * m2.data[0] + this.data[13] * m2.data[4] + this.data[14] * m2.data[8] + this.data[15] * m2.data[12], this.data[12] * m2.data[1] + this.data[13] * m2.data[5] + this.data[14] * m2.data[9] + this.data[15] * m2.data[13], this.data[12] * m2.data[2] + this.data[13] * m2.data[6] + this.data[14] * m2.data[10] + this.data[15] * m2.data[14],this.data[12] * m2.data[3] + this.data[13] * m2.data[7] + this.data[14] * m2.data[11] + this.data[15] * m2.data[15]]
        }
    }

}

class pCamera {

    constructor(fov,r,n,f){

        this.t = Math.tan(fov / 2)
        this.r = r
        this.n = n
        this.f = f
        this.nf = n - f

        this.matrix = new Mat4([1 / (this.t * this.r), 0, 0, 0, 0, 1 / this.t, 0, 0, 0, 0, (-n - f) / this.nf, 2 * f * n / this.nf, 0, 0, 1, 0])

    }

}

class Vector3 {
    constructor(x, y, z){
        this.x = x || 0
        this.y = y || 0
        this.z = z || 0
    }
    add(v){
        if (v instanceof Vector3){
            this.x += v.x
            this.y += v.y
            this.z += v.z
        }
    }
    sum(v){
        if (v instanceof Vector3){
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
        }
    }
    sub(v){
        if (v instanceof Vector3){
            this.x -= v.x
            this.y -= v.y
            this.z -= v.z
        }
    }
    vecTo(v){
        if (v instanceof Vector3){
            return new Vector3(v.x - this.x, v.y - this.y, v.z - this.z)
        }
    }
    mult(vsm){
        if (typeof vsm === 'number'){
            this.x *= vsm
            this.y *= vsm
            this.z *= vsm
        } else if (vsm instanceof Vector3){
            return this.dot(vsm)
        } else if (vsm instanceof Mat3){
            let x = this.x * vsm.data[0] + this.y * vsm.data[1] + this.z * vsm.data[2]
            let y = this.x * vsm.data[3] + this.y * vsm.data[4] + this.z * vsm.data[5]
            let z = this.x * vsm.data[6] + this.y * vsm.data[7] + this.z * vsm.data[8]
            this.x = x
            this.y = y
            this.z = z
        } else if (vsm instanceof Mat4){
            let x = this.x * vsm.data[0] + this.y * vsm.data[1] + this.z * vsm.data[2] + vsm.data[3]
            let y = this.x * vsm.data[4] + this.y * vsm.data[5] + this.z * vsm.data[6] + vsm.data[7]
            let z = this.x * vsm.data[8] + this.y * vsm.data[9] + this.z * vsm.data[10] + vsm.data[11]
            this.x = x
            this.y = y
            this.z = z
        }
        return this
    }
    dot(v){
         if (v instanceof Vector3){
            return (this.x * v.x + this.y * v.y + this.z * v.z)
        }
    }
    clone(){
        return new Vector3(this.x, this.y, this.z);
    }
}

class Vector {
    constructor(x, y){
        this.x = x || 0
        this.y = y || 0
        return this
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
        }
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
    mult(vsm){
        if (typeof vsm === 'number'){
            this.x *= vsm;
            this.y *= vsm;
            return this
        } else if (vsm instanceof Vector){
            return this.x * vsm.x + this.y * vsm.y;
        } else if (vsm instanceof Mat3){
            let x = this.x * vsm.data[0] + this.y * vsm.data[1] + vsm.data[2]
            let y = this.x * vsm.data[3] + this.y * vsm.data[4] + vsm.data[5]
            this.x = x
            this.y = y
            return this
        }
    }
    dot(v){
        if (v instanceof Vector){
            return (this.x * v.x + this.y * v.y);
        }
    }
    cross(v){
        if (v instanceof Vector){
            return (this.x * v.y - this.y * v.x);
        }
    }
    isEqualTo(v){
        if (v instanceof Vector){
            return (this.x === v.x && this.y === v.y);
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
        return this
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