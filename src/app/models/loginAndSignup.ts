// models/user.model.ts
export interface User {
    user_id: number;
    username: string;
    password: string;
    role: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface RegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
  }
  export interface UserResponse{
    username:string;
    newRole:string;
  }