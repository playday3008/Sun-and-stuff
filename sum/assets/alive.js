function Alive(){
	this.animations = [];
	this.lt = Date.now();
	this.dt = 0;
	this.tt = 0;
	this.propertyList = [
		'opacity',
		'margin-top',
		'margin-left',
		'margin-right',
		'margin-bottom',
		'border-radius',
		'background-color',
		'background',
		'color'
	];
	this.altPropertyList = [
		'opacity',
		'marginTop',
		'marginLeft',
		'marginRight',
		'marginBottom',
		'borderRadius',
		'backgroundColor',
		'backgroundColor',
		'color'
	];
};
Alive.prototype.select = function(element){
	if (typeof element == 'string'){
		return document.getElementById(element);
	} else {
		return element;
	}
};
Alive.prototype.animate = function(elementId,property,value,duration,delay,endfunction,easing){
	if (elementId && property){
		var node = this.select(elementId);
		if (node != null){
			var propertyIndex = this.propertyList.indexOf(property);
			if (propertyIndex != -1 && value != undefined){
				var calculatedProperty = this.altPropertyList[propertyIndex];
				var calculatedPropertyValue = window.getComputedStyle(node)[calculatedProperty];
				var checkedStartValue, checkedEndValue, checkedSuffix = undefined;

				if (propertyIndex <= 5){
					if (typeof value == 'number'){
							checkedStartValue = +calculatedPropertyValue || 0;
							checkedEndValue = value;
						} else if (typeof value == 'string'){
							var px = value.indexOf('px');
							if (px != -1){
								checkedSuffix = 'px';
								var initial = calculatedPropertyValue;
								var cut = initial.indexOf('px');
								checkedStartValue = +initial.slice(0,cut);
								checkedEndValue = value.slice(0,px);
							}
						};
				} else {
					var initial = calculatedPropertyValue.match(/\d+/g);
					var final = value.match(/\d+/g);
					checkedStartValue = {
						r: +initial[0],
						g: +initial[1],
						b: +initial[2],
						a: initial[3] && initial[4] ? +(initial[3]+'.'+initial[4]) : initial[3] ? +initial[3] : 1
					};
					checkedEndValue = {
						r: +final[0],
						g: +final[1],
						b: +final[2],
						a: final[3] && final[4] ? +(final[3]+'.'+final[4]) : final[3] ? +final[3] : checkedStartValue.a
					}
				}

				if (checkedStartValue != undefined && checkedEndValue != undefined){
					var checkedDuration = 1000;
					if (duration){
						if (typeof duration == 'number'){
							checkedDuration = duration;
						} else {
							console.log('I dont know how to handle '+duration+' duration so I set duration to one second');
						}
					};
					var checkedDelay = 0;
					var checkedEndFunction = false;
					var checkedEasing = false;
					if (delay){
						if (typeof delay == 'number'){
							checkedDelay = delay;
						} else if (typeof delay == 'function'){
							checkedEndFunction = delay;
						} else if (typeof delay == 'string'){
							checkedEasing = delay;
						} else {
							console.log('I dont know how to handle '+delay+' delay so I set delay to zero');
						}
					};
					if (endfunction){
						if (typeof endfunction == 'function'){
							checkedEndFunction = endfunction;
						} else if (typeof endfunction == 'string'){
							checkedEasing = endfunction;
						} else {
							console.log('I dont know how to handle end function so I will do nonthing on animation end');
						}
					}
					if (easing){
						if (typeof easing == 'string'){
							checkedEasing = easing
						} else {
							console.log('I dont know about such interpolation, sorry');
						}
					}
					new alive_Animation(
						node,
						checkedDuration,
						checkedDelay,
						property,
						checkedStartValue,
						checkedEndValue,
						checkedSuffix,
						checkedEndFunction,
						checkedEasing
					);
				} else {
					console.log('Something is wrong with values');
				}

				
			} else {
				console.log('I am not sure how to animate '+property+' property and/or without value');
			}
		}
	}
};
Alive.prototype.frame = function(){
	for (anims = 0; anims < alive.animations.length; anims++){
			alive.animations[anims].frame();
		}
		for (terminator = 0; terminator < alive.animations.length; terminator++){
			if (alive.animations[terminator].finished){
				alive.animations.splice(terminator,1);
				terminator--;
			}
		};

	if (window.counter) {window.counter.innerHTML = 'Number of animations: '+alive.animations.length;} // TESTING PURPOSES ONLY. DELETE IF DONT UNDERSTAND WHAT IS GOING ON.
	
}

