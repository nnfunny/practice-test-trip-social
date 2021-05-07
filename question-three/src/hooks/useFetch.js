import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((error) => console.log(error));
  }, [url]);

  return data;
};

export default useFetch;
