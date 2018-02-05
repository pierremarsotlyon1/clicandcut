/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/search/annonce/:lat/:lon',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/search_annonce/SearchAnnonce').default);
    })
  }
};

export default rootRoute;