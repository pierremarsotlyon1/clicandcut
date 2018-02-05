/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/annonces',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./add/index').default,
        require('./update/index').default,
      ]);
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../components/manage_annonce/AffichageAnnonce').default,
      });
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../containers/manage_annonce/ManageAnnonceGerant').default);
    })
  }
};

export default rootRoute;