import React, {useEffect, useState} from "react";
import axios from "axios";
import jQuery from "jquery";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {scrolltop} from "./scrollTop";

export default function Header() {
    const [ data , setData ] = useState([ ]);
    const [expanded, setExpanded] = useState(false);
    useEffect( () => {
        axios.get('http://chakito.com/blog/index.php/wp-json/menus/v1/menus/menu').then(res => {
            setData(res.data);
        });

        jQuery('.navbar-toggler').on('click', function () {
            jQuery('body').toggleClass('overflowhidden');
            jQuery('.navigation-link').on('click', function () {
                jQuery('body').removeClass('overflowhidden');
            });
        });
        scrolltop();

    }, []);

    return (
        <div className="header">
            <Navbar expanded={expanded} expand="md" sticky="bottom">
                <div className="slider">
                    <div className='slide slide1'/>
                    <div className='slide slide2'/>
                    <div className='slide slide3'/>
                    <div >
                        <Link className='logo' to='/'><Image src="http://www.chakito.com/logo.svg" width="143" height="130"/></Link>

                    </div>
                </div>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" >
                    <span className="line"/>
                    <span className="line"/>
                    <span className="line"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>

                        {data.items
                            ?data.items.map((item, i) => (
                                <Nav.Item key={i}>
                                    <NavLink className='navigation-link' data-name={item.title}
                                             onClick={() => setExpanded(false)} exact activeClassName="active" to={{
                                        pathname: `/${item.slug}`
                                    }}
                                    >{item.title}</NavLink>
                                </Nav.Item>
                            ))
                            : ''}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
