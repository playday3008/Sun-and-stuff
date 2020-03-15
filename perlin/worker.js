onmessage = function(event){

	var chunk = event.data;

	chunk.pixels = [];
	for (p=0;p<chunk.chunkSize*chunk.chunkSize;p++){
		var tempY = Math.floor(p/chunk.chunkSize);
		var tempX = p - tempY*chunk.chunkSize;
		tempX += chunk.position.x;
		tempY += chunk.position.y;
		var tempV = perlin2d(tempX/chunk.noiseScale,tempY/chunk.noiseScale);
		chunk.pixels.push(tempV);
	}
	var pixels = pixelate(chunk.pixels,chunk.pixelSize);
	parsePixels(pixels,chunk.image);
	chunk.ready = true;
	postMessage(chunk);
}

var vMax =0,
	vMin = 1;

function perlin2d(x,y) {
				var result 		= 0,
					pers 		= .6,
					octaves 	= 6,
					max			= 0;

				for (j=0;j<octaves-1;j++){
					var frequency = Math.pow(2,j),
						amplitude = Math.pow(pers,j);
					max += amplitude;
					result = result + interNoise(x*frequency,y*frequency)*amplitude;
				}
				var decrement = .5;
				result -= decrement;
				vMax = result > vMax ? result : vMax;
				vMin = result < vMin ? result : vMin;
				return result;
			}
function interNoise(x,y){
				var startX = Math.floor(x)
				var startY = Math.floor(y)
				var posX = x-startX;
				var posY = y-startY;

				var a = smoothNoise(startX,startY);
				var b = smoothNoise(startX+1,startY);
				var c = smoothNoise(startX,startY+1);
				var d = smoothNoise(startX+1,startY+1);

				var ab = interCosine(a,b,posX);
				var cd = interCosine(c,d,posX);

				return interCosine(ab,cd,posY);
			}
function smoothNoise(x,y){
				var corners = (getRn(x-1,y-1) + getRn(x+1,y-1) + getRn(x-1,y+1) + getRn(x+1,y+1))/16;
				var sides = (getRn(x-1,y) + getRn(x,y-1) + getRn(x+1,y) + getRn(x,y+1))/8;
				var center = getRn(x,y)/4;
				return corners + sides + center;
				//return getRn(x,y);
			}
function getRn(x,y)	{		 
				n = x + y*57;
			    x = Math.pow((n<<13),n);
			    return ( 2.0 - ( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0)*.5; 
    		}
function interCosine(a,b,x){
				a = a ? a : 0;
				b = b ? b : 0;
				ft = x * Math.PI;
				f = (1 - Math.cos(ft)) * .5;
				return  a*(1-f) + b*f;
			}
function pixelate(input,mult){
				var rowsize = Math.sqrt(input.length),
					output = [];

				for(i=0;i<input.length;i+=rowsize){
					for (k=0;k<mult;k++){
						for (j=0;j<rowsize;j++){
							for (l=0;l<mult;l++){
								output.push(input[i+j]);
							}
						}
					}
				}
				return output;
			}
function parsePixels2(pixels,imgData){
				var size = Math.sqrt(pixels.length);
				for(si=0,sy=0;si<size;si++){
					for(sj=0,sx=0;sj<size;sj++){
						var rgb = paintColor(pixels[si*size+sj])
						imgData.data[sy+sx] = rgb[0];
						imgData.data[sy+sx+1] = rgb[1];
						imgData.data[sy+sx+2] = rgb[2];
						imgData.data[sy+sx+3] = 255;
						sx += 4;
					}
					sy += size*4;
				}
			}

function parsePixels(pixels,img){
	for (s=0; s<pixels.length;s++){
		var rgb = paintColor(pixels[s]);
		img.data[s*4] = rgb[0];
		img.data[s*4+1] = rgb[1];
		img.data[s*4+2] = rgb[2];
		img.data[s*4+3] = 255;
	}
}

function paintColor(cValue){
				var colors = [];
				var stops = [.67,.7,.85];
				if (cValue < stops[0]){
					colors.push(0);
					colors.push((cValue-.2)*255);
					colors.push(cValue*255);
				} else if (cValue < stops[1]){
					colors.push(cValue*255 + 60);
					colors.push(cValue*255 + 60);
					colors.push((cValue-.3)*255);
				} else if (cValue < stops[2]){
					colors.push((cValue-.2)*180);
					colors.push(cValue*200);
					colors.push(0);
				} else {
					colors.push(cValue*255);
					colors.push(cValue*255);
					colors.push(cValue*255);
				}
				return colors;
			}