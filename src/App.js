import Settings from "./Pages/Settings";
import Questions from "./Pages/Ouestions";
import FinalScreen from "./Pages/FinalScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route exact path="/" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/finalscore" element={<FinalScreen />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
