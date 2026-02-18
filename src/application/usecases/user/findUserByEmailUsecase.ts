import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../../domain/user/user";
import { Usecase } from "../usecase";
import { FindUserByIdUsecase } from "./checkUserByIdUsecase";

export type FindUserByEmailInputDto = {
  email: string;
};

export type FindUserByEmailOutputDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
} | void;

export class FindUserByEmailUsecase implements Usecase<
  FindUserByEmailInputDto,
  FindUserByEmailOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public static build(userRepo: UserRepository) {
    return new FindUserByIdUsecase(userRepo);
  }

  public async execute({
    email,
  }: FindUserByEmailInputDto): Promise<FindUserByEmailOutputDto> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return;
    }
    return this.presentOutput(user);
  }

  private presentOutput(user: User): FindUserByEmailOutputDto {
    const output: FindUserByEmailOutputDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      active: user.active,
    };
    return output;
  }
}
