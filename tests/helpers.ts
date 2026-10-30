export function requireLoginCredentials() {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;

  if (!username) {
    throw new Error('LOGIN_USERNAME must be set and non-empty.');
  }

  if (!password) {
    throw new Error('LOGIN_PASSWORD must be set and non-empty.');
  }

  return { username, password };
}
