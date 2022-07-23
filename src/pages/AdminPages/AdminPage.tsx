import { Button } from 'primereact/button'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/auth/authThunks';
import { RootState } from '../../redux/store';
import { Toolbar } from 'primereact/toolbar';
import { Chip } from 'primereact/chip';
import { LoadUsers } from '../../redux/users/usersThunks';


export const AdminPage = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(LoadUsers() as any)
  }, [])


  const leftContents = (
    <>
      <h2>Bienvendid@ {user.nombre}</h2>
    </>
  );

  const rightContents = (
    <>
      <Chip label="Administrador" icon="pi pi-reddit" className="mr-2 mb-2" />
      <Button icon="pi pi-sign-out" className="p-button-danger" tooltip='logout' onClick={() => dispatch(startLogout() as any)} />
    </>
  );

  return (
    <>
      <Toolbar left={leftContents} right={rightContents} />
    </>
  )
}
