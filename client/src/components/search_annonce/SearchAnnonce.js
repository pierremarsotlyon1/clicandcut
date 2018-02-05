import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import Geosuggest from 'react-geosuggest';
import Annonce from '../annonce/Annonce';

import {search_annonce, search_more_annonce} from '../../actions/searchAnnonce';
import '../home/geosuggest.css'

const sizeSearchAnnonce = 10;

class SearchAnnonce extends React.Component {
  constructor(props) {
    super(props);

    //On récup le lat
    const lat = this.props.params.lat;
    if (!lat) {
      //redirect vers home
      return browserHistory.push("/");
    }

    const lon = this.props.params.lon;
    if (!lon) {
      //redirect vers home
      return browserHistory.push("/");
    }

    this.state = {
      lat: lat,
      lon: lon,
      canSearch: false,
      index: 0,
    };

    this.props.dispatch(search_annonce(this.state.lat, this.state.lon, this.state.index));
  }

  searchPlace = (geosuggest) => {
    if (!geosuggest || !geosuggest.location || !geosuggest.location.lat || !geosuggest.location.lng) {
      this.disableSearchButton();
    }

    this.setState({
      lat: geosuggest.location.lat,
      lon: geosuggest.location.lng,
    }, () => {
      this.enableSearchButton();
    });
  };

  disableSearchButton = () => {
    this.setState({
      canSearch: false,
      lat: 0,
      lon: 0,
    });
  };

  enableSearchButton = () => {
    this.setState({
      canSearch: true,
    });
  };

  showMore = (e) => {
    e.preventDefault();

    const index = this.state.index + sizeSearchAnnonce;

    this.setState({
      index: index,
    }, () => {
      this.props.dispatch(search_more_annonce(this.state.lat, this.state.lon, this.state.index));
    });
  };

  search = (e) => {
    e.preventDefault();

    this.setState({
      index: 0,
    }, () => {
      this.props.dispatch(search_annonce(this.state.lat, this.state.lon, this.state.index));
    });
  };

  render() {

    const {
      annonces
    } = this.props;

    const tabAnnonces = [];

    if (annonces.length > 0) {
      for (const annonce of annonces) {
        tabAnnonces.push(
          <Annonce
            annonce={annonce}
            deleted={false}
            updated={false}
            contact={true}
            key={annonce._id}
          />
        )
      }
    }
    else {
      tabAnnonces.push(
        <div className="row" key="nan">
          <div className="col-sm-12">
            <div className="alert alert-info">
              Aucune annonce pour cette zone de recherche
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="bg--secondary space--sm">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="boxed boxed--border boxed--lg">
                <div className="sidebar__widget">
                  <h5>Localisation</h5>
                  <form>
                    <div className="col-md-12">
                      <Geosuggest
                        onSuggestSelect={this.searchPlace}
                        onSuggestNoResults={this.disableSearchButton}
                        placeholder="Saisissez une ville, une adresse ..."
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn--primary type--uppercase"
                        onClick={this.search}
                      >Rechercher
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-8">
              {tabAnnonces}
              <div className="col-md-4 col-md-offset-4 col-sm-12">
                <button
                  className="col-md-12 col-sm-12 col-xs-12 btn btn--primary type--uppercase"
                  onClick={this.showMore}
                >
                  En voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {searchAnnonce} = state;

  if (!searchAnnonce) {
    return {
      annonces: [],
    };
  }

  return {
    annonces: searchAnnonce.annonces,
  };
}

export default connect(mapStateToProps)(SearchAnnonce);