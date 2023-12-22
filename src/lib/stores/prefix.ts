import { page } from '$app/stores';
import { fallbackLng } from '$lib/i18n';
import { locales } from '@svelte-dev/i18n';
import { derived } from 'svelte/store';

export const linkPrefix = derived([page, locales], ([$page, $locales]) => {
  const path = $page.url.pathname.split('/');
  const lang = $locales.includes(path?.[1]) ? path?.[1] : fallbackLng;
  return lang === fallbackLng ? '' : `/${lang}`;
});
