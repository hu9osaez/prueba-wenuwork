import React from 'react';
import {
  Columns, Column, Subtitle, Table
} from 'bloomer';
import { Link } from 'react-router-dom';

import ModalAgregarUsuario from '../components/ModalAgregarUsuario';

export default class Usuarios extends React.Component {
  state = {
    autos: [],
    usuarios: [],
    modalAgregar: false,
  };

  constructor() {
    super();
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidMount() {
    this.loadUsuarios();
    fetch('/api/autos')
      .then(res => res.json())
      .then(autos => this.setState({ autos }));
  }

  onChangeSelect(event) {
    const idAuto = event.target.value;

    if (idAuto) {
      fetch(`/api/usuarios/listByCar/${idAuto}`)
        .then(res => res.json())
        .then(usuarios => this.setState({ usuarios }));
    }
    else {
      this.loadUsuarios();
    }
  }

  loadUsuarios() {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(usuarios => this.setState({ usuarios }));
  }

  render() {
    const { autos, usuarios, modalAgregar } = this.state;
    const autosList = autos.map(auto => <option value={auto._id} key={auto._id}>{auto.marca} - {auto.modelo} - {auto.anio}</option>);
    return (
      <div>
        <Subtitle isSize={3}>
          <Link to="/">←</Link>
        </Subtitle>
        <Columns>
          <Column>
            <Subtitle isSize={3}>Usuarios</Subtitle>
          </Column>
          <Column isSize="1/3">
            <div className="field">
              <div className="label">Listar por auto</div>
              <div className="control">
                <div className="select is-fullwidth">
                  <select onChange={this.onChangeSelect}>
                    <option value="">Seleccione</option>
                    { autosList }
                  </select>
                </div>
              </div>
            </div>
          </Column>
        </Columns>
        <p className="mbottom-medium">
          <button
            className="button is-outlined is-info"
            type="button"
            onClick={() => this.setState({ modalAgregar: true })}
          >
            Agregar usuario
          </button>
        </p>
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
            {
              usuarios.map(usuario => (
                <tr key={usuario._id}>
                  <td>{usuario.rut}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.auto.marca} - {usuario.auto.modelo} - {usuario.auto.anio}</td>
                  <td className="has-text-centered">
                    <a href="#" className="button is-small is-dark">Editar</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <ModalAgregarUsuario
          isActive={modalAgregar}
          autosList={autosList}
          cerrar={() => this.setState({ modalAgregar: false })}
          usuarioAgregado={() => {
            this.loadUsuarios();
            this.setState({ modalAgregar: false });
          }}
        />
      </div>
    );
  }
}
