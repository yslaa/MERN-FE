import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { METHOD, TAGS, RESOURCE } from "@/constants";
import { generateEndpoints } from "./endpoints";
import { generateHooks } from "./hooks";

const prepareHeaders = (headers, { getState }) => {
  if (getState().auth.authenticated)
    headers.set("authorization", `Bearer ${getState().auth.token || ""}`);
  headers.set("accept", `application/json`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: RESOURCE.INCLUDE,
  prepareHeaders,
});

export const api = createApi({
  reducerPath: TAGS.API,
  baseQuery,
  tagTypes: METHOD.TAGS,
  keepUnusedDataFor: 0,
  endpoints: (builder) => generateEndpoints(builder),
});

export const hooks = generateHooks(api);
