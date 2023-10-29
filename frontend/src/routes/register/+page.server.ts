import { redirect } from '@sveltejs/kit';
import { cookieSettings } from '../login/utils.js';
import { useRegister } from './utils.js';

export const actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = String(data.get('username'));
    const password = String(data.get('password'));
    const confirmPassword = String(data.get('confirm-password'));

    if (password === confirmPassword) {
      const user = await useRegister({ username, password });

      if (user) {
        cookies.set('jwt', user.data.accessToken, cookieSettings);
        cookies.set('refresh', user.data.refreshToken, cookieSettings);
        cookies.set('username', username, cookieSettings);
        cookies.set('userid', String(user.data.id), cookieSettings);

        throw redirect(303, '/');
      }
    }
  }
};
