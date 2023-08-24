import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../Redux/actions";

const FinalScreen = () => {
  const { score } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/");
  };

  return (
    <Box mt={30}>
      <Typography varient="h3" fontWeight="bold" mb={3}>
        FinalScore:{score}
      </Typography>
      <Button onClick={handleBackToSettings} variant="outlined">
        Back to Settings!
      </Button>
    </Box>
  );
};

export default FinalScreen;
