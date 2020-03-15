onmessage = function(event){

	render(event.data.map);

	function map(value,domain,range,isDecel){
	    if (isDecel){
	      return range[0] + (range[1] - range[0]) * interCubeDecel((value - domain[0]) / (domain[1] - domain[0]));
	    } else {
	        return range[0] + (range[1] - range[0]) * (value - domain[0]) / (domain[1] - domain[0]);
	    }
	};
	function interCubeDecel(x){
	    v0 = -2;
	    v1 = 0;
	    v2 = 1;
	    v3 = 0;

	    P = (v3 - v2) - (v0 - v1);
	    Q = (v0 - v1) - P;
	    R = v2 - v0;
	    S = v1;

	    return P*x*x*x + Q*x*x + R*x + S;
	};
	function mapColor(fraction,stops,colors){
		fraction = fraction > 1 ? 1 : fraction < 0 ? 0 : fraction;
		let marker = undefined;
		for (let i = 1; i < stops.length; i++){
			if (fraction < stops[i]){
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
	        let a = Math.floor(map(fraction,[from,to],[colorFrom[3],colorTo[3]]));

	        r = r < 0 ? 0 : r > 255 ? 255 : r;
	        g = g < 0 ? 0 : g > 255 ? 255 : g;
	        b = b < 0 ? 0 : b > 255 ? 255 : b;
	        a = a < 0 ? 0 : a > 255 ? 255 : a;
	        return [r,g,b,a];
		}
	} catch (err){
		console.log(colors,marker);
	}
	}

	function mapColorCycle(fraction,stops,colors,cycleFraction){
		let output;
		let scaledStops = [];
		let cycledColors = colors;
		cycledColors.unshift(cycledColors.pop());
		if (fraction > 1 - cycleFraction) {
			output = mapColorCycle((fraction + cycleFraction - 1) / cycleFraction,stops,cycledColors,cycleFraction * cycleFraction);
		} else {
			output = mapColor(fraction / (1 - cycleFraction),stops,colors);
		}
		return output;
	}

	function xyToZ(xy,bias,scale){
	    let x1 = (xy.x - bias.x) / scale;
	    let y1 = (-xy.y - bias.y) / scale;
	    return {x: x1, y: y1};
	}
	function isIn(xy,maxIterations){
	    let z = {x: 0,y: 0};
	    let probe = xyToZ(xy,event.data.bias,event.data.scale);
	    let final = false;
	    let value = 0;
	    let iterations = 0;
	    for (let i = 0; i < maxIterations; i++){
	    	
	    	let zSquare = {x: z.x * z.x - z.y * z.y, y: 2 * z.x * z.y};		//Mandelbrot
	        z.x = probe.x + zSquare.x;
	        z.y = probe.y + zSquare.y;
	        value = (z.x * z.x + z.y * z.y);
			/*
	        let tempX = z.x * z.x - z.y * z.y - probe.x;						//Burning ship
	        let tempY = 2 * Math.abs(z.x * z.y) - probe.y;
	        z.x = tempX;
	        z.y = tempY;
	        value = (z.x * z.x + z.y * z.y);
			*/
	        if (value <= 16) {
	            iterations ++;
	            final = true;
	        } else {
	            final = false;
	            i = maxIterations;
	        }
	    }
	    return {switch: final, value: value, iterations: iterations, normalized: iterations - (Math.log(Math.log(value))) / Math.log(2.0)};
	}

	function setPixelColor(map,x,y,rgba,scan){
	    map.data[scan.offset++] = rgba[0] || 0;
	    map.data[scan.offset++] = rgba[1] || 0;
	    map.data[scan.offset++] = rgba[2] || 0;
	    map.data[scan.offset++] = rgba[3] || 255;
	}

	function render(pixels){
		//console.time('render');
		let scan = {offset:0};
		for (let y = 0; y < pixels.height; y++){
			//postMessage({message: Math.round(100 * x / pixels.width) + '%', type: 1});
	        for (let x = 0; x < pixels.width; x++){     
	            let result = isIn({x: x + event.data.origin.x, y: y + event.data.origin.y},event.data.maxIterations);
	            let fraction = result.normalized / event.data.maxIterations;
	            if (result.switch){
	            	if (event.data.palette == 5){
	            		setPixelColor(pixels,x,y,[0,0,0,255],scan);
	            	} else {
	            		scan.offset += 4;
	            	}
	            } else {
	            	switch(event.data.palette){
	            	case 1: 
	            	setPixelColor(pixels,x,y,[0,0,0,255],scan)
	            	break; // Monochrome
	            	case 2: 
	            	setPixelColor(pixels,x,y,mapColorCycle(fraction,[0,1],[[0,0,0,255],[255,255,255,255]],.9),scan) 
	            	break; //BW Cycle
	            	case 3: 
	            	setPixelColor(pixels,x,y,mapColorCycle(fraction,[0,.2,.4,.6,.8,1],[[89,14,34,255],[12,3,68,255],[52,137,218,255],[255,255,255,255],[255,210,47,255],[174,67,13,255]],.8),scan) 
	            	break; //Wikipedia
	            	case 4: 
	            	setPixelColor(pixels,x,y,mapColorCycle(fraction,[0,.15,.3,.48,.62,.7,.85,1],[[58,15,110,255],[140,40,129,255],[221,73,104,255],[253,158,108,255],[251,251,190,255],[253,158,108,255],[221,73,104,255],[140,40,129,255]],.8),scan) 
	            	break; // Inferno cycle
	            	case 5: 
	            	setPixelColor(pixels,x,y,mapColorCycle(fraction,[0,.1,.4,.6,1],[[255,255,255,255],[252,237,177,255],[154,75,89,255],[32,42,66,255],[0,0,0,255]],.6),scan) 
	            	break; //Inverse cycle
	            	case 6: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,.1,.4,.6,1],[[255,255,255,255],[252,237,177,255],[154,75,89,255],[32,42,66,255],[0,0,0,255]]),scan) 
	            	break; //Inverse
	            	case 7: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,.1,.3,.5,1],[[44,44,46,255],[103,48,43,255],[199,75,51,255],[249,157,80,255],[247,246,163,255]]),scan) 
	            	break; //Blackbody
	            	case 8: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,.3,.6,.8,1],[[0,0,0,255],[24,40,85,255],[121,61,143,255],[255,228,133,255],[255,255,255,255]]),scan) 
	            	break; //Royal
	            	case 9: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,.2,.4,.6,.8,1],[[0,0,0,255],[58,15,110,255],[140,40,129,255],[221,73,104,255],[253,158,108,255],[251,251,190,255]]),scan) 
	            	break; // Inferno
	            	case 10: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,.2,.3,.4,.5,1],[[0,0,0,255],[128,0,255,255],[0,0,255,255],[0,255,0,255],[255,0,0,255],[251,251,190,255]]),scan) 
	            	break; //Popeye
	            	case 11: 
	            	setPixelColor(pixels,x,y,mapColor(fraction,[0,1],[[0,0,0,255],[255,255,255,255]]),scan) 
	            	break; //BW
	            	case 12: 
	            	setPixelColor(pixels,x,y,mapColorCycle(fraction,[0,.25,.5,.75,1],[[4,3,40,255],[24,40,85,255],[121,61,143,255],[255,223,112,255],[159,53,78,255]],.9),scan) 
	            	break; //Royal cycle
	            	default: 
	            	setPixelColor(pixels,x,y,[0,0,0,255],scan)
	            	break;
	            	}
	            }
	        }
    	}
    //console.timeEnd('render');
    postMessage({map: pixels, type: 2, origin: {x: event.data.origin.x, y: event.data.origin.y}});
	}
}