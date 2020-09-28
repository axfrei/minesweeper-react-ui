import React from 'react';
import './Cell.css'
import BoardV2 from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.location.state;
        this.handleChange = this.handleChange.bind(this);
        this.boardRef =  React.createRef();
        console.log(this.state);
    }

    componentDidMount(){
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/load/${this.state.gameId}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({gameId: this.state.gameId, gameInfo: data});
        })
        .catch(console.log)
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue });
    }

    render() {

        return (
            <div className="App">
                {this.state.gameInfo &&
                    <BoardV2 gameInfo={this.state.gameInfo} onChange={this.handleChange} ref={this.boardRef}/>
                }
            </div>
        )
    }
}

export default Game;

