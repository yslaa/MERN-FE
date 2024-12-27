import React from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { FaEye, FaEdit, FaTrash, FaRecycle, FaBan } from "react-icons/fa";
import { hooks } from "@api";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function Transaction() {
  const navigate = useNavigate();

  const { data: activeTransactions, isLoading: isActiveLoading } =
    hooks.useGetAllTransactionsQuery();
  const { data: deletedTransactions, isLoading: isDeletedLoading } =
    hooks.useGetAllTransactionsDeletedQuery();
  const [deleteTransaction] = hooks.useDeleteTransactionMutation();
  const [restoreTransaction] = hooks.useRestoreTransactionMutation();
  const [forceDeleteTransaction] = hooks.useForceDeleteTransactionMutation();

  const allTransactions = [
    ...(activeTransactions?.data || []).map((transaction) => ({
      ...transaction,
      isDeleted: false,
    })),
    ...(deletedTransactions?.data || []).map((transaction) => ({
      ...transaction,
      isDeleted: true,
    })),
  ];

  const handleDelete = (id) => {
    deleteTransaction(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Transaction deleted successfully!"));
  };

  const handleRestore = (id) => {
    restoreTransaction(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Transaction restored successfully!"));
  };

  const handleForceDelete = (id) => {
    forceDeleteTransaction(id)
      .unwrap()
      .then(() => Toast(TOAST.SUCCESS, "Transaction permanently deleted!"));
  };

  const handleView = (id) => {
    navigate(`/dashboard/transaction/${id}`);
  };

  const handleEdit = (id, status) => {
    if (status === "Completed") {
      Toast(TOAST.WARN, "Completed transactions cannot be edited!");
      return;
    }
    navigate(`/dashboard/transaction/edit/${id}`);
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
              Transactions
            </h1>
          </div>
          <table className="w-full border-collapse rounded-lg shadow-lg bg-light-variant">
            <thead>
              <tr className="text-lg font-semibold text-light-variant bg-primary-default">
                <th className="p-4 border border-primary-variant">Id</th>
                <th className="p-4 border border-primary-variant">User</th>
                <th className="p-4 border border-primary-variant">Products</th>
                <th className="p-4 border border-primary-variant">
                  Total Price
                </th>
                <th className="p-4 border border-primary-variant">Payment</th>
                <th className="p-4 border border-primary-variant">Status</th>
                <th className="p-4 border border-primary-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className={`transition duration-200 ${
                    transaction.isDeleted &&
                    "bg-error-default/15 text-dark-default"
                  }`}
                >
                  <td className="p-4 text-center border border-neutral-300 text-dark-default dark:text-light-default">
                    {transaction._id}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {transaction.user.firstName} {transaction.user.lastName}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    <ul className="pl-4 list-disc">
                      {transaction.product.map((product, index) => (
                        <li key={index}>
                          {product.quantity} x {product.id.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    ₱{transaction.totalPrice}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {transaction.payment}
                  </td>
                  <td className="p-4 border border-neutral-300 text-dark-default dark:text-light-default">
                    {transaction.status}
                  </td>
                  <td className="p-4 border border-neutral-300">
                    <div className="flex justify-center gap-4">
                      {!transaction.isDeleted ? (
                        <>
                          <FaEye
                            className="cursor-pointer text-info-default size-6"
                            title="View"
                            onClick={() => handleView(transaction._id)}
                          />
                          <FaEdit
                            className="cursor-pointer text-primary-default size-6"
                            title="Edit"
                            onClick={() =>
                              handleEdit(transaction._id, transaction.status)
                            }
                          />
                          <FaTrash
                            className="cursor-pointer text-error-default size-6"
                            title="Delete"
                            onClick={() => handleDelete(transaction._id)}
                          />
                        </>
                      ) : (
                        <>
                          <FaRecycle
                            className="cursor-pointer text-secondary-default size-6"
                            title="Restore"
                            onClick={() => handleRestore(transaction._id)}
                          />
                          <FaBan
                            className="cursor-pointer text-neutral-secondary size-6"
                            title="Force Delete"
                            onClick={() => handleForceDelete(transaction._id)}
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
