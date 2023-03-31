import React, { useState, useRef, useEffect } from 'react';
import styles from './ScrollbarComponent.module.scss'
import classNames from 'classnames/bind';

const cx= classNames.bind(styles)

const ScrollbarComponent = ({ children }) => {
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [children]);
  return (
    <div className={cx("scroll-container")}>
      
      <div className={cx("scroll-content")} style={{height:"300px"}} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};



export default ScrollbarComponent;