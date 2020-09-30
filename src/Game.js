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
        .then((resp) => {
            const data =  resp.json();
            if(!resp.ok){
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
          this.setState({gameId: this.state.gameId, gameInfo: data});
        })
        .catch(console.log)
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue });
    }

    pauseOrResumeGame(){
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/pause/${this.state.gameId}`, {
            method: 'PUT'
        })
        .then((resp) => {
            const data =  resp.json();
            if(!resp.ok){
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data) => {
            this.setState({gameId: this.state.gameId, gameInfo: data});
        })
        .catch(console.log)
    }
    

    render() {

        return (
            <div className="App">
                <div className="game">
                {this.state.gameInfo && this.state.gameInfo.status === 'WIN' &&
                    <div className="winner">YOU WIN</div>
                }

                {this.state.gameInfo && this.state.gameInfo.status === 'GAME_OVER' &&
                    <div class="looser">YOU LOOSE</div>
                }

                {this.state.gameInfo && this.state.gameInfo.status === 'ACTIVE' &&
                    <button onClick={()=>this.pauseOrResumeGame()}>Pause</button>
                }

                {this.state.gameInfo && this.state.gameInfo.status === 'PAUSED' &&
                    <button onClick={()=>this.pauseOrResumeGame()}>Resume</button>
                }


                {this.state.gameInfo &&
                    <BoardV2 gameInfo={this.state.gameInfo} onChange={this.handleChange} ref={this.boardRef}/>
                }
                </div>
                <div className="instructions">
                    <ul>
                        <li>Click: Recognize Cell</li>
                        <li>Double Click: Flag Cell</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Game;

