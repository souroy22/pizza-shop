import { BrowserRouter } from "react-router-dom";
import RouterSection from "./RouterSection";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { getUser, signup } from "./store/auth/authReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector(
  //   (state: RootState) => state.authReducer.isLoggedIn
  // );

  useEffect(() => {
    dispatch(getUser());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // dispatch(
        //   signup({
        //     name: user.displayName || "",
        //     email: user.email || "",
        //     isAdmin: false,
        //   })
        // );
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <RouterSection />
    </BrowserRouter>
  );
};

export default App;
