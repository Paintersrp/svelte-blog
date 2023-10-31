import { fail, redirect } from '@sveltejs/kit';
import { getUser, setCookies, useSalt } from './utils.js';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const errors: Record<string, unknown> = {};

    const username = String(data.get('username'));
    const password = String(data.get('password'));
    const remember = Boolean(data.get('remember'));

    if (!username) {
      errors.username = 'required';
    }

    if (!password) {
      errors.password = 'required';
    }

    if (Object.keys(errors).length > 0) {
      const returnData = {
        data: Object.fromEntries(data),
        errors
      };

      return fail(400, returnData);
    }

    const saltResponse = await useSalt({ username, password });
    const user = await getUser(saltResponse);

    if (user) {
      if (remember) {
        setCookies(cookies, user, username);
      } else {
        setCookies(cookies, user, username);
      }

      throw redirect(303, '/');
    }

    return fail(400);
  }
};
