export interface ITokenUser {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export interface ITokenNPayload {
  sub: number;
  email: string;
}
