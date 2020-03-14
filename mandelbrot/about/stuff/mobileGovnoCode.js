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
	let allLayers = document.getElementsByClassName('dback');
	for (let i = 0; i < allLayers.length; i++){
		allLayers[i].classList.add('mback');
		allLayers[i].classList.remove('dback');
	}
	/*
	if (ls){
		localStorage.setItem('forced',true);
		window.location.replace("http://sunandstuff.com/mandelbrot/about/mobile");
	} else {
		console.log('You choice is clear.');
	}
	*/
}