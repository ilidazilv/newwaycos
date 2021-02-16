import {Col, Container, Row} from "reactstrap";
import NewProdListComponent from "./NewProdListComponent";
import {NavLink} from "react-router-dom";

const ThankYouComponent = (props) => {
    return(
        <Container className="pt-70px font">
            <Row>
                <Col>
                    <div className="headline-cartP">Спасибо за ваш заказ:)</div>
                    <hr/>
                    <div className="text-TYC">Наш менеджер скоро свяжется с вами</div>
                    <div className="text-center m-4">
                        <NavLink className="toCart-productPage p-2 m-2" to='/home'>На главную</NavLink>
                        <NavLink className="toCart-productPage p-2 m-2" to='/shop'>Посмотреть весь товар</NavLink>
                    </div>
                    <div className='headline-cartP text-center mt-2'>Новые товары</div>
                    <NewProdListComponent goods={props.goods}/>
                </Col>
            </Row>
        </Container>
    )
}

export default ThankYouComponent;