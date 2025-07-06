"use client";

import { useMutation, gql } from "@apollo/client";

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    removeBook(id: $id)
  }
`;

interface DeleteBookButtonProps {
  bookId: string;
  bookTitle: string;
  onDeleted?: () => void;
}

export default function DeleteBookButton({
  bookId,
  bookTitle,
  onDeleted,
}: DeleteBookButtonProps) {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      onDeleted?.();
    },
  });

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
      deleteBook({
        variables: { id: bookId },
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex-1 bg-red-100 hover:bg-red-200 disabled:bg-red-50 text-red-700 font-medium py-2 px-3 rounded text-sm transition-colors">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
