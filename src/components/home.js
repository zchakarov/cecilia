import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Loading} from "./loading";
import FlipMove from "react-flip-move";
import {Link} from "react-router-dom";
import Footer from "./footer";
export default function Home() {
    const [ posts, setPosts ] = useState([]);
    const [ fetching, setFetching ] = useState(true);
    const getResult = async () => {
        const page = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc');
        setPosts(page.data);
            setFetching(false);
    };
    useEffect(  () => {

        getResult();
    }, [setFetching]);

    return (
        <div>
            <div className={fetching?"body loading": "body loaded"}>
                    <Container fluid="xl" className="content-container">
                        {fetching
                            ? <Loading text='Laden'/>
                            :
                            <>
                                <Row className="justify-content-center align-items-center welcome-message">
                                    <Col lg={10} md={8} sm={12}>
                                        <h1 className="pb-0 mb-1">Testing something</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </Col>
                                </Row>

                                <Row className="home_page posts-grid mb-5 pb-5">
                                    <div className="d-flex justify-content-center w-100">
                                        <h1 className="text-center mb-1 pb-0">die neuesten Beiträge</h1>
                                    </div>
                                    <FlipMove typeName={null}
                                              staggerDurationBy={50}
                                              duration={450}
                                              enterAnimation='fade' leaveAnimation='fade'
                                    >
                                        {posts.map((post, index) => {
                                            document.title = 'Home';

                                            if(post.status === 'publish') {
                                                return (
                                                    <Col key={index} className="posts-grid-element  m-md-3" lg={3} md={4} sm={6} xs={12}>
                                                        <Link to={{
                                                            pathname: `/${post.post_terms[0].slug}/galerie/${post.slug}`
                                                        }} className="image-box">
                                                            <img className="grayscale"
                                                                 src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url}
                                                                 alt={post.title.rendered}/>
                                                            <div className="headline">
                                                                <h3>{post.title.rendered}</h3>
                                                            </div>
                                                        </Link>
                                                    </Col>)
                                            }
                                        })}
                                    </FlipMove>
                                </Row>
                            </>

                        }
                    </Container>
                <Footer/>

            </div>

        </div>
    )
};
