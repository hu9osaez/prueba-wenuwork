import React from 'react';
import { Link } from 'react-router-dom';
import { Subtitle, Table } from 'bloomer';

import ModalAgregarAuto from '../components/ModalAgregarAuto';

export default class Autos extends React.Component {
  state = {
    autos: [],
    modalAgregar: false,
  };

  componentDidMount() {
    this.loadAutos();
  }

  loadAutos() {
    fetch('/api/autos')
      .then(res => res.json())
      .then(autos => this.setState({ autos }));
  }

  render() {
    const { autos, modalAgregar } = this.state;
    return (
      <div>
        <Subtitle isSize={3}>
          <Link to={'/'}>←</Link>
        </Subtitle>
        <Subtitle isSize={3}>Autos</Subtitle>
        <p className="mbottom-medium">
          <button
            className="button is-outlined is-info"
            type="button"
            onClick={() => this.setState({ modalAgregar: true })}
          >
            Agregar auto
          </button>
        </p>
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
        <ModalAgregarAuto
          isActive={modalAgregar}
          cerrar={() => this.setState({ modalAgregar: false })}
          autoAgregado={() => {
            this.loadAutos();
            this.setState({ modalAgregar: false });
          }}
        />
      </div>
    );
  }
}
