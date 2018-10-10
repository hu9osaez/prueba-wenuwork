import React, { Component } from 'react';
import { Container, Box, Section } from 'bloomer';
import { Switch, Route } from 'react-router-dom';
import './app.scss';

import Home from './containers/Home';
import Autos from './containers/Autos';
import Usuarios from './containers/Usuarios';

export default class App extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Box>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/autos" component={Autos} />
              <Route exact path="/usuarios" component={Usuarios} />
            </Switch>
          </Box>
        </Container>
      </Section>
    );
  }
}
