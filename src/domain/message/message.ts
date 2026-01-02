export type MessageRole = "user" | "assistant";

export class Message {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public role: MessageRole,
    public message: string,
    public readonly createdAt: Date
  ) {}
}

