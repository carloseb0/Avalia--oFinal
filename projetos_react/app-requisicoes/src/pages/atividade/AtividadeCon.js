import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import AtividadeList from "./AtividadeList";
import AtividadeForm from "./AtividadeForm";
import AtividadeSrv from "./AtividadeSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";



function AtividadeCon() {
  const [atividades, setAtividades] = useState([]);
  const initialState = { id: null, titulo: "", descricao: "", status: "", prazo: null, agendaInicio: null, dataHoraTermino: null, requisicao: null, colaborador: null  };
  const [atividade, setAtividade] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  const [Requisicao, setRequisicao] = useState([]);
  const [Colaboradores, setColaboradores] = useState([]);


  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
    onClickAtualizarChefes(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizarChefes = () => {
    RequisicaoSrv.listar().then((response) => {
      setRequisicao(response.data);
    })
    .catch((e) => {
      console.log("Erro: " + e.message);
    });

    ColaboradorSrv.listar().then((response) => {
      setColaboradores(response.data);
    })
    .catch((e) => {
      console.log("Erro: " + e.message);
    });
  };

  const onClickAtualizar = () => {
    AtividadeSrv.listar().then((response) => {
        setAtividades(response.data);
      })
      .catch((e) => {
        console.log("Erro: " + e.message);
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const inserir = () => {
    setAtividade(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (atividade._id == null) { // inclusão
      AtividadeSrv.incluir(atividade)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else { // alteração
      AtividadeSrv.alterar(atividade)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const cancelar = () => {
    setEditando(false);
  };

  const editar = (id) => {
    setAtividade(
      atividades.filter((atividade) => atividade._id == id)[0]
    );
    setEditando(true);
  };

  const excluir = (_id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(_id),
    });
  };

  const excluirConfirm = (_id) => {
    AtividadeSrv.excluir(_id)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };


  if (!editando) {
    return (
      <div>
        <ConfirmDialog />
        <AtividadeList
          atividades={atividades}
          atividade={atividade}
          setAtividade={setAtividade}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <AtividadeForm
          atividade={atividade}
          setAtividade={setAtividade}
          salvar={salvar}
          cancelar={cancelar}
          requisicao={Requisicao}
          colaboradores={Colaboradores}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }

}
export default AtividadeCon;
