import React from "react";
import Table from "@/components/Table";
interface FormData {
  name: string;
  email: string;
  id: string;
}

const Page: React.FC = () => {

  // Sample Server list
  const server = [
    { id: '001', name: 'Server 1', ip: 'play.clubcolony.in', uuid: '0000-0000-0000-0000' },
  ];

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