import { ReactNode, useEffect, useState } from 'react';
import './modal.scss';

interface ModalProps {
  handler?: boolean;
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  height?: 'auto' | 'fill';
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
  const [startingPoint, setStartingPoint] = useState<number | null>(null);
  const [positionY, setPositionY] = useState<number | null | undefined>(null);
  const [wrapperHeight, setWrapperHeight] = useState<
    number | null | undefined | '100dvh' | '80dvh'
  >(null);
  const [upperFreeSpace, setUpperFreeSpace] = useState<
    number | null | undefined
  >(null);
  const [backdropOpacity, setBackdropOpacity] = useState(0.7);
  const [activateCSSAnimations, setActivateCSSAnimations] = useState(false);
  const [overflow, setOverflow] = useState<'hidden' | 'auto'>('auto');
  const [initialWrapElementHeight, setInitialWrapElementHeight] =
    useState<number>(0);
  const [initialTimeStamp, setInitialTimeStamp] = useState<number>(0);

  const animationDuration = 0.25 * 1000;

  const html = document?.querySelector('html');
  const modalId = `--open-modal`;

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartingPoint(e?.touches[0]?.clientY || null);

    setInitialTimeStamp(e?.timeStamp);

    const wrapElement = document?.querySelector('.modal__wrapper');
    setInitialWrapElementHeight(
      wrapElement?.getBoundingClientRect()?.height || 0
    );
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>,
    opts?: { force?: boolean }
  ) => {
    const touch = e?.touches[0];
    handlePosition(touch?.clientY, opts);
    e?.target?.addEventListener(
      'touchend',
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
    setActivateCSSAnimations(true);
    setTimeout(() => setActivateCSSAnimations(false), animationDuration);
  };

  const handleClose = () => {
    enableCSSAnimations();
    setPositionY(window?.innerHeight);
    setBackdropOpacity(0);
    onClose ? setTimeout(onClose, animationDuration) : null;
  };

  const handlePosition = (
    touchPositionY: number,
    opts?: { force?: boolean }
  ) => {
    const contentElem = document?.querySelector('.modal__content');
    const wrapElement = document?.querySelector('.modal__wrapper');

    const wrapElementHeight = wrapElement?.getBoundingClientRect()?.height || 0;
    setUpperFreeSpace(window?.innerHeight - wrapElementHeight);
    const shouldForce = opts?.force || false;
    const movement = touchPositionY - (startingPoint || 0);

    // move below
    if (movement > 0) {
      //if there is a scroll, it takes as starting point the end of the scroll position
      if (contentElem?.scrollTop !== 0 && !shouldForce) {
        setPositionY(startingPoint);
        return;
      }

      const newMaxHeight =
        wrapElementHeight + ((startingPoint || 0) - touchPositionY);
      setPositionY(touchPositionY);
      setWrapperHeight(Math.round(newMaxHeight));

      let opacity = +(
        (0.7 / initialWrapElementHeight) *
        wrapElementHeight
      ).toFixed(2);

      opacity = opacity < 0 ? 0 : opacity;
      opacity = opacity > 0.7 ? 0.7 : opacity;

      setBackdropOpacity(opacity);
    }

    // upper extend
    if (movement < 0 && (wrapElement?.getBoundingClientRect()?.y || 0) > 0) {
      // this will lock the scroll upward until when the modal is at fullscreen
      if (wrapElementHeight < window?.innerHeight) {
        setOverflow('hidden');
      }

      const newMaxHeight =
        wrapElementHeight + ((startingPoint || 0) - touchPositionY);

      setStartingPoint(touchPositionY);
      setWrapperHeight(Math.round(newMaxHeight));
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const topNoReturnPoint = getTopNoReturnPoint();
    const lowNoReturnPoint = getLowNoReturnPoint();

    const wrapElement = document?.querySelector('.modal__wrapper');
    const wrapElementHeight = wrapElement?.getBoundingClientRect()?.height || 0;

    const currentModalPosition = upperFreeSpace || 0;

    // If it has reached the top no-returning point the height go to 100%
    if (currentModalPosition < topNoReturnPoint) {
      enableCSSAnimations();
      setWrapperHeight('100dvh');
      setBackdropOpacity(0.7);
      setOverflow('auto');
    }

    // If it has not reached the low or top no-returning point when the touch ends
    // the modal goes back again to the initial position
    if (
      currentModalPosition < lowNoReturnPoint &&
      currentModalPosition > topNoReturnPoint
    ) {
      enableCSSAnimations();
      setWrapperHeight('80dvh');
      setBackdropOpacity(0.7);
      setOverflow('auto');
    }

    // If the modal reaches the not returning point it is moved to the bottom of the screen and closed when the animation is finished
    if (currentModalPosition > lowNoReturnPoint) {
      handleClose();
    }

    //close the modal if there is a fast swipe down
    if (
      e.timeStamp - initialTimeStamp < 150 &&
      initialWrapElementHeight - wrapElementHeight > 60
    ) {
      handleClose();
    }

    e?.target?.removeEventListener(
      'touchend',
      handleTouchEnd as EventListenerOrEventListenerObject
    );
  };

  useEffect(() => {
    html?.classList?.add(modalId);
    if (startClosing) handleClose();

    return () => {
      html?.classList?.remove(modalId);
    };
  }, [startClosing, handleClose]);

  const modalYPosition = () =>
    !isNaN(positionY || 0) ? `${positionY}px` : positionY;

  const modalHeight = () => {
    if (wrapperHeight === '100dvh' || wrapperHeight === '80dvh') {
      return wrapperHeight;
    } else {
      return !isNaN(wrapperHeight || 0) ? `${wrapperHeight}px` : wrapperHeight;
    }
  };

  return (
    <div
      className={`modal${activateCSSAnimations ? ' --css-animated' : ''}${
        height === 'fill' ? ' --fill-height' : ''
      }`}
    >
      <div
        className='modal__backdrop'
        onClick={closeOnBackdropClick ? () => handleClose() : () => false}
        style={{
          opacity: backdropOpacity,
        }}
      ></div>
      <div
        className='modal__wrapper'
        style={{
          transform: `translate(${0}px, ${modalYPosition()} )`,
          maxHeight: `${modalHeight()}`,
        }}
      >
        {handler && (
          <div
            className='modal__handler --flex --justify-center'
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: true })}
          >
            <span></span>
          </div>
        )}
        {header && (
          <div
            className='modal__header'
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: true })}
          >
            {header}
          </div>
        )}
        {content && (
          <div
            className='modal__content'
            onTouchStart={touchStart}
            onTouchMove={(e) => handleTouchMove(e, { force: false })}
            style={{
              overflow: `${overflow}`,
            }}
          >
            {content}
          </div>
        )}
        {footer && <div className='modal__footer'>{footer}</div>}{' '}
      </div>
    </div>
  );
};

export default Modal;
