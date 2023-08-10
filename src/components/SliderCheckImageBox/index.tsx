/**
 * Created by gqd at 2023/08/10.
 * 滑动验证组件
 *  props {
 *      checkImageInfo: object<{initData: boolean, ylocation: number, maskImg: string, backImg: string}>, // 控制Modal显隐
 *      checkImageBoxVisible: boolean, // 控制Modal显隐
 *      setCheckImageBoxVisible: (flag: boolean) => void, // 设置Modal显隐变量
 *      sendDataAjaxFn: (xlocation: number) => Promise, // 发送校验数据的请求方法，返回Promise可进行链式回调
 *      refreshCallback: () => void, // 点击刷新的回调函数
 *      successCallback: (res: any) => void, // 校验请求成功后的回调函数
 *      errorCallback: (res: any) => void, // 校验请求失败后的回调函数
 *      cancelBtnCallback?: (res: any) => void, // 关闭模态框的回调函数
 *  }
 */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  // Icon,
  message,
  Modal,
  Spin,
} from 'antd';
import { CloseOutlined, RedoOutlined } from '@ant-design/icons';

import constants from '@/utils/constants';

import styles from './index.less';

import defaultBackImg from '@/assets/sliderCheckImage/sample_after.png';
import defaultMaskImg from '@/assets/sliderCheckImage/sample_after_mark.png';
// const rightArrowImg = require('../../img/login/slider_icon.png');
import rightArrowCorrectImg from '@/assets/sliderCheckImage/success_cover.png';
import rightArrowErrorImg from '@/assets/sliderCheckImage/red_error.png';

// 验证码滑块边界常量
const sliderBackWidth = 300;
const sliderMaskWidth = 30;
// 一些颜色常量
// const normalColorStr = '#f9fbfc';
// const hoverColorStr = '#deee97';
// const successColorStr = '#79e77e';
// const errorColorStr = '#e73c4a';

interface SliderCheckImageBoxProps {
  // props passed by Component
  checkImageInfo: any;
  checkImageBoxVisible: boolean; // 控制Modal显隐
  setCheckImageBoxVisible: (flag: boolean) => void; // 设置Modal显隐变量
  sendDataAjaxFn: (ajaxData: any) => Promise<any>; // 发送校验数据的请求方法，返回Promise可进行链式回调
  refreshCallback: (res: any) => void; // 校验请求成功后的回调函数
  successCallback: (res: any) => void; // 校验请求成功后的回调函数
  errorCallback: (res: any) => void; // 校验请求成功后的回调函数
  cancelBtnCallback?: () => void; // 关闭模态框的回调函数
}

