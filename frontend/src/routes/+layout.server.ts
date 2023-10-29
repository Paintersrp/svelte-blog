export const load = ({ url, locals }) => {
  return {
    url: url.pathname,
    user: locals.user,
    logout: locals.logout
  };
};
