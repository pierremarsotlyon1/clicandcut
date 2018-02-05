/**
 * Created by pierremarsot on 18/05/2017.
 */
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {isConnected} from '../../tools/auth';
import {login} from '../../actions/login';

class EspacePro extends React.Component {
  constructor(props) {
    super(props);

    if(isConnected()){
      browserHistory.push('/settings');
    }

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.token || this.props.token.length === 0){
      if(nextProps.token && nextProps.token.length > 0){
        browserHistory.push('/settings');
      }
    }
  }

  handleEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;

    this.setState({
      email: email,
    });
  };

  handlePassword = (e) => {
    e.preventDefault();

    const password = e.target.value;

    this.setState({
      password: password,
    });
  };

  connexion = (e) => {
    e.preventDefault();

    const {
      email,
      password
    } = this.state;

    this.props.dispatch(login(email, password));
  };

  render() {
    return (
      <section className="height-100 imagebg text-center bg--black">
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-7 col-md-5">
              <h2>Connectez-vous</h2>
              <p className="lead">
                Connectez-vous pour avoir accès à votre page d'administration
              </p>
              <form>
                <div className="row">
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
                    <button
                      className="btn btn--primary type--uppercase"
                      type="submit"
                      onClick={this.connexion}
                    >
                      Connectez-vous
                    </button>
                  </div>
                </div>
              </form>
              <span className="type--fine-print block">Vous n'avez pas de compte ?
                                <Link to="/register">
                                  Créez le
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

export default connect(mapStateToProps)(EspacePro);