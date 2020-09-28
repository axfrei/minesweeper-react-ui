import React from 'react';
import CellV2 from './Cell'
import CellsV2 from './Cells'
import './Cell.css'

class BoardV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameInfo: props.gameInfo };
        this.handleChange = this.handleChange.bind(this);
        console.log('const');
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue});
        console.log('state setted');
        this.props.onChange(newValue);
    }

    render() {
        console.log("render board");
        console.log(this.state);
        const rows = [];
        var i;
        for (i = 0; i < this.state.gameInfo.metadata.rows; i++) {
            
            rows.push(<div key={i} className="rTableRow"><CellsV2 index={i} gameInfo={this.state.gameInfo} onChange={this.handleChange}/></div>)
        }

        return (
            <div className="rTable">
                {rows}
            </div>
        )
    }
}

function Cells(props) {
    const gameInfo = props.gameInfo;
    const index = props.index;
    const cells = gameInfo.cells.filter(cell => cell.x === index);
    return (
       cells.map((cell, index) => {
            return <CellV2 key={index} cell={cell} gameInfo={gameInfo} onChange={props.onChange} />
        })

    )
};

export default BoardV2;