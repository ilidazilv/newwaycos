import {Row, Col, Container} from "reactstrap";
import {NavLink} from "react-router-dom";
import {AiOutlineInstagram} from "@react-icons/all-files/ai/AiOutlineInstagram";
import {AiFillFacebook} from "@react-icons/all-files/ai/AiFillFacebook";
import {AiOutlineCopyrightCircle} from "@react-icons/all-files/ai/AiOutlineCopyrightCircle";

const FooterComponent = () => {
    return(
        <div className="w-100 p-3 footer">
            <Container>
                <Row>
                    <Col  md={3}>
                        <img className={document.documentElement.clientWidth >= 768 ? "w-75 float-right" : "w-50 pt-2 pb-2 d-block mr-auto ml-auto"} alt="logo" src="/images/logo_transparent.png"/>
                    </Col>
                    <Col md={3} className="text-center">
                        <NavLink to="/home" className="d-block link p-1">
                            Главная
                        </NavLink>
                        <NavLink to="/shop" className="d-block link p-1">
                            Товары
                        </NavLink>
                        <NavLink to="/about" className="d-block link p-1">
                            О нас
                        </NavLink>
                    </Col>
                    <Col md={3} className="text-center">
                        <NavLink to="/search" className="d-block link p-1">
                            Поиск
                        </NavLink>
                        <NavLink to="/cart" className="d-block link p-1">
                            Корзина
                        </NavLink>
                        <NavLink to="/faq" className="d-block link p-1">
                            FAQ
                        </NavLink>
                    </Col>
                    <Col md={3} className="text-center text-white footer-text-size">
                        <a rel="noreferrer" href="https://www.instagram.com/newwaycos/" target="_blank" className="link"><AiOutlineInstagram/></a>
                        <a rel="noreferrer" href="https://www.facebook.com/New-Way-Cosmetics-100544935368207/" target="_blank" className="link"><AiFillFacebook/></a>
                    </Col>
                </Row>
                <Col md={12} className="text-center pt-4 text-white">
                    <AiOutlineCopyrightCircle/>
                    New Way Cosmetics 2021
                </Col>
            </Container>
        </div>
    )
}

export default FooterComponent;