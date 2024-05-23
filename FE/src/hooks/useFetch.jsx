import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setState(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setState(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const putData = async (id, body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        ...options,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setState(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        ...options,
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setState(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { state, loading, error, setState, fetchData, postData, putData, deleteData };
};

export default useFetch;
