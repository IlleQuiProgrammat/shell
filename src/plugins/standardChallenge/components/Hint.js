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

import React, { useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import "./Challenge.scss";
import { api, http, appContext } from "ractf";


export default ({ name, points, hintUsed, isEdit, onClick, id, body }) => {
    const app = useContext(appContext);
    const { t } = useTranslation();

    const edit = () => {
        app.promptConfirm({message: "Edit hint", remove: () => api.removeHint(id)},
            [{name: "name", placeholder: "Hint name", val: name, label: "Name"},
             {name: "cost", placeholder: "Hint cost", val: points.toString(), label: "Cost", format: /\d+/},
             {name: "body", placeholder: "Hint text", val: body, label: "Message", rows: 5}]
        ).then(({ name, cost, body }) => {

            if (!cost.toString().match(/\d+/)) return app.alert("Invalid hint const!");

            api.editHint(id, name, cost, body).then(() =>
                app.alert("Hint edited!")
            ).catch(e =>
                app.alert("Error editing hint:\n" + http.getError(e))
            );
        }).catch(() => {});
    };

    return <div className={"challengeLink clickable" + (hintUsed ? " hintUsed" : "")}
                onClick={isEdit ? (() => edit()) : onClick}>
        <FaInfoCircle />
        <div>
            {name}
            <div className={"challengeLinkMeta"}>-{t("point_count", {count: points})}.</div>
        </div>
    </div>;
};
