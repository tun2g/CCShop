import Header from '../../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <>
            <Header />
            <div>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;
