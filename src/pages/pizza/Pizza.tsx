import { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { RootState } from "../../store/store";
import { getPizza } from "../../store/size/pizzaReducer";
import "./style.css";

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
    dispatch(getPizza(data));
  };

  useEffect(() => {
    getAllPizza();
  }, []);

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          gap: "30px",
          paddingTop: "40px",
        }}
      >
        {pizza.map((item) => (
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "0 0 10px gray",
              borderRadius: "10px",
            }}
          >
            <Box>
              <span className="item-label">Name:</span>
              {item.name}
            </Box>
            <Box>
              <span className="item-label">Base:</span>
              {item.base.map((b) => (
                <Chip label={b} />
              ))}
            </Box>
            <Box>
              <span className="item-label">Type:</span> {item.type}
            </Box>
            <Box>
              <span className="item-label">Available Sizes:</span>
              {item.base.map((b) => (
                <Chip label={b} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Pizza;
