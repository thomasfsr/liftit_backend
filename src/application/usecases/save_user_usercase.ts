import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";

export class SaveUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute(input: { first_name: string; last_name: string; phone: number }) {
    const user = new User(input.first_name, input.last_name, input.phone, true);
    this.userRepo.save(user);
  }
}
