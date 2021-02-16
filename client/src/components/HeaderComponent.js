import React, {useState} from 'react';
import {Row, Container} from 'reactstrap';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';
import '../style/animations.css';
import {NavLink} from "react-router-dom";
import {AiOutlineSearch} from "@react-icons/all-files/ai/AiOutlineSearch";
import {AiOutlineShoppingCart} from "@react-icons/all-files/ai/AiOutlineShoppingCart";





const LinksDesktop = () =>{
    const [searchProd, setSearchProd] = useState('');
    function handleChange({target}){
        setSearchProd(target.value);

    }

    return(
        <div className="float-right d-flex h-100">
            <NavLink to='/home' className="align-self-center text-center m-2 link">
                <span>Главная</span>
            </NavLink>
            <NavLink to='/shop' className="align-self-center text-center m-2 link">
                <span>Товары</span>
            </NavLink>
            <NavLink to='/about' className="align-self-center text-center m-2 link">
                <span>О нас</span>
            </NavLink>
            <input onChange={handleChange} name="search"  className="align-self-center input-header animated_search" type='text' placeholder="Что будем искать?:)"/>
            <NavLink to={{
                pathname: '/shop',
                props: {
                    searchProd: searchProd
                }
            }}  className="align-self-center text-center m-2 link">
                <AiOutlineSearch/>
            </NavLink>
            <NavLink to='/cart' className="align-self-center text-center m-2 link">
                <AiOutlineShoppingCart/>
            </NavLink>
        </div>
    )
};

const ButtonClick = () => {
    if(document.getElementById('mobileMenuDiv').classList.contains('d-none')){
        document.getElementById('mobileMenuDiv').className = 'animated w-100';
    } else {
        document.getElementById('mobileMenuDiv').className = 'd-none';
    }

};

const LinksMobile = () => {
    return(
        <div className="float-right d-flex h-100">
            <AiOutlineMenu onClick={ButtonClick} className="align-self-center"/>
        </div>

    )
};

const ScrollHandle = () =>{
    document.addEventListener('scroll', function (){
        if(window.scrollY === 0 && document.documentElement.clientWidth >= 768){
            document.getElementById('header').classList.add('header-animation-revert');
            if(document.getElementById('header').classList.contains('header-animation')){
                document.getElementById('header').classList.remove('header-animation');
            }
        } else if(document.getElementById('header').classList.contains('header-animation-revert') && document.documentElement.clientWidth >= 768) {
            document.getElementById('header').classList.remove('header-animation-revert');
            document.getElementById('header').classList.add('header-animation');
        }
    });
}

const HeaderComponent = () => {
    ScrollHandle();
    return (
        <Row className="m-0 p-2 position-fixed w-100 header-style header-animation-revert" id='header' >
            <Container>
                {document.documentElement.clientWidth >= 768 ? <LinksDesktop/> : <LinksMobile/>}
                <NavLink to='/home' className="float-left">
                    <img  alt='headerLogo' src="/images/logo_transparent.png" className="header-logo"/>
                </NavLink>
            </Container>
            <Container className='d-none' id="mobileMenuDiv">
                <Row>
                    <NavLink to='/home' onClick={ButtonClick} className="align-self-center text-center m-2 col-12 link">Главная</NavLink>
                    <NavLink to='/shop' onClick={ButtonClick} className="align-self-center text-center m-2 col-12 link">Товары</NavLink>
                    <NavLink to='/about' onClick={ButtonClick} className="align-self-center text-center m-2 col-12 link">О нас</NavLink>
                    <NavLink to='/shop' onClick={ButtonClick} className="align-self-center text-center m-2 col-12 link">
                        <AiOutlineSearch/>
                    </NavLink>
                    <NavLink to='/cart' onClick={ButtonClick} className="align-self-center text-center m-2 col-12 link">
                        <AiOutlineShoppingCart/>
                    </NavLink>
                </Row>
            </Container>
        </Row>
    )
};

export default HeaderComponent;