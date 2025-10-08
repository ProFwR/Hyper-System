// Three.js Background Scene with error handling
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        try {
            // Check if Three.js is available
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded');
                return;
            }

            // Check if canvas exists
            const canvas = document.getElementById('threejs-background');
            if (!canvas) {
                console.warn('Three.js canvas not found');
                return;
            }

            this.createScene();
            this.createCamera();
            this.createRenderer(canvas);
            this.createParticles();
            this.animate();
            this.handleResize();

            this.isInitialized = true;
        } catch (error) {
            console.error('Three.js initialization failed:', error);
        }
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;
    }

    createRenderer(canvas) {
        try {
            this.renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        } catch (error) {
            console.error('WebGL renderer creation failed:', error);
        }
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000; // Reduced for mobile performance

        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x6366f1,
            transparent: true,
            opacity: 0.6
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    animate() {
        if (!this.isInitialized) return;

        requestAnimationFrame(this.animate.bind(this));

        if (this.particles) {
            this.particles.rotation.x += 0.0002; // Slower rotation for better performance
            this.particles.rotation.y += 0.0005;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (this.camera && this.renderer) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }
}

// Initialize Three.js when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop for better performance
    if (window.innerWidth > 768) {
        new ThreeScene();
    }
});