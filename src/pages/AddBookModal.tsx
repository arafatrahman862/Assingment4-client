import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useState, type JSX } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const GENRE_OPTIONS = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

export function AddBookModal(): JSX.Element {
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      isbn: formData.isbn,
      description: formData.description || "",
      copies: parseInt(formData.copies),
      available: true,
    };
// console.log("BookData",bookData)
    try {
      const res = await createBook(bookData).unwrap();
      console.log(" Book created:", res);

      setOpen(false);
      reset();
      await MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Book added successfully!',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error(" Error creating book:", err);
      await MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add book. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Book</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Fill up this form to add book</DialogTitle>
            <DialogDescription>
              Make changes to add book here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} required />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...register("author")} required />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <select
                id="genre"
                {...register("genre")}
                className="w-full border px-3 py-2 rounded"
                required
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
              <Input id="isbn" {...register("isbn")} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full border px-3 py-2 rounded"
                rows={3}
                placeholder="Short summary about the book"
              />
            </div>

            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input id="copies" type="number" {...register("copies")} required />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
