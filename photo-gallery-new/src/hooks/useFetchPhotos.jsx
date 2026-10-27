import React, { useEffect, useState } from "react";

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //fetch data from third party api
  useEffect(() => {
    const controller = new AbortController();
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://picsum.photos/v2/list?limit=40`);
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        if (error.name != AbortController) {
          setError(error.message || "something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchPhotos();
    return () => controller.abort();
  }, []);
  return { photos, loading, error };
};

export default useFetchPhotos;
