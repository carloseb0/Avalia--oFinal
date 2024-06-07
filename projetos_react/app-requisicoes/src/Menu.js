import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

function Menu() {
  let navigate = useNavigate();

  const items = [
    {
      label: 'Home', icon: 'pi pi-home',
      command: () => { navigate("/") }
    },
    {
      label: 'Colaboradores', icon: 'pi pi-id-card',
      command: () => { navigate("/colaborador") }
    },
    {
      label: 'Solicitantes', icon: 'pi pi-id-card',
      command: () => { navigate("/solicitante") }
    },
    {
      label: 'Tipo de Requisição', icon: 'pi pi-id-card',
      command: () => { navigate("/tiporequisicao") }
    },
    {
      label: 'Requisição', icon: 'pi pi-id-card',
      command: () => { navigate("/requisicao") }
    },
    {
      label: 'Atividade', icon: 'pi pi-id-card',
      command: () => { navigate("/atividade") }
    },
    {
      label: 'Andamento', icon: 'pi pi-id-card',
      command: () => { navigate("/andamentos") }
    },
    {
      label: 'Sair', icon: 'pi pi-sign-out',
      command: () => {
        sessionStorage.setItem('token', '');
      },
      url: '/'
    },

  ];

  return (<Menubar model={items} />)
}

export default Menu;