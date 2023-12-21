
import { NavLink } from "react-router-dom"

function NavigLink({path, children}: {path: string, children: React.ReactNode}) {
    return (
        <NavLink className=' px-4 py-2 hover:hover-style rounded-sm flex items-center gap-2 whitespace-nowrap' to={path}>{children}</NavLink>
    )
}

export default NavigLink
