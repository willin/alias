import type { ParamMatcher } from '@sveltejs/kit';
import { getLocales } from '@svelte-dev/i18n';

export const match: ParamMatcher = (param) => {
  return getLocales().includes(param);
};
