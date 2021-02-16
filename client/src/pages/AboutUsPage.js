import {Col, Container, Modal, ModalBody, Row, ModalFooter} from "reactstrap";
import {AiFillFacebook} from "@react-icons/all-files/ai/AiFillFacebook";
import {AiFillInstagram} from "@react-icons/all-files/ai/AiFillInstagram";
import React, {useState} from 'react';


const EmailValidation = (e, state) =>{
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)){
        e.target.setCustomValidity("");
        state(e.target.value);
    } else {
        e.target.setCustomValidity("Введите правильный e-mail");
    }
}

const SubmitFunc = (changeEmailSent, name, email, text, submit) => {
    submit(name, email, text);
    changeEmailSent(false);
}

const ModalAUP = (props) =>{
    return(
        <Modal isOpen={props.emailSent} toggle={() => props.changeEmailSent(false)}>
            <ModalBody>
                Вы уверены?
            </ModalBody>
            <ModalFooter >
                <button className="p-2 toCart-productPage" onClick={() => SubmitFunc(props.changeEmailSent, props.name, props.email, props.text, props.sendEmail)} >
                    Да, отправлять
                </button>
                <button className="p-2 toCart-productPage" onClick={() => props.changeEmailSent(false)} >
                    Не отправлять
                </button>
            </ModalFooter>
        </Modal>
    )
}


const AboutUsPage = (props) => {
    const [emailSent, changeEmailSent] = useState(false);
    const [name, changeName] = useState(null);
    const [email, changeEmail] = useState(null);
    const [text, changeText] = useState(null);
    if(emailSent){
        return <ModalAUP emailSent={emailSent} changeEmailSent={changeEmailSent} sendEmail={props.sendEmail} name={name} email={email} text={text}/>
    }
    return(
        <div className="pt-70px">
            <Container className="pt-4">

                <Row>
                    <Col md={6} className="left-text-aboutP">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar mattis nunc sed blandit libero. Eu feugiat pretium nibh ipsum. Ipsum consequat nisl vel pretium lectus quam id leo. Purus sit amet volutpat consequat mauris nunc congue nisi vitae. Ultricies mi eget mauris pharetra et ultrices neque ornare. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Sit amet est placerat in egestas erat. Adipiscing at in tellus integer. Dictum non consectetur a erat nam at. Vestibulum lectus mauris ultrices eros in. Dictum fusce ut placerat orci nulla. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Mauris vitae ultricies leo integer. Aenean vel elit scelerisque mauris pellentesque. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Id aliquet lectus proin nibh nisl condimentum.
                    </Col>
                    <Col md={6}>
                        <img alt="logo" src='/images/logo_transparent.png' className="w-100"/>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col md={12}>
                        <h2 className="headline-text">Обратная связь</h2>
                    </Col>
                    <Col md={6} className="contactInst-aboutP text-center">
                        <div>Вы можете написать нам в Instagram или Facebook</div>
                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/New-Way-Cosmetics-100544935368207/" className="simpleLink"><AiFillFacebook className="facebookIcon-aboutP"/></a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/newwaycos/" className="simpleLink"><AiFillInstagram className="instagramIcon-aboutP"/></a>
                    </Col>
                    <form className="col-md-6 col-xs-12 contactInst-aboutP" onSubmit={() => changeEmailSent(true)}>
                        <div className="pb-3 text-center">
                            Форма для обратной связи
                        </div>
                        <div>
                            <input onChange={(e) => changeName(e.target.value)} required name="name" placeholder="Имя" className="w-100 input-aboutP p-2"/>
                        </div>
                        <div>
                            <input onChange={e => EmailValidation(e, changeEmail)} required name="email" placeholder="E-mail" className="w-100 input-aboutP p-2"/>
                        </div>
                        <div>
                            <textarea onChange={(e) => changeText(e.target.value)} required maxLength={200} rows="4" name="email" placeholder="Текст письма" className="w-100 input-aboutP p-2"/>
                        </div>
                        <div className="w-100 text-center p-2">
                            <button className="mr-auto ml-auto p-2 toCart-productPage" type="submit">
                                Отправить
                            </button>
                        </div>
                    </form>
                </Row>
            </Container>
        </div>
    )

}

export default AboutUsPage;