interface InputFieldProps {
  label: string;
  type: string;
  name : string,
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, onChange ,name}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 w-full rounded"
      name={name}

    />
  </div>
);

export default InputField;
