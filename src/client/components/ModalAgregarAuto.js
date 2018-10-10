import React from 'react';
import { Delete, Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardTitle, ModalCardBody } from 'bloomer';

export default class ModalAgregarAuto extends React.Component {
  state = {
    marca: '',
    modelo: '',
    anio: ''
  };

  agregarAuto() {
    const { marca, modelo, anio } = this.state;
    const { autoAgregado } = this.props;

    if (marca === '' || modelo === '' || anio === '') {
      alert('Ninguno de los campos puede quedar vacío.');
    } else {
      fetch('/api/autos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marca, modelo, anio })
      })
        .then(res => res.json())
        .then(data => autoAgregado());
    }
  }

  render() {
    const { isActive, cerrar } = this.props;
    return (
      <Modal isActive={isActive}>
        <ModalBackground onClick={cerrar} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Agregar nuevo auto</ModalCardTitle>
            <Delete onClick={cerrar} />
          </ModalCardHeader>
          <ModalCardBody>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="label">Marca</div>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      onChange={e => this.setState({ marca: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="label">Modelo</div>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      onChange={e => this.setState({ modelo: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="label">Año</div>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      onChange={e => this.setState({ anio: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="button is-info"
              onClick={() => this.agregarAuto()}
            >
              Agregar
            </button>
          </ModalCardBody>
        </ModalCard>
      </Modal>
    );
  }
};
