
export const adicionarFornecedor = (fornecedor) => ({
    type: 'ADICIONAR_FORNECEDOR',
    payload: fornecedor,
  });
  
  export const editarFornecedor = (id, novoFornecedor) => ({
    type: 'EDITAR_FORNECEDOR',
    payload: { id, novoFornecedor },
  });
  
  export const excluirFornecedor = (id) => ({
    type: 'EXCLUIR_FORNECEDOR',
    payload: id,
  });
  