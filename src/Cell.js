import React from 'react';
import './Cell.css'

class Cellv2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cell: props.cell, gameInfo: props.gameInfo, index: (props.cell.x*props.gameInfo.metadata.rows)+props.cell.y }
        this.handleChange = this.handleChange.bind(this);
        this.clickTimeout = null
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
                return <div className="rTableCell"><PrettyCell symbol="💣" className="recognized notActive"/></div>
            }

            return <div className="rTableCell"><PrettyCell label={cell.value} className="recognized notActive"/></div>
        }

        if (cell.flagged) {
           return  <div className="rTableCell"><PrettyCell symbol="🏁" className={`flagged ${gameInfo.status !== 'ACTIVE'? 'notActive':''}`} onClick={()=> this.handleClicks(cell, gameInfo)}/></div>
        }

        return <div className="rTableCell"><PrettyCell className={gameInfo.status !== 'ACTIVE'? 'notActive':''} onClick={()=> this.handleClicks(cell, gameInfo)}/></div>
    }

    handleClicks(cell, gameInfo) {
        if (this.clickTimeout !== null) {
          console.log('double click executes')
          this.flag(cell, gameInfo);
          clearTimeout(this.clickTimeout)
          this.clickTimeout = null
        } else {
          console.log('single click')  
          this.clickTimeout = setTimeout(()=>{
          console.log('first click executes ')
          this.recognize(cell, gameInfo);
          clearTimeout(this.clickTimeout)
            this.clickTimeout = null
          }, 200)
        }
      }

    doMove(cell, gameInfo, move) {
        fetch(`http://prod.eba-wf3wzrap.us-east-1.elasticbeanstalk.com/game/${move}`, {
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
        .then((resp) => {
            const data =  resp.json();
            if(!resp.ok){
                const error = (data && data.message) || resp.status;
                return Promise.reject(error);
            }
            return data;
        })
        .then((data)=>{
            if(this.state.cell.value === 0 || this.state.gameInfo.state !== 'ACTIVE' ){
                this.handleChange(data);
            }
            
            if(move==='flag' || !(this.state.cell.value === 0 || this.state.gameInfo.state !== 'ACTIVE' )){
                this.setState({ cell: data.cells[this.state.index], gameInfo: data, index: this.state.index});
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error(error);
        });
    }

    recognize(cell, gameInfo) {
        this.doMove(cell, gameInfo, 'recognize');
    }
    
    flag(cell, gameInfo) {
        this.doMove(cell, gameInfo, 'flag');
    }
}

function PrettyCell(props){

    return (
            <span
                className={props.className + ' prettyCell _'+props.label}
                role="img"
                aria-label={props.label ? props.label : ""}
                onClick={props.onClick}
            >
                {props.symbol? props.symbol:props.label}
            </span>
    );
}

export default Cellv2;