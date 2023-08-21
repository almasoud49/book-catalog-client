import { useEffect } from "react";
import Main from "./layout/Main";
import { useAppDispatch } from "./redux/hooks";
import { login } from "./redux/features/users/userSlice";

function App(): JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(() => {
    const tokenString = localStorage.getItem("book-catalog-current-user");
    const authInfo = tokenString ? JSON.parse(tokenString) : null;
    if(authInfo){
      dispatch(login(authInfo));
    }
  }, [dispatch])
  return (
    <>
      <Main />
    </>
  );
}

export default App;
