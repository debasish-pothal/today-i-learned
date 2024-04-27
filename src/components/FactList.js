import { useSelector } from "react-redux";
import { selectFacts } from "../reducers/factsSlice";
import Fact from "./Fact";

const FactList = () => {
  const facts = useSelector(selectFacts);

  return (
    <section>
      {facts.length > 0 ? (
        <ul>
          {facts.map((fact) => (
            <Fact key={fact.id} {...fact} />
          ))}
        </ul>
      ) : (
        <h2 className="empty-list">Looks Empty!</h2>
      )}
    </section>
  );
};

export default FactList;
