/**
 * Created by pierremarsot on 20/05/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {remove_annonce} from '../../actions/manageAnnonce';

class Annonce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showContact: false,
    };
  }

  removed = (_id) => {
    this.props.dispatch(remove_annonce(_id));
  };

  updated = (_id) => {
    browserHistory.push('/annonces/update/' + _id);
  };

  showContact = (e) => {
    e.preventDefault();

    this.setState({
      showContact: true,
    })
  };

  render() {
    const {
      annonce,
      deleted,
      updated,
      contact
    } = this.props;

    const {
      showContact
    } = this.state;

    let joursOuversLocation = [];
    let servicesDisponibles = [];
    let btnRemoved = undefined;
    let btnUpdate = undefined;
    let blockContact = undefined;
    let cardTop = undefined;

    if (contact) {
      if (showContact) {
        blockContact = <div className="col-md-12" key="contact">
          <a className="btn btn--primary btn--icon" href="#">
                                <span className="btn__text">
                                    <i className="icon-Phone-Wifi"></i> {annonce._source.phone_number}</span>
          </a>
        </div>
      }
      else {
        blockContact = <div className="col-md-12" key="contact">
          <button
            className="btn btn--primary type--uppercase"
            type="submit"
            onClick={this.showContact}
          >
            <span className="btn__text">Contacter le gérant</span>
          </button>
        </div>
      }
    }

    if (deleted) {
      btnRemoved = <div className="col-md-6" key="deleted">
        <button
          className="btn btn--primary-2 type--uppercase"
          type="submit"
          onClick={() => this.removed(annonce._id)}
        >
          <span className="btn__text">Supprimer</span>
        </button>
      </div>
    }

    if (updated) {
      btnUpdate = <div className="col-md-6" key="updated">
        <button
          className="btn btn--primary type--uppercase"
          type="submit"
          onClick={() => this.updated(annonce._id)}
        >
          Modifier
        </button>
      </div>
    }

    if (annonce._source.photo && annonce._source.photo.length > 0) {
      cardTop = <div className="card__top">
        <a href="#">
          <img alt="Image" src={annonce._source.photo}/>
        </a>
      </div>
    }

    if (annonce._source.lundi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="lundi">
          Lundi
        </div>
      );
    }

    if (annonce._source.mardi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="mardi">
          Mardi
        </div>
      );
    }

    if (annonce._source.mercredi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="mercredi">
          Mercredi
        </div>
      );
    }

    if (annonce._source.jeudi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="jeudi">
          Jeudi
        </div>
      );
    }

    if (annonce._source.vendredi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="vendredi">
          Vendredi
        </div>
      );
    }

    if (annonce._source.samedi) {
      joursOuversLocation.push(
        <div className="col-md-12" key="samedi">
          Samedi
        </div>
      );
    }

    if (annonce._source.dimanche) {
      joursOuversLocation.push(
        <div className="col-md-12" key="dimanche">
          Dimanche
        </div>
      );
    }

    if (annonce._source.wifi) {
      servicesDisponibles.push(
        <div className="col-md-12" key="wifi">
          Wifi
        </div>
      );
    }

    if (annonce._source.telephone) {
      servicesDisponibles.push(
        <div className="col-md-12" key="telephone">
          Telephone
        </div>
      );
    }

    if (annonce._source.client_gerant) {
      servicesDisponibles.push(
        <div className="col-md-12" key="client_gerant">
          Prise en charge des clients du salon
        </div>
      );
    }

    //On regarde si on a au moins un service
    if(servicesDisponibles.length === 0){
      servicesDisponibles.push(
        <div className="col-md-12" key="client_gerant">
          Aucun service disponible
        </div>
      );
    }

    return (
      <div className="row" key={annonce._id}>
        <div className="col-sm-12 boxed boxed--lg">
          <div className="card card-2 text-center">
            {cardTop}
            <div className="card__body">
              <h4>{annonce._source.titre}</h4>
              <p>
                {annonce._source.description}
              </p>

              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <h6>Ouvert à la location le :</h6>
                  </div>
                  <div className="row">
                    {joursOuversLocation}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <h6>Services disponibles :</h6>
                  </div>
                  <div className="row">
                    {servicesDisponibles}
                  </div>
                </div>
              </div>
              <div className="row m-t-15">
                <div className="col-md-12 text-center">
                  <div className="row">
                    <h6>Adresse :</h6>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {annonce._source.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card__bottom text-center">
              <div className="card__action float-none-important">
                <span className="h6 type--uppercase">Tarif journalier</span>
                <p>
                  {annonce._source.tarif} €
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12 m-t-15">
            {btnRemoved}
            {btnUpdate}
            {blockContact}
          </div>
        </div>
      </div>
    )
  }
}

Annonce.propTypes = {
  annonce: PropTypes.object.isRequired,
  deleted: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  contact: PropTypes.bool.isRequired,
};

export default connect()(Annonce);