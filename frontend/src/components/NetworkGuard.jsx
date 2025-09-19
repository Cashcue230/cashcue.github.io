import React, { useEffect, useState } from "react";
import OfflineScreen from "./OfflineScreen";

const NetworkGuard = ({ children }) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Function to update online status
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
      console.log('NetworkGuard: Updated online status:', navigator.onLine);
    };

    // Event handlers
    const handleOnline = () => {
      console.log('NetworkGuard: Online event fired');
      updateOnlineStatus();
    };
    const handleOffline = () => {
      console.log('NetworkGuard: Offline event fired');
      updateOnlineStatus();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('NetworkGuard: Visibility change, checking online:', navigator.onLine);
        updateOnlineStatus();
      }
    };

    // Initial check on mount
    updateOnlineStatus();

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  console.log('NetworkGuard: Rendering, online:', online);

  if (!online) {
    console.log('NetworkGuard: Rendering OfflineScreen');
    return <OfflineScreen />;
  }

  console.log('NetworkGuard: Rendering children');
  return <>{children}</>;
};

export default NetworkGuard;
