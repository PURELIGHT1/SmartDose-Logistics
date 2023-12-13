import { Suspense } from "react"
import RouteManager from "./setup"
import Loader from "./components/Loader"

function App() {
  return (
    <>
    <Suspense fallback={<Loader/>}>
      <RouteManager/>
    </Suspense>
    </>
  )
}

export default App