import React from "react";
import { CATEGORIES } from "../data";
import { getBackgroundColor } from "../utils";

import { useDispatch } from "react-redux";
import { fetchFacts, fetchFilteredFacts } from "../reducers/factsSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();

  return (
    <aside>
      <ul className="btn-categories">
        <li>
          <button
            className="btn btn-all"
            onClick={() => dispatch(fetchFacts())}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name}>
            <button
              className="btn btn-category"
              style={getBackgroundColor(category.name)}
              onClick={() => dispatch(fetchFilteredFacts(category.name))}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryFilter;
