import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";
import { UpdateBookModal } from "./UpdateBookModal";
import Swal from "sweetalert2";
import { Link } from "react-router";

interface BookTableProps {
  books: IBook[];
}

export default function BookTable({ books }: BookTableProps) {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async (book: IBook) => {
    const result = await Swal.fire({
      title: `Delete "${book.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(book._id).unwrap();
        Swal.fire("Deleted!", "The book has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the book.", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm text-left shadow bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Copies</th>
            <th className="px-4 py-2 border">Published</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">
                {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-4 py-2 border space-x-2">
               <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
               <UpdateBookModal bookId={book._id} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(book)}
                  disabled={isLoading} 
                  
                >
                  Delete
                </Button>
                <Link to={`/users?bookId=${book._id}`}>
                  <Button>Borrow</Button>
                </Link>
               </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
