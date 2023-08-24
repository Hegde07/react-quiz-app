import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.baseURL = "https://opentdb.com";
const useAxios = ({ url }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((response) => setResponse(response.data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);
  return {
    response,
    error,
    Loading,
  };
};

export default useAxios;
