/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/register',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/register/Register').default);
    })
  }
};

export default rootRoute;