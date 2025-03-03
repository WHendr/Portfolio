import { useEffect, useRef } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
//import { Canvas, useThree } from "@react-three/fiber";

// After setting up the camera and renderer:
const loader = new FontLoader();

export default function ThreeTest(
    {
        title = "3D Visualization",
        description = "Explore this 3D model",
    }) {
    const containerRef = useRef();

    useEffect(() => {
        console.log('Component mounting');

        const container = containerRef.current;
        console.log('Container size:', container.clientWidth, container.clientHeight);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#1e1e1e');
        console.log('Scene created');

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;
        console.log('Camera created');

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor('#1e1e1e');
        container.appendChild(renderer.domElement);
        console.log('Renderer added');


        // Add cubes 
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#1B00FF' });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const newObjects = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 15; j++) {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(-7 + j, i - 3, 0); // Offset each box in the x direction
                newObjects.push(mesh);
                scene.add(mesh);
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        animate();
        console.log('Animation started');

        return () => {
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div>
        <div ref={containerRef}
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            zIndex: 0
            }} />
        <div
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'white',
                zIndex: 10,
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
            }}>

        <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{title}</h1>
            <p style={{ margin: 0, fontSize: '1rem' }}>{description}</p>
        </div>
        </div>
        ;
}

