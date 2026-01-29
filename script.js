const canvas = document.getElementById("scene");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.4, 2.2);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Soft light
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(1, 2, 3);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x8888ff, 0.4);
fillLight.position.set(-2, 1, 2);
scene.add(fillLight);

const backLight = new THREE.PointLight(0x8866ff, 0.6);
backLight.position.set(0, 2, -2);
scene.add(backLight);

// Load anime head
let head;
const loader = new THREE.GLTFLoader();
loader.load("models/anisha_head.glb", (gltf) => {
  head = gltf.scene;
  head.position.set(0, 0, 0);
  scene.add(head);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (head) {
    head.rotation.y += 0.002; // subtle life motion
  }

  renderer.render(scene, camera);
}

animate();
