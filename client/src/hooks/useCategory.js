import React, { useEffect, useState } from "react";

const host = "http://localhost:8080";
const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    const res = await fetch(`${host}/api/v1/category/get-category`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setCategories(data?.categories);
    } else {
      console.log("Some Error in getting Categories");
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return categories;
};

export default useCategory;
