import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import RequisicaoList from "./RequisicaoList";
import RequisicaoForm from "./RequisicaoForm";
import RequisicaoSrv from "./RequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";
import TipoRequisicaoSrv from "../tiporequisicao/TipoRequisicaoSrv";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";



function RequisicaoCon() {
  const [requisicoes, setRequisicoes] = useState([]);
  const initialState = { id: null, titulo: "", descricao: "", dataHoraCriada: null, status: "", prazoAtendimento: null, tipoRequisicao: null, solicitante: null };
  const [requisicao, setRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  const [TiposRequisicao, setTiposRequisicao] = useState([]);
  const [Solicitantes, setSolicitantes] = useState([]);


  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
    onClickAtualizarChefes(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizarChefes = () => {
    SolicitanteSrv.listar().then((response) => {
      setSolicitantes(response.data);
    })
    .catch((e) => {
      console.log("Erro: " + e.message);
    });

    TipoRequisicaoSrv.listar().then((response) => {
      setTiposRequisicao(response.data);
    })
    .catch((e) => {
      console.log("Erro: " + e.message);
    });

  };

  const onClickAtualizar = () => {
    RequisicaoSrv.listar().then((response) => {
        setRequisicoes(response.data);
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
    setRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (requisicao._id == null) { // inclusão
      RequisicaoSrv.incluir(requisicao)
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
      RequisicaoSrv.alterar(requisicao)
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
    setRequisicao(
      requisicoes.filter((requisicao) => requisicao._id == id)[0]
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
    RequisicaoSrv.excluir(_id)
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
        <RequisicaoList
          requisicoes={requisicoes}
          requisicao={requisicao}
          setRequisicao={setRequisicao}
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
        <RequisicaoForm
          requisicao={requisicao}
          setRequisicao={setRequisicao}
          salvar={salvar}
          cancelar={cancelar}
          tiposrequisicao={TiposRequisicao}
          solicitantes={Solicitantes}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }

}
export default RequisicaoCon;
