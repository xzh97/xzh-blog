import { useEffect, useState, CSSProperties } from 'react';
import classNames from 'classnames';
import { SwitchProps } from './interface';
import './switch.scss';

const Switch = (props: SwitchProps) => {
  const {
    activeBg = '#1890ff',
    inactiveBg = 'rgba(0,0,0,0.25)',
    value,
    customClassNames,
    customStyle,
    onChange,
  } = props;
  const [checkedValue, setCheckedValue] = useState(false);
  const [checkedStyle, setCheckedStyle] = useState<CSSProperties>({
    backgroundColor: activeBg,
  });

  useEffect(() => {
    setCheckedValue(value);
  }, [value]);

  useEffect(() => {
    setCheckedStyle({ ...customStyle, backgroundColor: checkedValue ? activeBg : inactiveBg });
  }, [checkedValue, activeBg, inactiveBg, customStyle]);

  const toggleValue = () => {
    setCheckedValue(!checkedValue);
    onChange(!checkedValue);
  };
  return (
    <div className="switch-wrapper">
      <button
        className={classNames(customClassNames, 'switch-box', { 'switch-checked': value })}
        style={checkedStyle}
      >
        <div className="switch-dot" onClick={toggleValue}></div>
      </button>
    </div>
  );
};

export default Switch;
