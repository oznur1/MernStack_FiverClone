const Input = ({ label, type, disabled, name }) => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium block">{label}</label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 text-dark disabled:bg-gray-300"
        disabled={disabled}
        name={name}
      />
    </div>
  );
};

export default Input;
