import React, { useState } from 'react';
import Reactable from 'reactable';
import { Link } from 'react-router-dom';

class UserHome extends React.Component {
    
    state = {};

    constructor(props) {
        super(props);
        const { state } = this.props.history.location;
        this.state = {user: state.user};
    }

    
    componentDidMount(){
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/${this.state.user}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({userGames: data, user: this.state.user});
        })
        .catch(console.log)
    }

    render() {
        return (
            <div>
                <div>This is {this.state.user} Minesweeper Home Screen</div>
                <UserGamesPage state={this.state}/>
            </div>
        );
    }
}

function UserGamesPage(props){
    const state = props.state;
    if(!state || !state.userGames){
        return '';
    }
    console.log(state)
    if(state.userGames.length === 0){
        return <h1>You don't have any game. What are you waiting to play?</h1>
    }

    return <div>
        <GameList userGames={state.userGames}/>
    </div>
}

function GameList(props){
    console.log(props)
    var Table = Reactable.Table;

    let data = [];

    props.userGames.forEach(element => {
        const link = `/minesweeper/game/${element.id}`;
        data.push({
            rows: element.metadata.rows,
            columns: element.metadata.columns,
            bombs: element.metadata.bombs,
            status: element.status,
            creationTime: element.creationTime,
            lastUpdate: element.lastUpdate,
            action: <Link to={{pathname: link, state: {gameId: element.id}}}>Load</Link>
        }); 
    });

    return (
        <div>
            <Table className="table" id="table" data={data}/>
        </div>
    );
}

export default UserHome;