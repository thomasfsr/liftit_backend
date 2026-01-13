export class User {
  private firstName: string;
  private lastName: string;
  private whatsapp: number;
  private active: boolean;
  private updatedAt: Date;

  constructor(
    public readonly id: number,
    firstName: string,
    lastName: string,
    whatsapp: number,
    active: boolean,
    public readonly createdAt: Date
  ) {
    if (!firstName || !lastName) {
      throw new Error("User name is required");
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.whatsapp = whatsapp;
    this.active = active;
    this.updatedAt = createdAt;
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
