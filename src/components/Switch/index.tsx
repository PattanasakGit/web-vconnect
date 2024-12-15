'use client';

import { useState } from 'react';
import { Switch } from '../ui/switch';

interface SwitchWithContentProps {
  contentFront?: React.ReactNode;
  contentBack?: React.ReactNode;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchComponent: React.FC<SwitchWithContentProps> = ({
  contentFront,
  contentBack,
  defaultChecked = false,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {contentFront && <div className="flex items-center">{contentFront}</div>}
      <Switch
        checked={enabled}
        onCheckedChange={handleToggle}
        aria-label="Toggle switch"
      />
      {contentBack && <div className="flex items-center">{contentBack}</div>}
    </div>
  );
};

export default SwitchComponent;