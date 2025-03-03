import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = (
    { 
    title = "3D Visualization",
    description = "Explore this 3D model",
    }
) => {
    const mountRef = useRef(null);
    const aboutRef = useRef(null);
    const homeRef = useRef(null);

    useEffect(() => {
        console.log('Component mounted');

        // Get current div dimensions
        const currentDiv = mountRef.current;
        console.log('Container dimensions:', {
            width: currentDiv.clientWidth,
            height: currentDiv.clientHeight
        });

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#1e1e1e');

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            75,
            currentDiv.clientWidth / currentDiv.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setSize(currentDiv.clientWidth, currentDiv.clientHeight);
        console.log('Renderer created');

        // Add renderer to DOM
        currentDiv.appendChild(renderer.domElement);
        console.log('Renderer added to DOM');

        // Create a simple cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#00ff00' });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        console.log('Cube added to scene');

        // Create a simple cube
        const geometry2 = new THREE.BoxGeometry(3, 3, 1);
        const material2 = new THREE.MeshBasicMaterial({ color: '#EDE8DO' });
        const cube2 = new THREE.Mesh(geometry2, material2);
        scene.add(cube2);
        console.log('Cube added to scene');

        cube2.position.x -= 3.25;
        cube2.position.y += 2;

        // Animation loop
        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        // Start animation
        animate();
        console.log('Animation started');

        return () => {
            console.log('Cleaning up');
            currentDiv.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#1e1e1e'
            }}
        />
    );
};

export default ThreeScene;