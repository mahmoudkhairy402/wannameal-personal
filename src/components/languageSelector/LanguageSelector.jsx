import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import style from './style.module.css'
import { MdLanguage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { switchToEnglish, switchToArabic, getLanguage } from "../../redux/slices/language";

const langs = [
    { code: 'en', lang: 'English' },
    { code: 'ar', lang: 'Arabic' },
]

export default function LanguageSelector() {
    const dispatch = useDispatch();
    const language = useSelector(getLanguage)
    const { i18n } = useTranslation()
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === 'en') {
            dispatch(switchToEnglish());
        } else if (lng === 'ar') {
            dispatch(switchToArabic());
        }
    };
    useEffect(() => {
        document.body.dir = i18n.dir()
    }, [i18n, i18n.language])

    return (
        <>
            <label className={style.popup}>
                <input type="checkbox" />
                <div tabIndex={0} className={style.burger}>
                    <MdLanguage size={20} color='white' />
                </div>
                <nav className={style.popup_window}>
                    <ul>
                        {langs.map((x) => {
                            return <li><button onClick={() => changeLanguage(x.code)} key={x.code}><span>{x.lang}</span></button></li>
                        })}
                    </ul>
                </nav>
            </label>

        </>
    )
}
