import React, { useState } from "react";
import { getBackgroundColor } from "../utils";

import { useDispatch } from "react-redux";
import { updateFact } from "../reducers/factsSlice";

const Fact = (props) => {
  const {
    id,
    text,
    source,
    category,
    votes_interesting,
    votes_mindblowing,
    votes_false,
  } = props;

  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();

  const dispatchVote = async (id, updatedData) => {
    setUpdating(true);
    await dispatch(updateFact({ id, updatedData }));
    setUpdating(false);
  };

  return (
    <li className="fact">
      <p>
        {text}
        <a className="source" href={source} target="_blank" rel="noreferrer">
          (Source)
        </a>
      </p>
      <span className="tag" style={getBackgroundColor(category)}>
        {category}
      </span>
      <div className="vote-buttons">
        <button
          disabled={updating}
          onClick={() =>
            dispatchVote(id, { votes_interesting: votes_interesting + 1 })
          }
        >
          👍 {votes_interesting}
        </button>
        <button
          disabled={updating}
          onClick={() =>
            dispatchVote(id, { votes_mindblowing: votes_mindblowing + 1 })
          }
        >
          🤯 {votes_mindblowing}
        </button>
        <button
          disabled={updating}
          onClick={() => dispatchVote(id, { votes_false: votes_false + 1 })}
        >
          ⛔️ {votes_false}
        </button>
      </div>
    </li>
  );
};

export default Fact;
