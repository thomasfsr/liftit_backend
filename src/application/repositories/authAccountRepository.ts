export type AuthProvider = "google";

export interface AuthAccountRepository {
  findByProvider(
    provider: AuthProvider,
    providerUserId: string,
  ): Promise<{ userId: string } | null>;

  linkAccount(
    userId: string,
    provider: AuthProvider,
    providerUserId: string,
  ): Promise<void>;
}
