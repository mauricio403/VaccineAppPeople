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
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { CreateUser, DeleteUser, UpdateUser } from '../redux/users/usersThunks';
import { classNames } from 'primereact/utils';
import { useMemo, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { Calendar } from 'primereact/calendar';

interface CreateUservalues {
    nombre: string;
    apellido: string;
    cedula: string | number;
    correo: string
    password: string
    rol: string
}

export const TableUsersComponent = () => {

    const { users, isSaving, msg } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (msg !== '') {
            Swal.fire('Error en la creacion', msg, 'error');
        }
    }, [msg])

    const isSavingUser = useMemo(() => isSaving === true, [isSaving]);

    const [user, setUser] = useState(tableItems);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);



    const openNew = (user) => {
        setUser(user);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const confirmDeleteUser = (user) => { //abre modal
        setUser(user);
        setDeleteProductDialog(true);
    }
    const handleDeleteUser = (user) => { //elimina
        setDeleteProductDialog(false);
        dispatch(DeleteUser(user.uid) as any);

    }

    const editProduct = (user) => {
        setUser(user);
        console.log(user.uid);
        setProductDialog(true);
    }
    const handleUpdateUser = (user) => {
        setUser(user);
        setProductDialog(false);
        console.log(user.uid);
        dispatch(UpdateUser(formik.values.nombre, formik.values.apellido, formik.values.cedula, formik.values.correo, formik.values.rol, user.uid) as any);
    }

    const handleCreate = (user) => {
        setUser(user);
        if (!user.uid) {
            formik.handleSubmit();
        } else {
            handleUpdateUser(user);
        }
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`estadoVacunas-${rowData.estadoVacunas.toLowerCase()}`}>{rowData.estadoVacunas}</span>;
    }

    const vaccineBodyTemplate = (rowData) => {
        return <span className={`estadoVacunas-${rowData.estadoVacunas.toLowerCase()}`}>{rowData.tipoDeVacuna}</span>;
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
            <Button label="Cancelar" icon="pi pi-times" className="p-button" onClick={hideDeleteProductDialog} />
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" type='button' onClick={() => handleDeleteUser(user)} />
        </>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Añadir" icon="pi pi-save" className="p-button-text" type='button' loading={isSavingUser} onClick={() =>handleCreate(user)} />
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
            dispatch(CreateUser(data.nombre, data.apellido, data.cedula, data.correo, data.rol, data.password) as any);
            toast.current.show({ severity: 'success', summary: 'Usuario Agregado!', detail: 'Usuario agregado exitosamente!', life: 5000 });
            setProductDialog(false);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: string) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');

    const [filters2, setFilters2] = useState(null);

    const statuses = [
        'No vacunado', 'vacunado',
    ];

    const vaccineTypes = [
        'Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson', 'Ninguna'
    ]

    const initFilters1 = () => {
        setFilters1({

            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

        });
        setGlobalFilterValue1('');
    }

    const initFilters2 = () => {
        setFilters2({
            'tipoDeVacuna': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue2('');
    }


    const statusBodyTemplate2 = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const vaccineTypeFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={vaccineTypes} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={vaccineTypeItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }
    const vaccineTypeItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }




    const dateBodyTemplate = (rowData) => {
        const D = new Date(rowData.fechaDeVacunacion);
        const result = D.getDate() + "/" + (D.getMonth() + 1) + "/" + D.getFullYear();
        return result
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }


    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={users}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    filters={filters1} filterDisplay="menu"
                    globalFilterFields={['status', 'tipoDeVacuna']}
                    emptyMessage="Usuarios no encontrados :("
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column field="cedula" header="Cedula" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="nombre" header="Nombres" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="apellido" header="Apellidos" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="correo" header="Correo" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="estadoVacunas" header="Estado de vacuna" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }} showFilterMatchModes={false} filter filterElement={statusFilterTemplate}></Column>
                    <Column field="tipoDeVacuna" header="Tipo Vacuna" sortable style={{ minWidth: '10rem' }} body={vaccineBodyTemplate} showFilterMatchModes={false} filter filterElement={vaccineTypeFilterTemplate}></Column>
                    <Column field="fechaDeVacunacion" header="Fecha Vacunación" sortable style={{ minWidth: '10rem' }} filterField="date" dataType="date" body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header={`Informacion de ${user.nombre ? user.nombre : 'usuario'}`} modal className="p-fluid " footer={productDialogFooter} onHide={hideDialog}>

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

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmación" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && <span>Estas seguro que quieres eliminar a este usuario? <b>{user.nombre}</b>?</span>}
                </div>
            </Dialog>


        </div>
    );
}
