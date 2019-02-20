import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import ReactSVG from 'react-svg';
import { withCookies, Cookies } from 'react-cookie';
import { hotjar } from '../HotJar/HotJar'

import { GitHubLink } from '..';

import css from './header.css';
import cookieImg from './../../images/cookie.png'
import cookieAcceptImg from './../../images/cookie-accept.png'

class Header extends Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeNewsBar = this.closeNewsBar.bind(this);
    const { cookieValue } =
      this.state = {
        mobileMenu: false,
        visibleNewsBar: cookies.get('newsbar') ? false : true,
        visiblePrivacyPolicyBar: cookies.get('privacypolicybar') ? false : true,
        sticky: false,
        scrollDirection: 'bottom',
        lastScrollPos: null
      }
  }

  runHotJar = () => {
    hotjar.initialize(716251, 6)
  }

  toggleMenu = () => {
    this.setState(({ mobileMenu }) => ({ mobileMenu: !mobileMenu }))
  };

  closeMenu = () => {
    this.setState({ mobileMenu: false });
  }

  closeNewsBar = () => {
    const { cookies } = this.props;
    const maxAge = 14 * (24 * 3600);
    cookies.set('newsbar', 1, { path: '/', maxAge: maxAge });
    this.setState({ visibleNewsBar: false });
  }

  closePrivacyPolicyBar = () => {
    const { cookies } = this.props;
    const maxAge = 30 * (24 * 3600);
    cookies.set('privacypolicybar', 1, { path: '/', maxAge: maxAge });
    this.setState({ visiblePrivacyPolicyBar: false });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this), false);
  }

  handleScroll = (event) => {
    const scrollPosition = window.scrollY;
    if (this.state.lastScrollPos > scrollPosition) {
      this.setState({
        scrollDirection: 'top',
        lastScrollPos: scrollPosition
      });
    } else if (this.state.lastScrollPos < scrollPosition) {
      this.setState({
        scrollDirection: 'bottom',
        lastScrollPos: scrollPosition
      });
    }
    if (scrollPosition > 120) { this.setState({ sticky: true }); } else { this.setState({ sticky: false }); }
  }

  render() {
    return (
      <header className={this.state.sticky ? ('sticky ' + this.state.scrollDirection) : null}>
        {this.state.visibleNewsBar ?
          <div className="news">
            <div className="content">
              <a href="https://medium.com/p/1330f2151585" target="_blank">Saleor 2.0 release is out. <span className="text-underline">Check out what's new!</span></a>
              <div className="close-icon" onClick={this.closeNewsBar}></div>
            </div>
          </div> : null}
        <div className="container">
          <div className="grid">
            <div className={this.state.mobileMenu ? 'logo open col-xs-3 col-ls-6 col-sm-6 col-md-3 col-lg-6 col-xlg-8' : 'logo col-xs-3 col-sm-6 col-md-3 col-lg-6 col-xlg-8'}>
              <NavLink to="/" aria-label="Saleor Logo"><ReactSVG className="logo-svg" path="images/saleor-logo.svg" /></NavLink>
            </div>
            <nav className={this.state.visibleNewsBar ? 'menu newsbar col-xs-9 col-ls-6 col-sm-6 col-md-9 col-lg-6 col-xlg-4' : 'menu col-xs-9 col-sm-6 col-md-9 col-lg-6 col-xlg-4'}>
              <ul className={this.state.mobileMenu ? 'menu-mobile hovered' : 'menu-desktop'}>
                <li><span className="count">01. </span><NavLink exact to="/" onClick={this.closeMenu}>Home</NavLink></li>
                <li className="underline"><span className="count">02. </span><NavLink to="/features" onClick={this.closeMenu}>Features</NavLink></li>
                <li className="underline"><span className="count">03. </span><NavLink to="/roadmap" onClick={this.closeMenu}>Roadmap</NavLink></li>
                <li className="underline"><span className="count">04. </span><a href="https://docs.getsaleor.com" target="_blank" rel="noopener">Docs</a></li>
                <li className="underline"><span className="count">05. </span><a href="#open-source" onClick={this.closeMenu}>Community</a></li>
                <li className="underline"><span className="count">06. </span><a href="https://medium.com/saleor" target="_blank" rel="noopener">Blog</a></li>
                <li className="github-link"><GitHubLink owner="mirumee" name="saleor" /></li>
                <li><span className="count">07. </span><a className={this.state.mobileMenu ? null : 'contactBtn'} href="https://mirumee.typeform.com/to/Xwfril">Contact Us</a></li>
              </ul>
              <ul className="mobile-btn">
                <li className={this.state.mobileMenu ? 'github-link open' : 'github-link'} onClick={this.toggleMenu}><GitHubLink owner="mirumee" name="saleor" /></li>
                <li className={this.state.mobileMenu ? 'menu-icon open' : 'menu-icon'} onClick={this.toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {this.state.visiblePrivacyPolicyBar ?
          <div className="notification">
            <div className="content">
              <img className="cookieImg" src={cookieImg} />
              <p className="privacyPolicyText">By accepting our usage of third-party software such as HotJar, you help us to deliver a better website experience to all our users. To see our full privacy policy, <a href="https://getsaleor.com/privacy-policy-terms-and-conditions/" target="_blank">click here.</a></p>
              <h5 className="acceptButton" onClick={this.closePrivacyPolicyBar}>ACCEPT</h5>
              <img className="cookieAcceptImg" src={cookieAcceptImg} onClick={this.closePrivacyPolicyBar} />
            </div>
          </div> : this.runHotJar()}
      </header>
    );
  }
}

export default withRouter(withCookies(Header));