import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Styled from "styled-components";
import GithubIcon from "mdi-react/GithubIcon";
import { connect } from "react-redux";
import { auth } from "../../firebase";
import buttonList from './initialButtonList';
import SocialButtonList from "./SocialButtonList";
import Layout from "../../containers/Layout";
import { cgg } from "../../util/helperfile";

function Login({ login, ...state }) {
    console.log("login state passed is now ", state);
    state = state.auth;
    console.log("login state passed is now ", state);
    console.log("login ", login);
    const navigate = useNavigate();

    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    useEffect(() => {
        auth.getAuth().onAuthStateChanged(user => {
            cgg("user", user)
            if (user) {
                cgg("login already :d ");
                navigate('/dashboard');
            }
        });
    }, [navigate]);

    if (state?.isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    let teststyle = {
        position: "fixed",
        left: "0px",
        bottom: "20px",
        height: "30px",
        width: "100%",
        background: "#999"
    };

    return (
        <Layout contentCenter={true}>
            <h1>Welcome</h1>
            <p>Please login to continue</p>
            <p style={{
                position: "fixed",
                left: "0px",
                bottom: "50px",
                height: "30px",
                width: "100%",
                background: "#999"
            }}>Disclaimer: Use this website at your own risk. Authur will not be held responsible for anything.</p>
            <p style={teststyle}>You could check the source code in
                https://github.com/ProgramIsFun/github-repos-visualizer and run yours. </p>
            <SocialButtonList buttonList={buttonList} auth={auth.getAuth}/>
        </Layout>
    );
}

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => dispatch({type: 'LOGIN', payload}),
    }
}

export default Login;
