import { fail, redirect } from '@sveltejs/kit';
import { ValidationError } from 'yup';

import { registerSchema, useRegister } from './utils';
import { catchValidationError, setCookies } from '$lib/utils';

export const actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const parsedData = Object.fromEntries(data);

    try {
      const validatedData = await registerSchema.validate(parsedData, {
        abortEarly: false
      });

      const user = await useRegister({
        username: validatedData.username,
        password: validatedData.password
      });

      if (user) {
        setCookies(cookies, user);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const returnData = catchValidationError(error, parsedData);

        return fail(400, returnData);
      }

      return fail(400);
    }

    throw redirect(303, '/');
  }
};
