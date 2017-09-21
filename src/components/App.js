import React, { Component }  from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import StoryList from './StoryList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      fetchedAllStories: false,
    }
  }

  // Display all the stories on start up
  componentWillReceiveProps(nextProps) {
    // This only runs once 
    if (this.state.fetchedAllStories === false && this.props.data.loading !== nextProps.data.loading) {
      this.setState({ 
        stories: nextProps.data.viewer.stories.edges, 
        fetchedAllStories: true 
      });
    }
  }

  // Update stories in state with GraphQL returned data
  updateStories(payload) {
    if (payload.data === undefined) {
      this.setState({ stories: [] });
      return;
    }
    
    this.setState({ stories: payload.data.viewer.stories.edges });
  }

  // Trigger a new search
  storySearch(term) {
    this.props.data.refetch({ queryString: term })
      .then(payload => this.updateStories(payload));
  }
  
  render() {
    const storySearch = _.debounce(term => { this.storySearch(term)}, 200);

    if (this.state.fetchedAllStories === false) { return <div>Fetching stories...</div>; }

    return (
      <Wrapper>
        <SearchBar onSearchTermChange={term => storySearch(term)} />
        <StoryList stories={this.state.stories} />
      </Wrapper>
    );
  }
}

// GraphQL query
const query = gql`
  query FetchStories($queryString: String) {
    viewer {
      stories(queryString: $queryString) {
        edges {
          node {
            id
            ... on Story {
              id
              title
              excerpt
            }
          }
        }
      }
    }
  }
`;

// Styles
const Wrapper = styled.section`
  font-family: Helvetica, sans-serif;
  padding: 20px;
  max-width: 1160px;
  margin: auto;
  font-size: 16px;
  line-height: 1.5;
`;


export default graphql(query)(App);
