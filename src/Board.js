import React from 'react';
import CellV2 from './Cell'
import CellsV2 from './Cells'
import './Cell.css'

class BoardV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameInfo: props.gameInfo };
        this.handleChange = this.handleChange.bind(this);

        this.cellsRefs = [];
        var i;
        for (i = 0; i < this.state.gameInfo.metadata.rows; i++) {
            this.cellsRefs.push(React.createRef());
        };
        
    }

    handleChange(newValue) {
        this.setState({ gameInfo: newValue});
        console.log('state setted');
        this.cellsRefs.forEach((cellRefs,i) => {
            cellRefs.current.spreadNonValueRecognizedUpdate(this.state.gameInfo, i); 
        });
        this.props.onChange(newValue);
    }

    render() {
        console.log("render board");
        console.log(this.state);
        const rows = [];
        var i;
        for (i = 0; i < this.state.gameInfo.metadata.rows; i++) {
            rows.push(<div key={i} className="rTableRow"><CellsV2 index={i} gameInfo={this.state.gameInfo} onChange={this.handleChange}  ref={this.cellsRefs[i]}/></div>)
        }

        return (
            <div className="rTable">
                {rows}
            </div>
        )
    }
}
export default BoardV2;