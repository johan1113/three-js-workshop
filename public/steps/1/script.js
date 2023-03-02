import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, 16/9, 1, 1000);
scene.add(camera);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

/**
 * Objects
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
);
cube.position.x = 0;
scene.add(cube);

camera.lookAt(cube.position);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.render(scene, camera);
