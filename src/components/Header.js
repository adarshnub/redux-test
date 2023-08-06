import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/userSlice";
import { auth } from "../firebase";

function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());

    auth.signOut();
  };

  const user = useSelector(selectUser);
//   console.log(selectUser);

  return (
    <div className="header flex justify-end mr-8"
    >
      <button
      className="bg-red-400 px-4 py-1 rounded-xl button1"
      onClick={logoutOfApp}>Logout</button>
    </div>
  );
}

export default Header;
