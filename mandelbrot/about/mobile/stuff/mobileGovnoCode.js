/*
function turnMobile(){
	let allLayers = document.getElementsByClassName('layers');
	for (let i = 0; i < allLayers.length; i++){
		allLayers[i].classList.add('mobile');
	}
	if (allLayers[0].classList.contains('zero')){
		allLayers[0].classList.add('zeromobile');
	}
}
*/
function turnMobile(){
	let ls = localStorage.getItem('forced');
	if (ls){
		localStorage.setItem('forced',true);
		window.location.replace("https://playday3008.github.io/Sun-and-stuff/mandelbrot/about/mobile.html");
	} else {
		console.log('You choice is clear.');
	}
}
