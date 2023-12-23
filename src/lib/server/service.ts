import type { Alias } from '$lib';

export const countRecords = async (db: D1Database): Promise<number> => {
  const stmt = db.prepare('SELECT count(1) as count FROM `aliases`');
  const result = await stmt.first();
  return result.count;
};

export const getUserAliases = async (
  db: D1Database,
  userId: string
): Promise<Alias[]> => {
  const stmt = db
    .prepare(
      'SELECT * FROM `aliases` WHERE `owner` = ?1 ORDER BY `created_at` DESC'
    )
    .bind(userId);
  const { results } = await stmt.all();
  return results;
};

export const checkUserAlias = async (
  db: D1Database,
  alias: string
): Promise<boolean> => {
  const stmt = db
    .prepare('SELECT count(1) as count FROM `aliases` WHERE `alias` = ?1')
    .bind(alias);
  const { count } = await stmt.first();
  return count === 0;
};

export const deleteUserAlias = async (
  db: D1Database,
  userId: string,
  alias: string
): Promise<boolean> => {
  const stmt = db
    .prepare(
      'DELETE FROM `aliases` WHERE `owner` = ?1 AND `alias` = ?2 LIMIT 1'
    )
    .bind(userId, alias);
  const { success } = await stmt.run();
  return success;
};

export const createUserAlias = async (
  db: D1Database,
  userId: string,
  alias: string,
  account: string
): Promise<boolean> => {
  const stmt = db
    .prepare(
      'INSERT INTO `aliases` (`owner`, `alias`, `account`) VALUES (?1, ?2, ?3)'
    )
    .bind(userId, alias, account);
  const { success } = await stmt.run();
  return success;
};
