export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  books?: Book[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner?: User;
}

export interface CreateUserInput {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

export interface UpdateUserInput {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  isVerified?: boolean;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description?: string;
  isPublished?: boolean;
  ownerId: string;
}

export interface UpdateBookInput {
  title?: string;
  author?: string;
  description?: string;
  isPublished?: boolean;
}
