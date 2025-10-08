// Simple Particles System for Background
class ParticlesSystem {
    constructor() {
        this.particles = [];
        this.container = document.body;
        this.isActive = false;
        this.init();
    }

    init() {
        // Only activate on capable devices
        if (this.isDeviceCapable()) {
            this.createParticles();
            this.isActive = true;
        }
    }

    isDeviceCapable() {
        // Check if device is capable of handling particles
        return window.innerWidth > 768 && 
               !navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    }

    createParticles() {
        const particleCount = Math.min(30, Math.floor(window.innerWidth / 50));

        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties with constraints for performance
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 15;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random color based on theme
        const colors = [
            'rgba(99, 102, 241, 0.4)',
            'rgba(6, 182, 212, 0.4)',
            'rgba(245, 158, 11, 0.4)',
            'rgba(139, 92, 246, 0.4)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    cleanup() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
    }

    resize() {
        if (this.isActive) {
            this.cleanup();
            this.createParticles();
        }
    }
}

// Initialize particles system
document.addEventListener('DOMContentLoaded', () => {
    const particlesSystem = new ParticlesSystem();
    
    window.addEventListener('resize', () => {
        particlesSystem.resize();
    });
});