import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import { getUser, hashPassword } from '../login/utils';
import { axios } from '$lib/utils/axios';

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  'confirm-password': Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required')
});

const createSalt = async (rounds: number = 12): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
};

export const postUser = (formData: RegisterDTO): Promise<AuthResponse> => {
  return axios.post<AuthContent>(`/register`, formData);
};

export const useRegister = async (formData: LoginDTO) => {
  const salt = await createSalt();
  const loginData = await hashPassword(formData, salt);

  await postUser({
    ...formData,
    password: loginData.password,
    salt: salt
  });

  return await getUser(loginData);
};
