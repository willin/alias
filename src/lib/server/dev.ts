export const createD1 = async (storageOptions: StorageOptions) => {
  const { createSQLiteDB } = await import('@miniflare/shared');
  const { D1Database, D1DatabaseAPI } = await import('@miniflare/d1');

  if (storageOptions.type === 'memory') {
    const sqliteDb = await createSQLiteDB(':memory:');
    return new D1Database(new D1DatabaseAPI(sqliteDb));
  } else if (storageOptions.type === 'file') {
    const sqliteDb = await createSQLiteDB(storageOptions.path);
    return new D1Database(new D1DatabaseAPI(sqliteDb));
  }

  throw new Error('StorageType not found');
};
