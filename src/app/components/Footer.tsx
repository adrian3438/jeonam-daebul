export default function Footer() {
    return (
        <footer>
            <ul>
                <li className="bom">
                    <button>BOM</button>
                    <ul>
                        <li>
                            <button>부자재</button>
                        </li>
                        <li>
                            <button>소요강재표</button>
                        </li>
                    </ul>
                </li>
                <li className="manage">
                    <button>도면관리</button>
                    <ul>
                        <li>
                            <button>가공도</button>
                        </li>
                        <li>
                            <button>공작도</button>
                        </li>
                    </ul>
                </li>
                <li className="camera">
                    <button>검사 관리</button>
                </li>
            </ul>
        </footer>
    )
}