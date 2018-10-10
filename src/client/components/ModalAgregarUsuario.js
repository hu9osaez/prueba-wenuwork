import React from 'react';
import { Delete, Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardHeader, ModalCardTitle } from 'bloomer';

export default class ModalAgregarUsuario extends React.Component {
  state = {
    rut: '',
    nombre: '',
    auto: ''
  };

  agregarUsuario() {
    const { rut, nombre, auto } = this.state;
    const { usuarioAgregado } = this.props;

    if (rut === '' || nombre === '' || auto === '') {
      alert('Ninguno de los campos puede quedar vacío.');
    } else {
      fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rut, nombre, auto })
      })
        .then(res => res.json())
        .then(data => usuarioAgregado());
    }
  }

  render() {
    const { isActive, cerrar, autosList } = this.props;
    return (
      <Modal isActive={isActive}>
        <ModalBackground onClick={cerrar} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Agregar nuevo usuario</ModalCardTitle>
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
                  <select onChange={e => this.setState({ auto: e.target.value })}>
                    <option value="">Seleccione</option>
                    { autosList }
                  </select>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="button is-info"
              onClick={() => this.agregarUsuario()}
            >
              Agregar
            </button>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
}
