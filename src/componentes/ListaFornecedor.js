import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useFornecedores } from '../dados/DadosFornecedor';
import { useNavigation } from '@react-navigation/native';

const ListaFornecedores = () => {
    const { fornecedores, setFornecedores } = useFornecedores();
    const [filtro, setFiltro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigation = useNavigation();

    const handleEditarFornecedor = (id) => {
        if (id) {
            //navigation.navigate('Editar Fornecedor', { idEditando: '123' });
        } else {
            console.log('ID is undefined');
        }
        
};


    const handleExcluirFornecedor = (id) => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza que deseja excluir este fornecedor?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => setFornecedores(fornecedores.filter(f => f.id !== id)), style: 'destructive' },
            ],
            { cancelable: true }
        );
    };

    const dadosFiltrados = fornecedores.filter(fornecedor =>
        fornecedor.nome.toLowerCase().includes(filtro.toLowerCase())
    ).sort((a, b) => a.nome.localeCompare(b.nome));

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={filtro}
                onChangeText={setFiltro}
                placeholder="Buscar fornecedor"
            />
            <FlatList
                data={dadosFiltrados}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.imagem}
                            source={{ uri: item.imagem }}
                            onError={(e) => console.log('Erro ao carregar imagem', e.nativeEvent.error)}
                        />
                        <Text style={styles.texto}>{item.nome}</Text>
                        <Text>{item.endereco}</Text>
                        <Text>{item.contato}</Text>
                        <Text>{item.categoria}</Text>
                        <View style={styles.acoes}>
                            <TouchableOpacity
                                style={[styles.botaoAcao, { backgroundColor: '#28a745' }]}
                                onPress={() => handleEditarFornecedor(item.id)}
                            >
                                <Text style={styles.textoBotaoAcao}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.botaoAcao, { backgroundColor: '#dc3545' }]}
                                onPress={() => handleExcluirFornecedor(item.id)}
                            >
                                <Text style={styles.textoBotaoAcao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.semResultados}>Nenhum fornecedor encontrado</Text>
                )}
                onRefresh={() => {
                    setCarregando(true);
                    setTimeout(() => setCarregando(false), 1000);
                }}
                refreshing={carregando}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    imagem: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
    },
    input: {
        textAlign: 'center',
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    texto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    botaoAcao: {
        padding: 5,
        borderRadius: 3,
        marginLeft: 5,
    },
    textoBotaoAcao: {
        color: '#fff',
        fontWeight: 'bold',
    },
    semResultados: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default ListaFornecedores;
