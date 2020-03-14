var vMax =0,
	vMin = 1;

function perlin2d(x,y,scale) {
				var result 		= 0,
					pers 		= .6,
					octaves 	= 6,
					max			= 0,
					scale 		= scale ? scale : 1;

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
				var corners = (getRn(x-1,y-1,core.seed) + getRn(x+1,y-1,core.seed) + getRn(x-1,y+1,core.seed) + getRn(x+1,y+1,core.seed))/16;
				var sides = (getRn(x-1,y,core.seed) + getRn(x,y-1,core.seed) + getRn(x+1,y,core.seed) + getRn(x,y+1,core.seed))/8;
				var center = getRn(x,y,core.seed)/4;
				return corners + sides + center;
				//return getRn(x,y);
			}
function getRn(x,y,seed)	{
				if (seed == undefined) seed = 0;		 
				n = x + seed + (y - seed)*57;
			    x = Math.pow((n<<13),n);
			    return ( 2.0 - ( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0)*.5;
			    //return mix(2321,x,y);
    		}
function interCosine(a,b,x){
				a = a ? a : 0;
				b = b ? b : 0;
				ft = x * Math.PI;
				f = (1 - Math.cos(ft)) * .5;
				return  a*(1-f) + b*f;
			};

function mapNumber(num,from,to,mFrom,mTo){
				//if (num <= from){
				//	return mFrom;
				//} else if (num >= to){
				//	return mTo;
				//} else {
					return mFrom + (mTo - mFrom)*(num - from)/(to - from);
				//}
			};
function mapColor(num,from,to,rs,gs,bs,rf,gf,bf){
		var r = Math.floor(mapNumber(num,from,to,rs,rf));
		var g = Math.floor(mapNumber(num,from,to,gs,gf));
		var b = Math.floor(mapNumber(num,from,to,bs,bf));
		r = r < 0 ? 0 : r > 255 ? 255 : r;
		g = g < 0 ? 0 : g > 255 ? 255 : g;
		b = b < 0 ? 0 : b > 255 ? 255 : b;
		return 'rgba('+r+','+g+','+b+',1)';
};

function findPath(cellA,cellB){
	var cycles = 10000;
	var path = [];
	var open = [];
	var closed = [];
	var current = {node:cellA,parent:false,g:0,h:0,f:0};
	var isInOpen = function(cell){
		var node = false;
		for (o=0;o<open.length;o++){
			if (cell == open[o].node) node = open[o];
		}
		return node;
	};
	var notInClosed = function(cell){
		return !closed.some(function(item){return item.node == cell});
	};
	open.push(current);
	

	while (current.node != cellB && cycles > 0){
		current = open.pop();
		closed.push(current);
		for (nv = -1; nv <= 1;nv++){
			for (nh = -1;nh <= 1;nh++){
				var cellCheck = findCell(current.node.ax + nh * core.cellSize, current.node.ay + nv * core.cellSize);
				if (cellCheck.walkMult){
					var g = (nv == 0 || nh == 0) ? 10 / (current.node.walkMult*current.node.walkMult) : 14 / (current.node.walkMult*current.node.walkMult);
					//var h = Math.abs(cellB.ax - cellCheck.ax) + Math.abs(cellB.ay - cellCheck.ay);
					var h = Math.sqrt(Math.pow(cellB.ax - cellCheck.ax,2) + Math.pow(cellB.ay - cellCheck.ay,2));
					var inOpen = isInOpen(cellCheck);
					if (inOpen){
						if (inOpen.g > current.g + g){
							inOpen.parent = current;
							inOpen.g = current.g + g;
							inOpen.f = current.g + g + h;
						}
					} else if (notInClosed(cellCheck)){
						open.push({node: cellCheck, parent: current, g: current.g + g, h: h, f: current.g + g + h});
							//var redShade = mapColor(current.g + g + h,0,500,0,0,0,255,0,0);
							//console.log(current.g + g + h);
							//cellCheck.color = 'rgb(255,0,0)';
							//cellCheck.chunk.redrawCellsImage();
					}
				}
			}
		}
		open.sort(function(a,b){return b.f - a.f});
		cycles --;
	};
	while (current.parent){
		path.push(current.node);
		current = current.parent;
	};
	return path;

	//for (t=0;t<path.length;t++){
		//path[t].node.color = 'rgb(0,0,255)';
		//path[t].node.chunk.redrawCellsImage();
	//}

}

console.log('service.js loaded');