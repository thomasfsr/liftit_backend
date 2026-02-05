import { DrizzleClient } from "../db/drizzle";
import { users } from "../db/schema";
import { User } from "../../domain/user/user";
import { UserRepository } from "../../application/repositories/user_repository";
import { eq } from "drizzle-orm";

export class UserRepositoryDrizzle implements UserRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static create(db: DrizzleClient) {
    return new UserRepositoryDrizzle(db);
  }

  public async save(user: User): Promise<void> {
    await this.db.insert(users).values({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const userData = result[0];

    // Reconstruct the User domain entity from the database row
    return { email: userData.email, id: userData.id };
  }
}
