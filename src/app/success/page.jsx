import { Suspense } from "react";
import SuccessLoginGoogle from "@/components/SuccessLoginGoogle/SuccessLoginGoogle";

const LoginSuccess = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SuccessLoginGoogle />
    </Suspense>
  );
};

export default LoginSuccess;
