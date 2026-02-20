import { User } from "../../../domain/user/user";
import { UserRepository } from "../../repositories/userRepository";
import { AuthAccountRepository } from "../../repositories/authAccountRepository";
import { FederatedIdentity } from "../../auth/federatedIdentity";

type Input = FederatedIdentity;

type Output = {
  user: User;
  isNewUser: boolean;
};

export class AuthenticateFederatedUserUsecase {
  constructor(
    private readonly users: UserRepository,
    private readonly accounts: AuthAccountRepository,
  ) {}

  async execute(identity: Input): Promise<Output> {
    // 1️⃣ Já existe conta vinculada ao Google?
    const existingAccount = await this.accounts.findByProvider(
      identity.provider,
      identity.providerUserId,
    );

    if (existingAccount) {
      const user = await this.users.findById(existingAccount.userId);

      if (!user) {
        throw new Error("Auth account linked to non-existing user");
      }

      return { user, isNewUser: false };
    }

    // 2️⃣ Existe usuário com mesmo email?
    const userByEmail = await this.users.findByEmail(identity.email);

    if (userByEmail) {
      // vincula Google à conta existente
      await this.accounts.linkAccount(
        userByEmail.id,
        identity.provider,
        identity.providerUserId,
      );

      return { user: userByEmail, isNewUser: false };
    }

    // 3️⃣ Criar novo usuário (registro federado)
    const newUser = User.registerFederated(identity.email);

    await this.users.save(newUser);

    await this.accounts.linkAccount(
      newUser.id,
      identity.provider,
      identity.providerUserId,
    );

    return { user: newUser, isNewUser: true };
  }
}