// Animation object
function alive_Animation(element,time,delay,property,startValue,endValue,suffix,callback,interpolation){
	this.element = element;
	this.property = property;
	this.callback = callback;
	this.startTime = alive.lt + delay;
	this.currentTime = alive.lt;
	this.endTime = this.startTime + time;
	this.interpolation = interpolation || false;
	this.startValue = startValue;
	this.endValue = endValue;
	this.suffix = suffix || '';
	this.id = alive.animations.length;
	this.finished = false;
	var interrupt = false;
	for (s=0;s<alive.animations.length;s++){
		if (this.element == alive.animations[s].element && this.property == alive.animations[s].property){
			alive.animations[s] = this;
			interrupt = true;
		}
	};
	if (!interrupt){
		alive.animations.push(this);
	}
	
};
alive_Animation.prototype.frame = function(){
	this.currentTime += alive.dt;
	if (this.currentTime >= this.startTime){
		if (this.currentTime < this.endTime){
			if (typeof this.startValue == 'number'){
				this.element.style[this.property] = mapNumber(this.currentTime,this.startTime,this.endTime,this.startValue,this.endValue,this.interpolation)+this.suffix;
			} else {
				this.element.style[this.property] = mapColor(this.currentTime,this.startTime,this.endTime,this.startValue.r,this.startValue.g,this.startValue.b,this.startValue.a,this.endValue.r,this.endValue.g,this.endValue.b,this.endValue.a,this.interpolation);
			}
		} else {
			if (typeof this.startValue == 'number'){
				this.element.style[this.property] = this.endValue+this.suffix;
			} else {
				this.element.style[this.property] = 'rgba('+this.endValue.r+', '+this.endValue.g+', '+this.endValue.b+', '+this.endValue.a+')';
			}
			this.finished = true;
			if (this.callback) this.callback();
		}
	}
};

function mapColor(num,from,to,rf,gf,bf,af,rt,gt,bt,at,interpolation){
	var r = Math.floor(mapNumber(num,from,to,rf,rt,interpolation));
	var g = Math.floor(mapNumber(num,from,to,gf,gt,interpolation));
	var b = Math.floor(mapNumber(num,from,to,bf,bt,interpolation));
	var a = mapNumber(num,from,to,af,at,interpolation);

	r = r < 0 ? 0 : r > 255 ? 255 : r;
	g = g < 0 ? 0 : g > 255 ? 255 : g;
	b = b < 0 ? 0 : b > 255 ? 255 : b;
	a = a < 0 ? 0 : a > 1 ? 1 : a;

	return 'rgba('+r+','+g+','+b+','+a+')';
};

// Mapping function for numbers using interpolators
function mapNumber(num,from,to,mFrom,mTo,interpolation){
	if (interpolation == 'CubeDecel'){
		return mFrom + (mTo - mFrom)*interCubeDecel((num - from)/(to - from));
		//return mFrom + (mTo - mFrom)*(1 - elastic(1 - (num - from)/(to - from)));
	} else if (interpolation == 'CubeAccel'){
		return mFrom + (mTo - mFrom)*interCubeAccel((num - from)/(to - from));
	} else if (interpolation == 'elastic'){
		return mFrom + (mTo - mFrom)*(1 - elastic(1 - (num - from)/(to - from)));
	} else {
		return mFrom + (mTo - mFrom)*(num - from)/(to - from);
	};
};

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

function elastic(x) {
  return Math.pow(2, 10 * (x - 1)) * 1.15 * Math.cos(27 * Math.PI / 7.04 * x)
};
function invert(interpolator){
	return function(x){
		return 1 - interpolator(1-x);
	}
};

window.alive = new Alive();
window.alive.engine = function(){
	var now = Date.now();
	alive.dt = now - alive.lt;
	alive.lt = now;
	alive.tt += alive.dt;
	alive.frame();
	requestAnimationFrame(alive.engine);
};
alive.engine();