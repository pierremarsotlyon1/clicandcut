/**
 * Created by pierremarsot on 20/05/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import '../home/geosuggest.css'
import Toggle from 'material-ui/Toggle';

import {add_annonce, update_annonce, set_annonce_to_update} from '../../actions/manageAnnonce';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

class AddAnnonce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      _source: {
        titre: '',
        tarif: 0,
        name_shop: '',
        location: {
          lat: 0,
          lon: 0,
        },
        description: '',
        lundi: true,
        mardi: true,
        mercredi: true,
        jeudi: true,
        vendredi: true,
        samedi: true,
        dimanche: false,
        wifi: true,
        telephone: false,
        client_gerant: false,
        photo: '',
        address: '',
        phone_number: '',
      },
      adding: true,
      updating: false,
    };
  }

  componentDidMount(){
    const _id = this.props.params.id;

    if(_id && _id.length > 0){
      //On est en train d'update une annonce
      this.setState({
        adding: false,
        updating: true,
      });

      //On va rechercher l'annonce
      this.props.dispatch(set_annonce_to_update(_id));
    }
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.annonce_to_update || this.props.annonce_to_update !== nextProps.annonce_to_update){
      const annonceToUpdate = nextProps.annonce_to_update;
      this.setState({
        _id: annonceToUpdate._id,
        _source: annonceToUpdate._source,
      })
    }
  }

  setSource = (_source) => {
    this.setState({
      _source: _source
    });
  };

  handleTitre = (e) => {
    const {_source} = this.state;

    _source.titre = e.target.value;

    this.setSource(_source)
  };

  handleTarif = (e) => {
    const {_source} = this.state;

    _source.tarif = e.target.value;

    this.setSource(_source)
  };

  handleNomSalon = (e) => {
    const {_source} = this.state;

    _source.name_shop = e.target.value;

    this.setSource(_source)
  };

  searchPlace = (geosuggest) => {
    if (!geosuggest || !geosuggest.location || !geosuggest.location.lat || !geosuggest.location.lng) {
      return false;
    }

    const {_source} = this.state;

    _source.location.lat = geosuggest.location.lat;
    _source.location.lon = geosuggest.location.lng;

    this.setSource(_source);
  };

  searchPlaceEmpty = () => {
    const {_source} = this.state;

    _source.lat = 0;
    _source.lon = 0;

    this.setSource(_source);
  };

  handlePhoneNumber = (e) => {
    const {_source} = this.state;

    _source.phone_number = e.target.value;

    this.setSource(_source)
  };

  handleDescription = (e) => {
    const {_source} = this.state;

    _source.description = e.target.value;

    this.setSource(_source)
  };

  handleLundi = (e, isChecked) => {
    const {_source} = this.state;

    _source.lundi = isChecked;

    this.setSource(_source)
  };

  handleMardi = (e, isChecked) => {
    const {_source} = this.state;

    _source.mardi = isChecked;

    this.setSource(_source)
  };

  handleMercredi = (e, isChecked) => {
    const {_source} = this.state;

    _source.mercredi = isChecked;

    this.setSource(_source)
  };

  handleJeudi = (e, isChecked) => {
    const {_source} = this.state;

    _source.jeudi = isChecked;

    this.setSource(_source)
  };

  handleVendredi = (e, isChecked) => {
    const {_source} = this.state;

    _source.vendredi = isChecked;

    this.setSource(_source)
  };

  handleSamedi = (e, isChecked) => {
    const {_source} = this.state;

    _source.samedi = isChecked;

    this.setSource(_source)
  };

  handleDimanche = (e, isChecked) => {
    const {_source} = this.state;

    _source.dimanche = isChecked;

    this.setSource(_source)
  };

  handleWifi = (e, isChecked) => {
    const {_source} = this.state;

    _source.wifi = isChecked;

    this.setSource(_source)
  };

  handleTelephone = (e, isChecked) => {
    const {_source} = this.state;

    _source.telephone = isChecked;

    this.setSource(_source)
  };

  handleClientGerant = (e, isChecked) => {
    const {_source} = this.state;

    _source.client_gerant = isChecked;

    this.setSource(_source)
  };

  handleSubmitAnnonce = (e) => {
    e.preventDefault();

    const {_source} = this.state;

    this.props.dispatch(add_annonce(
      _source.titre,
      _source.tarif,
      _source.name_shop,
      _source.location,
      _source.description,
      _source.lundi,
      _source.mardi,
      _source.mercredi,
      _source.jeudi,
      _source.vendredi,
      _source.samedi,
      _source.dimanche,
      _source.wifi,
      _source.telephone,
      _source.client_gerant,
      _source.photo,
      _source.phone_number,
    ));
  };

  handleUpdatedAnnonce = (e) => {
    e.preventDefault();

    const {_source, _id} = this.state;

    this.props.dispatch(update_annonce(
      _id,
      _source.titre,
      _source.tarif,
      _source.name_shop,
      _source.location,
      _source.description,
      _source.lundi,
      _source.mardi,
      _source.mercredi,
      _source.jeudi,
      _source.vendredi,
      _source.samedi,
      _source.dimanche,
      _source.wifi,
      _source.telephone,
      _source.client_gerant,
      _source.photo,
      _source.phone_number,
    ));
  };

  render() {

    const {_source, adding, updating} = this.state;

    let buttonFormulaire = undefined;

    if(adding){
      buttonFormulaire = <button type="submit" className="btn btn--primary" onClick={this.handleSubmitAnnonce}>Ajouter l'annonce</button>;
    }
    else if(updating){
      buttonFormulaire = <button type="submit" className="btn btn--primary" onClick={this.handleUpdatedAnnonce}>Modifier l'annonce</button>;
    }

    return (
      <section className="bg--secondary space--sm">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12 col-md-offset-3">
              <form>
                <div className="row m-b-15">
                  <h4>Informations :</h4>
                  <div className="col-sm-12">
                    <label>Titre</label>
                    <input type="text" className="validate-required" value={_source.titre} onChange={this.handleTitre}/>
                  </div>
                  <div className="col-sm-12">
                    <label>Tarif journalier</label>
                    <input type="number" className="validate-required" value={_source.tarif}
                           onChange={this.handleTarif}/>
                  </div>
                  <div className="col-sm-12">
                    <label>Nom du salon</label>
                    <input type="text" className="validate-required" value={_source.name_shop}
                           onChange={this.handleNomSalon}/>
                  </div>
                  <div className="col-sm-12">
                    <label>Adresse du salon</label>
                    <Geosuggest
                      onSuggestSelect={this.searchPlace}
                      onSuggestNoResults={this.searchPlaceEmpty}
                      placeholder="Adresse du salon"
                      initialValue={_source.address}
                    />
                  </div>
                  <div className="col-sm-12">
                    <label>Numéro de contact</label>
                    <input type="text" className="validate-required" value={_source.phone_number}
                           onChange={this.handlePhoneNumber}/>
                  </div>
                  <div className="col-sm-12">
                    <label>Description</label>
                    <textarea value={_source.description} className="validate-required" rows="4" onChange={this.handleDescription}>
                    </textarea>
                  </div>
                </div>

                <div className="row m-t-15">
                  <h4>Jours disponibles à la location :</h4>
                  <div style={styles.block}>
                    <div className="col-sm-12">
                      <Toggle
                        label="Lundi :"
                        defaultToggled={_source.lundi}
                        style={styles.toggle}
                        onToggle={this.handleLundi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Mardi :"
                        defaultToggled={_source.mardi}
                        style={styles.toggle}
                        onToggle={this.handleMardi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Mercredi :"
                        defaultToggled={_source.mercredi}
                        style={styles.toggle}
                        onToggle={this.handleMercredi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Jeudi :"
                        defaultToggled={_source.jeudi}
                        style={styles.toggle}
                        onToggle={this.handleJeudi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Vendredi :"
                        defaultToggled={_source.vendredi}
                        style={styles.toggle}
                        onToggle={this.handleVendredi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Samedi :"
                        defaultToggled={_source.samedi}
                        style={styles.toggle}
                        onToggle={this.handleSamedi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Dimanche :"
                        defaultToggled={_source.dimanche}
                        style={styles.toggle}
                        onToggle={this.handleDimanche}
                      />
                    </div>
                  </div>
                </div>

                <div className="row m-t-15">
                  <h4>Services disponibles :</h4>
                  <div style={styles.block}>
                    <div className="col-sm-12">
                      <Toggle
                        label="Wifi :"
                        defaultToggled={_source.wifi}
                        style={styles.toggle}
                        onToggle={this.handleWifi}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Telephone :"
                        defaultToggled={_source.telephone}
                        style={styles.toggle}
                        onToggle={this.handleTelephone}
                      />
                    </div>
                    <div className="col-sm-12">
                      <Toggle
                        label="Coiffer vos clients :"
                        defaultToggled={_source.client_gerant}
                        style={styles.toggle}
                        onToggle={this.handleClientGerant}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  {buttonFormulaire}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {manageAnnonce} = state;
  return {
    annonce_to_update: manageAnnonce.annonce_to_update,
  };
}

export default connect(mapStateToProps)(AddAnnonce);