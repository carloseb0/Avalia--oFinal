import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const AtividadeForm = (props) => {
  
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    props.setAtividade({ ...props.atividade, [id]: value });
  };


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    props.salvar(); 
  }

  const Requisicao = (rowData) => {
    return (
      <>{rowData.titulo}</>
    )
  }

  const Colaboradores = (rowData) => {
    return (
      <>{rowData.nome}</>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Atividade</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="titulo">Titulo</label>
              <InputText id="titulo" defaultValue={props.atividade.titulo}
                {...register("titulo", { 
                  required: {value:true, message:"O titulo é obrigatório."}, 
                  minLength: {value:2, message:"O titulo deve ter pelo menos 2 caracteres."}, 
                  maxLength: {value:50, message:"O titulo deve ter no máximo 50 caracteres."} 
                })}
                onChange={handleInputChange} />
              {errors.titulo && <span style={{color:'red'}}>{errors.titulo.message}</span>}  
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descrição</label>
              <InputText id="descricao" defaultValue={props.atividade.descricao}
              {...register("descricao", { 
                required: {value:true, message:"O descricao é obrigatório."}, 
                minLength: {value:10, message:"O descricao deve ter pelo menos 10 caracteres."}, 
                maxLength: {value:150, message:"O descricao deve ter no máximo 150 caracteres."} 
              })}   
                onChange={handleInputChange} />
              {errors.descricao && <span style={{color:'red'}}>{errors.descricao.message}</span>}    
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="status">Status</label>
              <InputText id="status" defaultValue={props.atividade.status}
              {...register("status", { 
                required: {value:true, message:"O status é obrigatório."}
              })}   
                onChange={handleInputChange} />
              {errors.status && <span style={{color:'red'}}>{errors.status.message}</span>}    
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="prazo">Prazo</label>
              <Calendar id="prazo" defaultValue={props.atividade.prazo} onChange={handleInputChange}></Calendar>
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="agendaInicio">Inicio</label>
              <Calendar id="agendaInicio" defaultValue={props.atividade.agendaInicio} onChange={handleInputChange}></Calendar>
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="dataHoraTermino">Data Termino</label>
              <Calendar id="dataHoraTermino" defaultValue={props.atividade.dataHoraTermino} onChange={handleInputChange}></Calendar>
            </div>

            <div className="field col-4 md:col-4">
              <label htmlFor="requisicao">Requisição</label>
              <Dropdown id="requisicao" optionLabel={Requisicao} optionValue="_id" 
                   value={props.atividade.requisicao}
                   options={props.requisicao} 
                   onChange={handleInputChange}
                   placeholder="Selecione um Tipo"/>
            
            </div>

            <div className="field col-4 md:col-4">
              <label htmlFor="colaborador">Colaborador</label>
              <Dropdown id="colaborador" optionLabel={Colaboradores} optionValue="_id" 
                   value={props.atividade.colaborador}
                   options={props.colaboradores} 
                   onChange={handleInputChange}
                   placeholder="Selecione um Solicitante"/>
            
            </div>





          </div>
        </div>
      </div>

      <div>
        <Button label="Salvar" icon="pi pi-save" type="submit"  
                className="p-button-secondary p-button-text" />
        <Button label="Cancelar" icon="pi pi-times-circle" onClick={props.cancelar} 
                className="p-button-secondary p-button-text" />
      </div>

    </form>
  );
};
export default AtividadeForm;
