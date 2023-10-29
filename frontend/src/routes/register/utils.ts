/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import { getUser, hashPassword } from '../login/utils';
import { axios } from '$lib/utils/axios';

const createSalt = async (rounds: number = 12): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return salt;
};

export const postUser = (formData: any): Promise<any> => {
  return axios.post<any>(`/register`, formData);
};

export const useRegister = async (formData: any) => {
  const salt = await createSalt();
  const loginData = await hashPassword(formData, salt);
  console.log(loginData);
  await postUser({
    ...formData,
    password: loginData.password,
    salt: salt
  });

  return await getUser(loginData);
};
