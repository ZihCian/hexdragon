const TILE_SIZE = 32;
const MAP_SIZE_X = 10;
const MAP_SIZE_Y = 10;

window.onload = function () {

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.drawTile = function (tilename, x, y) {
		this.drawImage(brushes.get(tilename), x*TILE_SIZE, y*TILE_SIZE);
	}

	canvas.width = MAP_SIZE_X*TILE_SIZE;
	canvas.height = MAP_SIZE_Y*TILE_SIZE;

	var brushes = new Map;
	var brushesDiv = document.getElementById('brushes');
	var brushObjects = brushesDiv.getElementsByTagName('img');

	var selectedBrushValue;

	for (var i=0; i<brushObjects.length; i++) {
		brushes.set(brushObjects[i].id, brushObjects[i]); // add brush to the list
		brushObjects[i].addEventListener('click', function (event) {
			selectedBrushValue = this.id;
		})
	}
	
	selectedBrushValue = brushes.keys().next().value;
	// console.log(selectedBrushValue);
	
	canvas.addEventListener('click', function (event) {
		var rect = canvas.getBoundingClientRect();
		var x = Math.floor((event.clientX-rect.left)/TILE_SIZE);
		var y = Math.floor((event.clientY-rect.top)/TILE_SIZE);
		context.drawTile(selectedBrushValue, x, y);
	});
}