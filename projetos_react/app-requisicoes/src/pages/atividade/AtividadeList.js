import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const AtividadeList = (props) => {

  const operacoesBodyTemplate = (rowData) => {
    return (
      <>
        
          <Button type="button" icon="pi pi-pencil" className="p-button-rounded p-button-text " 
                  onClick={() => props.editar(rowData._id)}></Button>
          <Button type="button" icon="pi pi-trash" className="p-button-rounded p-button-text" 
                  onClick={() => { props.excluir(rowData._id); }}></Button>
        
      </>            
    )
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      Atividade
      <Button icon="pi pi-file-o" label="Inserir" className="p-button-sm" onClick={() => props.inserir()} />
    </div>
  );

  const footer = `Total de itens: ${props.atividades ? props.atividades.length : 0}`;

  return (
    <div className="App">

      {/* Montando uma tabela com datatable  */}
      <DataTable value={props.atividades} responsiveLayout="scroll" header={header} footer={footer}
        paginator className="p-datatable-sm" paginatorPosition="top"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords}"
        rows={5} rowsPerPageOptions={[5, 10, 20, 50]}
        emptyMessage="Nenhuma Atividade encontrada."
        selectionMode="single" selection={props.atividade} onSelectionChange={e => props.setAtividade(e.value)} dataKey="_id"
      >
        <Column field="_id" header="Id" sortable></Column>
        <Column field="titulo" header="Titulo" sortable filter></Column>
        <Column field="descricao" header="Descrição" sortable filter></Column>
        <Column field="status" header="Status" sortable filter></Column>

        <Column field="prazo" header="Prazo" sortable filter></Column>
        <Column field="agendaInicio" header="Inicio" sortable filter></Column>
        <Column field="dataHoraTermino" header="Data Termino" sortable filter></Column>
        <Column field="requisicao.titulo" header="Requisição" sortable filter></Column>
        <Column field="colaborador.nome" header="Colaborador" sortable filter></Column>
      </DataTable>

    </div>
  );
};
export default AtividadeList;
