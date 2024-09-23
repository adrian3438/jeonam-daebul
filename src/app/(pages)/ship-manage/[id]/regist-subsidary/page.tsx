import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";
import Image from "next/image";

export default function SubsidaryRegist() {
    return (
        <>
            <div className="subsidary-manage-regist">
                <section>
                    <div>
                        <h2>대조 대표 이미지 (<span>*</span>)</h2>
                        <input type="file"/>
                        <p className="uploaded-img">
                            <Image src="/images/@temp/uploaded-img-sample.jpg" alt="대조" width={81} height={23}/>
                            <span>test-shi9p01.jpg</span>
                        </p>
                    </div>
                    <div>
                        <h2>대조명 (<span>*</span>)</h2>
                        <input type="text" className="ship-name"/>
                    </div>
                    <div>
                        <h2>대조 특이사항 (<span>*</span>)</h2>
                        <textarea></textarea>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>모델링 파일</h2>
                        <div>
                            <p><label>JSON</label><input type="file"/></p>
                            <p><label>BIN</label><input type="file"/></p>
                            <p><label>XVL</label><input type="file"/></p>
                        </div>
                    </div>
                    <div>
                        <h2>협력업체</h2>
                        <div>
                            <label>
                                <input type="checkbox"/>
                                태광산업
                            </label>
                            <label>
                                <input type="checkbox"/>
                                영진용접
                            </label>
                            <label>
                                <input type="checkbox"/>
                                대한조선
                            </label>
                            <label>
                                <input type="checkbox"/>
                                업체명
                            </label>
                            <label>
                                <input type="checkbox"/>
                                업체명
                            </label>
                            <label>
                                <input type="checkbox"/>
                                업체명
                            </label>
                        </div>
                    </div>
                </section>
            </div>
            <div className="btns2">
            <button>저장</button>
            </div>
        </>
    )
}