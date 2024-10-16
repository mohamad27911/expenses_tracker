import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase.ts";
import { useAuthState } from 'react-firebase-hooks/auth';

// CoinSpinner component
const CoinSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-text-light inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  };
  

// AuthRoute component
interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <CoinSpinner />; 
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;