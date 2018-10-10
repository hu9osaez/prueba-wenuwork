import React from 'react';
import { Subtitle, Table } from 'bloomer';

export default class Usuarios extends React.Component {
  state = { usuarios: null };

  componentDidMount() {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(usuarios => this.setState({ usuarios }));
  }

  render() {
    const { usuarios } = this.state;
    return (
      <div>
        <Subtitle isSize={3}>Usuarios</Subtitle>
        <Table isBordered isStriped isNarrow className="is-fullwidth">
          <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Auto</th>
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
