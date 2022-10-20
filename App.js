import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  Button,
} from "react-native";
import { StyleSheet } from "react-native-web";
import pokemonList from "./pokemonList";
import { useState, useEffect } from "react";

export default function App() {
  const [buscador, setBuscador] = useState("");
  const [pokemones, setPokemones] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isEnable, setIsEnable] = useState(false);

  const toggle = () => setIsEnable((elemento) => !elemento);

  const handleChange = (text) => {
    setBuscador(text);
    if (text === "") {
      setPokemones(pokemonList);
    }
  };

  const filtrar = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtrado = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(buscador.toLowerCase())
      );
      setPokemones(filtrado);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Image source={require("./images/pokeapi_256.png")} style={styles.logo} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Desactivar Busqueda</Text>
        <Switch onValueChange={toggle} value={isEnable} />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={buscador}
          placeholder=" Ingrese el pokemon a buscar"
          onChangeText={handleChange}
          style={styles.input}
          editable={isEnable ? false : true}
         
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title="buscar" onPress={filtrar} />
        )}
      </View>

      <ScrollView>
      <View style={{width:"100%"}}>
        {pokemones.length > 0 ? pokemones.map((pokemon,index )=> (
          <>
            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottomColor: "grey",
                borderBottomWidth: 0.5,
              }}
            >
              
                <Image
                  source={{ uri: `${pokemon.url}` }}
                  style={styles.pokemonImage}
                />
             

              
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
              
            </View>
          </>
        )) : <>
        <Text style={styles.nombre}>No se encontro el pokemon con el nombre: {" "}</Text>
        <Text style={styles.error}>{buscador}</Text>
        </>}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 50,
    marginLeft: 60,
  },
  pokemones: {
    width: 90,
    height: 90,
  },
  input: {
    width: "70%",
    height: 40,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 15,
  },
 
  pokemonImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#c71e1e',
    backgroundColor: 'yellow',
  },
  pokemonItem: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonName: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
    textTransform: 'capitalize',
  },error: {
    textAlign: 'center',
    fontSize: 16,
  },
  nombre: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
