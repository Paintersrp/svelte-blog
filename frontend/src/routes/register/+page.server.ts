export const actions = {
  register: async ({ request }) => {
    const data = await request.formData();

    console.log(data);
  }
};
