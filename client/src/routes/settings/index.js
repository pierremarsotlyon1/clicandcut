/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/settings',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/settings/Settings').default);
    })
  }
};

export default rootRoute;