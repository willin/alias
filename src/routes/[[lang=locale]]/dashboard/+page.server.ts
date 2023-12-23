import {
  checkUserAlias,
  createUserAlias,
  deleteUserAlias,
  getUserAliases
} from '$lib/server/service';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, platform }) => {
  if (!locals.user) {
    return redirect('/');
  }
  return {
    user: locals.user,
    aliases: await getUserAliases(platform.env.DB, locals.user.id)
  };
};

export const actions: Actions = {
  checkAlias: async ({ request, platform, locals }) => {
    if (!locals.user) {
      return { success: false };
    }
    const data = await request.json();
    return {
      available: await checkUserAlias(platform.env.DB, data.alias)
    };
  },
  checkAccount: async ({ request, locals }) => {
    if (!locals.user) {
      return { success: false };
    }
    const data = await request.json();
    const { account } = data;
    // check webfinger
    const [, domain] = account.split('@');
    const webfinger = `https://${domain}/.well-known/webfinger?resource=acct:${account}`;
    const response = await fetch(webfinger).catch(() => ({ status: 404 }));
    return {
      available: response.status !== 404
    };
  },
  delete: async ({ locals, request, platform }) => {
    if (!locals.user) {
      return { success: false };
    }
    const data = await request.formData();
    return {
      success: await deleteUserAlias(
        platform.env.DB,
        locals.user.id,
        data.get('alias')
      )
    };
  },
  save: async ({ locals, request, platform }) => {
    if (!locals.user) {
      return { success: false };
    }
    const data = await request.json();
    return {
      success: await createUserAlias(
        platform.env.DB,
        locals.user.id,
        data.alias,
        data.account
      )
    };
  }
};
