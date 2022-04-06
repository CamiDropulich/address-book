import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../containers/Home";
import Contacts from "../containers/Contacts";
import ContactDetails from "../containers/ContactDetails";
import Favourites from "../containers/Favourites";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/contacts" element={<Contacts></Contacts>}></Route>
          <Route
            exact
            path="/contacts/:data"
            element={<ContactDetails></ContactDetails>}
          ></Route>
          <Route
            exact
            path="/contacts/favourites"
            element={<Favourites></Favourites>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
