import React, { useState, useContext, createContext } from 'react';

const DadosFornecedorContext = createContext();

export const Dados = ({ children }) => {
    const [fornecedores, setFornecedores] = useState([]);

    const adicionarFornecedor = fornecedor => {
        setFornecedores([...fornecedores, { ...fornecedor, id: Date.now().toString() }]);
    };

    return (
        <DadosFornecedorContext.Provider value={{ fornecedores, setFornecedores, adicionarFornecedor }}>
            {children}
        </DadosFornecedorContext.Provider>
    );
};

export const useFornecedores = () => {
    const context = useContext(DadosFornecedorContext);
    if (!context) {
        throw new Error('useFornecedores deve ser usado com Dados');
    }
    return context;
};


