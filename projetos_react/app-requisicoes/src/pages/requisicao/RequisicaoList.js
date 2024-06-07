import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const RequisicaoList = (props) => {

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
      Requisições
      <Button icon="pi pi-file-o" label="Inserir" className="p-button-sm" onClick={() => props.inserir()} />
    </div>
  );

  const footer = `Total de itens: ${props.requisicoes ? props.requisicoes.length : 0}`;

  return (
    <div className="App">

      {/* Montando uma tabela com datatable  */}
      <DataTable value={props.requisicoes} responsiveLayout="scroll" header={header} footer={footer}
        paginator className="p-datatable-sm" paginatorPosition="top"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords}"
        rows={5} rowsPerPageOptions={[5, 10, 20, 50]}
        emptyMessage="Nenhuma Requisição encontrado."
        selectionMode="single" selection={props.requisicao} onSelectionChange={e => props.setRequisicao(e.value)} dataKey="_id"
      >
        <Column field="_id" header="Id" sortable></Column>
        <Column field="titulo" header="Titulo" sortable filter></Column>
        <Column field="descricao" header="Descrição" sortable filter></Column>
        <Column field="dataHoraCriada" header="Data/Hora" sortable filter></Column>
        <Column field="status" header="Status" sortable filter></Column>
        <Column field="prazoAtendimento" header="Prazo" sortable filter></Column>
        <Column field="tipoRequisicao.descricao" header="Tipo Requisição" sortable filter></Column>
        <Column field="solicitante.nome" header="Solicitante" sortable filter></Column>
        
        <Column header="Operações" body={operacoesBodyTemplate}></Column>
      </DataTable>

    </div>
  );
};
export default RequisicaoList;
