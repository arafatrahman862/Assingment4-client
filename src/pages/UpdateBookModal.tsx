import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";


const GENRE_OPTIONS = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

interface IBookInput {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
}
interface UpdateBookModalProps {
  bookId: string;
}

export function UpdateBookModal({ bookId }: UpdateBookModalProps) {

  const [open, setOpen] = useState(false);

  const { data, isLoading: loadingBook } = useGetBookByIdQuery(bookId);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const { register, handleSubmit, reset } = useForm<IBookInput>();

  useEffect(() => {
    if (data?.book) {
      reset({
        title: data.book.title,
        author: data.book.author,
        genre: data.book.genre,
        isbn: data.book.isbn,
        description: data.book.description,
        copies: data.book.copies,
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<IBookInput> = async (formData) => {
    try {
      await updateBook({
        id:bookId,
        data: {
          ...formData,
          copies: Number(formData.copies),
        },
      }).unwrap();
      setOpen(false);
      reset();
    } catch (error) {
      console.error(" Update failed:", error);
    }
  };

  if (loadingBook) return <div className="text-center mt-10">Loading book...</div>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">Edit Book</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title", { required: true })} />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("author", { required: true })} />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <select
                id="genre"
                {...register("genre", { required: true })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Genre</option>
                {GENRE_OPTIONS.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" {...register("isbn", { required: true })} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input
                id="copies"
                type="number"
                {...register("copies", { required: true, min: 1 })}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button  variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
