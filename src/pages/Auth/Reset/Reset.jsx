import axios from 'axios';
import React, { useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdPassword } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import style from './page.module.css';
import { useTranslation } from 'react-i18next';

export default function Reset() {
    const [user, setUser] = useState({
        password: "",
        confirmPassword: "",
    });
    const [miniNumber, setminiNumber] = useState(false)
    const [hasNumber, sethasNumber] = useState(false)
    const [lowerUpper, setlowerUpper] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            const hasMinimumLength = value.length >= 8;
            const hasNumber = /\d/.test(value);
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);

            setminiNumber(hasMinimumLength);
            sethasNumber(hasNumber);
            setlowerUpper(hasUppercase && hasLowercase);
        }
        setUser((old) => ({
            ...old,
            [name]: value,
        }));
        console.log(user);
    }
    const navigate = useNavigate()
    const userToken = localStorage.getItem('userToken')
    let config = {
        headers: {
            token: userToken,
        },
    };
    const submit = (e) => {
        e.preventDefault();
        axios.patch('https://fast-plat1.vercel.app/auth/resetPassword?lang=en', user, config)
            .then((respo) => {
                console.log(respo.data);
                if (respo.data.success) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "reset successfully-forward to sign in "
                    }).then(() => {
                        navigate('/auth/account')
                    });
                }
            }).catch((err) => {
                console.log(err.response.data);
            })
    }
    const { t } = useTranslation();
    const {
        CreatePas,
        shuold,
        Reset,
        Password,
        characters,
        number,
        letters,
    } = t('auth');
    return (
        <form onSubmit={submit} method="get" className={`${style.form} `}>
            <p className={style.head}>{CreatePas}</p>
            <h5 className='text-center text-black-50'>{shuold}</h5>
            <div className="d-flex flex-column gap-4 my-3 w-100">
                <div className={style.inputForm}>
                    <MdPassword size={25} />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className={style.input}
                        placeholder={`${Password}`}
                    />
                </div>
                <div className={style.inputForm}>
                    <MdPassword size={25} />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        className={style.input}
                        placeholder={`${Password}`}
                    />
                </div>
            </div>
            <div className="d-flex flex-column w-100 justify-content-between">
                <div className={`d-flex gap-2 align-items-center ${miniNumber ? style.green : style.red}`}>
                    <IoCheckmarkCircle size={20} />
                    <p className="m-0">{characters}</p>
                </div>
                <div className={`d-flex gap-2 align-items-center ${hasNumber ? style.green : style.red}`}>
                    <IoCheckmarkCircle size={20} />
                    <p className="m-0">{number}</p>
                </div>
                <div className={`d-flex gap-2 align-items-center ${lowerUpper ? style.green : style.red}`}>
                    <IoCheckmarkCircle size={20} />
                    <p className="m-0">{letters}</p>
                </div>
            </div>
            <button className={style.button_submit}>{Reset}</button>
        </form>
    )
}
