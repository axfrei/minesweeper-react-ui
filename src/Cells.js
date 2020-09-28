import React from 'react';
import './Cell.css'

import CellV2 from './Cell'
import { Redirect } from 'react-router-dom';

class Cellsv2 extends React.Component {
    constructor(props) {
        super(props);
        this.cells = props.gameInfo.cells.filter(cell => cell.x === props.index);
        this.state = { gameInfo: props.gameInfo, index: props.index, cells: this.cells}
        this.cellRefs = this.cells.map(() => {
            return React.createRef();
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        console.log("setting new state on CellsV2")
        this.state = {gameInfo: newValue, index: this.state.index, cells: newValue.cells.filter(cell => cell.x ===  this.state.index)};
        this.cellRefs.forEach((cellRef,i) => {
            const cell = this.cells[i];
            const index = (cell.x*this.state.gameInfo.metadata.rows)+cell.y
            cellRef.current.changeCellInfo(this.state.gameInfo.cells[index]); 
        });
        this.props.onChange(newValue);
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