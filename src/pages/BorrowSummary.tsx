import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/book";



export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  console.log(data)

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 text-center border-2 rounded">
      <h1 className="text-xl font-bold mb-4">Borrow Summary</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Book Title</th>
            <th className="p-2 text-left">ISBN</th>
            <th className="p-2 text-left">Total Quantity Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item: IBook) => (
            <tr key={item.isbn}>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.isbn}</td>
              <td className="p-2">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
