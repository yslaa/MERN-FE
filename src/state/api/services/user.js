import { PATH, METHOD, TAGS } from "@constants";

export const getAllUsers = (builder) =>
  builder.query({
    query: () => ({
      url: PATH.USERS,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.USER],
  });

export const getAllUsersDeleted = (builder) =>
  builder.query({
    query: () => ({
      url: `${PATH.USERS}${PATH.DELETED}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.USER],
  });

export const loginUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: `${PATH.USERS}${PATH.LOGIN}`,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const logoutUser = (builder) =>
  builder.mutation({
    query: () => ({
      url: `${PATH.USERS}${PATH.LOGOUT}`,
      method: METHOD.POST,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const getSingleUser = (builder) =>
  builder.query({
    query: (id) => ({
      url: `${PATH.USERS}${PATH.ID.replace(":id", id)}`,
      method: METHOD.GET,
    }),
    providesTags: [TAGS.USER],
  });

export const registerUser = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: PATH.USERS,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const editUser = (builder) =>
  builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.USERS}${PATH.EDIT.replace(":id", id)}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const deleteUser = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.USERS}${PATH.DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const restoreUser = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.USERS}${PATH.RESTORE.replace(":id", id)}`,
      method: METHOD.PUT,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const forceDeleteUser = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `${PATH.USERS}${PATH.FORCE_DELETE.replace(":id", id)}`,
      method: METHOD.DELETE,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const updatePassword = (builder) =>
  builder.mutation({
    query: ({ id, payload }) => ({
      url: `${PATH.USERS}${PATH.CHANGE_PASSWORD.replace(":id", id)}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const forgotPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: `${PATH.USERS}${PATH.FORGOT_PASSWORD}`,
      method: METHOD.POST,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });

export const resetPassword = (builder) =>
  builder.mutation({
    query: (payload) => ({
      url: `${PATH.USERS}${PATH.RESET_PASSWORD}`,
      method: METHOD.PATCH,
      body: payload,
    }),
    invalidatesTags: [TAGS.USER],
  });
