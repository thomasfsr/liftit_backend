import { UserRepository } from "../../repositories/userRepository";
import { User } from "../../../domain/user/user";
import { Usecase } from "../usecase";

export type FindUserByIdInputDto = {
  id: string;
};

export type FindUserByIdOutputDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
} | void;

export class FindUserByIdUsecase implements Usecase<
  FindUserByIdInputDto,
  FindUserByIdOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public static build(userRepo: UserRepository) {
    return new FindUserByIdUsecase(userRepo);
  }

  public async execute({
    id,
  }: FindUserByIdInputDto): Promise<FindUserByIdOutputDto> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return;
    }
    return this.presentOutput(user);
  }

  private presentOutput(user: User): FindUserByIdOutputDto {
    const output: FindUserByIdOutputDto = {
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
