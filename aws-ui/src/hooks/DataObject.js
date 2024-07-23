import { useState } from "react";


export const useData = () => {
  const [data, setData] = useState({});


  function has(field) {
    return data[field] != undefined && data[field]
  }

  function add(field, value) {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function get(field) {

    if (has(field)) {
      return data[field];
    }

    return null;
  }


  function clear() {
    setData({})
  }

  return { has, add, get, clear, data, setData }
};