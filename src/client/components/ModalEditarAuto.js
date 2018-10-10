import React from 'react';
import { Delete, Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardTitle, ModalCardBody } from 'bloomer';

export default class ModalEditarAuto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      marca: '',
      modelo: '',
      anio: '',
    };
  }

  componentWillReceiveProps(props) {
    if (props.auto !== this.props.auto) {
      this.setState({
        marca: props.auto.marca,
        modelo: props.auto.modelo,
        anio: props.auto.anio,
      });
    }
  }

  componentWillMount() {
    const { auto } = this.props;
    this.setState({
      marca: auto.marca,
      modelo: auto.modelo,
      anio: auto.anio,
    });
  }

  editarAuto() {
    const { auto, autoEditado } = this.props;
    const { marca, modelo, anio } = this.state;

    if (marca === '' || modelo === '' || anio === '') {
      alert('Ninguno de los campos puede quedar vacío.');
    } else {
      fetch(`/api/autos/${auto._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marca, modelo, anio })
      })
        .then(res => res.json())
        .then(data => autoEditado());
    }
  }

  eliminarAuto() {
    const { auto, autoEditado } = this.props;

    if (confirm('¿Confirmas la eliminación de este auto?')) {
      fetch(`/api/autos/${auto._id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => autoEditado());
    }
  }

  render() {
    const { isActive, cerrar } = this.props;
    const { marca, modelo, anio } = this.state;
    return (
      <Modal isActive={isActive}>
        <ModalBackground onClick={cerrar} />
        <ModalCard>
          <ModalCardHeader>
            <ModalCardTitle>Editar auto</ModalCardTitle>
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
                      value={marca}
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
                      value={modelo}
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
                      value={anio}
                      onChange={e => this.setState({ anio: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <button
                  type="button"
                  className="button is-info"
                  onClick={() => this.editarAuto()}
                >
                  Guardar
                </button>
              </div>
              <div className="column">
                <button
                  type="button"
                  className="button is-danger is-pulled-right"
                  onClick={() => this.eliminarAuto()}
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
};
