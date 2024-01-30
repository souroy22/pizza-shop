import { BrowserRouter } from "react-router-dom";
import RouterSection from "./RouterSection";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { signup } from "./store/auth/authReducer";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.compat.css";

type MessageType = "success" | "danger" | "info" | "default" | "warning";

type NotificationFnType = (
  type: MessageType,
  title: string,
  message: string,
  duration?: number
) => void;

export const notification: NotificationFnType = (
  type,
  title,
  message,
  duration = 5000
) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true,
    },
  });
};

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
    <>
      <ReactNotifications />
      <BrowserRouter>
        <RouterSection />
      </BrowserRouter>
    </>
  );
};

export default App;
