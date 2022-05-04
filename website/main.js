import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three';
import { FontLoader } from 'three';

//Assumed WebGL compatible 
//Used Python server to test...


//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(10); //24
camera.position.setX(7);
camera.position.setY(30); //9

//Orbit controls and limitation on what users can do. 
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.9;
//controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 3; // /3.7
controls.maxPolarAngle = Math.PI / 2.7;
controls.autoRotateSpeed = 1.7;

//Helpers
const grid = new THREE.Group();    //reason for adding gridhelper to a group is to stop it from turning translucent, as it is not a surface child in scene anymore
const gridHelper = new THREE.GridHelper(200, 50);
gridHelper.callback = function () { nothing(); }
grid.add(gridHelper);
scene.add(grid);
scene.background = new THREE.Color(0xe9e9e9ee);
const light = new THREE.AmbientLight(0x404040);
scene.add(light);


//Raycasting
const mouse = new THREE.Vector2
const raycaster = new THREE.Raycaster();

const rect = renderer.domElement.getBoundingClientRect();
var ray_width = rect.width;
var ray_height = rect.height;


function onMouseMove(event) {
    mouse.x = (event.clientX - rect.left) / (ray_width) * 2 - 1;
    mouse.y = - (event.clientY - rect.top) / (ray_height) * 2 + 1;
}

function onMouseClick(event) {
    var isIntersected = raycaster.intersectObject(cube);
    if (isIntersected) {
        console.log('cube clicked');
    }
}

const loader = new THREE.TextureLoader().load(
    '/murakami.jpg');


//globe
const geometry = new THREE.SphereGeometry(6, 25, 20);
const material = new THREE.MeshBasicMaterial({ map: loader });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 10, 0);
sphere.callback = function () { check_sphere(); }
scene.add(sphere);


//torus for blender
const donut_shape = new THREE.TorusGeometry(5, 2, 14, 20);
const donut_flavour = new THREE.MeshBasicMaterial({ color: 0xFC4343, wireframe: true });
const donut = new THREE.Mesh(donut_shape, donut_flavour);
donut.position.set(18, 10, 0);
donut.callback = function () { check_donut(); }
scene.add(donut);

//cube
const box_shape = new THREE.BoxGeometry(5, 5, 5);
//const box_faces = new THREE.MeshBasicMaterial({ color: 0xFC4343 });
const texture_2 = new THREE.TextureLoader().load('gmail.png');
const box_faces = new THREE.MeshBasicMaterial({ color: 0xf1f1f1, map: texture_2 });
const cube = new THREE.Mesh(box_shape, box_faces);
cube.position.set(-18, 10, 0);
cube.callback = function () { cube_overlay(); }
scene.add(cube);

window.addEventListener('mouseclick', onMouseClick, false);
window.addEventListener('mousemove', onMouseMove, false);
animate();

function animate() {
    requestAnimationFrame(animate);

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
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000)); just to see what raycaster is pointing at

    renderer.render(scene, camera);
}

function nothing() {
    /* document.getElementById("about_me_overlay").style.display = "none";
    document.getElementById("contact_overlay").style.display = "none";
    document.getElementById("blender_overlay").style.display = "none"; */
    console.log("nothing");
}


function cube_overlay() {
    document.getElementById("contact_overlay").style.display = "block";
    console.log("it's cube");

}



function check_donut() {
    document.getElementById("blender_overlay").style.display = "block";
    console.log("it's donut");
}

function check_sphere() {
    document.getElementById("about_me_overlay").style.display = "block";
    console.log("it's sphere");
}
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
        intersects[0].object.callback();
        console.log("intersected");

    }
}
function resetMaterial() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material) {
            scene.children[i].material.opacity = 1.0;
        }
    }
    document.getElementById("about_me_overlay").style.display = "none";
    document.getElementById("contact_overlay").style.display = "none";
    document.getElementById("blender_overlay").style.display = "none";
}