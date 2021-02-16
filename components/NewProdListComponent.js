import {Col, Row} from "reactstrap";
import {NavLink} from "react-router-dom";
import React from "react";

const MouseEnterEvent = (id) => {
    document.getElementById(id).classList.add('scopedProd');
};
const MouseLeaveEvent = (id) => {
    document.getElementById(id).classList.remove('scopedProd');
}

const CreateMobileProd = (props) => {
    return(
        <div className={props.number === 1 ? "carousel-item active" : "carousel-item"}>
            <Col>
                <NavLink to={'/product/' + props.id} className="simpleLink">
                    <div className="overflow-hidden">
                        <img src={props.image} onMouseLeave={() => {MouseLeaveEvent("prod" + props.id +"newProdComponent")}} onMouseEnter={() => {MouseEnterEvent("prod" + props.id +"newProdComponent")}} alt={props.name} id={"prod" + props.id +"newProdComponent"} className="w-100"/>
                    </div>
                    <div className="product-name-home">{props.name}</div>
                    <div className="product-price-home">{props.price + '₴'}</div>
                </NavLink>
            </Col>
        </div>
    )
}

const CreateMobileList = (props) => {
    return (
        props.goods.map((item, i) => {
            return (
                <CreateMobileProd number={i} key={i} image={item.image} id={item.id} name={item.name} price={item.price}/>
            )
        })
    )
}


const CreateDesktopProd = (props) => {
    return(
        <Col md={3}>
            <NavLink to={'/product/' + props.id} className="simpleLink">
                <div className="overflow-hidden">
                    <img src={props.image} onMouseLeave={() => {MouseLeaveEvent("prod" + props.id +"newProdComponent")}} onMouseEnter={() => {MouseEnterEvent("prod" + props.id +"newProdComponent")}} alt={props.name} id={"prod" + props.id +"newProdComponent"} className="w-100"/>
                </div>
                <div className="product-name-home">{props.name}</div>
                <div className="product-price-home">{props.price + '₴'}</div>
            </NavLink>
        </Col>
    )
}

const CreateDesktopList = (props) => {
    return props.goods.map((item, i) => {
        return (
            <CreateDesktopProd  key={i} image={item.image} id={item.id} name={item.name} price={item.price}/>
        )
    })
}

const NewProdListComponent = (props) => {

    return(
        <div>
            <Row className="text-center">
                {document.documentElement.clientWidth <= 767 ? (
                    <div id="carouselExampleIndicators" className="carousel slide slider-home-newProd pb-2 text-center" data-ride="carousel">
                        <div className="carousel-inner">
                            <CreateMobileList  goods={props.goods}/>
                        </div>
                    </div>

                ) : <CreateDesktopList goods={props.goods}/>}
            </Row>
        </div>
    )
}

export default NewProdListComponent;