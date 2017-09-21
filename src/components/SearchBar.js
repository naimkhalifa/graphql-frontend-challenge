import React, { Component } from 'react';
import styled from 'styled-components';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { queryString: '' };
  }

  // Update component state 
  // and trigger 'storySearch' function defined on App
  onInputChange(term) {
    this.setState({ queryString: term });
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <Input 
        value={this.state.queryString}
        onChange={event => this.onInputChange(event.target.value) }
        placeholder="Start typing here to filter stories..."
      />
    );
  }
}

// Styles
const Input = styled.input`
  padding: 20px 0 20px 20px;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  background: #eee;
  border: none;
  width: 100%;
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.15);
`;


export default SearchBar;
