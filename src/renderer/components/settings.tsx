import { GoCheck } from 'react-icons/go';
import ToggleSwitch from './toggle-switch';
import useSettings from '../hooks/use-settings';
import { useState } from 'react';

export default function Settings() {
  const { getSetting, updateSetting } = useSettings();

  const [showCompletedTab, setShowCompletedTab] = useState(
    getSetting('showCompletedTab'),
  );
  return (
    <div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show completed todos tab</p>
        <ToggleSwitch
          checked={showCompletedTab}
          onChange={() => {
            updateSetting('showCompletedTab', !showCompletedTab);
            setShowCompletedTab((prev) => !prev);
          }}
        />
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Double click todo to mark done instead of check button</p>
        <ToggleSwitch />
      </div>
    </div>
  );
}
