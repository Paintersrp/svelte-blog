import { redirect } from '@sveltejs/kit';
import { setCookies } from '../login/utils.js';
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
        setCookies(cookies, user, username);

        throw redirect(303, '/');
      }
    }
  }
};
