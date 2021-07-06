function OpenSimplex2S(seed){

	class OS2S {

			//Javascript implementation from https://github.com/KdotJPG
		
			constructor(seed){

				this.PSIZE = 2048
				this.PMASK = 2047

				this.N2 = 0.05481866495625118
				this.N3 = 0.2781926117527186
				this.grad2XBeforeY = []
				this.GRADIENTS_2D = []
				let grad2 = [
					{dx: 0.130526192220052, dy: 0.99144486137381},
					{dx: 0.38268343236509, dy: 0.923879532511287},
					{dx: 0.608761429008721, dy: 0.793353340291235},
					{dx: 0.793353340291235, dy: 0.608761429008721},
					{dx: 0.923879532511287, dy: 0.38268343236509},
					{dx: 0.99144486137381, dy: 0.130526192220051},
					{dx: 0.99144486137381, dy:-0.130526192220051},
					{dx: 0.923879532511287, dy:-0.38268343236509},
					{dx: 0.793353340291235, dy:-0.60876142900872},
					{dx: 0.608761429008721, dy:-0.793353340291235},
					{dx: 0.38268343236509, dy:-0.923879532511287},
					{dx: 0.130526192220052, dy:-0.99144486137381},
					{dx:-0.130526192220052, dy:-0.99144486137381},
					{dx:-0.38268343236509, dy:-0.923879532511287},
					{dx:-0.608761429008721, dy:-0.793353340291235},
					{dx:-0.793353340291235, dy:-0.608761429008721},
					{dx:-0.923879532511287, dy:-0.38268343236509},
					{dx:-0.99144486137381, dy:-0.130526192220052},
					{dx:-0.99144486137381, dy: 0.130526192220051},
					{dx:-0.923879532511287, dy: 0.38268343236509},
					{dx:-0.793353340291235, dy: 0.608761429008721},
					{dx:-0.608761429008721, dy: 0.793353340291235},
					{dx:-0.38268343236509, dy: 0.923879532511287},
					{dx:-0.130526192220052, dy: 0.99144486137381}
				]
				for (let i = 0; i < grad2.length; i++) {
					grad2[i].dx /= this.N2
					grad2[i].dy /= this.N2
				}
				for (let i = 0; i < this.PSIZE; i++) {
					this.GRADIENTS_2D[i] = grad2[i % grad2.length]
				}

				this.GRADIENTS_3D = []
				let grad3 = [
					{dx: -2.22474487139, dy:-2.22474487139, dz:-1.0},
					{dx: -2.22474487139, dy:-2.22474487139, dz: 1.0},
					{dx: -3.0862664687972017, dy:-1.1721513422464978, dz: 0.0},
					{dx: -1.1721513422464978, dy:-3.0862664687972017, dz: 0.0},
					{dx: -2.22474487139, dy:-1.0, dz:-2.22474487139},
					{dx: -2.22474487139, dy: 1.0, dz:-2.22474487139},
					{dx: -1.1721513422464978, dy: 0.0, dz:-3.0862664687972017},
					{dx: -3.0862664687972017, dy: 0.0, dz:-1.1721513422464978},
					{dx: -2.22474487139, dy:-1.0, dz: 2.22474487139},
					{dx: -2.22474487139, dy: 1.0, dz: 2.22474487139},
					{dx: -3.0862664687972017, dy: 0.0, dz: 1.1721513422464978},
					{dx: -1.1721513422464978, dy: 0.0, dz: 3.0862664687972017},
					{dx: -2.22474487139, dy: 2.22474487139, dz:-1.0},
					{dx: -2.22474487139, dy: 2.22474487139, dz: 1.0},
					{dx: -1.1721513422464978, dy: 3.0862664687972017, dz: 0.0},
					{dx: -3.0862664687972017, dy: 1.1721513422464978, dz: 0.0},
					{dx: -1.0, dy:-2.22474487139, dz:-2.22474487139},
					{dx:  1.0, dy:-2.22474487139, dz:-2.22474487139},
					{dx:  0.0, dy:-3.0862664687972017, dz:-1.1721513422464978},
					{dx:  0.0, dy:-1.1721513422464978, dz:-3.0862664687972017},
					{dx: -1.0, dy:-2.22474487139, dz: 2.22474487139},
					{dx:  1.0, dy:-2.22474487139, dz: 2.22474487139},
					{dx:  0.0, dy:-1.1721513422464978, dz: 3.0862664687972017},
					{dx:  0.0, dy:-3.0862664687972017, dz: 1.1721513422464978},
					{dx: -1.0, dy: 2.22474487139, dz:-2.22474487139},
					{dx:  1.0, dy: 2.22474487139, dz:-2.22474487139},
					{dx:  0.0, dy: 1.1721513422464978, dz:-3.0862664687972017},
					{dx:  0.0, dy: 3.0862664687972017, dz:-1.1721513422464978},
					{dx: -1.0, dy: 2.22474487139, dz: 2.22474487139},
					{dx:  1.0, dy: 2.22474487139, dz: 2.22474487139},
					{dx:  0.0, dy: 3.0862664687972017, dz: 1.1721513422464978},
					{dx:  0.0, dy: 1.1721513422464978, dz: 3.0862664687972017},
					{dx:  2.22474487139, dy:-2.22474487139, dz:-1.0},
					{dx:  2.22474487139, dy:-2.22474487139, dz: 1.0},
					{dx:  1.1721513422464978, dy:-3.0862664687972017, dz: 0.0},
					{dx:  3.0862664687972017, dy:-1.1721513422464978, dz: 0.0},
					{dx:  2.22474487139, dy:-1.0, dz:-2.22474487139},
					{dx:  2.22474487139, dy: 1.0, dz:-2.22474487139},
					{dx:  3.0862664687972017, dy: 0.0, dz:-1.1721513422464978},
					{dx:  1.1721513422464978, dy: 0.0, dz:-3.0862664687972017},
					{dx:  2.22474487139, dy:-1.0, dz: 2.22474487139},
					{dx:  2.22474487139, dy: 1.0, dz: 2.22474487139},
					{dx:  1.1721513422464978, dy: 0.0, dz: 3.0862664687972017},
					{dx:  3.0862664687972017, dy: 0.0, dz: 1.1721513422464978},
					{dx:  2.22474487139, dy: 2.22474487139, dz:-1.0},
					{dx:  2.22474487139, dy: 2.22474487139, dz: 1.0},
					{dx:  3.0862664687972017, dy: 1.1721513422464978, dz: 0.0},
					{dx:  1.1721513422464978, dy: 3.0862664687972017, dz: 0.0}
				]
				for (let i = 0; i < grad3.length; i++) {
					grad3[i].dx /= this.N3
					grad3[i].dy /= this.N3
					grad3[i].dz /= this.N3
				}
				for (let i = 0; i < this.PSIZE; i++) {
					this.GRADIENTS_3D[i] = grad3[i % grad3.length];
				}

				this.LOOKUP_2D = []
				this.LOOKUP_3D = []
				for (let i = 0; i < 8; i++) {
					let i1, j1, i2, j2;
					if ((i & 1) == 0) {
						if ((i & 2) == 0) { i1 = -1; j1 = 0; } else { i1 = 1; j1 = 0; }
						if ((i & 4) == 0) { i2 = 0; j2 = -1; } else { i2 = 0; j2 = 1; }
					} else {
						if ((i & 2) != 0) { i1 = 2; j1 = 1; } else { i1 = 0; j1 = 1; }
						if ((i & 4) != 0) { i2 = 1; j2 = 2; } else { i2 = 1; j2 = 0; }
					}
					this.LOOKUP_2D[i * 4 + 0] = new LatticePoint2D(0, 0)
					this.LOOKUP_2D[i * 4 + 1] = new LatticePoint2D(1, 1)
					this.LOOKUP_2D[i * 4 + 2] = new LatticePoint2D(i1, j1)
					this.LOOKUP_2D[i * 4 + 3] = new LatticePoint2D(i2, j2)
				}

				for (let i = 0; i < 8; i++) {
					let i1 = (i >> 0) & 1
					let j1 = (i >> 1) & 1
					let k1 = (i >> 2) & 1
					let i2 = i1 ^ 1
					let j2 = j1 ^ 1
					let k2 = k1 ^ 1
					
					// The two points within this octant, one from each of the two cubic half-lattices.
					let c0 = new LatticePoint3D(i1, j1, k1, 0)
					let c1 = new LatticePoint3D(i1 + i2, j1 + j2, k1 + k2, 1)
					
					// (1, 0, 0) vs (0, 1, 1) away from octant.
					let c2 = new LatticePoint3D(i1 ^ 1, j1, k1, 0)
					let c3 = new LatticePoint3D(i1, j1 ^ 1, k1 ^ 1, 0)
					
					// (1, 0, 0) vs (0, 1, 1) away from octant, on second half-lattice.
					let c4 = new LatticePoint3D(i1 + (i2 ^ 1), j1 + j2, k1 + k2, 1)
					let c5 = new LatticePoint3D(i1 + i2, j1 + (j2 ^ 1), k1 + (k2 ^ 1), 1)
					
					// (0, 1, 0) vs (1, 0, 1) away from octant.
					let c6 = new LatticePoint3D(i1, j1 ^ 1, k1, 0)
					let c7 = new LatticePoint3D(i1 ^ 1, j1, k1 ^ 1, 0)
					
					// (0, 1, 0) vs (1, 0, 1) away from octant, on second half-lattice.
					let c8 = new LatticePoint3D(i1 + i2, j1 + (j2 ^ 1), k1 + k2, 1)
					let c9 = new LatticePoint3D(i1 + (i2 ^ 1), j1 + j2, k1 + (k2 ^ 1), 1)
					
					// (0, 0, 1) vs (1, 1, 0) away from octant.
					let cA = new LatticePoint3D(i1, j1, k1 ^ 1, 0)
					let cB = new LatticePoint3D(i1 ^ 1, j1 ^ 1, k1, 0)
					
					// (0, 0, 1) vs (1, 1, 0) away from octant, on second half-lattice.
					let cC = new LatticePoint3D(i1 + i2, j1 + j2, k1 + (k2 ^ 1), 1)
					let cD = new LatticePoint3D(i1 + (i2 ^ 1), j1 + (j2 ^ 1), k1 + k2, 1)
					
					// First two points are guaranteed.
					c0.nextOnFailure = c0.nextOnSuccess = c1;
					c1.nextOnFailure = c1.nextOnSuccess = c2;
					
					// If c2 is in range, then we know c3 and c4 are not.
					c2.nextOnFailure = c3;
					c2.nextOnSuccess = c5;
					c3.nextOnFailure = c4;
					c3.nextOnSuccess = c4;
					
					// If c4 is in range, then we know c5 is not.
					c4.nextOnFailure = c5;
					c4.nextOnSuccess = c6;
					c5.nextOnFailure = c5.nextOnSuccess = c6;
					
					// If c6 is in range, then we know c7 and c8 are not.
					c6.nextOnFailure = c7;
					c6.nextOnSuccess = c9;
					c7.nextOnFailure = c8;
					c7.nextOnSuccess = c8;
					
					// If c8 is in range, then we know c9 is not.
					c8.nextOnFailure = c9;
					c8.nextOnSuccess = cA;
					c9.nextOnFailure = c9.nextOnSuccess = cA;
					
					// If cA is in range, then we know cB and cC are not.
					cA.nextOnFailure = cB;
					cA.nextOnSuccess = cD;
					cB.nextOnFailure = cC;
					cB.nextOnSuccess = cC;
					
					// If cC is in range, then we know cD is not.
					cC.nextOnFailure = cD;
					cC.nextOnSuccess = null;
					cD.nextOnFailure = cD.nextOnSuccess = null;
					
					this.LOOKUP_3D[i] = c0;
					
				}

				this.perm = new Int16Array(this.PSIZE)
				this.permGrad2 = new Array(this.PSIZE)
				this.permGrad3 = new Array(this.PSIZE)
				let source = new Int16Array(this.PSIZE)
				let cseed
				for (let i = 0; i < this.PSIZE; i++) { source[i] = i }
				for (let i = this.PSIZE - 1; i >= 0; i--) {
					cseed = seed * 6364136223846793005 + 1442695040888963407
					let r = (cseed + 31) % (i + 1)
					if (r < 0) r += (i + 1);
					this.perm[i] = source[r]
					this.permGrad2[i] = this.GRADIENTS_2D[this.perm[i]]
					this.permGrad3[i] = this.GRADIENTS_3D[this.perm[i]]
					source[r] = source[i]
				}

			}
			
			noise2(x, y) {
				
				const s = 0.366025403784439 * (x + y)
				const xs = x + s
				const ys = y + s
				
				return this.noise2_Base(xs, ys);
			}
			
			noise2_XBeforeY(x, y) {
				
				// Skew transform and rotation baked into one.
				const xx = x * 0.7071067811865476
				const yy = y * 1.224744871380249
				
				return this.noise2_Base(yy + xx, yy - xx);
			}
			
			noise2_Base(xs, ys) {
				let value = 0
				
				// Get base points and offsets
				let xsb = Math.floor(xs) 
				let ysb = Math.floor(ys)
				let xsi = xs - xsb
				let ysi = ys - ysb
				
				// Index to point list
				let a = xsi + ysi
				let index = a << 2 | (xsi - ysi / 2 + 1 - a / 2.0) << 3 | (ysi - xsi / 2 + 1 - a / 2.0) << 4
				
				let ssi = (xsi + ysi) * -0.211324865405187
				let xi = xsi + ssi
				let yi = ysi + ssi

				// Point contributions
				for (let i = 0; i < 4; i++) {
					let c = this.LOOKUP_2D[index + i];

					let dx = xi + c.dx
					let dy = yi + c.dy
					let attn = 2 / 3 - dx ** 2 - dy ** 2
					if (attn <= 0) continue;

					let pxm = (xsb + c.xsv) & this.PMASK
					let pym = (ysb + c.ysv) & this.PMASK
					let grad = this.permGrad2[this.perm[pxm] ^ pym]
					let extrapolation = grad.dx * dx + grad.dy * dy
					
					attn *= attn
					value += attn * attn * extrapolation
				}
				
				return value
			}
			
			noise3_Classic(x, y, z) {
				
				let r = (2.0 / 3.0) * (x + y + z)
				let xr = r - x
				let yr = r - y
				let zr = r - z
				
				return this.noise3_BCC(xr, yr, zr);
			}
			
			noise3_XYBeforeZ(x, y, z) {
				
				let xy = x + y
				let s2 = xy * -0.211324865405187
				let zz = z * 0.577350269189626
				let xr = x + s2 - zz
				let yr = y + s2 - zz
				let zr = xy * 0.577350269189626 + zz
				
				return this.noise3_BCC(xr, yr, zr)
			}
			
			noise3_XZBeforeY(x, y, z) {
				
				let xz = x + z
				let s2 = xz * -0.211324865405187
				let yy = y * 0.577350269189626
				let xr = x + s2 - yy
				let zr = z + s2 - yy
				let yr = xz * 0.577350269189626 + yy
				
				return this.noise3_BCC(xr, yr, zr)
			}
			
			noise3_BCC(xr, yr, zr) {
				
				// Get base and offsets inside cube of first lattice.
				let xrb = Math.floor(xr)
				let yrb = Math.floor(yr)
				let zrb = Math.floor(zr)
				let xri = xr - xrb
				let yri = yr - yrb
				let zri = zr - zrb
				
				// Identify which octant of the cube we're in. This determines which cell
				// in the other cubic lattice we're in, and also narrows down one point on each.
				let xht = xri + 0.5
				let yht = yri + 0.5
				let zht = zri + 0.5
				let index = (xht << 0) | (yht << 1) | (zht << 2)
				
				// Point contributions
				let value = 0;
				let c = this.LOOKUP_3D[index]
				while (c != null) {
					let dxr = xri + c.dxr
					let dyr = yri + c.dyr
					let dzr = zri + c.dzr
					let attn = 0.75 - dxr * dxr - dyr * dyr - dzr * dzr
					if (attn < 0) {
						c = c.nextOnFailure
					} else {
						let pxm = (xrb + c.xrv) & this.PMASK
						let pym = (yrb + c.yrv) & this.PMASK
						let pzm = (zrb + c.zrv) & this.PMASK
						let grad = this.permGrad3[this.perm[this.perm[pxm] ^ pym] ^ pzm]
						let extrapolation = grad.dx * dxr + grad.dy * dyr + grad.dz * dzr
						
						attn *= attn;
						value += attn * attn * extrapolation
						c = c.nextOnSuccess
					}
				}
				return value
			}

		}

		class LatticePoint2D {

			constructor(xsv, ysv){
				this.xsv = xsv
				this.ysv = ysv
				const ssv = (xsv + ysv) * -0.211324865405187
				this.dx = -xsv - ssv
				this.dy = -ysv - ssv
				
			}

		}

		class LatticePoint3D {

			constructor(xrv, yrv, zrv, lattice) {
				this.dxr = -xrv + lattice * 0.5
				this.dyr = -yrv + lattice * 0.5
				this.dzr = -zrv + lattice * 0.5

				this.xrv = xrv + lattice * 1024
				this.yrv = yrv + lattice * 1024
				this.zrv = zrv + lattice * 1024
			}

		}

	return new OS2S(seed)

}