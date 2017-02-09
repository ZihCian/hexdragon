const TILE_SIZE = 32;
const MAP_SIZE_X = 50;
const MAP_SIZE_Y = 25;

window.onload = function () {

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.drawTile = function (tilename, x, y) {
		this.drawImage(brushes.get(tilename), x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
	}

	canvas.width = MAP_SIZE_X*TILE_SIZE;
	canvas.height = MAP_SIZE_Y*TILE_SIZE;

	var brushes = new Map;
	var brushesDiv = document.getElementById('brushes');
	var brushObjects = brushesDiv.getElementsByTagName('img');

	var selectedBrushValue;

	for (var i=0; i<brushObjects.length; i++) {
		brushes.set(brushObjects[i].id, brushObjects[i]); // add brush to the list

		// change the visuals
		brushObjects[i].width = TILE_SIZE;
		brushObjects[i].height = TILE_SIZE;

		// make the thumbnail clickable; change selectedBrushValue on click
		brushObjects[i].addEventListener('click', function (event) {
			selectedBrushValue = this.id;
		})
	}
	
	selectedBrushValue = brushes.keys().next().value;

	for (var tileX=0; tileX<MAP_SIZE_X; tileX++) {
		for (var tileY=0; tileY<MAP_SIZE_Y; tileY++) {
			context.drawTile(selectedBrushValue, tileX, tileY);
		}
	}

	canvas.mouseIsDown = false;

	function drawTileOnAction (event) {
		// debugger;
		if (event.type == 'click' || canvas.mouseIsDown == true) {
			var rect = canvas.getBoundingClientRect();
			var x = Math.floor((event.clientX-rect.left)/TILE_SIZE);
			var y = Math.floor((event.clientY-rect.top)/TILE_SIZE);
			context.drawTile(selectedBrushValue, x, y);
		}
	}

	canvas.addEventListener('click', drawTileOnAction);
	canvas.addEventListener('mousemove', drawTileOnAction);

	canvas.addEventListener('mousedown', function (event) {
		this.mouseIsDown = true;
	})

	canvas.addEventListener('mouseup', function (event) {
		this.mouseIsDown = false;
	})

	document.getElementById('download').addEventListener('click', function (event) {
		var img = canvas.toDataURL('image/png');
		var link = document.createElement('a');
		link.download = 'map'; //possibly tie this to user-provided name later
		link.href = img;
		document.body.appendChild(link);
		link.click();
		delete link;
	})
}





