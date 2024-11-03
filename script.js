const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the car model
const loader = new THREE.GLTFLoader();
loader.load('path/to/your/car-model.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.y = Math.PI; // Rotate the car to face the camera
}, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
});

// Set up camera position
camera.position.z = 5;

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Damping for smoother interaction
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required if controls.enableDamping = true
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('thank-you-message').classList.remove('hidden');
    this.reset();
});

