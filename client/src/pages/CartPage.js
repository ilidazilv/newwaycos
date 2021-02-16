import {Col, Container, Row} from "reactstrap";
import {AiOutlineMinusCircle} from "@react-icons/all-files/ai/AiOutlineMinusCircle";
import {AiOutlinePlusCircle} from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import React, {useState} from 'react';
import {AiOutlineClose} from "@react-icons/all-files/ai/AiOutlineClose";
import {LoadingComponent} from "../components/LoadingComponent";
import OrderConfirmComponent from "../components/OrderConfirmComponent";


const PaymentHandle = (card, state) => {
    if(card.checked){
        state('card');
    } else {
        state('cash');
    }
}


const ButtonCP = (step, price, quantity, prodPrice, sum, sumChange, id, changeQuantity) => {
    if(step === 'up'){
        quantity.stepUp();

        changeQuantity(id, quantity.value);
    } else if (step === 'down'){
        quantity.stepDown();

        changeQuantity(id, quantity.value);
    }
    price.innerText = prodPrice * quantity.value + '₴';

}

const DeliveryHandle = (deliveryNPCP, deliveryCP, checkbox2CP, state, inputNP, inputNP2) =>{

    if(checkbox2CP.checked){
        deliveryNPCP.classList.remove('d-none');
        deliveryCP.classList.add('d-none');
        inputNP.required = true;
        inputNP2.required = true;
        state('np');
    } else{
        deliveryNPCP.classList.add('d-none');
        deliveryCP.classList.remove('d-none');
        inputNP.required = false;
        inputNP2.required = false;
        state('takeout');
    }
}

const ProdList = (props) => {
    let quantityCP, priceCP;
    return(
        <Row className="pt-2" onLoad={() => props.sumChange(props.sum + props.product.price * quantityCP.value)}>
            <Col md={2} xs={2} className="d-flex">
                <img src={props.product.image} className="w-100 align-self-center" alt="product"/>
            </Col>
            <Col md={3} xs={3} className="d-flex">
                <span className="align-self-center">{props.product.name}</span>
            </Col>
            <Col md={3} xs={4} className="d-flex ">
                <div className="d-inline ml-4 align-self-center">
                    <button className="border-0 bg-white m-0 p-0" onClick={() => ButtonCP('down', priceCP, quantityCP, props.product.price, props.sum, props.sumChange, props.product.id, props.changeQuantity)}>
                        <AiOutlineMinusCircle />
                    </button>
                    <input readOnly ref={(input) => {quantityCP = input}} className="ml-1 mr-1 border-0 p-0 text-center" type="number" defaultValue={props.quantity} min="1" max={props.product.quantity}/>
                    <button className="border-0 bg-white m-0 p-0"  onClick={() => ButtonCP('up', priceCP, quantityCP, props.product.price, props.sum, props.sumChange, props.product.id, props.changeQuantity)}>
                        <AiOutlinePlusCircle />
                    </button>
                </div>
            </Col>
            <Col md={3} xs={2} className="d-flex p-0">
                <span ref={(input) =>{ priceCP = input}} className="float-right product-price-productPage align-self-center">{props.product.price * props.quantity + '₴'}</span>
            </Col>
            <Col md={1} xs={1} className="d-flex p-0">
                <button className="border-0 bg-white m-0 p-0 align-self-center"  onClick={() => props.deleteFromCart(props.product.id)}>
                    <AiOutlineClose className="" />
                </button>
            </Col>
        </Row>
    )
}

const EmailValidation = (e, state) =>{
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)){
        state(e.target.value);
        e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity("Введите правильный e-mail");
    }
}

