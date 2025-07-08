import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";
import { UpdateBookModal } from "./UpdateBookModal";
import Swal from "sweetalert2";
import { Link } from "react-router";


interface BookCardProps {
    book: IBook;
  }

const BookCard = ({book}: BookCardProps) => {
    console.log(book)
    const [deleteBook , { isLoading: isDeleting }] = useDeleteBookMutation();
    const handleDelete = async () => {
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
        <div>
            <div className="p-4 flex text-left border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">{book.description}</p>
                <p className="text-sm text-gray-500">Genre: {book.genre}</p>
                <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
                <p className="text-sm text-gray-500">Copies: {book.copies}</p>
                <p className="text-sm text-gray-400">
            Published: {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
          </p>
                </div>
            <div className="ml-auto flex flex-col items-center space-y-3">
            <UpdateBookModal bookId={book._id}></UpdateBookModal>
            <Button className="w-full" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button className="w-full">  <Link className="" to="/users">
        Borrow Books
      </Link></Button>
            </div>
            </div>
        </div>
    );
};

export default BookCard;