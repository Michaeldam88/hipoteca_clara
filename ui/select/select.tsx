import "./select.scss";

const Select = ({
  options,
  name,
  setOption,
}: {
  options: { id: number; value: string }[];
  name: string;
  setOption: (value: string) => void;
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
            <option
              className="select-option"
              value={option.value}
              key={option.id}
            >
              {option.value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
