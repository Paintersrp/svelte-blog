import { axios } from '$lib/utils/axios';
import type { Cookies } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const getUser = (loginData: LoginDTO): Promise<AuthResponse> => {
  return axios.post<AuthContent>(`/login`, loginData);
};

export const getSalt = (username: string): Promise<SaltResponse> => {
  return axios.post<{ salt?: string }>(`/salt`, { username });
};

export const hashPassword = async (formData: LoginDTO, salt: string): Promise<LoginDTO> => {
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(formData.password, salt, (err: unknown, hash: string) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return {
    username: formData.username,
    password: hashedPassword
  };
};

export const useSalt = async (formData: LoginDTO): Promise<LoginDTO> => {
  const response = await getSalt(formData.username);
  const salt = response.data.salt;

  if (salt) {
    return hashPassword(formData, salt);
  } else {
    return {
      username: formData.username,
      password: formData.password
    };
  }
};

export const setCookies = async (
  cookies: Cookies,
  user: AuthResponse,
  username: string
): Promise<void> => {
  cookies.set('jwt', user.data.accessToken, cookieSettings);
  cookies.set('refresh', user.data.refreshToken, cookieSettings);
  cookies.set('username', username, cookieSettings);
  cookies.set('userid', String(user.data.id), cookieSettings);
};

export const cookieSettings = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 30
} satisfies import('cookie').CookieSerializeOptions;
