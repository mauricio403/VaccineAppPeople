import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Dropdown } from 'primereact/dropdown';
import { roles, tableItems } from '../helpers/TableDates';
import { useFormik } from 'formik';
import { startCreateUser } from '../redux/auth/authThunks';
import { CreateUser } from '../redux/users/usersThunks';
import { classNames } from 'primereact/utils';
import { useMemo } from 'react';

interface CreateUservalues {
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string
    password: string
    rol: string
}




export const TableUsersComponent = () => {

    const { users, isSaving, msg } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();

    const isSavingUser = useMemo(() => isSaving === true, [isSaving]);
    

    const [product, setProduct] = useState(tableItems);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);



    const openNew = () => {
        setProduct(tableItems);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const editProduct = (product) => {
        setProductDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="Nuevo Usuario" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`estadoVacunas-${rowData.estadoVacunas.toLowerCase()}`}>{rowData.estadoVacunas}</span>;
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Administracion de Usuarios</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" type='button' />
        </>
    );

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            cedula: 0,
            correo: '',
            password: '',
            rol: ''
        },
        validate: (data) => {
            let errors: CreateUservalues = {} as CreateUservalues;

            if (!data.correo) {
                errors.correo = 'Correo requerido.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.correo)) {
                errors.correo = 'Ingrese un email válido. ej : test@test.com  ';
            }

            if (!data.password) {
                errors.password = 'Contraseña es requerida';
            } else if (data.password.length < 6) {
                errors.password = 'Contraseña debe tener al menos 6 caracteres';
            }

            if (!data.nombre) {
                errors.nombre = 'Nombre es requerido';
            }

            if (!data.apellido) {
                errors.apellido = 'Apellido es requerido';
            }

            if (!data.cedula) {
                errors.cedula = 'Cedula es requerida';
            } else if (data.cedula.toString().length !== 10) {
                errors.cedula = 'Cedula debe tener 10 digitos';
            }

            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            dispatch(CreateUser(data.nombre, data.apellido, data.cedula, data.correo, data.rol, data.password) as any)
            toast.current.show({severity:'success', summary: 'Usuario Agregado!', detail:'Usuario agregado exitosamente!', life: 3000});
             setProductDialog(false);
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

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" type='button' loading={isSavingUser} onClick={handleLogin} />
        </>
    );



    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={users}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column field="cedula" header="Cedula" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombre" header="Nombres" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="apellido" header="Apellidos" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="correo" header="Correo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="estadoVacunas" header="Estado de vacuna" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Información de Usuario" modal className="p-fluid " footer={productDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="cedula">Cedula</label>
                    <InputText type='number' className={classNames({ 'p-invalid': isFormFieldValid('cedula') })} id='cedula' name='cedula' value={formik.values.cedula!} onChange={formik.handleChange} placeholder="Numero de Cedula" />
                    {getFormErrorMessage('cedula')}
                </div>

                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText className={classNames({ 'p-invalid': isFormFieldValid('nombre') })} id='nombre' name='nombre' value={formik.values.nombre} onChange={formik.handleChange} placeholder="Nombres" />
                    {getFormErrorMessage('nombre')}
                </div>
                <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <InputText className={classNames({ 'p-invalid': isFormFieldValid('apellido') })} id='apellido' name='apellido' value={formik.values.apellido} onChange={formik.handleChange} placeholder="Apellidos" />
                    {getFormErrorMessage('apellido')}
                </div>

                <div className="field">
                    <label htmlFor="correo">Correo</label>
                    <InputText className={classNames({ 'p-invalid': isFormFieldValid('correo') })} id='correo' name='correo' value={formik.values.correo} onChange={formik.handleChange} placeholder="Correo Electronico" />
                    {getFormErrorMessage('correo')}
                </div>

                <div className="field">
                    <label htmlFor="password">password</label>

                    <InputText className={classNames({ 'p-invalid': isFormFieldValid('password') })} id='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="Contraseña" />
                    {getFormErrorMessage('password')}
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <Dropdown id="rol" name="rol" value={formik.values.rol} onChange={formik.handleChange} options={roles} optionValue='code' optionLabel="name" placeholder="Rol de usuario" />
                </div>




            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                </div>
            </Dialog>


        </div>
    );
}
