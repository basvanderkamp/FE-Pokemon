import React, {useEffect, useState} from "react";
import axios from "axios";
import "./PokemonCard.css";
import {useParams} from "react-router-dom";


const PokemonCard = () => {
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( false );
    const [pokemon, setPokemon] = useState([]);

    const { id } = useParams();




    useEffect( () => {
        const controller = new AbortController();

        const fetchData = async () => {


            setLoading( true );
            try {
                setError( false );
                const response = await axios.get( `https://pokeapi.co/api/v2/pokemon/` + id, {
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
    }, [] )


    return (
        <div className={"box"}>
            { loading && <p>Loading...</p> }
            { error && <p>Error: Could not fetch data!</p> }

            {Object.keys(pokemon).length > 0 &&
                <div className={"card"} >
                    <h2 className={"name-card"}>{pokemon.name}</h2>
                    <img className={"image-card"} src={pokemon.sprites.other.dream_world.front_default} alt="afbeelding pokemon"/>
                    <div className={"stats"}>
                        <h3 className={"text-card"}>Experience:</h3>
                        <h3 className={"number-card"}>{pokemon.base_experience}</h3>
                        <h3 className={"text-card"}>Moves:</h3>
                        <h3 className={"number-card"}>{pokemon.moves.length}</h3>
                        <h3 className={"text-card"}>Weight:</h3>
                        <h3 className={"number-card"}>{pokemon.weight}</h3>
                        <h3 className={"ability-card"}>Abilities:</h3>
                        <div className={"list-card"}>
                            {pokemon.abilities.map((a) => {
                                return (
                                    <li className={"list-card"} key={a.ability.name}
                                    >{a.ability.name}</li>
                                )
                            })}
                        </div>

                    </div>

                </div>
            }
        </div>


    );
};

export default PokemonCard;