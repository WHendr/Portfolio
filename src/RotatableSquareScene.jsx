// RotatableSquareScene.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RotatableSquare } from './RotatableSquare'; // Import the class from RotatableSquare.js

const RotatableSquareScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Create scene, camera, and renderer.
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );
        mountRef.current.appendChild(renderer.domElement);

        // Position the camera.
        camera.position.set(0, 0, 5);

        // Create an instance of RotatableSquare.
        const square = new RotatableSquare(scene, 2, 0x00ff00);

        // Render loop.
        const animate = () => {
            requestAnimationFrame(animate);
            // Update the square animation.
            square.update();
            renderer.render(scene, camera);
        };
        animate();

        // For demonstration, start a smooth rotation after 2 seconds.
        const timeoutId = setTimeout(() => {
            square.startRotation('top', Math.PI);
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
            console.log("Cleaning up:", mountRef.current, renderer.domElement.parentNode);
            if (mountRef.current && renderer.domElement.parentNode) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };

    }, []);

    return <div style={{ width: '100%', height: '100vh' }} ref={mountRef} />;
};

export default RotatableSquareScene;
