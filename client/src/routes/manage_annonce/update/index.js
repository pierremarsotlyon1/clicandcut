/**
 * Created by pierremarsot on 20/05/2017.
 */
const rootRoute = {
  path: '/annonces/update/:id',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../components/manage_annonce/ManageAnnonce').default);
    })
  }
};

export default rootRoute;