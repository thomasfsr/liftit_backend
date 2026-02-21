import { and, eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { authAccounts } from "../db/schemas/authAccounts";
import {
  AuthAccountRepository,
  AuthProvider,
} from "../../application/repositories/authAccountRepository";

export class AuthAccountRepositoryDrizzle implements AuthAccountRepository {
  async findByProvider(provider: AuthProvider, providerUserId: string) {
    const result = await db.query.authAccounts.findFirst({
      where: and(
        eq(authAccounts.provider, provider),
        eq(authAccounts.providerUserId, providerUserId),
      ),
    });

    if (!result) return null;

    return { userId: result.userId };
  }

  async linkAccount(
    userId: string,
    provider: AuthProvider,
    providerUserId: string,
  ): Promise<void> {
    await db.insert(authAccounts).values({
      userId,
      provider,
      providerUserId,
    });
  }
}
