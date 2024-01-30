import { Box, Button, CircularProgress } from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { SizeType, getAllSizes } from "../../store/size/sizeReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";
import MultiSelectDropdown from "../../components/multi-select-dropdown/MultiSelectDropdown";
import { notification } from "../../App";

export type DataType = {
  name: string;
  type: string;
  availableSizes: string[];
  base: string[];
};

const initialData = {
  name: "",
  type: "",
  availableSizes: [],
  base: [],
};

const CreateNewPizza = () => {
  const [data, setData] = useState<DataType>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const [typeOptions] = useState<SizeType[]>([
    { label: "Veg", id: "1" },
    { label: "Non Veg", id: "2" },
  ]);
  const [baseOptions] = useState<SizeType[]>([
    { label: "Thin", id: "3" },
    { label: "Thick", id: "4" },
  ]);

  const dispatch = useDispatch();

  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);

  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, "sizes"));
    const newData: any = [];
    const newSizes: string[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const label: string = doc.data().label;
        newSizes.push(label);
        newData.push({ label, id: doc.id });
      });
    }
    setData({ ...data, availableSizes: newSizes });
    dispatch(getAllSizes(newData));
  };

  const handleChange = (name: string, options: string | string[]) => {
    setData({ ...data, [name]: options });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "pizza"), data);
      const newSizes: string[] = sizes.map((size) => size.label);
      notification("success", "New Created", "Successfully created");
      setData({ ...initialData, availableSizes: newSizes });
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      notification("danger", "Failed", errorMessage);
      console.log(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 10px gray",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            fontSize: "30px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            color: "#de9612",
          }}
        >
          Add New Pizza
        </Box>
        <FormControl sx={{ display: "flex", gap: "20px" }}>
          <TextField
            value={data.name}
            required
            placeholder="Pizza Name"
            name="name"
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
            autoComplete="off"
          />
          <MultiSelectDropdown
            name="availableSizes"
            options={sizes}
            placeholder="Select Size"
            selectedOptions={data.availableSizes}
            handleChange={handleChange}
          />
          <MultiSelectDropdown
            name="type"
            options={typeOptions}
            placeholder="Select Type"
            selectedOptions={data.type.trim() ? [data.type] : []}
            handleChange={handleChange}
            multiSelect={false}
          />
          <MultiSelectDropdown
            name="base"
            options={baseOptions}
            placeholder="Select Base"
            selectedOptions={data.base}
            handleChange={handleChange}
          />
          <Button variant="contained" onClick={handleClick}>
            {loading ? (
              <CircularProgress
                sx={{
                  height: "28px !important",
                  width: "28px !important",
                  color: "white",
                }}
              />
            ) : (
              "Add New"
            )}
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CreateNewPizza;
