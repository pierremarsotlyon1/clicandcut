export const ID_TOKEN = 'id_token_coiffure_user';
export const TYPE_USER = "type_user_getachamp";

export function getToken()
{
  try
  {
    return getLocalStorage(ID_TOKEN);
  }
  catch(e)
  {
    return undefined;
  }
}

export function setLocalStorage(key, value) {
  try
  {
    localStorage.setItem(key, value);
    const verif = getLocalStorage(key);

    return verif !== null && verif !== undefined;
  }
  catch(e)
  {
    return false;
  }

}

export function deleteLocalStorage(key) {
  try
  {
    localStorage.removeItem(key);
    return true;
  }
  catch(e)
  {
    return false;
  }
}

export function clearLocalStorage() {
  try
  {
    localStorage.clear();
    return true;
  }
  catch(e)
  {
    return false;
  }
}

export function getLocalStorage(key)
{
  try
  {
    return localStorage.getItem(key);
  }
  catch(e)
  {
    return undefined;
  }
}