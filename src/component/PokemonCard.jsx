import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({url}) => {

    const[ pokemon, setPokemon ] = useState({})
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])

    const pokeStats = pokemon.stats
    const pokeTypes = pokemon.types

    const typesPoke = ()=>{
        const typesPokemon =[
            "normal",
            "fighting",
            "flying",
            "poison",
            "ground",
            "rock",
            "bug",
            "ghost",
            "steel",
            "fire",
            "water",
            "grass",
            "electric",
            "psychic",
            "ice",
            "dragon",
            "dark",
            "fairy" 
            ]
        
              const pokeColors = [
                "#4A0E24",
                "#7D3033",
                "#00D4F7",
                "#730EC5",
                "#FFBF45",
                "#3E0B27",
                "#1DF78B",
                "#1D1263",
                "#00B6BF",
                "#E75324",
                "#0073D3",
                "#24E7A8",
                "#CAE724",
                "#FDCF39",
                "#65E1FF",
                "#44A8A8",
                "#000a0acc",
                "#E41132"
              ]
        let colors = ""

        typesPokemon.map((types, indice)=>{
            if(pokemon.types?.[0].type.name === types){
                colors= pokeColors[indice]
            }     
        })

        return colors

    }
   

    return (
        <div className='CardInfo'>
            <div onClick={() => navigate(`/pokedex/${pokemon.id}`)} style={{background:typesPoke()}} className="cardPokeInfo">
                    <h3 className='Name'>{pokemon.name}</h3>
                <img src={pokemon.sprites?.other.home?.front_default} alt={pokemon.name} />
                <div className='CardContent'>
                    <div>
                    <p className='Stat'>Stat</p>
                        <ul className='cardCont'>
                            {
                            pokeStats?.map(stats => ( 
                                <div>
                                    {    
                                        stats.stat.name !== "special-attack" && stats.stat.name !== "special-defense" && <li key={stats.stat.url} className='statInfo'>{stats.stat.name}: {stats.base_stat}</li>
                                    }
                                </div>
                            ))
                            }
                        </ul>
                    </div>
                    <div>
                        <ul className='typePoke'>
                        <p className='Type'>Type</p>
                            {
                                pokeTypes?.map(Types =>(
                                    <li key={Types?.[0]?.type.url}>
                                        {Types.type.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;