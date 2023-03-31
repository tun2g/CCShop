import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';
import classNames from 'classnames/bind';
import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

function UserLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default UserLayout;
