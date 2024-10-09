import React from 'react';
import '../headerGreen/headerGreen.scss';
import logoBlack from '../../assets/img/logoBlack.webp';
import { Link } from "react-router-dom"
export default function HeaderGreen() {
    return (
        <>
        <header className='headerRegisterLogin flex justify-center'>
            <Link className='' to="/"><img src={logoBlack} alt="logo" className="h-32 w-32" /></Link>
        </header>
        </>
    )
}