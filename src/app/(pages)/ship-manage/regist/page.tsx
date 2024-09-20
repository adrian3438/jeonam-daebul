import "@/app/assets/main.scss";
import "@/app/assets/ship-manage.scss";
import React from "react";

export default function SubsidaryRegist() {
    return (
        <div>
            <div className="ship-manage-regist">
                <section>
                    <div>
                        <h2>선종 대표 이미지 (<span>*</span>)</h2>
                        <input type="file"/>
                    </div>
                    <div>
                        <h2>선종명 (<span>*</span>)</h2>
                        <input type="text" className="ship-name"/>
                    </div>
                </section>
                <section>
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
                </section>

            </div>
            <div className="btns2">
                <button>저장</button>
            </div>
        </div>
    )
}