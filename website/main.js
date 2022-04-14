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

camera.position.setZ(24); //24
camera.position.setX(0);
camera.position.setY(9);

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


//Raycasting
const mouse = new THREE.Vector2
const raycaster = new THREE.Raycaster();


//var canvas = document.getElementById('bg')

const rect = renderer.domElement.getBoundingClientRect();
var ray_width = rect.width;
var ray_height = rect.height;


function onMouseMove(event) {
    mouse.x = (event.clientX - rect.left) / (ray_width) * 2 - 1;
    mouse.y = - (event.clientY - rect.top) / (ray_height) * 2 + 1;
}


const loader = new THREE.TextureLoader().load(
    '/murakami.jpg');


//globe
const geometry = new THREE.SphereGeometry(6, 25, 20);
const material = new THREE.MeshBasicMaterial({ map: loader });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 10, 0);
scene.add(sphere);

//dna

//torus for blender
const donut_shape = new THREE.TorusGeometry(5, 2, 14, 20);
const donut_flavour = new THREE.MeshBasicMaterial({ color: 0xFC4343, wireframe: true });
const donut = new THREE.Mesh(donut_shape, donut_flavour);
donut.position.set(18, 10, 0);
scene.add(donut);

//cube
const box_shape = new THREE.BoxGeometry(5, 5, 5);
//const box_faces = new THREE.MeshBasicMaterial({ color: 0xFC4343 });
const texture_2 = new THREE.TextureLoader().load('gmail.png');
const box_faces = new THREE.MeshBasicMaterial({ color: 0xf1f1f1, map: texture_2 });
const cube = new THREE.Mesh(box_shape, box_faces);
cube.position.set(-18, 10, 0);
scene.add(cube);


window.addEventListener('mousemove', onMouseMove, false);
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
    //raycasting
    resetMaterial();
    hoverObjects();
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));

    renderer.render(scene, camera);
}

//need to fix window for ray casting to be done properly. 
//https://stackoverflow.com/questions/4032179/how-do-i-get-the-width-and-height-of-a-html5-canvas


/* function cube_overlay() {
    document.getElementById("about_me_overlay").style.display = "block";
} */


//attributions 
//gmail icon <a href="https://www.flaticon.com/free-icons/gmail" title="gmail icons">Gmail icons created by Pixel perfect - Flaticon</a>
//phone icon <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Pixel perfect - Flaticon</a>

function hoverObjects() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const newMaterial = intersects[0].object.material.clone();
        newMaterial.transparent = true;
        newMaterial.opacity = 0.5;
        intersects[0].object.material = newMaterial;
        console.log("intersected");
    }
}
function resetMaterial() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material) {
            scene.children[i].material.opacity = 1.0;
        }
    }
}