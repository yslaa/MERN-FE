import React from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { FaEye, FaEdit, FaTrash, FaRecycle, FaBan } from "react-icons/fa";
import { hooks } from "@api";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function Product() {
  const navigate = useNavigate();

  const { data: activeProducts, isLoading: isActiveLoading } =
    hooks.useGetAllProductsQuery();
  const { data: deletedProducts, isLoading: isDeletedLoading } =
    hooks.useGetAllProductsDeletedQuery();
  const [deleteProduct] = hooks.useDeleteProductMutation();
  const [restoreProduct] = hooks.useRestoreProductMutation();
  const [forceDeleteProduct] = hooks.useForceDeleteProductMutation();

  const allProducts = [
    ...(activeProducts?.data || []).map((product) => ({
      ...product,
      isDeleted: false,
    })),
    ...(deletedProducts?.data || []).map((product) => ({
      ...product,
      isDeleted: true,
    })),
  ];

  const handleDelete = (id) => {
    deleteProduct(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Product deleted successfully!"));
  };

  const handleRestore = (id) => {
    restoreProduct(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Product restored successfully!"));
  };

  const handleForceDelete = (id) => {
    forceDeleteProduct(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Product permanently deleted!"));
  };

  const handleView = (id) => {
    navigate(`/dashboard/product/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/product/edit/${id}`);
  };

  const handleCreateProduct = () => {
    navigate("/dashboard/product/create");
  };

  return (
    <section className="p-4">
      {isActiveLoading || isDeletedLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary-default">
              Products
            </h1>
            <button
              onClick={handleCreateProduct}
              className="px-6 py-2 text-lg font-semibold rounded-md bg-secondary-variant text-light-default"
            >
              Create Product
            </button>
          </div>
          <table className="w-full border-collapse rounded-lg shadow-lg bg-light-variant">
            <thead>
              <tr className="text-lg font-semibold text-light-variant bg-primary-default">
                <th className="p-4 border border-primary-variant">Id</th>
                <th className="p-4 border border-primary-variant">Name</th>
                <th className="p-4 border border-primary-variant">
                  Description
                </th>
                <th className="p-4 border border-primary-variant">Price</th>
                <th className="p-4 border border-primary-variant">Images</th>
                <th className="p-4 border border-primary-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr
                  key={product._id}
                  className={`transition duration-200 ${
                    product.isDeleted && "bg-error-default/15 text-dark-default"
                  }`}
                >
                  <td className="p-4 text-center border border-neutral-300 text-dark-default dark:text-light-default">
                    {product._id}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {product.name}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {product.description}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    ${product.price}
                  </td>
                  <td className="p-4 border border-neutral-300">
                    <div className="flex flex-wrap gap-2">
                      {product.image.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={`Image ${i + 1} of ${product.name}`}
                          className="object-cover w-20 h-20 border rounded-lg shadow-md border-primary-default"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 border border-neutral-300">
                    <div className="flex justify-center gap-4">
                      {!product.isDeleted ? (
                        <>
                          <FaEye
                            className="cursor-pointer text-info-default size-6"
                            title="View"
                            onClick={() => handleView(product._id)}
                          />
                          <FaEdit
                            className="cursor-pointer text-primary-default size-6"
                            title="Edit"
                            onClick={() => handleEdit(product._id)}
                          />
                          <FaTrash
                            className="cursor-pointer text-error-default size-6"
                            title="Delete"
                            onClick={() => handleDelete(product._id)}
                          />
                        </>
                      ) : (
                        <>
                          <FaRecycle
                            className="cursor-pointer text-secondary-default size-6"
                            title="Restore"
                            onClick={() => handleRestore(product._id)}
                          />
                          <FaBan
                            className="cursor-pointer text-neutral-secondary size-6"
                            title="Force Delete"
                            onClick={() => handleForceDelete(product._id)}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
