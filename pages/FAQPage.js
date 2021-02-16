import {Col, Container, Row} from "reactstrap";
import {AiOutlinePlusCircle} from "@react-icons/all-files/ai/AiOutlinePlusCircle";
import {AiOutlineMinusCircle} from "@react-icons/all-files/ai/AiOutlineMinusCircle";

const FAQHandle = (plusB, minusB, text) => {
    if(minusB.classList.contains('d-none')){
        minusB.classList.remove('d-none');
        plusB.classList.add('d-none');
        text.classList.remove('d-none');
        text.classList.add('container-faqP');
        text.classList.remove('container-faqP-revert');
    } else {
        minusB.classList.add('d-none');
        plusB.classList.remove('d-none');
        text.classList.add('container-faqP-revert');
        setTimeout(function (){text.classList.add('d-none');}, 250);
        text.classList.remove('container-faqP');
    }
}

const QuestionCreation = (props) => {
    let textFAQP, minusFAQP, plusFAQP;
    return(
        <Row className="p-3" role="button"  onClick={() => FAQHandle(plusFAQP, minusFAQP, textFAQP)}>
            <Col md={12} className="headline-faqP text-center ">
                <Row>
                    <Col xs={10} md={10}>{props.headline}</Col>
                    <div className="col-2 align-self-center" ref={(input) => plusFAQP = input} ><AiOutlinePlusCircle/></div>
                    <div  className="d-none col-2 align-self-center" ref={(input) => minusFAQP = input}><AiOutlineMinusCircle/></div>
                </Row>
            </Col>

            <div className="col-12 text-center text-faqP p-4 d-none" ref={(input) => textFAQP = input}>
                {props.text}
            </div>
        </Row>
    )
}

const FAQPage = () => {
    return(
        <Container className="pt-70px font">
            <div className="headline-text">FAQs</div>
            <QuestionCreation headline="Как оформить заказ?" text="Оформить заказ можно в инстаграме, или же выбрать на сайте интересующий товар и оформить заказ"/>
            <QuestionCreation headline="Как оплатить заказ?" text="Оплатить Ваш заказ, возможно наличным и безналичным расчетом. Безналичный - это наложенный платёж"/>
            <QuestionCreation headline="Могу ли я рассчитаться за товар картой Приватбанка?" text="Приобретая товар в магазине, Вы можете оплатить свою покупку картой Приватбанка."/>
            <QuestionCreation headline="Как доставляется товар?" text="Доставка по Украине осуществляется службою «Новая Почта»,"/>
            <QuestionCreation headline="Можно ли вернуть купленный товар?" text="Да, для этого напишите нам инстграм или позвоните менеджеру"/>
        </Container>
    )
}

export default FAQPage;

