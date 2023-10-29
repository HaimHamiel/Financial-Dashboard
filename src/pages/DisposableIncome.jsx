import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDisposableIncome } from "../features/disposableIncome/disposableIncomeSlice";
import { getUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";

function DisposableIncome() {
  const [formData, setFormData] = useState({
    fixedIncome: {
      netSalaryMainPosition: 0,
      netSalarySecondaryPosition1: 0,
      netSalarySecondaryPosition2: 0,
    },
    fixedExpenses: {
      rent: 0,
      propertyTax: 0,
      water: 0,
      electricalPower: 0,
      houseCommittee: 0,
      communication: 0,
      groceryShopping: 0,
      tuition: 0,
      fuel: 0,
      carInsurance: 0,
      premiumSoftware: 0,
      newspaperSubscription: 0,
      premiumServiceSubscription: 0,
      healthInsurance: 0,
      gymMembership: 0,
      loansLeverage: 0,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.disposableIncome
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUser());
    // eslint-diable-next-line
  }, [dispatch]);

  const onFixedIncomeChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      fixedIncome: {
        ...prevState.fixedIncome,
        [name]: value,
      },
      user: user,
    }));
  };

  const onFixedExpensesChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      fixedExpenses: {
        ...prevState.fixedExpenses,
        [name]: value,
      },
      user: user,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDisposableIncome(formData));
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
    <form className="disposable-income-form" onSubmit={handleSubmit}>
      <h2>Disposable Income Form</h2>
      <div className="section">
        <h3>Fixed Income (Monthly)</h3>
        <label>
          Net Salary Main Position:
          <input
            type="number"
            name="netSalaryMainPosition"
            value={formData.netSalaryMainPosition}
            onChange={onFixedIncomeChange}
          />
        </label>
        <label>
          Net Salary Secondary Position 1:
          <input
            type="number"
            name="netSalarySecondaryPosition1"
            value={formData.netSalarySecondaryPosition1}
            onChange={onFixedIncomeChange}
          />
        </label>
        <label>
          Net Salary Secondary Position 2:
          <input
            type="number"
            name="netSalarySecondaryPosition2"
            value={formData.netSalarySecondaryPosition2}
            onChange={onFixedIncomeChange}
          />
        </label>
      </div>
      <div className="section">
        <h3>Fixed Expenses (Monthly)</h3>
        <label>
          Rent:
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Property Tax:
          <input
            type="number"
            name="propertyTax"
            value={formData.propertyTax}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Water:
          <input
            type="number"
            name="water"
            value={formData.water}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Electrical Power:
          <input
            type="number"
            name="electricalPower"
            value={formData.electricalPower}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          House Committee:
          <input
            type="number"
            name="houseCommittee"
            value={formData.houseCommittee}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Communication (Television, Telephone, Internet):
          <input
            type="number"
            name="communication"
            value={formData.communication}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Grocery Shopping:
          <input
            type="number"
            name="groceryShopping"
            value={formData.groceryShopping}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Tuition:
          <input
            type="number"
            name="tuition"
            value={formData.tuition}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Fuel:
          <input
            type="number"
            name="fuel"
            value={formData.fuel}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Car Insurance:
          <input
            type="number"
            name="carInsurance"
            value={formData.carInsurance}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Premium Software:
          <input
            type="number"
            name="premiumSoftware"
            value={formData.premiumSoftware}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Newspaper Subscription:
          <input
            type="number"
            name="newspaperSubscription"
            value={formData.newspaperSubscription}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Premium Service Subscription:
          <input
            type="number"
            name="premiumServiceSubscription"
            value={formData.premiumServiceSubscription}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Health Insurance:
          <input
            type="number"
            name="healthInsurance"
            value={formData.healthInsurance}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Gym Membership:
          <input
            type="number"
            name="gymMembership"
            value={formData.gymMembership}
            onChange={onFixedExpensesChange}
          />
        </label>
        <label>
          Loans/Leverage:
          <input
            type="number"
            name="loansLeverage"
            value={formData.loansLeverage}
            onChange={onFixedExpensesChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DisposableIncome;
