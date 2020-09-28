import React from 'react';
import './App.css';


class BeginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/minesweeper', { user: this.state.value });
  }

  render() {
      return <form onSubmit={this.handleSubmit}>
        <label>
          Enter user name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  }
}

export default BeginForm;
