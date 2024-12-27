import React from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { FaEye, FaEdit, FaTrash, FaRecycle, FaBan } from "react-icons/fa";
import { hooks } from "@api";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function Inventory() {
  const navigate = useNavigate();

  const { data: activeInventories, isLoading: isActiveLoading } =
    hooks.useGetAllInventoriesQuery();
  const { data: deletedInventories, isLoading: isDeletedLoading } =
    hooks.useGetAllInventoriesDeletedQuery();
  const [deleteInventory] = hooks.useDeleteInventoryMutation();
  const [restoreInventory] = hooks.useRestoreInventoryMutation();
  const [forceDeleteInventory] = hooks.useForceDeleteInventoryMutation();

  const allInventories = [
    ...(activeInventories?.data || []).map((inventory) => ({
      ...inventory,
      isDeleted: false,
    })),
    ...(deletedInventories?.data || []).map((inventory) => ({
      ...inventory,
      isDeleted: true,
    })),
  ];

  const handleDelete = (id) => {
    deleteInventory(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Inventory item deleted successfully!"));
  };

  const handleRestore = (id) => {
    restoreInventory(id)
      .unwrap()
      .then(() =>
        Toast(TOAST.SUCCESS, "Inventory item restored successfully!"),
      );
  };

  const handleForceDelete = (id) => {
    forceDeleteInventory(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Inventory item permanently deleted!"));
  };

  const handleView = (id) => {
    navigate(`/dashboard/inventory/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/inventory/edit/${id}`);
  };

  const handleCreateInventory = () => {
    navigate("/dashboard/inventory/create");
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
              Inventories
            </h1>
            <button
              onClick={handleCreateInventory}
              className="px-6 py-2 text-lg font-semibold rounded-md bg-secondary-variant text-light-default"
            >
              Create Inventory
            </button>
          </div>
          <table className="w-full border-collapse rounded-lg shadow-lg bg-light-variant">
            <thead>
              <tr className="text-lg font-semibold text-light-variant bg-primary-default">
                <th className="p-4 border border-primary-variant">Id</th>
                <th className="p-4 border border-primary-variant">Product</th>
                <th className="p-4 border border-primary-variant">Quantity</th>
                <th className="p-4 border border-primary-variant">
                  Warehouse Location
                </th>
                <th className="p-4 border border-primary-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allInventories.map((inventory) => (
                <tr
                  key={inventory._id}
                  className={`transition duration-200 ${
                    inventory.isDeleted &&
                    "bg-error-default/15 text-dark-default"
                  }`}
                >
                  <td className="p-4 text-center border border-neutral-300 text-dark-default dark:text-light-default">
                    {inventory._id}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {inventory.product.name}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {inventory.quantity}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {inventory.warehouseLocation}
                  </td>
                  <td className="p-4 border border-neutral-300">
                    <div className="flex justify-center gap-4">
                      {!inventory.isDeleted ? (
                        <>
                          <FaEye
                            className="cursor-pointer text-info-default size-6"
                            title="View"
                            onClick={() => handleView(inventory._id)}
                          />
                          <FaEdit
                            className="cursor-pointer text-primary-default size-6"
                            title="Edit"
                            onClick={() => handleEdit(inventory._id)}
                          />
                          <FaTrash
                            className="cursor-pointer text-error-default size-6"
                            title="Delete"
                            onClick={() => handleDelete(inventory._id)}
                          />
                        </>
                      ) : (
                        <>
                          <FaRecycle
                            className="cursor-pointer text-secondary-default size-6"
                            title="Restore"
                            onClick={() => handleRestore(inventory._id)}
                          />
                          <FaBan
                            className="cursor-pointer text-neutral-secondary size-6"
                            title="Force Delete"
                            onClick={() => handleForceDelete(inventory._id)}
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
