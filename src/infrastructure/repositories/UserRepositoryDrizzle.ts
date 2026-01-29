import { DrizzleClient } from "../db/drizzle";
import { users } from "../db/schema";
import { User } from "../../domain/user/user";
import { UserRepository } from "../../application/repositories/user_repository";

// import { DrizzleClient } from "../database/drizzle_client"; // your db instance

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
}
