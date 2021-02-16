import {Col, Container, Row} from "reactstrap";
import React, {useState} from "react";
import ThankYouComponent from "./ThankYouComponent";

const addOrder = (addOrder, order, state) => {
    addOrder(order);
    state('added');
}

const OrderConfirmComponent = (props) => {
    const [orderStatus, changeOrderStatus] = useState(null)
    props.cart.map(function (item, i){
        props.cart[i].name = props.goods.filter((product) => product.id === item.id)[0].name;
        props.cart[i].maxQuantity = props.goods.filter((product) => product.id === item.id)[0].quantity - item.quantity;
    })
    let order = {
        name: props.name,
        surname: props.surname,
        tel: props.tel,
        email: props.email,
        delivery: {
            type: props.delivery,
            inputNPState: props.inputNPState,
            inputNP2State: props.inputNP2State
        },
        payment: props.payment,
        products: props.cart
    }

    if(orderStatus === 'added') {
        return (
            <ThankYouComponent goods={props.goods.filter((product) => product.new === 1)}/>
        )
    }
    return(
        <div className="pt-70px font">
            <Container>
                <Row>
                    <Col>
                        <div className="headline-cartP">Последний шаг:)</div>
                        <div>Проверьте данные, пожалуйста</div>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <table className="tableOCP">
                            <thead>
                            <tr>
                                <th>Имя</th>
                                <th>{props.name}</th>
                            </tr>
                            <tr>
                                <th>Фамилия</th>
                                <th>{props.surname}</th>
                            </tr>
                            <tr>
                                <th>Мобильный номер</th>
                                <th>{props.tel}</th>
                            </tr>
                            {props.email ?
                                <tr>
                                    <th>E-mail</th>
                                    <th>{props.email}</th>
                                </tr> :
                                <tr/>
                            }

                            <tr>
                                <th>Товары</th>
                                <th>
                                    {props.cart.map(function (item, i){
                                        return(
                                            <span key={i}>{props.goods.filter((product) => product.id === item.id)[0].name + ', Количество: ' + item.quantity}<br/></span>
                                        )
                                    })}
                                </th>
                            </tr>
                            <tr>
                                <th>Доставка</th>
                                <th>{props.delivery === 'np' ? 'Нова пошта' : 'Самовывоз'}</th>
                            </tr>
                            {props.delivery === 'np' ? (
                                <tr>
                                    <th>Город</th>
                                    <th>{props.inputNPState}</th>
                                </tr>
                            ) : <tr/>}
                            {props.delivery === 'np' ? (
                                <tr>
                                    <th>Номер отделения</th>
                                    <th>{props.inputNP2State}</th>
                                </tr>
                            ) : <tr/>}

                            <tr>
                                <th>Оплата</th>
                                <th>{props.payment === 'cash' ? 'Наложенный платёж' : 'Банковская картка'}</th>
                            </tr>
                            </thead>
                        </table>
                    </Col>
                </Row>
                <Row>
                    <button className="mr-auto ml-auto p-2 toCart-productPage m-3" onClick={() => addOrder(props.addOrder, order, changeOrderStatus)}>
                        Подтвердить заказ
                    </button>
                </Row>
            </Container>
        </div>
    )
}

export default OrderConfirmComponent;