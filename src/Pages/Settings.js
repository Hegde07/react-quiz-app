import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { response, error, Loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();
  console.log(response);
  if (Loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong!
      </Typography>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };
  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];
  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h2" fontWeight="bold">
        Quiz App
      </Typography>
      <SelectField options={response.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldComp />
      <Box mt={3} width="100%">
        <Button fullWidth="true" variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Settings;
