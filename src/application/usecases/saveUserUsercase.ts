import { UserRepository, PasswordHasher } from "../repositories/userRepository";
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
  password: string;
};

export type SaveUserOutputDto = {
  id: string;
};

export class SaveUserUsecase implements Usecase<
  SaveUserInputDto,
  SaveUserOutputDto
> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public static create(
    userRepo: UserRepository,
    passwordHasher: PasswordHasher,
  ) {
    return new SaveUserUsecase(userRepo, passwordHasher);
  }

  public async execute(input: SaveUserInputDto): Promise<SaveUserOutputDto> {
    const existingUser = await this.userRepo.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(input.email);
    }
    const hashedPassword = await this.passwordHasher.hash(input.password);
    const user = User.create(
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      hashedPassword,
    );
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
