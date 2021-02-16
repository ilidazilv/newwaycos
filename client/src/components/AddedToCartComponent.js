import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {NavLink} from "react-router-dom";




const AddedToCartComponent = (props) => {
    return(
        <Modal isOpen={props.show} toggle={() => props.handlePopups(0)} className="font">
            <ModalBody className="text-center modal-header-PP">
                Добавлено в корзину
            </ModalBody>
            <ModalFooter >
                <NavLink className="p-2 toCart-productPage" onClick={() => props.handlePopups(0)} to='/shop'>
                    Продолжить покупки
                </NavLink>
                <NavLink className="p-2 toCart-productPage" onClick={() => props.handlePopups(0)} to='/cart'>
                    Перейти в корзину
                </NavLink>
            </ModalFooter>
        </Modal>
    )
}

export default AddedToCartComponent;