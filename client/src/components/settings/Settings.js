/**
 * Created by pierremarsot on 19/05/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {isConnected} from '../../tools/auth';
import {browserHistory} from 'react-router';

import {
  load_profile_gerant,
  update_profile_gerant,
  update_password_gerant
} from '../../actions/profile';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    if(!isConnected()){
      browserHistory.push('/');
    }

    this.state = {
      gerant: null,
      tabAccountInformations: true,
      tabAccountPassword: false,
      newPassword: '',
      confirmNewPassword: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gerant) {
      this.setState({
        gerant: nextProps.gerant,
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(load_profile_gerant());
  }

  handleNom = (e) => {
    e.preventDefault();

    const gerant = this.state.gerant;

    gerant._source.nom = e.target.value;

    this.setState({
      gerant: gerant,
    });
  };

  handlePrenom = (e) => {
    e.preventDefault();

    const gerant = this.state.gerant;

    gerant._source.prenom = e.target.value;

    this.setState({
      gerant: gerant,
    });
  };

  handleSiret = (e) => {
    e.preventDefault();

    const gerant = this.state.gerant;

    gerant._source.siret = e.target.value;

    this.setState({
      gerant: gerant,
    });
  };

  handleSaveProfile = (e) => {
    e.preventDefault();

    const gerant = this.state.gerant;

    this.props.dispatch(update_profile_gerant(gerant._source.nom, gerant._source.prenom, gerant._source.siret));
  };

  handleTabAccountPassword = (e) => {
    e.preventDefault();
    this.setState({
      tabAccountInformations: false,
      tabAccountPassword: true,
    });
  };

  handleTabAccountInformations = (e) => {
    e.preventDefault();
    this.setState({
      tabAccountInformations: true,
      tabAccountPassword: false,
    });
  };

  handleNewPassword = (e) => {
    e.preventDefault();

    this.setState({
      newPassword: e.target.value,
    });
  };

  handleConfirmNewPassword = (e) => {
    e.preventDefault();

    this.setState({
      confirmNewPassword: e.target.value,
    });
  };

  handleChangePassword = (e) => {
    e.preventDefault();

    this.props.dispatch(update_password_gerant(this.state.newPassword, this.state.confirmNewPassword));
  };

  render() {
    const {gerant} = this.props;
    const {tabAccountInformations, tabAccountPassword, newPassword, confirmNewPassword} = this.state;

    //On initialise les informations du formulaire "informations gérant"
    const nom = gerant ? gerant._source.nom : '';
    const prenom = gerant ? gerant._source.prenom : '';
    const email = gerant ? gerant._source.email : '';
    const siret = gerant ? gerant._source.siret : '';

    //On regarde quelle tab on va afficher
    let tab = undefined;
    if (tabAccountInformations) {
      tab = <div id="account-profile" className="account-tab">
        <h4>Mes informations</h4>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <label>Nom</label>
              <input type="text" value={nom} onChange={this.handleNom}/>
            </div>
            <div className="col-sm-6">
              <label>Prénom</label>
              <input type="text" value={prenom} onChange={this.handlePrenom}/>
            </div>
            <div className="col-sm-12">
              <label>SIRET</label>
              <input type="text" value={siret} onChange={this.handleSiret}/>
            </div>
            <div className="col-md-5 col-sm-6 text-center">
              <button
                type="submit"
                className="btn btn--primary type--uppercase"
                onClick={this.handleSaveProfile}
              >
                Sauvegarder mes informations
              </button>
            </div>
          </div>
        </form>
      </div>;
    }
    else if (tabAccountPassword) {
      tab = <div id="account-password" className="account-tab">
        <h4>Changement du mot de passe</h4>
        <form>
          <div className="row">
            <div className="col-sm-6">
              <label>Nouveau mot de passe</label>
              <input type="password" name="new-password" value={newPassword} onChange={this.handleNewPassword}/>
            </div>
            <div className="col-sm-6">
              <label>Confirmer le mot de passe:</label>
              <input type="password" name="new-password-confirm" value={confirmNewPassword}
                     onChange={this.handleConfirmNewPassword}/>
            </div>
            <div className="col-md-6 col-sm-6">
              <button
                type="submit"
                className="btn btn--primary type--uppercase"
                onClick={this.handleChangePassword}
              >
                Changer mon mot de passe
              </button>
            </div>
          </div>
        </form>
      </div>
    }

    return (
      <section className="bg--secondary space--sm">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="boxed boxed--lg boxed--border">
                <div className="text-block">
                  <ul className="menu-vertical">
                    <li>
                      <a href="#account-profile" onClick={this.handleTabAccountInformations}>
                        Mes informations
                      </a>
                    </li>
                    <li>
                      <a href="#account-password" onClick={this.handleTabAccountPassword}>
                        Modifier mon mot de passe</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="boxed boxed--lg boxed--border">
                {tab}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {profile} = state;
  return {
    gerant: profile.gerant,
  };
}

export default connect(mapStateToProps)(Settings);