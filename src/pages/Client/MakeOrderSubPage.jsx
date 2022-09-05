import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./style.css";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function MakeOrderSubPage() {
  const userNew = useSelector((state) => state.setUserData.userData);

  console.log("Mul eka", userNew);

  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const location = useLocation();
  const trainerId = location.state.id;
  const trainerName = location.state.name;
  const trainerMobile = location.state.mobile;
  const trainerEmail = location.state.email;
  const selectedProgramme = location.state.programme;
  const [data, setData] = useState("");

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  // const [programme, setProgramme] = useState("");
  const [description, setDescription] = useState();
  const [imageUpload, setImageUpload] = useState(null);

  const usersCollectionRef = collection(db, "orders");

  const createOrder = async () => {
    const IName = imageUpload.name + v4();
    await addDoc(usersCollectionRef, {
      weight: Number(weight),
      height: Number(height),
      goal: goal,
      description: description,
      programme: selectedProgramme,
      image: `${IName}`,
      trainerName: trainerName,
      trainerMobile: trainerMobile,
      trainerEmail: trainerEmail,
      trainerId: trainerId,
      date: currentDate,
      clientId: data.user,
      status: "pending",
      orderId: Math.floor(1000 + Math.random() * 9000),
    });

    if (imageUpload == null) {
      alert("No data");
      return;
    }
    const imageRef = ref(storage, `images/${IName}`);
    await uploadBytes(imageRef, imageUpload);
    window.location.reload(false);
  };

  useEffect(() => {
    if (userNew) {
      const userID = JSON.parse(userNew);
      setData(userID);
      // console.log("User IDDDDDD", userID.user);
      // async function fetchData() {
      //   const userDoc = doc(db, "users", userID);
      //   const docSnap = await getDoc(userDoc);

      // const trainerDoc = doc(db, "users", trainerId);
      // const trainerDocSnap = await getDoc(trainerDoc);
      // setTrainerData(trainerDocSnap.data());
      // }
      // fetchData();
    }
  }, [userNew]);

  console.log("User IDDDDDD", data);

  return (
    <Box
      p={0}
      sx={{
        height: "calc(100vh - 64px)",
        padding: 2,
        marginTop: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 6rem)",
          background: "rgba(255, 255, 255, 0.73)",
          borderRadius: "41px",
          position: "relative",
        }}
      >
        <Box sx={{ padding: 4 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={data.name}
                  sx={{ width: "100%" }}
                  // onChange={(e) => {
                  //   setWeight(e.target.value);
                  // }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="age"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  InputLabelProps={{ shrink: true }}
                  value={data.age}
                  // onChange={(e) => {
                  //   setHeight(e.target.value);
                  // }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="weight(kg)"
                  variant="outlined"
                  type="number"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="height(cm)"
                  variant="outlined"
                  type="number"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="goal"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="programme"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={selectedProgramme}
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setGoal(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "21px" }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              sx={{ width: "100%" }}
              multiline
              rows={4}
              size="lg"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
          <Box
            className="ImageUploadContainer"
            sx={{
              marginTop: "15px",
              width: "30%",
              position: "relative",
              height: "20vh",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ position: "absolute" }}>
              <Grid container spacing={0.3}>
                <Grid item>
                  <ErrorOutlineIcon
                    sx={{ fontSize: "14px", marginTop: "6px" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h7" sx={{ fontSize: "11px" }}>
                    Upload some of your recent images
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                component="label"
                sx={{ border: "1px solid #ccc!important", color: "#2A3036" }}
              >
                <input
                  accept="image/*"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                  multiple
                  type="file"
                />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: 4, position: "absolute", bottom: 0 }}>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" sx={{ background: "#2A3036" }}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ background: "#3C56F5" }}
                onClick={createOrder}
              >
                Make Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default MakeOrderSubPage;