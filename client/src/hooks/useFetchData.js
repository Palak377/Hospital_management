// import { useEffect, useState } from "react";
// import { token } from "../config.js";

// const useFetchData = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const result = await res.json();
//         //console.log("Result", result);
//         if (!res.ok) {
//           throw new Error(result.message);
//         }
//         setData(result.data);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         setError(err.message);
//       }
//     };
//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// };

// export default useFetchData;

import { useEffect, useState } from "react";
import { token } from "../config.js";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
     

        const contentType = res.headers.get("content-type");
        let result;
        if (contentType && contentType.includes("application/json")) {
          result = await res.json();
        } else {
         
          console.log(contentType);
          throw new Error("Server returned unexpected response");
        }

        // Redirect to login if user not found
        if (result.message === "User not found") {
          window.location.href = "/login"; // send user to login page
          return; // stop execution
        }

        if (!res.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
