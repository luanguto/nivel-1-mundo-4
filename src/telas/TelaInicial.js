import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const TelaInicial = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/supplychain.png')} />
            </View>
            <Text style={styles.titulo}>Escolha uma opção:</Text>
            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Formulário do Fornecedor')}
            >
                <Text style={styles.textoBotao}>Adicionar Fornecedor</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Listagem de Fornecedores')}
            >
                <Text style={styles.textoBotao}>Listar Fornecedores</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    botao: {
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        
    },
});

export default TelaInicial;
