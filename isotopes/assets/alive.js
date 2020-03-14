// v0.3 © Sunandstuff
function Alive(){
	this.animations = [];
	this.lt = Date.now();
	this.dt = 0;
	this.tt = 0;
	this.active = false;
	this.mainMask = /(?:[^\d-.]|\.(?!\d)|-(?!\.?\d))+|-?(?:\d*\.)?\d+/g;
	this.colorMask = /#([A-Fa-f0-9]{3}){1,2}|rgba?\(\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(\d+)?(\.\d+)?\s*)?\)/;
	this.properties = [
		{name: 'margin-top', validName: 'marginTop'},
		{name: 'font-size', validName: 'fontSize'},
		{name: 'background-color', validName: 'backgroundColor'},
		{name: 'svgTransform', validName: 'transform', isAttr: true}
	];
	this.engine = function(){
		var now = Date.now();
		this.dt = now - this.lt;
		this.lt = now;
		this.tt += this.dt;
		this.frame();
		if (this.active) requestAnimationFrame(this.engine);
	}.bind(this);
};
Alive.prototype.ignition = function(){
	if (!this.active){
		this.active = true;
		this.engine();
	}
}
Alive.prototype.select = function(element){
	if (typeof element == 'string'){
		let dom_id = document.getElementById(element);
		let dom_class = document.getElementsByClassName(element)[0];  // TO DO: MULTIPLE SELECTION
		if (dom_id || dom_class){
			return dom_id ? dom_id : dom_class;
		} else {
			console.log('Cannot locate element :(');
			return false;
		}
	} else {
		return element;
	}
};
Alive.prototype.getValidProperty = function(property){
	let found = false;
	let isAttr = /(A)/g.test(property);
	let checkedName = isAttr ? property.substring(0, property.length - 3) : property;
	let realName = checkedName;

	for (let i = 0; i < this.properties.length; i++){
		if (checkedName === this.properties[i].name){
			checkedName = this.properties[i].validName;
			i = this.properties.length;
		}
	}
	return {name: realName, validName: checkedName, isAttr: isAttr}
	
}
Alive.prototype.findNumbers = function(unsearched){
	let source = [];
	let ints = [];
	for (let i = 0; i < unsearched.length; i++){
		if (isNaN(+unsearched[i])){
			source.push(unsearched[i]);
		} else {
			source.push(+unsearched[i]);
			ints.push(+unsearched[i]);
		}
	}
	return {source: source, ints: ints};
}
Alive.prototype.animate = function(element,property,value,duration,delay,callback,easing){
	if (element && property && value != undefined){
		let node = this.select(element);
		let validProperty = this.getValidProperty(property);
		let currentPropertyValue, startValue, endValue, combinator, validDuration = 1000, validDelay = 0, validCallback, validEasing, isColor;

		if (node && validProperty){
			if (validProperty.isAttr){
				currentPropertyValue = node.getAttribute(validProperty.validName);
			} else {
				let existingStyle = node.style[validProperty.validName];
				if (existingStyle != ''){
					currentPropertyValue = existingStyle;
				} else {
					currentPropertyValue = window.getComputedStyle(node)[validProperty.validName];
				}
			}

			let parsedStart = typeof currentPropertyValue === 'number' ? currentPropertyValue : (currentPropertyValue === undefined || currentPropertyValue === null) ? '0' : currentPropertyValue.match(this.mainMask);
			let parsedEnd = typeof value === 'number' ? value : value.match(this.mainMask);
			
			isColor = this.colorMask.test(value);
			if (isColor){
				parsedStart = this.findNumbers(parsedStart);		//UPDATE TO ALIVE.ANIMATE(A, COLOR,'RED');
				parsedEnd = this.findNumbers(parsedEnd);
				if (parsedStart.ints[0] === 0 && parsedStart.ints[1] === 0 && parsedStart.ints[2] === 0 && parsedStart.ints[3] === 0){
					parsedStart.ints[0] = parsedEnd.ints[0];
					parsedStart.ints[1] = parsedEnd.ints[1];
					parsedStart.ints[2] = parsedEnd.ints[2];
					parsedStart.ints[3] = 0;
				}
				if (parsedStart.ints[3] == undefined) parsedStart.ints[3] = 1;
				if (parsedEnd.ints[3] == undefined) parsedEnd.ints[3] = 1;
				combinator = function(rgba){
					return 'rgba('+Math.round(rgba[0])+','+Math.round(rgba[1])+','+Math.round(rgba[2])+','+rgba[3]+')';
				};
			} else {
				if (typeof parsedEnd === 'number'){
					parsedStart = {ints: +parsedStart || 0};
					parsedEnd = {ints: +parsedEnd || 0};
					combinator = false;
				} else {
					parsedStart = this.findNumbers(parsedStart);
					parsedEnd = this.findNumbers(parsedEnd);
					if (parsedStart.ints.length != parsedEnd.ints.length){		//DEBATE
						for (let i = 0; i < parsedEnd.ints.length; i++){
							if (parsedStart.ints[i] === undefined){
								parsedStart.ints[i] = 0;
							}
						}
					}
					
					let combinatorGuts = 'return ';
					for (let i = 0, j = 0; i < parsedEnd.source.length; i++){
						if (typeof parsedEnd.source[i] === 'string'){
							combinatorGuts += '\''+parsedEnd.source[i]+'\'+';
						} else {
							combinatorGuts += 'chunks['+j+']+';
							j++;
						}
					}
					combinatorGuts = combinatorGuts.substring(0, combinatorGuts.length - 1);
					combinatorGuts += ';';
					combinator = new Function('chunks', combinatorGuts);
				}
			}

			if (parsedStart.ints != undefined && parsedEnd.ints != undefined){
				if (typeof duration == 'number'){
					validDuration = duration;
				} else {
					console.log('Do this: element, property, final value, duration, delay, callback, easing');
				};
				if (delay){
					if (typeof delay == 'number'){
						validDelay = delay;
					} else if (typeof delay == 'function'){
						validCallback = delay;
					} else if (typeof delay == 'string'){
						validEasing = delay;
					} else {
						console.log('Do this: element, property, final value, duration, delay, callback, easing');
					}
				};
				if (callback){
					if (typeof callback == 'function'){
						validCallback = callback;
					} else if (typeof callback == 'string'){
						validEasing = callback;
					} else {
						console.log('I dont know how to handle callback so I will do nonthing on animation end');
					}
				}
				if (easing){								//VALIDATE!
					if (typeof easing == 'string'){
						validEasing = easing
					} else {
						console.log('I dont know about such interpolation, sorry');
					}
				}
			};
			element.alive = new alive_Animation(
				this,
				node,
				validDuration,
				validDelay,
				validProperty,
				parsedStart.ints,
				parsedEnd.ints,
				combinator,
				validCallback,
				validEasing
			);

		} else {
			console.log('Do this: element, property, final value(, duration, delay, callback, easing)');
		}
		
	} else {
		console.log('Give me something to work with! — sincerely, Alive')
	}
};
Alive.prototype.frame = function(){
	for (let i = 0; i < this.animations.length; i++){
		this.animations[i].frame();
	}
	for (let t = 0; t < this.animations.length; t++){
		if (this.animations[t].finished){
			this.animations.splice(t,1);
			t--;
		}
	};
	if (this.animations.length == 0){
		this.active = false;
	}
}

