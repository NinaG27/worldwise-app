import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Country from "./components/Country";
import { CountryProvider } from "./context/CountryContext";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const HomePage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div>
      <CitiesProvider>
        <CountryProvider>
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                  <Route index element={<HomePage />}></Route>
                  <Route
                    path="app"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList />} />
                    <Route path="countries/:country" element={<Country />} />
                    <Route path="form" element={<Form />}></Route>
                  </Route>
                  <Route path="product" element={<Product />}></Route>
                  <Route path="pricing" element={<Pricing />}></Route>
                  <Route path="login" element={<Login />}></Route>

                  <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </CountryProvider>
      </CitiesProvider>
    </div>
  );
}

export default App;
