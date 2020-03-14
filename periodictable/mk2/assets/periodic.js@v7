class Chemistry {

	constructor(canvas, data, words, menu, controls){

		this.data = data;
		this.words = words;
		this.language = localStorage.getItem('pt_language') || this.getLanguage();
		this.isMobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false;
		this.touches = {};
		this.menu = menu;
		this.controls = controls;
		this.buffer = [];

		this.ratio = window.devicePixelRatio;
		this.canvas = canvas;
		this.canvas.width = this.canvas.clientWidth * this.ratio;
		this.canvas.height = this.canvas.clientHeight * this.ratio;
		this.ctx = this.canvas.getContext('2d');

		this.mouse = {
			x: 0,
			y: 0
		}
		this.camera = {
			minZoom: .03,
			maxZoom: 10,
			speed: 6,
			p: {x: 0, y: 0, s: 0},
			v: {x: 0, y: 0, s: 0},
			a: {x: 0, y: 0, s: 0}
		};
		this.transformation;
		this.cellSize = {
			x: 100,
			y: 140
		}
		this.zoomSteps = {
			huge: {
				from: .2,
				to: .3
			},
			big: {
				from: .3,
				to: .4
			},
			small: {
				from: .4,
				to: .5
			},
			micro: {
				from: .6,
				to: .8
			}
		}
		this.menuSetup = {
			r: 200,
			fixed: false,
			out: true
		}

		this.codex = {
			colors: {
				disabled: 'rgb(232,231,230)',
				stable: 'rgb(12,0,24)',
				groups: [
					'#fbf695',
					'#916af7',
					'#464cde',
					'#3682dc',
					'#0d6cb9',
					'#efeee4',
					'#047e90',
					'#5dbb63',
					'#c5f563',
					'#fb6a36',
					'#3a3335'
				],
				// groups: [
				// 	'#FFE711',
				// 	'#A635FF',
				// 	'#5302FF',
				// 	'#311DAA',
				// 	'#171F63',
				// 	'#D3CDBF',
				// 	'#02B3FF',
				// 	'#00FF94',
				// 	'#6FDE5D',
				// 	'#FF3B20',
				// 	'#000'
				// ],
				electrons: [
					'#ffd054',
					'#f54e2c',
					'#8c35f1',
					'#13ef91'
				],
				elneg: light('inferno'),
				melt: [light('ice'),light('fire')],
				halflife: light('depth'),
				discovery: light('bloom'),
				composition: light('density'),
				textBlack: '#000',
				textWhite: '#fff',
				decay: {
					'A': 'rgb(255,223,160)',
					'B-': 'rgb(87,143,212)',
					'2B-': 'rgb(62,118,187)',
					'2B+': '#c3714d',
					'B+': 'rgb(204,105,62)',
					'EC': 'rgb(250,95,53)',
					'SF': 'rgb(255,253,244)',
					'IT': 'rgb(150,191,242)',
					'P': 'rgb(255,99,57)',
					'N': 'rgb(126,213,253)',
					'EC+B+': 'rgb(253,147,95)',
					'B-2N': '#6469d0',
					'B-N': 'rgb(67,97,134)',
					'ECP': 'rgb(222,78,50)',
					'2P': 'rgb(229,38,56)',
					'2N': '#a6dbf5',
					'ECSF': '#f1ceb7',
					'B+P': 'rgb(255,194,177)',
					'ECP+EC2P': 'rgb(255,132,161)',
					'2EC': 'rgb(240,85,43)'
				}
			},
			magicNumbers: {'2':true,'8':true,'20':true,'28':true,'50':true,'82':true,'126':true},
			fonts: {
				halflife: {
					big: '600 20px Fact',
					small: '400 14px Fact',
					inf: '600 32px Fact'
				},
				groups: {
					big: '600 56px Fact',
					small: '400 14px Fact'
				},
				clean: {
					big: '600 56px Fact',
					medium: '600 24px Fact',
					small: '400 14px Fact'
				},
				elneg: {
					big: '600 32px Fact',
					small: '400 14px Fact',
				},
				ionization: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
				affinity: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
				discovery: {
					big: '600 24px Fact',
					small: '400 14px Fact',
				},
				radius: {
					big: '600 32px Fact',
					small: '400 14px Fact',
				},
				electrons: {
					huge: '600 40px Fact',
					big: '600 24px Fact',
					medium: '600 17px Fact',
					subtle: '600 12px Fact',
					small: '400 14px Fact'
				},
				decay: {
					big: '600 32px Fact, TT Norms Pro',
					small: '400 14px Fact',
					micro: '400 4px Fact'
				},
				sAbu: {
					big: '600 22px Fact',
					small: '400 14px Fact'
				},
				cAbu: {
					big: '600 22px Fact',
					small: '400 14px Fact'
				},
				melt: {
					big: '600 24px Fact',
					small: '400 14px Fact',
					micro: '400 8px Fact'
				},
				boil: {
					big: '600 24px Fact',
					small: '400 14px Fact',
					micro: '400 8px Fact'
				},
				oxy: {
					big: '600 14px Fact',
					small: '400 14px Fact',
					micro: '400 8px Fact'
				},
				binding: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
				excess: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
				psep: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
				nsep: {
					big: '600 28px Fact',
					small: '400 14px Fact'
				},
			},
			dataModes: {
				groups: {
					switchMode: 0,
					hotkey: '1',
					hotkeyCode: '1'
				},
				elneg: {
					switchMode: 0,
					hotkey: '2',
					hotkeyCode: '1'
				},
				ionization: {
					switchMode: 0,
					hotkey: 'u',
					hotkeyCode: '1'
				},
				affinity: {
					switchMode: 0,
					hotkey: 'i',
					hotkeyCode: '1'
				},
				discovery: {
					switchMode: 2,
					hotkey: '3',
					hotkeyCode: '1'
				},
				halflife: {
					switchMode: 2,
					hotkey: '4',
					hotkeyCode: '1'
				},
				electrons: {
					switchMode: 0,
					hotkey: '5',
					hotkeyCode: '1'
				},
				radius: {
					switchMode: 0,
					hotkey: '6',
					hotkeyCode: '1'
				},
				decay: {
					switchMode: 1,
					hotkey: '7',
					hotkeyCode: '1'
				},
				sAbu: {
					switchMode: 2,
					hotkey: '8',
					hotkeyCode: '1'
				},
				cAbu: {
					switchMode: 2,
					hotkey: '9',
					hotkeyCode: '1'
				},
				clean: {
					switchMode: 2,
					hotkey: '0',
					hotkeyCode: '1'
				},
				melt: {
					switchMode: 0,
					hotkey: 'q',
					hotkeyCode: '1'
				},
				boil: {
					switchMode: 0,
					hotkey: 'w',
					hotkeyCode: '1'
				},
				oxy: {
					switchMode: 0,
					hotkey: 'e',
					hotkeyCode: '1'
				},
				binding: {
					switchMode: 1,
					hotkey: 'r',
					hotkeyCode: '1'
				},
				psep: {
					switchMode: 1,
					hotkey: 't',
					hotkeyCode: '1'
				},
				nsep: {
					switchMode: 1,
					hotkey: 'y',
					hotkeyCode: '1'
				}
			},
			cellRenders: {
				groups: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.hugeAlpha * source.prevMix;
						this.drawText('c', this.data[i].sn, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				clean: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.hugeAlpha * source.prevMix;
						this.drawText('c', io ? source.name : this.data[i].sn, io ? this.codex.fonts[this.dataMode].medium : this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				halflife: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.big.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.halflife, io ? this.data[i].isotopes[j].hl === true ? this.codex.fonts[this.dataMode].big : this.codex.fonts[this.dataMode].inf : this.data[i].halflife ? this.codex.fonts[this.dataMode].big : this.codex.fonts[this.dataMode].inf, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				elneg: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.elneg, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				ionization: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.ionization, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				affinity: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.affinity, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				discovery: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.discovery, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				electrons: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.electrons, source.electrons.length < 6 ? this.codex.fonts[this.dataMode].huge : source.electrons.length < 11 ? this.codex.fonts[this.dataMode].big : source.electrons.length < 14 ? this.codex.fonts[this.dataMode].medium : this.codex.fonts[this.dataMode].subtle, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				radius: (i,j,io,source,textColor)=>{
					// this.ctx.save();
					// this.ctx.fillStyle = '#ccf';
					// this.ctx.globalAlpha = .4;
					// this.ctx.globalCompositeOperation = 'overlay';
					// this.ctx.beginPath();
					// let r = source.radius * .14;
					// this.ctx.arc(this.cellSize.x * .9 - r, this.cellSize.y * .1 + r, r, 0 , Math.PI * 2);
					// this.ctx.closePath();
					// this.ctx.fill();
					// this.ctx.restore();

					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.radius, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				decay: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.decay, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
							if (this.camera.p.rs > this.zoomSteps.micro.from && io){
								this.ctx.globalAlpha = this.camera.microPaleAlpha;
								this.ctx.font = this.codex.fonts[this.dataMode].micro;
								this.ctx.fillText(source.decayDetails, 6, this.cellSize.y * .94)
							}
						}
					}
				},
				sAbu: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.sAbu, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				cAbu: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.cAbu, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				melt: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.melt.c, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
							if (this.camera.p.rs > this.zoomSteps.micro.from && !io){
								this.ctx.save();
								this.ctx.globalAlpha = this.camera.microPaleAlpha;
								this.ctx.font = this.codex.fonts[this.dataMode].micro;
								this.ctx.fillText(source.melt.k, 6, this.cellSize.y * .40)
								this.ctx.restore();
							}
						}
					}
				},
				boil: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.boil.c, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
							if (this.camera.p.rs > this.zoomSteps.micro.from && !io){
								this.ctx.save();
								this.ctx.globalAlpha = this.camera.microPaleAlpha;
								this.ctx.font = this.codex.fonts[this.dataMode].micro;
								this.ctx.fillText(source.boil.k, 6, this.cellSize.y * .40);
								this.ctx.restore();
							}
						}
					}
				},
				oxy: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						// this.ctx.globalAlpha = this.camera.bigAlpha;
						this.ctx.font = this.codex.fonts[this.dataMode].big;
						this.ctx.fillStyle = textColor;
						this.ctx.save();
						this.ctx.textAlign = 'right';
						for (let o = -5; o < 10; o++){

								this.ctx.globalAlpha = typeof source.oxy === 'object' && source.oxy[o] ? this.camera.bigAlpha * source.prevMix : this.camera.bigAlpha * .08 * source.prevMix;
								this.ctx.fillText(o, o < 0 ? 60 : o < 5 ? 75 : 90, 8 + 16 * (o < 0 ? -o : o < 5 ? o + 1 : (o - 4)));
						}
						this.ctx.restore();
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				binding: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.binding, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				excess: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.excess, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				psep: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.psep, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				},
				nsep: (i,j,io,source,textColor)=>{
					if (this.camera.p.rs > this.zoomSteps.huge.from){
						this.ctx.globalAlpha = this.camera.bigAlpha * source.prevMix;
						this.drawText('c', source.nsep, this.codex.fonts[this.dataMode].big, textColor);
						if (this.camera.p.rs > this.zoomSteps.small.from){
							this.ctx.globalAlpha = this.camera.smallAlpha;
							this.drawText('l', io ? source.name : this.words.names[i][this.language], this.codex.fonts[this.dataMode].small);
						}
					}
				}
			}
		}
		this.transitions = {};
		this.transitionId = 0;

		this.dataMode = localStorage.getItem('pt_dataMode') || 'groups';
		this.composition = localStorage.getItem('pt_composition') || 'book';
		let ls_cam = localStorage.getItem('pt_camera');
		if (ls_cam === null){
			this.resetCamera(this.composition);
		} else {
			this.camera = JSON.parse(ls_cam);
			this.camera.minZoom = .03;
			this.camera.maxZoom = 10;
		}
		
		this.initBuffer();
		this.generateMenu();

		this.cycle = ()=>{
			requestAnimationFrame(this.cycle.bind(this));
			this.updateTransitions();
			this.updateCamera();
			this.draw();
		}
		this.cycle();

		setInterval(()=>{
			localStorage.setItem('pt_camera', JSON.stringify(this.camera));
			localStorage.setItem('pt_composition', this.composition);
			localStorage.setItem('pt_dataMode', this.dataMode);
			localStorage.setItem('pt_language', this.language);
		}, 1000);

		this.canvas.addEventListener('touchstart', (e)=>{
			if (e.target === this.canvas) e.preventDefault();
			for (let i = 0; i < e.changedTouches.length; i++){
				this.touches[e.changedTouches[i].identifier] = {
					x: e.changedTouches[i].clientX,
					y: e.changedTouches[i].clientY
				}
			}

		});
		this.canvas.addEventListener('touchend', (e)=>{
			if (e.target === this.canvas) e.preventDefault();
			for (let i = 0; i < e.changedTouches.length; i++){
				delete this.touches[e.changedTouches[i].identifier];
			}

		});

		this.canvas.addEventListener('touchmove',(e)=>{
			if (e.target === this.canvas) e.preventDefault();
			if (e.changedTouches.length === 1){
				let id = e.changedTouches[0].identifier;
				if (this.touches[id]){
					this.camera.p.x -= (e.changedTouches[0].clientX - this.touches[id].x) / this.camera.p.s * this.ratio;
					this.camera.p.y -= (e.changedTouches[0].clientY - this.touches[id].y) / this.camera.p.s * this.ratio;
					this.touches[id].x = e.changedTouches[0].clientX;
					this.touches[id].y = e.changedTouches[0].clientY;
				}
			} else if (e.changedTouches.length === 2){
				let ids = [e.changedTouches[0].identifier, e.changedTouches[1].identifier];
				if (this.touches[ids[0]] && this.touches[ids[1]]){
					let d1 = Math.sqrt((this.touches[ids[1]].x - this.touches[ids[0]].x) ** 2 + (this.touches[ids[1]].y - this.touches[ids[0]].y) ** 2);
					let d2 = Math.sqrt((e.changedTouches[1].clientX - e.changedTouches[0].clientX) ** 2 + (e.changedTouches[1].clientY - e.changedTouches[0].clientY) ** 2);
					this.camera.p.s -= (d1-d2) * .004 * this.camera.p.s;

					this.touches[ids[0]].x = e.changedTouches[0].clientX;
					this.touches[ids[0]].y = e.changedTouches[0].clientY;
					this.touches[ids[1]].x = e.changedTouches[1].clientX;
					this.touches[ids[1]].y = e.changedTouches[1].clientY;

				}
			}
		});			

		this.canvas.addEventListener('wheel',(e)=>{
			e.preventDefault();

			this.mouse.x = (e.clientX * this.ratio - this.canvas.width / 2) / this.transformation.s;
			this.mouse.y = (e.clientY * this.ratio - this.canvas.height / 2) / this.transformation.s;

			if (e.ctrlKey){
				this.camera.p.s -= e.deltaY * .01 * this.camera.p.s;
				if (this.camera.p.rs > this.camera.minZoom && this.camera.p.rs < this.camera.maxZoom){
					this.camera.p.x += this.mouse.x * -e.deltaY / 80;
					this.camera.p.y += this.mouse.y * -e.deltaY / 80;
				}

			} else {
				if (e.shiftKey){
					this.camera.p.s -= e.deltaY * .005 * this.camera.p.s;
					if (this.camera.p.rs > this.camera.minZoom && this.camera.p.rs < this.camera.maxZoom){
						this.camera.p.x += this.mouse.x * -e.deltaY / 160;
						this.camera.p.y += this.mouse.y * -e.deltaY / 160;
					}
				}
				this.camera.p.x += e.deltaX / this.camera.p.s;
				this.camera.p.y += e.deltaY / this.camera.p.s;
			}
			
		});
		this.canvas.addEventListener('mousemove',(e)=>{
			if (e.buttons === 1) {
				this.camera.p.x -= e.movementX / this.camera.p.s * this.ratio;
				this.camera.p.y -= e.movementY / this.camera.p.s * this.ratio;
			}
		});

		document.addEventListener('keypress',(e)=>{
			if (e.which === 13){
				this.resetCamera(this.composition, 500);
			}
		})

		document.addEventListener('keydown',(e)=>{

			if (e.which === 68){
				this.camera.a.x = this.camera.speed;
			} else if (e.which === 65){
				this.camera.a.x = -this.camera.speed;
			} else if (e.which === 87){
				this.camera.a.y = -this.camera.speed;
			} else if (e.which === 83){
				this.camera.a.y = this.camera.speed;
			} else if (e.which === 69){
				this.camera.a.s = this.camera.speed / 1e3;
			} else if (e.which === 81){
				this.camera.a.s = -this.camera.speed / 1e3;
			} else if (e.which === 49){
				this.switchDataMode('groups');
			} else if (e.which === 50){
				this.switchDataMode('elneg');
			} else if (e.which === 51){
				this.switchDataMode('discovery');
			} else if (e.which === 52){
				this.switchDataMode('halflife');
			} else if (e.which === 53){
				this.switchDataMode('electrons');
			} else if (e.which === 54) {
				this.switchDataMode('radius');
			} else if (e.which === 55) {
				this.switchDataMode('decay');
			} else if (e.which === 56) {
				this.switchDataMode('sAbu');
			} else if (e.which === 57) {
				this.switchDataMode('cAbu');
			} else if (e.which === 221){
				this.switchComposition('full');
			} else if (e.which === 220){
				this.switchComposition('isotopes');
			} else if (e.which === 219){
				this.switchComposition('book');
			} else if (e.which === 187){
				this.camera.a.s = this.camera.speed / 1e3;
			} else if (e.which === 189){
				this.camera.a.s = -this.camera.speed / 1e3;
			} else if (e.which){
				console.log(e.which);
			}
		});
		document.addEventListener('keyup',(e)=>{
			if (e.which === 68){
				this.camera.a.x = 0;
			} else if (e.which === 65){
				this.camera.a.x = 0;
			} else if (e.which === 87){
				this.camera.a.y = 0;
			} else if (e.which === 83){
				this.camera.a.y = 0;
			} else if (e.which === 69){
				this.camera.a.s = 0;
			} else if (e.which === 81 || e.which === 189 || e.which === 187){
				this.camera.a.s = 0;
			}
		});

	}

	getLanguage(){
		let l = navigator.language;
		if (/ru/gi.test(l)){
			return 'ru';
		} else {
			return 'en';
		}
	}

	generateMenu(){
		this.menu.innerHTML = '';
		this.menuItems = {};
		let h1 = document.createElement('h1');
		h1.innerHTML = this.words.menuHeader[this.language];
		this.menu.appendChild(h1);
		let navigation = document.createElement('div');
		navigation.classList.add('navigation');
		this.menu.appendChild(navigation);

		for (let i in this.codex.dataModes){

			let row = document.createElement('div');
			row.classList.add('dataMode');
			let hotkey = document.createElement('span');
			hotkey.classList.add('hotkey', 'enum');
			hotkey.innerHTML = this.codex.dataModes[i].hotkey;
			row.appendChild(hotkey);
			let modename = document.createElement('span');
			modename.classList.add('modeName');
			modename.innerHTML = this.words.modes[i].menu[this.language] || '???';
			row.appendChild(modename);

			let panel = document.createElement('span');
			panel.classList.add('switch');
			let sf = document.createElement('span');
			sf.classList.add('s_f');
			sf.innerHTML = 'L';
			let sb = document.createElement('span');
			sb.classList.add('s_b');
			sb.innerHTML = 'S';
			if (this.codex.dataModes[i].switchMode === 1) {
				sf.classList.add('dim');
				sb.classList.add('dim');
			} else {
				sf.addEventListener('click', (e)=>{
					
					e.stopPropagation();
					this.updateMenu('full',i);
				});
				sb.addEventListener('click', (e)=>{
					
					e.stopPropagation();
					this.updateMenu('book',i);
				})
			}
			let si = document.createElement('span');
			si.classList.add('s_iso');
			si.innerHTML = 'Iso';
			if (this.codex.dataModes[i].switchMode === 0) {
				si.classList.add('dim');
			} else {
				si.addEventListener('click', (e)=>{
					
					e.stopPropagation();
					this.updateMenu('isotopes',i);
				})
			}
			panel.appendChild(sf);
			panel.appendChild(sb);
			panel.appendChild(si);
			row.appendChild(panel);
			navigation.appendChild(row);
			row.panel = panel;

			row.addEventListener('click', (e)=>{
				let sm = this.codex.dataModes[i].switchMode;
				let cm = this.composition;
				if (cm === 'isotopes' && sm === 0){
					this.updateMenu('full', i);
				} else if ((cm === 'full' || cm === 'book') && sm === 1){
					this.updateMenu('isotopes', i);
				} else {
					this.updateMenu(false, i);
				}
			});

			this.menuItems[i] = row;

		}

		this.legend = document.createElement('div');
		this.legend.classList.add('legend');
		this.legend.innerHTML = '123';
		this.menu.appendChild(this.legend);

		this.menu.style.opacity = 0;
		this.menu.style.pointerEvents = 'none';

		window.addEventListener('mousemove', (e)=>{
			let x = e.clientX, y = e.clientY;
			let d = Math.sqrt(x*x + y*y);
			this.menuSetup.out = e.target === this.canvas;

			if (this.menuSetup.out && d > this.menuSetup.r * 1.2){
				this.menu.style.opacity = 0;
				this.menu.style.pointerEvents = 'none';
				this.menuSetup.fixed = false;
   			} else if (!this.menuSetup.fixed && d > this.menuSetup.r){
				this.menu.style.pointerEvents = 'auto';
				this.menu.style.opacity = 1 - (d - this.menuSetup.r) / 100;
   			} else if (!this.menuSetup.out){
				this.menuSetup.fixed = true;
				this.menu.style.pointerEvents = 'auto';
				this.menu.style.opacity = 1;
   			}
		});
		this.updateMenu();

		//Zoom and reset
		let keyPlus = document.createElement('div');
		keyPlus.setAttribute('title', 'Key +');
		keyPlus.classList.add('cKey', 'cPlus');
		keyPlus.innerHTML = '+';
		this.controls.appendChild(keyPlus);

		let keyReset = document.createElement('div');
		keyReset.setAttribute('title', 'Enter/Return key');
		keyReset.classList.add('cKey', 'cReset');
		keyReset.innerHTML = '⊙';
		this.controls.appendChild(keyReset);

		let keyMinus = document.createElement('div');
		keyMinus.setAttribute('title', 'Key –');
		keyMinus.classList.add('cKey', 'cMinus');
		keyMinus.innerHTML = '–';
		this.controls.appendChild(keyMinus);

		keyPlus.addEventListener('mousedown', ()=>{
			this.camera.a.s = this.camera.speed / 1e3;
		});
		keyPlus.addEventListener('mouseup', ()=>{
			this.camera.a.s = 0;
		});
		keyMinus.addEventListener('mousedown', ()=>{
			this.camera.a.s = -this.camera.speed / 1.6e3;
		});
		keyMinus.addEventListener('mouseup', ()=>{
			this.camera.a.s = 0;
		});
		keyReset.addEventListener('click',()=>{
			this.resetCamera(this.composition, 300);
		})


	}

	updateMenu(comp, data){
		for (let i in this.menuItems){
			let d = data ? data : this.dataMode;
			if (d === i){
				let c = comp ? comp : this.composition;
				this.menuItems[i].classList.add('chosen');
				this.menuItems[i].panel.children[0].classList.remove('chosen');
				this.menuItems[i].panel.children[1].classList.remove('chosen');
				this.menuItems[i].panel.children[2].classList.remove('chosen');
				this.menuItems[i].panel.children[c === 'full' ? 0 : c === 'book' ? 1 : 2].classList.add('chosen');
			} else {
				this.menuItems[i].classList.remove('chosen');
			}
		}
		if (comp) this.switchComposition(comp);
		if (data) this.switchDataMode(data);
		this.legend.innerHTML = this.words.modes[this.dataMode].legend[this.language];
	}

	engageIsotopes(collapse,t, after){
		let total = 0
		for (let i = 0; i < this.buffer.length; i++){
			total += this.buffer[i].isotopes.length;
			for (let j = 0; j < this.buffer[i].isotopes.length; j++){

				let count = e => {
					total--;
					if (total === 0 && after){
						after();
					}
				};
				this.transition(
					this.buffer[i].isotopes[j].position, 
					'x', 
					this.buffer[i].isotopes[j].position.x, 
					collapse ? this.buffer[i].isotopes[j].positions.trans.x : this.buffer[i].isotopes[j].positions.iso.x, 
					t, 
					this.data[i].isotopes[j].z * 5 + Math.random() * 200,
					()=>{count()}
					);
			}
		}
	}

	engageFullTable(collapse,t,after){

		let total = this.buffer.length;
		for (let i = 0; i < this.buffer.length; i++){
			let count = e => {
				total--;
				if (total === 0 && after){
					after();
				}
			}
			let rand = Math.random() * 40;
			if (collapse){
				let d = (118 - i) * 10;
				this.transition(this.buffer[i].position, 'x', this.buffer[i].position.x, this.buffer[i].positions.trans.x, t + d, rand);
				this.transition(this.buffer[i].position, 'y', this.buffer[i].position.y, this.buffer[i].positions.trans.y, t + d, rand, ()=>{count()});
			} else {
				let d = i * 10;
				this.transition(this.buffer[i].position, 'y', this.buffer[i].position.y, this.composition === 'full' ? this.buffer[i].positions.full.y : this.buffer[i].positions.book.y, t + d, rand);
				this.transition(this.buffer[i].position, 'x', this.buffer[i].position.x, this.composition === 'full' ? this.buffer[i].positions.full.x : this.buffer[i].positions.book.x, t + d, rand, ()=>{count()});
			}
		}

	}

	switchComposition(c){
		if (this.composition !== c){
			if (c === 'full' || c === 'book'){
				if (this.composition === 'isotopes'){
					this.engageIsotopes(true, 600, ()=>{
						this.composition = c;
						this.engageFullTable(false,600);
					});
				} else {
					this.composition = c;
					this.engageFullTable(false,600);
				}

			} else if (c === 'isotopes') {

				this.engageFullTable(true, 600, ()=>{
					this.composition = c;
					this.engageIsotopes(false, 600);
				});
			}
		}
	}

	switchDataMode(m){
		if (this.dataMode !== m){
			for (let i = 0; i < this.data.length; i++){
				this.buffer[i].prevColor = this.buffer[i].colors[this.dataMode];
				this.transition(this.buffer[i], 'prevMix', 0, 1, 600, Math.random() * 200);
				if (this.composition === 'isotopes'){
					for (let j = 0; j < this.data[i].isotopes.length; j++){
						this.buffer[i].isotopes[j].prevColor = this.buffer[i].isotopes[j].colors[this.dataMode];
						this.transition(this.buffer[i].isotopes[j], 'prevMix', 0, 1, 600, Math.random() * 200 + j*10);
					}
				}
			}
			this.dataMode = m;
		}
	}

	initBuffer(){

		for (let i = 0; i < this.data.length; i++){
			this.buffer[i] = {};
			let colors = this.getColors(i);
			this.buffer[i].positions = this.getPositions(i);
			this.buffer[i].position = {
				x: this.composition === 'full' ? this.buffer[i].positions.full.x : this.composition === 'book' ? this.buffer[i].positions.book.x : this.buffer[i].positions.trans.x,
				y: this.composition === 'full' ? this.buffer[i].positions.full.y : this.composition === 'book' ? this.buffer[i].positions.book.y : this.buffer[i].positions.trans.y,
			}
			this.buffer[i].prevMix = 1;
			this.buffer[i].colors = colors.fill;
			this.buffer[i].textColors = colors.text;
			this.buffer[i].halflife = this.data[i].halflife ? this.getHumanTime(this.data[i].halflife) : '∞';
			this.buffer[i].isotopes = [];
			this.buffer[i].elneg = this.data[i].elneg ? this.data[i].elneg : '—';
			this.buffer[i].ionization = this.data[i].ioEnergy ? this.data[i].ioEnergy[0] : '?';
			this.buffer[i].affinity = this.data[i].eaffinity ? Math.round(this.data[i].eaffinity*10)/10 : '?';
			this.buffer[i].discovery = this.data[i].discovery;
			this.buffer[i].electrons = this.getElectronsData(i).text;
			this.buffer[i].radius = this.data[i].radius ? this.data[i].radius : '?';
			this.buffer[i].decay = this.buffer[i].binding = this.buffer[i].excess = this.buffer[i].psep = this.buffer[i].nsep = '—';
			this.buffer[i].sAbu = this.data[i].sSAbu ? this.getHumanFraction(this.data[i].sSAbu * 75 / 28000) : '0';
			this.buffer[i].cAbu = this.data[i].cAbu ? this.getHumanFraction(this.data[i].cAbu * 100) : '0';
			this.buffer[i].melt = {};
			this.buffer[i].boil = {};
			this.buffer[i].melt.c = this.data[i].melt ? Math.round(this.data[i].melt - 273.15) + '°' : '?';
			this.buffer[i].boil.c = this.data[i].boil ? Math.round(this.data[i].boil - 273.15) + '°' : '?';
			this.buffer[i].melt.k = this.data[i].melt ? Math.round(this.data[i].melt) + ' K' : '';
			this.buffer[i].boil.k = this.data[i].boil ? Math.round(this.data[i].boil) + ' K' : '';
			this.buffer[i].oxy = {};
			if (this.data[i].oxy.length){
				for (let o = 0; o < this.data[i].oxy.length; o++){
					this.buffer[i].oxy[this.data[i].oxy[o]] = true;
				}
			} else {
				this.buffer[i].oxy = this.data[i].oxy;
			}

			for (let j = 0; j < this.data[i].isotopes.length; j++){

				let u = this.data[i].isotopes[j];
				this.buffer[i].isotopes[j] = {};
				let v = this.buffer[i].isotopes[j];

				v.positions = this.getPositions(i,j);
				v.position = {
					x: this.composition === 'isotopes' ? this.buffer[i].isotopes[j].positions.iso.x : this.buffer[i].isotopes[j].positions.trans.x,
					y: this.composition === 'isotopes' ? this.buffer[i].isotopes[j].positions.iso.y : this.buffer[i].isotopes[j].positions.trans.y,
				}
				v.prevMix = 1;

				let vcolors = this.getColors(i,j);
				v.colors = vcolors.fill;
				v.textColors = vcolors.text;
				v.name = u.specialName ? this.words.specialNames[u.specialName][this.language] : u.sn + '-' + (u.z + u.n);
				v.halflife = u.hl === null ? '∞' : u.hl === true ? this.getHumanTime(u.hlseconds) : '?';
				v.discovery = u.year || '?';
				v.elneg = this.buffer[i].elneg;
				v.ionization = this.buffer[i].ionization;
				v.affinity = this.buffer[i].affinity;
				v.electrons = this.buffer[i].electrons;
				v.radius = '?';
				v.decay = u.hl !== null ? this.getDecayLabel(u.decay) : '—';
				v.decayDetails = u.decay ? this.words.decayTypes[u.decay][this.language] : '';
				v.sAbu = (this.data[i].sSAbu && u.fraction) ? this.getHumanFraction(this.data[i].sSAbu * 75 / 28000 * u.fraction / 100) : '0';
				v.cAbu = (this.data[i].cAbu && u.fraction) ? this.getHumanFraction(this.data[i].cAbu * u.fraction) : '0';
				v.melt = {};
				v.boil = {};
				v.melt.c = v.melt.k = v.boil.c = v.boil.k = '—';
				v.oxy = false;
				v.binding = u.binding ? Math.floor(u.binding) : '?';
				v.excess = u.excess !== false ? Math.floor(u.excess/100)/10 : '?';
				v.psep = u.sepp !== false ? Math.floor(u.sepp/100)/10 : '?';
				v.nsep = u.sepn !== false ? Math.floor(u.sepn/100)/10 : '?';
					
			}
		}

	}

	getColors(i,j){
		
		let colors = {};
		let textColors = {};
		let ni = j === undefined;

		colors.clean = '#fff';
		colors.groups = this.codex.colors.groups[this.data[i].type - 1];
		colors.halflife = ni ? this.data[i].halflife ? this.codex.colors.halflife(.0008 / this.data[i].halflife,'hcl',50) : this.codex.colors.stable : this.data[i].isotopes[j].hl === true ? this.codex.colors.halflife(.0008 / this.data[i].isotopes[j].hlseconds,'hcl',50) : this.data[i].isotopes[j].hl === false ? this.codex.colors.disabled : this.codex.colors.stable;
		colors.elneg = this.data[i].elneg ? this.codex.colors.elneg((this.data[i].elneg - .79)/3.21,'hcl',3) : this.codex.colors.disabled;
		colors.ionization = this.data[i].ioEnergy ? this.codex.colors.elneg((this.data[i].ioEnergy[0] - 375.7)/1996.6,'hcl',4) : this.codex.colors.disabled;
		colors.affinity = this.data[i].eaffinity ? this.codex.colors.elneg((this.data[i].eaffinity + 223.22) / 571.795, 'hcl') : this.codex.colors.disabled
		// colors.discovery = ni ? this.data[i].discovery > 1700 ? this.codex.colors.discovery((this.data[i].discovery - 1700)/311, 'hcl', -3) : this.codex.colors.discovery(0) : this.data[i].isotopes[j].year ? this.codex.colors.discovery((this.data[i].isotopes[j].year - 1896) / 119, 'hcl') : this.codex.colors.disabled;
		colors.discovery = ni ? this.data[i].discovery > 1700 ? this.codex.colors.discovery((this.data[i].discovery - 1700)/311, 'hcl', 2) : this.codex.colors.discovery(0) : this.data[i].isotopes[j].year ? this.codex.colors.discovery((this.data[i].isotopes[j].year - 1896) / 119, 'hcl', 2) : this.codex.colors.disabled;
		colors.electrons = this.getElectronsData(i).fill;
		colors.radius = this.data[i].radius ? this.codex.colors.elneg(1 - (this.data[i].radius - 31)/329,'hcl') : this.codex.colors.disabled;
		colors.decay = !ni && this.data[i].isotopes[j].decay ? this.codex.colors.decay[this.data[i].isotopes[j].decay] : this.codex.colors.disabled;
		colors.sAbu = ni ? this.data[i].sSAbu ? this.codex.colors.composition(this.data[i].sSAbu / 28001, 'hcl', 27) : this.codex.colors.disabled : (this.data[i].sSAbu && this.data[i].isotopes[j].fraction) ? this.codex.colors.composition(this.data[i].sSAbu * this.data[i].isotopes[j].fraction / 28001, 'hcl', 27) : this.codex.colors.disabled;
		colors.cAbu = ni ? this.data[i].cAbu ? this.codex.colors.composition(this.data[i].cAbu / 4.61e-1, 'hcl', 20) : this.codex.colors.disabled : (this.data[i].cAbu && this.data[i].isotopes[j].fraction) ? this.codex.colors.composition(this.data[i].cAbu * this.data[i].isotopes[j].fraction / 4.61e-1, 'hcl', 20) : this.codex.colors.disabled;
		colors.melt = this.data[i].melt ? this.data[i].melt >= 273.15 ? this.codex.colors.melt[1]((this.data[i].melt - 273.15) / 6203,'hcl',4) : this.codex.colors.melt[0]((this.data[i].melt) / 273.15,'hcl') : this.codex.colors.disabled;
		colors.boil = this.data[i].boil ? this.data[i].boil >= 273.15 ? this.codex.colors.melt[1]((this.data[i].boil - 273.15) / 6203,'hcl',4) : this.codex.colors.melt[0]((this.data[i].boil) / 273.15,'hcl') : this.codex.colors.disabled;
		colors.oxy = this.data[i].oxy ? this.codex.colors.discovery((this.data[i].oxy[this.data[i].oxy.length - 1] + 5)/14,'hcl') : this.codex.colors.disabled;
		// colors.binding = ni ? this.codex.colors.disabled : this.data[i].isotopes[j].binding ? this.codex.colors.halflife((this.data[i].isotopes[j].binding - 1000) / 7794.553, 'hcl', -4) : this.codex.colors.disabled;
		colors.binding = ni ? this.codex.colors.disabled : this.data[i].isotopes[j].binding ? this.codex.colors.halflife((this.data[i].isotopes[j].binding) / 8794.553, 'hcl', -6) : this.codex.colors.disabled;
		colors.excess = ni ? this.codex.colors.disabled : this.data[i].isotopes[j].excess !== false ? this.data[i].isotopes[j].excess >= 0 ? this.codex.colors.melt[1](this.data[i].isotopes[j].excess / 190669, 'hcl') : this.codex.colors.melt[0](1 - this.data[i].isotopes[j].excess / -91652.853, 'hcl') : this.codex.colors.disabled;
		colors.psep = ni ? this.codex.colors.disabled : this.data[i].isotopes[j].sepp !== false ? this.codex.colors.composition((this.data[i].isotopes[j].sepp + 4527) / 35535, 'hcl', 2) : this.codex.colors.disabled;
		colors.nsep = ni ? this.codex.colors.disabled : this.data[i].isotopes[j].sepn !== false ? this.codex.colors.halflife((this.data[i].isotopes[j].sepn + 2146) / 29861, 'hcl', 3) : this.codex.colors.disabled;

		for (let c in colors){
			textColors[c] = isItDark(colors[c]) ? this.codex.colors.textWhite : this.codex.colors.textBlack;
		}

		return {fill: colors, text: textColors};

	}

	getDecayLabel(i){
		return i === 'A' ? 'α' : i === 'B-' ? 'β–' : i === '2B-' ? '2×β–' : i === '2B+' ? '2×β+' : i === 'B+' ? 'β+' : i === 'EC' ? 'ec' : i === '2EC' ? '2×ec' : i === 'SF' ? '💥' : i === 'IT' ? 'γ' : i === 'P' ? 'p+' : i === 'N' ? 'n' : i === 'EC+B+' ? 'ec, β+' : i === 'B-2N' ? 'β–, 2×n' : i === 'B-N' ? 'β–, n' : i === 'ECP' ? 'ec, p+' : i === '2P' ? '2×p+' : i === '2N' ? '2×n' : i === 'ECSF' ? 'ec, 💥' : i === 'B+P' ? 'β+, p+' : i === 'ECP+EC2P' ? 'ec, p+, ec, 2×p+,' : '?';
	}

	updateCamera(){

		this.camera.v.s += this.camera.a.s * this.camera.p.s;
		this.camera.v.x += this.camera.a.x / this.camera.p.s;
		this.camera.v.y += this.camera.a.y / this.camera.p.s;

		this.camera.p.x += this.camera.v.x;
		this.camera.p.y += this.camera.v.y;
		this.camera.p.s += this.camera.v.s;

		this.camera.v.x *= .8;
		this.camera.v.y *= .8;
		this.camera.v.s *= .8;

		// this.camera.a.x = this.camera.a.y = this.camera.a.s = 0;

		if (this.camera.p.x < -1000) this.camera.p.x = -1000; else if (this.camera.p.x > 19000) this.camera.p.x = 19000;
		if (this.camera.p.y < -1000) this.camera.p.y = -1000; else if (this.camera.p.y > 19000) this.camera.p.y = 19000;

		let scale = this.camera.p.s / this.ratio;

		this.camera.hugeAlpha = this.step(scale, this.zoomSteps.huge.from, this.zoomSteps.huge.to);
		this.camera.bigAlpha = this.step(scale, this.zoomSteps.big.from, this.zoomSteps.big.to);
		this.camera.smallAlpha = this.step(scale, this.zoomSteps.small.from, this.zoomSteps.small.to);
		this.camera.microAlpha = this.step(scale, this.zoomSteps.micro.from, this.zoomSteps.micro.to);

		this.camera.paleAlpha = this.camera.smallAlpha * .6;
		this.camera.microPaleAlpha = this.camera.microAlpha * .6;

		this.camera.p.rs = scale;

		if (this.camera.p.rs < this.camera.minZoom) this.camera.p.s = this.camera.minZoom * this.ratio;
		if (this.camera.p.rs > this.camera.maxZoom) this.camera.p.s = this.camera.maxZoom * this.ratio;

		
	}

	resetCamera(l,smooth){

		// let f = l === 'full' ? 0 : l === 'book' ? 1 : 2;
		let px = l === 'full' ? this.cellSize.x * 16 : l === 'book' ? this.cellSize.x * 10 : this.cellSize.x * 89;
		let py = l === 'full' ? this.cellSize.y * 2 : l === 'book' ? this.cellSize.y * 3 : this.cellSize.y * 59;
		let ps = l === 'full' ? this.canvas.width / (this.cellSize.x * 32) * .99 : l === 'book' ? this.canvas.width / (this.cellSize.x * 32) * .99 : this.canvas.height / (this.cellSize.y * 118) * .9;

		if (smooth){
			this.transition(this.camera.p,'x',this.camera.p.x,px,smooth,0,false);
			this.transition(this.camera.p,'y',this.camera.p.y,py,smooth,0,false);
			this.transition(this.camera.p,'s',this.camera.p.s,ps,smooth,smooth * .6,false);
		} else {
			this.camera.p.x = px;
			this.camera.p.y = py;
			this.camera.p.s = ps - .2;
			this.camera.v.s = .02;
		}

		// if (l === 'full'){
		// 	this.camera.p = {x: this.cellSize.x * 16, y: this.cellSize.y * 2, s: this.canvas.width / (this.cellSize.x * 32) * .95 - .2};
		// 	this.camera.v = {x: 0, y: 0, s: .02};
		// 	this.camera.a = {x: 0, y: 0, s: 0};
		// } else if (l === 'book'){
		// 	this.camera.p = {x: this.cellSize.x * 10, y: this.cellSize.y * 3, s: this.canvas.width / (this.cellSize.x * 32) * .95 - .2};
		// 	this.camera.v = {x: 0, y: 0, s: .02};
		// 	this.camera.a = {x: 0, y: 0, s: 0};
		// } else if (l === 'isotopes'){
		// 	this.camera.p = {x: this.canvas.width/2, y: this.canvas.height/2, s: 1};
		// 	this.camera.v = {x: 0, y: 0, s: 0};
		// 	this.camera.a = {x: 0, y: 0, s: 0};
		// }
	}

	getPositions(i,j){

		if (j === undefined) {

			let xf, xb, yf, yb;
			xf = this.cellSize.x * this.data[i].position[1];
			xb = xf - (this.data[i].position[1] > 16 ? this.cellSize.x * 14 : 0);
			yf = this.cellSize.y * this.data[i].position[0];
			yb = yf + ((this.data[i].index >= 57 && this.data[i].index <= 71) || (this.data[i].index >= 89 && this.data[i].index <= 103) ? this.cellSize.y * 2.5 : 0);
			return {full: {x: xf, y: yf}, book: {x: xb, y: yb}, trans: {x: this.data[i].index * this.cellSize.x, y: this.data[i].index * this.cellSize.y}}

		} else {

			return {iso: {x: this.data[i].isotopes[j].n * this.cellSize.x, y: this.data[i].isotopes[j].z * this.cellSize.y}, trans: {x: this.data[i].index * this.cellSize.x, y: this.data[i].isotopes[j].z * this.cellSize.y}}

		}
	}

	getElectronsData(i){

		let u = this.data[i];

		let v = u.elConf.valence, s = '';
		let max = {n: -1, l: -1};

		for (let e in v){
			if (v[e].n + v[e].l * .7 > max.n + max.l * .7) max = v[e];
			s += v[e].n + (v[e].l===0?'s':v[e].l===1?'p':v[e].l===2?'d':'f')+this.getSuperscript(v[e].q) + ' ';
		}

		let fill = this.codex.colors.electrons[max.l];

		return {text: s, fill: fill}

	}

	getSuperscript(n){

		let ss = '⁰¹²³⁴⁵⁶⁷⁸⁹';
		n += '';
		let f = '';
		for (let i = 0; i < n.length; i++){
			// f += String.fromCharCode(n.charCodeAt(i) + 8272);
			f += ss[+n[i]];
		}
		return f;

	}

	isVisible(x,y,t){
		
		let rx = x * t.s;
		let ry = y * t.s;
		rx += t.x;
		ry += t.y;

		return rx > -this.cellSize.x * t.s && rx < this.canvas.width && ry > -this.cellSize.y * t.s && ry < this.canvas.height;
	}

	drawText(position, text, font, color){

		let x = 0, y = 0;
		if (position === 'c'){
			x = 6;
			y = this.cellSize.y * .54;
		} else if (position === 'l'){
			x = 6;
			y = this.cellSize.y * .78;
		} else if (position === 'tr'){
			x = 6;
			y = this.cellSize.y * .9;
		} else if (position === 'tl'){
			x = 6;
			y = 24;
		} else if (position === 'tll'){
			x = 6;
			y = 40;
		}

		if (font) this.ctx.font = font;
		if (color) this.ctx.fillStyle = color;
		this.ctx.fillText(text, x, y);

	}

	drawCell(i,j){

		let io = j !== undefined;
		let source = io ? this.buffer[i].isotopes[j] : this.buffer[i];
		let color = source.colors[this.dataMode];
		let textColor = source.textColors[this.dataMode];

		if (source.prevColor){
			
			this.ctx.fillStyle = source.prevColor;
			this.ctx.fillRect(0,0,this.cellSize.x, this.cellSize.y);
			this.ctx.fillStyle = color;
			this.ctx.globalAlpha = source.prevMix;
			this.ctx.fillRect(0,0,this.cellSize.x, this.cellSize.y);
			this.ctx.globalAlpha = 1;
			if (source.prevMix >= 1) source.prevColor = false;
			
		} else {
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0,0,this.cellSize.x, this.cellSize.y);
		}

		this.codex.cellRenders[this.dataMode](i,j,io,source,textColor);
		if (!io && this.camera.p.rs > this.zoomSteps.small.from){
			this.ctx.globalAlpha = this.camera.paleAlpha;
			this.drawText('tr', this.data[i].amass, false, false);
			this.drawText('tl', this.data[i].index, false, false);
		}
		if (io && this.camera.p.rs > this.zoomSteps.small.from){
			this.ctx.font = this.codex.fonts[this.dataMode].small;
			this.ctx.globalAlpha = this.camera.paleAlpha;
			this.drawText('tl', this.data[i].isotopes[j].z, false, false);
			this.drawText('tll', this.data[i].isotopes[j].n, false, false);
		}

		// if (this.dataMode === 'groups'){
		// 	this.ctx.globalAlpha = 1;
		// 	this.ctx.font = '400 24px/24px Fact';
		// 	if (i === 86){
		// 		this.ctx.fillStyle = this.codex.colors.groups[1];
		// 		this.ctx.rotate(-Math.PI/2);
		// 		this.ctx.fillText('Alkali metals', -this.cellSize.y, -20);
		// 	} else if (i === 3){
		// 		this.ctx.fillStyle = this.codex.colors.groups[2];
		// 		this.ctx.rotate(Math.PI/2);
		// 		this.ctx.fillText('Alkaline metals', 0, -this.cellSize.x - 20);
		// 	} else if (i === 57){
		// 		this.ctx.fillStyle = this.codex.colors.groups[3];
		// 		this.ctx.fillText('Lantanides', 20, -20);
		// 	} else if (i === 89){
		// 		this.ctx.fillStyle = this.codex.colors.groups[4];
		// 		this.ctx.fillText('Actinides', 20, this.cellSize.y + 20);
		// 	} else if (i === 12){
		// 		this.ctx.fillStyle = this.codex.colors.groups[7];
		// 		this.ctx.rotate(-Math.PI/2);
		// 		this.ctx.fillText('Post-transition metals', -this.cellSize.y + 20, -20);
		// 	} else if (i === 4){
		// 		this.ctx.fillStyle = this.codex.colors.groups[8];
		// 		this.ctx.fillText('Metalloids', 0, -20);
		// 	} else if (i === 21){
		// 		this.ctx.fillStyle = this.codex.colors.groups[6];
		// 		this.ctx.fillText('Transition metals', 20, -20);
		// 	}

		// }

	}

	drawHeader(){

		let txt = (this.composition === 'isotopes' && this.words.modes[this.dataMode].isoheader) ? this.words.modes[this.dataMode].isoheader[this.language] : this.words.modes[this.dataMode].header[this.language];
		txt = txt.split('\n');
		this.ctx.font = '800 200px Fact';
		this.ctx.fillStyle = '#000';

		for (let i = 0; i < txt.length; i++){
			this.ctx.save();
				this.ctx.translate(this.cellSize.x * 3, (txt.length - 1 - i) * -180 - 200);
				this.ctx.fillText(txt[i], 0, 0);
			this.ctx.restore();
		}

	}

	draw(){

		// this.ctx.fillStyle = '#112';
		// this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

		this.transformation = {
			x: this.canvas.width / 2 -this.camera.p.x * this.camera.p.s,
			y: this.canvas.height / 2 -this.camera.p.y * this.camera.p.s,
			s: this.camera.p.s
		}

		this.ctx.save();
		// this.ctx.translate(this.transformation.x, this.transformation.y);
		// this.ctx.scale(this.transformation.s, this.transformation.s);
		this.ctx.setTransform(this.transformation.s,0,0,this.transformation.s,this.transformation.x,this.transformation.y);

		// this.ctx.fillStyle = '#fff';
		this.ctx.textBaseline = 'middle';
		this.ctx.textAlign = 'left';
		this.drawHeader();

		if (this.composition === 'full' || this.composition === 'book'){

			for (let i = 0; i < this.data.length; i++){

				let u = this.buffer[i];
				let px = u.position.x;
				let py = u.position.y;

				if (this.isVisible(px,py,this.transformation)) {

					this.ctx.save();
					this.ctx.translate(px, py);
					this.drawCell(i);
					this.ctx.restore();

				}

			}

		} else if (this.composition === 'isotopes'){

			for (let i = 0; i < this.data.length; i++){

				let u = this.buffer[i];

				for (let j = 0; j < u.isotopes.length; j++){

					let v = u.isotopes[j];
					let px = v.position.x;
					let py = v.position.y;

					if (this.isVisible(px,py,this.transformation)) {
						this.ctx.save();
						this.ctx.translate(px, py);
						this.drawCell(i,j);
						this.ctx.restore();
					}
				}
			}
		}

		this.ctx.restore();
		this.drawAxis();
	}

	drawAxis(){

		// if (this.camera.p.s > .5){
		let d = this.camera.p.rs > .5 ? 1 : this.camera.p.rs > .2 ? 2 : 5;

			this.ctx.save();
			this.ctx.font = '400 '+12 * this.ratio+'px Fact';
			this.ctx.textBaseline = 'middle';
			this.ctx.textAlign = 'center';
			this.ctx.fillStyle = '#000a';
			this.ctx.strokeStyle = '#0004';
			this.ctx.setLineDash([5,10]);
			this.ctx.globalCompositeOperation = 'xor';

			if (this.composition !== 'isotopes'){

				for (let y = -d; y < 7; y+=d){

					this.ctx.save();
					this.ctx.translate(16, (this.cellSize.y * (y + .5)) * this.camera.p.s + this.transformation.y);

					if (y < 0){

						this.ctx.rotate(-Math.PI/2);
						this.ctx.fillText(this.words.axisLabels.periodic.p[this.language], this.cellSize.x, 0);
						
					} else {

						this.ctx.fillText(y+1, 0, 0);

					}
					this.ctx.restore();
				}

				for (let x = -d; x < 18; x+=d){
					this.ctx.save();
					this.ctx.translate((this.cellSize.x * (((x < 4 || this.composition === 'book') ? x : x + 14) + .5)) * this.camera.p.s + this.transformation.x, 16);

					if (x < 0){
						this.ctx.fillText(this.words.axisLabels.periodic.g[this.language], -this.cellSize.x, 0);

					} else {

						this.ctx.fillText(x+1, 0,0);
					}
					this.ctx.restore();
				}

			} else {

				for (let y = -d; y < 120; y+=d){

					this.ctx.save();
					this.ctx.translate(16, (this.cellSize.y * (y + .5)) * this.camera.p.s + this.transformation.y);
					if (this.codex.magicNumbers[y]){
						this.ctx.font = '600 '+12 * this.ratio+'px Fact';
						// this.ctx.beginPath();
						// this.ctx.moveTo(0,0);
						// this.ctx.lineTo(this.canvas.width, 0);
						// this.ctx.stroke();
					}

					if (y < 0){

						this.ctx.rotate(-Math.PI/2);
						this.ctx.fillText(this.words.axisLabels.iso.z[this.language], this.cellSize.x, 0);
						
					} else {
						
						this.ctx.fillText(y, 0, 0);
						

					}
					this.ctx.restore();
				}

				for (let x = -d; x < 179; x+=d){
					this.ctx.save();
					this.ctx.translate((this.cellSize.x * (x + .5)) * this.camera.p.s + this.transformation.x, 16);
					if (this.codex.magicNumbers[x]){
						this.ctx.font = '600 '+12 * this.ratio+'px Fact';
						// this.ctx.beginPath();
						// this.ctx.moveTo(0,0);
						// this.ctx.lineTo(0, this.canvas.height);
						// this.ctx.stroke();
					}

					if (x < 0){
						this.ctx.fillText(this.words.axisLabels.iso.n[this.language], -this.cellSize.x, 0);

					} else {
						this.ctx.fillText(x, 0,0);
					}
					this.ctx.restore();
				}

				for (let n in this.codex.magicNumbers){
					this.ctx.save();
					this.ctx.translate(0, (this.cellSize.y * (+n)) * this.camera.p.s + this.transformation.y);
					this.ctx.beginPath();
					this.ctx.moveTo(0,0);
					this.ctx.lineTo(this.canvas.width, 0);
					this.ctx.stroke();
					this.ctx.restore();

					this.ctx.save();
					this.ctx.translate((this.cellSize.x * (+n + 1)) * this.camera.p.s + this.transformation.x, 0);
					this.ctx.beginPath();
					this.ctx.moveTo(0,0);
					this.ctx.lineTo(0, this.canvas.height);
					this.ctx.stroke();
					this.ctx.restore();
				}

			}
			this.ctx.restore();
		// }

	}

	getHumanTime(s){
		let yy, yyLast;
		let tt = this.words.measures.time;
		let l = this.language;
		if (s > 31536000 && s < 31536000000) {
			let kString = (Math.round(s / 31536000) + '');
			let kLast = kString[kString.length - 1];
			yy = (kLast === '1' || kLast === '2' || kLast === '3' || kLast === '4') ? ' ' + tt.y[l][0] : ' ' + tt.y[l][1];
		}
		let lambda = s > 31536e27 ? Math.round(s / 31536e27) + ' ' + tt.septy[l] : s > 31536e24 ? Math.round(s / 31536e24) + ' ' + tt.sexty[l] : s > 31536e21 ? Math.round(s / 31536e21) + ' ' + tt.quinty[l] : s > 31536e18 ? Math.round(s / 31536e18) + ' ' + tt.quady[l] : s > 31536e15 ? Math.round(s / 31536e15) + ' ' + tt.ty[l] : s > 31536e12 ? Math.round(s / 31536e12) + ' ' + tt.by[l] : s > 31536000000000 ? Math.round(s / 31536000000000) + ' ' + tt.my[l] : s > 31536000000 ? Math.round(s / 31536000000) + ' ' + tt.ky[l] : s > 31536000 ? Math.round(s / 315360)/100 + yy : s > 86400 ? Math.round(s / 86400) + ' ' + tt.d[l] : s > 3600 ? Math.round(s / 3600) + ' ч' : s > 60 ? Math.round(s / 60) + ' ' + tt.m[l] : s > 1 ? Math.round(s / .01)/100 + ' ' + tt.s[l] : s > .001 ? Math.round(s / .00001)/100 + ' ' + tt.ms[l] : s > .000001 ? Math.round(s / .00000001)/100 + ' ' + tt.mks[l] : s > .000000001 ? Math.round(s / .00000000001)/100 + ' ' + tt.ns[l] : '< 1' + tt.ns[l];
		return lambda;
	}
	getHumanFraction(n){
		return n > 1 ? Math.round(n) + '%' : n >= .01 ? Math.round(n*100)/100 + '%' : n >= 1e-3 ? Math.round(n*1e4)/100 + '‰' : n >= 1e-6 ? Math.round(n*1e6) + ' ppm' : n >= 1e-9 ? Math.round(n*1e9) + ' ppb' : n >= 1e-12 ? Math.round(n*1e12) + ' ppt' : '< 1 ppq';
	}

	transition(obj,key,from,to,t,d,onfinish){

		let time = window.performance.now();
		if (!d) d = 0;

		let transition = {
			o: obj,
			i: key,
			x1: from,
			x2: to,
			t1: time + d,
			t2: time + t + d,
			f: onfinish
		}

		this.transitions[this.transitionId++] = transition;
	}

	updateTransitions(){

		let time = window.performance.now();

		for (let i in this.transitions){

			let u = this.transitions[i];
			if (time >= u.t1){
				if (time < u.t2){

					let f = (time - u.t1) / (u.t2 - u.t1);
					u.o[u.i] = this.ease(u.x1, u.x2, f);

				} else {
					u.o[u.i] = u.x2;
					if (u.f) u.f();
					delete this.transitions[i];
				}
			} else {
				u.o[u.i] = u.x1;
			}

		}

	}

	lerp(a,b,f){
		return a + (b - a) * f;
	}

	ease(a,b,f){
		f = f < .5 ? 2 * f * f : -1 + (4 - 2 * f) * f;
		// f = f < .5 ? 4 * (f ** 3) : (f - 1) * (2 * f - 2) * (2 * f - 2) + 1;
		return this.lerp(a,b,f);
	}

	step(n,a,b){
		return n < a ? 0 : n > b ? 1 : (n - a) / (b - a);
	}
}