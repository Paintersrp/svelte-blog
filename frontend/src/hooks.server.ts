import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const username = event.cookies.get('username');
  const id = event.cookies.get('userid');

  if (!username || !id) {
    return await resolve(event);
  }

  event.locals.user = {
    username: username,
    id: Number(id)
  };

  console.log(event.url);

  const logout = event.url.searchParams.get('logout');

  if (logout) {
    console.log('deleting cookies');
    event.cookies.delete('jwt', { path: '/' });
    event.cookies.delete('refresh', { path: '/' });
    event.cookies.delete('username', { path: '/' });
    event.cookies.delete('userid', { path: '/' });
    event.locals.logout = true;
  }

  return await resolve(event);
};
