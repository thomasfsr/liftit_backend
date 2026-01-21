import { User } from "../../domain/user/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: number): Promise<User | null>;
}
