import { CardInfoPage } from "../pages/CardInfoPage/CardInfoPage.tsx";
import { createBrowserRouter } from "react-router-dom";
import { CreateCharacterPage } from "../pages/CreateCharacterPage/CreateCharacterPage.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/test-task",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cardInfoPage/:id",
        element: <CardInfoPage />,
      },
      {
        path: "createCharacter",
        element: <CreateCharacterPage />,
      },
    ],
  },
]);
