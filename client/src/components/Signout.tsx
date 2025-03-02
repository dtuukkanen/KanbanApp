import { useEffect } from "react";

const Signout = () => {
  // Remove the token from local storage
  useEffect(() => {
    try {
      localStorage.removeItem("token");
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          You have been signed out.
        </h2>
      </div>
    </div>
  );
};

export default Signout;
