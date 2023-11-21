import "./spacer.scss";

const Spacer = ({size}: {
  size?:
    | "tiny"
    | "smaller"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "huge"
    | "xhuge"
    | "giant"
    | "enormous"    
}) => {
  return <div className={`--spacer-${size || "small"}`}></div>;
};

export default Spacer;
