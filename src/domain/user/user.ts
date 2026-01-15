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

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getWhatsapp(): number {
    return this.whatsapp;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  deactivate() {
    this.active = false;
    this.updatedAt = new Date();
  }

  activate() {
    this.active = true;
    this.updatedAt = new Date();
  }

  updateName(firstName: string, lastName: string) {
    if (!firstName || !lastName) {
      throw new Error("User name is required");
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.active;
  }
}
