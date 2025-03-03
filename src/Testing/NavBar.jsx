import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayHome: true,
            displayAbout: true,
            displayProject: true,

        }
        this.onHomeClick = props.onHomeClick;
        this.onAboutClick = props.onAboutClick;
        this.onProjectClick = props.onProjectClick;
    }
    
    componentDidMount() {
        // Add event listener for resize
        window.addEventListener('resize', this.handleResize);
    }
    
    componentWillUnmount() {
        // Remove event listener to prevent memory leaks
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleResize = () => {
        // Implementation of resize logic if needed
        // For example:
        // const width = window.innerWidth;
        // if (width < 768) {
        //     this.setState({ displayProject: false });
        // } else {
        //     this.setState({ displayProject: true });
        // }
    };
    
    setMountRef = (element) => {
        this.mount = element;
    }
    
    render() {
        const { displayHome, displayAbout, displayProject } = this.state;
        
        return (
            <div className="Navbar" ref={this.setMountRef}>
                <div className="NavbarButtons">
                    {displayHome && (
                        <>
                            <button className="NavButton"
                                onClick={this.onHomeClick}>Home</button>
                        </>
                    )}
                    
                    {displayAbout && (
                        <>
                            <button className="NavButton"
                                onClick={this.onAboutClick}>About</button>
                        </>
                    )}
                    
                    {displayProject && (
                        <>
                            <button className="NavButton"
                                onClick={this.onProjectClick}>Projects</button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    onHomeClick: PropTypes.func.isRequired,
    onAboutClick: PropTypes.func.isRequired,
    onProjectClick: PropTypes.func.isRequired,
};


export default Navbar;