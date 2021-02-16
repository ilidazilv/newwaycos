import {Col, Container, Row} from "reactstrap";
import {LoadingComponent} from "../components/LoadingComponent";

const BlogPage = (props) => {
    console.log(props);
    if(props.blogsIsLoading){
        return <LoadingComponent/>
    }
    return(
        <Container className="pt-70px font text-center">
            <Row>
                <Col>
                    <img src={props.blog.image} className="w-75 d-block ml-auto mr-auto"/>
                    <div className="p-3">{props.blog.text}</div>
                </Col>
            </Row>
        </Container>
    )
}

export default BlogPage;