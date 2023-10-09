import { ReactNode, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import "./modal.scss";

interface ModalProps {
  handler?: boolean;
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  height?: "auto" | "fill";
  startClosing?: boolean;
  closeOnBackdropClick?: boolean;
  onClose: () => void;
}

const Modal = ({
  handler = true,
  header,
  content,
  footer,
  height,
  closeOnBackdropClick = true,
  startClosing,
  onClose,
}: ModalProps) => {
  const startingPoint = useSignal<number | null>(null);
  const positionY = useSignal<number | null | undefined>(null);
  const wrapperHeight = useSignal<
    number | null | undefined | "100dvh" | "80dvh"
  >(null);
  const upperFreeSpace = useSignal<number | null | undefined>(null);
  const backdropOpacity = useSignal(0.7);
  const activateCSSAnimations = useSignal(false);
  const overflow = useSignal<"hidden" | "auto">("auto");
  const initialWrapElementHeight = useSignal<number>(0);
  const initialTimeStamp = useSignal<number>(0);

  const animationDuration = 0.25 * 1000;

  const html = document?.querySelector("html");
  const modalId = `--open-modal`;

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startingPoint.value = e?.touches[0]?.clientY || null;

    initialTimeStamp.value = e?.timeStamp;

    const wrapElement = document?.querySelector(".modal__wrapper");
    initialWrapElementHeight.value =
      wrapElement?.getBoundingClientRect()?.height || 0;
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>,
    opts?: { force?: boolean }
  ) => {
    const touch = e?.touches[0];
    handlePosition(touch?.clientY, opts);
    e?.target?.addEventListener(
      "touchend",
      handleTouchEnd as EventListenerOrEventListenerObject
    );
  };

  const getTopNoReturnPoint = () => {
    return window?.innerHeight * 0.1;
  };

  const getLowNoReturnPoint = () => {
    return window?.innerHeight * 0.7;
  };

  const enableCSSAnimations = () => {
    activateCSSAnimations.value = true;
    setTimeout(() => (activateCSSAnimations.value = false), animationDuration);
  };

  const handleClose = () => {
    enableCSSAnimations();
    positionY.value = window?.innerHeight;
    backdropOpacity.value = 0;
    onClose ? setTimeout(onClose, animationDuration) : null;
  };

  const handlePosition = (
    touchPositionY: number,
    opts?: { force?: boolean }
  ) => {
    const contentElem = document?.querySelector(".modal__content");
    const wrapElement = document?.querySelector(".modal__wrapper");

    const wrapElementHeight = wrapElement?.getBoundingClientRect()?.height || 0;
    upperFreeSpace.value = window?.innerHeight - wrapElementHeight;
    const shouldForce = opts?.force || false;
    const movement = touchPositionY - (startingPoint.value || 0);

    // move below
    if (movement > 0) {
      //if there is a scroll, it takes as starting point the end of the scroll position
      if (contentElem?.scrollTop !== 0 && !shouldForce) {
        startingPoint.value = touchPositionY;
        return;
      }

      const newMaxHeight =
        wrapElementHeight + ((startingPoint.value || 0) - touchPositionY);
      startingPoint.value = touchPositionY;
      wrapperHeight.value = Math.round(newMaxHeight);

      let opacity = +(
        (0.7 / initialWrapElementHeight.value) *
        wrapElementHeight
      ).toFixed(2);

      opacity = opacity < 0 ? 0 : opacity;
      opacity = opacity > 0.7 ? 0.7 : opacity;

      backdropOpacity.value = opacity;
    }

    // upper extend
    if (movement < 0 && (wrapElement?.getBoundingClientRect()?.y || 0) > 0) {
      // this will lock the scroll upward until when the modal is at fullscreen
      if (wrapElementHeight < window?.innerHeight) {
        overflow.value = "hidden";
      }

      const newMaxHeight =
        wrapElementHeight + ((startingPoint.value || 0) - touchPositionY);
      startingPoint.value = touchPositionY;
      wrapperHeight.value = Math.round(newMaxHeight);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const topNoReturnPoint = getTopNoReturnPoint();
    const lowNoReturnPoint = getLowNoReturnPoint();

    const wrapElement = document?.querySelector(".modal__wrapper");
    const wrapElementHeight = wrapElement?.getBoundingClientRect()?.height || 0;

    const currentModalPosition = upperFreeSpace.value || 0;

    // If it has reached the top no-returning point the height go to 100%
    if (currentModalPosition < topNoReturnPoint) {
      enableCSSAnimations();
      wrapperHeight.value = "100dvh";
      backdropOpacity.value = 0.7;
      overflow.value = "auto";
    }

    // If it has not reached the low or top no-returning point when the touch ends
    // the modal goes back again to the initial position
    if (
      currentModalPosition < lowNoReturnPoint &&
      currentModalPosition > topNoReturnPoint
    ) {
      enableCSSAnimations();
      wrapperHeight.value = "80dvh";
      backdropOpacity.value = 0.7;
      overflow.value = "auto";
    }

    // If the modal reaches the not returning point it is moved to the bottom of the screen and closed when the animation is finished
    if (currentModalPosition > lowNoReturnPoint) {
      handleClose();
    }

    //close the modal if there is a fast swipe down
    if (
      e.timeStamp - initialTimeStamp.value < 150 &&
      initialWrapElementHeight.value - wrapElementHeight > 60
    ) {
      handleClose();
    }

    e?.target?.removeEventListener(
      "touchend",
      handleTouchEnd as EventListenerOrEventListenerObject
    );
  };

  useEffect(() => {
    html?.classList?.add(modalId);
    if (startClosing) handleClose();

    return () => {
      html?.classList?.remove(modalId);
    };
  });

  const modalYPosition = () =>
    !isNaN(positionY.value || 0) ? `${positionY.value}px` : positionY.value;

  const modalHeight = () => {
    if (wrapperHeight.value === "100dvh" || wrapperHeight.value === "80dvh") {
      return wrapperHeight.value;
    } else {
      return !isNaN(wrapperHeight.value || 0)
        ? `${wrapperHeight.value}px`
        : wrapperHeight.value;
    }
  };

  return (
    <div
      className={`modal${activateCSSAnimations.value ? " --css-animated" : ""}${
        height === "fill" ? " --fill-height" : ""
      }`}
    >
      <div
        className="modal__backdrop"
        onClick={closeOnBackdropClick ? () => handleClose() : () => false}
        style={{
          opacity: backdropOpacity.value,
        }}
      ></div>
      <div
        className="modal__wrapper"
        style={{
          transform: `translate(${0}px, ${modalYPosition()} )`,
          maxHeight: `${modalHeight()}`,
        }}
      >
        {handler && (
          <div
            className="modal__handler --flex --justify-center"
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: true })}
          >
            <span></span>
          </div>
        )}
        {header && (
          <div
            className="modal__header"
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: true })}
          >
            {header}
          </div>
        )}
        {content && (
          <div
            className="modal__content"
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: false })}
            style={{
              overflow: `${overflow.value}`,
            }}
          >
            {content}
          </div>
        )}
        {footer && <div className="modal__footer">{footer}</div>}{" "}
      </div>
    </div>
  );
};

export default Modal;
