import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Initial Screen Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Axes Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
scene.add(camera);

// Set-up Camera
const tick = () => {
    // Update camera positions
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
    camera.position.y = cursor.y * 5;
    camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);
};

// Cursor
const cursor = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
    console.log(cursor.x, cursor.y);
    tick();
});

/**
 * Objects
 */
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Fullscreen re-sizes
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
});

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
