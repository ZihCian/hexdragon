const TILE_SIZE = 32;
const MAP_SIZE_X = 30;
const MAP_SIZE_Y = 20;

window.onload = function () {

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.drawTile = function (tilename, x, y) {
		this.drawImage(images.get(tilename), x*TILE_SIZE, y*TILE_SIZE);
	}

	canvas.width = MAP_SIZE_X*TILE_SIZE;
	canvas.height = MAP_SIZE_Y*TILE_SIZE;

	var images = new Map;
	var imagesDiv = document.getElementById('images');
	var imageObjects = imagesDiv.getElementsByTagName('img');

	for (var i=0; i<imageObjects.length; i++) {
		images.set(imageObjects[i].id, imageObjects[i]);
	}

	canvas.addEventListener('click', function (event) {
		var rect = canvas.getBoundingClientRect();
		// alert (canvas);
		var x = Math.floor((event.clientX-rect.left)/TILE_SIZE);
		var y = Math.floor((event.clientY-rect.top)/TILE_SIZE);
		// alert(x + '\n' + y);
		context.drawTile('forest', x, y);
	});
}