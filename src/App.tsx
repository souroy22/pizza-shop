import { BrowserRouter } from "react-router-dom";
import RouterSection from "./RouterSection";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { signup } from "./store/auth/authReducer";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const App = () => {
  const dispatch = useDispatch();

  const checkUser = async () => {
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        let isAdmin = false;
        if (userDoc.exists) {
          const userData = userDoc.data();
          isAdmin = userData?.isAdmin || false;
        }
        console.log("Is Admin", isAdmin);
        dispatch(
          signup({
            name: user.displayName || "",
            email: user.email || "",
            isAdmin: isAdmin,
          })
        );

        console.log("User Data", user);
      } else {
        console.log("user is logged out");
      }
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <RouterSection />
    </BrowserRouter>
  );
};

export default App;
