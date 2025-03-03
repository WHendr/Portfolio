import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import NavbarThree from './NavbarThree';
import './NavbarThree.css';

const ThreeSceneWithControls = ({
    title = "3D Visualization",
    description = "Use the controls to manipulate the 3D model",
    backgroundColorh = "#1a2b3c",
    objectColor = "#ff6b6b"
}) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const cubeRef = useRef(null);
    const animationRef = useRef(null);

    // State to track current animation mode
    const [animationMode, setAnimationMode] = useState('rotate');

    // Animation properties
    const animationProps = useRef({
        rotationSpeed: 0.01,
        scaleDirection: 1,
        scaleSpeed: 0.01,
        bounceHeight: 0,
        bounceSpeed: 0.05,
        bounceDirection: 1,
        originalPosition: new THREE.Vector3(0, 0, 0)
    });

    useEffect(() => {
        // Initialize the scene
        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(backgroundColor);

        // Initialize camera
        cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current.position.z = 5;

        // Initialize renderer
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(rendererRef.current.domElement);

        // Create lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        sceneRef.current.add(ambientLight);

        const pointLight = new THREE.   
        pointLight.position.set(5, 5, 5);
        sceneRef.current.add(pointLight);

        // Create a cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: objectColor,
            roughness: 0.7,
            metalness: 0.2
        });
        cubeRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(cubeRef.current);

        // Store original position
        animationProps.current.originalPosition = cubeRef.current.position.clone();

        // Animation loop with different modes
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            if (cubeRef.current) {
                // Apply different animations based on mode
                switch (animationMode) {
                    case 'rotate':
                        cubeRef.current.rotation.x += animationProps.current.rotationSpeed;
                        cubeRef.current.rotation.y += animationProps.current.rotationSpeed;
                        break;

                    case 'scale':
                        // Scale up and down
                        const currentScale = cubeRef.current.scale.x;
                        if (currentScale > 1.5) animationProps.current.scaleDirection = -1;
                        if (currentScale < 0.5) animationProps.current.scaleDirection = 1;

                        const newScale = currentScale + (animationProps.current.scaleDirection * animationProps.current.scaleSpeed);
                        cubeRef.current.scale.set(newScale, newScale, newScale);
                        break;

                    case 'bounce':
                        // Bounce up and down
                        animationProps.current.bounceHeight +=
                            animationProps.current.bounceDirection * animationProps.current.bounceSpeed;

                        if (animationProps.current.bounceHeight > 1.5)
                            animationProps.current.bounceDirection = -1;
                        if (animationProps.current.bounceHeight < -1.5)
                            animationProps.current.bounceDirection = 1;

                        cubeRef.current.position.y =
                            animationProps.current.originalPosition.y + animationProps.current.bounceHeight;

                        // Add some rotation for effect
                        cubeRef.current.rotation.z += 0.005;
                        break;

                    case 'reset':
                        // Gradually reset to original state
                        cubeRef.current.rotation.x *= 0.95;
                        cubeRef.current.rotation.y *= 0.95;
                        cubeRef.current.rotation.z *= 0.95;

                        cubeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

                        cubeRef.current.position.lerp(animationProps.current.originalPosition, 0.1);

                        // If everything is very close to reset, switch to rotate mode
                        if (Math.abs(cubeRef.current.rotation.x) < 0.01 &&
                            Math.abs(cubeRef.current.scale.x - 1) < 0.01 &&
                            cubeRef.current.position.distanceTo(animationProps.current.originalPosition) < 0.01) {
                            setAnimationMode('rotate');
                        }
                        break;

                    default:
                        break;
                }
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        // Start the animation
        animate();

        // Handle window resize
        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (mountRef.current && rendererRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }

            if (cubeRef.current) {
                geometry.dispose();
                material.dispose();
            }
        };
    }, [backgroundColor, objectColor, animationMode]);

    // Handler for navbar button clicks
    const handleMoveBoxes = (action) => {
        setAnimationMode(action);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            zIndex: 0
        }}>
            <div ref={mountRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
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

            {/* Include the navbar component */}
            <NavbarThree onMoveBoxes={handleMoveBoxes} />
        </div>
    );
};

export default ThreeSceneWithControls;