import React from 'react';
import { Subtitle, Table } from 'bloomer';

export default class Autos extends React.Component {
  state = { autos: null };

  componentDidMount() {
    fetch('/api/autos')
      .then(res => res.json())
      .then(autos => this.setState({ autos }));
  }

  render() {
    const { autos } = this.state;
    return (
      <div>
        <Subtitle isSize={3}>Autos</Subtitle>
        <Table isBordered isStriped isNarrow className="is-fullwidth">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th />
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </div>
    );
  }
}
