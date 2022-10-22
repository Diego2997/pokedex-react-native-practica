import React from 'react'
import pokemonList from './pokemonList'

const ListaPokemon = ({buscador}) => {

const filteredData = pokemonList.filter(el =>{
    if(buscador === ""){
        return el
    }else{
        return el.name.toLowerCase().includes(buscador.toLowerCase())
    }
})

  return (
    { filteredData.map((pokemon,index) => 
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
  )
}

export default ListaPokemon