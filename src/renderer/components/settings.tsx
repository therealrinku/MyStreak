import { GoCheck } from 'react-icons/go';
import ToggleSwitch from './toggle-switch';
import useSettings from '../hooks/use-settings';

export default function Settings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Show completed todos tab</p>
        <ToggleSwitch
          checked={settings.showCompletedTab}
          onChange={() =>
            updateSetting('showCompletedTab', !settings.showCompletedTab)
          }
        />
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]">
        <p>Double click todo to mark done instead of check button</p>
        <ToggleSwitch />
      </div>
    </div>
  );
}
