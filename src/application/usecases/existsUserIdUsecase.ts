import { UserRepository } from "../repositories/userRepository";
import { User } from "../../domain/user/user";
import { Usecase } from "./usecase";

export type existsByIdInputDto = {
  id: string;
};

export type existsByIdOutputDto = {
  exists: boolean;
};

export class existsByIdUsecase implements Usecase<
  existsByIdInputDto,
  existsByIdOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public async execute({
    email,
  }: existsByIdInputDto): Promise<FindUserByEmailOutputDto> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      return;
    }
    return this.presentOutput(user);
  }

  private presentOutput(user: User): existsByIdOutputDto {
    const output: existsByIdOutputDto = {
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
