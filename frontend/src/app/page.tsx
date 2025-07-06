"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { Book } from "@/types/book";
import DeleteBookButton from "./components/DeleteBookButton";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      description
      isPublished
      createdAt
      updatedAt
      ownerId
      owner {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error loading books</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            GraphQL Book Library
          </h1>
          <div className="flex gap-4">
            <Link
              href="/users"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              View Users
            </Link>
            <Link
              href="/books/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add New Book
            </Link>
          </div>
        </div>

        {data.books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No books yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first book!
            </p>
            <Link
              href="/books/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.books.map((book: Book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {book.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      book.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {book.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="text-gray-600 font-medium mb-2">
                  by {book.author}
                </p>

                {book.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {book.description}
                  </p>
                )}

                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  <span>
                    Created: {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Updated: {new Date(book.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/books/${book.id}/edit`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded text-center text-sm transition-colors">
                    Edit
                  </Link>
                  <DeleteBookButton
                    bookId={book.id}
                    bookTitle={book.title}
                    onDeleted={() => {
                      // Refetch the books list after deletion
                      window.location.reload();
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
