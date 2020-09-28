import React, { useState } from 'react';
import Reactable from 'reactable';
import { Link } from 'react-router-dom';
import './App.css';

class UserHome extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        const { state } = this.props.history.location;
        this.state = { user: state.user };
    }


    componentDidMount() {
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/${this.state.user}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ userGames: data, user: this.state.user });
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="App">
                <div>This is {this.state.user} Minesweeper Home Screen</div>
                <UserGamesPage state={this.state} />
            </div>
        );
    }
}

function UserGamesPage(props) {
    const state = props.state;
    return (
        <div>
            {state && state.userGames &&
                <div>
                    <GameList userGames={state.userGames} />
                    {state.userGames.length === 0 &&
                        <h1>You don't have any game. What are you waiting to play?</h1>
                    }

                </div>
            }
        </div>
    )
}

function GameList(props) {
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
            timePlayed: Number(element.timePlayed / 60).toFixed(2),
            action: <Link to={{ pathname: link, state: { gameId: element.id } }}>Load</Link>
        });
    });

    return (
        <div>
            <Table className="table" id="table" data={data} />
        </div>
    );
}

export default UserHome;