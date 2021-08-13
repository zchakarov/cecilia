import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import FlipMove from "react-flip-move";
import {Link} from "react-router-dom";
import {Footer} from "./footer";
import {Loading} from "./loading";

export default function Portfolio() {
    const [portfolios, setPortfolio] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [activeId, setActiveId] = useState(1);
    const getCategories = async () => {
        const categories = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/categories');
        setCategories(categories.data);

    }
    const getResults = async () => {
        const portfolio = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed&categories=');
        setPortfolio(portfolio.data);
        setFetching(false);
    }
    const getFilter = async () => {
        const filterposts = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed&categories=1');
        setFilter(filterposts.data);

    }
    const handleClick = async (id) => {
        let filterPosts = [];
        filterPosts = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed&categories='+id);
        setActiveId(id);
        setFilter(filterPosts.data);

    };

    useEffect(  () => {
        getCategories();
        getResults();
        getFilter();

        document.title = 'Portfolio';

    }, [setFilter, setActiveId]);

    return (
        <div>
            <div>
                <div className='content-container'>
                    <Container fluid="xl">
                        <Row className="justify-content-center modal-content-header">
                            <Col lg={3} md={12} sm={12} xs={12} className="text-center modal-content-text">
                                <h1>Portfolio</h1>
                            </Col>
                        </Row>
                    </Container>
                    <div className='cat-container'>
                        {categories.map((i, index) => {
                                return (
                                    <button
                                        className={activeId === i.id ? "active btn" : "inactive btn"}
                                        key={i.id}
                                        value={i.slug}
                                        onClick={() => handleClick(i.id)}
                                    >
                                        {i.name}
                                    </button>
                                )
                            }
                        )}
                    </div>
                    <Container fluid="xl" className={fetching?"body loading": "body loaded"}>
                        {fetching
                            ? <Loading text='Loading'/>
                            : <Row className="posts-grid">
                                <FlipMove typeName={null}
                                          staggerDurationBy={150}
                                          duration={600}
                                          enterAnimation='fade'
                                          leaveAnimation='fade'
                                >

                                    {filter.map((i)=> {
                                        if(i.status === 'publish') {
                                            return (
                                                <Col key={i.id} className="posts-grid-element" lg={3} md={3} sm={6} xs={12}>
                                                    <Link to={{
                                                        pathname: i.slug
                                                    }} className="image-box">
                                                        <img className="grayscale"
                                                             src={i._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}
                                                             alt={i.title.rendered}/>
                                                        <div className="headline">
                                                            <h3>{i.title.rendered}</h3>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            )
                                        }
                                    })}
                                </FlipMove>

                            </Row>
                        }
                    </Container>

                </div>
                <Footer/>

            </div>

        </div>
    )
};
