(function() {
	return;
	var canvas = document.getElementById('intro');
	canvas.width *= window.devicePixelRatio;
	canvas.height *= window.devicePixelRatio;

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 50, canvas.width / canvas.height, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
		antialias: true
	});

	function getCubeGeometry() {
		var geometry = new THREE.Geometry();

		geometry.vertices.push(
			new THREE.Vector3(-1,-1,-1), new THREE.Vector3( 1,-1,-1),
			new THREE.Vector3( 1,-1,-1), new THREE.Vector3( 1, 1,-1),
			new THREE.Vector3( 1, 1,-1), new THREE.Vector3(-1, 1,-1),
			new THREE.Vector3(-1, 1,-1), new THREE.Vector3(-1,-1,-1),
	
			new THREE.Vector3(-1,-1, 1), new THREE.Vector3( 1,-1, 1),
			new THREE.Vector3( 1,-1, 1), new THREE.Vector3( 1, 1, 1),
			new THREE.Vector3( 1, 1, 1), new THREE.Vector3(-1, 1, 1),
			new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-1,-1, 1),
	
			new THREE.Vector3(-1,-1,-1), new THREE.Vector3(-1,-1, 1),
			new THREE.Vector3( 1,-1,-1), new THREE.Vector3( 1,-1, 1),
			new THREE.Vector3(-1, 1,-1), new THREE.Vector3(-1, 1, 1),
			new THREE.Vector3( 1, 1,-1), new THREE.Vector3( 1, 1, 1)
		);
	
		return geometry;
	}


	function generateCubes() {
	
		var cube, newCube, prevCube, lineWidth, opacity;
	
		linewidth = 1 * window.devicePixelRatio;
		opacity = 0.9;
		hue = 0.1;
	
		for(var i = 0; i < 30; i++) {
	
			newCube = new THREE.Line( getCubeGeometry(), new THREE.LineBasicMaterial( {
				color: new THREE.Color().setHSL(hue,0.5,0.5),
				linewidth: linewidth,
				opacity: opacity
			}), THREE.LinePieces );
		
			linewidth *= 1.1;
			hue += 0.02;
		
			newCube.scale.multiplyScalar(0.95);
			if(prevCube) {
				prevCube.add( newCube );
			} else {
				cube = newCube;
			}
		
			prevCube = newCube;
	
		}
	
		return cube;
	}
	var cube = generateCubes( cube );

	scene.add( cube );

	camera.position.y = -0;
	camera.position.z = 3.8;


	var pTime = new Date().getTime();
	var cTime = pTime;
	var dt = 0;
	var doRender = true;


	function render() {

	
		//Update time
		cTime = new Date().getTime();
		dt = cTime - pTime;
		pTime = cTime;
	
		cube.rotation.x += 0.0001 * dt;
		cube.rotation.y += 0.0001 * dt;
	
		var child = cube;
		while(child.children.length > 0) {
		
			child = child.children[0];
		
			child.rotation.x = Math.sin(cTime / 1000) * 0.2;
			child.rotation.z = Math.sin(cTime / 1200) * 0.2;
		}
	
	
		renderer.render(scene, camera);
		if(doRender) {
			requestAnimationFrame(render);
		}
	}
	render();
	
	Reveal.addEventListener( 'slidechanged', function( event ) {
		
		if(event.indexh === 0) {
			doRender = true;
			render();
		} else {
			doRender = false;
		}
	    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
	} );
})();