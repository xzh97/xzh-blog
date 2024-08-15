import { createPopper, Instance } from '@popperjs/core';
import { TooltipProps } from './interface';
import { useEffect, useRef } from 'react';
import './tooltip.scss';

let popperIns: Instance;
const Tooltip = (props: TooltipProps) => {
  const { children, placement = 'auto', title, onOpenChange, zIndex = 99 } = props;
  const referenceElement = useRef<HTMLDivElement>(null);
  const popperElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (referenceElement.current && popperElement.current) {
      popperIns = createPopper(referenceElement.current, popperElement.current, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
          {
            name: 'flip',
            enabled: true,
          },
        ],
      });
    }
  }, []);

  function show() {
    popperElement.current?.setAttribute('data-show', 'true');
    popperIns?.update();
    onOpenChange?.(true);
  }

  function hide() {
    popperElement.current?.removeAttribute('data-show');
    onOpenChange?.(false);
  }

  return (
    <>
      <div className="reference" ref={referenceElement} onMouseEnter={show} onMouseLeave={hide}>
        {children}
      </div>
      <div id="tooltip" className="popper-wrapper" ref={popperElement} style={{ zIndex }}>
        {title}
        <div id="arrow" data-popper-arrow />
      </div>
    </>
  );
};
export default Tooltip;
