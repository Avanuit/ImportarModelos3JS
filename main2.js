import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.position.set(0, 100, 300);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(200, 300, 200);
directionalLight.castShadow = true;
scene.add(directionalLight);

THREE.DefaultLoadingManager.setURLModifier((url) => {
    if (url.toLowerCase().endsWith('.jpg')) {
        return url.replace(/\.jpg$/i, '.jpeg');
    }
    return url;
});

const fbxLoader = new FBXLoader();

fbxLoader.setPath('src/textures/');
fbxLoader.setResourcePath('src/textures/');

fbxLoader.load(
    'Metro.fbx',
    (object) => {
        object.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            }
        });

        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '%');
    },
    (error) => {
        console.error(error);
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