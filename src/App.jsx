import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import Cities from "./component/Cities";
import CityDetails from "./component/CityDetails";
import CountryList from "./component/CountryList";
import Form from "./component/form";
import { AuthenticateProvider } from "./contexts/AuthenticateContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./component/SpinnerFullPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AppLayout = lazy(() => import("./component/AppLayout"));
const PageNotFound = lazy(() => import("./component/PageNotFound"));

function App() {
  return (
    <AuthenticateProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" />} />
                <Route path="cities" element={<Cities />} />
                <Route path="cities/:id" element={<CityDetails />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthenticateProvider>
  );
}

export default App;
