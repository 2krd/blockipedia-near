import React, { ReactNode } from "react"
import { Link, navigate } from "gatsby"
import { ContractProvider, useContract } from "../components/nearAuth"

import { header, links, link, linkAction, branding } from "./index.module.css"

function HeadNav() {
    const wallet = useContract()

    function getStarted() {
        if (wallet?.authenticated) {
            navigate("/write")
        } else {
            wallet?.login()
        }
    }

    return <nav className={header}>
        <Link className={branding} to="/">Blockipedia</Link>
        <div className={links}>
            <Link className={link} to="/story">Our story</Link>
            <Link className={link} to="/write">Write</Link>
            {wallet!.authenticated ?
                <a className={link} onClick={wallet!.logout}>Sign-out</a> :
                <a className={link} onClick={wallet!.login}>Sign-in</a>}
            <a className={linkAction} onClick={getStarted}>Get started</a>
        </div>
    </nav>
}

export default function (props: { children: ReactNode }) {
    return <ContractProvider>
        <HeadNav />
        <div>
            {props.children}
        </div>
    </ContractProvider>
}