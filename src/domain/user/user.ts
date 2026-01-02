export class User {
  constructor(
    public readonly id: number,
    public firstName: string,
    public lastName: string,
    public whatsapp: number,
    public active: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}

