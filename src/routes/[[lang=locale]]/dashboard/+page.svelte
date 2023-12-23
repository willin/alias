<script>
  import { locale, t } from '@svelte-dev/i18n';
  import SEO from '$components/SEO.svelte';
  import AdSlot from '$components/AdSlot.svelte';
  import {
    MAX_LIMIT_ADMIN,
    MAX_LIMIT_FOLLOWER,
    MAX_LIMIT_USER,
    MAX_LIMIT_VIP
  } from '$lib';
  import Create from './create.svelte';
  import List from './list.svelte';

  const { data } = $props();
  let following = $state(false);

  let limit = $derived(
    (() => {
      const type = data.user?.type;
      if (type === 'admin') {
        return MAX_LIMIT_ADMIN;
      } else if (type === 'vip') {
        return MAX_LIMIT_VIP;
      } else if (following) {
        return MAX_LIMIT_FOLLOWER;
      } else {
        return MAX_LIMIT_USER;
      }
    })()
  );

  $effect(() => {
    if (data.user) {
      if (data.user.type === 'admin' || data.user.type === 'vip') {
        following = true;
        return;
      }
      const thirdparty = data.user.thirdparty.find(
        (x) => x.provider === 'github'
      );
      if (thirdparty) {
        fetch(
          `https://api.github.com/users/${thirdparty.username}/following/willin`
        )
          .then((res) => {
            if (res.status === 204) {
              following = true;
            }
          })
          .catch(() => {});
      }
    }
  });
</script>

<SEO />

<div class="flex justify-center flex-col">
  <article class="prose !max-w-full w-full">
    <List aliases={data.aliases} />
    <AdSlot />
    {#if data?.aliases.length < limit}
      <Create />
    {/if}
    <div>
      <h3 class="pt-4 text-info">{$t('common.limit_info')}</h3>
      <ul class="list-disc pl-4">
        <li>
          {$t('common.user')}:{' '}
          <span class="badge badge-primary">{MAX_LIMIT_USER}</span>
        </li>
        <li>
          {$t('common.follower')}:{' '}
          <span class="badge badge-secondary">
            {MAX_LIMIT_FOLLOWER}
          </span>
          <a
            href="https://github.com/willin"
            target="_blank"
            class="btn btn-xs btn-secondary ml-2"
            rel="noreferrer">
            {$t('common.follow')}
          </a>
        </li>
        <li>
          {$t('common.vip')}:{' '}
          <span class="badge badge-accent">{MAX_LIMIT_VIP}</span>
          <a
            target="_blank"
            class="btn btn-xs btn-accent ml-2"
            href={$locale === 'zh'
              ? 'https://afdian.net/a/willin'
              : 'https://github.com/sponsors/willin'}
            rel="noreferrer">
            {$t('common.donate')}
          </a>
        </li>
      </ul>
    </div>
  </article>
</div>