const SliderCheckImageBox: React.FC<SliderCheckImageBoxProps> = (props) => {
  // states
  const [verifyFlag, setVerifyFlag] = useState(false);
  const [verifyRetFlag, setVerifyRetFlag] = useState(false);
  const [mouseInitPos, setMouseInitPos] = useState({ x: 0, y: 0 });
  const [moveXLocation, setMoveXLocation] = useState(0);
  const [sliderImgMaskStyles, setSliderImgMaskStyles] = useState({ marginTop: 50 });
  const [sliderStart, setSliderStart] = useState(false);
  const [sliderYArray, setSliderYArray] = useState(Array<any>());
  const [loading, setLoading] = useState(false);

  // DOM refs
  const sliderArrowEle = useRef<HTMLDivElement>(null); // 可拖动元素
  const sliderImageMask = useRef<HTMLImageElement>(null); // 小图片元素

  const {
    checkImageInfo = { initData: true, ylocation: 50, maskImg: defaultMaskImg, backImg: defaultBackImg, },
    checkImageBoxVisible = false,
    setCheckImageBoxVisible,
    sendDataAjaxFn,
    refreshCallback,
    successCallback,
    errorCallback,
    cancelBtnCallback,
  } = props;

  /**
   * 重置验证码数据
   */
  const resetCheckImageBox = () => {
    // DONE: 调整验证码相关state为初始值
    setVerifyFlag(false);
    setVerifyRetFlag(false);
    setMoveXLocation(0);
    setSliderImgMaskStyles({ marginTop: 50 }); // 小图片位置初始化
    setSliderStart(false);
    setSliderYArray([]);
    setLoading(false);
    // setSliderMaskStyles({width: 0, backgroundColor: normalColorStr}); // 滑过的路径初始化
    // setSliderArrowStyles({marginLeft: 0}); // 箭头位置初始化
    // @ts-ignore
    if (sliderArrowEle && sliderArrowEle.current) sliderArrowEle.current.style.marginLeft = 0;
    // @ts-ignore
    if (sliderImageMask && sliderImageMask.current) sliderImageMask.current.style.marginLeft = 0;
  };

  const onRefreshBtnClick = () => {
    resetCheckImageBox()
    if (typeof refreshCallback === 'function') {
      refreshCallback()
    }
  }

  /**
   * 滑块鼠标移动时的回调函数
   * @param e Event object.
   */
  const _sliderMouseMove = (e: any) => {
    if (!sliderStart) return false;
    // 获取鼠标移动位置
    const eventX = e.clientX || e.touches[0].clientX;
    // const eventY = e.clientY || e.touches[0].clientY;
    const moveX = eventX - mouseInitPos.x;
    // const moveY = eventY - mouseInitPos.y;
    // 暂存y轴的位移，方便判断是否是机器人
    // let tempArrayY = sliderYArray.slice();
    // tempArrayY.push(moveY);
    setMoveXLocation(moveX);
    // 边界判断
    if (moveX < 0 || moveX + sliderMaskWidth > sliderBackWidth) {
      return false;
    } else {
      // setSliderYArray(tempArrayY);
      // setSliderArrowStyles({marginLeft: moveX});
      // setSliderMaskStyles({...sliderMaskStyles, width: moveX});
      // setSliderImgMaskStyles({...sliderImgMaskStyles, marginLeft: moveX});
      // @ts-ignore
      sliderArrowEle.current.style.marginLeft = `${moveX}px`; // 1. 改变slider 箭头的位置
      // @ts-ignore
      sliderImageMask.current.style.marginLeft = `${moveX}px`; // 2. 改变验证码小图片的位置
    }
  };

  /**
   * 松开鼠标后需要与后台进行交互，发送请求
   * @param ajaxData any 进行校验发送的数据
   */
  const sliderCheckAjax = (ajaxData: any) => {
    setLoading(true);
    // let $this = this;
    sendDataAjaxFn(ajaxData.xLocation).then((res) => {
      if (res.status === constants.REQUEST_STATUS.SUCCESS) {
        setLoading(false);
        setVerifyRetFlag(true);
        message.success('操作成功，即将跳转！');
        setTimeout(() => successCallback(res), 1000);
      } else {
        setLoading(false);
        setVerifyRetFlag(false);
        // message.error(`操作失败：${res.message}`);
        setTimeout(() => {
          resetCheckImageBox();
          errorCallback(res);
        }, 1000);
      }
    });
  };

  /**
   * 校验Y轴变量
   * @param arr Array Y轴变动数组
   */
  const _verifyYArray = (arr: any[]) => {
    if (arr.length < 1) return false;
    const sumY = arr.reduce((v1, v2) => v1 + v2);
    const average = sumY / arr.length;
    // return average !== 0;
    // y轴没有改变则算机器人
    let same = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === average) {
        same = true;
        break;
      }
    }
    return !same;
  };

  /**
   * 滑块鼠标结束移动并松开按键时的回调函数
   * 此时进行位置校验
   * @param e Event object.
   */
  const _sliderMouseUp = () => {
    if (!sliderStart) return false;
    if (!checkImageInfo) {
      // 未获取到验证图片，不允许验证
      return false;
    }
    setSliderStart(false);
    setVerifyFlag(true); // 已经进行了验证
    setLoading(true);
    // DONE: 发送请求
    const finalX = sliderArrowEle.current.style.marginLeft;
    const data = {
      xLocation: parseInt(finalX),
      // uniqueNum: checkImageInfo.uniqueNum,
    };
    sliderCheckAjax(data);
  };

  /**
   * 滑块鼠标按下时的回调函数
   * @param e Event object.
   */
  const _sliderMouseDown = (e: any) => {
    if (!checkImageInfo) return false;
    // 将是否重置标识置为false
    setSliderStart(true);
    setMouseInitPos({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
    // setSliderMaskStyles({...sliderMaskStyles, backgroundColor: hoverColorStr});
  };

  /**
   * 初始化绑定事件
   * 组件卸载前卸载事件
   */
  useEffect(() => {
    resetCheckImageBox();
    return () => { // unmount
    }
  }, []);

  /**
   * 优化滑动事件绑定
   */
  useEffect(() => {
    if (sliderStart) {
      // DONE: 事件绑定
      document.addEventListener('mousemove', _sliderMouseMove);
      document.addEventListener('mouseup', _sliderMouseUp);
      // 移动端事件
      document.addEventListener('touchmove', _sliderMouseMove);
      document.addEventListener('touchend', _sliderMouseUp);
    } else {
      // 事件解除绑定
      document.removeEventListener('mousemove', _sliderMouseMove);
      document.removeEventListener('mouseup', _sliderMouseUp);
      // 移动端事件
      document.removeEventListener('touchmove', _sliderMouseMove);
      document.removeEventListener('touchend', _sliderMouseUp);
    }
    return () => {
      // 事件解除绑定
      document.removeEventListener('mousemove', _sliderMouseMove);
      document.removeEventListener('mouseup', _sliderMouseUp);
      // 移动端事件
      document.removeEventListener('touchmove', _sliderMouseMove);
      document.removeEventListener('touchend', _sliderMouseUp);
    }
  }, [sliderStart, _sliderMouseMove, _sliderMouseUp])

  //useEffect 控制每次状态变化带来的副操作
  useEffect(() => {
    if (checkImageInfo) {
      // 请求验证码过后进行小图片顶部距离的渲染。
      setSliderImgMaskStyles({ marginTop: checkImageInfo.ylocation });
    }
  }, [checkImageInfo]);

  return (
    <Modal
      open={checkImageBoxVisible}
      bodyStyle={{ padding: '10px' }}
      centered={true}
      destroyOnClose
      title="请进行验证"
      onOk={() => resetCheckImageBox()}
      onCancel={() => {
        setCheckImageBoxVisible(false);
        if (typeof cancelBtnCallback === 'function') {
          cancelBtnCallback();
        }
      }}
      cancelButtonProps={{ type: 'default', icon: <CloseOutlined /> }}
      cancelText="关闭"
      okButtonProps={{ type: 'primary', icon: <RedoOutlined /> }}
      okText="刷新"
    >
      <Spin spinning={loading}>
        <div className={styles.loginCheckImageBox}>
          <div className={styles.loginCheckImageContent}>
            <img
              ref={sliderImageMask}
              className={styles.loginCheckImageMask}
              src={checkImageInfo.maskImg || defaultMaskImg}
              style={sliderImgMaskStyles}
              draggable="false"
            />
            <img
              className={styles.loginCheckImageBack}
              src={checkImageInfo.backImg || defaultBackImg}
              draggable="false"
            />
          </div>
          <div className={styles.loginCheckImageSlider}>
            {/* <div className="loginCheckImageSliderArrow" onMouseDown={this._sliderMouseDown} onMouseMove={this._sliderMouseMove} onMouseUp={this._sliderMouseUp} style={sliderArrowStyles}> */}
            <div
              ref={sliderArrowEle}
              className={styles.loginCheckImageSliderArrow}
              onMouseDown={_sliderMouseDown}
              onTouchStart={_sliderMouseDown}
            >
              {/* <img src={rightArrowImg} draggable="false" /> */}
            </div>
            <div className={styles.loginCheckImageSliderMask} />
          </div>
          {verifyFlag && verifyRetFlag ? (
            <div
              className={`${styles.loginCheckImageResultCover} ${styles.loginCheckImageResultSuccessCover}`}
            >
              <img src={rightArrowCorrectImg} alt="验证通过" />
              <p>验证通过</p>
            </div>
          ) : null}
          {verifyFlag && !loading && !verifyRetFlag ? (
            <div
              className={`${styles.loginCheckImageResultCover} ${styles.loginCheckImageResultErrorCover}`}
            >
              <img src={rightArrowErrorImg} alt="验证失败" />
              <p>验证失败</p>
            </div>
          ) : null}
        </div>
      </Spin>
    </Modal>
  );
};

export default SliderCheckImageBox;
