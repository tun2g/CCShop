import styles from './Sign.module.scss';
import classNames from 'classnames/bind';

import { useState, useEffect, useRef } from 'react';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

const cx = classNames.bind(styles);


function Sign() {
    const [isSignIn, setIsSignIn] = useState(1);
    const handleChangeSign = (num) => {
        setIsSignIn(num);
    };

    
    return (
                <div className={cx('sign')}>
                    {isSignIn===1 ? (
                        <SignIn handleChangeSign={handleChangeSign} />
                    ) : 
                    isSignIn===2?
                    (
                        <SignUp handleChangeSign={handleChangeSign} />
                    )
                    :
                    <ForgotPassword handleChangeSign={handleChangeSign} />
                }
                </div>
    );
}

export default Sign;
