import React from 'react';
import "./Pagination.css";

function Pagination({goToNextPage, goToPrevPage}) {

    return (
        <>
            {goToPrevPage && <button className={"Button"} onClick={goToPrevPage}>
                Vorige
            </button>}
            { goToNextPage && <button className={"Button"} onClick={goToNextPage}>
                Volgende
            </button>}
        </>
    )
}
export default Pagination