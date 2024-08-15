import {
  useClick,
  useHover,
  useFloating,
  useFocus,
  useInteractions,
  useDismiss,
  flip,
  arrow,
  FloatingArrow,
  offset,
  shift,
  size,
} from '@floating-ui/react';
import { TooltipProps } from '../tooltip/interface';
import { Trigger } from '@/constants/enums';
import './popover.scss';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface PopoverProps extends TooltipProps {
  content: React.ReactNode;
}

interface PopoverRef {
  close: () => void;
}

const Popover = forwardRef<PopoverRef, PopoverProps>((props, ref) => {
  const {
    children,
    trigger = Trigger.Hover,
    placement = 'top',
    title,
    content,
    open = false,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      close() {
        setIsOpen(false);
      },
    };
  });

  const { refs, floatingStyles, context } = useFloating({
    placement,
    middleware: [
      offset(10),
      shift(),
      flip(),
      size(),
      arrow({
        element: arrowRef,
      }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
  });
  const hover = useHover(context, { delay: 100, enabled: trigger === Trigger.Hover });
  const focus = useFocus(context, { enabled: trigger === Trigger.Focus });
  const click = useClick(context, { enabled: trigger === Trigger.Click });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss]);

  useEffect(() => {
    console.log(open);
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <div className="reference" ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div id="popover" ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          <div className="popover-title">{title}</div>
          <div className="popover-content">{content}</div>
          <FloatingArrow ref={arrowRef} context={context} />
        </div>
      )}
    </>
  );
});
export default Popover;
