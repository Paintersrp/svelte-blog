import type { ValidationError } from 'yup';

export const catchValidationError = (
  error: ValidationError,
  data: { [k: string]: FormDataEntryValue }
) => {
  const errorObj = error.inner.reduce<Record<string, string>>((acc, curr) => {
    if (curr.path) {
      acc[curr.path] = curr.message;
    }
    return acc;
  }, {});

  return {
    data,
    errors: errorObj
  };
};
