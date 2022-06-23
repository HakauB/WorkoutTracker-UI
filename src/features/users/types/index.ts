import { BaseEntity } from "../../../types";

export type User = {
    id: string;
    email: string;
    role: 'admin' | 'user';
} & BaseEntity;