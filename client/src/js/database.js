import { openDB } from 'idb';

const initdb = async () =>
  openDB('text-editor-pwa', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-editor-pwa')) {
        console.log('text-editor-pwa database already exists');
        return;
      }
      db.createObjectStore('text-editor-pwa', {
        keyPath: 'id',
        autoIncrement: true,
      });
      console.log('text-editor-pwa database created');
    },
  });


export const putDb = async (content) => {
  console.log('Put to the database');

  // Create a connection to the database database and version we want to use.
  const txteditorDb = await openDB('text-editor-pwa', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = txteditorDb.transaction('text-editor-pwa', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('text-editor-pwa');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ content: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const txteditorDb = await openDB('text-editor-pwa', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = txteditorDb.transaction('text-editor-pwa', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('text-editor-pwa');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
