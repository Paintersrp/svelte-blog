export const AuthResponses = {
  SUCCESS: (key: string) => `${key} successful`,
  FAIL: (key: string) => `${key} failed`,
  LOGGED_IN: "Already logged in",
  INSUFFICIENT_PERMISSIONS: "Insufficient permissions",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_INVALID: "Invalid token",
  TOKEN_ERROR: "Token error",
  FORBIDDEN: "Forbidden",
  RBAC_SUCCESS: "Access Granted",
  RBAC_FAIL: "You do not have the necessary role to perform this action",
  INVALID_PASSWORD: "Invalid password",
};
