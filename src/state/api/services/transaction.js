import { PATH, METHOD, TAGS } from "@constants";

export const getAllTransactions = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.TRANSACTIONS,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.TRANSACTION],
  });

export const getAllTransactionsDeleted = (builder) =>
  builder.query({
    query: () => ({
      url: `${PATH.TRANSACTIONS}${PATH.DELETED}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.TRANSACTION],
  });

export const getSingleTransaction = (builder) =>
  builder.query({
    query: (id) => ({
      url: `${PATH.TRANSACTIONS}${PATH.ID.replace(":id", id)}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.TRANSACTION],
  });

export const createTransaction = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.TRANSACTIONS,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.TRANSACTION],
  });

export const editTransaction = (builder) =>
  builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.TRANSACTIONS}${PATH.EDIT.replace(":id", id)}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.TRANSACTION],
  });

export const deleteTransaction = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.TRANSACTIONS}${PATH.DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.TRANSACTION],
  });

export const restoreTransaction = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.TRANSACTIONS}${PATH.RESTORE.replace(":id", id)}`,
      method: METHOD.PUT,
    }),
    invalidatesTags: [TAGS.TRANSACTION],
  });

export const forceDeleteTransaction = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.TRANSACTIONS}${PATH.FORCE_DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.TRANSACTION],
  });
