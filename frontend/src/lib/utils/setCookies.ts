import type { Cookies } from '@sveltejs/kit';

export const setCookies = async (cookies: Cookies, user: AuthResponse): Promise<void> => {
  cookies.set('jwt', user.data.accessToken, cookieSettings);
  cookies.set('refresh', user.data.refreshToken, cookieSettings);
  cookies.set('username', user.data.username, cookieSettings);
  cookies.set('userid', String(user.data.id), cookieSettings);
  cookies.set('role', user.data.role, cookieSettings);
};

export const cookieSettings = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30
} satisfies import('cookie').CookieSerializeOptions;
