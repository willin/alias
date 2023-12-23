<script lang="ts">
  import { applyAction, deserialize } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { Alias } from '$lib';
  import { t } from '@svelte-dev/i18n';
  import type { ActionResult } from '@sveltejs/kit';

  const { aliases } = $props<{ aliases: Alias[] }>();

  const webfinger = (acct: string) => {
    const [username, domain] = acct.split('@');
    return `https://${domain}/.well-known/webfinger?resource=acct:${username}@${domain}`;
  };

  const userLink = (acct: string) => {
    const [username, domain] = acct.split('@');
    return `https://${domain}/@${username}`;
  };

  async function handleSubmit(event: {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    if (!confirm($t('alias.confirm_delete'))) return;
    const data = new FormData(event.currentTarget);

    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data
    });

    const result: ActionResult = deserialize(await response.text());

    if (result.type === 'success') {
      // rerun all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
  }
</script>

<div class="overflow-x-auto w-full">
  <table class="table table-md min-w-full table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <th>
          {$t('alias.alias')}
        </th>
        <th>
          {$t('alias.account')}
        </th>
        <th>
          {$t('alias.created_at')}
        </th>
        <th>
          {$t('alias.operation')}
        </th>
      </tr>
    </thead>
    <tbody>
      {#each aliases as alias (alias)}
        <tr>
          <td>
            <a href={webfinger(alias.alias)} target="_blank">
              {alias.alias}
            </a>
          </td>
          <td>
            <a href={userLink(alias.account)} target="_blank">
              {alias.account}
            </a>
          </td>
          <td>{alias.created_at}</td>
          <td>
            <form
              action="?/delete"
              method="POST"
              on:submit|preventDefault={handleSubmit}>
              <input name="alias" type="hidden" value={alias.alias} />
              <button class="btn btn-ghost btn-sm" type="submit">
                {$t('alias.delete')}
              </button>
            </form>
          </td>
        </tr>
      {/each}

      {#if aliases.length === 0}
        <tr>
          <td colspan="4" class="text-center">
            {$t('alias.no_alias')}
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
