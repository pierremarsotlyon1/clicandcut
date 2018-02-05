/**
 * Created by pierremarsot on 14/05/2017.
 */
import React, {PropTypes} from 'react'
import Geosuggest from 'react-geosuggest';
import './geosuggest.css'
import { browserHistory } from 'react-router'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      canSearch: false,
    };
  }

  searchPlace = (geosuggest) => {
    if(!geosuggest || !geosuggest.location || !geosuggest.location.lat || !geosuggest.location.lng){
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

  search = (e) => {
    e.preventDefault();

    browserHistory.push('/search/annonce/'+this.state.lat+"/"+this.state.lon);
  };

  render(){
    return (
      <div>
        <section className="bg--secondary text-center">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>Trouve ton fauteuil</h1>
                <p className="lead">
                  Site d'annonce de location de fauteuil dans les salons de coiffure
                </p>
                <div className="boxed boxed--lg bg--secondary text-left">
                  <form className="form--horizontal">
                    <div className="col-sm-10">
                      <Geosuggest
                        onSuggestSelect={this.searchPlace}
                        onSuggestNoResults={this.disableSearchButton}
                        placeholder="Saisissez une ville, une adresse ..."
                      />
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="submit"
                        className="btn btn--primary type--uppercase"
                        onClick={this.search}
                        disabled={!this.state.canSearch}
                      >Rechercher</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <h2>Ce que nous vous apportons</h2>
                <p className="lead">
                  Une nouvelle façon de générer du CA pour le gérant d'un salon de coiffure et une facilité de travail pour les coiffeurs indépendants
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                  <i className="icon icon--lg icon-Bicycle"></i>
                  <h4>Générer du CA</h4>
                  <p>
                    Une nouvelle façon de combler les fauteuils vides de votre salon de coiffure en les louant à des coiffeurs indépendants
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                  <i className="icon icon--lg icon-Business-ManWoman"></i>
                  <h4>Des rencontres</h4>
                  <p>
                    Rencontrer d'autres coiffeurs pour partager vos savoirs-faire entre vous et vos employés
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                  <i className="icon icon--lg icon-Phone-Wifi"></i>
                  <h4>Envie d'un local physique</h4>
                  <p>
                    La location d'un fauteuil dans un salon de coiffure vous permettra d'accueillir vos clients dans un espace professionnel
                  </p>
                </div>
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col-sm-4 col-sm-offset-2">
                <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                  <i className="icon icon--lg icon-Coffee-Machine"></i>
                  <h4>La centrale d'achat</h4>
                  <p>
                    Cette centrale vous permettra de commander vos produits avec un maximum de réduction.
                  </p>
                  <span className="label">A venir</span>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                  <i className="icon icon--lg icon-Laptop-3"></i>
                  <h4>Bourse à l'emploi</h4>
                  <p>
                    Un besoin temporaire, journalier ou définitif ? Trouvez l'emploi qu'il vous faut grâce à cette fonctionnalité
                  </p>
                  <span className="label">A venir</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  router: PropTypes.object
};

export default Home;