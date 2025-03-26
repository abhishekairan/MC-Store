import React from "react";
import Table from "@/components/Table";
import { serverUtils } from "@/db/utils";

const Page: React.FC = async () => {

  const dbData = await serverUtils.getAll()

  // Sample Server list
  const server = dbData.map((server) => ({
    id: server.id,
    name: server.name,
    ip: server.ip,
    uuid: server.uuid
  }));

  const data = {
    head: ['ID', 'Name', 'IP', 'UUID'],
    body: server.map((server) => [server.id, server.name, server.ip, server.uuid]),
    actions: false
  };

  return (
    <>
      <div className="h-16 border border-gray-600 flex flex-row-reverse items-center justify-between px-4 rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-600"
        />
      </div>
      <Table props={data} />  
    </>
  );
};

export default Page;