import SliderComponent from "../components/SliderComponent";
import React from "react";
import NewProdListComponent from "../components/NewProdListComponent";
import BlogComponent from "../components/BlogComponent";
import {Container} from "reactstrap";




const HomePage = (props) => {
    return (
        <div>
            <SliderComponent/>
            <div className="w-100 m-0">
                <Container className="text-center">
                    <span className="headline-text">Новинки</span>
                    <NewProdListComponent goods={props.goods}/>
                </Container>
            </div>
            <BlogComponent blogs={props.blogs}/>
        </div>
    )
}

export default HomePage;