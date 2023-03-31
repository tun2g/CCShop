import Header from '../../components/Layouts/Header';
import Sidebar from '../../components/Layouts/Sidebar';
import Footer from '../../components/Layouts/Footer';
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
