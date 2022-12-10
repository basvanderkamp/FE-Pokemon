import React, {useEffect, useState} from "react";
import axios from "axios";
import "./PokemonBook.css";
import Pagination from "../../component/pagination/Pagination";
import Pokemon from "../../component/pokemon/Pokemon";
import PokemonLogo from "../../../src/assets/pokemon Logo.jpg"


const PokemonBook = () => {
    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false );
    const [ pokemonList, setPokemonList ] = useState( [] );
    const [prevUrl, setPrevUrl] = useState();
    const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextUrl, setNextUrl] = useState();
    function goToNextPage() {
        setCurrentUrl(nextUrl);
    }
    function goToPrevPage() {
        setCurrentUrl(prevUrl)
    }



    useEffect( () => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading( true );
            try {
                setError( false );
                const response = await axios.get( currentUrl, {
                    signal: controller.signal
                } );
                setPokemonList( response.data.results );
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);


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
    }, [currentUrl] )





    return (
        <>
            <div className={"container"}>
                <img className={"logo"} src={PokemonLogo} alt="Pokemon Logo"/>

                { loading && <p>Loading...</p> }
                { error && <p>Error: Could not fetch data!</p> }
                <div className={"button-container"}>
                    <Pagination
                        goToNextPage={nextUrl ? goToNextPage : null}
                        goToPrevPage={prevUrl ? goToPrevPage : null}
                    />
                </div>

            </div>

            


            <ul className={"list-container"}>
                {pokemonList.map((pokemon) => {
                    return  <Pokemon key={pokemon.name} name={pokemon.name}/>
                })
                }
            </ul>






        </>
    );
};

export default PokemonBook;
