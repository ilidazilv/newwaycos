import {Container, Row, Col} from "reactstrap";
import {AiOutlineMinusCircle} from "@react-icons/all-files/ai/AiOutlineMinusCircle";
import {AiOutlinePlusCircle} from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import React from 'react';
import parse from 'html-react-parser';
import {LoadingComponent} from "../components/LoadingComponent";
import NewProdListComponent from "../components/NewProdListComponent";
import AddedToCartComponent from "../components/AddedToCartComponent";


const ButtonPP = (step, price, quantity, prodPrice) => {
    if(step === 'up'){
        quantity.stepUp();
    } else if (step === 'down'){
        quantity.stepDown();
    }
    price.innerText = prodPrice * quantity.value + '₴';
}

const ImageChangePP = (image, image1, image2, image3, image4, next) => {
    image.src = next.src;
    image1.classList.remove('product-image-PP-active');
    image2.classList.remove('product-image-PP-active');
    image3.classList.remove('product-image-PP-active');
    image4.classList.remove('product-image-PP-active');
    next.classList.add('product-image-PP-active');
}



const ProductPage = (props) =>{
    let productImagePP = null;
    let productImage1PP, productImage2PP, productImage3PP, productImage4PP = null;
    let pricePP = null;
    let quantityPP = null;
    if(props.productIsLoading){
        return <LoadingComponent className="pt-70px"/>
    } else {
        return(
            <Container className="pt-70px">
                <AddedToCartComponent handlePopups={props.handlePopups} show={props.popups && props.popups.addToCart === true}/>
                <Row className="pt-5">
                    <Col md={6}>
                        <img className="w-100 product-image-main-PP" ref={(input) => productImagePP = input} alt={props.product.name} src={props.product.image}/>
                        {props.product.image2 ? <img className="product-image-PP product-image-PP-active" onClick={() => ImageChangePP(productImagePP, productImage1PP, productImage2PP, productImage3PP, productImage4PP, productImage1PP)} ref={(input) => productImage1PP = input} alt={props.product.name} src={props.product.image}/> : <div/>}
                        {props.product.image2 ? <img className="product-image-PP" onClick={() => ImageChangePP(productImagePP, productImage1PP, productImage2PP, productImage3PP, productImage4PP, productImage2PP)} ref={(input) => productImage2PP = input} alt={props.product.name} src={props.product.image2}/> : <div/>}
                        {props.product.image3 ? <img className="product-image-PP" onClick={() => ImageChangePP(productImagePP, productImage1PP, productImage2PP, productImage3PP, productImage4PP, productImage3PP)} ref={(input) => productImage3PP = input} alt={props.product.name} src={props.product.image3}/> : <div/>}
                        {props.product.image4 ? <img className="product-image-PP" onClick={() => ImageChangePP(productImagePP, productImage1PP, productImage2PP, productImage3PP, productImage4PP, productImage4PP)} ref={(input) => productImage4PP = input} alt={props.product.name} src={props.product.image4}/> : <div/>}
                    </Col>
                    <Col md={6}>
                        <div className="text-center product-name-productPage pt-2">
                            {props.product.name}
                        </div>
                        <div className='text-center headline-productPage'>
                            Характеристики
                        </div>
                        <div className="product-shortDescription-productPage">
                            <div className="d-block">
                                <span className="float-left">Категория:</span>
                                <span className="float-right">{props.product.category}</span>
                            </div>
                            <div className="clearfix"/>
                            <div className="d-block">
                                <span className="float-left">Бренд:</span>
                                <span className="float-right">{props.product.brand}</span>
                            </div>
                            <div className="clearfix"/>
                            <div className="d-block">
                                <span className="float-left">Косметика для:</span>
                                <span className="float-right">{props.product.forBody}</span>
                            </div>
                            <div className="clearfix"/>
                            <div className="d-block">
                                <span className="float-left">Назначение:</span>
                                <span className="float-right">{props.product.for}</span>
                            </div>
                            <div className="clearfix"/>
                            <div className="d-block">
                                <span className="float-left">Страна:</span>
                                <span className="float-right">{props.product.country}</span>
                            </div>
                            <div className="clearfix"/>
                            <div className="d-block">
                                <span className="float-left">Классификация:</span>
                                <span className="float-right">{props.product.class}</span>
                            </div>
                            <div className="clearfix"/>
                        </div>
                        {props.product.quantity !== 0 ? (
                            <div className='pt-3 pl-2 pr-2'>
                                <button className="toCart-productPage" type="button" onClick={() => props.addToCart(props.product.id, quantityPP.value)}>В корзину</button>
                                <div className="d-inline ml-4">
                                    <button className="border-0 bg-white m-0 p-0" onClick={() => ButtonPP('down', pricePP, quantityPP, props.product.price)}>
                                        <AiOutlineMinusCircle />
                                    </button>
                                    <input readOnly ref={(input) => {quantityPP = input}} id="quantityProductPage" onChange={() => {alert('d')}}  className="ml-1 mr-1 border-0 p-0 text-center" type="number" defaultValue="1" min="1" max={props.product.quantity}/>
                                    <button className="border-0 bg-white m-0 p-0"  onClick={() => ButtonPP('up', pricePP, quantityPP, props.product.price)}>
                                        <AiOutlinePlusCircle />
                                    </button>
                                </div>
                                <span ref={(input) =>{ pricePP = input}} className="float-right product-price-productPage">{props.product.price + '₴'}</span>
                                <div className="clearfix"/>
                            </div>
                        ) : (
                            <div className="text-center font pt-3">
                                Нет в наличии
                            </div>
                        )}

                    </Col>
                </Row>

                <Row className="description-productPage pt-2">
                    <Col>
                        <h1 className="w-100 text-center">Описание</h1>
                        <div id='forParser'>
                            {parse(props.product.description)}
                        </div>
                    </Col>
                </Row>

                <Row className="description-productPage pt-2">
                    <Col>
                        <h1 className='w-100 text-center'>Похожие товары</h1>
                        <NewProdListComponent goods={props.products.filter((item) => item.category === props.product.category && item.id !== props.product.id)}/>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default ProductPage;