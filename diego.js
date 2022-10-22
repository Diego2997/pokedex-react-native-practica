import { View, Image, Text, ScrollView, TextInput } from "react-native";
import { StyleSheet } from "react-native-web";
import pokemons from "./pokemonList";
import { useState,useEffect } from "react";



export default function App() {
  const [buscador, setBuscador] = useState("");

  const [pokemones, setPokemones] = useState([])


  useEffect(() => {
   if(buscador){
    setPokemones(pokemons.filter(el => el.name.toString().toLowerCase().includes(buscador.toLowerCase())))
   }else{
    setPokemones(pokemons)
   }
  }, [])
  

  const handleChange = (event) => {
    setBuscador(event.target.value);
    filtrar(event.target.value)
  };

  const filtrar = (terminobusqueda) => {
 let item = pokemones.filter(el => {
  if(el.toString().toLowerCase().includes(terminobusqueda.toLowerCase())){
    return el
  }
 })
 setPokemonList(item)
  }


  return (
    <>
      <ScrollView>
        <Image
          source={require("./images/pokeapi_256.png")}
          style={styles.logo}
        />

        <TextInput
          value={buscador}
          placeholder="ingrese el pokemon a buscar"
          onChangeText={() => setBuscador(e.target.value)}
          style={{textAlign:"center",marginBottom:10}}
        />
        {pokemonList && pokemonList.map((pokemon, index) => (
          <>
            <View style={{flexDirection:"row",borderBottomColor:"grey",borderBottomWidth:0.5}}>
              <View style={{width:100,height:100,backgroundColor:"yellow",borderRadius:300,marginHorizontal:20,borderColor:"black",borderWidth:1}}>
                <Image
                  source={{ uri: `${pokemon.url}` }}
                  style={styles.pokemones}
                  key={index}
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
});
