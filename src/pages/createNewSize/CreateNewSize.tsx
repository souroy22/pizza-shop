import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { Button, Chip } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  SizeType,
  addNewSize,
  deleteSize,
  getAllSizes,
  updateSize,
} from "../../store/size/sizeReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Popup from "../../components/popup/Popup";
import TextInput from "../../components/input/TextInput";

const CreateNewSize = () => {
  const [value, setValue] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<SizeType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deletedItem, setDeletedItem] = useState("");

  const dispatch = useDispatch();

  const sizes = useSelector((state: RootState) => state.sizeReducer.sizes);

  const createNewSize = async () => {
    try {
      const newSize: any = { label: value };
      const newDoc = await addDoc(collection(db, "sizes"), newSize);
      newSize["id"] = newDoc.id;
      setValue("");
      dispatch(addNewSize(newSize));
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  const shouldAddOrUpdate = () => {
    if (!value.trim().length) {
      return false;
    }
    const arr = sizes.filter((size) => size.label === value);
    if (arr.length) {
      return false;
    }
    return true;
  };

  const handleUpdateSize = async () => {
    try {
      const ref = doc(db, "sizes", updateMode?.id || "");
      await updateDoc(ref, { label: value });
      dispatch(
        updateSize(
          { label: value, id: updateMode?.id || "" } || { label: "", id: "" }
        )
      );
      setValue("");
      setUpdateMode(null);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  const handleClick = () => {
    if (shouldAddOrUpdate()) {
      if (updateMode !== null) {
        handleUpdateSize();
      } else {
        createNewSize();
      }
    }
  };

  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, "sizes"));
    const data: any = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) =>
        data.push({ label: doc.data().label, id: doc.id })
      );
    }
    dispatch(getAllSizes(data));
  };

  const handleDelete = async () => {
    const ref = doc(db, "sizes", deletedItem);
    await deleteDoc(ref);
    dispatch(deleteSize(deletedItem));
    setDeletedItem("");
    setOpen(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Box>
      {open && (
        <Popup open={open} handleClose={() => setOpen(false)}>
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              width: "300px",
              padding: "30px",
              gap: "30px",
            }}
          >
            <Box
              sx={{ fontSize: "20px", fontWeight: 400, letterSpacing: "0.5px" }}
            >
              Are you sure to delete?
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </Popup>
      )}
      <TextInput
        required
        name="size"
        label="Enter New Size"
        id="size"
        handleChange={(_, value) => setValue(value)}
        value={value}
      />
      <Button variant="contained" onClick={handleClick}>
        {updateMode !== null ? "Update" : "Create"}
      </Button>
      <Box sx={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {sizes.map((size: any) => (
          <Box key={size.id}>
            <Chip
              sx={{
                color: "whitesmoke",
                backgroundColor: "orange",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 500,
                    gap: "5px",
                  }}
                >
                  <Box>{size.label}</Box>
                  <ModeIcon
                    onClick={() => {
                      setValue(size.label);
                      setUpdateMode(size);
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                  <DeleteForeverIcon
                    onClick={() => {
                      setOpen(true);
                      setDeletedItem(size.id);
                    }}
                    sx={{ cursor: "pointer", color: "red" }}
                  />
                </Box>
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CreateNewSize;
