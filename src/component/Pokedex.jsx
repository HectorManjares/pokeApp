import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';



const Pokedex = () => {

    const [ pokemons, setPokemons ] = useState([])
    const [ pokeType, setPokeType ] = useState([])
     

    const navigate = useNavigate()

    const [ nameInput, setNameInput ] = useState("")

    const name = useSelector(state => state.userName)

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155/')
            .then(res => setPokemons(res.data.results))
                 

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setPokeType(res.data.results))
    }, [])
       

    const searchName = () => {
        navigate(`/Pokedex/${nameInput}`)
    }

    const searchType = (TypeUrl) => {
        axios.get(TypeUrl)
            .then(res => setPokemons(res.data.pokemon))
    }

    const [page, setPage] = useState(1)
    const pokePerPage= 12
    const lastPokeIndex = page*pokePerPage
    const firstPokeIndex = lastPokeIndex - pokePerPage
    const pokePaginated = pokemons.slice(
        firstPokeIndex,
        lastPokeIndex
    )

    const totalPages = Math.ceil(pokemons.length / pokePerPage)
    const pagesNumbers = []
    for (let i = 1; i<=totalPages; i++) {
        pagesNumbers.push(i)
    }

    const reset = () =>{
        setPage(1)
    }

    
    return (
        <div className='All'>
            <h2>Trainer {name}</h2>
            <div className='Infomation'>
           
            <div>
                <input 
                type="text" 
                placeholder='Follow by name'
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className='Search'/>
                <button onClick={searchName} className="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div>
                <select onChange={e => searchType(e.target.value)} onClick={() => reset()} className='type'>
                    <option value="">Pokemons by Type</option>
                    {pokeType?.map(Type => (
                        <option value={Type.url} key={Type.url}>{Type.name}</option>
                    ))}
                </select>
            </div>
            </div>
            <p>{pokemons.url}</p>
            
            <ul key={pokemons.id} className='Card'>
            
            {pokePaginated.map(pokemon =>(
                <li key={pokemon.url ? pokemon.url : pokemon.pokemon.url} >
                    <PokemonCard 
                        url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                    />
                </li>
            ))
            }
            </ul>
             <span className='BtnPaginate'>
            <button 
                onClick = { () => setPage(page-1) }
                disabled = {page === 1}
                className='BtnPages'
            ><i className="fa-solid fa-angles-left"></i>
            </button> 
            {page}/{totalPages}
             <button 
                onClick={() => setPage(page+1)}
                disabled = {page === totalPages}
                className='BtnPages1'
            ><i class="fa-solid fa-right-to-line"></i></button>
            </span>   
            </div>
    );
};

export default Pokedex;