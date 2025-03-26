import React, { ChangeEvent } from 'react';

interface FormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleDiscard: () => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ handleChange, handleSave, handleDiscard, children }) => {
  return (
    <div className="px-10 py-5 h-full w-full text-xl">
      <form className="flex flex-col h-full justify-between">
        <div>
          {children}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleDiscard} label="Discard" color="red" />
          <Button onClick={handleSave} label="Save" color="blue" />
        </div>
      </form>
    </div>
  );
};

const FormField: React.FC<{
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className="mb-4 flex gap-5 items-center">
      <label className="text-white text-l font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

const Button: React.FC<{ onClick: () => void; label: string; color: string }> = ({ onClick, label, color }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    >
      {label}
    </button>
  );
};

export  { Form, FormField };