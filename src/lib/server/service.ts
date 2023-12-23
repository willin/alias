export const countRecords = async (db: D1Database): Promise<number> => {
  const stmt = db.prepare('SELECT count(1) as count FROM `aliases`');
  const result = await stmt.first();
  return result.count;
};
