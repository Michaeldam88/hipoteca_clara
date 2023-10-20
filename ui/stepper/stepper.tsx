import "./stepper.scss";
import Text from "../text/text";
import Spacer from "../spacer/spacer";

function Stepper<T>({
  steps,
  activeStep,
}: {
  steps: {
    id: T;
    title: string;
    subTitle?: string;
  }[];
  activeStep: T;
}) {
  const currentPosition = steps.findIndex(
    (element) => element.id === activeStep
  );

  const current = steps[currentPosition];

  return (
    <div className="stepper">
      <Text
        preset="smaller"
        text={`Paso ${currentPosition + 1}`}
        color="subtle"
      />
      <Spacer size="tiny" />
      <Text preset="headline5" text={current?.title || ""} />
      <Spacer size="smaller" />
      <Text preset="small" text={current?.subTitle || ""} />
      <Spacer size="large" />

      <div className="stepper__steps-container">
        {steps.map((element, i) =>
          i <= currentPosition ? (
            <div
              key={i}
              className="stepper__step stepper__step--completed"
            ></div>
          ) : (
            <div key={i} className="stepper__step"></div>
          )
        )}
      </div>
    </div>
  );
}

export default Stepper;
