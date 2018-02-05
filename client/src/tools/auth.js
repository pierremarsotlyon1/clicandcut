/**
 * Created by pierremarsot on 19/05/2017.
 */
import {getToken} from '../tools/localStorage';

export function isConnected(){
  const token = getToken();

  return token && token.length > 0;
}