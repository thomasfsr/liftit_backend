import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Email already exists: ${email}`);
  }
}

export type SaveUserInputDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hashedPassword: string;
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
    hashedPassword,
  }: SaveUserInputDto): Promise<SaveUserOutputDto> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(email);
    }
    const user = User.create(firstName, lastName, email, phone, hashedPassword);
    await this.userRepo.save(user);
    const output = this.presentOutput(user);
    return output;
  }
  private presentOutput(user: User): SaveUserOutputDto {
    const output: SaveUserOutputDto = {
      id: user.id,
    };
    return output;
  }
}
