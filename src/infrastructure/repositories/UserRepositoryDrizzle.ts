import { DrizzleClient } from "../db/drizzle";
import { users } from "../db/schema";
import { User } from "../../domain/user/user";
import { UserRepository } from "../../application/repositories/userRepository";
import { eq } from "drizzle-orm";

export class UserRepositoryDrizzle implements UserRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static create(db: DrizzleClient) {
    return new UserRepositoryDrizzle(db);
  }

  public async save(user: User): Promise<void> {
    const userData = user.toPersistence();
    await this.db.insert(users).values({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      hashedPassword: userData.hashedPassword,
      active: userData.active,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
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
    const user = User.with({
      email: userData.email,
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      hashedPassword: userData.hashedPassword,
      active: userData.active,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const userData = result[0];
    const user = User.with({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      hashedPassword: userData.hashedPassword,
      active: userData.active,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    });
    return user;
  }
  public async existsById(id: string): Promise<boolean> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (result) {
      return false;
    } else {
      return true;
    }
  }
}
