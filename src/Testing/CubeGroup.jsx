import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';


class Cube {
    constructor(scene) {
        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }
    update(time) {
        this.mesh.rotation.x = time;
        this.mesh.rotation.y = time;
    }
}

class CubeGroup extends Component {
    constructor(canvas) {
        super(canvas);
        this.canvas = canvas;
        this.screenDimensions = { width: canvas.width, height: canvas.height };
        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);
        this.camera = this.buildCamera(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);
        this.clock = new THREE.Clock();
        this.update();

        {
            /*
        // Create a ref for the mount point
        //this.mount = React.createRef();
        //this.state = {
        //    //numCubes: props.numCubes,
        //    //scene: new Three.Scene(),
        //    //backgroundColor: new Three.Color(props.backgroundColor),
        //    //camera: new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        //    //renderer: new Three.WebGLRenderer({ antialias: true }),
        //    //ambientLight: new Three.AmbientLight(0xffffff, 0.3),
        //    //pointLight: new Three.PointLight(0xffffff, 0.7),
        //    //boxGeometry: new Three.BoxGeometry(props.width, props.height, props.depth),
        //    //boxMaterial: new Three.MeshStandardMaterial({ color: props.objectColor, roughness: 0.7, metalness: 0.2 }),
        //    //cubes: Array.from({ length: props.numCubes }, () => new Three.Mesh(this.boxGeometry, this.boxMaterial)),
        //};

        // Renderer Setup
        this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight, 0)
        ///this.renderer.setSize(
        ///    this.mount.clientWidth,
        ///    this.mount.clientHeight
        ///);

        // Set Camera Position
        this.camera.position.set(0, 0, 5);

        const fov = 75;
        const cameraDistance = 5;
        const aspectRatio = window.innerWidth / window.innerHeight;
        const visibleHeight = 2 * Math.tan((fov / 2) * (Math.PI / 180)) * cameraDistance;
        const visibleWidth = visibleHeight * aspectRatio;

        const cubeSize = 0.1 * visibleWidth;
        console.log("CubeSize " + cubeSize);
        this.state.cubes.forEach(cube => {
            cube.scale.set(cubeSize, cubeSize, cubeSize);
        });

        // Position the cubes in a grid
        const cubesPerRow = Math.sqrt(props.numCubes);
        const spacing = 1.2;
        this.state.cubes.forEach((cube, index) => {
            const row = Math.floor(index / cubesPerRow);
            const col = index % cubesPerRow;
            cube.position.set((col - cubesPerRow / 2) * spacing, (row - cubesPerRow / 2) * spacing, 0);
            this.state.scene.add(cube);
        });

        // Add lights to the scene
        this.state.scene.add(this.state.ambientLight);
        this.state.pointLight.position.set(10, 10, 10);
        this.state.scene.add(this.state.pointLight);

        // Position the camera
        this.state.camera.position.z = cameraDistance;

        // Set up the renderer
        this.state.renderer.setSize(window.innerWidth, window.innerHeight);
            this.state.renderer.setClearColor(this.state.backgroundColor);
        */
        }
    }

    componentDidMount() {
        // Append the renderer to the DOM using the ref
        this.mount.current.appendChild(this.state.renderer.domElement);
        this.animate();
    }

    componentWillUnmount() {
        // Clean up the renderer
        this.mount.current.removeChild(this.state.renderer.domElement);
    }

    //----------------------------------------------------
    // CubeGroup specific function
    //----------------------------------------------------

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000');
        return scene;
    }

    buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 1000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 10;
        return camera;
    }

    createSceneSubjects(scene) {
        const sceneSubjects = [
            new Cube(scene)
        ];
        return sceneSubjects;
    }



    animate = () => {
        requestAnimationFrame(this.animate);
        this.state.cubes.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        this.state.renderer.render(this.state.scene, this.state.camera);
    };

    render() {
        // Attach the ref to the div
        return <div
            ref={this.mount}
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#1e1e1e'
            }}
        />;
    }
}

function initializeScene(canvas) {
    const sceneManager = new CubeGroup(canvas);

    function bindEventListeners() {
        window.onresize = sceneManager.onWindowResize.bind(sceneManager);
    }

    bindEventListeners();
}

const canvas = document.getElementById('myCanvas');
initializeScene(canvas);

//CubeGroup.propTypes = {
//    numCubes: PropTypes.number.isRequired,
//    backgroundColor: PropTypes.string.isRequired,
//    width: PropTypes.number.isRequired,
//    height: PropTypes.number.isRequired,
//    depth: PropTypes.number.isRequired,
//    objectColor: PropTypes.string.isRequired,
//};
//
export default CubeGroup;