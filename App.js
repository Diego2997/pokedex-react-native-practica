import { View, Image, Text, ScrollView, TextInput } from "react-native";
import { StyleSheet } from "react-native-web";
import pokemonList from "./pokemonList";
import { useState,useEffect } from "react";



export default function App() {
  const [buscador, setBuscador] = useState("");

  const [pokemones, setPokemones] = useState([])


  useEffect(() => {
   if(buscador){
    setPokemones(pokemonList.filter(el => el.name.toString().toLowerCase().includes(buscador.toLowerCase())))
   }else{
    setPokemones(pokemonList)
   }
  }, [buscador])
  
  return (
    <>
      <ScrollView>
        <Image
          source={require("./images/pokeapi_256.png")}
          style={styles.logo}
        />

        <TextInput
          value={buscador}
          placeholder=" Ingrese el pokemon a buscar"
          onChangeText={(cadena) => setBuscador(cadena)}
          style={styles.input}
        />
        { pokemones.map((pokemon, index) => (
          <>
            <View
            key={index}
             style={{flexDirection:"row"
             ,borderBottomColor:"grey",
             borderBottomWidth:0.5}}
              >

              <View 
              style={{width:100,height:100
              ,backgroundColor:"yellow"
              ,borderRadius:300
              ,marginHorizontal:20
              ,borderColor:"black"
              ,borderWidth:1}}>

                <Image
                  source={{ uri: `${pokemon.url}` }}
                  style={styles.pokemones}
                  
                />
              </View>

              <View style={{alignSelf:"center",marginLeft:10}}>
                <Text style={{ fontWeight: "800" }}>{pokemon.name}</Text>
              </View>
             
            </View>
          </>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
 
  logo: {
    margin: 90,
  },
  pokemones: {
    width: 100,
    height: 100,
  },
  input: {
    width: "90%",
    height: 40,
    marginHorizontal:20,
    padding: 5,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    fontSize: 15,
  }
});
