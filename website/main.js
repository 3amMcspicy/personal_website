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

camera.position.setZ(10);
camera.position.setX(0);
camera.position.setY(5);

const controls = new OrbitControls(camera, renderer.domElement);

//Helpers
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
scene.background = new THREE.Color(0xe9e9e9ee);
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

//globe
const geometry = new THREE.SphereGeometry(3, 32, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xFC4343, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 4, 0);
scene.add(sphere);
//dna

//jazz?

animate();

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.001;

    controls.update();

    render();

}

function render() {
    renderer.render(scene, camera);
}