import { FederatedIdentity } from "../../application/auth/federatedIdentity";

export function mapGoogle(profile: any): FederatedIdentity {
  return {
    provider: "google",
    providerUserId: profile.sub,
    email: profile.email,
    emailVerified: profile.email_verified,
    name: profile.name,
    avatarUrl: profile.picture,
  };
}
