"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    id: string;
    name: string;
    discount?: number | null;
    description?: string | null;
    image?: string | null;
}

const CategoryLayout: React.FC<{props: Props}> = ({props}) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Props>(props);
    const [imagePreview, setImagePreview] = useState<string | null>(props.image || null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData((prevData) => ({
                    ...prevData,
                    image: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleDiscard = () => {
        setFormData(props);
        setImagePreview(props.image || null);
        return router.back();
    };

    return (
        <div className="w-full h-full p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Add New Category</h2>
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
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
                        {imagePreview && (
                            <img src={imagePreview} alt="Image Preview" className="mt-2 h-64 w-64 rounded" />
                        )}
                    </div>
                    <div className="flex flex-col w-2/3">
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                                Category Name
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
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="discount">
                                Discount
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount || ''}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                </div>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryLayout;