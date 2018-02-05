/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/login',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/login/Login').default);
    })
  }
};

export default rootRoute;