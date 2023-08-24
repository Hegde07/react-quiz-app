import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../Redux/actions";
import { decode } from "html-entities";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Ouestions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  console.log(
    question_category,
    question_difficulty,
    question_type,
    amount_of_question
  );
  let apiUrl = `/api.php?amount=${amount_of_question}`; //using let datatype here

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }
  const { response, Loading } = useAxios({ url: apiUrl });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);
  if (Loading) {
    return;
    <Box mt={20}>
      <CircularProgress />
    </Box>;
  }
  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/finalscore");
    }
  };
  return (
    <Box>
      <Typography varient="h4">Questions {questionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button
            fullWidth="true"
            variant="contained"
            onClick={handleClickAnswer}
          >
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score : {score}/{response.results.length}
      </Box>
    </Box>
  );
};

export default Ouestions;
