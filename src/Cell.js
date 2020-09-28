import React from 'react';
import './Cell.css'
import { Redirect } from 'react-router-dom';

class Cellv2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cell: props.cell, gameInfo: props.gameInfo, index: (props.cell.x*props.gameInfo.metadata.rows)+props.cell.y }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        // Here, we invoke the callback with the new value
        this.props.onChange(newValue);
    }

    changeCellInfo(newValue){
        this.setState({ cell: newValue, gameInfo: this.state.gameInfo, index: this.state.index});
    }

    render() {
        console.log("render cell")
        const cell = this.state.cell;
        console.log(cell)
        const gameInfo = this.state.gameInfo;
        if (cell.recognized) {
            if(cell.bomb){
                return <div className="rTableCell">B</div>
            }

            return <div className="rTableCell">{cell.value}</div>
        }

        if (cell.flag) {
            return <div className="rTableCell" onClick={() => this.recognize(cell, gameInfo)} onDoubleClick={() => this.flag(cell, gameInfo)}>F</div>
        }

        return <div className="rTableCell toDiscover" onClick={() => this.recognize(cell, gameInfo)} onDoubleClick={() => this.flag(cell, gameInfo)}>?</div>
    }

    recognize(cell, gameInfo) {
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/recognize`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameId: gameInfo.id,
                x: cell.x,
                y: cell.y
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(this.state.cell.value === 0){
                this.handleChange(data);
            }else{
                this.setState({ cell: data.cells[this.state.index], gameInfo: data, index: this.state.index});
            }
        })
        .catch(console.log)
    }
    
    flag(cell, gameInfo) {
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/flag`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gameId: gameInfo.id,
                x: cell.x,
                y: cell.y
            })
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({ cell: data.cells[this.state.index], gameInfo: data, index: this.state.index});
        })
        .catch(console.log)
    }
}


export default Cellv2;