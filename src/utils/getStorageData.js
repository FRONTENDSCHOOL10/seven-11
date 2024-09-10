export function getStorageData(
  key,
  initialValue = null,
  storageType = 'local'
) {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const data = storage.getItem(key);
  return data ? JSON.parse(data) : initialValue;
}

export function setStorageData(key, value, storageType = 'local') {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.setItem(key, JSON.stringify(value));
}

export function removeStorageData(key, storageType = 'local') {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.removeItem(key);
}
