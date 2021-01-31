import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../misc/context/AuthContext';

export const Navbar: React.FC = () => {
    const { logOut } = useContext(AuthContext);

    const logoutHandler = (e: React.MouseEvent): void => {
        e.preventDefault();

        logOut();
    }

    return (
        <nav>
            <div className="nav-wrapper blue lighten-1">
                <Link to='/' className="brand-logo">Links Shortening App</Link>
                <ul className="right">
                    <li>
                        <Link to='/create' className='nav-link'>Create</Link>
                    </li>
                    <li>
                        <Link to='/links' className='nav-link'>Links</Link>
                    </li>
                    <li>
                        <a href='/' className='nav-link' onClick={(e) => logoutHandler(e)}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};