import { Close } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AppBarTrainer from "../../../components/Trainer/AppBarTrainer";
import picture from "../../../images/personalTraining.webp";
import { db } from "../../../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const Createpackage = () => {
  const imagePreview = picture;
  const TrainerId = "5qO5w7dwRvzo3YeCoppe";

  const [Package, setPackage] = useState();
  const [Duration, setDuration] = useState();
  const [Price, setPrice] = useState();
  const [Description, setDescription] = useState();

  const packageCollectionRef = collection(db, "packages");

  const createPackage = async () => {
    await addDoc(packageCollectionRef, {
      trainerId: TrainerId,
      name: Package,
      duration: Duration,
      price: Price,
      description: Description,
    });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBarTrainer trainerName="Hi, Randy!" />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80%",
        }}
      >
        <Box
          sx={{
            margin: "5rem 5rem 1rem",
            backgroundColor: "#F4F3F8",
            borderRadius: "1.5rem",
            boxShadow: 12,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "2rem 4rem",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    height: "300px",
                    width: "300px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: "4rem",
                    marginBottom: "1rem",
                    background: imagePreview
                      ? `url("${imagePreview}")no-repeat right/cover`
                      : "#D9D9D9",
                  }}
                ></Box>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  <span style={{ color: "#3C56F5" }}>Create</span> Package,
                </Typography>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-basic"
                  label="Package"
                  variant="outlined"
                  onChange={(e) => setPackage(e.target.value)}
                />
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Duration"
                    variant="outlined"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <TextField
                    sx={{ width: "100%", marginTop: "3rem" }}
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </Box>
                <TextField
                  sx={{ width: "100%", marginTop: "3rem" }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={5}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  sx={{
                    height: "40px",
                    width: "100%",
                    backgroundColor: "#3C56F5",
                    marginTop: "3rem",
                  }}
                  variant="contained"
                  onClick={createPackage}
                >
                  create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Createpackage;