// Animation object
function alive_Animation(alive,element,duration,delay,property,startValue,endValue,combinator,callback,interpolation){
	this.alive = alive;
	this.element = element;
	this.property = property;
	this.isAttr = property.isAttr;
	this.callback = callback;
	this.startTime = alive.lt + Math.round(delay);
	this.currentTime = alive.lt;
	this.endTime = this.startTime + Math.round(duration);
	this.interpolation = interpolation || false;
	this.startValue = startValue;
	this.endValue = endValue;
	this.currentValue = [];
	this.combinator = combinator;
	this.id = alive.animations.length;
	this.finished = false;
	let interrupt = false;
	for (let s = 0; s < alive.animations.length; s++){
		if (this.element == alive.animations[s].element && this.property.name == alive.animations[s].property.name){
			alive.animations[s] = this;
			interrupt = true;
		}
	};
	if (!interrupt){
		alive.animations.push(this);
		this.alive.ignition();
	}
};
alive_Animation.prototype.frame = function(){
	this.currentTime += alive.dt;
	if (this.currentTime >= this.startTime){
		if (this.currentTime < this.endTime){
			if (this.interpolation != 'jump'){
				if (typeof this.startValue === 'object' && this.combinator){
					for (let i = 0; i < this.startValue.length; i++){
						this.currentValue[i] = map(this.currentTime, [this.startTime, this.endTime], [this.startValue[i], this.endValue[i]], this.interpolation);
						//if (this.property.isRounded) this.currentValue[i] = Math.round(this.currentValue[i]);
					}
					if (this.isAttr){
						this.element.setAttribute(this.property.validName, this.combinator(this.currentValue));
					} else {
						this.element.style[this.property.validName] = this.combinator(this.currentValue);
					}
				} else {
					if (this.combinator){
						this.currentValue = map(this.currentTime, [this.startTime, this.endTime], [this.startValue, this.endValue], this.interpolation);
						if (this.property.isRounded) this.currentValue = Math.round(this.currentValue);
						if (this.isAttr){
							this.element.setAttribute(this.property.validName, this.combinator(this.currentValue));
						} else {
							this.element.style[this.property.validName] = this.combinator(this.currentValue);
						}
					} else {
						let mapped = map(this.currentTime, [this.startTime, this.endTime], [this.startValue, this.endValue], this.interpolation);
						if (this.property.isRounded) mapped = Math.round(mapped);
						if (this.isAttr){
							this.element.setAttribute(this.property.validName, mapped);
						} else {
							this.element.style[this.property.validName] = mapped;
						}
					}
				}	
			}
		} else {
			if (this.combinator){
				if (this.isAttr){
					this.element.setAttribute(this.property.validName, this.combinator(this.endValue));
				} else {
					this.element.style[this.property.validName] = this.combinator(this.endValue);
				}
				
			} else {
				if (this.isAttr){
					this.element.setAttribute(this.property.validName, this.endValue);
				} else {	
					this.element.style[this.property.validName] = this.endValue;
				}
				
			}
			this.finished = true;
			this.element.alive = false;
			if (this.callback) this.callback();
		}
		
	}
};

