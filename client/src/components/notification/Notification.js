/**
 * Created by pierremarsot on 25/05/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {reset} from '../../actions/notification';

import 'react-notifications/lib/notifications.css';

const timer = 3000;

class Notification extends React.Component {
  componentWillReceiveProps(nextProps){
    if(nextProps.type && nextProps.type.length > 0 && nextProps.message && nextProps.message.length > 0){
      switch (nextProps.type) {
        case 'info':
          NotificationManager.info(nextProps.message, null, timer);
          break;
        case 'success':
          NotificationManager.success(nextProps.message, null, timer);
          break;
        case 'warning':
          NotificationManager.warning(nextProps.message, null, timer);
          break;
        case 'error':
          NotificationManager.error(nextProps.message, null, timer);
          break;
      }

      this.props.dispatch(reset());
    }
  }

  render(){
    return (
      <div>
        <NotificationContainer/>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {notification} = state;
  return {
    type: notification.type,
    message: notification.message,
  };
}

export default connect(mapStateToProps)(Notification);