// import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const remember = data.get('remember');

    console.log(email, password, remember);

    // throw redirect(303, '/');
  }
};
