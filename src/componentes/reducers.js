const fornecedoresReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADICIONAR_FORNECEDOR':
        return [...state, action.payload];
      case 'EDITAR_FORNECEDOR':
        return state.map(fornecedor =>
          fornecedor.id === action.payload.id ? action.payload.novoFornecedor : fornecedor
        );
      case 'EXCLUIR_FORNECEDOR':
        return state.filter(fornecedor => fornecedor.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default fornecedoresReducer;
  