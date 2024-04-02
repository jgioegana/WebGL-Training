import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

export default class Sketch {
	constructor(options) {
		this.time = 0;
		this.container = options.dom;
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
		this.camera.position.z = 1;

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.container.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.resize();
		this.setupResize();
		this.addObjects();
		this.render();
	}

	resize() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize( this.width, this.height );
		this.camera.aspect = this.width/this.height;
		this.camera.updateProjectionMatrix(); //it tries to stay in the viewport
	}

	setupResize() {
		window.addEventListener('resize',this.resize.bind(this));
	}

	addObjects() {
		this.geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
		this.material = new THREE.MeshNormalMaterial();

		// this.material = new THREE.ShaderMaterial({
		// 	fragmentShader: `
		// 		void main() {
		// 			gl_FragColor = vec4(1.,0.,0.0,1.);
		// 		}
		// 	`,
		// 	vertexShader: `
		// 		void main() {
		// 			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		// 		}
		// 	`,
		// })

		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.scene.add( this.mesh );
	}

	render() { //Render loop function
		this.time+=0.05;
		this.mesh.rotation.x = this.time / 2000;
		this.mesh.rotation.y = this.time / 1000;

		this.renderer.render( this.scene, this.camera );
		window.requestAnimationFrame(this.render.bind(this));	
	}

}

new Sketch({
	dom: document.getElementById('container')
});