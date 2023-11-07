import { fail, redirect } from '@sveltejs/kit';
import { ValidationError } from 'yup';

import { getUser, loginSchema, useSalt } from './utils';
import { catchValidationError, setCookies } from '$lib/utils';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const remember = Boolean(data.get('remember'));
    const parsedData = Object.fromEntries(data);

    try {
      const validatedData = await loginSchema.validate(
        { ...parsedData, remember },
        {
          abortEarly: false
        }
      );

      const saltResponse = await useSalt({
        username: validatedData.username,
        password: validatedData.password
      });

      const user = await getUser(saltResponse);
      console.log(user);

      if (user) {
        if (remember) {
          setCookies(cookies, user);
        } else {
          setCookies(cookies, user);
        }
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const returnData = catchValidationError(error, parsedData);

        return fail(400, returnData);
      }
    }

    throw redirect(303, '/');
  }
};
