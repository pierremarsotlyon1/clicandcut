/**
 * Created by pierremarsot on 20/05/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Annonce from '../annonce/Annonce';

import {load_annonces_gerant} from '../../actions/manageAnnonce';

class ManageAnnonce extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(load_annonces_gerant());
  }

  render() {

    const {annonces} = this.props;

    const tabAnnonces = [];

    if(annonces && annonces.length > 0) {
      for (const annonce of annonces) {
        tabAnnonces.push(
          <div className="col-md-12" key={annonce._id}>
            <Annonce annonce={annonce} deleted={true} updated={true} contact={false}/>
          </div>
        );
      }
    }
    else{
      tabAnnonces.push(
        <div className="boxed boxed--border" key="annonces_empty">
          <h5>Vous n'avez pas encore d'annonce</h5>
          <p>
            Dépéchez-vous d'en ajouter une !
          </p>
        </div>
      );
    }

    return (
      <section className="bg--secondary space--sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-b-45">
              <Link to="/annonces/add" className="pull-right">
                <button
                  className="btn btn--primary type--uppercase"
                >
                  Ajouter une annonce
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            {tabAnnonces}
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {manageAnnonce} = state;
  return {
    annonces: manageAnnonce.annonces,
  };
}

export default connect(mapStateToProps)(ManageAnnonce);