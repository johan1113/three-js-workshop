import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 0.5);
light.position.x = 2;
light.position.y = 3;
light.position.z = 4;
scene.add(light);

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
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 3;
    camera.lookAt(plane.position);

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

// Load textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
]);

// Load materials
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
material.envMap = environmentMapTexture;


/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5
scene.add(sphere, plane, torus)


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
