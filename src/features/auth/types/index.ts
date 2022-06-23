export type AuthUser = {
    id: string;
    email: string;
    role: 'admin' | 'user';
}

export type UserResponse = {
    access_token: string;
    user: AuthUser;
}