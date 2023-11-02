import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import { axios } from '$lib/utils';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  remember: Yup.boolean().required()
});

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
