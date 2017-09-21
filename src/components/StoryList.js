import React, { Component } from 'react';
import styled from 'styled-components';

class StoryList extends Component {  
  renderStories() {
    return this.props.stories.map(story => {
      const { id, title, excerpt } = story.node;
      
      return (
        <StoryListItem key={id}>
          <ListTitle>{title}</ListTitle>
          <div dangerouslySetInnerHTML={{__html: excerpt}} />
        </StoryListItem>
      );
    });
  }

  render() {
    if (this.props.stories.length === 0) {
      return <div>No result for this search. Please try something else...</div>;
    }

    return (
      <StoriesList>
        {this.renderStories()}
      </StoriesList>
    );
  }
}

// Styles
const StoriesList = styled.ul`
  padding: 20px;
  list-style-type: none;
  width: 100%;
`;

const StoryListItem = styled.li`
  border-top: 2px solid #efefef;
  padding: 30px 0;
`;

const ListTitle = styled.h1`
  font-size: 18px;
`;


export default StoryList;
