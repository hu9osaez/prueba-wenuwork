import React from 'react';
import { Link } from 'react-router-dom';
import { Subtitle, Table } from 'bloomer';

import ModalAgregarAuto from '../components/ModalAgregarAuto';
import ModalEditarAuto from '../components/ModalEditarAuto';

export default class Autos extends React.Component {
  state = {
    autos: [],
    modalAgregar: false,
    modalEditar: false,
    autoActivo: {},
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
    const { autos, modalAgregar, modalEditar, autoActivo } = this.state;
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
                  <button
                    className="button is-small is-dark"
                    type="button"
                    onClick={() => this.setState({autoActivo: auto, modalEditar: true})}
                  >
                    Editar
                  </button>
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
        <ModalEditarAuto
          isActive={modalEditar}
          cerrar={() => this.setState({ autoActivo: {}, modalEditar: false })}
          auto={autoActivo}
          autoEditado={() => {
            this.loadAutos();
            this.setState({ autoActivo: {}, modalEditar: false });
          }}
        />
      </div>
    );
  }
}
