import { User } from "../../domain/user/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(email: string): Promise<User | null>;
  existsById(id: string): Promise<boolean>;
}

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}
