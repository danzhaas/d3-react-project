import React, { useState } from 'react';

export default function Test({person}) {
    const [personClicks, updateClicks] = useState(0);
    return (
    <>
        <div onClick={ () => updateClicks(personClicks+1) } >Hello {person}</div>
        <p>{person}'s clicks: {personClicks}</p>
    </>
    )
}