import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
        };
    }

    increment() {
        const currCount = this.state.count + 1;
        this.setState({ count : currCount });
        if (currCount === 5) {
            this.setState({ count: 0 });
        }
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.increment()}>Increment</button>
            </div>
        );
    }
}

Counter.propTypes = {
    count: PropTypes.number.isRequired, // Validate that 'count' is a number and is required
};

export default Counter;