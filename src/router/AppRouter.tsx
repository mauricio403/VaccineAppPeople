import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { LoginPage } from '../pages/Authentication/LoginPage';
import { UserPage } from '../pages/UserPages/UserPage';
import { RootState } from '../redux/store';
import { checkAuthToken } from '../redux/auth/authThunks';
import { LoadigComponent } from "../components/LoadigComponent";
import { AdminPage } from '../pages/AdminPages/AdminPage';

export const AppRouter = () => {


  const { status, user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken() as any)
  }, [dispatch])

  if (status === 'checking') {
    return (
      <LoadigComponent />
    )
  }

  return (
    <div className="App">
      <Routes>

        {
          (status === 'no-authenticated') ?
            (
              <>
                <Route path="/" element={<LoginPage />} />
              </>
            )
            :
            (

              <>
                {
                  (user.rol === 'admin_role') ?
                    (
                      <>
                        <Route path="/" element={<AdminPage />} />
                      </>

                    )
                    :
                    (
                      <>
                        <Route path="/" element={<UserPage />} />
                      </>
                    )
                }
              </>

            )
        }
      </Routes>
    </div>
  );
}