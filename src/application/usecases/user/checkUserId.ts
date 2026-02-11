import { UserRepository } from "../repositories/userRepository";
import { Usecase } from "../usecase";

export type checkUserIdInputDto = {
  id: string;
};

export type checkUserIdOutputDto = {
  exists: boolean;
};

export class CheckUserIdUsecase implements Usecase<
  checkUserIdInputDto,
  checkUserIdOutputDto
> {
  constructor(private readonly userRepo: UserRepository) {}

  public async execute({
    id,
  }: checkUserIdInputDto): Promise<checkUserIdOutputDto> {
    const exists = await this.userRepo.existsById(id);
    return this.presentOutput(exists);
  }

  private presentOutput(exists: boolean): checkUserIdOutputDto {
    const output: checkUserIdOutputDto = {
      exists: exists,
    };
    return output;
  }
}
