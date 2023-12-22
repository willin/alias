<script>
  import { getPossibleLocales, locales } from '@svelte-dev/i18n';
  import { fallbackLng } from '$lib/i18n';
  import { page } from '$app/stores';
  import SEO from '$components/SEO.svelte';
  import { goto } from '$app/navigation';

  $effect(() => {
    const isInit = !!localStorage.getItem('lang');
    if (isInit) return;
    const langs = getPossibleLocales(navigator.language);
    langs.forEach((lang) => {
      if ($locales.includes(lang)) {
        localStorage.setItem('lang', lang);
        if (lang !== fallbackLng && $page.url.pathname === '/') {
          goto('/' + lang);
        }
      }
    });
  });
</script>

<SEO />
<div class="hero min-h-screen" style="background-image: url(https://willin.wang/images/bg.jpg);">
</div>
