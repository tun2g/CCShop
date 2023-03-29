import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import classNames from 'classnames/bind';
import styles from './ShopLayout.module.scss';

const cx = classNames.bind(styles);

function ShopLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default ShopLayout;