import {Col, Container, Row} from "reactstrap";
import {NavLink} from "react-router-dom";

const CreateBlog = (props) => {
    return(
        <Col md={3}>
            <div className="overflow-hidden">
                <img src={props.blog.image} alt="blog 1" className="w-100"/>
            </div>
            <div className="blog-name-home">{props.blog.headline}</div>
            <NavLink to={'/blog/' + props.blog.id} className="blog-link-home">Подробнее</NavLink>
        </Col>
    )
};

const List = (props) => {
    return(
        <div>
            <Row>
                {props.blogs.slice(0, 4).map(function (item, i){
                    return <CreateBlog key={i} blog={item}/>
                })}

            </Row>
        </div>
    )
}

const BlogComponent = (props) => {
    return(
        <div>
            <div className="w-100 m-0 pb-2">
                <Container className="text-center">
                    <span className="headline-text">Наш блог</span>
                    <List blogs={props.blogs}/>
                </Container>
            </div>
        </div>
    )
}

export default BlogComponent;