


import axios from 'axios';
import './Home.css';
import { useState } from 'react';

export default function Home() {
    const [ picture , setPicture ] = useState();
    const [  name , setName ] = useState();
    const [ number , setNumber ] = useState();
    const [ abilitiesArray , setAbillitiesArray ] = useState();
    const [ response , setResponse ] = useState( );

    function getpokemon(param) {
        return new Promise ((resolve , reject) => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`)
                .then((res) => {
                    resolve(res.data);
                    setResponse(res.data)
                })
                .catch((err) => {
                    setNumber();
                    setName();
                    setPicture();
                })
        })
    }

    function statsTable(){
        
    }


    function handleSubmit(e) {
        e.preventDefault();
        const param = e.target[0].value;
        getpokemon(param)
        .then((result) => {
            setPicture(result.sprites.front_default);
            setName(result.name);
            setNumber(result.id);            
        })
        .catch((err) => {
            setNumber();
            setName();
            setPicture();
        })
    };

    function shinizer() {
        getpokemon(name)
        .then((res) => {
            setPicture(res.sprites.front_shiny)
        })
        .catch((err) => {
            setNumber();
            setPicture();
            setName();
        })  
    }

    return (
        <div id ='Pagina' className='rounded flex justify-center'>
            <div id='fundo-vermelho' className='inline-grid grid-cols-2 gap-7 p-10 m-10 font-primary bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-600 via-rose-700 to-rose-900 w-2/4 rounded'>
                <div id ='lado-esquerdo' className=''>
                    <div id='foto-pokemon' className='bg-white h-40 w-40 m-1 p-1 rounded flex justify-center'>
                        <img src={picture}/>
                    </div>
                    <div id='nome-pokemon' className='flex justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-700 rounded h-12
                    w-36 p-1 m-2 border-2 border-black'>
                        <p className='text-center text-black rounded uppercase w-auto text-xl mr-3 my-1'>
                            {name}</p>
                        <p className={`${number != null ? 'block' : 'hidden'} text-center text-black rounded uppercase w-auto text-xl my-1`}>
                            N.{number}</p>
                    </div>
                </div>
                <div id='right-side' className='w-max'>
                    <div id='stats-table' className=' flex justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-700 rounded'>
                        <table className='flex justify-center text-xl text-center text-black'>
                            <tbody>
                                {
                                    response ? response.stats.map((element, index) => {
                                        console.log("element DA TABLE AAA", element)
                                        const statsObject = element.stat;
                                        return(
                                        <div>
                                            <tr>
                                                <th>
                                                    {statsObject.name}
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {element.base_stat}
                                                </td>
                                            </tr>
                                        </div>
                                    )})
                                        : (<></>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className=' flex justify-center'>
                        <div className='flex flex-row bg-red-800 rounded border-red-950 h-12 w-50'>
                            <form onSubmit={handleSubmit} className=' rounded border-1'>
                                <input id="name" className=' h-10 p-1 m-1 bg-red-700 text-center text-white border-red-800 rounded' />
                            </form>
                            <button onClick={shinizer} className='bg-red-700 text-white h-10 rounded
                    hover:bg-red-800 m-1 p-1'>Shiny</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
