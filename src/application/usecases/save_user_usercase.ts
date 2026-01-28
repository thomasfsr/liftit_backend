import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export type SaveUserInputDto {
}

export type SaveUserOutputDto {

}

export class SaveWorkoutSetsUseCase implements Usecase<SaveUserInputDto, SaveUserOutputDto> {
  constructor(private readonly userRepo: UserRepository) {}

  execute(input: { first_name: string; last_name: string; phone: number }) {
    const user = new User(input.first_name, input.last_name, input.phone, true);
    this.userRepo.save(user);
  }
}
