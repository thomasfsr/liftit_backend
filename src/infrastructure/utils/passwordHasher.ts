import bcrypt from "bcryptjs";
import { PasswordHasher } from "../../application/repositories/userRepository";

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
