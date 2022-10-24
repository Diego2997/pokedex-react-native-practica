import {
  View,
  Image,
  Text,
  Linking,
  TextInput,
  Switch,
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity
  
} from "react-native";
import { StyleSheet, TouchableHighlight } from "react-native-web";
import pokemonList from "./pokemonList";
import { useState} from "react";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
// import { WebView } from 'react-native-webview';


export default function App() {
  const [buscador, setBuscador] = useState("");
  const [pokemones, setPokemones] = useState(pokemonList);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTouch, setModalTouch] = useState(false)
  const [Url, setUrl] = useState("");

  const handleLink = async () => {
    await Linking.openURL(Url);
  };

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

 
    
  
  

  const renderItem = ({ item }) => {
    return (
      <View style={styles.pokemonItem}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
          onPress={()=>{
            setModalTouch(true)
            setUrl(item.url)
          }}
          >
          <Image source={{ uri: item.url }} style={styles.pokemonImage} />
          </TouchableOpacity>
          
          <Text style={styles.pokemonName}>{item.name}</Text>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true);
            setUrl(item.url);
          }}
        >
          <Text style={styles.textStyle}>Ver Imagen</Text>
        </Pressable>
      </View>
    );
  };

 const RenderModal = () =>{
  return <>
    <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>
                Si aceptas vamos a abrir tu navegador para mostrarte la imagen,
                estas seguro?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <Pressable
                  onPress={handleLink}
                  style={[styles.button, styles.buttonClose]}
                >
                  <Text style={styles.textStyle}>Ver Imagen</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cerrar Modal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
      </View>
  </>
  
 }

 const ModalTouch = () =>{
  return (
    <View style={styles.centeredView}>
    <Modal 
    visible={modalTouch}
    animationType="slide"
    transparent={true} >
      <View style={styles.viewWebView}>
        <Pressable onPress={()=>setModalTouch(false)} style={[styles.button, styles.buttonClose]}>
          <Text style={{fontSize:30}}>X</Text>
        </Pressable>
        <WebView source={{uri:Url}} style={{width:300,marginVertical:100}}/>
      </View>
    </Modal>
    </View>
  )
 }



  return (
    <>
    {/* ---------------MODAL---------------------- */}
{RenderModal()} 


      {/* -----------------CONTENIDO ESTATICO----------------------- */}
      <StatusBar
        animated={true}
        backgroundColor="#B40909"
        ></StatusBar>

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

      {/* ---------------------RENDERIZADO------------------- */}
       
         {ModalTouch()}  
      <FlatList
        data={pokemones}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={filtrar} />
        }
      />

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
    height: 50,
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
    borderColor: "#c71e1e",
    backgroundColor: "yellow",
    alignSelf: "flex-start",
  },
  pokemonItem: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  pokemonName: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    marginLeft: 10,
    textTransform: "capitalize",
  },
  error: {
    textAlign: "center",
    fontSize: 16,
  },
  nombre: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    
  },
  buttonOpen: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    flexDirection: "column",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  viewWebView:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  }
});
