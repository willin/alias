<script lang="ts">
  import { applyAction, deserialize } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { domains } from '$lib';
  import { t } from '@svelte-dev/i18n';
  import type { ActionResult } from '@sveltejs/kit';

  let validAlias: boolean | undefined = $state(undefined);
  let validAccount: boolean | undefined = $state(undefined);

  let prefix = $state('');
  let suffix = $state(domains[0]);
  let alias = $derived(`${prefix}@${suffix}`);
  let account = $state('');

  async function checkAlias() {
    const response = await fetch('?/checkAlias', {
      method: 'POST',
      body: JSON.stringify({ alias })
    });
    const result: ActionResult<{ available: boolean }> = deserialize(
      await response.text()
    );
    if (result.type === 'success') {
      validAlias = !!result.data?.available;
    }
  }

  async function checkAccount() {
    const response = await fetch('?/checkAccount', {
      method: 'POST',
      body: JSON.stringify({ account })
    });
    const result: ActionResult<{ available: boolean }> = deserialize(
      await response.text()
    );
    if (result.type === 'success') {
      validAccount = !!result.data?.available;
    }
  }

  async function handleSubmit(event: {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: JSON.stringify({ alias, account })
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === 'success') {
      // rerun all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
  }
</script>

<form method="POST" action="?/save" on:submit|preventDefault={handleSubmit}>
  <div class="my-2">
    <h2>
      {$t('alias.create')}
    </h2>
  </div>
  <div class="my-2">
    <div class="join w-full">
      <input
        bind:value={prefix}
        class:input-disabled={validAlias}
        class:input-warning={validAlias === false}
        class="input w-full input-bordered join-item"
        placeholder={`${$t('alias.alias')}: willin`} />
      <select
        class:select-disabled={validAlias}
        class:select-warning={validAlias === false}
        disabled={validAlias}
        class="select select-bordered join-item"
        bind:value={suffix}>
        {#each domains as domain (domain)}
          <option value={domain}>@{domain}</option>
        {/each}
      </select>
      <button
        class="btn join-item"
        class:btn-warning={validAlias === false}
        on:click|preventDefault={checkAlias}
        class:btn-disabled={validAlias || !prefix}>
        {$t('alias.check')}
      </button>
    </div>
  </div>
  <div class="my-2">
    <div class="join w-full">
      <input
        bind:value={account}
        class:input-disabled={validAccount}
        class:input-warning={validAccount === false}
        class="input w-full input-bordered join-item"
        placeholder={`${$t('alias.account')}: willin@log.lu`} />
      <button
        class="btn join-item"
        class:btn-warning={validAccount === false}
        on:click|preventDefault={checkAccount}
        class:btn-disabled={validAccount || !account}>
        {$t('alias.check')}
      </button>
    </div>
  </div>
  <div class="my-2">
    <button
      class="btn btn-primary"
      type="submit"
      class:btn-disabled={!validAlias || !validAccount}>
      {$t('alias.save')}
    </button>
  </div>
</form>
