"use client";

import {useEffect} from "react";

const ErrorState = ({error}: {error: any}) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1>Error</h1>
      <h3>Something Went Wrong!</h3>
    </div>
  );
};

export default ErrorState;
