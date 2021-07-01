import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserProfile() {
  const history = useHistory();
  const userEmailObject = JSON.parse(localStorage.getItem('user'));
  const userEmail = Object.values(userEmailObject);
  return (
    <>
      <Header props={ { search: false, title: 'Perfil' } } />
      <main className="main-container">
        <section className="main-explore">
          <h3 data-testid="profile-email">{userEmail}</h3>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            variant="light"
            size="lg"
            className="buttons"
            data-testid="profile-logout-btn"
            onClick={ () => history.push('/') }
          >
            Sair
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default UserProfile;
