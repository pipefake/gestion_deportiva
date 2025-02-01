import React, { Fragment, useState, useEffect } from 'react'
import sulogisticaLogo from '../multimedia/sulogisticaLogo.png';




export default function Header(props) {


    return (
        <Fragment>
            <div className="header">
                <div>
                    <img className='' src={sulogisticaLogo} alt='foto de empresa del proceso de seleccion, Susoftware.' />
                    <p className='smallText poppins-regular'>
                        Lista de {props.text}
                    </p>

                </div>
            </div>
        </Fragment>

    )

}