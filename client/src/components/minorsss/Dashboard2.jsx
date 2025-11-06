import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import buttonList from './initialButtonList';
import Layout from '../../containers/Layout';
import SocialProfileList from './SocialProfileList';
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
        // cgg("qqq", buttonListState);
        // cgg("eee", providerDataState);
        updateProviders(providerDataState);
    }, [providerDataState]); // Only re-run the effect if providerDataState changes

    const handleCurrentProviders = newProviderData => {
        updateProviders(newProviderData);
    };

    const updateProviders = providerData => {
        let updatedButtonList = { ...buttonListState };

        providerData.forEach(provider => {
            const providerName = provider.providerId.split('.')[0];
            cgg(providerName);
            updatedButtonList = updateButtonList(updatedButtonList, providerName, false);
        });

        setButtonListState(updatedButtonList);
        setProviderDataState(providerData);
    };

    const handleUnlinkedProvider = (providerName, providerData) => {
        if (providerData.length < 1) {
            auth
                .getAuth()
                .currentUser.delete()
                .then(() => console.log('User Deleted'))
                .catch(() => console.error('Error deleting user'));
        }

        let updatedButtonList = { ...buttonListState };
        updatedButtonList = updateButtonList(updatedButtonList, providerName, true);

        setButtonListState(updatedButtonList);
        setProviderDataState(providerData);
    };

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
            <SocialProfileList
                auth={auth.getAuth}
                providerData={providerDataState}
                unlinkedProvider={handleUnlinkedProvider}
            />
            <Home />
        </Layout>
    );
};

Dashboard.propTypes = {
    providerData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Dashboard;