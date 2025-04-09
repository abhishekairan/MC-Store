"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

interface Props {
  id?: string;
  code: string;
  amount: number;
  type: string; // "₹" or "%"
}

const CouponLayout: React.FC<{ props: Props }> = ({ props }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Props>(props);
  const [isDirty, setIsDirty] = useState(false); // Track if the form is modified
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Detect changes in the form
  useEffect(() => {
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(props);
    setIsDirty(isFormChanged);
  }, [formData, props]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.code || !formData.amount || !formData.type) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true); // Start submission process

      await axios.post("/api/dashboard/coupon", formData);
      toast.success("Coupon saved successfully!");
      router.push("/dashboard/coupon");
      router.refresh();
    } catch (error) {
      console.error("Error saving coupon:", error);
      toast.error("Failed to save coupon. Please try again.");
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

      <h2 className="text-2xl font-bold mb-4 text-gray-300">Add/Edit Coupon</h2>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Form Fields */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="code">
              Coupon Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Discount Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="type">
              Discount Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type || ""}
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
        {/* Buttons */}
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

export default CouponLayout;