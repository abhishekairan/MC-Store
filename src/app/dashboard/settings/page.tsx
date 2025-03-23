"use client";

import { useUpdateSidebarItems } from "@/components/dashboard/MainLayout";
import { useSidebar } from "@/context/context";
import React, { useState, ChangeEvent } from "react";

interface FormData {
  siteName: string;
  siteLogo: string;
  clientAPI: string;
  applicationAPI: string;
}

const Page: React.FC = () => {

  const { sidebarItems, setSidebarItems: setSidebarItemsDispatch } = useSidebar();
  useUpdateSidebarItems(sidebarItems, setSidebarItemsDispatch, 4);


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

  return (
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
    </div>
  );
};

export default Page;