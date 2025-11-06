import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './SocialButtonList.css';
import { dbbbbb, auth } from "../../firebase/firebase";
import { cgg } from "../../util/helperfile";

const propTypes = {
  buttonList: PropTypes.shape({
    github: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      provider: PropTypes.func.isRequired
    }),
  }).isRequired,
  auth: PropTypes.func.isRequired,
  currentProviders: PropTypes.func
};

const defaultProps = {
  currentProviders: null
};

const SocialButtonList = ({ buttonList, auth, currentProviders }) => {
  const navigate = useNavigate();  // <-- useNavigate replaces history

  // Handles successful authentication.
  const authHandler = authData => {
    cgg("called");
    if (authData) {
      cgg("authdata, should contain access token", authData);

      // save access token
      dbbbbb.collection("users").doc(auth().currentUser.uid).set({
        ...authData.credential
      })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

      if (currentProviders === null) {
        // For login, navigate to dashboard
        navigate('/dashboard'); // <-- replace history.push
      } else {
        currentProviders(authData.user.providerData);
      }
    } else {
      console.error('Error authenticating');
    }
  };

  // Authenticates the user with a social media provider.
  const authenticate = (e, provider) => {
    const providerOAuth = buttonList[provider].provider();

    if (!auth().currentUser) {
      auth()
          .signInWithPopup(providerOAuth)
          .then(authHandler)
          .catch(err => console.error(err));
    } else {
      auth()
          .currentUser.linkWithPopup(providerOAuth)
          .then(authHandler)
          .catch(err => console.error(err));
    }
  };

  const renderButtonList = provider => {
    const visible = buttonList[provider].visible;

    return (
        <button
            key={provider}
            className={`btn__social btn--${provider} ${!visible && 'hidden'}`}
            onClick={e => authenticate(e, provider)}
        >
          {provider}
        </button>
    );
  };

  return (
      <div className="btn__social--list">
        {Object.keys(buttonList).map(renderButtonList)}
      </div>
  );
};

SocialButtonList.propTypes = propTypes;
SocialButtonList.defaultProps = defaultProps;

export default SocialButtonList;
