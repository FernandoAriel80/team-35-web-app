import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const router = createRouter({ routeTree });

function App() {

  const { handleValidateToken } = useAuth()

  useEffect(() => {
    handleValidateToken()
      .then()
  }, [])

  return <RouterProvider router={router} />;
}

//----------------------------------------
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export default App;
