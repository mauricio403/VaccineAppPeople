import { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/auth/authThunks';
import { RootState } from '../../redux/store';
import { Chip } from 'primereact/chip';
import { Toolbar } from 'primereact/toolbar';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { PatchUser, getUserById } from '../../redux/users/usersThunks';
import { Toast } from 'primereact/toast';

const cities = [
  { name: 'Vacunado', code: 'true' },
  { name: 'No Vacunado', code: 'false' },

];
const tipoVacuna = [
  { name: 'Sputnik', code: 'true' },
  { name: 'AstraZeneca', code: 'false' },
  { name: 'Pfizer', code: 'false' },
  { name: 'Jhonson&Jhonson', code: 'false' }

];

interface UserProps {
  fechaNacimiento: any;
  direccion: string;
  telefono: string;
  tipoVacuna: string;
  estadoVacuna: string;
  fechaVacunacion: string;
  numeroDosis: number;
}


export const UserPage = () => {

  const { user } = useSelector((state: RootState) => state.auth);
  const { active } = useSelector((state: RootState) => state.users);
  const toast = useRef(null);



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(user.uid) as any);
  }, [])



  const leftContents = (
    <>
      <h2>Bienvendid@ {user.nombre}</h2>
    </>
  );

  const rightContents = (
    <>
      <Chip label='Empleado' icon="pi pi-user" className="mr-2 mb-2" />
      <Button icon="pi pi-sign-out" className="p-button-danger" tooltip='Salir' onClick={() => dispatch(startLogout() as any)} />
    </>
  );

  const formik = useFormik({
    initialValues: {
      fechaNacimiento: null,
      direccion: '',
      telefono: 0,
      tipoVacuna: '',
      estadoVacuna: '',
      fechaVacunacion: null,
      numeroDosis: 0
    },
    validate: (data) => {
      let errors: UserProps = {} as UserProps;

      if (!data.direccion) {
        errors.direccion = 'Dirección requerida';
      }
      if (!data.fechaNacimiento) {
        errors.fechaNacimiento = 'Fecha  requerida';
      }
      if (!data.telefono) {
        errors.telefono = 'Telefono requerido';
      } //verificar que no tenga un cero inicial
      else if (data.telefono.toString().charAt(0) === '0') {
        errors.telefono = 'No inicia con cero';
      }

      if (!data.estadoVacuna) {
        errors.estadoVacuna = 'Campo requerido';
      }
      return errors;
    },
    onSubmit: (data) => {
      handleSubmit()
      toast.current.show({ severity: 'success', summary: 'Información Actualizada!',  life: 5000 });
    }
  });

  const handleSubmit = () => {
    dispatch(PatchUser(formik.values.fechaNacimiento, formik.values.estadoVacuna, formik.values.tipoVacuna, formik.values.numeroDosis, formik.values.telefono, formik.values.direccion, formik.values.fechaVacunacion, user.uid,) as any);
  }

  const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const handleLogin = () => {
    formik.handleSubmit();
  }





  return (
    <>


      <Toolbar left={leftContents} right={rightContents} className='mb-5' />

      <Toast ref={toast} />

      <div className='card flex justify-content-center card-container mb-5'>

        <Card title="Tu información" style={{ width: '25em' }}>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Cédula: {active.cedula}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Nombres: {active.nombre}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Apellidos: {active.apellido}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Fecha Nacimiento: {active.fechaNacimiento}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Correo: {active.correo}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Dirección: {active.direccion}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Telefono: {active.telefono}</p>
          <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Estado de Vacunación: {active.estadoVacunas}</p>
          {
            active.estadoVacunas === 'Vacunado' ?
              <>
                <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Tipo de Vacuna: {active.tipoDeVacuna}</p>
                <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Fecha de Vacunación: {
                  active.fechaDeVacunacion ?
                    active.fechaDeVacunacion.split('T')[0]
                    : 'No Vacunado'
                }</p>
                <p className="m-0 col-12" style={{ lineHeight: '1.5' }}>Número de dosis: {active.numeroDosis}</p>
              </>

              :
              null
          }
        </Card>
      </div>

      <div className="card">
        <div className='flex justify-content-center card-container'>
          <Card className='col-8'>
            <div className="grid p-fluid">
              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar"></i>
                  </span>
                  <Calendar placeholder='Fecha de nacimiento' className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimiento') })} id='fechaNacimiento' name='fechaNacimiento' value={formik.values.fechaNacimiento} onChange={formik.handleChange} />
                  {getFormErrorMessage('fechaNacimiento')}
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map"></i>
                  </span>
                  <InputText placeholder="Direccion del domicilio" className={classNames({ 'p-invalid': isFormFieldValid('direccion') })} id='direccion' name='direccion' value={formik.values.direccion} onChange={formik.handleChange} />
                  {getFormErrorMessage('direccion')}
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-mobile"></i>
                  </span>
                  <InputText type='number' placeholder="Telefono Movil" className={classNames({ 'p-invalid': isFormFieldValid('telefono') })} id='telefono' name='telefono' value={formik.values.telefono} onChange={formik.handleChange} />
                  {getFormErrorMessage('telefono')}
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-heart-fill"></i>
                  </span>
                  <Dropdown id='estadoVacuna' name='estadoVacuna' value={formik.values.estadoVacuna} options={cities} onChange={formik.handleChange} optionLabel="name" optionValue="name" placeholder="Estado de vacunacion" />
                  {getFormErrorMessage('estadoVacuna')}
                </div>
              </div>

              <>
                <div className="col-12 md:col-6">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-align-center"></i>
                    </span>
                    <Dropdown disabled={formik.values.estadoVacuna === 'No Vacunado'} id='tipoVacuna' name='tipoVacuna' value={formik.values.tipoVacuna} options={tipoVacuna} onChange={formik.handleChange} optionLabel="name" optionValue="name" placeholder="Tipo de vacuna" />
                    {getFormErrorMessage('tipoVacuna')}
                  </div>
                </div>

                <div className="col-12 md:col-6">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-calendar"></i>
                    </span>
                    <Calendar disabled={formik.values.estadoVacuna === 'No Vacunado'} placeholder='Fecha de vacunacion' className={classNames({ 'p-invalid': isFormFieldValid('fechaVacunacion') })} id='fechaVacunacion' name='fechaVacunacion' value={formik.values.fechaVacunacion} onChange={formik.handleChange} />
                  </div>
                </div>

                <div className="col-12 md:col-6">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-sort-numeric-down-alt"></i>
                    </span>
                    <InputText disabled={formik.values.estadoVacuna === 'No Vacunado'} type='number' placeholder="Numero de dosis" className={classNames({ 'p-invalid': isFormFieldValid('numeroDosis') })} id='numeroDosis' name='numeroDosis' value={formik.values.numeroDosis} onChange={formik.handleChange} />
                  </div>
                </div>
              </>


              <div className="col-12 md:col">
                <Button label="Guardar" type='button' onClick={handleLogin} className="p-button-success flex justify-content-center" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
