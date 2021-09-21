/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import "./App.css";
import ReactLogo from "./images/react-logo.png";
import JavascriptLogo from "./images/typescript.svg";
import FooterLogo from "./images/footer.png";
import { default as authConfig } from "./config.json";
import { AsgardeoSPAClient, AuthClientConfig, Hooks, BasicUserInfo, Config } from "@asgardeo/auth-spa";

/**
 * SDK Client instance.
 * @type {AsgardeoSPAClient}
 */
const auth: AsgardeoSPAClient = AsgardeoSPAClient.getInstance();

/**
 * Main App component.
 *
 * @return {React.ReactElement}
 */
export const App: FunctionComponent<{}> = (): ReactElement => {

    const [ authenticatedUser, setAuthenticatedUser ] = useState<BasicUserInfo>(undefined);
    const [ isAuth, setIsAuth ] = useState<boolean>(false);

    /**
     * Initialize the SDK & register Sign in and Sign out hooks.
     */
    useEffect(() => {
        const config: AuthClientConfig<Config> = authConfig as AuthClientConfig<Config>;
        // Initialize the client with the config object.
        auth.initialize(config);

        auth.on(Hooks.SignIn, (response: BasicUserInfo) => {
            setIsAuth(true);
            setAuthenticatedUser(response);
        });

        auth.on(Hooks.SignOut, () => {
            setIsAuth(false);
        });

        auth.signIn({callOnlyOnRedirect: true});

    }, []);

    /**
     * Check if the page redirected by the sign-in method with authorization code,
     * if it is recall sing-in method to continue the sign-in flow
     */
    useEffect(() => {
        if (isAuth) {
            return;
        }

        auth.isAuthenticated().then(async (response) => {
            if (response) {
                const userInfo = await auth.getBasicUserInfo();
                setAuthenticatedUser({
                    ...userInfo
                });

                setIsAuth(true);
            }
        });
    }, [ authenticatedUser, isAuth ]);

    /**
     * Handles login button click event.
     */
    const handleLogin = (): void => {
        auth.signIn();
    };

    /**
     * Handles logout button click event.
     */
    const handleLogout = (): void => {
        auth.signOut();
    };

    return (
        <>
            <div className="container">
                {
                    (authConfig.clientID === "")
                        ? (
                            <div className="content">
                                <h2>You need to update the Client ID to proceed.</h2>
                                <p>
                                    Please open "src/config.json" file using an editor, and update
                                    the <code>clientID</code> value with the registered app clientID.
                                </p>
                                <p>Visit repo <a href="https://github.com/asgardeo/asgardeo-auth-spa-sdk/tree/master/samples/asgardeo-react-typescript-app">README</a> for more details.</p>
                            </div>
                        )
                        : (isAuth && authenticatedUser)
                        ? (
                            <>
                                <div className="header-title">
                                    <h1>
                                        Typscript-based React SPA Authentication Sample
                                    </h1>
                                </div>
                                <div className="content">
                                    <h3>Below are the basic details retrieved from the server on a successful
                                        login.</h3>
                                    <div>
                                        <ul className="details">
                                            {
                                                authenticatedUser.displayName && (
                                                    <li><b>Name:</b> { authenticatedUser.displayName }</li>
                                                )
                                            }
                                            {
                                                authenticatedUser.username && (
                                                    <li><b>Username:</b> { authenticatedUser.username }</li>
                                                )
                                            }
                                            {
                                                authenticatedUser.email && authenticatedUser.email !== "null" && (
                                                    <li><b>Email:</b> { authenticatedUser.email }</li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <button className="btn primary" onClick={ () => handleLogout() }>Logout</button>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className="header-title">
                                    <h1>
                                    Typscript-based React SPA Authentication Sample
                                    </h1>
                                </div>
                                <div className="content">
                                    <div className="home-image">
                                        <img src={ JavascriptLogo } alt="js-logo" className="js-logo-image logo"/>
                                        <span className="logo-plus">+</span>
                                        <img src={ ReactLogo } alt="react-logo" className="react-logo-image logo"/>
                                    </div>
                                    <h3>
                                        Sample demo to showcase authentication for a Single Page Application <br />
                                        via the OpenID Connect Authorization Code flow, <br />
                                        which is integrated using the { " " }
                                        <a href="https://github.com/asgardeo/asgardeo-auth-spa-sdk"
                                        target="_blank" rel="noreferrer">Asgardeo SPA Auth SDK</a>.
                                    </h3>
                                    <button className="btn primary" onClick={ () => handleLogin() }>Login</button>
                                </div>
                            </>
                        )
                }
            </div>

            <img src={ FooterLogo } className="footer-image" alt="footer-logo"/>
        </>
    );
};
