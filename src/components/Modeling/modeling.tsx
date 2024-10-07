'use client'

import { useEffect, useRef, useState } from "react";
import IFrameControlCompnent, { EventIFrameControl } from "../xvl/IFrameControl";
import { useAuth } from "../Context/AuthContext";
interface Props {
    modelingUrl : string
    name : string
}
export default function ModelingComponents ({modelingUrl, name} : Props) {
    const {part , setPart} = useAuth()
    const [partsName, setPartsName] = useState<any>([]);
    const refIframeCtrl = useRef<EventIFrameControl>(null);
    console.log(partsName)
    const display = () => {
        console.log('리스트')
    }
    // Pan 클릭
    const setViewPan = () => {
        console.log('pan 클릭');
        refIframeCtrl.current?.setViewModePan();

    }
    // Rotate 클릭
    const setViewExamine = () => {
        console.log('examine 클릭')
        refIframeCtrl.current?.setViewModeRotate()
    }
    // Zoom 클릭
    const setViewZoom = () => {
        console.log('zoom 클릭')
        refIframeCtrl.current?.setViewModeZoom()
    }
    // 선택한 부품 반투명 처리
    const setTransparent = () => {
        refIframeCtrl.current?.setTransparentSelect()
    }
    // 선택한 것 외 반투명 처리
    const setTransparent_no = () => {
        refIframeCtrl.current?.setTransparentNoSelect()
    }
    // 선택한 부품 완전 투명화 처리
    const setChangeDisplay = () => {
        refIframeCtrl.current?.changeDisplay()
    }
    // 초기상태로 되돌림
    const setHome = () => {
        refIframeCtrl.current?.home()
    }
    // Z 축 고정
    const setFix_Up = () => {
        refIframeCtrl.current?.setFixUp()
    }
    // wire 처리
    const setWireFrame = () => {
        refIframeCtrl.current?.setWire()
    }
    // Line 처리
    const setLineFrame = () => {
        refIframeCtrl.current?.setLine()
    }
    // wire , Line 처리
    const setWireLineFrame = () => {
        refIframeCtrl.current?.setWireLine()
    }

    const handleCallTreeClick = (e: MessageEvent) => {
        console.log(e)
        const { title } = e.data;
        setPartsName(title);
    };

    useEffect(() => {
    window.addEventListener("message", handleCallTreeClick);
    return () => {
        window.removeEventListener("message", handleCallTreeClick);
    };
    }, []);

    const handleReceive = (e:any) => {
        console.log("모델링 클릭할 때 발생 ")
        const item = e?.data?.data;
        if(item?.selection?.length > 0) {
            setPart(item?.selection[0])
        }else{
            setPart('')
        }
        setPartsName(item?.selection)
    }

    // 통신 테스트용 : 부품 명이 변할 때마다 getPartSpec API 호출
    useEffect(()=>{
        // getPartSpec()
    },[partsName])

    useEffect(() => {
        console.log("로드됨");
        window.addEventListener("message", handleReceive, false);
    }, [])

    return(
        <>
        <div className='modeling-header'>
            <div className='h-section-1' /* onClick={()=>transSupplier(data?.companyInfo[0]?.companyId)} */>
                {/* 클릭 시. 해당 회사 페이지로 이동 (marine 내부) */}
                <span className="logoBox">
                    {/* <img src={``} alt="로고이미지" /> */}
                </span>
                <span className='logoTxt'>{name} {part && `(${part})`}</span>
            </div>
            <div className='h-section-3'>
                <div className='button-col'>
                    <ul className='view-button-box'>
                        <li onClick={setViewPan}><img className="button view_mode pan" src="/images/pan.svg" alt=""/></li>
                        <li onClick={setViewExamine}><img className="button view_mode examine" src="/images/examine.svg" alt=""/></li>
                        <li onClick={setViewZoom}><img className="button view_mode zoom" src="/images/zoom.svg" alt=""/></li>

                        <li onClick={setTransparent}><img className="button view_mode sel_trans_sel" src="/images/sel_trans_sel.svg" alt=""/></li>
                        <li onClick={setTransparent_no}><img className="button view_mode sel_trans_nosel" src="/images/sel_trans_nosel.svg" alt=""/></li>
                        <li onClick={setFix_Up}><img className="button view_mode fixUp" src="/images/fixUp.svg" alt=""/></li>
                        {/* <li onClick={setHome}><img className="button view_mode home" src="/images/home.svg" alt=""/></li> */}
                        <li className="" onClick={setWireFrame}><svg id="_3D-model-09_대지_1" data-name="3D-model-09_대지 1" xmlns="http://www.w3.org/2000/svg" width="17.311" height="21.697" viewBox="0 0 17.311 21.697"> <path id="_3D-model-09_대지_1-2" data-name="3D-model-09_대지 1" d="M45.034,25.3a.62.62,0,1,0-.661,1.05c.479.3.752.628.752.893,0,.922-2.889,2.257-7.416,2.257s-7.416-1.339-7.416-2.257,2.889-2.257,7.416-2.257a17.489,17.489,0,0,1,5.245.728.62.62,0,0,0,.384-1.178,18.683,18.683,0,0,0-5.634-.79c-4.3,0-8.656,1.2-8.656,3.5v4.328a.62.62,0,0,0,1.24,0V29.14c1.484.984,4.109,1.525,6.8,1.6v7.726c-2.687.07-5.312.612-6.8,1.6v-6.37a.62.62,0,1,0-1.24,0V41.95c0,2.3,4.357,3.5,8.656,3.5s8.656-1.2,8.656-3.5v-14.7A2.313,2.313,0,0,0,45.034,25.3Zm-14.74,16.65c0-.876,2.629-2.133,6.8-2.249V44.2C32.923,44.087,30.294,42.83,30.294,41.954ZM38.33,44.2V39.705a16.713,16.713,0,0,1,4.625.719.62.62,0,1,0,.384-1.178,18.05,18.05,0,0,0-5.014-.781v-7.73c2.687-.07,5.312-.612,6.8-1.6V40.073c-.033-.021-.058-.041-.091-.066a.62.62,0,0,0-.661,1.05c.479.3.752.628.752.893C45.125,42.83,42.5,44.087,38.33,44.2Z" transform="translate(-29.05 -23.75)" fill="#444"/> </svg> </li>
                        <li className="" onClick={setLineFrame}><svg id="_3D-model-10_대지_1" data-name="3D-model-10_대지 1" xmlns="http://www.w3.org/2000/svg"  width="16.894" height="21.283" viewBox="0 0 16.894 21.283"> <defs> <clipPath id="clip-path"> <path id="패스_2545" data-name="패스 2545" d="M38.594,25.25c-4.438,0-8.034,1.289-8.034,2.876v14.7c0,1.591,3.6,2.876,8.034,2.876s8.034-1.289,8.034-2.876v-14.7C46.627,26.539,43.032,25.25,38.594,25.25Z" transform="translate(-30.56 -25.25)"/> </clipPath> </defs> <g id="그룹_1227" data-name="그룹 1227"> <path id="패스_2527" data-name="패스 2527" d="M38.007,30.833c-4.1,0-8.447-1.153-8.447-3.29s4.352-3.294,8.447-3.294a18.937,18.937,0,0,1,5.281.69.414.414,0,0,1-.24.793A18.2,18.2,0,0,0,38,25.077c-4.492,0-7.62,1.3-7.62,2.463S33.511,30,38,30s7.62-1.3,7.62-2.463a1.344,1.344,0,0,0-.649-.934.414.414,0,1,1,.488-.669,2.006,2.006,0,0,1,.988,1.6C46.454,29.676,42.1,30.833,38.007,30.833Z" transform="translate(-29.56 -24.25)" fill="#444"/> <path id="패스_2528" data-name="패스 2528" d="M38.007,66.4c-4.1,0-8.447-1.153-8.447-3.29s4.352-3.294,8.447-3.294a18.937,18.937,0,0,1,5.281.69.414.414,0,0,1-.24.793A18.176,18.176,0,0,0,38,60.647c-4.492,0-7.62,1.3-7.62,2.463s3.128,2.463,7.62,2.463,7.62-1.3,7.62-2.463a1.344,1.344,0,0,0-.649-.934.414.414,0,0,1,.488-.669,2.006,2.006,0,0,1,.988,1.6C46.454,65.25,42.1,66.4,38.007,66.4Z" transform="translate(-29.56 -45.12)" fill="#444"/> <path id="패스_2529" data-name="패스 2529" d="M29.973,55.882a.414.414,0,0,1-.413-.413V47.2a.413.413,0,1,1,.827,0v8.261A.415.415,0,0,1,29.973,55.882Z" transform="translate(-29.56 -37.475)" fill="#444"/> <path id="패스_2530" data-name="패스 2530" d="M29.973,35.578a.414.414,0,0,1-.413-.413V31.623a.413.413,0,1,1,.827,0v3.542A.414.414,0,0,1,29.973,35.578Z" transform="translate(-29.56 -28.334)" fill="#444"/> <path id="패스_2531" data-name="패스 2531" d="M68.853,46.74a.414.414,0,0,1-.413-.413v-14.7a.413.413,0,1,1,.827,0v14.7A.412.412,0,0,1,68.853,46.74Z" transform="translate(-52.373 -28.334)" fill="#444"/> </g> <g id="그룹_1229" data-name="그룹 1229" transform="translate(0.413 0.413)"> <g id="그룹_1228" data-name="그룹 1228" clip-path="url(#clip-path)"> <path id="패스_2532" data-name="패스 2532" d="M-13.808,45.186a.423.423,0,0,1-.293-.12.412.412,0,0,1,0-.583l24.8-24.8a.412.412,0,0,1,.583.583l-24.8,24.8A.414.414,0,0,1-13.808,45.186Z" transform="translate(-4.284 -21.916)" fill="#444"/> <path id="패스_2533" data-name="패스 2533" d="M-7.677,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-7.782 -21.91)" fill="#444"/> <path id="패스_2534" data-name="패스 2534" d="M-2.007,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C22.647,20.4-2.007,45.056-2.007,45.056Z" transform="translate(-11.109 -21.91)" fill="#444"/> <path id="패스_2535" data-name="패스 2535" d="M3.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-14.43 -21.91)" fill="#444"/> <path id="패스_2536" data-name="패스 2536" d="M9.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-17.757 -21.91)" fill="#444"/> <path id="패스_2537" data-name="패스 2537" d="M14.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C39.647,20.4,14.993,45.056,14.993,45.056Z" transform="translate(-21.084 -21.91)" fill="#444"/> <path id="패스_2538" data-name="패스 2538" d="M20.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-24.405 -21.91)" fill="#444"/> <path id="패스_2539" data-name="패스 2539" d="M26.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-27.732 -21.91)" fill="#444"/> <path id="패스_2540" data-name="패스 2540" d="M31.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C56.647,20.4,31.993,45.056,31.993,45.056Z" transform="translate(-31.059 -21.91)" fill="#444"/> <path id="패스_2541" data-name="패스 2541" d="M37.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-34.38 -21.91)" fill="#444"/> <path id="패스_2542" data-name="패스 2542" d="M43.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-37.707 -21.91)" fill="#444"/> <path id="패스_2543" data-name="패스 2543" d="M48.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C73.647,20.4,48.993,45.056,48.993,45.056Z" transform="translate(-41.033 -21.91)" fill="#444"/> <path id="패스_2544" data-name="패스 2544" d="M54.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-44.354 -21.91)" fill="#444"/> </g> </g> </svg> </li>
                        <li className="" onClick={setWireLineFrame}><svg id="_3D-model-11_대지_1" data-name="3D-model-11_대지 1" xmlns="http://www.w3.org/2000/svg"  width="17.311" height="21.692" viewBox="0 0 17.311 21.692"> <defs> <clipPath id="clip-path"> <path id="패스_2526" data-name="패스 2526" d="M38.594,25.25c-4.438,0-8.034,1.289-8.034,2.876v14.7c0,1.591,3.6,2.876,8.034,2.876s8.034-1.289,8.034-2.876v-14.7C46.627,26.539,43.032,25.25,38.594,25.25Z" transform="translate(-30.56 -25.25)"/> </clipPath> </defs> <path id="패스_2507" data-name="패스 2507" d="M37.714,30.752c-4.3,0-8.654-1.2-8.654-3.5s4.356-3.5,8.654-3.5a18.718,18.718,0,0,1,5.633.789.619.619,0,0,1-.384,1.178A17.353,17.353,0,0,0,37.718,25c-4.525,0-7.414,1.339-7.414,2.256s2.889,2.256,7.414,2.256,7.414-1.339,7.414-2.256c0-.264-.273-.591-.752-.893a.62.62,0,0,1,.661-1.05,2.338,2.338,0,0,1,1.331,1.942C46.367,29.55,42.015,30.752,37.714,30.752Z" transform="translate(-29.06 -23.76)" fill="#444"/> <path id="패스_2508" data-name="패스 2508" d="M37.714,66.316c-4.3,0-8.654-1.2-8.654-3.5s4.352-3.5,8.654-3.5a18.717,18.717,0,0,1,5.633.789.619.619,0,0,1-.384,1.178,17.353,17.353,0,0,0-5.244-.727c-4.525,0-7.414,1.339-7.414,2.256s2.889,2.256,7.414,2.256,7.414-1.339,7.414-2.256c0-.264-.273-.591-.752-.893a.62.62,0,0,1,.661-1.05,2.338,2.338,0,0,1,1.331,1.942C46.367,65.114,42.015,66.316,37.714,66.316Z" transform="translate(-29.06 -44.625)" fill="#444"/> <path id="패스_2509" data-name="패스 2509" d="M29.68,55.795a.619.619,0,0,1-.62-.62V46.91a.62.62,0,1,1,1.24,0v8.261A.623.623,0,0,1,29.68,55.795Z" transform="translate(-29.06 -36.979)" fill="#444"/> <path id="패스_2510" data-name="패스 2510" d="M29.68,36.281a.619.619,0,0,1-.62-.62V31.33a.62.62,0,1,1,1.24,0v4.327A.625.625,0,0,1,29.68,36.281Z" transform="translate(-29.06 -27.838)" fill="#444"/> <path id="패스_2511" data-name="패스 2511" d="M49.12,53.619A.619.619,0,0,1,48.5,53V38.3a.62.62,0,1,1,1.24,0V53A.618.618,0,0,1,49.12,53.619Z" transform="translate(-40.466 -31.927)" fill="#444"/> <path id="패스_2512" data-name="패스 2512" d="M68.56,46.653a.619.619,0,0,1-.62-.62V31.33a.62.62,0,1,1,1.24,0v14.7A.619.619,0,0,1,68.56,46.653Z" transform="translate(-51.873 -27.838)" fill="#444"/> <g id="그룹_1226" data-name="그룹 1226" transform="translate(0.62 0.616)"> <g id="그룹_1225" data-name="그룹 1225" clip-path="url(#clip-path)"> <path id="패스_2513" data-name="패스 2513" d="M-13.659,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.325.325,0,0,1-13.659,45.227Z" transform="translate(-4.434 -22.06)" fill="#444"/> <path id="패스_2514" data-name="패스 2514" d="M-8,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1-8,45.227Z" transform="translate(-7.755 -22.06)" fill="#444"/> <path id="패스_2515" data-name="패스 2515" d="M-1.982,45.136-2.42,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-11.209 -22.06)" fill="#444"/> <path id="패스_2516" data-name="패스 2516" d="M3.688,45.136,3.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C28.343,20.477,3.688,45.136,3.688,45.136Z" transform="translate(-14.536 -22.06)" fill="#444"/> <path id="패스_2517" data-name="패스 2517" d="M9,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,9,45.227Z" transform="translate(-17.729 -22.06)" fill="#444"/> <path id="패스_2518" data-name="패스 2518" d="M15.018,45.136,14.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-21.184 -22.06)" fill="#444"/> <path id="패스_2519" data-name="패스 2519" d="M20.688,45.136,20.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C45.343,20.477,20.688,45.136,20.688,45.136Z" transform="translate(-24.511 -22.06)" fill="#444"/> <path id="패스_2520" data-name="패스 2520" d="M26,45.227a.307.307,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,26,45.227Z" transform="translate(-27.704 -22.06)" fill="#444"/> <path id="패스_2521" data-name="패스 2521" d="M32.018,45.136,31.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-31.158 -22.06)" fill="#444"/> <path id="패스_2522" data-name="패스 2522" d="M37.688,45.136,37.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C62.343,20.477,37.688,45.136,37.688,45.136Z" transform="translate(-34.485 -22.06)" fill="#444"/> <path id="패스_2523" data-name="패스 2523" d="M43,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,43,45.227Z" transform="translate(-37.679 -22.06)" fill="#444"/> <path id="패스_2524" data-name="패스 2524" d="M49.018,45.136,48.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-41.133 -22.06)" fill="#444"/> <path id="패스_2525" data-name="패스 2525" d="M54.341,45.227a.307.307,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.325.325,0,0,1,54.341,45.227Z" transform="translate(-44.332 -22.06)" fill="#444"/> </g> </g> </svg> </li>


                        <li>
                            <button type="button" onClick={setChangeDisplay}><svg id="eye-slash-solid_1_" data-name="eye-slash-solid (1)" xmlns="http://www.w3.org/2000/svg" width="15.625" height="12.5" viewBox="0 0 15.625 12.5"> <path id="eye-slash-solid_1_2" data-name="eye-slash-solid (1)" d="M.942.119a.586.586,0,0,0-.723.923L14.672,12.37a.586.586,0,0,0,.723-.923L12.826,9.435a9.727,9.727,0,0,0,1.951-2.891.776.776,0,0,0,0-.6,9.722,9.722,0,0,0-2.27-3.2A6.859,6.859,0,0,0,7.807.776,6.667,6.667,0,0,0,3.674,2.26Zm4.5,3.525A3.516,3.516,0,0,1,10.9,7.922l-.942-.737A2.346,2.346,0,0,0,7.807,3.9a1.922,1.922,0,0,0-.205.01,1.557,1.557,0,0,1,.044,1.462Zm5.447,7.275L9.1,9.513A3.516,3.516,0,0,1,4.291,6.244a3.636,3.636,0,0,1,.034-.493l-2.3-1.814A9.236,9.236,0,0,0,.837,5.944a.776.776,0,0,0,0,.6,9.722,9.722,0,0,0,2.27,3.2,6.859,6.859,0,0,0,4.7,1.968A6.417,6.417,0,0,0,10.888,10.92Z" transform="translate(0.006 0.006)" fill="#666"/> </svg> </button>
                        </li>
                        <li>
                            <button type="button" onClick={display} id="hideItem" className="item-list-btn"><svg xmlns="http://www.w3.org/2000/svg" width="23.404" height="21.283" viewBox="0 0 23.404 21.283"> <g id="_3D-model-hide-list_대지_1" data-name="3D-model-hide-list_대지 1" transform="translate(-21.98 -24.6)"> <path id="패스_2585" data-name="패스 2585" d="M33.478,35.818a.68.68,0,0,0-.678-.678h-.961a.68.68,0,0,0-.678.678v.961a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678Z" transform="translate(-5.24 -6.017)" fill="#444"/> <path id="패스_2586" data-name="패스 2586" d="M51.109,36.34H41.444a.644.644,0,1,0,0,1.288h9.665a.644.644,0,1,0,0-1.288Z" transform="translate(-10.743 -6.702)" fill="#444"/> <path id="패스_2587" data-name="패스 2587" d="M33.478,46.538a.68.68,0,0,0-.678-.678h-.961a.68.68,0,0,0-.678.678V47.5a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678Z" transform="translate(-5.24 -12.136)" fill="#444"/> <path id="패스_2588" data-name="패스 2588" d="M51.752,47.7a.643.643,0,0,0-.644-.644H41.444a.644.644,0,1,0,0,1.288h9.665A.643.643,0,0,0,51.752,47.7Z" transform="translate(-10.743 -12.821)" fill="#444"/> <path id="패스_2589" data-name="패스 2589" d="M32.8,56.58h-.961a.68.68,0,0,0-.678.678v.961a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678v-.961A.68.68,0,0,0,32.8,56.58Z" transform="translate(-5.24 -18.255)" fill="#444"/> <path id="패스_2590" data-name="패스 2590" d="M41.444,57.79a.644.644,0,1,0,0,1.288h3.811a.644.644,0,0,0,0-1.288Z" transform="translate(-10.743 -18.946)" fill="#444"/> <path id="패스_2591" data-name="패스 2591" d="M34.726,43.883H23.847a.58.58,0,0,1-.579-.579V26.467a.58.58,0,0,1,.579-.579h18.8a.58.58,0,0,1,.579.579V38.548a.644.644,0,1,0,1.288,0V26.467A1.868,1.868,0,0,0,42.645,24.6h-18.8a1.868,1.868,0,0,0-1.867,1.867V43.3a1.868,1.868,0,0,0,1.867,1.867H34.722a.644.644,0,0,0,0-1.288Z" fill="#444"/> <path id="패스_2592" data-name="패스 2592" d="M65.584,61.9a5.657,5.657,0,0,0-1.322-1.863,3.98,3.98,0,0,0-2.734-1.146,3.854,3.854,0,0,0-2.27.764l-1-.794a.516.516,0,1,0-.644.807l7.051,5.6a.516.516,0,1,0,.644-.807l-.785-.622a5.727,5.727,0,0,0,1.056-1.592A.453.453,0,0,0,65.584,61.9Zm-2.764.588a1.3,1.3,0,0,0,.069-.412,1.365,1.365,0,0,0-1.365-1.365,1.124,1.124,0,0,0-.12,0,.884.884,0,0,1,.12.451.9.9,0,0,1-.043.262l-1.206-.957a2.032,2.032,0,0,1,3.292,1.605,1.982,1.982,0,0,1-.193.858Z" transform="translate(-20.231 -19.493)" fill="#444"/> <path id="패스_2593" data-name="패스 2593" d="M61.554,66.756a2.042,2.042,0,0,1-2.043-2.043,2.108,2.108,0,0,1,.021-.288L58.194,63.37a5.509,5.509,0,0,0-.691,1.167.444.444,0,0,0,0,.348,5.657,5.657,0,0,0,1.322,1.863,3.98,3.98,0,0,0,2.734,1.146,3.764,3.764,0,0,0,1.79-.459l-1.039-.82A2.109,2.109,0,0,1,61.554,66.756Z" transform="translate(-20.257 -22.131)" fill="#444"/> </g> </svg> </button>
                        </li>
                    </ul>
                </div>
                {/* <div className="button-col">
                    <ul className="view-button-box">
                        <li onClick={setTransparent}><img className="button view_mode sel_trans_sel" src="/images/sel_trans_sel.svg" alt=""/></li>
                        <li onClick={setTransparent_no}><img className="button view_mode sel_trans_nosel" src="/images/sel_trans_nosel.svg" alt=""/></li>
                        <li onClick={setFix_Up}><img className="button view_mode fixUp" src="/images/fixUp.svg" alt=""/></li>
                        <li onClick={setHome}><img className="button view_mode home" src="/images/home.svg" alt=""/></li>
                        <li className="" onClick={setWireFrame}><svg id="_3D-model-09_대지_1" data-name="3D-model-09_대지 1" xmlns="http://www.w3.org/2000/svg" width="17.311" height="21.697" viewBox="0 0 17.311 21.697"> <path id="_3D-model-09_대지_1-2" data-name="3D-model-09_대지 1" d="M45.034,25.3a.62.62,0,1,0-.661,1.05c.479.3.752.628.752.893,0,.922-2.889,2.257-7.416,2.257s-7.416-1.339-7.416-2.257,2.889-2.257,7.416-2.257a17.489,17.489,0,0,1,5.245.728.62.62,0,0,0,.384-1.178,18.683,18.683,0,0,0-5.634-.79c-4.3,0-8.656,1.2-8.656,3.5v4.328a.62.62,0,0,0,1.24,0V29.14c1.484.984,4.109,1.525,6.8,1.6v7.726c-2.687.07-5.312.612-6.8,1.6v-6.37a.62.62,0,1,0-1.24,0V41.95c0,2.3,4.357,3.5,8.656,3.5s8.656-1.2,8.656-3.5v-14.7A2.313,2.313,0,0,0,45.034,25.3Zm-14.74,16.65c0-.876,2.629-2.133,6.8-2.249V44.2C32.923,44.087,30.294,42.83,30.294,41.954ZM38.33,44.2V39.705a16.713,16.713,0,0,1,4.625.719.62.62,0,1,0,.384-1.178,18.05,18.05,0,0,0-5.014-.781v-7.73c2.687-.07,5.312-.612,6.8-1.6V40.073c-.033-.021-.058-.041-.091-.066a.62.62,0,0,0-.661,1.05c.479.3.752.628.752.893C45.125,42.83,42.5,44.087,38.33,44.2Z" transform="translate(-29.05 -23.75)" fill="#444"/> </svg> </li>
                        <li className="" onClick={setLineFrame}><svg id="_3D-model-10_대지_1" data-name="3D-model-10_대지 1" xmlns="http://www.w3.org/2000/svg"  width="16.894" height="21.283" viewBox="0 0 16.894 21.283"> <defs> <clipPath id="clip-path"> <path id="패스_2545" data-name="패스 2545" d="M38.594,25.25c-4.438,0-8.034,1.289-8.034,2.876v14.7c0,1.591,3.6,2.876,8.034,2.876s8.034-1.289,8.034-2.876v-14.7C46.627,26.539,43.032,25.25,38.594,25.25Z" transform="translate(-30.56 -25.25)"/> </clipPath> </defs> <g id="그룹_1227" data-name="그룹 1227"> <path id="패스_2527" data-name="패스 2527" d="M38.007,30.833c-4.1,0-8.447-1.153-8.447-3.29s4.352-3.294,8.447-3.294a18.937,18.937,0,0,1,5.281.69.414.414,0,0,1-.24.793A18.2,18.2,0,0,0,38,25.077c-4.492,0-7.62,1.3-7.62,2.463S33.511,30,38,30s7.62-1.3,7.62-2.463a1.344,1.344,0,0,0-.649-.934.414.414,0,1,1,.488-.669,2.006,2.006,0,0,1,.988,1.6C46.454,29.676,42.1,30.833,38.007,30.833Z" transform="translate(-29.56 -24.25)" fill="#444"/> <path id="패스_2528" data-name="패스 2528" d="M38.007,66.4c-4.1,0-8.447-1.153-8.447-3.29s4.352-3.294,8.447-3.294a18.937,18.937,0,0,1,5.281.69.414.414,0,0,1-.24.793A18.176,18.176,0,0,0,38,60.647c-4.492,0-7.62,1.3-7.62,2.463s3.128,2.463,7.62,2.463,7.62-1.3,7.62-2.463a1.344,1.344,0,0,0-.649-.934.414.414,0,0,1,.488-.669,2.006,2.006,0,0,1,.988,1.6C46.454,65.25,42.1,66.4,38.007,66.4Z" transform="translate(-29.56 -45.12)" fill="#444"/> <path id="패스_2529" data-name="패스 2529" d="M29.973,55.882a.414.414,0,0,1-.413-.413V47.2a.413.413,0,1,1,.827,0v8.261A.415.415,0,0,1,29.973,55.882Z" transform="translate(-29.56 -37.475)" fill="#444"/> <path id="패스_2530" data-name="패스 2530" d="M29.973,35.578a.414.414,0,0,1-.413-.413V31.623a.413.413,0,1,1,.827,0v3.542A.414.414,0,0,1,29.973,35.578Z" transform="translate(-29.56 -28.334)" fill="#444"/> <path id="패스_2531" data-name="패스 2531" d="M68.853,46.74a.414.414,0,0,1-.413-.413v-14.7a.413.413,0,1,1,.827,0v14.7A.412.412,0,0,1,68.853,46.74Z" transform="translate(-52.373 -28.334)" fill="#444"/> </g> <g id="그룹_1229" data-name="그룹 1229" transform="translate(0.413 0.413)"> <g id="그룹_1228" data-name="그룹 1228" clip-path="url(#clip-path)"> <path id="패스_2532" data-name="패스 2532" d="M-13.808,45.186a.423.423,0,0,1-.293-.12.412.412,0,0,1,0-.583l24.8-24.8a.412.412,0,0,1,.583.583l-24.8,24.8A.414.414,0,0,1-13.808,45.186Z" transform="translate(-4.284 -21.916)" fill="#444"/> <path id="패스_2533" data-name="패스 2533" d="M-7.677,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-7.782 -21.91)" fill="#444"/> <path id="패스_2534" data-name="패스 2534" d="M-2.007,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C22.647,20.4-2.007,45.056-2.007,45.056Z" transform="translate(-11.109 -21.91)" fill="#444"/> <path id="패스_2535" data-name="패스 2535" d="M3.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-14.43 -21.91)" fill="#444"/> <path id="패스_2536" data-name="패스 2536" d="M9.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-17.757 -21.91)" fill="#444"/> <path id="패스_2537" data-name="패스 2537" d="M14.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C39.647,20.4,14.993,45.056,14.993,45.056Z" transform="translate(-21.084 -21.91)" fill="#444"/> <path id="패스_2538" data-name="패스 2538" d="M20.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-24.405 -21.91)" fill="#444"/> <path id="패스_2539" data-name="패스 2539" d="M26.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-27.732 -21.91)" fill="#444"/> <path id="패스_2540" data-name="패스 2540" d="M31.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C56.647,20.4,31.993,45.056,31.993,45.056Z" transform="translate(-31.059 -21.91)" fill="#444"/> <path id="패스_2541" data-name="패스 2541" d="M37.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-34.38 -21.91)" fill="#444"/> <path id="패스_2542" data-name="패스 2542" d="M43.323,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-37.707 -21.91)" fill="#444"/> <path id="패스_2543" data-name="패스 2543" d="M48.993,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583C73.647,20.4,48.993,45.056,48.993,45.056Z" transform="translate(-41.033 -21.91)" fill="#444"/> <path id="패스_2544" data-name="패스 2544" d="M54.653,45.056l-.583-.583,24.8-24.8a.417.417,0,0,1,.587,0,.412.412,0,0,1,0,.583Z" transform="translate(-44.354 -21.91)" fill="#444"/> </g> </g> </svg> </li>
                        <li className="" onClick={setWireLineFrame}><svg id="_3D-model-11_대지_1" data-name="3D-model-11_대지 1" xmlns="http://www.w3.org/2000/svg"  width="17.311" height="21.692" viewBox="0 0 17.311 21.692"> <defs> <clipPath id="clip-path"> <path id="패스_2526" data-name="패스 2526" d="M38.594,25.25c-4.438,0-8.034,1.289-8.034,2.876v14.7c0,1.591,3.6,2.876,8.034,2.876s8.034-1.289,8.034-2.876v-14.7C46.627,26.539,43.032,25.25,38.594,25.25Z" transform="translate(-30.56 -25.25)"/> </clipPath> </defs> <path id="패스_2507" data-name="패스 2507" d="M37.714,30.752c-4.3,0-8.654-1.2-8.654-3.5s4.356-3.5,8.654-3.5a18.718,18.718,0,0,1,5.633.789.619.619,0,0,1-.384,1.178A17.353,17.353,0,0,0,37.718,25c-4.525,0-7.414,1.339-7.414,2.256s2.889,2.256,7.414,2.256,7.414-1.339,7.414-2.256c0-.264-.273-.591-.752-.893a.62.62,0,0,1,.661-1.05,2.338,2.338,0,0,1,1.331,1.942C46.367,29.55,42.015,30.752,37.714,30.752Z" transform="translate(-29.06 -23.76)" fill="#444"/> <path id="패스_2508" data-name="패스 2508" d="M37.714,66.316c-4.3,0-8.654-1.2-8.654-3.5s4.352-3.5,8.654-3.5a18.717,18.717,0,0,1,5.633.789.619.619,0,0,1-.384,1.178,17.353,17.353,0,0,0-5.244-.727c-4.525,0-7.414,1.339-7.414,2.256s2.889,2.256,7.414,2.256,7.414-1.339,7.414-2.256c0-.264-.273-.591-.752-.893a.62.62,0,0,1,.661-1.05,2.338,2.338,0,0,1,1.331,1.942C46.367,65.114,42.015,66.316,37.714,66.316Z" transform="translate(-29.06 -44.625)" fill="#444"/> <path id="패스_2509" data-name="패스 2509" d="M29.68,55.795a.619.619,0,0,1-.62-.62V46.91a.62.62,0,1,1,1.24,0v8.261A.623.623,0,0,1,29.68,55.795Z" transform="translate(-29.06 -36.979)" fill="#444"/> <path id="패스_2510" data-name="패스 2510" d="M29.68,36.281a.619.619,0,0,1-.62-.62V31.33a.62.62,0,1,1,1.24,0v4.327A.625.625,0,0,1,29.68,36.281Z" transform="translate(-29.06 -27.838)" fill="#444"/> <path id="패스_2511" data-name="패스 2511" d="M49.12,53.619A.619.619,0,0,1,48.5,53V38.3a.62.62,0,1,1,1.24,0V53A.618.618,0,0,1,49.12,53.619Z" transform="translate(-40.466 -31.927)" fill="#444"/> <path id="패스_2512" data-name="패스 2512" d="M68.56,46.653a.619.619,0,0,1-.62-.62V31.33a.62.62,0,1,1,1.24,0v14.7A.619.619,0,0,1,68.56,46.653Z" transform="translate(-51.873 -27.838)" fill="#444"/> <g id="그룹_1226" data-name="그룹 1226" transform="translate(0.62 0.616)"> <g id="그룹_1225" data-name="그룹 1225" clip-path="url(#clip-path)"> <path id="패스_2513" data-name="패스 2513" d="M-13.659,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.325.325,0,0,1-13.659,45.227Z" transform="translate(-4.434 -22.06)" fill="#444"/> <path id="패스_2514" data-name="패스 2514" d="M-8,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1-8,45.227Z" transform="translate(-7.755 -22.06)" fill="#444"/> <path id="패스_2515" data-name="패스 2515" d="M-1.982,45.136-2.42,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-11.209 -22.06)" fill="#444"/> <path id="패스_2516" data-name="패스 2516" d="M3.688,45.136,3.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C28.343,20.477,3.688,45.136,3.688,45.136Z" transform="translate(-14.536 -22.06)" fill="#444"/> <path id="패스_2517" data-name="패스 2517" d="M9,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,9,45.227Z" transform="translate(-17.729 -22.06)" fill="#444"/> <path id="패스_2518" data-name="패스 2518" d="M15.018,45.136,14.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-21.184 -22.06)" fill="#444"/> <path id="패스_2519" data-name="패스 2519" d="M20.688,45.136,20.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C45.343,20.477,20.688,45.136,20.688,45.136Z" transform="translate(-24.511 -22.06)" fill="#444"/> <path id="패스_2520" data-name="패스 2520" d="M26,45.227a.307.307,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,26,45.227Z" transform="translate(-27.704 -22.06)" fill="#444"/> <path id="패스_2521" data-name="패스 2521" d="M32.018,45.136,31.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-31.158 -22.06)" fill="#444"/> <path id="패스_2522" data-name="패스 2522" d="M37.688,45.136,37.25,44.7l24.8-24.8a.31.31,0,0,1,.438.438C62.343,20.477,37.688,45.136,37.688,45.136Z" transform="translate(-34.485 -22.06)" fill="#444"/> <path id="패스_2523" data-name="패스 2523" d="M43,45.227a.306.306,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.31.31,0,0,1,43,45.227Z" transform="translate(-37.679 -22.06)" fill="#444"/> <path id="패스_2524" data-name="패스 2524" d="M49.018,45.136,48.58,44.7l24.8-24.8a.31.31,0,0,1,.438.438Z" transform="translate(-41.133 -22.06)" fill="#444"/> <path id="패스_2525" data-name="패스 2525" d="M54.341,45.227a.307.307,0,0,1-.219-.091.312.312,0,0,1,0-.438l24.8-24.8a.31.31,0,0,1,.438.438l-24.8,24.8A.325.325,0,0,1,54.341,45.227Z" transform="translate(-44.332 -22.06)" fill="#444"/> </g> </g> </svg> </li>
                    </ul>
                </div>
                <div className="button-col">
                    <button type="button" onClick={setChangeDisplay}><svg id="eye-slash-solid_1_" data-name="eye-slash-solid (1)" xmlns="http://www.w3.org/2000/svg" width="15.625" height="12.5" viewBox="0 0 15.625 12.5"> <path id="eye-slash-solid_1_2" data-name="eye-slash-solid (1)" d="M.942.119a.586.586,0,0,0-.723.923L14.672,12.37a.586.586,0,0,0,.723-.923L12.826,9.435a9.727,9.727,0,0,0,1.951-2.891.776.776,0,0,0,0-.6,9.722,9.722,0,0,0-2.27-3.2A6.859,6.859,0,0,0,7.807.776,6.667,6.667,0,0,0,3.674,2.26Zm4.5,3.525A3.516,3.516,0,0,1,10.9,7.922l-.942-.737A2.346,2.346,0,0,0,7.807,3.9a1.922,1.922,0,0,0-.205.01,1.557,1.557,0,0,1,.044,1.462Zm5.447,7.275L9.1,9.513A3.516,3.516,0,0,1,4.291,6.244a3.636,3.636,0,0,1,.034-.493l-2.3-1.814A9.236,9.236,0,0,0,.837,5.944a.776.776,0,0,0,0,.6,9.722,9.722,0,0,0,2.27,3.2,6.859,6.859,0,0,0,4.7,1.968A6.417,6.417,0,0,0,10.888,10.92Z" transform="translate(0.006 0.006)" fill="#666"/> </svg> </button>
                    <button type="button" className="item-list-btn"><svg xmlns="http://www.w3.org/2000/svg" width="23.404" height="21.283" viewBox="0 0 23.404 21.283"> <g id="_3D-model-hide-list_대지_1" data-name="3D-model-hide-list_대지 1" transform="translate(-21.98 -24.6)"> <path id="패스_2585" data-name="패스 2585" d="M33.478,35.818a.68.68,0,0,0-.678-.678h-.961a.68.68,0,0,0-.678.678v.961a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678Z" transform="translate(-5.24 -6.017)" fill="#444"/> <path id="패스_2586" data-name="패스 2586" d="M51.109,36.34H41.444a.644.644,0,1,0,0,1.288h9.665a.644.644,0,1,0,0-1.288Z" transform="translate(-10.743 -6.702)" fill="#444"/> <path id="패스_2587" data-name="패스 2587" d="M33.478,46.538a.68.68,0,0,0-.678-.678h-.961a.68.68,0,0,0-.678.678V47.5a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678Z" transform="translate(-5.24 -12.136)" fill="#444"/> <path id="패스_2588" data-name="패스 2588" d="M51.752,47.7a.643.643,0,0,0-.644-.644H41.444a.644.644,0,1,0,0,1.288h9.665A.643.643,0,0,0,51.752,47.7Z" transform="translate(-10.743 -12.821)" fill="#444"/> <path id="패스_2589" data-name="패스 2589" d="M32.8,56.58h-.961a.68.68,0,0,0-.678.678v.961a.68.68,0,0,0,.678.678H32.8a.68.68,0,0,0,.678-.678v-.961A.68.68,0,0,0,32.8,56.58Z" transform="translate(-5.24 -18.255)" fill="#444"/> <path id="패스_2590" data-name="패스 2590" d="M41.444,57.79a.644.644,0,1,0,0,1.288h3.811a.644.644,0,0,0,0-1.288Z" transform="translate(-10.743 -18.946)" fill="#444"/> <path id="패스_2591" data-name="패스 2591" d="M34.726,43.883H23.847a.58.58,0,0,1-.579-.579V26.467a.58.58,0,0,1,.579-.579h18.8a.58.58,0,0,1,.579.579V38.548a.644.644,0,1,0,1.288,0V26.467A1.868,1.868,0,0,0,42.645,24.6h-18.8a1.868,1.868,0,0,0-1.867,1.867V43.3a1.868,1.868,0,0,0,1.867,1.867H34.722a.644.644,0,0,0,0-1.288Z" fill="#444"/> <path id="패스_2592" data-name="패스 2592" d="M65.584,61.9a5.657,5.657,0,0,0-1.322-1.863,3.98,3.98,0,0,0-2.734-1.146,3.854,3.854,0,0,0-2.27.764l-1-.794a.516.516,0,1,0-.644.807l7.051,5.6a.516.516,0,1,0,.644-.807l-.785-.622a5.727,5.727,0,0,0,1.056-1.592A.453.453,0,0,0,65.584,61.9Zm-2.764.588a1.3,1.3,0,0,0,.069-.412,1.365,1.365,0,0,0-1.365-1.365,1.124,1.124,0,0,0-.12,0,.884.884,0,0,1,.12.451.9.9,0,0,1-.043.262l-1.206-.957a2.032,2.032,0,0,1,3.292,1.605,1.982,1.982,0,0,1-.193.858Z" transform="translate(-20.231 -19.493)" fill="#444"/> <path id="패스_2593" data-name="패스 2593" d="M61.554,66.756a2.042,2.042,0,0,1-2.043-2.043,2.108,2.108,0,0,1,.021-.288L58.194,63.37a5.509,5.509,0,0,0-.691,1.167.444.444,0,0,0,0,.348,5.657,5.657,0,0,0,1.322,1.863,3.98,3.98,0,0,0,2.734,1.146,3.764,3.764,0,0,0,1.79-.459l-1.039-.82A2.109,2.109,0,0,1,61.554,66.756Z" transform="translate(-20.257 -22.131)" fill="#444"/> </g> </svg> </button>
                </div> */}
            </div>
        </div>
        <div style={{width : '100%' , height : '100%', marginTop: '-56px'}}>
            {/* <button className='mobileTreeBtn'>treeBtn</button> */}
            <IFrameControlCompnent ref={refIframeCtrl} iframePath={modelingUrl}/>
        </div>
        </>
    )
}
