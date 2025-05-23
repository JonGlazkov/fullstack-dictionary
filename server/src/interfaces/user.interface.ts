export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserDecodedByJwt {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
}

export interface UserRepository {
  create(user: UserCreate): Promise<User>;
  login(user: UserLogin): Promise<User | null>;
  verifyEmail(email: string): Promise<User | null>;
  update(id: string, user: UserUpdate): Promise<User | null>;
  me(id: string): Promise<User | null>;
  // findByEmail(email: string): Promise<User | null>;
}
