import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Dados } from './src/dados/DadosFornecedor'; 
import FormularioFornecedor from './src/componentes/AddFornecedor'; 
import ListaFornecedores from './src/componentes/ListaFornecedor';
import TelaInicial from './src/telas/TelaInicial';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Dados>  
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff', 
            },
            headerTintColor: '#333', 
            headerTitleStyle: {
              fontWeight: 'bold', 
              textAlign: 'center', 
            },
          }}
        >
          <Stack.Screen
            name="Tela Inicial"
            component={TelaInicial}
            options={{ title: 'MettingApp - Fornecedores' }} 
          />
          <Stack.Screen
            name="Formulário do Fornecedor"
            component={FormularioFornecedor}
            options={{ title: 'Cadastro de Fornecedores' }} 
          />
          <Stack.Screen
            name="Listagem de Fornecedores"
            component={ListaFornecedores}
            options={{ title: 'Listagem de Fornecedores' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Dados>
  );
};


export default App;
