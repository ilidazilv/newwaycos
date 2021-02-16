import {Row, Col} from "reactstrap";
import React from "react";
import {NavLink} from "react-router-dom";

const MouseEnterEvent = (id) => {
    document.getElementById(id).classList.add('scopedProd');
};
const MouseLeaveEvent = (id) => {
    document.getElementById(id).classList.remove('scopedProd');
}

const DesktopList = () => {
    return(
        <Row className="text-center">
            <Col md={3}>
                <NavLink to='/product/1' className="simpleLink">
                    <div className="overflow-hidden">
                        <img src="/images/products/product1.jpg" onMouseLeave={() => {MouseLeaveEvent('prod1newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod1newProdComponent')}} alt="product1" id="prod1newProdComponent" className="w-100"/>
                    </div>
                    <div className="product-name-home">Petitfee & Koelf Ruby & Bulgarian Rose Eye Patch</div>
                    <div className="product-price-home">330.00₴</div>
                </NavLink>
            </Col>
            <Col md={3}>
                <NavLink to='/product/1' className="simpleLink">
                    <div className="overflow-hidden">
                        <img src="/images/products/product2.png" onMouseLeave={() => {MouseLeaveEvent('prod2newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod2newProdComponent')}} alt="product2" id="prod2newProdComponent" className="w-100"/>
                    </div>
                    <div className="product-name-home">Vaseline Original</div>
                    <div className="product-price-home">65.00₴</div>
                </NavLink>
            </Col>
            <Col md={3}>
                <NavLink to='/product/1' className="simpleLink">
                    <div className="overflow-hidden">
                        <img src="/images/products/product3.jpg" onMouseLeave={() => {MouseLeaveEvent('prod3newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod3newProdComponent')}} alt="product3" id="prod3newProdComponent" className="w-100"/>
                    </div>
                    <div className="product-name-home">Laneige Cica Sleeping Mask</div>
                    <div className="product-price-home">400.00₴</div>
                </NavLink>
            </Col>
            <Col md={3}>
                <NavLink to='/product/1' className="simpleLink">
                    <div className="overflow-hidden">
                        <img src="/images/products/product4.jpg" onMouseLeave={() => {MouseLeaveEvent('prod4newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod4newProdComponent')}} alt="product4" id="prod4newProdComponent" className="w-100"/>
                    </div>
                    <div className="product-name-home">Elizavecca Milky Piggy</div>
                    <div className="product-price-home">250.00₴</div>
                </NavLink>
            </Col>
        </Row>
    )
};

const MobileList = () => {
    return(
        <div id="carouselExampleIndicators" className="carousel slide slider-home-newProd pb-2 text-center" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Col>
                        <NavLink to='/product/1' className="simpleLink">
                            <div className="overflow-hidden">
                                <img src="/images/products/product1.jpg" onMouseLeave={() => {MouseLeaveEvent('prod1newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod1newProdComponent')}} alt="product1" id="prod1newProdComponent" className="w-100"/>
                            </div>
                            <div className="product-name-home">Petitfee & Koelf Ruby & Bulgarian Rose Eye Patch</div>
                            <div className="product-price-home">330.00₴</div>
                        </NavLink>
                    </Col>
                </div>
                <div className="carousel-item">
                    <Col>
                        <NavLink to='/product/1' className="simpleLink">
                            <div className="overflow-hidden">
                                <img src="/images/products/product2.png" onMouseLeave={() => {MouseLeaveEvent('prod2newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod2newProdComponent')}} alt="product2" id="prod2newProdComponent" className="w-100"/>
                            </div>
                            <div className="product-name-home">Vaseline Original</div>
                            <div className="product-price-home">65.00₴</div>
                        </NavLink>
                    </Col>
                </div>
                <div className="carousel-item">
                    <Col>
                        <NavLink to='/product/1' className="simpleLink">
                            <div className="overflow-hidden">
                                <img src="/images/products/product3.jpg" onMouseLeave={() => {MouseLeaveEvent('prod3newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod3newProdComponent')}} alt="product3" id="prod3newProdComponent" className="w-100"/>
                            </div>
                            <div className="product-name-home">Laneige Cica Sleeping Mask</div>
                            <div className="product-price-home">400.00₴</div>
                        </NavLink>
                    </Col>
                </div>
                <div className="carousel-item">
                    <Col>
                        <NavLink to='/product/1' className="simpleLink">
                            <div className="overflow-hidden">
                                <img src="/images/products/product4.jpg" onMouseLeave={() => {MouseLeaveEvent('prod4newProdComponent')}} onMouseEnter={() => {MouseEnterEvent('prod4newProdComponent')}} alt="product4" id="prod4newProdComponent" className="w-100"/>
                            </div>
                            <div className="product-name-home">Elizavecca Milky Piggy</div>
                            <div className="product-price-home">250.00₴</div>
                        </NavLink>
                    </Col>
                </div>
            </div>

        </div>
    )
}

const ProdListComponent = () => {
    return(
        document.documentElement.clientWidth >= 768 ? <DesktopList/> : <MobileList/>
    )
};

export default ProdListComponent;