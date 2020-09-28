import React from 'react';
import './Cell.css'
import BoardV2 from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.location.state;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue });
        console.log('state setted');
    }

    render() {
        return (
            <div>
                <div>Last Update {this.state.gameInfo.lastUpdate}</div>
                <BoardV2 gameInfo={this.state.gameInfo} onChange={this.handleChange} />
            </div>
        )
    }
}


export default Game;

