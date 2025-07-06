"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { User } from "@/types/book";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      username
      firstName
      lastName
      bio
      isVerified
      createdAt
      updatedAt
      books {
        id
        title
        author
        isPublished
      }
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading users</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Users & Their Books
          </h1>
          <div className="flex gap-4">
            <Link
              href="/users/new"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add New User
            </Link>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              View Books
            </Link>
          </div>
        </div>

        {data.users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first user!
            </p>
            <Link
              href="/users/new"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add Your First User
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.users.map((user: User) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {user.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">{user.email}</p>

                {user.bio && (
                  <p className="text-gray-500 text-sm mb-4">{user.bio}</p>
                )}

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Books ({user.books?.length || 0})
                  </h4>
                  {user.books && user.books.length > 0 ? (
                    <div className="space-y-1">
                      {user.books.slice(0, 3).map((book) => (
                        <div
                          key={book.id}
                          className="text-xs text-gray-600 flex justify-between">
                          <span className="truncate">{book.title}</span>
                          <span
                            className={`px-1 rounded text-xs ${
                              book.isPublished
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                            {book.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                      ))}
                      {user.books.length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{user.books.length - 3} more books
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No books yet</p>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  <span>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Updated: {new Date(user.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded text-center text-sm transition-colors">
                    Edit
                  </Link>
                  <Link
                    href={`/users/${user.id}/books`}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-3 rounded text-center text-sm transition-colors">
                    View Books
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
