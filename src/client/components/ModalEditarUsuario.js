import React from 'react';
import { Delete, Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardHeader, ModalCardTitle } from 'bloomer';

export default class ModalEditarUsuario extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rut: '',
      nombre: '',
      autoSeleccionado: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.usuario !== this.props.usuario) {
      this.setState({
        rut: props.usuario.rut,
        nombre: props.usuario.nombre,
        autoSeleccionado: props.usuario.auto ? props.usuario.auto._id : '',
      });
    }
  }

  componentWillMount() {
    const { usuario } = this.props;
    this.setState({
      rut: usuario.rut,
      nombre: usuario.nombre,
      autoSeleccionado: usuario.auto ? usuario.auto._id : '',
    });
  }

  editarUsuario() {
    const { usuario, usuarioEditado } = this.props;
    const { rut, nombre, autoSeleccionado } = this.state;

    if (rut === '' || nombre === '' || autoSeleccionado === '') {
      alert('Ninguno de los campos puede quedar vacío.');
    } else {
      fetch(`/api/usuarios/${usuario._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rut, nombre, auto: autoSeleccionado })
      })
        .then(res => res.json())
        .then(data => usuarioEditado());
    }
  }

  eliminarUsuario() {
    const { usuario, usuarioEditado } = this.props;

    if (confirm('¿Confirmas la eliminación de este usuario?')) {
      fetch(`/api/usuarios/${usuario._id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => usuarioEditado());
    }
  }

  render() {
    const { isActive, cerrar, autos } = this.props;
    const { rut, nombre, autoSeleccionado } = this.state;
    return (
      <Modal isActive={isActive}>
        <ModalBackground onClick={cerrar} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Editar usuario</ModalCardTitle>
            <Delete onClick={cerrar} />
          </ModalCardHeader>
          <ModalCardBody>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="label">RUT</div>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={rut}
                      onChange={e => this.setState({ rut: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="label">Nombre</div>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={nombre}
                      onChange={e => this.setState({ nombre: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="label">Auto</div>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={autoSeleccionado}
                    onChange={e => this.setState({ autoSeleccionado: e.target.value })}
                  >
                    <option value="">Seleccione</option>
                    {autos}
                  </select>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button
                  type="button"
                  className="button is-info"
                  onClick={() => this.editarUsuario()}
                >
                  Guardar
                </button>
              </div>
              <div className="column">
                <button
                  type="button"
                  className="button is-danger is-pulled-right"
                  onClick={() => this.eliminarUsuario()}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}
