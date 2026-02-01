import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export type SaveUserInputDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

  public async execute({
    firstName,
    lastName,
    email,
    phone,
  }: SaveUserInputDto): Promise<SaveUserOutputDto> {
    const aUser = User.create(firstName, lastName, email, phone);
    await this.userRepo.save(aUser);
    const output = this.presentOutput(aUser);
    return output;
  }
  private presentOutput(user: User): SaveUserOutputDto {
    const output: SaveUserOutputDto = {
      id: user.id,
    };
    return output;
  }
}
