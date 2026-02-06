import { User } from "../../domain/user/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}
