import "../index.css";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Search from "./Search";

// Search and Nav component present on every page by default

function Layout(props) {
  return (
    <div className="container">
        <Search submit={props.submit}/>
        <Nav />
        <Outlet />
    </div>
  );
}

export default Layout 
