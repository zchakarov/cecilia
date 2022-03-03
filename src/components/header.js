import React, {useEffect, useState} from "react";
import axios from "axios";
import jQuery from "jquery";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown"
import {scrolltop} from "./scrollTop";

export default function Header() {
    const [ data , setData ] = useState([ ]);
    const [expanded, setExpanded] = useState(false);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect( () => {
        axios.get('http://chakito.com/blog/index.php/wp-json/menus/v1/menus/menu').then(res => {
            setData(res.data);
        });

        jQuery('.navbar-toggler').on('click', function () {
            jQuery('body').toggleClass('overflowhidden');
            jQuery('.navigation-link:not(.dropdown)').on('click', function () {
                jQuery('body').removeClass('overflowhidden');
            });
        });


        scrolltop();

    }, []);

    return (
        <div className="header">
            <Navbar expanded={expanded} expand="md" sticky="bottom">
                <div className="slider">
                    <div className='slide slide1'>
                        <span>Slide 1</span>
                    </div>
                    <div >
                        <Link className='logo' to='/'><Image src="http://www.chakito.com/logo.png" width="160" height="160"/></Link>

                    </div>
                </div>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" >
                    <span className="line"/>
                    <span className="line"/>
                    <span className="line"/>
                </Navbar.Toggle>
                <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
                    <Nav className="w-100 justify-content-center">
                        {data.items
                            ?data.items.map((item, i) => (
                                <Nav.Item key={i}>

                                    {item.child_items && item.child_items.length > 0 ?
                                        <NavDropdown className='navigation-link' id="dropdown" title={item.title} renderMenuOnMount={true}>
                                            { item.child_items.map((child, ci) => (
                                                <NavDropdown.Item key={ci}>
                                                    {   child.type_label !== "Individueller Link" ?
                                                        <NavLink className='navigation-link sub-navigation-link'
                                                                 data-name={child.title}
                                                                 onClick={() => setExpanded(false)} exact
                                                                 activeClassName="active" to={{
                                                            pathname: `/${item.slug}/${child.slug}`
                                                        }}
                                                        >{child.title}
                                                        </NavLink>:

                                                        <Nav.Link active={false} className="navigation-link sub-navigation-link" href={child.url} target="_blank" onClick = {()=>{openInNewTab(child.url); setExpanded(false)}}>{child.title}</Nav.Link>

                                                    }

                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown> :
                                        <NavLink className='navigation-link' data-name={item.title}
                                                 onClick={() => setExpanded(false)} exact activeClassName="active" to={{
                                            pathname: `/${item.slug}`
                                        }}
                                        >{item.title}</NavLink>

                                    }

                                </Nav.Item>
                            ))
                            : ''}


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
