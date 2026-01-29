import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export type SaveUserInputDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
};

export type SaveUserOutputDto = {
  id: string;
};

export class SaveUserUsecase implements Usecase<
  SaveUserInputDto,
  SaveUserOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public static create(userRepository: UserRepository) {
    return new SaveUserUsecase(userRepository);
  }

  execute({
    firstName,
    lastName,
    email,
    phone,
  }: SaveUserInputDto): Promise<SaveUserOutputDto> {
    const aUser = User.create(firstName, lastName, email, phone);
  }
}
