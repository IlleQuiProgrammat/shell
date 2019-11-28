import React, { useContext, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import { P2PGraph } from "./p2p-graph";
import Page from "./bases/Page";

import { apiContext } from "ractf";

import "./HomePage.scss";


const Countdown = () => {
    return <div className={"homeCountdown"}>69:69:69:69</div>
}


export default () => {
    const api = useContext(apiContext);
    const graph = useRef();

    const graphEl = useCallback(node => {
        if (graph.current) {
            graph.current.destroy();
        }
        if (node) {
            graph.current = new P2PGraph(node);
        }

        graph.current.add({
            id: 'teams',
            scale: 1.5,
            name: 'Teams',
            color: "#7cb342c6",
        })
        graph.current.add({
            id: 'users',
            scale: 1.5,
            name: 'Users',
            color: "#7cb342c6",
        })
        graph.current.add({
            id: 'chals',
            scale: 1.5,
            name: 'Challenges',
            color: "#7cb342c6",
        })
        graph.current.add({
            id: 'root',
            scale: 2,
            name: 'RACTF',
            color: "#aa3132",
        })
        graph.current.connect('teams', 'root', 4)
        graph.current.connect('users', 'root', 4)
        graph.current.connect('chals', 'root', 4)
        window.__graph = graph;

        let users = [{"id":"e332e73d-ad11-4676-a7c6-ffba0105a351","name":"user4","team_name":"The C Team"},{"id":"70a4ddba-e7cd-4ead-8930-3b4de854cffe","name":"user3","team_name":"You lost the Game"},{"id":"47acb7ad-7895-4a92-8886-bc40f8092324","name":"user1","team_name":"You lost the Game"},{"id":"02224260-b428-49c7-be8e-4bea9ed8bd30","name":"Bottersnike","team_name":"Botter's Team"},{"id":"13eabcea-a752-4f67-bd0b-dfe2f996c32c","name":"BenTechy66","team_name":"sendbenspam@yahoo.co.uk"}];
        let teams = [{"id":"7a35153f-b061-4d79-8643-11b423269bb7","name":"The C Team"},{"id":"e69608d6-e696-47ae-abd2-7f19039830a1","name":"You lost the Game"},{"id":"237e7ac0-f9ff-4d65-b85b-fb4e0380c5f0","name":"Botter's Team"},{"id":"1863385b-9a85-44ea-a143-770931c2fd55","name":"sendbenspam@yahoo.co.uk"}];
        
        users.forEach(i => {
            graph.current.add({
                id: "user_" + i.id,
                name: i.name
            })
            graph.current.connect("users", "user_" + i.id, 2);
        });
        teams.forEach(i => {
            graph.current.add({
                id: "team_" + i.name,
                name: i.name
            })
            graph.current.connect("teams", "team_" + i.name, 2);
        });
        users.forEach(i => {
            graph.current.connect("team_" + i.team_name, "user_" + i.id);
        });

        /*
        graph.current.add({
            id: 'peer1',
            me: true,
            name: 'You'
        })
        graph.current.add({
            id: 'peer2',
            name: 'Another Peer'
        })

        // Connect them
        graph.current.connect('peer1', 'peer2')*/
    }, []);

    return <Page vCentre>
        <div ref={graphEl} className={"homeGraph"} />

        <Countdown />

        {/*
        <div className={"homeLead"}>Welcome to RACTF!</div>
        <div className={"cardRow"}>
            {api.user ? <>
                <Link className={"cardTypeLink"} to={"/campaign"}>
                    <div className={"cardTitle"}>Get started on challenges</div>
                    <div>
                        With over 50 challenges, there's something for everyone!
                    </div>
                </Link>
                <Link className={"cardTypeLink"} to={"/leaderboard"}>
                    <div className={"cardTitle"}>Check the leaderboard</div>
                    <div>
                        Compare yourself to others, or just see how everyone is getting on!
                    </div>
                </Link>
            </> : <>
                    <Link className={"cardTypeLink"} to={"/login"}>
                        <div className={"cardTitle"}>Login</div>
                        <div>
                            Been here before? Login to get the most out of the site!
                    </div>
                    </Link>
                    <Link className={"cardTypeLink"} to={"/register"}>
                        <div className={"cardTitle"}>Register</div>
                        <div>
                            If you want to solve challenges you're going to need to get yourself an account
                    </div>
                    </Link>
                </>}
        </div>
        <div className={"cardRow"}>
            <Link className={"cardTypeLink"} to={"/users"}>
                <div className={"cardTitle"}>69 Users...</div>
                <div>
                    ...have solved 5 challenges, 72 times!
                </div>
            </Link>
            <Link className={"cardTypeLink"} to={"/teams"}>
                <div className={"cardTitle"}>32 Teams...</div>
                <div>
                    ...have an average of 2.3 members each!
                </div>
            </Link>
            <Link className={"cardTypeLink"} to={"/privacy"}>
                <div className={"cardTitle"}>420 people...</div>
                <div>
                    ...have viewed the privacy policy!
                </div>
            </Link>
        </div>
        {api.user && api.user.is_admin &&
            <div className={"cardRow"}>
                <Link className={"cardTypeLink"} to={"/admin"}>
                    <div className={"cardTitle"}>Admin Panel</div>
                    <div>
                        Look at you, you fancy admin. Go do your admin things, why don't you. smh.
                    </div>
                </Link>
            </div>
        }*/}
    </Page>;
}
