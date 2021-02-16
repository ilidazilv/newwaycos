import {Container, Row} from "reactstrap";

const AdminLoginComponent = (props) => {
    let loginIn, passwordIn = null;
    return(
        <Container className="pt-70px">
            <Row>
                <div className="ml-auto mr-auto login-AP p-2 mb-5" >
                    <div className="text-center">Введите логин и пароль</div>
                    <input name="login" ref={(input) => loginIn = input} className="input-aboutP input-AP m-2" type="text" placeholder="Логин"/>
                    <input name="password" ref={(input) => passwordIn = input} className="input-aboutP input-AP m-2"  type="password" placeholder="Пароль"/>
                    <button className="ml-auto mr-auto d-block loginB-AP" onClick={() => props.login(loginIn.value, passwordIn.value)}>Войти</button>
                </div>
            </Row>
        </Container>
    )
}

export default AdminLoginComponent;