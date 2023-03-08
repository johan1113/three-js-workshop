import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camara
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 5;

// Object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'red'})
);
cube.position.x=0;

camera.lookAt(cube.position);

scene.add(camera);
scene.add(cube);

// Render
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

