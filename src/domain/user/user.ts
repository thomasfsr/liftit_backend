export class User {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly phone: number,
    readonly active: boolean,
    readonly id?: number,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    if (!firstName || !lastName) throw new Error("User name is required");
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
