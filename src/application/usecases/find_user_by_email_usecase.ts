import { UserRepository } from "../repositories/user_repository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export type FindUserByEmailInputDto = {
  email: string;
};

export type FindUserByEmailOutputDto = { id: string; email: string } | void;

export class FindUserByEmailUsecase implements Usecase<
  FindUserByEmailInputDto,
  FindUserByEmailOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

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
    return {
      id: user.id,
      email: user.email,
    };
  }
}
