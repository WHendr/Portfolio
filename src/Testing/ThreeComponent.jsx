// src/ThreeComponent.js
import React, { Component } from 'react';
import { ThreeScene } from './ThreeScene';

class ThreeComponent extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.threeScene = new ThreeScene(this.containerRef.current);

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        // Clean up Three.js resources if necessary
    }

    handleResize = () => {
        this.threeScene.onWindowResize();
    };

    render() {
        return <div ref={this.containerRef} />;
    }
}

export default ThreeComponent;