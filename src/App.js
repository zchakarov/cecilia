import 'react-app-polyfill/ie11';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import { withRouter } from "react-router";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from "./components/header";
import Home from "./components/home";
import Contact from './components/contact'
import Article from "./components/article";
import Post from "./components/post";
import Portfolio from './components/portfolio'

import './index.scss';


var dateFormat = require('dateformat');
dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};


/*function Contact() {
    const [name, setName] = useState('');
    const [tempname, setTempname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [issubmitted, setIssubmitted] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    useEffect(() => {
        scrolltop();
        document.title = 'Kontakt';
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://chakito.com/send.php",
            data: values
        }).then((response) => {
            if (response.data.status === 'success') {
                //jQuery('#contact-form').addClass('hide-form');
                setIssubmitted(true);
                setTempname(name);
                setValues({
                        name: '',
                        email: '',
                        message: ''
                    }
                )

                jQuery('input, textarea').each(function (i) {
                    jQuery(this).removeClass('leer');
                    jQuery(this).parent().prev('label').find('.required-error').remove();

                });
                jQuery('.contact-message').addClass('show-message');

            } else if (response.data.status === 'fail') {
                setIssubmitted(false);
                jQuery('input, textarea').each(function (i) {
                    if (!jQuery(this).val() && !jQuery(this).hasClass('leer')) {
                        jQuery(this).addClass('leer');
                        jQuery(this).parent().prev('label').append('<span class="required-error"> ist erforderlich</span>')
                    }
                    if (jQuery(this).val() && jQuery(this).hasClass('leer')) {
                        jQuery(this).removeClass('leer');
                        jQuery(this).parent().prev('label').find('.required-error').remove();
                    }
                })
            }
        })
    }
    const onNameChange = (e) => {
        setValues({ [name]: e.target.value});
    }

    const onEmailChange = (e) => {
        setValues({ [email]: e.target.value});
    }

    const onMessageChange = (e) => {
        setValues({ [message]: e.target.value});
    }
    return(
        <div>
            <div className='contact'>
                <div className='content-container'>
                    <Container fluid="xl">
                        <Row className="justify-content-center modal-content-header">
                            <Col lg={3} md={12} sm={12} xs={12} className="text-center modal-content-text">
                                <h1>Kontakt</h1>
                            </Col>
                        </Row>
                    </Container>
                    <div className="pt-3 contact-container">
                        <form id="contact-form" onSubmit={handleSubmit} method="POST">
                            <Container fluid="xl">
                                <Row className='justify-content-center'>
                                    <Col className='contact-col' lg={4} xs={12}>
                                        <div className="form-group schwarz">
                                            <label htmlFor="name">Name</label>
                                            <span className='form-group-span'>
                                                    <input type="text" className="form-control" id="name" value={name} onChange={onNameChange} />
                                                </span>
                                        </div>
                                        <div className="form-group schwarz">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <span className='form-group-span'>
                                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onEmailChange} />
                                            </span>
                                        </div>
                                    </Col>
                                    <Col className='contact-col' lg={4} xs={12}>
                                        <div className="form-group schwarz">
                                            <label htmlFor="message">Message</label>
                                            <span className='form-group-span'>
                                            <textarea className="form-control" rows="5" id="message" value={message} onChange={onMessageChange} />
                                            </span>
                                        </div>
                                    </Col>
                                    <Col lg={8} xs={12}>
                                        <button type="submit" className="btn">Submit</button>
                                    </Col>
                                </Row>
                            </Container>
                        </form>
                        <Container fluid="xl">
                            <Row className='justify-content-center'>
                                <Col lg={8} md={8} xs={12}>
                                    <div className={issubmitted?'contact-message show-message':'contact-message'}>
                                        <h1>{tempname}, danke für Ihre Nachricht</h1>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container fluid="xl">
                            <Row sm className='mt-3 pt-3 pb-3 justify-content-center pink-background'>
                                <Col lg={4} md={6} xs={12}>
                                    <h2>
                                        Cecilia Herg GmbH
                                    </h2>
                                    <h2>
                                        Muster Str. 60
                                    </h2>
                                    <h2>
                                        38116 Braunschweig
                                    </h2>
                                </Col>
                                <Col lg={4} md={6} xs={12}>
                                    <h2>
                                        T+49 xxx-xxx-xxx-x

                                    </h2>
                                    <h2>
                                        F+49 xxx-xxx-xxx-x
                                    </h2>
                                    <h2>
                                        Einfo@cecilia.de
                                    </h2>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );*/

const App = withRouter(({ location }) => (
    <div className='body-container'>
        <Header />

        <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                classNames="transition-element fade"
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
                timeout={{
                    appear: 300,
                    enter: 300,
                    exit: 300,
                }}
                unmountOnExit={true}
                appear
            >
                <Switch location={location} className='container'>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/kontakt' component={Contact}/>
                    <Route exact path='/datenschutz' component={Article}/>
                    <Route exact path='/ueber-mich' component={Article}/>
                    <Route exact path='/impressum' component={Article}/>

                    <Route exact path='/portfolio' component={Portfolio}/>

                    <Route path='/send' component={() => window.location.href =
                        'https://chakito.com/send.php'}/>
                    <Route path='/:name' component={Post}/>


                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </div>
    )
);

export default App;
