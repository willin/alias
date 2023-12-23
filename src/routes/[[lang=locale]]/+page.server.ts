import { countRecords } from '$lib/server/service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  return {
    counter: await countRecords(event.platform?.env?.DB)
  };
};
