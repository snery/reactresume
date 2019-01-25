import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div>
            <div className='hamburger'>
                <label htmlFor="menuButton" className="more-info">More info here! <i className="glyphicon glyphicon-arrow-right"></i></label>
                <button id="menuButton" type='button' className="hamburger-button" data-toggle='collapse'
                        data-target='.hamburger-menu' title="Navigation Menu">
                    <span className='sr-only'>Toggle navigation</span>
                    <div><span className='icon-bar'></span></div>
                    <div><span className='icon-bar'></span></div>
                    <div><span className='icon-bar'></span></div>
                </button>
            </div>
            <div className='hamburger-menu collapse'>
                <ul className=''>
                    <li>
                        <NavLink to={'/'} exact activeClassName='active' title="Home" >
                            <span className='glyphicon glyphicon-home'></span> Jobs
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/education'} activeClassName='active' title="Education" >
                            <span className='glyphicon glyphicon-education'></span> Education/Skills
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/code'} activeClassName='active' title="Code" >
                            <span className='glyphicon glyphicon-wrench'></span> Code
                            </NavLink>
                    </li>
                </ul>
            </div>
        </div>;
    }
}