import Header from "./components/Header";
import FactForm from "./components/FactForm";
import CategoryFilter from "./components/CategoryFilter";
import FactList from "./components/FactList";

import { useSelector, useDispatch } from "react-redux";
import { showForm } from "./reducers/factFormSlice";
import { fetchFacts } from "./reducers/factsSlice";

import { useEffect } from "react";

const App = () => {
  const isFormVisible = useSelector(showForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFacts());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      {isFormVisible && <FactForm />}

      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </div>
  );
};

export default App;
