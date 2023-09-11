import React, { Children } from "react";

const Notification = ({ children }) => {
  return (
    <div
      className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
      role="alert"
    >
      <p className="font-bold text-lg">Notification:</p>
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default Notification;
