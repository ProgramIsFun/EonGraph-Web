import React, {Component, useEffect, useState} from 'react';
import buttonList from './initialButtonList';
import Layout from '../../containers/Layout';
import {auth} from '../../firebase';
import './Dashboard.css';
import Home from "../Home";
import {cgg} from "../../util/helperfile";

const Dashboard = ({ providerData }) => {


    // please note that this is originally a class component
    // but I remove and reform it to a functional component in a git commit. 9d7967697c237eb7f7635c79f72782033934e47b




    const [count, setCount] = useState(0);


    const [buttonListState, setButtonListState] = useState(buttonList);
    const [providerDataState, setProviderDataState] = useState(providerData);

    useEffect(() => {
 }, [providerDataState]); // Only re-run the effect if providerDataState changes

  


    const updateButtonList = (buttonList, providerName, visible) => {
        // cgg(providerName, "visible -> false");
        return ({
            ...buttonList,
            [providerName]: {
                ...buttonList[providerName],
                visible
            }
        });
    };

    return (
        <Layout>
            <Home />
        </Layout>
    );
};



export default Dashboard;
