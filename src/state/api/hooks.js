export const generateHooks = (api) => {
  const hooks = {};

  Object.keys(api.endpoints).forEach((endpoint) => {
    const { useQuery, useLazyQuery, useMutation } = api.endpoints[endpoint];
    const type = useQuery || useLazyQuery ? "Query" : "Mutation";
    hooks[`use${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}${type}`] =
      useQuery || useMutation;
  });

  return hooks;
};
