import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 100, 300); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 200, 50);
scene.add(directionalLight);

//cargar modelo
const fbxLoader = new FBXLoader();

fbxLoader.load(
    'src/Ps1.fbx',
    (object) => {
        
        scene.add(object);
        console.log('Modelo FBX cargado con éxito');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    (error) => {
        console.error('Error al cargar el archivo FBX:', error);
    }
);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();