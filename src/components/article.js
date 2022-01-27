import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";
import Footer from "./footer";

export default function Article() {
    const [post, setPost] = useState([]);
    const getResult = async () => {
        const page = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/pages?_embed&slug='+ window.location.pathname.split("/").pop());
        setPost(page.data);
        if(page) {
            document.title = page.data[0].title.rendered;
        }

    };
    useEffect(  () => {
        getResult();

    }, [setPost]);


    return (
        <div>
            {post.map((i, index) => {

                //const date = new Date(i.date_gmt);
                return (
                    <div key={index} className='article'>
                        <div className='content-container' key={index}>
                            {i._embedded['wp:featuredmedia'] &&
                            <Container fluid="xl">
                                <Row className="modal-content-header justify-content-center pt-4">
                                    <Col lg={8} md={8} sm={8} xs={12} className="modal-content-text justify-content-center align-items-center">
                                        <h1>{i.title.rendered}</h1>
                                    </Col>
                                </Row>
                            </Container>
                            }
                            {i.content.rendered?<div className="modal-content-body p-0">
                                <Container fluid="xl">
                                    <Row className='justify-content-center'>
                                        <Col sm={8} xs={12} dangerouslySetInnerHTML={ {__html: i.content.rendered} } />

                                    </Row>
                                </Container>
                            </div>: '' }

                        </div>
                        <Footer/>

                    </div>
                )
            })}
        </div>
    );
};
