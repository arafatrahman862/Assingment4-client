
// import { useState } from "react";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useGetBooksQuery } from "@/redux/api/baseApi";
// import BookCard from "./BookTable";
// import type { IBook } from "@/types/book";
// import { AddBookModal } from "./AddBookModal";
// import { Button } from "@/components/ui/button";

// export default function Books() {
//   const [selectedGenre, setSelectedGenre] = useState<string>("All");
//   const [page, setPage] = useState<number>(1);
//   const limit = 5;

//   const { data, isLoading } = useGetBooksQuery(
//     {
//       genre: selectedGenre === "All" ? undefined : selectedGenre,
//       page,
//       limit,
//     },
//     {
//       pollingInterval: 30000,
//       refetchOnFocus: true,
//       refetchOnReconnect: true,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const books = data?.books || [];
//   const meta = data?.meta;

//   return (
//     <div className="mt-20 items-center">
//       <div className="flex flex-wrap justify-center items-center gap-4 text-center mb-8">
//         <h1 className="text-4xl font-bold ">Books</h1>

     
//         <Tabs
//   defaultValue="All"
//   onValueChange={(val) => {
//     setSelectedGenre(val);
//     setPage(1);
//   }}
//   className="w-full"
// >
//   <div className="overflow-x-auto w-full">
//     <TabsList className="flex w-max sm:w-full gap-2 px-2 py-1">
//       {[
//         "All",
//         "FICTION",
//         "NON_FICTION",
//         "SCIENCE",
//         "HISTORY",
//         "BIOGRAPHY",
//         "FANTASY",
//       ].map((genre) => (
//         <TabsTrigger
//           key={genre}
//           value={genre}
//           className="hover:bg-amber-100 text-xs sm:text-sm px-3 py-1 rounded whitespace-nowrap"
//         >
//           {genre.replace("_", " ")}
//         </TabsTrigger>
//       ))}
//     </TabsList>
//   </div>
// </Tabs>

//         <AddBookModal />
//       </div>

//       {isLoading ? (
//         <div className="text-center mt-10 text-xl">Loading...</div>
//       ) : (
//         <div className="space-y-5 mt-5">
//           {books.length > 0 ? (
//             books.map((book: IBook) => <BookCard key={book._id} book={book} />)
//           ) : (
//             <div className="text-gray-500 mt-5">No books found for this genre.</div>
//           )}
//         </div>
//       )}

      
//       <div className="mt-8 flex justify-center gap-4">
//         <Button
//           variant="outline"
//           disabled={page === 1}
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//         >
//           Prev
//         </Button>
//         <span className="mt-2">
//           Page {meta?.page} of {meta?.totalPages || 1}
//         </span>
//         <Button
//           variant="outline"
//           disabled={page === meta?.totalPages}
//           onClick={() => setPage((prev) => prev + 1)}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { AddBookModal } from "./AddBookModal";
import { Button } from "@/components/ui/button";
import BookTable from "./BookTable";


export default function Books() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const { data, isLoading } = useGetBooksQuery(
    {
      genre: selectedGenre === "All" ? undefined : selectedGenre,
      page,
      limit,
    },
    {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const books = data?.books || [];
  const meta = data?.meta;

  return (
    <div className="mt-20 items-center">
      <div className="flex flex-wrap justify-center items-center gap-4 text-center mb-8">
        <h1 className="text-3xl font-bold md:mr-20">Books</h1>

        <Tabs
          defaultValue="All"
          onValueChange={(val) => {
            setSelectedGenre(val);
            setPage(1);
          }}
          className="max-w-full"
        >
          <TabsList className="flex gap-2 overflow-x-auto whitespace-nowrap justify-center px-2 py-1">
            {["All", "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map(
              (genre) => (
                <TabsTrigger
                  key={genre}
                  value={genre}
                  className="hover:bg-amber-100 text-sm sm:text-base px-3 py-1 rounded-md"
                >
                  {genre.replace("_", " ")}
                </TabsTrigger>
              )
            )}
          </TabsList>
        </Tabs>

        <AddBookModal />
      </div>

      {isLoading ? (
        <div className="text-center mt-10 text-xl">Loading...</div>
      ) : books.length > 0 ? (
        <BookTable books={books} />
      ) : (
        <div className="text-gray-500 mt-5 text-center">No books found for this genre.</div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </Button>
        <span className="mt-2">
          Page {meta?.page} of {meta?.totalPages || 1}
        </span>
        <Button
          variant="outline"
          disabled={page === meta?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
