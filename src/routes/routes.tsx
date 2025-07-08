import App from "@/App";
import Books from "@/pages/Books";
import BorrowBookForm from "@/pages/BorrowBookForm";
import BorrowBooks from "@/pages/BorrowBookForm";
import BorrowSummary from "@/pages/BorrowSummary";
import EditBookForm from "@/pages/EditBookForm";
import { createBrowserRouter } from "react-router";



export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        path: "/users",
        Component: BorrowBooks,
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowBookForm

      },
      {
        path:"/borrow-summary",
        Component: BorrowSummary
      },
      {
        path:"/edit-book/:id",
        Component: EditBookForm
      }
    ],
  },

]);