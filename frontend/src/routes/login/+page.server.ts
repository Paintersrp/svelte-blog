import { redirect } from '@sveltejs/kit';

export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    console.log(email, password, cookies);

    // cookies.set('sessionid', await db.createSession(user));

    throw redirect(303, '/');
  }
};
