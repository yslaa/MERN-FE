import { UserApi, ProductAPI, InventoryAPI, TransactionAPI } from "./services";

export const generateEndpoints = (builder) => {
  const endpoints = {};
  const combinedApis = {
    ...UserApi,
    ...ProductAPI,
    ...InventoryAPI,
    ...TransactionAPI,
  };

  Object.keys(combinedApis).forEach((key) => {
    endpoints[key] = combinedApis[key](builder);
  });

  return endpoints;
};
