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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
    Link, SideNav, NavBar, NavBrand, NavGap, Footer, FootRow, FootCol,
    FootLink, NavLink, Container, SiteWrap, NavCollapse, NavMenuLink,
    NavMenu
} from "@ractf/ui-kit";
import { plugins } from "ractf";
import Wordmark from "./Wordmark";
import Header from "./Header";

import footerLogo from "../static/spine.svg";
import { useConfig } from "@ractf/util";

const USE_HEAD_NAV = true;


const HeaderNav = () => {
    const user = useSelector(state => state.user);

    return <NavBar primary>
        <NavBrand><b>RACTF</b></NavBrand>
        <NavCollapse>
            <NavLink to={"/users"}>Users</NavLink>
            <NavLink to={"/teams"}>Teams</NavLink>
            <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
            <NavLink to={"/campaign"}>Challenges</NavLink>
            <NavGap />
            {user ? <>
                <NavLink to={"/profile/me"}>Profile</NavLink>
                <NavLink to={"/team/me"}>Team</NavLink>
                <NavLink to={"/settings"}>Settings</NavLink>
                <NavLink to={"/logout"}>Logout</NavLink>
            </> : <>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/signup"}>Register</NavLink>
            </>}
            {user && user.is_staff && <NavMenu name={"Admin"}>
                {Object.entries(plugins.adminPage).map(([key, value]) => (
                    <NavMenuLink key={key} to={"/admin/" + key}>{value.sidebar}</NavMenuLink>
                ))}
            </NavMenu>}
        </NavCollapse>
    </NavBar>;
};

const SideBarNav = ({ children }) => {
    const { t } = useTranslation();

    const registration = useConfig("enable_registration", true);
    const login = useConfig("enable_login", true);
    const categories = useSelector(state => state.challenges?.categories) || [];
    const user = useSelector(state => state.user);

    const menu = [];
    menu.push({
        name: t("sidebar.brand"),
        submenu: [
            [t("sidebar.home"), "/home"],
            [t("user_plural"), "/users"],
            [t("team_plural"), "/teams"],
            [t("leaderboard"), "/leaderboard"]
        ],
        startOpen: true
    });

    if (user) {
        if (user.is_staff || categories.length) {
            const submenu = categories.map(i => [i.name, "/campaign/" + i.id]);
            if (user.is_staff) {
                submenu.push([<>+ {t("challenge.new_cat")}</>, "/campaign/new"]);
            }
            menu.push({
                name: t("challenge_plural"),
                submenu: submenu,
                startOpen: true
            });
        }

        menu.push({
            name: user.username,
            submenu: [
                [t("settings.profile"), "/profile/me"],
                [t("team"), "/team/me"],
                [t("setting_plural"), "/settings"],
                [t("sidebar.logout"), "/logout"],
            ]
        });
    } else if (login || registration) {
        const submenu = [];
        if (login)
            submenu.push([t("login"), "/login"]);
        if (registration)
            submenu.push([t("register"), "/register"]);
        menu.push({
            name: t("login"),
            submenu: submenu,
            startOpen: true
        });
    }
    if (user && user.is_staff) {
        menu.push({
            name: t("sidebar.admin"),
            submenu: Object.entries(plugins.adminPage).map(([key, value]) => [value.sidebar, "/admin/" + key])
        });
    }

    const header = <Wordmark />;
    const footer = <>
        <footer>
            <img alt={""} src={footerLogo} />
            &copy; Really Awesome Technology Ltd 2020
        </footer>
        <Link to="/">
            {t("footer.home")}
        </Link> - <Link to="/privacy">
            {t("footer.privacy")}
        </Link> - <Link to="/conduct">
            {t("footer.terms")}
        </Link><br /><Link to="/ui">
            UI Framework
        </Link> - <Link to="/debug">
            Debug
        </Link>
    </>;

    return <>
        <Header />
        <SideNav header={header} footer={footer} items={menu}>
            {children}
        </SideNav>
    </>;
};

export default ({ children }) => {
    if (USE_HEAD_NAV)
        return <SiteWrap>
            <HeaderNav />
            <Container children={children} />
            <Footer>
                <FootRow main>
                    <FootCol title={"RACTF"}>
                        <FootLink to={"/home"}>Home</FootLink>
                        <FootLink to={"/privacy"}>Privacy Policy</FootLink>
                        <FootLink to={"/conduct"}>Terms of Use</FootLink>
                    </FootCol>
                    <FootCol title={"For Developers"}>
                        <FootLink to={"/ui"}>UI Framework</FootLink>
                        <FootLink to={"/debug"}>Debug</FootLink>
                    </FootCol>
                </FootRow>
                <FootRow center slim darken>
                    &copy; Really Awesome Technology Ltd 2020
                </FootRow>
            </Footer>
        </SiteWrap>;
    return <SideBarNav children={children} />;
};


