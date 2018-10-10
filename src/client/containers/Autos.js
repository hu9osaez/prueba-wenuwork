import React from 'react';
import { Link } from 'react-router-dom';
import { Subtitle, Table } from 'bloomer';

export default class Autos extends React.Component {
  state = { autos: [] };

  componentDidMount() {
    fetch('/api/autos')
      .then(res => res.json())
      .then(autos => this.setState({ autos }));
  }

  render() {
    const { autos } = this.state;
    return (
      <div>
        <Subtitle isSize={3}>
          <Link to={'/'}>←</Link>
        </Subtitle>
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
          {
            autos.map(auto => (
              <tr key={auto._id}>
                <td>{auto.marca}</td>
                <td>{auto.modelo}</td>
                <td>{auto.anio}</td>
                <td className="has-text-centered">
                  <a href="#" className="button is-small is-dark">Editar</a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    );
  }
}
