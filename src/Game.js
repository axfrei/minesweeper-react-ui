import React from 'react';
import './Cell.css'
import CellV2 from './Cell'

class Game extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = props.location.state;
        
    }

    render() {
        return (
            <div>
                <Board gameInfo={this.state.gameInfo} />
            </div>
        )
    }
}

function Board(props) {
    console.log(props);

    const rows = [];
    var i;
    for (i = 0; i < props.gameInfo.metadata.rows; i++) {
        const cells = props.gameInfo.cells.filter(cell => cell.x === i);
        rows.push(<div key={i} className="rTableRow"><Cells cells={cells} gameInfo={props.gameInfo}/></div>)
    }

    return (
        <div className="rTable">
            {rows}
        </div>
    )

};

function Cells(props) {
    const cells = props.cells;
    const gameInfo = props.gameInfo;
    return (
        cells.map((cell, index) => {
            return <CellV2 key={index} cell={cell} gameInfo={gameInfo} />
        })

    )
};


export default Game;

