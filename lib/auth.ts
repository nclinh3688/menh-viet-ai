export interface CurrentUser {
  email: string | null;
  id: string;
  image: string | null;
  name: string | null;
}

export interface AuthProviderStatus {
  facebookConfigured: boolean;
  googleConfigured: boolean;
  hasAuthSecret: boolean;
}

export function getAuthProviderStatus(): AuthProviderStatus {
  return {
    facebookConfigured: Boolean(
      process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET,
    ),
    googleConfigured: Boolean(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
    ),
    hasAuthSecret: Boolean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
  };
}

export function isAuthRuntimeReady() {
  const status = getAuthProviderStatus();

  return status.hasAuthSecret && status.googleConfigured;
}
