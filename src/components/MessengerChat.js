'use client';

import { useEffect } from 'react';

export default function MessengerChat() {
  useEffect(() => {
    // Only load once
    if (document.getElementById('fb-messenger-script')) return;

    const script = document.createElement('script');
    script.id = 'fb-messenger-script';
    script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div id="fb-root" />
  );
}

// Add the customer chat plugin as a separate component
export function MessengerChatPlugin() {
  return (
    <div
      className="fb-customerchat"
      data-page_id="100094755281207"
      data-attribution="biz_inbox"
      data-theme="light"
      data-greeting="Hello! How can we help you today?"
    />
  );
}