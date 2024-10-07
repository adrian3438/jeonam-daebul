import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { iframeMsgType } from './iframeMsgType';

import { xvlObjectSelection } from './xvlObjectSelection';
import { xvlFrameMessage } from './xvlFrameMessage';

// 외부에서 사용하기 위한 인터페이스
export interface EventIFrameControl {
    getSelection : () => string[],
    setViewModePan : () => void,
    setViewModeRotate : () => void,
    setViewModeZoom : () => void,
    setTransparentNormal : () => void,
    setTransparentSelect : () => void,
    setTransparentNoSelect : () => void,
    selectMainEngine : () => void,
    changeDisplay : () => void,
    home : () => void,
    setFixUp : () => void,
    setWire : () => void,
    setLine : () => void,
    setWireLine : () => void,
    setHideList : () => void
}

// IFrameControlCompnent를 위한 props
export interface PropsIFrameControl {
    id? : string,   // iFrameId
    modelingId?: string,
    modelingName?: string,
    iframePath? : string
    path?: string,
}

//      event receiver
//      redux <- XVL 현황 저장
//      redux -> XVL에 Action(명령 버튼이 눌렸다)을 전달 : postMessage
const IFrameControlCompnent = forwardRef<EventIFrameControl, PropsIFrameControl>((props,  ref) => {

	// 부모 컴포넌트에서 조회버튼 기능 이용시 사용
	useImperativeHandle(ref, () => ({
        getSelection : getSelection,
        setViewModePan : setViewModePan,
        setViewModeRotate : setViewModeRotate,
        setViewModeZoom : setViewModeZoom,
        setTransparentNormal : setTransparentNormal,
        setTransparentSelect : setTransparentSelect,
        setTransparentNoSelect : setTransparentNoSelect,
        selectMainEngine : selectMainEngine,
        changeDisplay : changeDisplay,
        home : home,
        setFixUp : setFixUp,
        setWire : setWire,
        setLine : setLine,
        setWireLine : setWireLine,
        setHideList : setHideList
	}));

  
  let iframeSrc = "";
  if( props.path == undefined ) {
    // iframeSrc = `../ModelingCtrl/index.html?assetId=${props.modelingId}&modelingName=${props.modelingName}`;
    iframeSrc = `https://marineplaza.org/dim-api/controller/ModelingCtrl/${props.iframePath}.html`
    // iframeSrc = `https://marineplaza.org/dim-api/controller/ModelingCtrl/bop-a11c.html`;
    // iframeSrc = `/ModelingCtrl/index.html`
  }
  else {
    // iframeSrc = `../ModelingCtrl/index.html?path=${props.path}&modelingName=${props.modelingName}`;
    iframeSrc = `https://marineplaza.org/dim-api/controller/ModelingCtrl/${props.iframePath}.html`
  }
  const [ selectionGroups, setSelectionGroups ] = useState<string[]>([]);
  console.log("아이프레임 링크 : ",iframeSrc)
  const getSelection = () => {
    return selectionGroups;
  }

  const selectMainEngine = () => {
      const elementId = 'BMC_ALLLINKED_LNG_Main Engine';
    //   console.log("메인엔진 선택");
      postContentMessage( iframeMsgType.ObjectSelectionTransparentMode,{ elementId : elementId } );
  }

  const setViewModePan = () => {
    postContentMessage( iframeMsgType.ViewMode, { mode : 'pan' } );
  }

  const setViewModeRotate = () => {
      postContentMessage( iframeMsgType.ViewMode, { mode : 'rotate' } );
  }

  const setViewModeZoom = () => {
      postContentMessage( iframeMsgType.ViewMode, { mode : 'zoom' } );
  }

  const setTransparentNormal = () => {
      postContentMessage( iframeMsgType.ViewModeTransparent, { mode : 'trans_normal' } );
  }

  const setTransparentSelect = () => {
      postContentMessage( iframeMsgType.ViewModeTransparent, { mode : 'trans_sel' } );
  }

  const setTransparentNoSelect = () => {
      postContentMessage( iframeMsgType.ViewModeTransparent, { mode : 'trans_no_sel' } );        
  }

  const changeDisplay = () => {
      postContentMessage( iframeMsgType.ViewModeChangeDisplay, { } );        
  }

  const home = () => {
      postContentMessage( iframeMsgType.Home, { } );        
  }

  const setFixUp = () => {
    postContentMessage(iframeMsgType.FixUp, {});
  }

  const setWire = () => {
    postContentMessage(iframeMsgType.Wire, {});
  }

  const setLine = () => {
    postContentMessage(iframeMsgType.Line, {});
  }

  const setWireLine = () => {
    postContentMessage(iframeMsgType.WireAndLine, {});
  }

  const setHideList = () => {
    postContentMessage(iframeMsgType.HideList, {})
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReceive = (e: any) => {
      // 모델 클릭했을때, 여기함수 도니까,
      // 여기서 dispatch 로 모델 아이디 값들을 보내면
      // 아이디가있으면 filter , 없으면 concat 
      // 밖에 체크박스에서는 리덕스 값 불러와서
      // checked={includes(id)} 값으로 일단 체크.

      // if(e.data.msgCode && e.data.data) {
      //     // dispatch(checkData({id:e.data?.data?.selection[0]}))
      // }

      switch (e.data.msgCode) {
          case iframeMsgType.ObjectSelection:
              const groups = e.data.data as xvlObjectSelection;
              setSelectionGroups(groups.selection);
              break;
          // 나중에 무의미한 메시지에 대해서 확인 필요
          default:
          //     console.log("알수없는 메시지입니다."); // 콘솔에 연속으로 뜨는 문제 해결하기
          //     console.log(e); // 콘솔에 연속으로 뜨는 문제 해결하기
              break;
      }
  }

  const postContentMessage = ( msgCode : iframeMsgType, data : any ) => {

      if(!iframeRef.current) {
          return ;
      }

      const packet : xvlFrameMessage = {
          msgCode : msgCode,
          data : data,
      }

      iframeRef.current.contentWindow?.postMessage( packet, "*");
  }

  useEffect(() => {
    window.addEventListener("message", handleReceive, false);
  }, [])

  return (
      <>
          {/* <ModelSideController onCheckList={handleCheckList}  /> */}
          {/* <iframe ref={iframeRef} title='xvl frame' width="100%" height="100%" style={{ position: 'relative' }}
              frameBorder="0" scrolling="no" src="../SimpleSample/index.html"></iframe> */}
          <iframe ref={iframeRef} title='xvl frame' width="100%" height="100%" style={{ position: 'relative' }}
          frameBorder="0" scrolling="no" src={iframeSrc}></iframe>

     
      </>
  )
});
IFrameControlCompnent.displayName = 'IFrameControlCompnent';
export default IFrameControlCompnent;