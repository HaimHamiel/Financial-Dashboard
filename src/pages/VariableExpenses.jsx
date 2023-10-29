import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVariableExpenses } from "../features/variableExpenses/variableExpensesSlice";
import { getUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";

function VariableExpenses() {
  const [formData, setFormData] = useState({
    variableExpenses: {
      clothes: 0,
      onlineShopping: 0,
      travelAndVacations: 0,
      gifts: 0,
      onlineCourses: 0,
      books: 0,
      eatingOut: 0,
      hangouts: 0,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.variableExpenses
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUser());
    // eslint-diable-next-line
  }, [dispatch]);
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      variableExpenses: {
        ...prevState.variableExpenses,
        [name]: value,
      },
      user: user,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVariableExpenses(formData));
    if (isSuccess) {
      navigate("/dashboard");
    } else if (isError) {
      throw new Error(message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className="variable-expenses-form" onSubmit={handleSubmit}>
      <h2>Variable Expenses Form</h2>
      <div className="section">
        <h3>Variable Expenses</h3>
        <label>
          Clothes:
          <input
            type="number"
            name="clothes"
            value={formData.clothes}
            onChange={onChange}
          />
        </label>
        <label>
          Online Shopping:
          <input
            type="number"
            name="onlineShopping"
            value={formData.onlineShopping}
            onChange={onChange}
          />
        </label>
        <label>
          Travel And Vacations:
          <input
            type="number"
            name="travelAndVacations"
            value={formData.travelAndVacations}
            onChange={onChange}
          />
        </label>
        <label>
          Gifts:
          <input
            type="number"
            name="gifts"
            value={formData.gifts}
            onChange={onChange}
          />
        </label>
        <label>
          Online Courses:
          <input
            type="number"
            name="onlineCourses"
            value={formData.onlineCourses}
            onChange={onChange}
          />
        </label>
        <label>
          Books:
          <input
            type="number"
            name="books"
            value={formData.books}
            onChange={onChange}
          />
        </label>
        <label>
          Eating Out:
          <input
            type="number"
            name="eatingOut"
            value={formData.eatingOut}
            onChange={onChange}
          />
        </label>
        <label>
          Hangouts:
          <input
            type="number"
            name="hangouts"
            value={formData.hangouts}
            onChange={onChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default VariableExpenses;
