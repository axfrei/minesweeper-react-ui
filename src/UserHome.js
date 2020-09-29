import React, { useState } from 'react';
import Reactable from 'reactable';
import { Link, Redirect } from 'react-router-dom';
import './App.css';
import 'reactjs-popup/dist/index.css';

class UserHome extends React.Component {

    constructor(props) {
        super(props);
        const { state } = this.props.history.location;
        this.state = { user: state.user, redirectToGame: false, newGameBombs: 0, newGameColumns: 0, newGameRows: 0 }
    }

    componentDidMount() {
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/${this.state.user}`)
            .then((resp) => {
                const data = resp.json();
                if (!resp.ok) {
                    const error = (data && data.message) || resp.status;
                    return Promise.reject(error);
                }
                return data;
            })
            .then((data) => {
                this.setState({ userGames: data, user: this.state.user });
            })
            .catch(console.log)
    }

    createNewGame() {
        console.log("submit");
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bombs: this.state.newGameBombs,
                columns: this.state.newGameColumns,
                rows: this.state.newGameRows,
                userId: this.state.user
            })
        })
            .then((resp) => {
                const data = resp.json();
                if (!resp.ok) {
                    const error = (data && data.message) || resp.status;
                    return Promise.reject(error);
                }
                return data;
            })
            .then((data) => {
                console.log("redirect");
                console.log(this);
                console.log(data);
                this.setState({ user: data.user, redirectToGame: true, gameInfo: data, link: `/minesweeper/game/${data.id}` })
            })
            .catch(console.log)
    }

    row(value) {
        this.setState({
            user: this.state.user, redirectToGame: this.state.redirectToGame,
            newGameBombs: this.state.newGameBombs, newGameColumns: this.state.newGameColumns,
            newGameRows: value
        });
    }

    col(value) {
        this.setState({
            user: this.state.user, redirectToGame: this.state.redirectToGame,
            newGameBombs: this.state.newGameBombs, newGameColumns: value,
            newGameRows: this.state.newGameRows
        });
    }

    bomb(value) {
        this.setState({
            user: this.state.user, redirectToGame: this.state.redirectToGame,
            newGameBombs: value, newGameColumns: this.state.newGameColumns,
            newGameRows: this.state.newGameRows
        });
    }

    render() {
        if (this.state.redirectToGame) {
            console.log("Should redirect");
            console.log(this.state)
            return <Redirect to={{ pathname: this.state.link, state: { gameId: this.state.gameInfo.id } }} />
        }

        return (
            <div className="App">
                <div>This is {this.state.user} Minesweeper Home Screen.
                <div className="content">
                        <label>Rows</label><input type="text" value={this.state.newGameRows} onChange={event => this.row(event.target.value)} />
                        <label>Columns</label><input type="text" value={this.state.newGameColumns} onChange={event => this.col(event.target.value)} />
                        <label>Bombs</label><input type="text" value={this.state.newGameBombs} onChange={event => this.bomb(event.target.value)} />
                        <button className="button" onClick={() => this.createNewGame()}>Create</button>
                    </div>
                </div>
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
                    {state.userGames.length === 0 &&
                        <h1>You don't have any game. What are you waiting to play?</h1>
                    }
                    <GameList userGames={state.userGames} />
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
        const initDate = new Date(element.creationTime);
        const endDate = element.status === 'WIN' || element.status === 'GAME_OVER' || element.status === 'PAUSED'? new Date(element.lastUpdate) : new Date();
        const diffSeconds = (endDate - initDate) / 1000;
        const timePlayed = Number((diffSeconds - element.timePaused) / 60).toFixed(2);

        data.push({
            rows: element.metadata.rows,
            columns: element.metadata.columns,
            bombs: element.metadata.bombs,
            status: element.status,
            timePlayed: timePlayed,
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