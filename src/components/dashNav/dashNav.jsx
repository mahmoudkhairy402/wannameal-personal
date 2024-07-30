import React from 'react'
import { FaUser } from 'react-icons/fa';
import { IoNotificationsOutline } from "react-icons/io5";
import style from './page.module.css';
export default function DashNav() {
    return (
        <nav className="navbar navbar-expand-lg bg-transparent p-4">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <h3 className="m-0" >Hello Bob</h3>
                    <div className={style.group}>
                        <svg className={style.icon} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
                        <input placeholder="Search" type="search" className={style.input} />
                    </div>

                    <div className="d-flex align-items-center gap-4">
                        <div className={style.backIcon}><IoNotificationsOutline size={30} /></div>
                        <p className=" m-0" >Bob</p>
                        <div className={style.backIcon} style={{ backgroundColor: '#95C6A2DE' }}><FaUser size={30} color='var(--text_white)' /></div>
                    </div>
                </div>
            </div>
        </nav>

    )
}
