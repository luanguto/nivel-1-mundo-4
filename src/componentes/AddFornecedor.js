import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, Button, View, Image, Alert, ScrollView } from "react-native";
import { useFornecedores } from '../dados/DadosFornecedor';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Separator = () => <View style={styles.separator} />;

const FormularioFornecedor = () => {
    const route = useRoute();
    const [idEditando, setIdEditando] = useState(route.params?.idEditando || "");
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [contato, setContato] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagem, setImagem] = useState("");

    const { fornecedores, setFornecedores } = useFornecedores();
    const navigation = useNavigation();

    useEffect(() => {
        if (idEditando && fornecedores) {
            const fornecedorEditando = fornecedores.find(f => f.id === idEditando);
            if (fornecedorEditando) {
                setNome(fornecedorEditando.nome);
                setEndereco(fornecedorEditando.endereco);
                setContato(fornecedorEditando.contato);
                setCategoria(fornecedorEditando.categoria);
                setImagem(fornecedorEditando.imagem);
            }
        }
    }, [idEditando, fornecedores]);

    const handleSave = async () => {
        if (!nome || !endereco || !contato || !categoria || !imagem) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        let fornecedoresAtualizados;
        if (idEditando) {
            fornecedoresAtualizados = fornecedores.map(fornecedor =>
                fornecedor.id === idEditando
                    ? { ...fornecedor, nome, endereco, contato, categoria, imagem }
                    : fornecedor
            );
        } else {
            const novoFornecedor = { id: new Date().getTime().toString(), nome, endereco, contato, categoria, imagem };
            fornecedoresAtualizados = [...fornecedores, novoFornecedor];
        }

        try {
            await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados));
            setFornecedores(fornecedoresAtualizados);
            Alert.alert('Sucesso', 'Fornecedor salvo com sucesso!');
            setNome("");
            setEndereco("");
            setContato("");
            setCategoria("");
            setImagem("");
            setIdEditando("");
            navigation.navigate('Listagem de Fornecedores');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar o fornecedor. Por favor, tente novamente.');
        }
        
    };

    const selecionarImagem = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permissão necessária', 'É necessário conceder permissão para acessar a galeria.');
            return;
        }

        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (resultado.cancelled) {
            Alert.alert('Seleção Cancelada', 'A seleção de imagem foi cancelada.');
            return;
        }

        const firstAsset = resultado.assets ? resultado.assets[0] : null;
        if (!firstAsset || !firstAsset.uri) {
            Alert.alert('Erro', 'Não foi possível obter a URI da imagem selecionada.');
            return;
        }

        try {
            let base64Image = firstAsset.uri.startsWith('file://')
                ? `data:image/jpeg;base64,${await FileSystem.readAsStringAsync(firstAsset.uri, { encoding: FileSystem.EncodingType.Base64 })}`
                : firstAsset.uri;
            setImagem(base64Image);
        } catch (error) {
            console.error('Erro ao converter imagem:', error);
            Alert.alert('Erro', 'Não foi possível converter a imagem para formato adequado.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {imagem ? <Image source={{ uri: imagem }} style={styles.imagem} /> : null}
            <Button title="Selecionar Imagem" onPress={selecionarImagem} />
            <Separator />
            <Text style={styles.texto}>Nome do fornecedor:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite o nome" />
            <Separator />
            <Text style={styles.texto}>Endereço:</Text>
            <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Digite o endereço" />
            <Separator />
            <Text style={styles.texto}>Contato:</Text>
            <TextInput style={styles.input} value={contato} onChangeText={setContato} placeholder="Digite o contato" />
            <Separator />
            <Text style={styles.texto}>Categoria:</Text>
            <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Digite a categoria" />
            <Separator />
            <Button title="Salvar" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imagem: {
        width: 150,
        height: 150,
        marginBottom: 10,
        alignSelf: 'center',
    },
    texto: {
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 2,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
    },
    separator: {
        marginVertical: 5,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
});

export default FormularioFornecedor;
