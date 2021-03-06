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

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { store } from "store";

import { getAnnouncements } from "../api/announcements";
import * as actions from "../actions/announcements";
import Announcement from "./Announcement";


const AppAnnouncements = () => {
    const announcements = useSelector(store => store.announcements?.active) || [];

    useEffect(() => {
        getAnnouncements();
    }, []);

    const notifsEl = announcements.map((notif, n) => {
        const hide = () => {
            store.dispatch(actions.hideAnnouncement(notif));
        };
        return <Announcement {...notif} key={n} hide={hide} />;
    }).reverse();

    return <div className={"announcementsWrap"}>
        {notifsEl}
    </div>;
};
export default AppAnnouncements;
