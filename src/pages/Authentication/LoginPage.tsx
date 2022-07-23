import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router';


export const LoginPage = () => {

  const navigate = useNavigate();

  const header = (
    <img alt="Card" src="src/assets/login.png" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  );
  const footer = (
    <span className='flex justify-content-center'>
      <Button label="Login" icon="pi pi-sign-in" onClick={() => navigate('/userDashboard')} />
    </span>
  );

  return (
    <div className=' my-5  align-items-center flex justify-content-center card-container'>
      <Card className='m-0 ' title="Login" style={{ width: '25em' }} footer={footer} header={header}>

        <div className='grid '>
          <span className="p-input-icon-left col">
            <i className="pi pi-pencil ml-2" />
            <InputText className='col-12 ' placeholder="Correo electronico" autoComplete='off' />
          </span>
          <span className="p-input-icon-left col-12">
            <i className="pi pi-key ml-2" />
            <InputText type='password' className='col-12' placeholder='Password' />
          </span>
        </div>

      </Card>
    </div>
  )
}
