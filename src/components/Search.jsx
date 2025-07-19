import React from 'react'

function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className='search'>
            <div>
                <img src="./search.svg" alt="Icone de recherche" />
                <input type="text" name="" id="" placeholder='Search through 300+ movies online' 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}

export default Search