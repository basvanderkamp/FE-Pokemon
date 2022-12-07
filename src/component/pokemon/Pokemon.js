import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Pokemon.css";
import {Link, useNavigate} from "react-router-dom";


const Pokemon = ({name}) => {
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( false );
    const [pokemon, setPokemon] = useState([]);





    useEffect( () => {
        const controller = new AbortController();

        const fetchData = async () => {


                setLoading( true );
            try {
                setError( false );
                const response = await axios.get( `https://pokeapi.co/api/v2/pokemon/${name}`, {
                    signal: controller.signal,
                } );
                setPokemon( response.data );


            } catch ( e ) {
                setError( true )

                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading( false );
        }
        fetchData();


        return function cleanup() {
            controller.abort();
        }
    }, [name] )


    return (
        <>
            { loading && <p>Loading...</p> }
            { error && <p>Error: Could not fetch data!</p> }

            {Object.keys(pokemon).length > 0 &&
                <div className={"card-container"}>
                    <h1 className={"name"}>{pokemon.name}</h1>
                    <a href={"/PokemonCard/" + pokemon.name} className={"link"}>
                        <img className={"image"} src={pokemon.sprites.front_default} alt="afbeelding pokemon"/>
                    </a>
                    <h3 className={"text"}>Moves: {pokemon.moves.length}</h3>
                    <h3 className={"text"}>Weight: {pokemon.weight}</h3>
                    <h3 className={"text"}>Abilities:</h3>
                    {pokemon.abilities.map((a) => {
                        return (
                            <li className={"list"} key={a.ability.name}
                            >{a.ability.name}</li>
                        )
                    })}
                </div>
            }
        </>
    );
};

export default Pokemon;
