import React from "react";
import axios from "axios";
import jQuery from "jquery";
import {Col, Container, Row} from "react-bootstrap";
import Footer from './footer'
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tempname: '',
            email: '',
            phone: '',
            termin: '',
            thema: '',
            message: '',
            issubmitted: false
        }
    }

    componentDidMount() {
        document.title = 'Kontakt';

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method: "POST",
            url:"http://chakito.com/send.php",
            data:  this.state
        }).then((response)=>{
            if (response.data.status === 'success') {
                this.setState({issubmitted: true});
                this.setState({tempname: this.state.name});
                this.setState({name: "", email: "", message: "", phone: "", termin: "", thema: ""})
                jQuery('input, textarea').each(function (i) {
                    jQuery(this).removeClass('leer');
                    jQuery(this).parent().prev('label').find('.required-error').remove();

                });
                jQuery('.contact-message').addClass('show-message');

            } else if (response.data.status === 'fail') {
                this.setState({issubmitted: false});
                jQuery('input, textarea').each(function (i) {
                    if(!jQuery(this).val() && !jQuery(this).hasClass('leer')) {
                        jQuery(this).addClass('leer');
                        jQuery(this).parent().prev('label').append('<span class="required-error"> ist erforderlich</span>')}
                    if(jQuery(this).val() && jQuery(this).hasClass('leer')) {
                        jQuery(this).removeClass('leer');
                        jQuery(this).parent().prev('label').find('.required-error').remove();
                    }
                })
            }
        })

    }

    render() {
        return(
            <div>
                <div className='contact'>
                    <div className='content-container'>

                        <div className="contact-container">
                                <Container fluid="xl">
                                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">

                                    <Row className='justify-content-center align-items-start contact-input'>
                                        <Col className='contact-col' lg={4} md={6} xs={12}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name *</label>
                                                <span className='form-group-span'>
                                                    <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email *</label>
                                                <span className='form-group-span'>
                                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Telefon *</label>
                                                <span className='form-group-span'>
                                                    <input type="number" className="form-control" id="phone" aria-describedby="phoneHelp" value={this.state.phone} onChange={this.onPhoneChange.bind(this)} />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="termin">Wunschtermin *</label>
                                                <span className='form-group-span'>
                                                    <input type="date" className="form-control" id="termin" aria-describedby="terminHelp" value={this.state.termin} onChange={this.onTerminChange.bind(this)} />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col className='contact-col' lg={4} md={6} xs={12}>

                                            <div className="form-group">
                                                <label>Thema</label>
                                                <div onChange={this.onThemaChange.bind(this)}>
                                                    <div className="thema-option my-2">
                                                        <input type="radio" value="Kita" id="kita" name="thema" /><label htmlFor="kita">Kita/Schule</label>
                                                    </div>
                                                    <div className="thema-option my-2">
                                                        <input type="radio" value="Familie" id="familie" name="thema" /><label htmlFor="familie">Familie</label>
                                                    </div>
                                                    <div className="thema-option">
                                                        <input type="radio" value="Taufe" id="taufe" name="thema" /><label htmlFor="taufe">Taufe</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="message">Nachricht</label>
                                                <span className='form-group-span'>
                                                    <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col lg={8} xs={12} className="d-flex align-items-center">
                                            <button type="submit" className="btn">Submit</button>
                                            <div className={this.state.issubmitted?'contact-message show-message':'contact-message'}>
                                                <h3 className=" mx-5 ">{this.state.tempname}, danke für Ihre Nachricht</h3>
                                            </div>
                                        </Col>
                                    </Row>
                                    </form>

                                </Container>
                            <Container fluid="xl">
                                <Row className='justify-content-center'>
                                    <Col lg={8} md={8} xs={12}>

                                    </Col>
                                </Row>
                            </Container>
                            <Container fluid="xl">
                                <Row sm className='mt-3 pt-3 pb-3 justify-content-center pink-background'>
                                    <Col lg={4} md={6} xs={12}>
                                        <h3>
                                            Cecilia Herg GmbH
                                        </h3>
                                        <h3>
                                            Muster Str. 60
                                        </h3>
                                        <h3>
                                            38116 Braunschweig
                                        </h3>
                                    </Col>
                                    <Col lg={4} md={6} xs={12}>
                                        <h3>
                                            T+49 xxx-xxx-xxx-x

                                        </h3>
                                        <h3>
                                            F+49 xxx-xxx-xxx-x
                                        </h3>
                                        <h3>
                                            Einfo@cecilia.de
                                        </h3>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onPhoneChange(event) {
        this.setState({phone: event.target.value})
    }
    onTerminChange(event) {
        this.setState({termin: event.target.value})
    }
    onThemaChange(event) {
        this.setState({thema: event.target.value})
    }
    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
}
