import React from 'react'

function PokimanList({pokiman}) {

    return (        
        <div>
            <h1>Pokemon Character Names :</h1>
            {pokiman.map(p=>(
                <div key={p}>
                    <ul><li>{p}</li></ul>
                    </div>
            ))}
        </div>
    )
}

export default PokimanList
