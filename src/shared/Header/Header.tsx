import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <ul style={{listStyle: 'none'}}>
                <li>
                    <NavLink to={'/user-profile/1'}>User Profile</NavLink>
                </li>
            </ul>
        </header>
    )
}
