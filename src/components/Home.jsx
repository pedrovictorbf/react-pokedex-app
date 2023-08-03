


import axios from 'axios';
import './Home.css';
import { useState } from 'react';

export default function Home() {
    const [ picture , setPicture ] = useState();
    const [  name , setName ] = useState();
    const [ number , setNumber ] = useState();

    function getpokemon(param) {
        return new Promise ((resolve , reject) => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`)
                .then((response) => {
                    const defaultPicture = response.data.sprites.front_default;
                    const shinyPicture = response.data.sprites.front_shiny;
                    const pokemon = response.data.name;
                    const pokemonId = response.data.id;
                    resolve ({
                        shiny: shinyPicture,
                        default: defaultPicture,
                        pokemon: pokemon,
                        pokemonId: pokemonId
                    })
                })
                .catch((err) => {
                    reject('Invalid')
                })
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        const param = e.target[0].value;
        getpokemon(param)
        .then((result) => {
            const pokemonId = result.pokemonId;
            const defaultPicture = result.default;
            const pokemon = result.pokemon;
            setPicture(defaultPicture);
            setName(pokemon);
            setNumber(pokemonId);
        })
        .catch((err) => {
            setName(err);
            setPicture();
        })
    };

    function shinizer() {
        getpokemon(name)
        .then((result) => {
            const shinyPicture = result.shiny;
            const pokemon = result.pokemon;
            setPicture(shinyPicture);
            setName(pokemon);
        })
        .catch((err) => {
            setName(err);
            setPicture();
        })
    }

    return (
        <div className='rounded grid'>
            <div className=' m-10 font-primary bg-red-600 w-2/4 rounded'>
                <div className=''>
                    <div className=' flex justify-start w-3/6'>
                        <div className='border-2 border-red-800 rounded bg-white w-56 h-56 flex justify-center'>
                            <img src={picture} className=" w-max h-max" />
                        </div>
                    </div>
                    <div className=' flex justify-center'>
                        <div className='flex flex-row bg-red-800 rounded border-red-950 m-10'>
                            <form onSubmit={handleSubmit} className=' rounded border-1'>
                                <input id="name" className=' h-10 w-100 p-1 m-1 bg-red-700 text-center text-white border-red-800 rounded' />
                            </form>
                            <button onClick={shinizer} className='bg-red-700 text-white h-10 w-100 rounded
                            hover:bg-red-800 m-1 p-1'>Shiny</button>
                        </div>
                    </div>
                    <div className='flex justify-center m-1'>
                        <div className='bg-green-700 rounded w-30 p-1 m-2 border-2 border-black'>
                            <p className='text-center text-black flex justify-center rounded uppercase w-40 text-xl'>
                                {name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
