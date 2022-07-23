import { useState } from 'react';
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



export const UserPage = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedCity1, setSelectedCity1] = useState<any>(null);

  const dispatch = useDispatch();


  const [date1, setDate1] = useState<Date | Date[] | undefined>(undefined);

  const [tipoVacuna1, setTipovacuna1] = useState<any>(null);

  const [vacunado, setVacunado] = useState(false);

  const onCityChange = (e: { value: any }) => {
    setSelectedCity1(e.value);
    if (e.value.code === 'true') {
      setVacunado(true);
    }
    else {
      setVacunado(false);
    }

  }

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

  return (
    <>


      <Toolbar left={leftContents} right={rightContents}  className='mb-5'/>

      <div className="card">

       
        <div className='flex justify-content-center card-container'>
          <Card className='col-8'>
            <div className="grid p-fluid">
              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar"></i>
                  </span>
                  <Calendar id="basic" placeholder='Fecha de nacimiento' value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map"></i>
                  </span>
                  <InputText placeholder="Direccion del domicilio" />
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-mobile"></i>
                  </span>
                  <InputNumber placeholder="Telefono Movil" />
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-heart-fill"></i>
                  </span>
                  <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Estado de vacunacion" />
                </div>
              </div>
              {
                vacunado ?
                  <>
                    <div className="col-12 md:col-6">
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-align-center"></i>
                        </span>
                        <Dropdown value={tipoVacuna1} options={tipoVacuna} onChange={setTipovacuna1} optionLabel="name" placeholder="Tipo de vacuna" />
                      </div>
                    </div>

                    <div className="col-12 md:col-6">
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-calendar"></i>
                        </span>
                        <Calendar id="basic" placeholder='Fecha de nacimiento' value={date1} onChange={(e) => setDate1(e.value)} />
                      </div>
                    </div>

                    <div className="col-12 md:col-6">
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-sort-numeric-down-alt"></i>
                        </span>
                        <InputNumber placeholder="Numero de dosis" />
                      </div>
                    </div>
                  </>
                  :
                  null
              }

              <div className="col-12 md:col">
                <Button label="Guardar" className="p-button-success flex justify-content-center" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
