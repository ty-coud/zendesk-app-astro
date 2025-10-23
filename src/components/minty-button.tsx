import { useState } from "react"

export default function MintyButton() {
    const [clicked, setClicked] = useState(false)

    return (
        <button onClick={() => {setClicked(!clicked)}} className="bg-mint-500 p-2 m-2 border-none rounded">
            Minty! {clicked ? '& Clicked!' : ''}
        </button>
    )
}