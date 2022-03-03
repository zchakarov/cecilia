import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";
import Footer from "./footer";

export default function Services() {
    const [data, setData] = useState([]);
    const [service,setService] = useState({});
    const [ fetching, setFetching ] = useState(true);

    const getResult = async () => {
        const urlArray = window.location.pathname.split("/");
        const urlCategory = urlArray[urlArray.length-2];
        const urlService = urlArray[urlArray.length-1];
        const services = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/pages?_embed');
        setData(
            services.data.filter(function(service){
                return service.slug == urlService;
            }).filter(function (element){
                return element._embedded.up[0].slug == urlCategory
            }));


        console.log(data);
        setFetching(false);

    };
    useEffect(  () => {
        getResult();



    }, [fetching]);


    return (
        <div>
            {data.map((i, index) => {

                document.title = i._embedded.up[0].title.rendered + " - " + i.title.rendered

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
            })}
        </div>
    );

};
