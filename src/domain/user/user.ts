export class User {
  constructor(
    readonly id: string = crypto.randomUUID().toString(),
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly phone: number,
    readonly active: boolean,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    if (!firstName.trim() || !lastName.trim())
      throw new Error("User name is required");
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
