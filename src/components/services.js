import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Footer} from "./footer";

export default function Services() {
    const [data, setData] = useState([]);
    const getResult = async () => {
        const services = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/pages?_embed');
        setData(services.data);


    };
    useEffect(  () => {
        getResult();

    }, [setData]);


    return (
        <div>
            {data.map((i, index) => {
                var urlArray = window.location.pathname.split("/");
                var serviceArray = i.link.split("/");
                var urlCategory = urlArray[urlArray.length-2];
                var serviceCategory = serviceArray[serviceArray.length-3];

                var urlService = urlArray[urlArray.length-1];
                var Service = serviceArray[serviceArray.length-2];

                if(Service === urlService && urlCategory === serviceCategory) {
                    return (
                        <div key={index} className='article'>
                            <div className='content-container' key={index}>
                                {i._embedded['wp:featuredmedia'] &&
                                        <Container fluid="xl">
                                            <Row className="modal-content-header align-items-center justify-content-center pt-4">
                                                <Col lg={8} md={8} sm={8} xs={12} className="modal-content-text align-items-center">
                                                    <h1>{i.title.rendered}</h1>
                                                </Col>
                                            </Row>
                                        </Container>
                                }
                                {i.content.rendered?<div className="modal-content-body p-0">
                                    <Container fluid="xl">
                                        <Row className='justify-content-center'>
                                            <Col sm={8} xs={12} dangerouslySetInnerHTML={{__html: i.content.rendered}}/>

                                        </Row>
                                    </Container>
                                </div> : ''}

                            </div>
                            <Footer/>

                        </div>
                    )
                }

            })}
        </div>
    );
};
