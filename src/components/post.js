import React, {useEffect, useState, useLayoutEffect} from "react";
import axios from "axios";
import jQuery from "jquery";
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

import {Col, Container, Image, Row} from "react-bootstrap";
import { Footer } from './footer'
export default function Post() {
    const [post, setPost] = useState([]);
    const [images, setImages] = useState([]);

    const options = {
        buttons: {
            backgroundColor: 'rgba(30,30,36,0)',
            iconColor: '#bc405f',
            iconPadding: '10px',
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: false,
            showFullscreenButton: false,
            showNextButton: true,
            showPrevButton: true,
            showThumbnailsButton: false,
            size: '40px'
        },
        settings: {
            autoplaySpeed: 3000,
            boxShadow: 'none',
            disableKeyboardControls: true,
            disablePanzoom: true,
            disableWheelControls: true,
            hideControlsAfter: 3000,
            lightboxTransitionSpeed: 0.3,
            lightboxTransitionTimingFunction: 'linear',
            overlayColor: 'rgba(30, 30, 30, 0.9)',
            slideAnimationType: 'fade',
            slideSpringValues: [300, 50],
            slideTransitionSpeed: 0.6,
            slideTransitionTimingFunction: 'linear',
            usingPreact: false
        },
        thumbnails: {
            thumbnailsSize: ["90px", "90px"],
            thumbnailsOpacity: 0.4
        },
        caption: {
            captionColor: "rgba(241, 191, 152, 1)"
        },
        progressBar: {
            size: "4px",
            backgroundColor: "rgba(255, 237, 225, 1)",
            fillColor: "#AF9AB2"
        }
    };

    const getResult = async () => {
        const post = await axios.get('http://chakito.com/blog/index.php/wp-json/wp/v2/posts?_embed&slug='+ window.location.pathname.split("/").pop());
        setPost(post.data);
        console.log(post);
        if(post.data[0]){
            document.title=post.data[0].title.rendered;
        }
    };
    useEffect(  () => {
        if(jQuery('.blocks-gallery-grid').length > 0) {
            jQuery('.blocks-gallery-grid li img').each(function () {
                setImages(images => [...images, {'src' : jQuery(this).attr('data-full-url'), 'thumbnail' : jQuery(this).attr('src'), 'title': jQuery(this).attr('alt'), 'description':jQuery(this).next('figcaption').text()?jQuery(this).next('figcaption').text():''}]);
            });

            jQuery('.blocks-gallery-grid').remove();
        }
        jQuery(document).ready(function() {
            jQuery(".SRLContainer").on("contextmenu", function () {
                return false;
            });
            jQuery(".SRLContainer").on("contextmenu", function () {
                return false;
            });
        });
    });
    useEffect(  () => {
        getResult();


    }, [setPost]);

    return (
        <div>
            {post.map((i, index) => {
                const date = new Date(i.date_gmt);
                return (
                    <div key={index} className='post'>
                        <div className='content-container' key={index}>
                            {i._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url?
                                <Container fluid="xl">
                                    <Row className="modal-content-header justify-content-center">
                                        <Col lg={3} md={4} sm={8} xs={12} className="modal-content-thumbnail">
                                            <Image src={i._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} fluid/>
                                        </Col>
                                        <Col lg={8} md={6} sm={8} xs={12} className="modal-content-text">
                                            <h1>{i.title.rendered}</h1>
                                        </Col>
                                    </Row>
                                </Container>
                                : '' }
                            {i.content.rendered?
                                <div className="modal-content-body">
                                    <Container fluid="xl">
                                        <Row className='justify-content-center'>
                                            <Col sm={8} xs={12}>
                                                <div className='content' dangerouslySetInnerHTML={ {__html: i.content.rendered} } />
                                                <div className='board'>
                                                    <SRLWrapper options={options} elements={isFinite()}>
                                                        <Row>
                                                            {images && images.map((i, index) => {
                                                                return (

                                                                <Col className='board-image' lg={3} md={3} sm={3} xs={3} key={index}>
                                                                        <a href={i.src}>
                                                                            <img src={i.thumbnail} />
                                                                        </a>
                                                                    </Col>

                                                                )
                                                            })}
                                                        </Row>

                                                    </SRLWrapper>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                : '' }
                        </div>
                        <Footer/>
                    </div>
                )
            })}
        </div>
    )
};
