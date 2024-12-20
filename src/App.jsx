import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import AppRoute from "./routes/Route";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Suspense fallback={<Loading />}>
              <AppRoute />
            </Suspense>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
