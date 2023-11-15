import type { AuthPort } from '~/domain/ports/auth.port';

function createAuthService(): AuthPort {
  return {
    login() {
      throw new Error('login');
    },
    logout() {
      throw new Error('logout');
    },
  };
}

export const authService = createAuthService();
