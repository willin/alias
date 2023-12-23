<script>
  import { getPossibleLocales, locales, t } from '@svelte-dev/i18n';
  import { fallbackLng } from '$lib/i18n';
  import { page } from '$app/stores';
  import SEO from '$components/SEO.svelte';
  import { goto } from '$app/navigation';
  import { domains } from '$lib';

  const { data } = $props();
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

<div class="flex justify-center flex-col">
  <div>
    <h2 class="mt-4 text-2xl">{$t('common.available')}</h2>
    <h3>
      ({$t('common.total')}:{' '}
      <span class="badge badge-xs">
        {data.counter.toLocaleString()}
      </span>
      )
    </h3>
    <ol class="list-disc list-inside my-4">
      {#each domains as domain (domain)}
        <li>
          {domain}
        </li>
      {/each}
    </ol>
    <a href="/auth/sso" class="btn glass mb-4 text-primary w-full my-2">
      {$t('common.login')}
    </a>
    <h3>
      {$t('common.example')}
    </h3>
    <ol class="list-disc list-inside my-4">
      <li>
        <a
          href="https://v0.md/.well-known/webfinger?resource=acct:i@v0.md"
          target="_blank">
          i@v0.md
        </a>
        {$t('common.refer_to')}
        <a href="https://log.lu/@willin" target="_blank"> @willin@log.lu </a>
      </li>
      <li>
        <a
          href="https://sh.gg/.well-known/webfinger?resource=acct:i@sh.gg"
          target="_blank">
          i@sh.gg
        </a>
        {$t('common.refer_to')}
        <a href="https://log.lu/@willin" target="_blank"> @willin@log.lu </a>
      </li>
    </ol>
    <a
      href="https://github.com/willin/fediverse-alias"
      target="_blank"
      class="block text-center text-secondary text-sm w-full my-2">
      {$t('common.deploy')}
    </a>
  </div>
</div>
