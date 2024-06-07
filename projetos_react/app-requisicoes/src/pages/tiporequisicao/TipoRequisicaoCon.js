import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import TipoRequisicaoList from "./TipoRequisicaoList";
import TipoRequisicaoForm from "./TipoRequisicaoForm";
import TipoRequisicaoSrv from "./TipoRequisicaoSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";



function TipoRequsicaoCon() {
  const [tiporequisicoes, setTipoRequisicoes] = useState([]);
  const initialState = { id: null, descricao: ""};
  const [tiporequisicao, setTipoRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();



  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualiza
  }, []);

  const onClickAtualizar = () => {
    TipoRequisicaoSrv.listar().then((response) => {
        setTipoRequisicoes(response.data);
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
    setTipoRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (tiporequisicao._id == null) { // inclusão
      TipoRequisicaoSrv.incluir(tiporequisicao)
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
      TipoRequisicaoSrv.alterar(tiporequisicao)
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
    setTipoRequisicao(
      tiporequisicoes.filter((tiporequisicao) => tiporequisicao._id == id)[0]
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
    TipoRequisicaoSrv.excluir(_id)
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
        <TipoRequisicaoList
          tiporequisicoes={tiporequisicoes}
          tiporequisicao={tiporequisicao}
          setTipoRequisicao={setTipoRequisicao}
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
        <TipoRequisicaoForm
          tiporequisicao={tiporequisicao}
          setTipoRequisicao={setTipoRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }

}
export default TipoRequsicaoCon;
