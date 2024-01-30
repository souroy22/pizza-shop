import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import "./style.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { RootState } from "../../store/store";

const Pizza = () => {
  const dispatch = useDispatch();

  const pizza = useSelector((state: RootState) => state.pizzaReducer.pizza);

  const getAllPizza = async () => {
    const querySnapshot = await getDocs(collection(db, "pizza"));
    const data: any = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const allData = doc.data();
        data.push({
          name: allData.name,
          type: allData.type,
          availableSizes: allData.availableSizes,
          base: allData.availableSizes,
          id: doc.id,
        });
      });
    }
    // dispatch(getAllSizes(data));
  };
  return (
    <Box>
      <Box className="pizza-nav-section">
        <Link to="/pizza/create-size">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ededed",
              color: "black",
              fontWeight: 500,
              transition: "all 0.4s ease-in-out",
              "&:hover": {
                backgroundColor: "#cccccc",
              },
            }}
          >
            + Create New Size
          </Button>
        </Link>
        <Link to="/pizza/create-pizza">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ededed",
              color: "black",
              fontWeight: 500,
              transition: "all 0.4s ease-in-out",
              "&:hover": {
                backgroundColor: "#cccccc",
              },
            }}
          >
            + Create New Pizza
          </Button>
        </Link>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Pizza;
