export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hashedPassword: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private constructor(private props: UserProps) {
    this.validate();
  }

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    hashedPassword: string,
  ): User {
    return new User({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      phone,
      hashedPassword,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toPersistence(): UserProps {
    return {
      ...this.props,
    };
  }
  public static with(props: UserProps): User {
    return new User(props);
  }

  private validate() {
    if (!this.props.firstName.trim() || !this.props.lastName.trim()) {
      throw new Error("User name is required");
    }

    if (!this.props.email.trim()) {
      throw new Error("Email is required");
    }
    if (!this.props.hashedPassword.trim()) {
      throw new Error("Hashed password is required");
    }
  }

  public get id() {
    return this.props.id;
  }

  public get firstName() {
    return this.props.firstName;
  }

  public get lastName() {
    return this.props.lastName;
  }

  public get email() {
    return this.props.email;
  }

  public get phone() {
    return this.props.phone;
  }

  public get active() {
    return this.props.active;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public getFullName() {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  public deactivate() {
    this.props.active = false;
    this.touch();
  }

  public activate() {
    this.props.active = true;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
