import { PATH, METHOD, TAGS } from "@constants";

export const getAllProducts = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.PRODUCTS,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.PRODUCT],
  });

export const getAllProductsDeleted = (builder) =>
  builder.query({
    query: () => ({
      url: `${PATH.PRODUCTS}${PATH.DELETED}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.PRODUCT],
  });

export const getSingleProduct = (builder) =>
  builder.query({
    query: (id) => ({
      url: `${PATH.PRODUCTS}${PATH.ID.replace(":id", id)}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.PRODUCT],
  });

export const createProduct = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.PRODUCTS,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.PRODUCT],
  });

export const editProduct = (builder) =>
  builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.PRODUCTS}${PATH.EDIT.replace(":id", id)}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.PRODUCT],
  });

export const deleteProduct = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.PRODUCTS}${PATH.DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.PRODUCT],
  });

export const restoreProduct = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.PRODUCTS}${PATH.RESTORE.replace(":id", id)}`,
      method: METHOD.PUT,
    }),
    invalidatesTags: [TAGS.PRODUCT],
  });

export const forceDeleteProduct = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.PRODUCTS}${PATH.FORCE_DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.PRODUCT],
  });
