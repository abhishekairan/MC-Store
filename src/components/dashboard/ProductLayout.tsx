"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

interface Action {
  id: number;
  serverId: number;
  command: string;
  product: number;
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  id?: string;
  name: string;
  price?: number | null;
  discountAmount?: number | null;
  discountType?: string | null; // "₹" or "%"
  stock?: number | null;
  description?: string | null;
  image?: string | null;
  categoryId?: number | null;
  actions?: Action[] | null;
}

const ProductLayout: React.FC<{ props: Props }> = ({ props }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Props>(props);
  const [imagePreview, setImagePreview] = useState<string | null>(props.image || null);
  const [categories, setCategories] = useState<Category[]>([]); // State for categories
  const [isDirty, setIsDirty] = useState(false); // Track if the form is modified
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/dashboard/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Detect changes in the form
  useEffect(() => {
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(props);
    setIsDirty(isFormChanged);
  }, [formData, props]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Upload the image to the local API route
        const response = await fetch("/api/dashboard/image", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        const imageUrl = responseData.filePath; // Get the image URL from the response
        console.log("Image URL:", imageUrl);
        setImagePreview(imageUrl); // Show the uploaded image preview
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl, // Update the form data with the new image URL
        }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.categoryId) {
      toast.error("Please fill in all required fields, including category.");
      return;
    }

    try {
      setIsSubmitting(true); // Start submission process

      await axios.post("/api/dashboard/product", formData);
      toast.success("Product saved successfully!");
      router.push("/dashboard/product");
      router.refresh();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop submission process
    }
  };

  const handleDiscard = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm("You have unsaved changes. Are you sure you want to discard?");
      if (!confirmDiscard) return;
    }
    setFormData(props);
    setImagePreview(props.image || null);
    router.back(); // Redirect to the previous page
  };

  // Warn user if they try to navigate away with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Show browser confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <div className="w-full h-full p-8 shadow-md rounded-md">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg">Processing...</div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-300">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Form Fields */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col items-start w-1/3">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 h-64 w-64 rounded" />}
          </div>
          <div className="flex flex-col w-2/3">
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="discountAmount">
                  Discount Amount
                </label>
                <input
                  type="number"
                  id="discountAmount"
                  name="discountAmount"
                  value={formData.discountAmount || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="discountType">
                  Discount Type
                </label>
                <select
                  id="discountType"
                  name="discountType"
                  value={formData.discountType || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select a discount type
                  </option>
                  <option value="₹">₹</option>
                  <option value="%">%</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="categoryId">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
              />
            </div>
          </div>
        </div>
        {/* Other Fields */}
        <div className="flex items-center justify-end mt-auto pb-10">
          <button
            type="button"
            onClick={handleDiscard}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={!isDirty || isSubmitting} // Disable save button if no changes or during submission
            className={`${
              isDirty && !isSubmitting ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductLayout;