import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardContainer from './components/CardContainer/CardContainer';
import EpisodesCardContainer from './components/CardContainer/EpisodesCardContainer'
import LocationsCardContainer from './components/CardContainer/LocationsCardContainer'
import SideNavPage from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { connect } from 'react-redux';
import { getEpisodesAction, eraseFilterEpisodesAction } from './redux/episodesDuck'
import { eraseFilterCharacterAction, getCharactersAction } from './redux/charactersDuck'
import { getLocationsAction, eraseFilterLocationAction } from './redux/locationsDuck'


function App({ general, 
  getEpisodesAction, 
  eraseFilterEpisodesAction, 
  eraseFilterCharacterAction, 
  getLocationsAction, 
  eraseFilterLocationAction }) {

  function selectContainer() {
    eraseFilters()

    switch (general) {
      case 'characters':
        getCharactersAction()
        return <CardContainer />
      case 'episodes':
        getEpisodesAction()
        return <EpisodesCardContainer />
      case 'locations':
        getLocationsAction()
        return <LocationsCardContainer />
      default:
        return 'characters'
    }
  }

  function eraseFilters() {
    eraseFilterEpisodesAction()
    eraseFilterCharacterAction()
    eraseFilterLocationAction()
  }

  return (
    <div className="app">
      <div className="d-flex flex-column flex-sm-row">
        <SideNavPage />
        {selectContainer()}
      </div>
      <Footer />
    </div>
  );
}

function mapStateToProps(store) {
  return {
    general: store.general.radio
  }
}

export default connect(mapStateToProps, { getCharactersAction, getEpisodesAction, eraseFilterEpisodesAction, eraseFilterCharacterAction, getLocationsAction, eraseFilterLocationAction })(App);
