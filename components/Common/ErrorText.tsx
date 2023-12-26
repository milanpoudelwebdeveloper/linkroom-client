import React from "react";

const ErrorText = ({ message }: { message?: string }) => {
  return <div className="mt-2 text-xs text-red-500">{message}</div>;
};

export default ErrorText;
