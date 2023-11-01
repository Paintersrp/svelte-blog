import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const username = event.cookies.get('username');
  const id = event.cookies.get('userid');
  const role = event.cookies.get('role');

  if (!username || !id || !role) {
    return await resolve(event);
  }

  event.locals.user = {
    username,
    id: Number(id),
    role
  };

  const logout = event.url.searchParams.get('logout');

  if (logout) {
    event.cookies.delete('jwt', { path: '/' });
    event.cookies.delete('refresh', { path: '/' });
    event.cookies.delete('username', { path: '/' });
    event.cookies.delete('userid', { path: '/' });
    event.cookies.delete('role', { path: '/' });
    event.locals.logout = true;
  }

  return await resolve(event);
};
