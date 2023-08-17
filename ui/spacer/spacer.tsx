import "./spacer.scss";

export const Spacer = (props: {
  size:
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
