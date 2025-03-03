import React, { useState } from 'react';
import './NavbarThree.css';

const NavbarThree = ({ onMoveBoxes }) => {
    const [activeTab, setActiveTab] = useState('rotate');

    const handleClick = (action) => {
        setActiveTab(action);
        // Call the passed function with the selected action
        onMoveBoxes(action);
    };

    return (
        <nav className="three-navbar">
            <div className="three-navbar-brand">3D Controls</div>

            <div className="three-navbar-links">
                <button
                    onClick={() => handleClick('rotate')}
                    className={`three-navbar-button ${activeTab === 'rotate' ? 'active' : ''}`}
                >
                    Rotate
                </button>

                <button
                    onClick={() => handleClick('scale')}
                    className={`three-navbar-button ${activeTab === 'scale' ? 'active' : ''}`}
                >
                    Scale
                </button>

                <button
                    onClick={() => handleClick('bounce')}
                    className={`three-navbar-button ${activeTab === 'bounce' ? 'active' : ''}`}
                >
                    Bounce
                </button>

                <button
                    onClick={() => handleClick('reset')}
                    className={`three-navbar-button ${activeTab === 'reset' ? 'active' : ''}`}
                >
                    Reset
                </button>
            </div>
        </nav>
    );
};

export default NavbarThree;