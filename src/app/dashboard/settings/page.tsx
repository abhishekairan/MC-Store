"use client"

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent } from "react";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";
import { ACTION_SERVER_ACTION, ACTION_SERVER_PATCH } from "next/dist/client/components/router-reducer/router-reducer-types";
import { Action } from "@radix-ui/react-toast";

interface FormData {
  siteName: string;
  siteLogo: string;
  clientAPI: string;
  applicationAPI: string;
}

interface Action {
  id: string;
  server: string;
  command: string;
  delay: number;
}

interface Props {
  actions?: Action[];
}



//settings code

const Page = () => {

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    siteName: "Default Site",
    siteLogo: "",
    clientAPI: "",
    applicationAPI: ""
  });
  const [isDirty, setIsDirty] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsDirty(true);
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setFormData((prevData) => ({
          ...prevData,
          siteLogo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Data saved:', formData);
    setIsDirty(false);
  };

  const handleDiscard = () => {
    setFormData({
      siteName: "Default Site",
      siteLogo: "",
      clientAPI: "",
      applicationAPI: ""
    });
    setLogoPreview(null);
    setIsDirty(false);
  };

//voting_sites code

  const [newAction, setNewAction] = useState<Action>({
    id: '',
    server: '',
    command: '',
    delay: 0,
  });
    const [actions, setActions] =useState<Action[]>([]);
  
    const handleActionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
         
          setNewAction((prevAction) => ({
              ...prevAction,
              [name]: value,
          }));
      };
  
      const addAction = () => {
        setActions((prevActions) => [prevActions, newAction]);
        setNewAction({ id: '', server: '', command: '', delay: 0 });
      };
  
    const deleteAction = (index: number) => {
        setNewAction((prevActions) => prevActions .filter((_, i) => i !== index));
        
      
    };
  return (

    
         //settings code
    <div>
      <div className="h-full border border-gray-600 flex flex-col justify-between px-4 py-4 rounded-md">
        <div className="flex gap-4">
          <div className="flex flex-col w-1/3 gap-4">
            <div className="flex flex-col">
              <label className="block text-gray-300 text-xl font-bold mb-2" htmlFor="siteName">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-300 text-xl font-bold mb-2" htmlFor="applicationAPI">
                Pterodactyl's Application API
              </label>
              <input
                type="text"
                id="applicationAPI"
                name="applicationAPI"
                value={formData.applicationAPI}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-300 text-xl font-bold mb-2" htmlFor="clientAPI">
                Pterodactyl's Client API
              </label>
              <input
                type="text"
                id="clientAPI"
                name="clientAPI"
                value={formData.clientAPI}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex flex-col w-2/3 items-center">
            <label className="block text-gray-300 text-xl font-bold mb-2" htmlFor="siteLogo">
              Site Logo
            </label>
            <input
              type="file"
              id="siteLogo"
              name="siteLogo"
              accept="image/*"
              onChange={handleLogoChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
            {logoPreview && (
              <img src={logoPreview} alt="Logo Preview" className="mt-4 h-64 w-64 object-cover rounded" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-end mt-auto">
          <button
            type="button"
            onClick={handleDiscard}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
        
    
  
 {/* voting sites */}
    
    </div><br/><br/>
       <div>
        
      <div className="border-x-2 bottom-1 pl-5 place-items-center pt-5  border-y-4 border-gray-600 rounded-xl flex-row w-70 h-60 pr-20 mt-8 "> 
      <div className="mb-4">
            <label className="block text-gray-300  font-bold mb-2 text-2xl"   htmlFor="actions">
               Voting Sites 
            </label><br/>
            <div className="flex flex-col mb-4">
                <div className="flex gap-2 mb-2">
                    <select
                        id="server"
                        name="server"
                        value={newAction.server}
                        onChange={handleActionChange}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline w-1/6"
                    >
                        <option value="">Select Server</option>
                        <option value="server1">Server 1</option>
                        <option value="server2">Server 2</option>
                        <option value="server3">Server 3</option>
                    </select>
                    <input
                        type="number"
                        id="delay"
                        name="delay"
                        placeholder="Delay"
                        value={newAction.delay}
                        onChange={handleActionChange}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline w-1/6"
                    />
                    <input
                        type="text"
                        id="command"
                        name="command"
                        value={newAction.command}
                        onChange={handleActionChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <input
                    type="hidden"
                    id="id"
                    name="id"
                    value={newAction.id}
                    onChange={handleActionChange}
                />
                <button
                    type="button"
                    onClick={addAction}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Action
                </button>
            </div>
             <ul className="list-disc pl-5">
                {actions.map((action, index) => (
                    <li key={index} className="text-gray-300 mb-2">
                        <div className="flex justify-between items-center">
                            <span>{`Server: ${action.server}, Command: ${action.command}, Delay: ${action.delay}`}</span>
                            <button
                                type="button"
                                onClick={() => deleteAction(index)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
          
      </ul> </div>
       </div>
       </div>
       {/* server ip */}
        <br/>
       <div>
       <div className="border-x-2 bottom-1 p-5 align:left  border-y-4 mr-5 border-gray-600 rounded-xl flex-row w-80 h-40  mt-8 "> 
       <div className="mb-4 text-3xl">
        Server Ip
        </div>
        </div>
       </div>


        {/* Stats */}

        
       <div>
       <div className="border-x-2 border-y-4 bottom-1 text-left p-5  border-gray-600 rounded-xl  w-80 h-40 ml-80 mt-8  flex-row mr-auto    "> 
       <div className="mb-4 text-3xl">
        Stats
        </div>
        </div>
       </div>

  
  </div>






   
);
}

export default Page 