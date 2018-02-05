/**
 * Created by pierremarsot on 14/05/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';

import {logout} from '../../actions/logout';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      menuMobile: false,
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.token && this.props.token.length > 0){
      if(!nextProps.token || nextProps.token.length === 0){
        browserHistory.push('/');
      }
    }
  }

  handleLogout = (e) => {
    e.preventDefault();

    this.props.dispatch(logout());
  };

  showMenuMobile = (e) => {
    e.preventDefault();

    this.setState({
      menuMobile: !this.state.menuMobile,
    });
  };

  render() {
    const {
      token
    } = this.props;

    const {
      menuMobile
    } = this.state;

    let classMenu =
      menuMobile ? "bar bar--sm bar-1 bg--white" : "bar bar--sm bar-1 hidden-xs hiddem-sm bg--secondary";

    let menu = [];

    if (!token || token.length === 0) {
      menu.push(
        <li key="1">
          <Link to="/login">
            Espace pro
          </Link>
        </li>
      );
    }
    else {
      menu.push(
        <li key="3">
          <Link to="/settings">
            Mes informations
          </Link>
        </li>
      );
      menu.push(
        <li key="2">
          <Link to="/annonces">
            Mes annonces
          </Link>
        </li>
      );
      menu.push(
        <li key="1">
          <Link onClick={this.handleLogout}>
            Déconnexion
          </Link>
        </li>
      );
    }

    return (
      <div className="nav-container ">
        <div className="bar bar--sm visible-xs bg--secondary">
          <div className="container">
            <div className="row">
              <div className="col-xs-3 col-sm-4">
                <Link to="/">
                  <img className="logo logo-dark" alt="logo" src="/assets/img/logo.png"/>
                  <img className="logo logo-light" alt="logo" src="/assets/img/logo.png"/>
                </Link>
              </div>
              <div className="col-xs-9 col-sm-10 text-right">
                <a href="#" className="hamburger-toggle" data-toggle-className="#menu1;hidden-xs" onClick={this.showMenuMobile}>
                  <i className="icon icon--sm stack-interface stack-menu"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav id="menu1" className={classMenu}>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-2 hidden-xs">
                <div className="bar__module">
                  <Link to="/">
                    <img className="logo logo-dark" alt="logo" src="/assets/img/logo.png"/>
                    <img className="logo logo-light" alt="logo" src="/assets/img/logo.png"/>
                  </Link>
                </div>
              </div>
              <div className="col-md-9 col-sm-10 text-right text-left-xs text-right-sm">
                <div className="bar__module">
                  <ul className="menu-horizontal">
                    {menu}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {auth} = state;

  return {
    token: auth.token,
  };
}

export default connect(mapStateToProps)(Header);