import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";
import { addEquity } from "../features/equity/equitySlice";
import { getUser } from "../features/auth/authSlice";

function EquityValuation() {
  const [formData, setFormData] = useState({
    currentAssets: {
      currentAccountBalanceA: 0,
      currentAccountBalanceB: 0,
      virtualWalletBalance: 0,
      investmentAccountBalance: 0,
      foreignCurrencyBalance: 0,
      virtualCurrencyBalance: 0,
    },
    fixedAssets: {
      apartmentValue: 0,
      carValue: 0,
      depositsValue: 0,
      longTermSavingsValue: 0,
      educationFundValue: 0,
      compensationValue: 0,
      pensionValue: 0,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.equity
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUser());
    // eslint-diable-next-line
  }, [dispatch]);

  const onCurrentAssetsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      currentAssets: {
        ...prevState.currentAssets,
        [name]: value,
      },
      user: user,
    }));
  };

  const onFixedAssetsChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      fixedAssets: {
        ...prevState.fixedAssets,
        [name]: value,
      },
      user: user,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addEquity(formData));
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
    <form className="equity-form" onSubmit={onSubmit}>
      <h2>Equity Valuation Form</h2>
      <div className="section">
        <h3>Current Assets</h3>
        <label>
          Current Account Balance A:
          <input
            type="number"
            name="currentAccountBalanceA"
            value={formData.currentAssets.currentAccountBalanceA}
            onChange={onCurrentAssetsChange}
          />
        </label>
        <label>
          Current Account Balance B:
          <input
            type="number"
            name="currentAccountBalanceB"
            value={formData.currentAssets.currentAccountBalanceB}
            onChange={onCurrentAssetsChange}
          />
        </label>
        <label>
          Virtual Wallet Balance:
          <input
            type="number"
            name="virtualWalletBalance"
            value={formData.currentAssets.virtualWalletBalance}
            onChange={onCurrentAssetsChange}
          />
        </label>
        <label>
          Investment Account Balance:
          <input
            type="number"
            name="investmentAccountBalance"
            value={formData.currentAssets.investmentAccountBalance}
            onChange={onCurrentAssetsChange}
          />
        </label>
        <label>
          Foreign Currency Balance:
          <input
            type="number"
            name="foreignCurrencyBalance"
            value={formData.currentAssets.foreignCurrencyBalance}
            onChange={onCurrentAssetsChange}
          />
        </label>
        <label>
          Balance of Virtual Currencies:
          <input
            type="number"
            name="virtualCurrencyBalance"
            value={formData.currentAssets.virtualCurrencyBalance}
            onChange={onCurrentAssetsChange}
          />
        </label>
      </div>
      <div className="section">
        <h3>Fixed Assets</h3>
        <label>
          Apartment:
          <input
            type="number"
            name="apartmentValue"
            value={formData.fixedAssets.apartmentValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Car:
          <input
            type="number"
            name="carValue"
            value={formData.fixedAssets.carValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Deposits:
          <input
            type="number"
            name="depositsValue"
            value={formData.fixedAssets.depositsValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Long-term Savings:
          <input
            type="number"
            name="longTermSavingsValue"
            value={formData.fixedAssets.longTermSavingsValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Education Fund:
          <input
            type="number"
            name="educationFundValue"
            value={formData.fixedAssets.educationFundValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Compensation:
          <input
            type="number"
            name="compensationValue"
            value={formData.fixedAssets.compensationValue}
            onChange={onFixedAssetsChange}
          />
        </label>
        <label>
          Pension:
          <input
            type="number"
            name="pensionValue"
            value={formData.fixedAssets.pensionValue}
            onChange={onFixedAssetsChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EquityValuation;
