
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const GENRE_OPTIONS = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

const MySwal = withReactContent(Swal);

export default function EditBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading: bookLoading } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { register, handleSubmit } = useForm<IBook>();

  const onSubmit = async (formData: IBook) => {
    try {
      await updateBook({ id, data: formData }).unwrap();
  
      await MySwal.fire({
        icon: "success",
        title: "Book Updated!",
        text: `"${formData.title}" has been successfully updated.`,
        confirmButtonText: "OK",
      });
  
      navigate("/books");
    } catch (error) {
      console.error(error);
      await MySwal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the book.",
      });
    }
    
  }
  if (bookLoading || !book) return <div className="text-center mt-10">Loading book...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title", { required: true })} defaultValue={book.title} />
        </div>
        <div>
          <Label>Author</Label>
          <Input {...register("author", { required: true })} defaultValue={book.author} />
        </div>
        <div>
          <Label>Genre</Label>
          <select
            {...register("genre")}
            defaultValue={book.genre}
            className="w-full border px-3 py-2 rounded"
          >
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label>ISBN</Label>
          <Input {...register("isbn", { required: true })} defaultValue={book.isbn} />
        </div>
        <div>
          <Label>Copies</Label>
          <Input
            type="number"
            {...register("copies", { required: true })}
            defaultValue={book.copies}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Book"}
        </Button>
      </form>
    </div>
  );

    }