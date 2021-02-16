import React, {useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import ShopComponent from "../components/ShopComponent";
import {LoadingComponent} from "../components/LoadingComponent";
import {useLocation} from 'react-router-dom'

const MobileListHandle = (list, showButton, hideButton) => {
    if(list.classList.contains('d-none')){
        list.classList.remove('d-none');
        list.classList.add('fade-in');
        showButton.classList.add('d-none');
        showButton.classList.remove('fade-in');
        hideButton.classList.remove('d-none');
        hideButton.classList.add('fade-in');
    } else{
        list.classList.add('d-none');
        list.classList.remove('fade-in');
        showButton.classList.remove('d-none');
        showButton.classList.add('fade-in');
        hideButton.classList.add('d-none');
        hideButton.classList.remove('fade-in');
    }
}

const DesktopList = () => {
    return(
        <Row>
            <Col md={4}>
                <div>
                    <input type="checkbox" id="category1"/>
                    <label htmlFor="category1" className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
            </Col>
            <Col md={4}>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
            </Col>
            <Col md={4}>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
            </Col>
        </Row>
    )
}

const MobileList = () => {
    let showButtonSP, hideButtonSP, hiddenListSP;

    return(
        <Row>
            <Col>
                <div>
                    <input type="checkbox" id="category1"/>
                    <label htmlFor="category1" className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label className="ml-1">ff</label>
                </div>
                <div role='button' className='text-center' ref={(input) => showButtonSP = input} onClick={() => MobileListHandle(hiddenListSP, showButtonSP, hideButtonSP)}>Показать все категории</div>
                <div ref={(input) => hiddenListSP = input} className="d-none">
                    <div>
                        <input type="checkbox" id="category1"/>
                        <label htmlFor="category1" className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox" id="category1"/>
                        <label htmlFor="category1" className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label className="ml-1">ff</label>
                    </div>
                </div>
                <div role="button" onClick={() => MobileListHandle(hiddenListSP, showButtonSP, hideButtonSP)} className="d-none text-center" ref={(input) => hideButtonSP = input}>Скрыть</div>
            </Col>
        </Row>
    )
}

const ShopPage = (props) => {
    let location = useLocation();
    const [search, changeSearch] = useState(location.props && location.props.searchProd ? location.props.searchProd : '');
    const [page, pageChange] = useState(document.documentElement.clientWidth >= 768 ? 16 : 4);
    if(props.productIsLoading){
        return <LoadingComponent className="pt-70px"/>
    }
    return(
        <div className="pt-70px categories-shopP">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="headline-text">Товары</div>
                        <input onChange={(e) => changeSearch(e.target.value)} className="input-aboutP w-100" placeholder="Поиск товара" type="text" defaultValue={location.props && location.props.searchProd ? location.props.searchProd : ''}/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <ShopComponent search={search} className="fade-in" goods={props.goods.sort(function (a, b) {
                            if(a.quantity !== 0){
                                return -1;
                            } else {
                                return 1;
                            }
                        }).slice(0, page)}/>
                        {props.goods[page + 1] ?
                            <div className="text-center font moreButton-SP" onClick={() => pageChange(page * 2)} role="button">Показать ещё</div> :
                            <div/>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default ShopPage;