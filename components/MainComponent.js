import React,{Component} from "react";
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import AboutUsPage from "../pages/AboutUsPage";
import CartPage from "../pages/CartPage";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import ProductPage from "../pages/ProductPage";
import FAQPage from "../pages/FAQPage";
import AdminPage from "../pages/AdminPage";
import BlogPage from "../pages/BlogPage";
import {connect} from "react-redux";
import {
    addToCartFunc,
    changeQuantityCart,
    fetchGoods,
    deleteFromCart,
    login,
    fetchSession, postOrder, handlePopup, sendEmail, fetchBlogs
} from "../redux/ActionCreators";


const mapStateToProps = state => {
    return{
        goods: state.goods,
        cart: state.cart,
        session: state.session,
        popups: state.popups,
        blogs: state.blogs
    }
}
const mapDispatchToProps = dispatch => ({
    fetchGoods: () => dispatch(fetchGoods()),
    addToCart: (id, quantity) => dispatch(addToCartFunc(id, quantity)),
    changeQuantityCart: (name, quantity) => dispatch(changeQuantityCart(name, quantity)),
    deleteFromCart: (id) => dispatch(deleteFromCart(id)),
    login: (name, password) => dispatch(login(name, password)),
    fetchSession: () => dispatch(fetchSession()),
    addOrder: (orderData) => dispatch(postOrder(orderData)),
    handlePopups: (data) => dispatch(handlePopup(data)),
    sendEmail: (name, email, text) => dispatch(sendEmail(name, email, text)),
    fetchBlogs: () => dispatch(fetchBlogs())
})



class MainComponent extends Component{
    componentDidUpdate() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    componentDidMount() {
        this.props.fetchGoods();
        this.props.fetchBlogs();
    }
    render() {
        const ProductWithId = ({match}) => {
            return(
                <ProductPage popups={this.props.popups.popups} handlePopups={this.props.handlePopups} addToCart={this.props.addToCart} productIsLoading={this.props.goods.isLoading} product={this.props.goods.goods.filter((product) => product.id === parseInt(match.params.productId,10))[0]} products={this.props.goods.goods}/>
            )
        }
        const BlogWithId = ({match}) => {
            return(
                <BlogPage blogsIsLoading={this.props.blogs.isLoading} blog={this.props.blogs.blogs.filter((blog) => blog.id === parseInt(match.params.blogId,10))[0]}/>
            )
        }
        return(
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route path='/home' component={() => <HomePage blogs={this.props.blogs.blogs} goods={this.props.goods.goods.filter((product) => product.new === 1 && product.quantity !== 0)} goodsLoading={this.props.goods.isLoading}/>} />
                    <Route path='/shop' component={() => <ShopPage goods={this.props.goods.goods} productIsLoading={this.props.goods.isLoading}/>}/>
                    <Route path='/about' component={() => <AboutUsPage sendEmail={this.props.sendEmail}/>}/>
                    <Route path='/cart' component={() => <CartPage changeStatus={this.props.changeStatus} addOrder={this.props.addOrder} deleteFromCart={this.props.deleteFromCart} productIsLoading={this.props.goods.isLoading} cart={this.props.cart} goods={this.props.goods.goods}  changeQuantity={this.props.changeQuantityCart}/>}/>
                    <Route path='/product/:productId' component={ProductWithId}/>
                    <Route path='/faq' component={FAQPage}/>
                    <Route path='/blog/:blogId' component={BlogWithId}/>
                    <Route path='/admin' component={() => <AdminPage session={this.props.session.session} login={this.props.login}/>}/>
                    <Redirect to='/home'/>
                </Switch>
                <FooterComponent/>
            </div>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));