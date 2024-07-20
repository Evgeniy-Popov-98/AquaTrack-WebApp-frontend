import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyGoogleOAuth } from "../redux/auth/operations.js";

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

      if (code) {
          dispatch(verifyGoogleOAuth({ code }))
      }
  }, [dispatch]);

  
};

export default GoogleAuthCallback;
