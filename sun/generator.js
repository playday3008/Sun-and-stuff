function generateSolarSystem(lang){
	function getHillRadius(m,a){
		return a*Math.cbrt(m/(3*1.9891e30));
	}

	if (lang == 'en'){
		core.regions.push({name:'Sun system',l1:0,l2:4.488e9});
		core.regions.push({name:'Mercury sphere of influence',l1:57909227 - getHillRadius(3.33022e23,57909227),l2:57909227 + getHillRadius(3.33022e23,57909227)});
		core.regions.push({name:'Venus sphere of influence',l1:108208930 - getHillRadius(4.8675e24,108208930),l2:108208930 + getHillRadius(4.8675e24,108208930)});
		core.regions.push({name:'Earth sphere of influence',l1:149598261 - getHillRadius(5.97237e24,149598261),l2:149598261 + getHillRadius(5.97237e24,149598261)});
		core.regions.push({name:'Mars sphere of influence',l1:2.2794382e8 - getHillRadius(6.4171e23,2.2794382e8),l2:2.2794382e8 + getHillRadius(6.4171e23,2.2794382e8)});
		core.regions.push({name:'Jupiter sphere of influence',l1:7.785472e8 - getHillRadius(1.8986e27,7.785472e8),l2:7.785472e8 + getHillRadius(1.8986e27,7.785472e8)});
		core.regions.push({name:'Saturn sphere of influence',l1:1433449370 - getHillRadius(5.6836e26,1433449370),l2:1433449370 + getHillRadius(5.6836e26,1433449370)});
		core.regions.push({name:'Uranus sphere of influence',l1:2876679082 - getHillRadius(8.6810e25,2876679082),l2:2876679082 + getHillRadius(8.6810e25,2876679082)});
		core.regions.push({name:'Kuiper belt',l1:4.488e9,l2:7.48e9});
		core.regions.push({name:'Neptune sphere of influence',l1:4503443661 - getHillRadius(1.0243e26,4503443661),l2:4503443661 + getHillRadius(1.0243e26,4503443661)});
		core.regions.push({name:'Scattered disk',l1:7.48e9,l2:1.421e10});
		core.regions.push({name:'Solar system sphere of influence',l1:1.421e10,l2:1.496e13});
		core.regions.push({name:'Oort cloud',l1:1.496e11,l2:2.992e13});
		core.regions.push({name:'Pluto sphere of influence',l1:5.9151e9 - getHillRadius(1.303e22,5.9151e9),l2:5.9151e9 + getHillRadius(1.303e22,5.9151e9)});
		uiText = [
			'Time x ',
			' min in a sec',
			' hours in a sec',
			' days in a sec',
			' km per pixel',
			' km',
			'Interstellar space',
			'Found ',
			'Fast travel — key '
		];
		labels = new Labels();
		labels.stack.push(new Label('The fastest way to get somewhere — is to move with the speed of light. 300 thousand kilometers per second.',.1,900000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Every circle from the Sun moves exactly with this speed. It is maximum allowed by physics.',.4,1300000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Each side of background square equals distance from the Earth to the Moon. Light passes it in a little more than a second.',.6,1700000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Light is thousands time faster than any space probe sent by man.',.5,3000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Everything with mass moves slower.',.4,4000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Keyboard arrow up toggles the speed of light.',.3,5000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('All sizes and distances are to scale.',.4,60000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('They are just millions of times less.',.7,62000000,'rgb(255,255,255)',false,false));

		stuff.push(new Planet(0,48,'The Sun','Yellow dwarf',0.696e6,0,'rgba(255,255,255,1)'));
		stuff.push(new Planet(1,49,'Mercury','Terrestrial planet',2439.7,57909227,'#ffbaa8'));
		stuff.push(new Planet(2,50,'Venus','Terrestrial planet',6051.8,108208930,'#e3d084'));
		stuff.push(new Planet(3,51,'Earth','Terrestrial planet',6371,149598261,'#5faeff', [
			new Moon('ISS',.08,6771,'#fff',0.0645),
			new Moon('Moon',1737.1,384399,'#aaa',27.321661)
			]));
		stuff.push(new Planet(4,52,'Mars','Terrestrial planet',3389.5,2.2794382e8,'#ec6327',[
			new Moon('Phobos',11,9377,'#ae9a8e',.3189),
			new Moon('Deimos',7,23458,'#ae9a8e',1.26244)
			]));
		stuff.push(new Planet(6,53,'Jupiter','Gas giant',69911,7.785472e8,'#a78a71',[
			new Moon('Metis',23,127690,'#de532a',.295),
			new Moon('Adrastea',9,128690,'#de532a',.2979),
			new Moon('Amalthea',88,181366,'#de532a',.4982),
			new Moon('Thebe',50,221889,'#de532a',.6745),
			new Moon('Io',1821.3,421700,'#ffee7c',1.769137786),
			new Moon('Europa',1560.8,671100,'#a2805b',3.551),
			new Moon('Ganymede',2634.1,1070400,'#a69b87',7.15455296),
			new Moon('Callisto',2410.3,1882700,'#4e7f7b',16.6890184),
			new Moon('Themisto',4,7393216,'#776a60',129.87),
			new Moon('Leda',8,11187781,'#776a60',240.82),
			new Moon('Himalia',85,11451971,'#999',250.23),
			new Moon('Lysithea',18,11740560,'#888',259.89),
			new Moon('Elara',43,11778034,'#777',257.62),
			new Moon('Dia',2,12570424,'#776a60',287.93),
			new Moon('Carpo',1.5,17144873,'#776a60',458.62),
			new Moon('S/2003 J 12',.5,17739539,'#776a60',-482.69),
			new Moon('Euporie',1,19088434,'#776a60',-538.78),
			new Moon('S/2003 J 3',1,19621780,'#776a60',-561.52),
			new Moon('S/2003 J 18',1,19812577,'#776a60',-569.73),
			new Moon('S/2011 J 1',.5,20155290,'#776a60',-582.22),
			new Moon('S/2010 J 2',.5,20307150,'#776a60',-588.36),
			new Moon('Thelxinoe',1,20453753,'#776a60',-597.61),
			new Moon('Euanthe',1.5,20464854,'#776a60',-598.09),
			new Moon('Helike',2,20540266,'#776a60',-601.40),
			new Moon('Orthosie',1,20567971,'#776a60',-602.62),
			new Moon('Iocaste',2.5,20722566,'#776a60',-609.43),
			new Moon('S/2003 J 16',1,20743779,'#776a60',-610.36),
			new Moon('Praxidike',3.5,20823948,'#776a60',-613.90),
			new Moon('Harpalyke',2,21063814,'#776a60',-624.54),
			new Moon('Mneme',1,21129786,'#776a60',-627.48),
			new Moon('Hermippe',2,21182086,'#776a60',-629.81),
			new Moon('Thyone',2,21405570,'#776a60',-639.80),
			new Moon('Ananke',14,21454952,'#776a60',-640.38),
			new Moon('Herse',1,22134306,'#776a60',-672.75),
			new Moon('Aitne',1.5,22285161,'#776a60',-679.64),
			new Moon('Kale',1,22409207,'#776a60',-685.32),
			new Moon('Taygete',2.5,22438648,'#776a60',-686.67),
			new Moon('S/2003 J 19',1,22709061,'#776a60',-699.12),
			new Moon('Chaldene',2,22713444,'#776a60',-699.33),
			new Moon('S/2003 J 15',1,22720999,'#776a60',-699.68),
			new Moon('S/2003 J 10',1,22730813,'#776a60',-700.13),
			new Moon('S/2003 J 23',1,22739654,'#776a60',-700.54),
			new Moon('Erinome',1.5,22986266,'#776a60',-711.96),
			new Moon('Aoede',2,23044175,'#776a60',-714.66),
			new Moon('Kallichore',1,23111823,'#776a60',-717.81),
			new Moon('Kalyke',2.5,23180773,'#776a60',-721.02),
			new Moon('Carme',23,23197992,'#776a60',-763.95),
			new Moon('Callirrhoe',4.5,23214986,'#776a60',-727.11),
			new Moon('Eurydome',1.5,23230858,'#776a60',-723.36),
			new Moon('Pasithee',1,23307318,'#776a60',-726.93),
			new Moon('S/2010 J 1',1,23314335,'#776a60',-722.83),
			new Moon('S/2011 J 2',.5,23329710,'#776a60',-725.06),
			new Moon('Kore',1,23345093,'#776a60',-776.02),
			new Moon('Cyllene',1,23396269,'#776a60',-731.10),
			new Moon('Eukelade',2,23483694,'#776a60',-735.20),
			new Moon('S/2003 J 4',1,23570790,'#776a60',-739.29),
			new Moon('Pasiphae',30,23609042,'#666',-739.80),
			new Moon('Hegemone',1.5,23702511,'#776a60',-745.50),
			new Moon('Arche',1.5,23717051,'#776a60',-746.19),
			new Moon('Isonoe',2,23800647,'#776a60',-750.13),
			new Moon('S/2003 J 9',.5,23857808,'#776a60',-752.84),
			new Moon('S/2003 J 5',2,23973926,'#776a60',-758.34),
			new Moon('Sinope',19,24057865,'#555',-739.33),
			new Moon('Sponde',1,24252627,'#776a60',-771.60),
			new Moon('Autonoe',2,24264445,'#776a60',-772.17),
			new Moon('Megaclite',2.5,24687239,'#776a60',-792.44),
			new Moon('S/2003 J 2',1,30290846,'#776a60',-1077.02)
			],[
			new Ring(182000,226000,'rgba(255,250,235,.008)'),
			new Ring(129000,182000,'rgba(255,250,235,.01)'),
			new Ring(122500,129000,'rgba(255,250,235,.03)'),
			new Ring(92000,122500,'rgba(255,250,235,.01)')
			]));
		stuff.push(new Planet(7,54,'Saturn','Gas giant',58232,1433449370,'#d2b179',[
			new Moon('S/2009 S 1',.15,117000,'#bb9c67',0.47),
			new Moon('Pan',14.1,133584,'#bb9c67',0.57505),
			new Moon('Daphnis',3.8,136505,'#bb9c67',0.59408),
			new Moon('Atlas',15.1,137670,'#bb9c67',0.60169),
			new Moon('Prometheus',43.1,139380,'#bb9c67',0.61299),
			new Moon('Pandora',40.7,141720,'#bb9c67',0.62850),
			new Moon('Epimetheus',58.1,151422,'#bb9c67',0.69433),
			new Moon('Janus',89.5,151472,'#bb9c67',0.69466),
			new Moon('Aegaeon',.25,167500,'#bb9c67',0.80812),
			new Moon('Mimas',198,185539,'#70747d',0.942422),
			new Moon('Methone',.01,194440,'#bb9c67',1.00957),
			new Moon('Anthe',0.0035,197700,'#bb9c67',1.03650),
			new Moon('Pallene',0.025,212280,'#bb9c67',1.15375),
			new Moon('Enceladus',252,237950,'#9c8a7c',1.370218),
			new Moon('Tethys',531,294619,'#7c7761',1.887802),
			new Moon('Telesto',4.705,294619,'#bb9c67',1.887802),
			new Moon('Calypso',3.15,294619,'#bb9c67',1.887802),
			new Moon('Polydeuces',0.015,377220,'#bb9c67',2.736915),
			new Moon('Dione',561.5,377415,'#9fa09a',2.736915),
			new Moon('Helene',12.23,377440,'#bb9c67',2.736915),
			new Moon('Rhea',763.5,527108,'#8b845a',4.518212),
			new Moon('Titan',2575,1221930,'#e4c663',15.94542),
			new Moon('Hyperion',135,1481010,'#beac94',21.27661),
			new Moon('Iapetus',735,3560854,'#707578',79),
			new Moon('Kiviuq',8,11294800,'#bb9c67',448.16),
			new Moon('Ijiraq',6,11355316,'#bb9c67',451.77),
			new Moon('Phoebe',107,12869700,'#bb9c67',-545.09),
			new Moon('Paaliaq',11,15103400,'#bb9c67',692.98),
			new Moon('Skathi',4,15672500,'#bb9c67',-732.52),
			new Moon('Albiorix',16,16266700,'#bb9c67',774.58),
			new Moon('S/2007 S 2',3,16560000,'#bb9c67',-792.96),
			new Moon('Bebhionn',3,17153520,'#bb9c67',838.77),
			new Moon('Erriapus',5,17236900,'#bb9c67',844.89),
			new Moon('Skoll',3,17473800,'#bb9c67',-862.37),
			new Moon('Siarnaq',20,17776600,'#bb9c67',884.88),
			new Moon('Tarqeq',3.5,17910600,'#bb9c67',894.86),
			new Moon('S/2004 S 13',3,18056300,'#bb9c67',-905.85),
			new Moon('Greip',3,18065700,'#bb9c67',-906.56),
			new Moon('Hyrrokkin',4,18168300,'#bb9c67',-914.29),
			new Moon('Jarnsaxa',3,18556900,'#bb9c67',-943.78),
			new Moon('Tarvos',7.5,18562800,'#bb9c67',944.23),
			new Moon('Mundilfari',3.5,18725800,'#bb9c67',-956.70),
			new Moon('S/2006 S 1',3,18930200,'#bb9c67',-972.41),
			new Moon('S/2004 S 17',2,19099200,'#bb9c67',-985.45),
			new Moon('Bergelmir',3,19104000,'#bb9c67',-985.83),
			new Moon('Narvi',3.5,19395200,'#bb9c67',-1008.45),
			new Moon('Suttungr',3.5,19579000,'#bb9c67',-1022.82),
			new Moon('Hati',3,19709300,'#bb9c67',-1033.05),
			new Moon('S/2004 S 12',2.5,19905900,'#bb9c67',-1048.54),
			new Moon('Farbauti',2.5,19984800,'#bb9c67',-1054.78),
			new Moon('Thrymr',3.5,20278100,'#bb9c67',-1078.09),
			new Moon('Aegir',3,20482900,'#bb9c67',-1094.46),
			new Moon('S/2007 S 3',2.5,20518500,'#bb9c67',-1100),
			new Moon('Bestla',3.5,20570000,'#bb9c67',-1101.45),
			new Moon('S/2004 S 7',3,20576700,'#bb9c67',-1101.99),
			new Moon('S/2006 S 3',3,21076300,'#bb9c67',-1142.37),
			new Moon('Fenrir',2,21930644,'#bb9c67',-1212.53),
			new Moon('Surtur',3,22288916,'#bb9c67',-1242.36),
			new Moon('Kari',3.5,22321200,'#bb9c67',-1245.06),
			new Moon('Ymir',9,22429673,'#bb9c67',-1254.15),
			new Moon('Loge',3,22984322,'#bb9c67',-1300.95),
			new Moon('Fornjot',3,24504879,'#bb9c67',-1432.16)
			],[
			new Ring(4000000,13000000,'rgba(235,206,186,.004)'),
			new Ring(180000,480000,'rgba(235,206,186,.007)'),
			new Ring(166000,175000,'rgba(235,206,186,.009)'),
			new Ring(140210,140510,'rgba(235,206,186,.08)'),
			new Ring(136520,136780,'rgba(245,215,181,.3)'),
			new Ring(133732,136490,'rgba(245,215,181,.25)'),
			new Ring(120119,133407,'rgba(245,215,181,.2)'),
			new Ring(117880,119881,'rgba(235,206,186,.1)'),
			new Ring(87635,117480,'rgba(245,215,181,.15)'),
			new Ring(77850,87465,'rgba(235,206,186,.1)'),
			new Ring(74500,77750,'rgba(235,206,186,.05)')
			]));
		stuff.push(new Planet(8,55,'Uranus','Ice giant',25362,2876679082,'#bee1e1',[
			new Moon('Cordelia',21,49751,'#596b72',0.335034),
			new Moon('Ophelia',23,53764,'#596b72',0.376400),
			new Moon('Bianca',27,59165,'#596b72',0.434579),
			new Moon('Cressida',41,61766,'#596b72',0.463570),
			new Moon('Desdemona',34,62658,'#596b72',0.473650),
			new Moon('Juliet',53,64360,'#596b72',0.493065),
			new Moon('Portia',70,66097,'#596b72',0.513196),
			new Moon('Rosalind',36,69927,'#596b72',0.558460),
			new Moon('Cupid',9,74800,'#596b72',0.618),
			new Moon('Belinda',45,75255,'#596b72',0.623527),
			new Moon('Perdita',15,76420,'#596b72',0.638),
			new Moon('Puck',81,86004,'#596b72',0.761833),
			new Moon('Mab',12.5,97734,'#596b72',0.923),
			new Moon('Miranda',235.8,129390,'#8b8d94',1.413479),
			new Moon('Ariel',578.9,191020,'#b59e91',2.520379),
			new Moon('Umbriel',584.7,266300,'#5a5a5a',4.144177),
			new Moon('Titania',788.4,435910,'#b8aba1',8.705872),
			new Moon('Oberon',761.4,583520,'#7f6b6e',13.463239),
			new Moon('Francisco',11,4276000,'#596b72',-266.56),
			new Moon('Caliban',36,7230000,'#596b72',-579.50),
			new Moon('Stephano',16,8002000,'#596b72',-676.50),
			new Moon('Trinculo',9,8571000,'#596b72',-758.10),
			new Moon('Sycorax',83,12179000,'#596b72',-1283.4),
			new Moon('Margaret',10,14345000,'#596b72',1694.8),
			new Moon('Prospero',25,16418000,'#596b72',-1992.8),
			new Moon('Setebos',24,17459000,'#596b72',-2202.3),
			new Moon('Ferdinand',10,20900000,'#596b72',-2823.4)

			],[
			new Ring(51149,51230,'rgba(235,255,255,.5)'),
			new Ring(50023,50025,'rgba(203,249,187,.2)'),
			new Ring(45661,45671,'rgba(203,249,187,.3)'),
			new Ring(44718,44728,'rgba(203,249,187,.3)'),
			new Ring(42570,42575,'rgba(203,249,187,.1)'),
			new Ring(42234,42239,'rgba(203,249,187,.1)'),
			new Ring(41837,41839,'rgba(203,249,187,.1)'),
			new Ring(26840,41350,'rgba(203,249,187,.04)')
			]));
		stuff.push(new Planet(9,56,'Neptune','Ice giant',24622,4503443661,'#4379d1',[
			new Moon('Naiad',33,48227,'#4c9ce7',0.294),
			new Moon('Thalassa',41,50074,'#4996df',0.311),
			new Moon('Despina',75,52526,'#478fd4',0.335),
			new Moon('Galatea',88,61953,'#4486c8',0.429),
			new Moon('Larissa',97,73548,'#417dba',0.555),
			new Moon('S/2004 N 1',10,105300,'#3d73ab',0.936),
			new Moon('Proteus',210,117646,'#39699c',1.122),
			new Moon('Triton',1352.6,354759,'#a29b93',-5.877),
			new Moon('Nereid',170,5513818,'#32547d',360.13),
			new Moon('Halimede',31,16611000,'#2e4a6e',-1879.08),
			new Moon('Sao',22,22228000,'#2b4160',2912.72),
			new Moon('Laomedeia',21,23567000,'#283854',3171.33),
			new Moon('Psamathe',20,48096000,'#253149',-9074.30),
			new Moon('Neso',30,49285000,'#232b3f',-9740.73)
			],[
			new Ring(62932,62982,'rgba(187,203,249,.2)'),
			new Ring(57200,57300,'rgba(187,203,249,.15)'),
			new Ring(53200,57200,'rgba(187,203,249,.05)'),
			new Ring(53100,53200,'rgba(187,203,249,.1)'),
			new Ring(40900,42900,'rgba(187,203,249,.02)')
			]));
		stuff.push(new Planet(5,67,'Ceres','Dwarf planet',463.5,413767000,'#88847d'));
		stuff.push(new Planet(10,80,'Pluto','Dwarf planet',1187,5.9151e9,'#e5b994',[
			new Moon('Charon',606,19571,'#bea69a',6.3872304),
			new Moon('Styx',5,42656,'#bfbfca',20.16155),
			new Moon('Nix',20,48694,'#bfbed0',24.85463),
			new Moon('Kerberos',6,57783,'#bfbfca',32.16756),
			new Moon('Hydra',19,64738,'#bfbfca',38.202)
		]));
		stuff.push(new Planet(11,72,'Haumea','Dwarf planet',650,6.465e9,'#aaa',[
			new Moon('Namaka',85,25657,'#999',18.2783),
			new Moon('Hiʻiaka',155,49880,'#777',49.462)
			]));
		stuff.push(new Planet(12,77,'Makemake','Dwarf planet',715,6.839e9,'#faa'));
		stuff.push(new Planet(13,69,'Eris',1163,10.166e9,'#fda',[
			new Moon('Dysnomia',158,37430,'#db8',17.772)
			]));

		stuff.push(new Planet(14,88,'Proxima Centauri','Red dwarf',98135.999,4.02e13,'#d87'));
		stuff.push(new Planet(15,65,'Alpha Centauri A','Yellow dwarf',853992,4.13e13,'#ffc'));
		stuff.push(new Planet(16,66,'Alpha Centauri B','Orange dwarf',602040,4.13e13 + 6000000,'#Fcb'));
		stuff.push(new Planet(17,71,'Betelgeuse','Red supergiant',0.696e9,6.08e15,'#f65'));

		sunshine = new Sunshines(stuff[0]);
	} else if (lang == 'ru'){
		core.regions.push({name:'Солнечная система',l1:0,l2:4.488e9});
		core.regions.push({name:'Зона влияния Меркурия',l1:57909227 - getHillRadius(3.33022e23,57909227),l2:57909227 + getHillRadius(3.33022e23,57909227)});
		core.regions.push({name:'Зона влияния Венеры',l1:108208930 - getHillRadius(4.8675e24,108208930),l2:108208930 + getHillRadius(4.8675e24,108208930)});
		core.regions.push({name:'Зона влияния Земли',l1:149598261 - getHillRadius(5.97237e24,149598261),l2:149598261 + getHillRadius(5.97237e24,149598261)});
		core.regions.push({name:'Зона влияния Марса',l1:2.2794382e8 - getHillRadius(6.4171e23,2.2794382e8),l2:2.2794382e8 + getHillRadius(6.4171e23,2.2794382e8)});
		core.regions.push({name:'Пояс астероидов',l1:3.29e8,l2:4.79e8});
		core.regions.push({name:'Зона влияния Юпитера',l1:7.785472e8 - getHillRadius(1.8986e27,7.785472e8),l2:7.785472e8 + getHillRadius(1.8986e27,7.785472e8)});
		core.regions.push({name:'Зона влияния Сатурна',l1:1433449370 - getHillRadius(5.6836e26,1433449370),l2:1433449370 + getHillRadius(5.6836e26,1433449370)});
		core.regions.push({name:'Зона влияния Урана',l1:2876679082 - getHillRadius(8.6810e25,2876679082),l2:2876679082 + getHillRadius(8.6810e25,2876679082)});
		core.regions.push({name:'Пояс Койпера',l1:4.488e9,l2:7.48e9});
		core.regions.push({name:'Зона влияния Нептуна',l1:4503443661 - getHillRadius(1.0243e26,4503443661),l2:4503443661 + getHillRadius(1.0243e26,4503443661)});
		core.regions.push({name:'Рассеянный диск',l1:7.48e9,l2:1.421e10});
		core.regions.push({name:'Зона влияния Солнечной системы',l1:1.421e10,l2:1.496e13});
		core.regions.push({name:'Облако Оорта',l1:1.496e11,l2:2.992e13});
		core.regions.push({name:'Зона влияния Плутона',l1:5.9151e9 - getHillRadius(1.303e22,5.9151e9),l2:5.9151e9 + getHillRadius(1.303e22,5.9151e9)});
		uiText = [
			'Время x ',
			' мин / сек',
			' ч / сек',
			' д / сек',
			' км в пикселе',
			' км',
			'Межзвездное пространство',
			'Новый объект: ',
			'Быстрый переход — кнопка '
		];
		labels = new Labels();
		labels.stack.push(new Label('Самый быстрый способ попасть куда угодно&nbsp;— это двигаться со скоростью света в вакууме. 300 тысяч километров за&nbsp;одну секунду.',.1,900000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Каждый круг от&nbsp;Солнца идет <br />именно с&nbsp;такой скоростью. <br />Это максимум, разрешенный законами&nbsp;физики.',.4,1300000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Сторона квадрата на фоне — расстояние между Землей и Луной. Его свет проходит чуть больше, чем за секунду.',.6,1700000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Свет в тысячи раз быстрее, чем любой спутник, запущенный человеком.',.5,3000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Все, у чего есть масса, <br />двигается медленнее.',.4,4000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Кнопка вверх включает и выключает скорость света.',.3,5000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Размеры и расстояния <br />соответствуют реальным.',.4,60000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Просто они в несколько миллионов&nbsp;раз&nbsp;меньше.',.7,62000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Ближайшая к Солнцу планета&nbsp;— Меркурий. Судя по схеме, он должен уже быть где-то тут.<br /><img src=\"mercury.png\" width=\"600\"/>',.2,10000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Или тут.',.6,20000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Ближайшая к Солнцу планета. <br />Свет бы дошел сюда <br />за&nbsp;3&nbsp;минуты и&nbsp;13&nbsp;секунд.',.4,57600000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Обновлю схему.<br /><img src=\"mercury2.png\" width=\"600\"/>',.2,60000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Сто миллионов километров. <br />Можно попробовать представить это так: прямо сейчас сесть в машину и поехать со скоростью 114 километров в час.',.4,100000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Если остановиться ровно через 100 лет, то позади будут как раз 100 000 000 километров.',.7,101000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Проблема в том, что трудно представить, что такое 100 лет ехать за рулем.',.3,102000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Единственный параметр, который можно почувствовать — скорость 114 километров в час',.1,103000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Можно уменьшить время до понятных величин: например, неделя за рулем.',.4,104000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Но тогда скорость вырастает до бессмысленных 600 000 километров в час, и чтобы ее представить, нужны еще аналогии.',.7,105000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Это первая проблема: представление космических расстояний. На Земле нет ничего такого, с чем бы их можно было сравнить.',.2,120000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Самый быстрый транспорт, самые большие расстояния между континентами не помогут создать в голове образ ста миллионов километров.',.6,130000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('I',.1,500000000,'rgb(255,135,90)',false,false));
		labels.stack.push(new Label('Разница в масштабах — это главная проблема в представлении космических расстояний.',.2,501000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Человек может представить что-то, сравнивая с тем, с чем он уже имел дело.',.3,502000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Например, он может представить человека в два раза выше себя.',.4,503000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Представить человека в 100 раз выше уже намного сложнее.',.5,504000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Но можно сравнить его с высотой главного здания МГУ в Москве.',.6,505000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('На Земле нет ничего такого, с чем можно было бы сравнить пятьсот миллионов километров.',.2,507000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Можно сказать, что это число огромно, но невозможно представить насколько именно.',.3,508000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('"500 000 000 километров — это 500 лет за рулем при скорости 114 километров в&nbsp;час."',.4,509000000,'rgb(255,255,205)',false,false));
		labels.stack.push(new Label('Но как представить 500 лет за рулем?',.5,510000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('"500 000 000 километров — это неделя за&nbsp;рулем при скорости 3 600 000 километров в&nbsp;час."',.4,511000000,'rgb(255,255,205)',false,false));
		labels.stack.push(new Label('3 600 000 километров в час это как?',.5,512000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Кнопка S прячет и показывает орбиты спутников.',.2,779300000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('II',.1,900000000,'rgb(255,135,90)',false,false));
		labels.stack.push(new Label('Из-за разницы в масштабах невозможно найти на бумаге точную модель солнечной системы.',.2,901000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Либо соблюдаются пропорции планет, либо пропорции расстояний.',.3,902000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Чтобы нарисовать Солнечную систему, где Земля была бы размером в один миллиметр, пришлось бы брать лист бумаги, длиной 350 метров.',.4,903000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Если же уместить систему на листе формата А4, то Солнце было бы размером 0,1 мм, а Земля — в 10 раз меньше бактерии.',.5,904000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Человек не может представить насколько кит больше микроба.',.2,906000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Просто потому, что не может увидеть и того и другого одновременно в одном масштабе.',.6,907000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('III',.1,1500000000,'rgb(255,135,90)',false,false));
		labels.stack.push(new Label('Домотать до самой последней планеты Солнечной системы возможно за несколько минут.',.2,1501000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Возможно даже увидеть самую последюю карликовую планету, которая еще в два раза дальше от Солнца.',.3,1502000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Но возможно ли домотать до ближайшей к Солнцу звезды?',.4,1503000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Ответ: да*.',.5,1510000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('* Это займет некоторое** время.',.7,1518000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('** Месяцы.',.7,1526000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Впереди — карликовые планеты.',.2,4505000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('До следующего объекта около 40&nbsp;квадрилионов километров.',.2,10170000000,'rgb(255,255,255)',false,false));

		labels.stack.push(new Label('Кнопки = и - меняют масштаб. Если присмотреться, можно даже увидеть Международную Космическую Станцию.',.1,149200000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label(function(){
			var n = Math.round(core.timeScale*86400);
			return 'Кнопки ] и [ ускоряют и замедляют время. Сейчас за одну секунду <br />здесь проходит '+(n == 1 ? 'тоже одна' : n < 60 ? n : n < 3600 ? Math.round(n/60)+' мин' : n < 84600 ? Math.round(n/3600)+' ч' : Math.round(n/86400)+' д')+'.'
		},.65,150000000,'rgb(255,255,255)',false,true));
	    labels.stack.push(new Label(function(){
			var n = Math.round(667.1281904 - core.tt);
			return 'Двести миллионов километров. <br />' + (n > 0 ? 'Свет отстал на '+n+' с.' : '');
		},.4,200000000,'rgb(255,255,255)',false,true));
		//labels.stack.push(new Label('Спутники Марса намного ближе к нему, чем Луна к Земле, и с такой высоты не очень понятно, что там происходит.',.1,228000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Хорошая новость: <br />половину планет <br />мы уже посетили.',.2,240000000,'rgb(255,255,255)',false,false));
		//labels.stack.push(new Label('Плохая новость: <br />отсюда до Юпитера в два раза дальше, <br />чем от Солнца досюда.',.4,260000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Если закрыть браузер, то в следующий раз не придется начинать сначала.',.6,300000000,'rgb(255,255,255)',false,false));
		labels.stack.push(new Label('Быстрый переход в самую дальнюю открытую точку — цифра 9',.2,320000000,'rgb(255,255,255)',false,false));

		stuff.push(new Planet(0,48,'Солнце','Желтый карлик',0.696e6,0,'rgba(255,255,255,1)'));
		stuff.push(new Planet(1,49,'Меркурий','Планета земной группы',2439.7,57909227,'#ffbaa8'));
		stuff.push(new Planet(2,50,'Венера','Планета земной группы',6051.8,108208930,'#e3d084'));
		stuff.push(new Planet(3,51,'Земля','Планета земной группы',6371,149598261,'#5faeff', [
			new Moon('МКС',.08,6771,'#fff',0.0645),
			new Moon('Луна',1737.1,384399,'#aaa',27.321661)
			]));
		stuff.push(new Planet(4,52,'Марс','Планета земной группы',3389.5,2.2794382e8,'#ec6327',[
			new Moon('Фобос',11,9377,'#ae9a8e',.3189),
			new Moon('Деймос',7,23458,'#ae9a8e',1.26244)
			]));
		stuff.push(new Planet(6,53,'Юпитер','Газовый гигант',69911,7.785472e8,'#a78a71',[
			new Moon('Метида',23,127690,'#de532a',.295),
			new Moon('Адрастея',9,128690,'#de532a',.2979),
			new Moon('Амальтея',88,181366,'#de532a',.4982),
			new Moon('Фива',50,221889,'#de532a',.6745),
			new Moon('Ио',1821.3,421700,'#ffee7c',1.769137786),
			new Moon('Европа',1560.8,671100,'#a2805b',3.551),
			new Moon('Ганимед',2634.1,1070400,'#a69b87',7.15455296),
			new Moon('Каллисто',2410.3,1882700,'#4e7f7b',16.6890184),
			new Moon('Фемисто',4,7393216,'#776a60',129.87),
			new Moon('Леда',8,11187781,'#776a60',240.82),
			new Moon('Гималия',85,11451971,'#999',250.23),
			new Moon('Листея',18,11740560,'#888',259.89),
			new Moon('Элара',43,11778034,'#776a60',257.62),
			new Moon('Дия',2,12570424,'#776a60',287.93),
			new Moon('Карпо',1.5,17144873,'#776a60',458.62),
			new Moon('S/2003 J 12',.5,17739539,'#776a60',-482.69),
			new Moon('Эвпорие',1,19088434,'#776a60',-538.78),
			new Moon('S/2003 J 3',1,19621780,'#776a60',-561.52),
			new Moon('S/2003 J 18',1,19812577,'#776a60',-569.73),
			new Moon('S/2011 J 1',.5,20155290,'#776a60',-582.22),
			new Moon('S/2010 J 2',.5,20307150,'#776a60',-588.36),
			new Moon('Тельксиное',1,20453753,'#776a60',-597.61),
			new Moon('Эванте',1.5,20464854,'#776a60',-598.09),
			new Moon('Гелике',2,20540266,'#776a60',-601.40),
			new Moon('Ортозие',1,20567971,'#776a60',-602.62),
			new Moon('Иокасте',2.5,20722566,'#776a60',-609.43),
			new Moon('S/2003 J 16',1,20743779,'#776a60',-610.36),
			new Moon('Праксидике',3.5,20823948,'#776a60',-613.90),
			new Moon('Гарпалике',2,21063814,'#776a60',-624.54),
			new Moon('Мнеме',1,21129786,'#776a60',-627.48),
			new Moon('Гермиппе',2,21182086,'#776a60',-629.81),
			new Moon('Тионе',2,21405570,'#776a60',-639.80),
			new Moon('Ананке',14,21454952,'#776a60',-640.38),
			new Moon('Герсе',1,22134306,'#776a60',-672.75),
			new Moon('Этне',1.5,22285161,'#776a60',-679.64),
			new Moon('Кале',1,22409207,'#776a60',-685.32),
			new Moon('Тайгете',2.5,22438648,'#776a60',-686.67),
			new Moon('S/2003 J 19',1,22709061,'#776a60',-699.12),
			new Moon('Халдене',2,22713444,'#776a60',-699.33),
			new Moon('S/2003 J 15',1,22720999,'#776a60',-699.68),
			new Moon('S/2003 J 10',1,22730813,'#776a60',-700.13),
			new Moon('S/2003 J 23',1,22739654,'#776a60',-700.54),
			new Moon('Эриноме',1.5,22986266,'#776a60',-711.96),
			new Moon('Аойде',2,23044175,'#776a60',-714.66),
			new Moon('Каллихоре',1,23111823,'#776a60',-717.81),
			new Moon('Калике',2.5,23180773,'#776a60',-721.02),
			new Moon('Карме',23,23197992,'#776a60',-763.95),
			new Moon('Каллирое',4.5,23214986,'#776a60',-727.11),
			new Moon('Эвридоме',1.5,23230858,'#776a60',-723.36),
			new Moon('Пазифее',1,23307318,'#776a60',-726.93),
			new Moon('S/2010 J 1',1,23314335,'#776a60',-722.83),
			new Moon('S/2011 J 2',.5,23329710,'#776a60',-725.06),
			new Moon('Коре',1,23345093,'#776a60',-776.02),
			new Moon('Киллене',1,23396269,'#776a60',-731.10),
			new Moon('Эвкеладе',2,23483694,'#776a60',-735.20),
			new Moon('S/2003 J 4',1,23570790,'#776a60',-739.29),
			new Moon('Пасифе',30,23609042,'#666',-739.80),
			new Moon('Гегемоне',1.5,23702511,'#776a60',-745.50),
			new Moon('Архе',1.5,23717051,'#776a60',-746.19),
			new Moon('Исоное',2,23800647,'#776a60',-750.13),
			new Moon('S/2003 J 9',.5,23857808,'#776a60',-752.84),
			new Moon('S/2003 J 5',2,23973926,'#776a60',-758.34),
			new Moon('Синопе',19,24057865,'#555',-739.33),
			new Moon('Спонде',1,24252627,'#776a60',-771.60),
			new Moon('Автоное',2,24264445,'#776a60',-772.17),
			new Moon('Мегаклите',2.5,24687239,'#776a60',-792.44),
			new Moon('S/2003 J 2',1,30290846,'#776a60',-1077.02)
			],[
			new Ring(182000,226000,'rgba(255,250,235,.008)'),
			new Ring(129000,182000,'rgba(255,250,235,.01)'),
			new Ring(122500,129000,'rgba(255,250,235,.03)'),
			new Ring(92000,122500,'rgba(255,250,235,.01)')
			]));
		stuff.push(new Planet(7,54,'Сатурн','Газовый гигант',58232,1433449370,'#d2b179',[
			new Moon('S/2009 S 1',.15,117000,'#bb9c67',0.47),
			new Moon('Пан',14.1,133584,'#bb9c67',0.57505),
			new Moon('Дафнис',3.8,136505,'#bb9c67',0.59408),
			new Moon('Атлас',15.1,137670,'#bb9c67',0.60169),
			new Moon('Прометей',43.1,139380,'#bb9c67',0.61299),
			new Moon('Пандора',40.7,141720,'#bb9c67',0.62850),
			new Moon('Эпиметей',58.1,151422,'#bb9c67',0.69433),
			new Moon('Янус',89.5,151472,'#bb9c67',0.69466),
			new Moon('Эгион',.25,167500,'#bb9c67',0.80812),
			new Moon('Мимас',198,185539,'#70747d',0.942422),
			new Moon('Мефона',.01,194440,'#bb9c67',1.00957),
			new Moon('Анфа',0.0035,197700,'#bb9c67',1.03650),
			new Moon('Паллена',0.025,212280,'#bb9c67',1.15375),
			new Moon('Энцелад',252,237950,'#9c8a7c',1.370218),
			new Moon('Тефия',531,294619,'#7c7761',1.887802),
			new Moon('Телесто',4.705,294619,'#bb9c67',1.887802),
			new Moon('Калипсо',3.15,294619,'#bb9c67',1.887802),
			new Moon('Полидевк',0.015,377220,'#bb9c67',2.736915),
			new Moon('Диона',561.5,377415,'#9fa09a',2.736915),
			new Moon('Елена',12.23,377440,'#bb9c67',2.736915),
			new Moon('Рея',763.5,527108,'#8b845a',4.518212),
			new Moon('Титан',2575,1221930,'#e4c663',15.94542),
			new Moon('Гиперион',135,1481010,'#beac94',21.27661),
			new Moon('Япет',735,3560854,'#707578',79),
			new Moon('Кивиок',8,11294800,'#bb9c67',448.16),
			new Moon('Иджирак',6,11355316,'#bb9c67',451.77),
			new Moon('Феба',107,12869700,'#bb9c67',-545.09),
			new Moon('Палиак',11,15103400,'#bb9c67',692.98),
			new Moon('Скади',4,15672500,'#bb9c67',-732.52),
			new Moon('Альбиорикс',16,16266700,'#bb9c67',774.58),
			new Moon('S/2007 S 2',3,16560000,'#bb9c67',-792.96),
			new Moon('Бефинд',3,17153520,'#bb9c67',838.77),
			new Moon('Эррипо',5,17236900,'#bb9c67',844.89),
			new Moon('Сколл',3,17473800,'#bb9c67',-862.37),
			new Moon('Сиарнак',20,17776600,'#bb9c67',884.88),
			new Moon('Таркек',3.5,17910600,'#bb9c67',894.86),
			new Moon('S/2004 S 13',3,18056300,'#bb9c67',-905.85),
			new Moon('Грейп',3,18065700,'#bb9c67',-906.56),
			new Moon('Гирроккин',4,18168300,'#bb9c67',-914.29),
			new Moon('Ярнсакса',3,18556900,'#bb9c67',-943.78),
			new Moon('Тарвос',7.5,18562800,'#bb9c67',944.23),
			new Moon('Мундильфари',3.5,18725800,'#bb9c67',-956.70),
			new Moon('S/2006 S 1',3,18930200,'#bb9c67',-972.41),
			new Moon('S/2004 S 17',2,19099200,'#bb9c67',-985.45),
			new Moon('Бергельмир',3,19104000,'#bb9c67',-985.83),
			new Moon('Нарви',3.5,19395200,'#bb9c67',-1008.45),
			new Moon('Суттунг',3.5,19579000,'#bb9c67',-1022.82),
			new Moon('Хати',3,19709300,'#bb9c67',-1033.05),
			new Moon('S/2004 S 12',2.5,19905900,'#bb9c67',-1048.54),
			new Moon('Фарбаути',2.5,19984800,'#bb9c67',-1054.78),
			new Moon('Трюм',3.5,20278100,'#bb9c67',-1078.09),
			new Moon('Эгир',3,20482900,'#bb9c67',-1094.46),
			new Moon('S/2007 S 3',2.5,20518500,'#bb9c67',-1100),
			new Moon('Бестла',3.5,20570000,'#bb9c67',-1101.45),
			new Moon('S/2004 S 7',3,20576700,'#bb9c67',-1101.99),
			new Moon('S/2006 S 3',3,21076300,'#bb9c67',-1142.37),
			new Moon('Фенрир',2,21930644,'#bb9c67',-1212.53),
			new Moon('Сурт',3,22288916,'#bb9c67',-1242.36),
			new Moon('Кари',3.5,22321200,'#bb9c67',-1245.06),
			new Moon('Имир',9,22429673,'#bb9c67',-1254.15),
			new Moon('Логи',3,22984322,'#bb9c67',-1300.95),
			new Moon('Форньот',3,24504879,'#bb9c67',-1432.16)
			],[
			new Ring(4000000,13000000,'rgba(235,206,186,.004)'),
			new Ring(180000,480000,'rgba(235,206,186,.007)'),
			new Ring(166000,175000,'rgba(235,206,186,.009)'),
			new Ring(140210,140510,'rgba(235,206,186,.08)'),
			new Ring(136520,136780,'rgba(245,215,181,.3)'),
			new Ring(133732,136490,'rgba(245,215,181,.25)'),
			new Ring(120119,133407,'rgba(245,215,181,.2)'),
			new Ring(117880,119881,'rgba(235,206,186,.1)'),
			new Ring(87635,117480,'rgba(245,215,181,.15)'),
			new Ring(77850,87465,'rgba(235,206,186,.1)'),
			new Ring(74500,77750,'rgba(235,206,186,.05)')
			]));
		stuff.push(new Planet(8,55,'Уран','Ледяной гигант',25362,2876679082,'#bee1e1',[
			new Moon('Корделия',21,49751,'#596b72',0.335034),
			new Moon('Офелия',23,53764,'#596b72',0.376400),
			new Moon('Бианка',27,59165,'#596b72',0.434579),
			new Moon('Крессида',41,61766,'#596b72',0.463570),
			new Moon('Дездемона',34,62658,'#596b72',0.473650),
			new Moon('Джульетта',53,64360,'#596b72',0.493065),
			new Moon('Порция',70,66097,'#596b72',0.513196),
			new Moon('Розалинда',36,69927,'#596b72',0.558460),
			new Moon('Купидон',9,74800,'#596b72',0.618),
			new Moon('Белинда',45,75255,'#596b72',0.623527),
			new Moon('Пердита',15,76420,'#596b72',0.638),
			new Moon('Пак',81,86004,'#596b72',0.761833),
			new Moon('Маб',12.5,97734,'#596b72',0.923),
			new Moon('Миранда',235.8,129390,'#8b8d94',1.413479),
			new Moon('Ариэль',578.9,191020,'#b59e91',2.520379),
			new Moon('Умбриэль',584.7,266300,'#5a5a5a',4.144177),
			new Moon('Титания',788.4,435910,'#b8aba1',8.705872),
			new Moon('Оберон',761.4,583520,'#7f6b6e',13.463239),
			new Moon('Франциско',11,4276000,'#596b72',-266.56),
			new Moon('Калибан',36,7230000,'#596b72',-579.50),
			new Moon('Стефано',16,8002000,'#596b72',-676.50),
			new Moon('Тринкуло',9,8571000,'#596b72',-758.10),
			new Moon('Сикоракса',83,12179000,'#596b72',-1283.4),
			new Moon('Маргарита',10,14345000,'#596b72',1694.8),
			new Moon('Просперо',25,16418000,'#596b72',-1992.8),
			new Moon('Сетебос',24,17459000,'#596b72',-2202.3),
			new Moon('Фердинанд',10,20900000,'#596b72',-2823.4)
			],[
			new Ring(51149,51230,'rgba(235,255,255,.5)'),
			new Ring(50023,50025,'rgba(203,249,187,.2)'),
			new Ring(45661,45671,'rgba(203,249,187,.3)'),
			new Ring(44718,44728,'rgba(203,249,187,.3)'),
			new Ring(42570,42575,'rgba(203,249,187,.1)'),
			new Ring(42234,42239,'rgba(203,249,187,.1)'),
			new Ring(41837,41839,'rgba(203,249,187,.1)'),
			new Ring(26840,41350,'rgba(203,249,187,.04)')
			]));
		stuff.push(new Planet(9,56,'Нептун','Ледяной гигант',24622,4503443661,'#4379d1',[
			new Moon('Наяда',33,48227,'#4c9ce7',0.294),
			new Moon('Таласса',41,50074,'#4996df',0.311),
			new Moon('Деспина',75,52526,'#478fd4',0.335),
			new Moon('Галатея',88,61953,'#4486c8',0.429),
			new Moon('Ларисса',97,73548,'#417dba',0.555),
			new Moon('S/2004 N 1',10,105300,'#3d73ab',0.936),
			new Moon('Протей',210,117646,'#39699c',1.122),
			new Moon('Тритон',1352.6,354759,'#a29b93',-5.877),
			new Moon('Нереида',170,5513818,'#32547d',360.13),
			new Moon('Галимеда',31,16611000,'#2e4a6e',-1879.08),
			new Moon('Сао',22,22228000,'#2b4160',2912.72),
			new Moon('Лаомедея',21,23567000,'#283854',3171.33),
			new Moon('Псамафа',20,48096000,'#253149',-9074.30),
			new Moon('Несо',30,49285000,'#232b3f',-9740.73)
			],[
			new Ring(62932,62982,'rgba(187,203,249,.2)'),
			new Ring(57200,57300,'rgba(187,203,249,.15)'),
			new Ring(53200,57200,'rgba(187,203,249,.05)'),
			new Ring(53100,53200,'rgba(187,203,249,.1)'),
			new Ring(40900,42900,'rgba(187,203,249,.02)')
			]));
		stuff.push(new Planet(5,67,'Церера','Карликовая планета',463.5,413767000,'#88847d'));
		stuff.push(new Planet(10,80,'Плутон','Карликовая планета',1187,5.9151e9,'#e5b994',[
			new Moon('Харон',606,19571,'#bea69a',6.3872304),
			new Moon('Стикс',5,42656,'#bfbfca',20.16155),
			new Moon('Никта',20,48694,'#bfbed0',24.85463),
			new Moon('Цербер',6,57783,'#bfbfca',32.16756),
			new Moon('Гидра',19,64738,'#bfbfca',38.202)
			]));
		stuff.push(new Planet(11,72,'Хаумеа','Карликовая планета',650,6.465e9,'#aaa',[
			new Moon('Намака',85,25657,'#999',18.2783),
			new Moon('Хииака',155,49880,'#777',49.462)
			]));
		stuff.push(new Planet(12,77,'Макемаке','Карликовая планета',715,6.839e9,'#faa'));
		stuff.push(new Planet(13,69,'Эрида','Карликовая планета',1163,10.166e9,'#fda',[
			new Moon('Дисномия',158,37430,'#db8',17.772)
			]));

		stuff.push(new Planet(14,88,'Проксима Центавра','Красный карлик',98135.999,4.02e13,'#d87'));
		stuff.push(new Planet(15,65,'Альфа Центавра A','Желтый карлик',853992,4.13e13,'#ffc'));
		stuff.push(new Planet(16,66,'Альфа Центавра B','Оранжевый карлик',602040,4.13e13 + 6000000,'#Fcb'));
		stuff.push(new Planet(17,71,'Бетельгейзе','Красный сверхгигант',0.696e9,6.08e15,'#f65'));

		sunshine = new Sunshines(stuff[0]);
	}
}