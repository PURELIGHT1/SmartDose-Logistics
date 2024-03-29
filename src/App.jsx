import { Suspense } from "react"
import RouteManager from "./setup"
import Loader from "./components/Loader"
import { PrimeReactProvider } from "primereact/api"
import { MenuProvider } from "./context/menucontext"
import { LayoutProvider } from "./context/layoutcontext"
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import './assets/styles/layout/layout.scss'
import './assets/styles/demo/Demos.scss'
import './index.css'

function App() {
  return (
    <>
        <Suspense fallback={<Loader/>}>
            <PrimeReactProvider >
                <LayoutProvider>
                  <MenuProvider>
                    <RouteManager />
                  </MenuProvider>
                </LayoutProvider>
            </PrimeReactProvider>
        </Suspense>
    </>
  )
}

export default App