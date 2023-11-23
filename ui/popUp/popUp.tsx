import "./popUp.scss";

type ButtonTypePreset = "primary" | "primary-ghost" | "warning";

const PopUp = ({
  text,
  preset = "primary",
  handleClose,
}: {
  text: string;
  preset?: ButtonTypePreset;
  handleClose: () => void;
}) => {
  return (
    <div className="popUp">
      <div className="popUp__backdrop" onClick={() => handleClose()}></div>
      <div className={`popUp__wrapper popUp--${preset}`}>{text}</div>
    </div>
  );
};

export default PopUp;
