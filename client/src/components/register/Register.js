/**
 * Created by pierremarsot on 18/05/2017.
 */
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {isConnected} from '../../tools/auth';
import {register, validate_informations_register} from '../../actions/register';
import Checkbox from 'material-ui/Checkbox';

class Register extends React.Component {
  constructor(props) {
    super(props);

    if(isConnected()){
      browserHistory.push('/settings');
    }

    this.state = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirm_password: '',
      siret: '',
      acceptCGU: false,
      enableRegister: true,
    };
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.token || this.props.token.length === 0){
      if(nextProps.token && nextProps.token.length > 0){
        browserHistory.push('/settings');
      }
    }
  }

  handleNom = (e) => {
    e.preventDefault();

    const nom = e.target.value;

    this.setState({
      nom: nom,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handlePrenom = (e) => {
    e.preventDefault();

    const prenom = e.target.value;

    this.setState({
      prenom: prenom,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handleEmail = (e) => {
    e.preventDefault();

    const email = e.target.value;

    this.setState({
      email: email,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handlePassword = (e) => {
    e.preventDefault();

    const password = e.target.value;

    this.setState({
      password: password,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handleConfirmPassword = (e) => {
    e.preventDefault();

    const confirm_password = e.target.value;

    this.setState({
      confirm_password: confirm_password,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handleSiret = (e) => {
    e.preventDefault();

    const siret = e.target.value;

    this.setState({
      siret: siret,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handleAgreeCGU = (e, accept) => {
    this.setState({
      acceptCGU: accept,
    }, () => {
      this.handleEnableBtnRegister();
    });
  };

  handleEnableBtnRegister = () => {
    const {
      nom,
      prenom,
      siret,
      email,
      password,
      confirm_password,
      acceptCGU,
    } = this.state;

    validate_informations_register(
      nom,
      prenom,
      siret,
      email,
      password,
      confirm_password,
      acceptCGU,
    ).then(() => {
      this.setState({
        enableRegister: false,
      });
    })
      .catch((error) => {
      console.log(error);
        this.setState({
          enableRegister: true,
        });
      });
  };

  handleRegister = (e) => {
    e.preventDefault();

    const {
      nom,
      prenom,
      siret,
      email,
      password,
      confirm_password,
      acceptCGU,
    } = this.state;

    this.props.dispatch(register(
      nom,
      prenom,
      siret,
      email,
      password,
      confirm_password,
      acceptCGU
    ));
  };

  render() {
    const {acceptCGU, enableRegister} = this.state;

    return (
      <section className="height-100 imagebg text-center bg--black">
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-7 col-md-5">
              <h2>Créez votre compte</h2>
              <p className="lead">
                Cela vous permettra de publier / gérer vos annonces
              </p>
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      placeholder="Nom"
                      onChange={this.handleNom}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      placeholder="Prénom"
                      onChange={this.handlePrenom}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="number"
                      placeholder="SIRET"
                      onChange={this.handleSiret}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={this.handleEmail}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      onChange={this.handlePassword}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="password"
                      placeholder="Confirmation du mot de passe"
                      onChange={this.handleConfirmPassword}
                    />
                  </div>
                  <div className="col-sm-12" key="9">
                    <div className="col-sm-1">
                      <Checkbox
                        checked={acceptCGU}
                        onCheck={this.handleAgreeCGU}
                        labelStyle={{color: '#03a9f4', checkedColor: '#03a9f4'}}
                        iconStyle={{fill: 'white'}}
                      />
                    </div>
                    <span>J'ai lu et j'accepte <Link to="/cgu" className="cursor">les conditions générales d'utilisation</Link></span>
                  </div>
                  <div className="col-sm-12">
                    <button
                      className="btn btn--primary type--uppercase"
                      type="submit"
                      onClick={this.handleRegister}
                      disabled={enableRegister}
                    >
                      Créez votre compte
                    </button>
                  </div>
                </div>
              </form>
              <span className="type--fine-print block">Déjà un compte ?
                                <Link to="/login">
                                  Connectez-vous
                                </Link>
                            </span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {
    token: auth.token,
  };
}

export default connect(mapStateToProps)(Register);