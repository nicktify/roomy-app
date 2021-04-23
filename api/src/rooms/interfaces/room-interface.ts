export interface Room {
  readonly name: string;
  readonly password: string;
  readonly owners: string;
  readonly participants: string[];
}
