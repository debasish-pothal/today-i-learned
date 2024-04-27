import React, { useState } from "react";
import { CATEGORIES } from "../data";

import { useDispatch } from "react-redux";
import { toggle } from "../reducers/factFormSlice";
import { addNewFact } from "../reducers/factsSlice";

const defaultFormValue = {
  text: "",
  source: "",
  category: "",
};

const FactForm = () => {
  const dispatch = useDispatch();

  const [formVal, setFormVal] = useState(defaultFormValue);
  const [valid, setValid] = useState(false);

  const isValidHttpUrl = (url) => {
    const httpUrlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return httpUrlRegex.test(url);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const postData = structuredClone(formVal);

    if (valid) {
      setFormVal(defaultFormValue);
      setValid(false);

      // dispatch to save new fact
      dispatch(addNewFact(postData));

      // hide form
      dispatch(toggle());
    }
  };

  const handleFormInputChange = (e) => {
    const newData = { [e.target.name]: e.target.value };
    const updatedFormData = {
      ...formVal,
      ...newData,
    };

    setFormVal(updatedFormData);

    const postData = structuredClone(updatedFormData);

    if (
      postData.text.trim().length > 0 &&
      postData.text.trim().length <= 200 &&
      postData.source.trim().length > 0 &&
      isValidHttpUrl(postData.source) &&
      postData.category
    ) {
      setValid(true);
    }
  };

  return (
    <form className="fact-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        name="text"
        value={formVal.text}
        onChange={handleFormInputChange}
      />
      <span>{200 - formVal.text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        name="source"
        value={formVal.source}
        onChange={handleFormInputChange}
      />
      <select
        name="category"
        value={formVal.category}
        onChange={handleFormInputChange}
      >
        <option value="">Choose Category:</option>
        {CATEGORIES.map((category) => (
          <option key={category.name} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        className="btn btn-large"
        disabled={!valid}
        onClick={handleFormSubmit}
      >
        Post
      </button>
    </form>
  );
};

export default FactForm;
