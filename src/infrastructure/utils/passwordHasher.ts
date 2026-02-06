import bcrypt from "bcrypt";
import { PasswordHasher } from "@/application/security/password-hasher";

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
