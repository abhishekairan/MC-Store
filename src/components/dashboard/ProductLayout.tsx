"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Action {
    id: string;
    server: string;
    command: string;
    delay: number;
}

interface Props {
    id: string;
    name: string;
    price?: number;
    discount?: number;
    stock?: number;
    description?: string;
    image?: string;
    category?: number;
    actions?: Action[];
}

const ProductLayout: React.FC<{props: Props}> = ({props}) => {
    const [formData, setFormData] = useState<Props>(props);
    const [imagePreview, setImagePreview] = useState<string | null>(props.image || null);
    const [newAction, setNewAction] = useState<Action>({ id: '', server: '', command: 'command', delay: 0 });

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

    const handleActionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setNewAction((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addAction = () => {
        setFormData((prevData) => ({
            ...prevData,
            actions: [...(prevData.actions || []), newAction],
        }));
        setNewAction({ id: '', server: '', command: '', delay: 0 });
    };

    const deleteAction = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            actions: prevData.actions?.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleDiscard = () => {
        setFormData(props);
        setImagePreview(props.image || null);
    };

    return (
        <div className="w-full h-full p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Add New Product</h2>
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
                                value={formData.price || ''}
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
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="stock">
                                Stock
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock || ''}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="number"
                        id="category"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
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
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="actions">
                        Actions
                    </label>
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
                        {formData.actions?.map((action, index) => (
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
                    </ul>
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

export default ProductLayout;