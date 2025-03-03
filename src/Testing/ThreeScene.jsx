import React, { Component } from 'react';
import * as THREE from 'three';
import Navbar from './Navbar'
import './Scene.css'

class ThreeScene extends Component {
    constructor(props) {
        super(props);

        // Setting up state to store Three.js objects
        this.state = {
            cubeRotation: 0,
            displayHome: true
        };

        // References for scene components
        this.mount = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.frameId = null;
    }

    componentDidMount() {
        this.setUpScene();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.stopAnimationLoop();
        this.cleanUpScene();
    }

    // Set reference to the mounting div
    setMountRef = (element) => {
        this.mount = element;
    }

    setUpScene = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // Initialize scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x282c34);

        // Initialize camera
        this.camera = new THREE.PerspectiveCamera(
            75, // Field of view
            width / height, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        this.camera.position.z = 5;

        // Initialize renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        // Create cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 100,
        });
        this.cube = new THREE.Mesh(geometry, material);

        this.cube.position.setY(5);

        this.scene.add(this.cube);
    }

    startAnimationLoop = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stopAnimationLoop = () => {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
    }

    // ------------------------------
    // -- Navbar button functions --
    // ------------------------------

    handleHomeClick = () => {
        this.cube.position.setX(0);
    }

    handleAboutClick = () =>{
        this.cube.position.setX(-2);
    }

    handleProjectClick = () => {
        this.cube.position.setX(2);
    }

    // ------------------------------

    animate = () => {
        // Update cube rotation
        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;

        // Update state if needed for other components
        this.setState(prevState => ({
            cubeRotation: prevState.cubeRotation + 0.01
        }));

        // Render scene
        this.renderScene();

        // Continue animation loop
        this.frameId = requestAnimationFrame(this.animate);
    }

    renderScene = () => {
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    cleanUpScene = () => {
        if (this.cube) {
            this.scene.remove(this.cube);
            this.cube.geometry.dispose();
            this.cube.material.dispose();
        }

        if (this.mount && this.renderer.domElement) {
            this.mount.removeChild(this.renderer.domElement);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }

    render() {
        return (
            <div className="threeContainer"
                ref={this.setMountRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                }}>
                <Navbar
                    onHomeClick={this.handleHomeClick}
                    onAboutClick={this.handleAboutClick}
                    onProjectClick={this.handleProjectClick}
                />
            </div>
        );
    }
}

export default ThreeScene;
