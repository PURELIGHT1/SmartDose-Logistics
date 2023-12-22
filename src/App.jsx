import { Suspense } from "react"
import RouteManager from "./setup"
import Loader from "./components/Loader"
import { PrimeReactProvider } from "primereact/api"
import { LayoutProvider } from "./context/layoutcontext"
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/styles/layout/layout.scss';
import './assets/styles/demo/Demos.scss';

function App() {
  return (
    <>
        <Suspense fallback={<Loader/>}>
            <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
                <LayoutProvider>
                    <RouteManager />
                </LayoutProvider>
            </PrimeReactProvider>
        </Suspense>
    </>
  )
}

export default App