import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router';
import { classNames } from 'primereact/utils';
import { HeaderCardLogin } from '../../components/HeaderCardLogin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMemo, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { startLogin } from '../../redux/auth/authThunks';

interface loginValues {
  email: string;
  password: string;
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, msg } = useSelector((state: RootState) => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  useEffect(() => {
    if (msg !== '') {
      Swal.fire('Error en la autenticación', msg, 'error');
    }
  }, [msg])


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (data) => {
      let errors: loginValues = {} as loginValues;

      if (!data.email) {
        errors.email = 'Correo requerido.';
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Ingrese un email válido. ej : test@test.com  ';
      }

      if (!data.password) {
        errors.password = 'Contraseña es requerida';
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      dispatch(startLogin(data.email, data.password) as any)
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const handleLogin = () => {
    formik.handleSubmit();
  }




  const footer = (
    <span className='flex justify-content-center'>
      <Button label="Login" icon="pi pi-sign-in" onClick={handleLogin} type='button' />
    </span>
  );

  return (
    <div className=' my-5  align-items-center flex justify-content-center card-container'>
      <Card className='m-0 ' title="Login" style={{ width: '25em' }} footer={footer} header={HeaderCardLogin}>
        <div className='grid p-fluid'>
          <span className="p-input-icon-left col">
            <i className="pi pi-pencil ml-2" />
            <InputText className={classNames({ 'p-invalid': isFormFieldValid('email') })} id='email' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder="Correo electronico" autoComplete='off' />
            {getFormErrorMessage('email')}
          </span>


          <span className="p-input-icon-left col-12">
            <i className="pi pi-key ml-2" />
            <InputText type='password' className={classNames({ 'p-invalid': isFormFieldValid('password') })} placeholder='Password' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
            {getFormErrorMessage('password')}
          </span>
        </div>
      </Card>
    </div>
  )
}
