import { useForm } from "react-hook-form";
import { useBorrowBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IBorrow } from "@/types/borrow";
import BorrowSummary from "./BorrowSummary";
import type { IBook } from "@/types/book";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function BorrowBookForm() {
  const { register, handleSubmit, reset } = useForm<IBorrow>();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const { data: booksData, isLoading: booksLoading } = useGetBooksQuery(undefined);
  const books: IBook[] = booksData?.books || [];
  
  if (booksLoading) {
    return <div className="text-center mt-10 text-xl">Loading books...</div>;
  }

  const onSubmit = async (data: IBorrow) => {
    try {
      await borrowBook(data).unwrap();

      await MySwal.fire({
        icon: "success",
        title: "Borrow Successful!",
        text: "The book has been successfully borrowed.",
      });

      reset();
    } catch (error) {
      console.error(error);
      await MySwal.fire({
        icon: "error",
        title: "Borrow Failed",
        text: "Something went wrong while borrowing the book.",
      });
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        <h1 className="text-xl font-bold mb-4">Borrow Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Select Book</Label>
            <select
              {...register("book", { required: true })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Choose a Book --</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} ({book.genre})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Quantity</Label>
            <Input type="number" {...register("quantity", { required: true, min: 1 })} />
          </div>

          <div>
            <Label>Due Date</Label>
            <Input type="date" {...register("dueDate", { required: true })} />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      <BorrowSummary />
    </div>
  );
}
