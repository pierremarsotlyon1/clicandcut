/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/cgu',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/cgu/Cgu').default);
    })
  }
};

export default rootRoute;