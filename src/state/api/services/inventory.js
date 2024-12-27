import { PATH, METHOD, TAGS } from "@constants";

export const getAllInventories = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.INVENTORIES,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.INVENTORY],
  });

export const getAllInventoriesDeleted = (builder) =>
  builder.query({
    query: () => ({
      url: `${PATH.INVENTORIES}${PATH.DELETED}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.INVENTORY],
  });

export const getSingleInventory = (builder) =>
  builder.query({
    query: (id) => ({
      url: `${PATH.INVENTORIES}${PATH.ID.replace(":id", id)}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.INVENTORY],
  });

export const createInventory = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.INVENTORIES,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.INVENTORY],
  });

export const editInventory = (builder) =>
  builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.INVENTORIES}${PATH.EDIT.replace(":id", id)}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.INVENTORY],
  });

export const deleteInventory = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.INVENTORIES}${PATH.DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.INVENTORY],
  });

export const restoreInventory = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.INVENTORIES}${PATH.RESTORE.replace(":id", id)}`,
      method: METHOD.PUT,
    }),
    invalidatesTags: [TAGS.INVENTORY],
  });

export const forceDeleteInventory = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.INVENTORIES}${PATH.FORCE_DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.INVENTORY],
  });
