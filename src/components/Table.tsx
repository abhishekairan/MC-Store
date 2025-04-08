"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export interface TableData {
  head: (string | number | null)[];
  body: (string | number | any)[][];
  actions: boolean;
}

const Table: React.FC<{ props: TableData }> = ({ props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [tableData, setTableData] = useState(props.body); // Local state for table rows
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  // Close modal on "Esc" key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true); // Start loading

      // Call the API to delete the product from the database
      const type = pathname.split("/").filter(Boolean).pop();
      const res = await axios.delete("/api/dashboard", { data: { type, id } });

      // Remove the row from the table
      setTableData((prevData) => prevData.filter((row) => row[0] !== id));

      alert(res.data.message);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col mt-5">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Processing...</div>
        </div>
      )}

      <table className="mx-auto w-full text-left gap-6 border-separate border-spacing-y-5">
        <thead>
          <tr key="headofthetable" className="text-2xl">
            {props.head.map((head, index) => (
              <th
                key={`head-${index}`}
                className="border-gray-600 border-y first:border-l last:border-r p-2"
              >
                <div className="flex items-center justify-center">{head}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                const isImageColumn =
                  props.head[cellIndex]?.toString().toLowerCase() === "image";

                return (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className="text-gray-300 border-y first:border-l last:border-r border-gray-600 p-2"
                  >
                    <div className="flex items-center justify-center">
                      {isImageColumn && typeof cell === "string" ? (
                        <img
                          src={cell}
                          alt="Thumbnail"
                          className="h-12 w-12 object-cover rounded cursor-pointer"
                          onClick={() => openModal(cell)}
                        />
                      ) : (
                        cell
                      )}
                    </div>
                  </td>
                );
              })}
              {props.actions && (
                <td className="border-y border-r border-gray-600 p-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        router.push(`${pathname}/${row[0]}`);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      disabled={isLoading} // Disable button while loading
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row[0])}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      disabled={isLoading} // Disable button while loading
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Full-Size Image Modal */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Full Size"
            className="max-w-full max-h-full rounded"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </div>
      )}
    </div>
  );
};

export default Table;