// Mapping function for numbers using interpolators

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
function mapColor(frac,colors,interpolation){
        let fraction = frac > 1 ? 1 : frac < 0 ? 0 : frac;
        let marker = undefined;
        let stops = [];
        if (typeof interpolation === 'object'){
        	stops = interpolation;
        } else {
        	if (interpolation === 'logR' && fraction != 1){
        		fraction = Math.abs(Math.log(fraction) / 80);
        		fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
        	} else if (interpolation === 'logU' && fraction != 1){
        		fraction = Math.abs(Math.log(fraction) / 27);
        		fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
        	} else if (interpolation === 'logC' && fraction != 1){
        		fraction = Math.abs(Math.log(fraction) / 20);
        		fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
        	}
        	for (let i = 0; i <= 1; i += 1 / (colors.length - 1)){
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
        console.log('Something just wrong',colors,marker);
    }
} 

// Cubic deceleration interpolator
function interCubeDecel(x){
	v0 = -2;
	v1 = 0;
	v2 = 1;
	v3 = 0;

	P = (v3 - v2) - (v0 - v1);
	Q = (v0 - v1) - P;
	R = v2 - v0;
	S = v1;

	return P*Math.pow(x,3) + Q*Math.pow(x,2) + R*x + S;
};

// Cubic acceleration interpolator
function interCubeAccel(x){
	v0 = 1;
	v1 = 0;
	v2 = 1;
	v3 = 3;

	P = (v3 - v2) - (v0 - v1);
	Q = (v0 - v1) - P;
	R = v2 - v0;
	S = v1;

	return P*Math.pow(x,3) + Q*Math.pow(x,2) + R*x + S;
};
function interCubeFull(x){
	v0 = 1;
	v1 = 0;
	v2 = 1;
	v3 = 0;

	P = (v3 - v2) - (v0 - v1);
	Q = (v0 - v1) - P;
	R = v2 - v0;
	S = v1;

	return P*Math.pow(x,3) + Q*Math.pow(x,2) + R*x + S;
};

function elastic(x) {
  return Math.pow(2, 10 * (x - 1)) * 1.15 * Math.cos(27 * Math.PI / 7.04 * x);
}
function invert(interpolator){
	return function(x){
		return 1 - interpolator(1-x);
	}
};
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Very bad hex');
}

window.alive = new Alive();

//alive.engine();