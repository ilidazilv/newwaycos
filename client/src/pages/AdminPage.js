import AdminLoginComponent from "../components/AdminLoginComponent";





const AdminPage = (props) => {

    console.log(props.session);

    return(
        <AdminLoginComponent login={props.login}/>
    )
}

export default AdminPage;