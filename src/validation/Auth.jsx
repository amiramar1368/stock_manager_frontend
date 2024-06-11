import { Navigate } from "react-router-dom";

const Auth = (Component) => {
  return (props) => {
    try {
      let user = localStorage.user;
      user = JSON.parse(user);
      const accessToken = user.accessToken;
      const refreshToken = user.refreshToken;
      if (!accessToken || !refreshToken) {
        return <Navigate to="/login" />;
    } else {
        return <Component {...props} />;
    }
} catch (err) {
        return <Navigate to="/login" />;
    }
  };
};

export default Auth;
