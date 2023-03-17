import styles from './Sign.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect, useRef } from 'react';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

const cx = classNames.bind(styles);


function Sign() {
    const [isSignIn, setIsSignIn] = useState(1);
    const [email,setEmail]=useState();
    const handleChangeSign = (num) => {
        setIsSignIn(num);
    };
    const handleChangeEmail=(email)=>{
        setEmail(email)
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-main')}>
                <div className={cx('sign')}>
                    {isSignIn===1 ? (
                        <SignIn handleChangeSign={handleChangeSign} handleChangeEmail={handleChangeEmail}/>
                    ) : 
                    isSignIn===2?
                    (
                        <SignUp handleChangeSign={handleChangeSign} />
                    )
                    :
                    <ForgotPassword handleChangeSign={handleChangeSign} handleChangeEmail={handleChangeEmail} email={email}/>
                }
                </div>
            </div>
        </div>
    );
}

export default Sign;
