import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';

const SolicitanteForm = (props) => {
  
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    props.setSolicitante({ ...props.solicitante, [id]: value });
  };

  const [contraSenha, setContraSenha] = useState();

  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const onSubmit = data => {
    // Validar senha e contra senha. Se diferentes gerar erro na senha. 
    //console.log("S: "+senha+" CS: "+contraSenha);
    if(props.solicitante.senha !== contraSenha){
      setError('senha', { type: 'custom', message: 'Senha e contra senha diferentes.' });
    } else {
      props.salvar(); 
    }
    
  }

  const dados = (rowData) => {
    return (
      <>{rowData.nome} - {rowData.email} </>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Solicitante</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="nome">Nome</label>
              <InputText id="nome" defaultValue={props.solicitante.nome}
                {...register("nome", { 
                  required: {value:true, message:"O nome é obrigatório."}, 
                  minLength: {value:2, message:"O nome deve ter pelo menos 2 caracteres."}, 
                  maxLength: {value:50, message:"O nome deve ter no máximo 50 caracteres."} 
                })}
                onChange={handleInputChange} />
              {errors.nome && <span style={{color:'red'}}>{errors.nome.message}</span>}  
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="email">Email</label>
              <InputText id="email" defaultValue={props.solicitante.email}
              {...register("email", { 
                required: {value:true, message:"O email é obrigatório."}, 
                minLength: {value:10, message:"O email deve ter pelo menos 10 caracteres."}, 
                maxLength: {value:100, message:"O email deve ter no máximo 100 caracteres."} 
              })}   
                onChange={handleInputChange} />
              {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}    
            </div>

            <div className="field col-4 md:col-4">
              <label htmlFor="senha">Senha</label>
              <InputText type={'password'} id="senha" 
                {...register("senha", { 
                  required: {value:true, message:"A senha é obrigatória."}, 
                  minLength: {value:4, message:"A senha deve ter pelo menos 4 caracteres."}, 
                  maxLength: {value:10, message:"A senha deve ter no máximo 10 caracteres."} 
                })}     
                onChange={handleInputChange} 
                defaultValue={props.solicitante.senha} 
                />
               {errors.senha && <span style={{color:'red'}}>{errors.senha.message}</span>}   
            </div>

            <div className="field col-4 md:col-4">
              <label htmlFor="contraSenha">Contra Senha</label>
              <Password id="contraSenha" defaultValue={contraSenha}
                onChange={e => setContraSenha(e.target.value)} toggleMask />
            </div>



            <div className="field col-4 md:col-4">
              <label htmlFor="chefe">Chefe</label>
              <Dropdown id="chefe" optionLabel={dados} optionValue="_id" 
                   value={props.solicitante.chefe}
                   options={props.chefes} 
                   onChange={handleInputChange}
                   placeholder="Selecione um Chefe"/>
            
            </div>


            <div className="field col-4 md:col-4">
              <label htmlFor="chefe2">Chefe</label>
              <Dropdown id="chefe" optionLabel="nome" optionValue="_id" 
                   value={props.solicitante.chefe}
                   options={props.chefes} 
                   onChange={handleInputChange}
                   placeholder="Selecione um Chefe"/>
            
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
export default SolicitanteForm;
