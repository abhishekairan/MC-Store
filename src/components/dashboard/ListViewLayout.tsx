"use client";

import React, { ChangeEvent, useState } from "react";
import Table, { TableData } from "@/components/Table";
import { useRouter } from "next/navigation";

interface ListViewLayoutProps {
  data: TableData;
  name: string;
  addbtn?: boolean;
}

const ListViewLayout: React.FC<{ props: ListViewLayoutProps }> = ({ props }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [data] = useState(props.data.body); // Original data

  // Filter data based on the search query
  const filteredData = data.filter((row) =>
    row.some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const filteredTableData = {
    ...props.data,
    body: filteredData, // Pass filtered data to the table
  };

  return (
    <>
      <div
        className={
          props.addbtn === true
            ? "h-16 border border-gray-600 flex items-center justify-between px-4 rounded-md"
            : "h-16 border border-gray-600 flex flex-row-reverse items-center justify-between px-4 rounded-md"
        }
      >
        {props.addbtn && (
          <button
            onClick={() => router.push(`/dashboard/${props.name}/new`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add {props.name}
          </button>
        )}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange} // Handle search input changes
          className="px-4 py-2 rounded border border-gray-600"
        />
      </div>
      {filteredData.length > 0 ? (
        <Table props={filteredTableData} />
      ) : (
        <div className="mt-4 text-center text-gray-500">
          No results found for "{searchQuery}"
        </div>
      )}
    </>
  );
};

export default ListViewLayout;