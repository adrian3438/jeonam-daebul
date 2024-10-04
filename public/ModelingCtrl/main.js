
(function () {
    'use strict';

    var player = null,
    controller = null,
    view3D = null,
    assyTree = null,
    // toolbar = null,
    view3DParam = {},
    assyTreeParam = {},
    // toolbarParam = {},
    COMPONENT_ID_ASSY_TREE = 'assyTree',
    dispProgress = false;

    // 초기값 저장
    var home_state = [],
    home_initCamera = {},
    home_initPosition = [],
    home_initColorTransparencies = [];

    // 기획에 따라 메시지 이름이 정해져야 함
    // 패킷 번호
    const iFrameMsgType_Home = 10000;
    const iFrameMsgType_ObjectSelection = 10001;    // 오브젝트 선택
    const iFrameMsgType_ObjectVisible = 10002;      // 보이거나 안보이거나
    const iFrameMsgType_ObjectSelectionTransparentMode = 10003;     // 선택한 것을 제외하고 불투명 처리
    const iFrameMsgType_ViewMode = 20002;       // 움직임, 줌
    const iFrameMsgType_ViewModeTransparentMode = 20003;    
    const iFrameMsgType_ViewModeChangeDisplay = 20004;
    const iFrameMsgType_FixUp = 20005;
    const iFrameMsgType_Wire = 20006;
    const iFrameMsgType_Line = 20007;
    const iFrameMsgType_WireAndLine = 20008;
    
    window.addEventListener('message',function(e){
        const msgCode = e.data.msgCode;
        const data = e.data.data;
        console.log(msgCode)

        // 메세지 타입에 따라 다르게 처리
        switch( msgCode )
        {
            case iFrameMsgType_ObjectSelection:     // 오브젝트 선택
                break;
            case iFrameMsgType_ObjectVisible:
                setObjectVisible(data);
                break;
            case iFrameMsgType_ObjectSelectionTransparentMode:      
                setSelectionTransparentMode(data);
                break;
            case iFrameMsgType_ViewMode:
                setOperationMode(data);
                break;
            case iFrameMsgType_ViewModeTransparentMode:
                setTransparentMode(data);
                break;
            case iFrameMsgType_ViewModeChangeDisplay:
                changeDisplay(data);
                break;
            case iFrameMsgType_Home:
                home(data);
                break;
            case iFrameMsgType_FixUp:
                fixUp(data);
                break;
            case iFrameMsgType_Wire:
                modelingWire(data);
                break;
            case iFrameMsgType_Line:
                modelingSurface(data);
                break;
            case iFrameMsgType_WireAndLine:
                modelingWireSurface(data);           
                break;
            
            default:
                break;
        }
    });

    function setObjectVisible( data ){
        console.log("보이고 안보이고 처리");
        console.log( data);
        const visible = data.visible;
        const elementId = data.elementId;

        console.log(player)

        const group = player.model.getGroupByElementId(elementId);
        console.log(group);
        if( visible == false ) {
            // 숨겨
            player.model.hideGroups( [ group ]);
        }
        else {
            player.model.showGroups( [ group ]);
        }
    }

    function setSelectionTransparentMode( data ) {
        console.log(data);
        const elementId = data.elementId;
        console.log(elementId);
        player.model.clearSelection();        // 선택한을 지우는 것
        const group = player.model.getGroupByElementId(elementId); // 선택할 것
        player.model.addSelection(group);
        player.selectionTransparentMode = lt.SEL_TRANS_NO_SEL;
    }

    function setOperationMode( data ) {
        console.log('setOperationMode');
        console.log(data);
		switch(data.mode) {
            case 'rotate' :
                player.view.setOperationMode({mode:'view',subMode:'examine'});
                break;
            case 'pan' :
                player.view.setOperationMode({mode:'view',subMode:'pan'});
                break;
            case 'zoom' :
                player.view.setOperationMode({mode:'view',subMode:'zoom'});
                break;
        }
    }

    function setTransparentMode( data ) {

        console.log('setTransparentMode');
        console.log(data);
		switch(data.mode) {
            case 'trans_normal' :
                player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
                break;
            case 'trans_sel' :
                if( player.selectionTransparentMode === lt.SEL_TRANS_SEL ) {
                    player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
                }
                else {
                    player.selectionTransparentMode = lt.SEL_TRANS_SEL;
                }
                break;
            case 'trans_no_sel' :
                if( player.selectionTransparentMode === lt.SEL_TRANS_NO_SEL ) {
                    player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
                }
                else {
                    player.selectionTransparentMode = lt.SEL_TRANS_NO_SEL;
                }
                break;
        }
    }

    function changeDisplay( data ) {
        var Parameters = [],
            groups = [],
            currentState;

        groups = player.model.getSelections();
        if(groups.length > 0){
            if(groups[0].visibility){
                player.model.hideGroups(groups);
            } else {
                player.model.showGroups(groups);
            }
        }
        currentState = player.model.getGroupVisibilities();

        Parameters.updateType = "VISIBILITY_UPDATE_ALL";
        Parameters.updateTagetElems = currentState;
        controller.notify(Parameters);
    }

    function home( data ) {
        console.log('home');

        player.model.setGroupVisibilities(home_state);
        player.view.setViewingCameraParameters(home_initCamera);
        player.model.setGroupPositions(home_initPosition);
        player.model.setColorTransparencies(home_initColorTransparencies);
        
        var Parameters = [];
        Parameters.updateType = "VISIBILITY_UPDATE_ALL";
        Parameters.updateTagetElems = home_state;
        controller.notify(Parameters);
    }

    function fixUp( data ){
        console.log("fixUp")
        var displaySettings = player.view.getDisplaySettings();
		displaySettings.fixUp = !displaySettings.fixUp;
		player.view.setDisplaySettings(displaySettings);
    }
    // wire 처리
    function modelingWire ( data ){
        var ds = player.view.getDisplaySettings();
        ds.displaySurface = false;
        ds.displayCurveInside = true;
        player.view.setDisplaySettings(ds);
    }
    // face 처리
    function modelingSurface ( data ){
        var ds = player.view.getDisplaySettings();
        ds.displaySurface = true;
        ds.displayCurveInside = false;
        player.view.setDisplaySettings(ds);
    }
    // line & face 처리
    function modelingWireSurface ( data ){
        var ds = player.view.getDisplaySettings();
        ds.displaySurface = true;
        ds.displayCurveInside = true;
        player.view.setDisplaySettings(ds);
    }
    // 트리 클릭 Event
    window.TreeClick = function(id, title) {
        window.parent.postMessage({ title }, "*");
    };

	function $elem(id) {
		return document.getElementById(id);
	}

	//
	// local function
	//

	function loadModelEnd() {
        
        console.log('loadModelEnd');
        
        if(!player.fileLoading){
            loadModelCompleted();
        }
	}
	
	function loadTextureEnd() {
        
        console.log('loadTextureEnd');        

        loadModelCompleted();
        
	}
 
    function loadModelCompleted() {
        
        player.view.enableRedraw = true;
        //toolbar.loadingModel = false;
        dispProgress = false;
        $('#progress_waku').hide();
        
        assyTree.createAssyTree();
        
        //toolbar.homeState = player.model.getGroupVisibilities();
        //toolbar.initCamera = player.view.getViewingCameraParameters();
        //toolbar.initPosition = player.model.getGroupPositions();
        //toolbar.initColorTransparencies = player.model.getColorTransparencies();

        // home 버튼 작동을 위해 초기값 저장
        home_state = player.model.getGroupVisibilities();
        home_initCamera = player.view.getViewingCameraParameters();
        home_initPosition = player.model.getGroupPositions();
        home_initColorTransparencies = player.model.getColorTransparencies();

        player.view.enableViewSelection = true;
        player.view.emptySelectionClear = true;
        
        player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
        
		// $('#view_mode_viewer_pan, #view_mode_viewer_rotate, #view_mode_viewer_zoom, #view_mode_viewer_region').removeClass('selected');
        // $('#view_mode_look_around, #view_mode_wt_pan, #view_mode_walk, #view_mode_wt_backAndForth, #view_mode_wt_region').removeClass('selected');
        
		// $('#view_mode_viewer_rotate').addClass('selected');
        // $('#view_mode_viewer_pickTrans').removeClass('selected');
        // $('#view_mode_viewer_pickTransNot').removeClass('selected');        
        // $('#view_mode_viewer_gazingpoint').removeClass('selected');
        
        // var ds = player.view.getDisplaySettings();
        // if(ds.fixUp){
        //     $('#view_mode_viewer_fixUp').addClass('selected');
        // } else {
        //     $('#view_mode_viewer_fixUp').removeClass('selected');
        // }
        
        // if(!ds.displaySurface && ds.displayCurveInside){
        // 	$('#view_mode_viewer_wire').addClass('selected');
        // 	$('#view_mode_viewer_shading').removeClass('selected');
        // 	$('#view_mode_viewer_wireshading').removeClass('selected');
        // } else if(ds.displaySurface && !ds.displayCurveInside){
        // 	$('#view_mode_viewer_wire').removeClass('selected');
        // 	$('#view_mode_viewer_shading').addClass('selected');
        // 	$('#view_mode_viewer_wireshading').removeClass('selected');
        // } else if(ds.displaySurface && ds.displayCurveInside){
        // 	$('#view_mode_viewer_wire').removeClass('selected');
        // 	$('#view_mode_viewer_shading').removeClass('selected');
        // 	$('#view_mode_viewer_wireshading').addClass('selected');
        // }
        
        // $('#view_mode_viewer_changeMode').removeClass('selected');
              
        // $('#view_mode_viewer_pan').show();
        // $('#view_mode_viewer_rotate').show();
        // $('#view_mode_viewer_zoom').show();
        // $('#view_mode_viewer_region').show();
        
        // $('#view_mode_viewer_gazingpoint').show();
        // $('#rotateViewLeft').show();
        // $('#rotateViewRight').show();
        // $('#view_mode_viewer_fitSelection').show();
        // $('#view_mode_viewer_fixUp').show();

        // // var toolbar1 = document.getElementById('menu_toolbar_1_body');
        // // toolbar1.style.width = toolbar.toolBarWidth;

        // $('#view_mode_wt_pan').hide();
        // $('#view_mode_walk').hide();
        // $('#view_mode_look_around').hide();
        // $('#view_mode_wt_region').hide();
        // $('#view_mode_wt_backAndForth').hide();
        
        // $('#viewFront').show();
        // $('#viewBack').show();
        // $('#viewRight').show();
        // $('#viewLeft').show();
        // $('#viewTop').show();
        // $('#viewBottom').show();
        // $('#viewIsometric1').show();
        // $('#viewIsometric2').show();
        // $('#viewIsometric3').show();
        // $('#viewIsometric4').show();        
        
        // var toolbar2 = document.getElementById('menu_toolbar_2_body');
        // toolbar2.style.height = toolbar.toolBar2Height;        
	}
    
	function loadModelProgress(event) {
        
		var percent;
        
		if(event.fileType == 'json'){
            if(event.loaded === 0 || event.total === 0 ){
                percent = 0;
            } else {
                percent = (event.loaded / event.total) / 2;   
            }
		}
		if(event.fileType == 'bin'){
            if(event.loaded === 0 || event.total === 0 ){
                percent = 0.5;
            } else {
                percent = 0.5 + (event.loaded / event.total) / 2;  
            }
		}
		percent = parseInt(percent * 100);
		$('#progress').progressbar('value', percent);
		$('#progress_waku span').text(percent + "%");
        
        if(percent !== 100 && dispProgress){
             $('#progress_waku').show();
        } else {
            $('#progress_waku').hide();
        }
	}

	function loadError(event) {
        
        player.view.enableRedraw = true;
        //toolbar.loadingModel = false;
        dispProgress = false;
        $('#progress_waku').hide();
        
        var strError = "";
        strError += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_MAIN;
        strError += event.url;
        strError += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_DETAIL;
        strError += "errorType: " + event.errorType + "\n";
        strError += "url: " + event.url + "\n";
        strError += "httpStatus: " + event.httpStatus + "\n";
		strError += "message: " + event.message + "\n";
		strError += "stack: " + event.stack + "\n";
        
        window.alert(strError);
	}
	

    // 부품 선택
    function onChangedSelection(event){
        console.log("선택변경됨");

        let data = [];
        for (const group of event.selectedGroups) {
            data.push(group.elementId);
        }
        postParentMessage( iFrameMsgType_ObjectSelection, { selection : data } );
    }

    function postParentMessage( msgCode, data ) {
        const message = {
            msgCode : msgCode,
            data : data
        };
       
        window.parent.postMessage(message,'*');
    }

    var param = {};
    param.elementId = 'web3dPlayer_main';
    param.currentCoordinate = true;
    param.backgroundColor = "#ffffff";
    param.backgroundColor2 = "#333399";
    player = new lt.Player(param);
    
    player.addEventListener('ltLoad', loadModelEnd);
    player.addEventListener('ltLoadTexture', loadTextureEnd);
    player.addEventListener('ltDownloadProgress', loadModelProgress);
    player.addEventListener('ltLoadError', loadError);
    player.addEventListener('ltSelectChange', onChangedSelection);
    
    //
    // View 3D
    //
    view3DParam.player = player;
    view3D = new View3D(view3DParam);

	assyTreeParam.isDispComponent = true;
	
	var $div = $('#' + COMPONENT_ID_ASSY_TREE);
	$div.css('width', convertInt($div.css('width')) + 'px');
	$div.css('height', convertInt($div.css('height')) + 'px');
	
	createDivComponent(COMPONENT_ID_ASSY_TREE);
	$('#assyTree_body').append($('<div id="tree"></div>'));
	$('#tree').dynatree({
		imagePath: 'dynatree/css/dynatree/custom/',
		persist: false,
		clickFolderMode: 2,
		checkbox: true,
		selectMode: 2,
		fx: {height: 'toggle', duration: 200},
		noLink: false,
		debugLevel: 0,
		additionalSelection: 'NONE',
	});   
    
    assyTreeParam.player = player;
	assyTreeParam.mainTree = $('#tree');
	assyTreeParam.scrollbar = $('#assyTree_body');
	assyTreeParam.nodeCreateLevel = 100;
	assyTreeParam.nodeExpandLevel = 1;
	assyTreeParam.topNodeName = id;
	assyTreeParam.altNameFormat = '${XVL_NAME}';
	
    assyTree = new Assytree(assyTreeParam);
    
    // toolbarParam.player = player;
    // toolbar = new Toolbar(toolbarParam);
    // toolbar.loadingModel = false;
    
    // toolbar.toolBarWalkWidth = "590px";
    // toolbar.toolBar2WalkHeight = "130px";
    // toolbar.toolBar2WalkHeightPan= "130px";
    // toolbar.toolBar2WalkHeightWalk= "130px";
    // toolbar.toolBar2WalkHeightLook= "215px";
    // toolbar.toolBar2WalkHeightRegion= "35px";
    // toolbar.toolBar2WalkHeightBack= "35px";

    controller = new Controller();
    controller.registController(view3D);
    controller.registController(assyTree);
    // controller.registController(toolbar);

    view3D.registController(controller);
    assyTree.registController(controller);
    // toolbar.registController(controller);
    
	$('#progress').progressbar({
		value: 0,
		max: 100
	});
    
    loadModel();
    
    // 이 부분에서 모델링 경로가 정해진다.
	function loadModel() {
        player.view.enableRedraw = false;
        // toolbar.loadingModel = true;        
        dispProgress = true;
        console.log("경로확인");
        console.log(url);
        player.loadFile({url: url});
	}

    
    // window.loadModel = function(name) {
    //     name = "./data/FGSS-LP-BUFFER-TANK-SKID.json";
    //     player.view.enableRedraw = false;
    //     // toolbar.loadingModel = true;        
    //     dispProgress = true;
    //     console.log("경로확인");
    //     console.log(name);
	// 	player.loadFile({url: name});
    // }
    
    // window.loadModel = loadModel;
    
    // window.TreeClick = function(id, title) {
    //     window.parent.postMessage({ title }, "*");
    // };
    
	function createDivComponent(id) {
		var $div = $('#' + id);
		var $header = $('<div id="' + id + '_header"></div>');
		var $body   = $('<div id="' + id + '_body"></div>');
		$div.append($header);
		$div.append($body);
		createSwitchControl(id);
		$header.css('height', '20px');
		$header.css('width', $div.css('width'));
		$header.css('position', 'relative');
		$body.css('width', $div.css('width'));
		$body.css('height', (convertInt($div.css('height')) - convertInt($header.css('height'))) + 'px');
		$body.css('position', 'relative');
		if ($div.hasClass('drag-drop')) {
			$div.removeClass('drag-drop');
			$header.addClass('drag-drop');
		}
	};

	function createSwitchControl(id) {
		var $header = $('#' + id + '_header');
		var $body   = $('#' + id + '_body');
		var $switch = $('<label class="switch"></label>');
		var $span   = $('<span class="label"></span>');
		var $check  = $('<input type="checkbox" checked="checked" />');
		$header.append($switch);
		$switch.append($check);
		$switch.append($span);
		$span.append($('<span class="on"></span>'));
		$span.append($('<span class="separator"></span>'));
		$span.append($('<span class="off"></span>'));
		var isPlayerComponent = false;
		$check.on('click', function() {
			if ($(this).prop('checked')) {
				$body.show();
				if (isPlayerComponent) {
					setCanvas($('#' + id));
				}
			} else {
				$body.hide();
				if (!isPlayerComponent) {
					$body.parent('div').css('height', '20px');
				}
			}
		});
	};	

    
    
}());