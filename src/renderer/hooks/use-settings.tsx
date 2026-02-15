import { useContext } from 'react';
import { RootContext } from '../context/root-context';

// maybe use sqlite db for this later on :) 🤔
export default function useSettings() {
  const { settings, setSettings } = useContext(RootContext);

  function updateSetting(key, value) {
    const updatedSettings = { ...settings };
    updatedSettings[key] = value;
    setSettings(updatedSettings);
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
  }

  return {
    updateSetting,
    settings,
  };
}
