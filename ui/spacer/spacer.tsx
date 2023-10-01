import "./spacer.scss";

const Spacer = (props: {
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
    | "enormous";
}) => {
  return <div className={`--spacer-${props?.size || "small"}`}></div>;
};

export default Spacer;
