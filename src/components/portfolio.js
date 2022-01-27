import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import FlipMove from "react-flip-move";
import {Link} from "react-router-dom";
import Footer from "./footer";
import {Loading} from "./loading";

export default function Portfolio() {
    const [portfolio, setPortfolio] = useState([]);
    const [fetching, setFetching] = useState(true);
    const urlArray = window.location.pathname.split("/");
    const urlCategory = urlArray[urlArray.length-2];
    const getResults = async () => {
        const portfolio = await axios('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed');
        setPortfolio(portfolio.data.filter(
            function(element){
                return element.post_terms[0].slug == urlCategory;
            }
        ));
        setFetching(false);
    }

    useEffect(  () => {
        getResults();

        document.title = 'Portfolio';

    }, []);

    return (
        <div>
            <div>
                <div className='content-container'>
                    <Container fluid="xl" className={fetching?"body loading": "body loaded"}>

                        {fetching
                            ? <Loading text='Loading'/>
                            : <Row className="posts-grid">
                                <FlipMove typeName={null}
                                          staggerDurationBy={450}
                                          duration={600}
                                          enterAnimation='fade'
                                          leaveAnimation='fade'
                                >

                                    {portfolio.map((i)=> {
                                        if(i.status === 'publish') {
                                            return (
                                                <Col key={i.id} className="posts-grid-element" lg={3} md={4} sm={6} xs={12}>
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
