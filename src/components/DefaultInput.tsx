const DefaultInput = ({ name, type, value, onChange, error, placeHolder, label, rows, maxLength,caption}: any) => {
  const isTextArea = type === "textarea"; // Check if the input type is textarea

  return (
    <div className="grid">
      <label
        htmlFor={name}
        className={`mb-[16px] font-bold text-[14px] text-lightpurple ${error && 'text-[#D73737]'} peer-invalid:text-[#D73737]`}
      >
        {label}
        <p className="text-lightpurple font-light">{caption}</p>
      </label>
      
      {isTextArea ? (
        <textarea
          id={name}
          className={`peer border-[1px] rounded-[5px] bg-darkwhite py-[13px] px-[24px] text-[#3A4374] focus:border-darkblue focus:outline-none invalid:border-[#D73737] invalid:border-[2px] ${error && 'border-[#D73737] border-[2px]'}`}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          name={name}
          rows={rows || 2} // Default to 4 rows if not provided
          maxLength={maxLength || 250} // Enforce minLength of 250 characters, default value
        />
      ) : (
        <input
          type={type}
          id={name}
          className={`peer border-[1px] rounded-[5px] bg-darkwhite py-[13px] px-[24px] text-[#3A4374] focus:border-darkblue focus:outline-none invalid:border-[#D73737] invalid:border-[2px] ${error && 'border-[#D73737] border-[2px]'}`}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          name={name}
        />
      )}

      {error && <p className="text-[10px] text-[#D73737]">{error}</p>}
    </div>
  );
};

export default DefaultInput;
