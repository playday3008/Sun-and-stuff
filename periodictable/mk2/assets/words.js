function getWords(){
	return {
		menuHeader: {
			ru: 'Периодическая таблица<br>химических элементов<br>и карта изотопов',
			en: 'Periodic table<br>of&nbsp;elements<br>and chart of isotopes'
		},
		axisLabels: {
			periodic: {
				g: {
					ru:'Группы',
					en:'Groups'
				},
				p: {
					ru:'Периоды',
					en:'Periods'
				}
			},
			iso: {
				z: {
					ru: 'Протоны',
					en: 'Protons'
				},
				n: {
					ru: 'Нейтроны',
					en: 'Neutrons'
				}
			}
		},
		modes: {
			clean: {
				header: {
					ru: 'Периодическая таблица\nхимических элементов',
					en: 'Periodic table\nof elements'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'Без лишнего',
					en: 'Clean'
				}
			},
			groups: {
				header: {
					ru: 'Семейства\nэлементов',
					en: 'Elements\nclassification'
				},
				legend: {
					ru: '<p>Учёные придумали объединять элементы с близкими химическими свойствами в семейства. Вариантов такого разделения несколько, но для химика, который занят делом, важнее свойства, а не классификация.</p><ul class="dual"><li><div class="colorSample" style="background: #916af7;"></div>Щелочные металлы</li><li><div class="colorSample" style="background: #464cde;"></div>Щелочноземельные металлы</li><li><div class="colorSample" style="background: #3682dc;"></div>Лантаноиды</li><li><div class="colorSample" style="background: #0d6cb9;"></div>Актиноиды</li><li><div class="colorSample" style="background: #047e90;"></div>Переходные металлы</li><li><div class="colorSample" style="background: #5dbb63;"></div>Постпереходные металлы</li><li><div class="colorSample" style="background: #c5f563;"></div>Полуметаллы</li><li><div class="colorSample" style="background: #fbf695;"></div>Неметаллы</li><li><div class="colorSample" style="background: #fb6a36;"></div>Галогены</li><li><div class="colorSample" style="background: #3a3335;"></div>Инертные газы</li><li><div class="colorSample" style="background: #efeee4;"></div>Радиоактивный ужас</li></ul>',
					en: '<p>Scientists often group elements according to their chemical properties. There are several types of classification, but for real chemists properties are more important than names.</p><ul class="dual"><li><div class="colorSample" style="background: #916af7;"></div>Alkali metals</li><li><div class="colorSample" style="background: #464cde;"></div>Alkaline metals</li><li><div class="colorSample" style="background: #3682dc;"></div>Lanthanides</li><li><div class="colorSample" style="background: #0d6cb9;"></div>Actinides</li><li><div class="colorSample" style="background: #047e90;"></div>Transition metals</li><li><div class="colorSample" style="background: #5dbb63;"></div>Post-transition metals</li><li><div class="colorSample" style="background: #c5f563;"></div>Metalloids</li><li><div class="colorSample" style="background: #fbf695;"></div>Non-metals</li><li><div class="colorSample" style="background: #fb6a36;"></div>Halogens</li><li><div class="colorSample" style="background: #3a3335;"></div>Noble gases</li><li><div class="colorSample" style="background: #efeee4;"></div>Radioactive hell</li></ul>'
				},
				menu: {
					ru: 'Семейства элементов',
					en: 'Classes'
				}
			},
			electrons: {
				header: {
					ru: 'Электронная\nконфигурация',
					en: 'Electron\nconfiguration'
				},
				legend: {
					ru: '<p>Электроны не&nbsp;крутятся вокруг ядра атома, как на&nbsp;картинках в&nbsp;школе, а&nbsp;существуют вокруг него, согласно волновой функции вероятности положения. Короче, они занимают места вокруг атома, начиная с&nbsp;самых козырных. Те, кто&nbsp;сидят на&nbsp;неудобной галёрке обычно определяют химические свойства элемента. У разных элементов разные галёрки:</p><ul><li><div class="colorSample" style="background: #ffd054;"></div>s</li><li><div class="colorSample" style="background: #f54e2c;"></div>p</li><li><div class="colorSample" style="background: #8c35f1;"></div>d</li><li><div class="colorSample" style="background: #13ef91;"></div>f</li></ul>',
					en: '<p>Electrons don\'t spin around nucleus, as you probably saw in the pictures. They exist near it, according to their position wave functions. In a nutshell, they are taking their seats, starting with most classy ones. Electrons on the most crappy seats basically define chemical properties of the element. There are different crappy seats for different elements:</p><ul><li><div class="colorSample" style="background: #ffd054;"></div>s</li><li><div class="colorSample" style="background: #f54e2c;"></div>p</li><li><div class="colorSample" style="background: #8c35f1;"></div>d</li><li><div class="colorSample" style="background: #13ef91;"></div>f</li></ul>'
				},
				menu: {
					ru: 'Электронная конфигурация',
					en: 'Electrons'
				}
			},
			elneg: {
				header: {
					ru: 'Электро-\nотрицательность',
					en: 'Electro-\nnegativity'
				},
				legend: {
					ru: '<p>Показывает то, насколько атом вещества хочет отобрать у других элементов их электроны. Это одно из&nbsp;свойств атома, из-за&nbsp;которого таблицу называют периодической. Электроотрицательность растет от&nbsp;левого края к&nbsp;правому — периодами, а не&nbsp;от&nbsp;начала таблицы к&nbsp;концу. У гелия, неона и аргона ее не&nbsp;пишут, потому что эти элементы ничего не&nbsp;хотят ни&nbsp;у&nbsp;кого отобрать и ничего никому не&nbsp;собираются отдавать.</p>',
					en: '<p>Shows how badly an atom wants to take some other elemet\'s electrons. It is one of many properties, which makes the periodic table actually periodic. Electronegativity increases from left to right, not from the first element to the last one. There is no electronegativity for Helium, Neon and Argon because they don\'t give anything to anyone and don\'t need anything either.</p>'
				},
				menu: {
					ru: 'Электроотрицательность',
					en: 'Electronegativity'
				}
			},
			ionization: {
				header: {
					ru: 'Энергия\nионизации,\nкДж/моль',
					en: 'Ionization\nenergy,\nkJ/mol'
				},
				legend: {
					ru: '<p>Показывает сколько нужно затратить сил, чтобы отковырять электрон с&nbsp;самого неудобного места вокруг атома. Как и электроотрицательность, подчиняется переодическому закону.</p>',
					en: 'Show how hard it is to rip an electron from the most crappy seat. It obeys periodic law as well as electronegativity.'
				},
				menu: {
					ru: 'Энергия ионизации',
					en: 'Ionization energy'
				}
			},
			oxy: {
				header: {
					ru: 'Степени\nокисления',
					en: 'Oxydation\nstates'
				},
				legend: {
					ru: '<p>Показывает во сколько связей одновременно может вступать вещество. Кислород со степенью окисления –2 тусит сразу с двумя атомами водорода, у каждого из которых +1. Всем хорошо, когда 0 в сумме. Так получается молекула воды, H<sub>2</sub>O.</p>',
					en: '<p>Shows how many connections can atom support simultaneously. Oxygen in oxydation state –2 hangs out with two Hydrogen atoms, which have +1 each. Everybody happy when sum is 0. And we got water this way, H<sub>2</sub>O.</p>'
				},
				menu: {
					ru: 'Степени окисления',
					en: 'Oxydation states'
				}
			},
			radius: {
				header: {
					ru: 'Радиус атома\nв пикометрах',
					en: 'Atomic radius\nin picometers'
				},
				legend: {
					ru: '<p>Атом нельзя измерить линейкой, у&nbsp;него нет чётких границ. Есть разные способы прикинуть его&nbsp;размер, например посмотрев как&nbsp;далеко атомы друг от&nbsp;друга оказываются в&nbsp;молекулах или как&nbsp;здесь, через математическую модель.</p>',
					en: ''
				},
				menu: {
					ru: 'Радиус атома',
					en: 'Atomic radius'
				}
			},
			affinity: {
				header: {
					ru: 'Энергия сродства\nк электрону',
					en: 'Electron\naffinity'
				},
				legend: {
					ru: '<p>Показывает сколько энергии выделится или потратится, если подсадить атому лишний электрон. Измеряется в&nbsp;килоджоулях на&nbsp;моль вещества. Как и&nbsp;энергия ионизации, подчиняется переодическому закону.</p>',
					en: ''
				},
				menu: {
					ru: 'Сродство к&nbsp;электрону',
					en: 'Electron affinity'
				}
			},
			melt: {
				header: {
					ru: 'Температура\nплавления, С°',
					en: 'Melting point, С°'
				},
				legend: {
					ru: '<p>Температура, при&nbsp;которой в&nbsp;нормальном атмосферном давлении вещество перестаёт быть твёрдым и&nbsp;становится жидким. Можно заметить, что даже это свойство подчиняется переодическому закону, хотя и&nbsp;не&nbsp;так&nbsp;явно, как электроотрицательность или энергия ионизации.</p>',
					en: ''
				},
				menu: {
					ru: 'Температура плавления',
					en: 'Melting'
				}
			},
			boil: {
				header: {
					ru: 'Температура\nкипения, С°',
					en: 'Boiling point, С°'
				},
				legend: {
					ru: '<p>Температура, при&nbsp;которой в&nbsp;нормальном атмосферном давлении жидкое вещество вскипает и&nbsp;становится газом. Никаких неожиданностей относительно температуры плавления, хотя лидеры и&nbsp;меняются.</p>',
					en: ''
				},
				menu: {
					ru: 'Температура кипения',
					en: 'Boiling'
				}
			},
			discovery: {
				header: {
					ru: 'Год\nоткрытия',
					en: 'Year\nof discovery'
				},
				legend: {
					ru: '<p>В&nbsp;древности было известно всего около десятка настоящих элементов. Плюс куча ненастоящих, вроде света, угля или теплорода. Вся нормальная движуха началась только в&nbsp;18&nbsp;веке. При&nbsp;Менделееве — изобретателе этой таблицы, было известно 63&nbsp;элемента. Сейчас экспериментально получены&nbsp;118.</p>',
					en: ''
				},
				menu: {
					ru: 'Год открытия',
					en: 'Year of discovery'
				}
			},
			sAbu: {
				header: {
					ru: 'Содержание\nв Солнечной системе',
					en: 'Solar system\nabundance'
				},
				legend: {
					ru: '<p>99,9% всего, что есть в&nbsp;Солнечной системе находится в&nbsp;самом Солнце. Таблица раскрашена логирифмически. Это значит, что углерод раза&nbsp;в&nbsp;два темнее бора, хотя углерода в&nbsp;миллионы раз больше. Так бывает, когда водорода 75%, гелия 7%, а всего остального в&nbsp;таких масштабах почти что нет. Подписано количество атомов вещества из:</p><ul class="nobulls"><li>% — сотни других</li><li>‰ — тысячи</li><li>ppm — миллиона</li><li>ppb — миллиарда</li><li>ppt — триллиона</li></ul>',
					en: ''
				},
				menu: {
					ru: 'В Солнечной системе',
					en: 'In Solar system'
				}
			},
			cAbu: {
				header: {
					ru: 'Содержание\nв земной коре',
					en: 'Earth\'s crust\nabundance'
				},
				legend: {
					ru: '<p>Внутри Земли всё не так, как в&nbsp;Солнечной системе. Большая часть всего — оксиды, в&nbsp;основном кремния и алюминия: полевые шпаты, кварц, корунд и&nbsp;прочие названия, известные только геологам.</p><ul class="nobulls"><li>% — частей на сотню</li><li>‰ — тысячу</li><li>ppm — миллион</li><li>ppb — миллиард</li><li>ppt — триллион</li></ul>',
					en: ''
				},
				menu: {
					ru: 'В земной коре',
					en: 'In Earth\'s crust'
				}
			},
			amass: {
				header: {
					ru: 'Атомная масса',
					en: 'Atomic mass'
				},
				legend: {
					ru: '<p>Ядра атомов, не&nbsp;считая экзотические, состоят из&nbsp;протонов и&nbsp;нейтронов. С&nbsp;массой атомов всё просто — чем больше в&nbsp;ядрах протонов и&nbsp;нейтронов, тем больше масса. Одна единица — это одна&nbsp;двенадцатая массы ядра углерода-12 (можете найти его на&nbsp;карте изотопов).</p>',
					en: ''
				},
				menu: {
					ru: 'Атомная масса',
					en: 'Atomic mass'
				}
			},
			halflife: {
				header: {
					ru: 'Период\nполураспада\nсамых стабильных\nизотопов',
					en: 'Halflife\nof most stable\nisotopes'
				},
				isoheader: {
					ru: 'Период\nполураспада\nизотопов',
					en: 'Half-life\nof isotopes'
				},
				legend: {
					ru: '<p>Период полураспада. За это время из&nbsp;килограмма вещества останется только полкило, а&nbsp;остальное превратится в&nbsp;радиацию и продукты распада. Если рядом с&nbsp;вами что-то с&nbsp;периодом около миллиона лет, то просто уходите, если несколько секунд — вы, вероятно, уже мертвы.</p>',
					en: ''
				},
				menu: {
					ru: 'Период полураспада',
					en: 'Half-life'
				}
			},
			decay: {
				header: {
					ru: 'Главный тип распада',
					en: 'Main decay mode'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'Распад',
					en: 'Decay'
				}
			},
			binding: {
				header: {
					ru: 'Энергия связи ядра, кэВ',
					en: 'Binding energy, keV'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'Связь',
					en: 'Binding'
				}
			},
			excess: {
				header: {
					ru: 'Дефект массы, МэВ',
					en: 'Mass excess, MeV'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'Дефект массы',
					en: 'Mass excess'
				}
			},
			nsep: {
				header: {
					ru: 'Энергия отделения нейтрона, МэВ',
					en: 'Neutron separation energy, MeV'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'n - отделение',
					en: 'n - separation'
				}
			},
			psep: {
				header: {
					ru: 'Энергия отделения протона, МэВ',
					en: 'Proton separation energy, MeV'
				},
				legend: {
					ru: '',
					en: ''
				},
				menu: {
					ru: 'p - отделение',
					en: 'p - separation'
				}
			}
		},
		layouts: {
			full: {
				ru: 'Нормально',
				en: 'Full'
			},
			minimal: {
				ru: 'Книжно',
				en: 'Book'
			},
			list: {
				ru: 'Кирпичом',
				en: 'Brick'
			},
			isotopes: {
				ru: 'Изотопы',
				en: 'Isotopes'
			},
			// isosmall: {
			// 	ru: 'Изотопы мелко',
			// 	en: 'Tiny isotopes'
			// },
			isocut: {
				ru: 'Изотопы кучей',
				en: 'Piled isotopes'
			}
		},
		menu: {
			layout: {
				ru: 'Вид',
				en: 'Layout'
			},
			mode: {
				ru: 'Свойства',
				en: 'Properties'
			}
		},
		measures: {
			time: {
				ns: {
					ru: 'нс',
					en: 'ns'
				},
				mks: {
					ru: 'мкс',
					en: 'μs'
				},
				ms: {
					ru: 'мс',
					en: 'ms'
				},
				s: {
					ru: 'сек',
					en: 's'
				},
				m: {
					ru: 'мин',
					en: 'm'
				},
				h: {
					ru: 'ч',
					en: 'h'
				},
				d: {
					ru: 'дн',
					en: 'd'
				},
				y: {
					ru: ['г','л'],
					en: ['y', 'y']
				},
				ky: {
					ru: 'тыс л',
					en: 'thsd y'
				},
				my: {
					ru: 'млн л',
					en: 'mil y'
				},
				by: {
					ru: 'млрд л',
					en: 'bil y'
				},
				ty: {
					ru: 'трлн л',
					en: 'tril y'
				},
				quady: {
					ru: 'квад л',
					en: 'quad y'
				},
				quinty: {
					ru: 'квин л',
					en: 'quin y'
				},
				sexty: {
					ru: 'скст л',
					en: 'sext y'
				},
				septy: {
					ru: 'септ л',
					en: 'sept y'
				},
			}
		},
		specialNames: {
			mononeutron: {
				ru: 'Мононейтрон',
				en: 'Mononeutron'
			},
			protium: {
				ru: 'Протон',
				en: 'Proton'
			},
			deuterium: {
				ru: 'Дейтрон',
				en: 'Deuteron'
			},
			tritium: {
				ru: 'Тритон',
				en: 'Triton'
			},
			alpha: {
				ru: 'α-частица',
				en: 'α-particle'
			}
		},
		names: [
			{ru: 'Водород', en: 'Hydrogen'},
			{ru: 'Гелий', en: 'Helium'},
			{ru: 'Литий', en: 'Lithium'},
			{ru: 'Бериллий', en: 'Berillium'},
			{ru: 'Бор', en: 'Boron'},
			{ru: 'Углерод', en: 'Carbon'},
			{ru: 'Азот', en: 'Nitrogen'},
			{ru: 'Кислород', en: 'Oxygen'},
			{ru: 'Фтор', en: 'Fluorine'},
			{ru: 'Неон', en: 'Neon'},
			{ru: 'Натрий', en: 'Sodium'},
			{ru: 'Магний', en: 'Magnesium'},
			{ru: 'Алюминий', en: 'Aluminium'},
			{ru: 'Кремний', en: 'Silicon'},
			{ru: 'Фосфор', en: 'Phosphorous'},
			{ru: 'Сера', en: 'Sulfur'},
			{ru: 'Хлор', en: 'Chlorine'},
			{ru: 'Аргон', en: 'Argon'},
			{ru: 'Калий', en: 'Potassium'},
			{ru: 'Кальций', en: 'Calcium'},
			{ru: 'Скандий', en: 'Scandium'},
			{ru: 'Титан', en: 'Titanium'},
			{ru: 'Ванадий', en: 'Vanadium'},
			{ru: 'Хром', en: 'Chromium'},
			{ru: 'Марганец', en: 'Manganese'},
			{ru: 'Железо', en: 'Iron'},
			{ru: 'Кобальт', en: 'Cobalt'},
			{ru: 'Никель', en: 'Nickel'},
			{ru: 'Медь', en: 'Copper'},
			{ru: 'Цинк', en: 'Zinc'},
			{ru: 'Галлий', en: 'Gallium'},
			{ru: 'Германий', en: 'Germanium'},
			{ru: 'Мышьяк', en: 'Arsenic'},
			{ru: 'Селен', en: 'Selenium'},
			{ru: 'Бром', en: 'Bromine'},
			{ru: 'Криптон', en: 'Krypton'},
			{ru: 'Рубидий', en: 'Rubidium'},
			{ru: 'Стронций', en: 'Strontium'},
			{ru: 'Иттрий', en: 'Yttrium'},
			{ru: 'Цирконий', en: 'Zirconium'},
			{ru: 'Ниобий', en: 'Niobium'},
			{ru: 'Молибден', en: 'Molybdenum'},
			{ru: 'Технеций', en: 'Technetium'},
			{ru: 'Рутений', en: 'Ruthenium'},
			{ru: 'Родий', en: 'Rhodium'},
			{ru: 'Палладий', en: 'Palladium'},
			{ru: 'Серебро', en: 'Silver'},
			{ru: 'Кадмий', en: 'Cadmium'},
			{ru: 'Индий', en: 'Indium'},
			{ru: 'Олово', en: 'Tin'},
			{ru: 'Сурьма', en: 'Antimony'},
			{ru: 'Теллур', en: 'Tellurium'},
			{ru: 'Йод', en: 'Iodine'},
			{ru: 'Ксенон', en: 'Xenon'},
			{ru: 'Цезий', en: 'Caesium'},
			{ru: 'Барий', en: 'Barium'},
			{ru: 'Лантан', en: 'Lanthanum'},
			{ru: 'Церий', en: 'Cerium'},
			{ru: 'Празеодим', en: 'Praseodymium'},
			{ru: 'Неодим', en: 'Neodymium'},
			{ru: 'Прометий', en: 'Promethium'},
			{ru: 'Самарий', en: 'Samarium'},
			{ru: 'Европий', en: 'Europium'},
			{ru: 'Гадолиний', en: 'Gadolinium'},
			{ru: 'Тербий', en: 'Therbium'},
			{ru: 'Диспрозий', en: 'Dysprosium'},
			{ru: 'Гольмий', en: 'Holmium'},
			{ru: 'Эрбий', en: 'Erbium'},
			{ru: 'Тулий', en: 'Thulium'},
			{ru: 'Иттербий', en: 'Ytterbium'},
			{ru: 'Лютеций', en: 'Lutetium'},
			{ru: 'Гафний', en: 'Hafnium'},
			{ru: 'Тантал', en: 'Tantalum'},
			{ru: 'Вольфрам', en: 'Tungsten'},
			{ru: 'Рений', en: 'Rhenium'},
			{ru: 'Осмий', en: 'Osmium'},
			{ru: 'Иридий', en: 'Iridium'},
			{ru: 'Платина', en: 'Platinum'},
			{ru: 'Золото', en: 'Gold'},
			{ru: 'Ртуть', en: 'Mercury'},
			{ru: 'Таллий', en: 'Thallium'},
			{ru: 'Свинец', en: 'Lead'},
			{ru: 'Висмут', en: 'Bismuth'},
			{ru: 'Полоний', en: 'Polonium'},
			{ru: 'Астат', en: 'Astatine'},
			{ru: 'Радон', en: 'Radon'},
			{ru: 'Франций', en: 'Francium'},
			{ru: 'Радий', en: 'Radium'},
			{ru: 'Актиний', en: 'Actinium'},
			{ru: 'Торий', en: 'Thorium'},
			{ru: 'Протактиний', en: 'Protactinium'},
			{ru: 'Уран', en: 'Uranium'},
			{ru: 'Нептуний', en: 'Neptunium'},
			{ru: 'Плутоний', en: 'Plutonium'},
			{ru: 'Америций', en: 'Americium'},
			{ru: 'Кюрий', en: 'Curium'},
			{ru: 'Берклий', en: 'Berkelium'},
			{ru: 'Калифорний', en: 'Californium'},
			{ru: 'Эйнштейний', en: 'Einsteinium'},
			{ru: 'Фермий', en: 'Fermium'},
			{ru: 'Менделевий', en: 'Mendelevium'},
			{ru: 'Нобелий', en: 'Nobelium'},
			{ru: 'Лоуренсий', en: 'Lawrencium'},
			{ru: 'Резерфордий', en: 'Rutherfordium'},
			{ru: 'Дубний', en: 'Dubnium'},
			{ru: 'Сиборгий', en: 'Seaborgium'},
			{ru: 'Борий', en: 'Bohrium'},
			{ru: 'Хассий', en: 'Hassium'},
			{ru: 'Мейтнерий', en: 'Meitnerium'},
			{ru: 'Дармштадтий', en: 'Darmstadtium'},
			{ru: 'Рентгений', en: 'Roentgenium'},
			{ru: 'Коперниций', en: 'Copernicium'},
			{ru: 'Нихоний', en: 'Nihonium'},
			{ru: 'Флеровий', en: 'Flerovium'},
			{ru: 'Московий', en: 'Moscovium'},
			{ru: 'Ливерморий', en: 'Livermorium'},
			{ru: 'Теннессин', en: 'Tennessine'},
			{ru: 'Оганессон', en: 'Oganesson'}
		],
		decayTypes: {
			'A': 		{ru: 'Альфа-распад', en: 'Alpha decay'},
			'B-': 		{ru: 'Бета-распад', en: 'Beta decay'},
			'2B-': 		{ru: 'Двойной бета-распад', en: 'Double beta decay'},
			'2B+': 		{ru: 'Двойной позитронный распад', en: 'Double positron decay'},
			'B+': 		{ru: 'Позитронный распад', en: 'Positron emission'},
			'EC': 		{ru: 'Захват электрона', en: 'Electron capture'},
			'SF': 		{ru: 'Спонтанное деление', en: 'Spontaneous fission'},
			'IT': 		{ru: 'Изомерный переход', en: 'Isomeric transition'},
			'P': 		{ru: 'Протонный распад', en: 'Proton emission'},
			'N': 		{ru: 'Нейтронный распад', en: 'Neutron emission'},
			'EC+B+': 	{ru: 'Захват электрона, позитронный распад', en: 'Electron capture with positive emission'},
			'B-2N': 	{ru: 'Бета + двойной нейтронный', en: 'Beta decay + double neutron emission'},
			'B-N': 		{ru: 'Бета + нейтронный', en: 'Beta decay + neutron emission'},
			'ECP': 		{ru: 'Захват электрона + протонный', en: 'Electron capture + proton emission'},
			'2P': 		{ru: 'Двойной протонный распад', en: 'Double proton emission'},
			'2N': 		{ru: 'Двойной нейтронный распад', en: 'Double neutron emission'},
			'ECSF': 	{ru: 'Захват электрона и спонтанное деление', en: 'Electron capture and spontaneous fission'},
			'B+P': 		{ru: 'Позитронный + протонный распад', en: 'Positron and proton emission'},
			'ECP+EC2P': {ru: 'Захват, протон, захват, 2 протона', en: ' El. capture, proton, el. capture, 2 protons'},
			'2EC': 		{ru: 'Двойной захват электрона', en: 'Double electron capture'}
		}
	}
}