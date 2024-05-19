


export function InformVersion () {

    return (
        <p style={{'fontSize':'10px', 'color':'gray', 'margin':'0px 0px 0px 5px', 'padding':'0', 'position':'static'}}>
            {import.meta.env.VITE_VERSION}
        </p>
    )
}