import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PokeLoader from './PokeLoader';
import Error from '../assets/videos/ASH404.mp4';

const PokedexDetail = () => {

    const { id } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [movesPokemon, setMovesPokemon] = useState("")
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemonInfo(res.data))
            .catch(error => {
                if(error.response.status === 404){
                    setIsError(true)
                }
            })
    }, [])

    console.log(pokemonInfo)

    const kilogramWeight = pokemonInfo.weight * 0.1
    const metersHeight = pokemonInfo.height * 0.1
    const typePoke = pokemonInfo.types
    const abilitiesPoke = pokemonInfo.abilities
    const statsPoke = pokemonInfo.stats
    const movesPoke = pokemonInfo.moves

    const movesList = () => {
        setMovesPokemon(movesPokemon)
    }

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
            if(types?.[0].type?.name === types){
                colors= pokeColors[indice]
            }     
        })
        return colors

    }

    const [loader, setLoader] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);



    if(isError) return <video src={Error}autoPlay loop muted width="100%"/>
    return (
        <div >
            <PokeLoader />
            {!loader && (
                <div className='contDetail'>
                <button className='BtnPrev'><Link to="/pokedex"><i class="fa-solid fa-share-from-square"></i></Link></button>
                <span>
                <h1 className='nameId' style={{color:typesPoke()}}>{pokemonInfo.name}</h1>
                <h2 className='idInfo' style={{color:typesPoke()}}>#{id}</h2>
                </span>
            <img src={pokemonInfo?.sprites?.other.home.front_default} alt={pokemonInfo.name} className='Poke'/>
            <div className='Info'>
                <b>Weight</b>
                <br />
                <p>{(kilogramWeight).toFixed(2)}kg</p>
                <b>Heigth</b>
                <br />
                <p>{(metersHeight).toFixed(2)} mts</p>
            </div>
            <div className='InfoAll'>
                <div className='TypeINfo'>
                    <ul>
                    <p>Type</p>
                        {
                            typePoke?.map(Types => (
                                <li key={Types?.[0]?.type.url} className="TypeInfoT">
                                    {Types.type.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='TypeInfoAbili'>
                    <ul>
                    <p>Abilities</p>
                        {
                            abilitiesPoke?.map(abilities => (
                                <li key={abilities.ability.url} className="TypeInfoA">
                                    {abilities.ability.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='StatsPoke'>
                <p>Stats</p>
                    <ul>
                        {
                            statsPoke?.map(stats => (
                                <div>
                                    {
                                        stats.stat.name !== "special-attack" && stats.stat.name !== "special-defense" && <li key={stats.stat.url} className="StatsPokeAll">{stats.stat.name}: {stats.base_stat}/150</li>
                                    }
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <br />
                    <select onClick={e => movesList(e.target.value)} className="SelectMoves">
                        <option value="">Movies</option>
                        {movesPoke?.map(moves => (
                            <option value={moves.move.name} key={moves.move.url}>{moves.move.name}</option>
                        ))}
                    </select>
                </div>
            </div>
                </div>                
            )}

        </div>
    );
};

export default PokedexDetail;