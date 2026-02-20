export type FederatedIdentity = {
  provider: "google";
  providerUserId: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  avatarUrl?: string;
};
