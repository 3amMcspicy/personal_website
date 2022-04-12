import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Assumed WebGL compatible 
//Used Python server to test...

//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight * 0.9);

camera.position.setZ(14);
camera.position.setX(0);
camera.position.setY(7);

//Orbit controls and limitation on what users can do. 
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.9;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 3.7;
controls.maxPolarAngle = Math.PI / 2.7;
controls.autoRotateSpeed = 1.7;

//Helpers
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
scene.background = new THREE.Color(0xe9e9e9ee);
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

//globe
const geometry = new THREE.SphereGeometry(3, 15, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xFC4343, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 4, 0);
scene.add(sphere);

//dna

//torus for blender
const donut_shape = new THREE.TorusGeometry(3, 1, 14, 20);
const donut_flavour = new THREE.MeshBasicMaterial({ color: 0xFC4343, wireframe: true });
const donut = new THREE.Mesh(donut_shape, donut_flavour);
donut.position.set(10, 4, 0);
scene.add(donut);


animate();

function animate() {
    requestAnimationFrame(animate);

    // sphere.rotation.y += 0.005;
    // sphere.rotation.z += 0.001;

    donut.rotation.y += 0.002;
    donut.rotation.z += 0.003;
    donut.rotation.z += 0.002;

    controls.update();

    render();

}

function render() {
    renderer.render(scene, camera);
}