function getminimize(){
	var leftnav = document.getElementById('left-nav'),
		topnav  = document.getElementById('top-nav'),
		main	= document.getElementById('main'),
		maximize= document.getElementById('maximize');

	leftnav.style.left='-200px';
	topnav.style.left='0px';
	topnav.style.width='100%';
	main.style.left='0px';
	main.style.width='100%';
	maximize.style.display='block';

}

function getmaximize(){
	var leftnav = document.getElementById('left-nav'),
		topnav  = document.getElementById('top-nav'),
		main	= document.getElementById('main');
		maximize= document.getElementById('maximize');

	leftnav.style.left='0px';
	topnav.style.left='200px';
	topnav.style.width='100% - 200px';
	main.style.left='200px';
	main.style.width='calc(100% - 200px)';
	maximize.style.display='none';
}