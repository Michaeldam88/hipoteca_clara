import "./select.scss";

const Select = ({
  options,
  name,
  setOption,
}: {
  options: string[];
  name: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };

  return (
    <div onChange={handleChange}>
      <label className="select-label">
        Choose a Country:
        <select className="select-container" name={name}>
          <option className="select-option" value="">
            -- Choose a country --
          </option>
          {options.map((option) => (
            <option className="select-option" value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
