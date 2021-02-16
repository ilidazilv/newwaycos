import {Col, Row} from "reactstrap";
import React from "react";
import {NavLink} from "react-router-dom";

const MouseEnterEvent = (id) => {
    document.getElementById(id).classList.add('scopedProd');
};
const MouseLeaveEvent = (id) => {
    document.getElementById(id).classList.remove('scopedProd');
}

const CreateProd = (props) => {
    return(
        <Col md={3}>
            <NavLink to={'/product/' + props.id} className="simpleLink">
                <div className="overflow-hidden position-relative">
                    {props.quantity === 0 ? <div className="w-100 position-absolute text-center bottom-absolute">Нет в наличии</div> : <div/>}
                    <img src={props.image} onMouseLeave={() => {MouseLeaveEvent("prod" + props.id +"newProdComponent")}} onMouseEnter={() => {MouseEnterEvent("prod" + props.id +"newProdComponent")}} alt={props.name} id={"prod" + props.id +"newProdComponent"} className="w-100"/>
                </div>
                <div className="product-name-home">{props.name}</div>
                <div className="product-price-home">{props.price + '₴'}</div>
            </NavLink>
        </Col>
    )
}

const ShopComponent = (props) => {
    return(
        <div>
            <Row className="text-center mb-3">
                {
                    props.goods.map((item, i) => {
                        if(item.name.toLowerCase().includes(props.search.toLowerCase())){
                            return (
                                <CreateProd  key={i} quantity={item.quantity} image={item.image} id={item.id} name={item.name} price={item.price}/>
                            )
                        } else {
                            return false
                        }
                    })
                }
            </Row>
        </div>
    )
}

export default ShopComponent;