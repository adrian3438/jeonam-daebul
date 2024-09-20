export enum iframeMsgType {
    Home = 10000,                           // 초기화
    ObjectSelection = 10001,                // 오브젝트 선택
    ObjectVisible = 10002,                  // 보이거나 안 보이거나
    ObjectSelectionTransparentMode = 10003, // 선택한 것을 제외하고 불투명 처리
    ObjectColoring = 10004,                 // 색상지정
    ObjectRemove = 10005,                   // 오브젝트 삭제
    ObjectNotAllowSelection = 10006,        // 선택 금지
    CameraPosition = 20001,
    ViewMode = 20002,                       // Operation Mode 수정
    ViewModeTransparent = 20003,            // 반투명모드 설정
    ViewModeChangeDisplay = 20004,          // 선택된 오브젝트 표시변경
    FixUp = 20005,  // Z축 고정
    Wire = 20006,   // wire 처리
    Line = 20007,   // line 처리
    WireAndLine = 20008,     // wire & line 처리
    HideList = 20009
}
