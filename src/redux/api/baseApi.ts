import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assingment3-ruby.vercel.app/",
  }),
  tagTypes: ["book", "borrowedBook"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => {
        return {
          url: "/api/books",
          params: params,
        };
      },
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/api/books/create-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    getBookById: builder.query({
      query: (id) => `/api/books/${id}`,
      providesTags: ["book"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/api/borrow/summary",
      providesTags: ["borrowedBook"],
    }),
    borrowBook: builder.mutation({
      query: (payload) => ({
        url: "/api/borrow",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["book", "borrowedBook"],
    }),
  }),
});

export const { useGetBooksQuery, useBorrowBookMutation, useCreateBookMutation, useGetBorrowSummaryQuery, useDeleteBookMutation, useUpdateBookMutation, useGetBookByIdQuery } = baseApi;