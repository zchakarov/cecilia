import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {Loading} from "./loading";
import FlipMove from "react-flip-move";
import {Link} from "react-router-dom";
import {Footer} from "./footer";

export default function Home() {
    const [ posts, setPosts ] = useState([]);
    const [ fetching, setFetching ] = useState(true);
    const getResult = async () => {
        const page = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed');
        setPosts(page.data);
        setFetching(false);
    };
    useEffect(  () => {
        document.title = 'Home';

        getResult();
    }, [setFetching]);
    return (
        <div>
            <div>
                <div className='content-container'>
                    <Container fluid="xl" className={fetching?"body loading": "body loaded content-container"}>
                        {fetching
                            ? <Loading text='Laden'/>
                            : <Row className="home_page posts-grid">
                                <FlipMove typeName={null}
                                          staggerDurationBy={50}
                                          duration={450}
                                          enterAnimation='fade' leaveAnimation='fade'
                                >
                                    {posts.map((post, index) => {
                                        if(post.sticky && post.status === 'publish') {

                                            return (
                                                <Col key={index} className="posts-grid-element" lg={3} md={3} sm={6} xs={12}>
                                                    <Link to={{
                                                        pathname: post.slug
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
                        }
                    </Container>
                </div>
                <Footer/>

            </div>

        </div>
    )
};
