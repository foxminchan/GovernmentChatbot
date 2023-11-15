export class JwtPayload {
  sub: string;
  name: string;
  email: string;
  policy: {
		role: string;
		claims: string[];
  };
}

export class AccessToken {
	access_token: string;
}