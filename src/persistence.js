const namespace = "deepdiv";

function get(key) {
  const item = JSON.parse(localStorage.getItem(addNamespace(key)));
  return Promise.resolve(item);
}

function set(key, item) {
  localStorage.setItem(addNamespace(key), JSON.stringify(item));
  return Promise.resolve(item);
}

function remove(key) {
  localStorage.removeItem(key);
  return Promise.resolve(addNamespace(key));
}

function addNamespace(key) {
  return `${namespace}.${key}`;
}

export default {
  get,
  set,
  remove
};
