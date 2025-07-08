// import { Button } from "@/components/ui/button";
// import { useDeleteBookMutation } from "@/redux/api/baseApi";
// import type { IBook } from "@/types/book";
// import { UpdateBookModal } from "./UpdateBookModal";
// import Swal from "sweetalert2";
// import { Link } from "react-router";


// interface BookCardProps {
//     book: IBook;
//   }

// const BookCard = ({book}: BookCardProps) => {
//     console.log(book)
//     const [deleteBook , { isLoading: isDeleting }] = useDeleteBookMutation();
//     const handleDelete = async () => {
//         const result = await Swal.fire({
//           title: `Delete "${book.title}"?`,
//           text: "This action cannot be undone.",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "Cancel",
//         });
    
//         if (result.isConfirmed) {
//           try {
//             await deleteBook(book._id).unwrap();
//             Swal.fire("Deleted!", "The book has been deleted.", "success");
//           } catch (error) {
//             Swal.fire("Error!", "Failed to delete the book.", "error");
//             console.error(error);
//           }
//         }
//       };
//     return (
//         <div>
//             <div className="p-4 flex text-left border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <div>
//                 <h2 className="text-lg font-semibold">{book.title}</h2>
//                 <p className="text-sm text-gray-600">{book.author}</p>
//                 <p className="text-sm text-gray-500">{book.description}</p>
//                 <p className="text-sm text-gray-500">Genre: {book.genre}</p>
//                 <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
//                 <p className="text-sm text-gray-500">Copies: {book.copies}</p>
//                 <p className="text-sm text-gray-400">
//             Published: {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
//           </p>
//                 </div>
//             <div className="ml-auto flex flex-col items-center space-y-3">
//             <UpdateBookModal bookId={book._id}></UpdateBookModal>
//             <Button className="w-full" onClick={handleDelete} disabled={isDeleting}>
//             {isDeleting ? "Deleting..." : "Delete"}
//           </Button>
//           <Button className="w-full">  <Link className="" to="/users">
//         Borrow Books
//       </Link></Button>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default BookCard;

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
      <table className="min-w-full border text-sm text-left shadow">
        <thead className="bg-gray-100 text-gray-700">
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
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">
                {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-4 py-2 border space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
