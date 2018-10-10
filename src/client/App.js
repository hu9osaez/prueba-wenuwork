import React, { Component } from 'react';
import './app.scss';
import { Container, Box  } from 'bloomer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Box>Hello Word</Box>
        </Container>
      </div>
    );
  }
}
