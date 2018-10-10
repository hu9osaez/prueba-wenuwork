import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="homeContainer">
    <div className="buttons">
      <Link className="button is-link" to="/autos">Gestor de autos</Link>
      <Link className="button is-dark" to="/usuarios">Gestor de usuarios</Link>
    </div>
  </div>
);

export default Home;
