import { UserRepository } from "../repositories/userRepository";
import { Usecase } from "./usecase";

export type FindUserByIdInputDto = {
  id: string;
};

export type FindUserByIdOutputDto = {
  exists: boolean;
};

export class FindUserByIdUsecase implements Usecase<
  FindUserByIdInputDto,
  FindUserByIdOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public async execute({
    id,
  }: FindUserByIdInputDto): Promise<FindUserByIdOutputDto> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return this.presentOutput(false);
    }
    return this.presentOutput(true);
  }

  private presentOutput(existsValue: boolean): FindUserByIdOutputDto {
    const output: FindUserByIdOutputDto = {
      exists: existsValue,
    };
    return output;
  }
}
