import React from 'react';
import './Cell.css'
import BoardV2 from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.location.state;
        this.handleChange = this.handleChange.bind(this);
        this.boardRef =  React.createRef();
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue });
    }

    render() {
        return (
            <div>
                <div>Last Update {this.state.gameInfo.lastUpdate}</div>
                <BoardV2 gameInfo={this.state.gameInfo} onChange={this.handleChange} ref={this.boardRef}/>
            </div>
        )
    }
}


export default Game;

