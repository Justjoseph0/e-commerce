import NotFoundPage from "@/pages/NotFoundPage"
import { Route } from "react-router-dom"


const NotFoundRoute = () => {
  return (
    <Route path="*" element={<NotFoundPage />} />
  )
}

export default NotFoundRoute