const CartPage = (props) => {
    let checkbox2CP, deliveryNPCP, deliveryCP, paymentCardCP, inputNP, inputNP2;
    const [delivery, deliveryChange] = useState('np');
    const [sum, sumChange] = useState(0);
    const [name, changeName] = useState(null);
    const [surname, changeSurname] = useState(null);
    const [tel, changeTel] = useState(null);
    const [email, changeEmail] = useState(null);
    const [payment, changePayment] = useState('card');
    const [redirect, changeRedirect] = useState(false);
    const [inputNPState, changeInputNPState] = useState(null);
    const [inputNP2State, changeInputNP2State] = useState(null);
    if(props.productIsLoading){
        return <LoadingComponent className="pt-70px"/>
    }
    if(redirect){
        return (
            <OrderConfirmComponent goods={props.goods} changeStatus={props.changeStatus} addOrder={props.addOrder} cart={props.cart.cart} payment={payment} delivery={delivery} name={name} surname={surname} tel={tel} email={email} inputNPState={inputNPState} inputNP2State={inputNP2State}/>
            )
    }
    return(
        <div className="pt-70px">
            <Container>
                <form className="row" onSubmit={() => changeRedirect(true)}>
                    <Col md={6}>
                        <p className="text-center headline-cartP">Продукты в корзине:</p>
                        <div className="product-cartP">
                            {props.cart.cart.map(function (item, i){
                                return <ProdList deleteFromCart={props.deleteFromCart} changeQuantity={props.changeQuantity} key={i} quantity={item.quantity} sum={sum} sumChange={sumChange} product={props.goods.filter((product) => product.id === item.id)[0]}/>
                            })}
                            {props.cart.cart.length === 0 ? <div className='text-center font'>Пусто :(</div> : <div/>}
                            <div className="pt-2 text-right w-100 product-price-productPage">{sum}₴</div>
                        </div>
                    </Col>
                    <Col md={6} className="text-form-cartP">
                        <div className="text-center headline-cartP">Оформление заказа:</div>
                        <input required name="name" onChange={e => changeName(e.target.value)} placeholder="Имя" className="input-aboutP w-100 pt-2" type="text"/>
                        <input required name="surname" onChange={e => changeSurname(e.target.value)} placeholder="Фамилия" className="input-aboutP w-100 pt-2" type="text"/>
                        <input required name="tel" onChange={e => changeTel(e.target.value)} placeholder="Мобильный номер" className="input-aboutP w-100 pt-2" type="number"/>
                        <input name="email" onChange={e => EmailValidation(e, changeEmail)} placeholder="Почта" className="input-aboutP w-100 pt-2" type="text"/>
                        <hr/>
                        <div>Способ доставки:</div>
                        <div className="pt-2">
                            <input onChange={() => DeliveryHandle(deliveryNPCP, deliveryCP, checkbox2CP, deliveryChange, inputNP, inputNP2)} name="delivery" id="delivery-radio-1" className="mr-1" type="radio"/>
                            <label htmlFor="delivery-radio-1">Самовывоз</label>
                        </div>
                        <div >
                            <input onChange={() => DeliveryHandle(deliveryNPCP, deliveryCP, checkbox2CP, deliveryChange, inputNP, inputNP2)} ref={(input) => {checkbox2CP = input}} name="delivery" id="delivery-radio-2" className="mr-1" type="radio" defaultChecked/>
                            <label htmlFor="delivery-radio-2">Нова Пошта</label>
                        </div>
                        <div ref={(input) => {deliveryNPCP = input}} className="pt-2 ">
                            <input onChange={(e) => changeInputNPState(e.target.value)} required ref={(input) => inputNP = input} name="city" placeholder="Город" className="input-aboutP w-100 pt-2" type="text"/>
                            <input onChange={(e) => changeInputNP2State(e.target.value)} required ref={(input) => inputNP2 = input} name="npNumber" placeholder="Номер отделения" className="input-aboutP w-100 pt-2" type="text"/>
                        </div>
                        <div ref={(input) => {deliveryCP = input}} className="pt-2 d-none ">
                            Самовывоз возмежен только в городе Житомир
                        </div>
                        <hr/>
                        <div>Способ оплаты:</div>
                        <div>
                            <input name="payment" id="payment-radio-1" onChange={() => PaymentHandle(paymentCardCP, changePayment)} className="mr-1" type="radio"/>
                            <label htmlFor="payment-radio-1">Наложенный платёж</label>
                        </div>
                        <div>
                            <input name="payment" id="payment-radio-2" onChange={() => PaymentHandle(paymentCardCP, changePayment)} ref={(input) => paymentCardCP = input} className="mr-1" type="radio" defaultChecked/>
                            <label htmlFor="payment-radio-2">Банковская карта</label>
                        </div>
                        <div  className="w-100 text-center  p-2">
                            <button className="mr-auto ml-auto p-2 toCart-productPage" type="submit">
                                Подтвердить заказ
                            </button>
                        </div>
                    </Col>
                </form>
            </Container>
        </div>
    )
}

export default CartPage;