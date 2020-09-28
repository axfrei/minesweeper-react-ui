import React from 'react';
import './Cell.css'

import CellV2 from './Cell'

class Cellsv2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameInfo: props.gameInfo, index: props.index, cells: props.gameInfo.cells.filter(cell => cell.x === props.index)}
        this.cellRefs = this.state.cells.map(() => {
            return React.createRef();
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        console.log("setting new state on CellsV2")
        this.state = {gameInfo: newValue, index: this.state.index, cells: newValue.cells.filter(cell => cell.x ===  this.state.index)};
        this.props.onChange(newValue);
    }

    changeCellsInfo(newGameInfo, index){
        console.log('changeCellsInfo');
        this.state = {gameInfo: newGameInfo, index: this.state.index, cells: newGameInfo.cells.filter(cell => cell.x ===  this.state.index)};
        const cellsToUpdate = newGameInfo.cells.filter(cell => cell.x === index);
         this.cellRefs.forEach((cellRef,i) => {
            const cell = cellsToUpdate[i];
            const index = (cell.x*this.state.gameInfo.metadata.rows)+cell.y
            cellRef.current.changeCellInfo(this.state.gameInfo.cells[index]); 
        });
    }

    render() {
        console.log("render row");
        console.log(this.state);
        return this.state.cells.map((cell, index) => {
            return <CellV2 key={index} cell={cell} gameInfo={this.state.gameInfo} onChange={this.handleChange} ref={this.cellRefs[index]}/>
        })
    }
}

export default Cellsv2;