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
import Services from "./components/services";
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
                    appear: 900,
                    enter: 600,
                    exit: 600,
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

                    <Route exact path='/kindergarten/galerie' component={Portfolio}/>
                    <Route exact path='/schule/galerie' component={Portfolio}/>
                    <Route exact path='/familie/galerie' component={Portfolio}/>
                    <Route exact path='/taufe/galerie' component={Portfolio}/>

                    <Route exact path='/kindergarten/services' component={Services}/>
                    <Route exact path='/schule/services' component={Services}/>
                    <Route exact path='/familie/services' component={Services}/>
                    <Route exact path='/taufe/services' component={Services}/>

                    <Route path='/:name' component={Post}/>


                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </div>
    )
);

export default App;
