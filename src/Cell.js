import React from 'react';
import './Cell.css'

class Cellv2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cell: props.cell, gameInfo: props.gameInfo, index: (props.cell.x*props.gameInfo.metadata.rows)+props.cell.y }
        this.handleChange = this.handleChange.bind(this);
        //this.recognize = this.recognize.bind(this);
        //this.flag = this.flag.bind(this);
    }


    handleChange(newValue) {
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
                return <div className="rTableCell"><PrettyCell symbol="💣" className="recognized"/></div>
            }

            return <div className="rTableCell"><PrettyCell label={cell.value} className="recognized"/></div>
        }

        if (cell.flag) {
           return  <div className="rTableCell"><PrettyCell symbol="🏁"onClick={() => this.recognize(cell, gameInfo)} onDoubleClick={() => this.flag(cell, gameInfo)}/></div>
        }

        return <div className="rTableCell"><PrettyCell label="&nbsp;" onClick={() => this.recognize(cell, gameInfo)} onDoubleClick={() => this.flag(cell, gameInfo)}/></div>
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

function PrettyCell(props){

    return (
            <span
                className={props.className + ' prettyCell _'+props.label}
                role="img"
                aria-label={props.label ? props.label : ""}
                onClick={props.onClick} onDoubleClick={props.onDoubleClick}
            >
                {props.symbol? props.symbol:props.label}
            </span>
    );
}

export default Cellv2;