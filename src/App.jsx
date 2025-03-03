import ThreeScene from './Testing/ThreeScene'

function App() {
    console.log('App rendering');

    return (
        <header className="header">
        <div className = "main">
                <div className="threeJS">
                <ThreeScene/>
                    {
                    //<ThreeComponent/>
                    //<CubeGroup/>
                    //<Counter
                    //    count={3}
                    ///>
                    //<ThreeTest />
                    //<ThreeSceneWithControls/>
                    //<ThreeSceneWithText/>
                    //<ThreeScene/>
                    //<RotatableSquareScene />
                    }
        </div>
        </div>
        </header>
    );
}

export default App;