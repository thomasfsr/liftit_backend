import { UserRepository } from "../../repositories/userRepository";
import { PasswordHasher } from "../../services/passwordHasher";
import { User } from "../../../domain/user/user";
import { Usecase } from "../usecase";

export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Email already exists: ${email}`);
  }
}

export type CreateUserInputDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type CreateUserOutputDto = {
  id: string;
};

export class CreateUserUsecase implements Usecase<
  CreateUserInputDto,
  CreateUserOutputDto
> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  public static build(
    userRepo: UserRepository,
    passwordHasher: PasswordHasher,
  ) {
    return new CreateUserUsecase(userRepo, passwordHasher);
  }

  public async execute(
    input: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
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
  private presentOutput(user: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      id: user.id,
    };
    return output;
  }
}
