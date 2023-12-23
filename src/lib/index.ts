// place files you want to import through the `$lib` alias in this folder.
export const domains = [
  //
  'js.cool',
  'css.fund',
  'kaiyuan.fund',
  'log.lu',
  'sh.gg',
  'v0.chat'
];

export const MAX_LIMIT_USER = 0 as const;
export const MAX_LIMIT_FOLLOWER = 5 as const;
export const MAX_LIMIT_VIP = 20 as const;
export const MAX_LIMIT_ADMIN = 100 as const;

export type Alias = {
  alias: string;
  owner: string;
  account: string;
  created_at: string;
};
