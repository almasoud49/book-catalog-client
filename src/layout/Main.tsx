import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";



const Main = ()=> {
    return (
        <div>
          <Navbar />
          <div className="pt-16  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      );

};

export default Main;