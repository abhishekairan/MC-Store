"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

interface VotingSite {
  id?: string;
  name: string;
  url: string;
}

interface SiteSettings {
  siteName: string;
  siteLogo: string;
  applicationAPI: string;
  clientAPI: string;
  serverIp: string;
}

const SettingsPage: React.FC = () => {
  const router = useRouter();

  // State for site settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "",
    siteLogo: "",
    applicationAPI: "",
    clientAPI: "",
    serverIp: "",
  });

  // State for voting sites
  const [votingSites, setVotingSites] = useState<VotingSite[]>([]);
  const [newVotingSite, setNewVotingSite] = useState<VotingSite>({
    name: "",
    url: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsResponse = await axios.get("/api/dashboard/settings");
        const votingSitesResponse = await axios.get("/api/dashboard/voting-sites");

        setSiteSettings(settingsResponse.data);
        setVotingSites(votingSitesResponse.data);
        setLogoPreview(settingsResponse.data.siteLogo || null);
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings.");
      }
    };

    fetchData();
  }, []);

  // Handle input changes for site settings
  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle logo upload
  const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Upload the file to the server
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        if (response.ok) {
          const imageUrl = responseData.filePath; // Get the file path from the response
          console.log("Uploaded image URL:", imageUrl); // Log the uploaded image URL
          setLogoPreview(imageUrl); // Show the uploaded image preview
          setSiteSettings((prev) => ({
            ...prev,
            siteLogo: imageUrl, // Save the file path in the site settings
          }));
          toast.success("Logo uploaded successfully!");
        } else {
          toast.error(responseData.error || "Failed to upload logo.");
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
        toast.error("Failed to upload logo. Please try again.");
      }
    }
  };

  // Handle input changes for new voting site
  const handleVotingSiteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVotingSite((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new voting site
  const addVotingSite = () => {
    if (!newVotingSite.name || !newVotingSite.url) {
      toast.error("Please fill in both the site name and URL.");
      return;
    }
    setVotingSites((prev) => [...prev, newVotingSite]);
    setNewVotingSite({ name: "", url: "" });
  };

  // Delete a voting site
  const deleteVotingSite = (index: number) => {
    setVotingSites((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Update site settings
      await axios.post("/api/dashboard/settings", siteSettings);

      // Update voting sites
      await axios.post("/api/dashboard/voting-sites", { votingSites });

      toast.success("Settings updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Site Settings</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Site Settings */}
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="siteName">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={siteSettings.siteName}
              onChange={handleSettingsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="serverIp">
              Server IP
            </label>
            <input
              type="text"
              id="serverIp"
              name="serverIp"
              value={siteSettings.serverIp}
              onChange={handleSettingsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="applicationAPI">
              Pterodactyl's Application API
            </label>
            <input
              type="text"
              id="applicationAPI"
              name="applicationAPI"
              value={siteSettings.applicationAPI}
              onChange={handleSettingsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="clientAPI">
              Pterodactyl's Client API
            </label>
            <input
              type="text"
              id="clientAPI"
              name="clientAPI"
              value={siteSettings.clientAPI}
              onChange={handleSettingsChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="siteLogo">
            Site Logo
          </label>
          <input
            type="file"
            id="siteLogo"
            name="siteLogo"
            accept="image/*"
            onChange={handleLogoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          />
          {logoPreview && (
            <img src={logoPreview} alt="Logo Preview" className="mt-4 h-64 w-64 object-cover rounded" />
          )}
        </div>

        {/* Voting Sites */}
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Voting Sites</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Site Name"
              value={newVotingSite.name}
              onChange={handleVotingSiteChange}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              id="url"
              name="url"
              placeholder="Voting Link"
              value={newVotingSite.url}
              onChange={handleVotingSiteChange}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={addVotingSite}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
          <ul className="list-disc pl-5">
            {votingSites.map((site, index) => (
              <li key={index} className="text-gray-300 mb-2">
                <div className="flex justify-between items-center">
                  <span>{`Name: ${site.name}, URL: ${site.url}`}</span>
                  <button
                    type="button"
                    onClick={() => deleteVotingSite(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;