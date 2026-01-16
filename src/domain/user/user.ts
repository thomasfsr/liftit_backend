export class User {
  constructor(
    readonly id: number,
    readonly firstName: string,
    readonly lastName: string,
    readonly whatsapp: number,
    readonly active: boolean,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    if (!firstName || !lastName) throw new Error("User name is required");
  }
}
