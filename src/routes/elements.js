import { Suspense, lazy } from "react";
import Spinner from "../components/Layout/Spinner";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export const Home = Loadable(lazy(() => import("../pages/Home")));
export const Login = Loadable(lazy(() => import("../pages/Login")));
export const Register = Loadable(lazy(() => import("../pages/Register")));
export const EquityValuation = Loadable(lazy(() => import("../pages/EquityValuation")));
export const DisposableIncome = Loadable(lazy(() => import("../pages/DisposableIncome")));
export const VariableExpenses =  Loadable(lazy(() => import("../pages/VariableExpenses")));
export const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
export const PrivateRoute = Loadable(
  lazy(() => import("../components/PrivateRoute"))
);
