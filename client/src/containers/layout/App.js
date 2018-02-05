import React  from 'react';
import Header from '../../components/header/Header';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Notification from '../../components/notification/Notification';

injectTapEventPlugin();

const App = (props) => (
  <MuiThemeProvider>
    <div>
      <Notification/>
      <Header/>
      <div className="main-container">
        {props.children}
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
