// Copyright (C) 2020 Really Awesome Technology Ltd
//
// This file is part of RACTF.
//
// RACTF is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// RACTF is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with RACTF.  If not, see <https://www.gnu.org/licenses/>.

import React from "react";
import Loadable from "react-loadable";
import { AppContext } from "controllers/Contexts";
import LoadingPage from "pages/LoadingPage";
import { store, injectReducer } from "store";
import * as actions from "actions";

import * as http_ from "controllers/http";
import * as api_ from "controllers/api";
export * from "controllers/UseAPI";

export const api = api_;
export const appContext = AppContext;

import("zxcvbn").then(zx => window.__zxcvbn = zx.default);
export const zxcvbn = () => (window.__zxcvbn || null);

export const plugins = {
    categoryType: {},
    challengeMod: {},
    challengeType: {},
    challengeEditor: {},
    challengeMetadata: {},
    page: {},
    popup: {},
    medals: {},
    config: {},
    adminPage: {},
    loginProvider: {},
    registrationProvider: {},
    postLogin: {},
    errorHandler: {},
    mountWithinApp: {},
};

export const getLocalConfig = (key, fallback) => {
    const preferenceValue = (store.getState().preferences || {})[key];
    return preferenceValue !== undefined ? preferenceValue : fallback;
};
export const setLocalConfig = (key, value) => {
    store.dispatch(actions.setPreference(key, value));
};

export const dynamicLoad = (loader) => {
    return Loadable({
        loader: loader,
        loading: () => <LoadingPage />,
    });
};

// Export the plugins object for debugging purposes.
window.__ractf_plugins = plugins;

export const registerPlugin = (type, key, handler) => {
    if (!plugins[type]) plugins[type] = {};
    plugins[type][key] = handler;
};
export const registerReducer = (name, reducer) => {
    injectReducer(store, name, reducer);
};
export const http = { ...http_, delete:http_.delete_ };

const _fastClick = e => {
    e.target && e.target.click && e.target.click();
    e.preventDefault();
    e.stopPropagation();
    return false;
};
export const fastClick = {
    onMouseDown: _fastClick,
    onTouchStart: _fastClick,
};
