/**
 * ツールバークラスです.
 */
Toolbar = function(params) {
	'use strict';
	var self = this;
	/** コントローラ. */
	this.controller = null;
	/** 操作モード. */
	this.opeMode;
	/** プレイヤー. */
	this.player;
	/** 操作ボタン表示フラグ. */
	this.operation = false;
	/** 視点ボタン表示フラグ. */
	this.direction = false;
	/** 初期のパートの表示状態. */
	this.homeState = [];
	/** 初期のカメラの視点. */
	this.initCamera = {};
	/** 初期のパートの配置. */
	this.initPosition = [];	
	/** モデルロード中フラグ. */
	this.loadingModel = false;
	
	/** 形状確認モード時のツールバーの幅 */
    var toolBar1ViewWidth = "215px"; 	
	
	/** ウォークスルーモード時のツールバーの幅 */
    var toolBar1WalkWidth = "470px";
	
    /** 形状確認ーモード時のツールバーの高さ */
    var toolBar2ViewHeight = "430px";
    
	/** ウォークスルーモード時のツールバーの高さ */
    var toolBar2WalkHeightPan = "130px",
    toolBar2WalkHeightWalk = "130px",
    toolBar2WalkHeightLook = "215px",
    toolBar2WalkHeightBack = "35px",
    toolBar2WalkHeightRegion = "35px";

	if (params === undefined) {
		throw new Error('ltError: Required argument. method=Toolbar, argument=params');
	} else {
		Object.keys(params).forEach(function(key) {
			self[key] = params[key];
		});
	}

	/**
	 * 他のオブジェクトの更新時の処理です.
	 * ※基本的に何もしません
	 * 
	 * @param params
	 */
	this.update = function(params) {
		if (params.selfObj === this) {
			switch (params.updateType) {
			default:
				break;
			}
		}
	};

	/**
	 * Controllerを設定します.
	 * 
	 * @param controller
	 */
	this.registController = function(controller) {
		this.controller = controller;
	};

	$('.view_mode').each(function() {
		$(this).on('click', clickViewMode);
	});

	if ($('.img_header').length > 0) {
		$('.img_header').on('click', function() {
			var $img = $(this);
			var src = $img.attr('src');
			if (src.indexOf('open') !== -1) {
				$img.attr('src', $img.attr('src').replace('open', 'close'));
				$img.parent('div').parent('div').children('div:last-child').hide();
			} else {
				$img.attr('src', $img.attr('src').replace('close', 'open'));
				$img.parent('div').parent('div').children('div:last-child').show();
			}
		});
		$('.img_header').on('mouseover', function() {
			$(this).css('cursor', 'pointer');
		});
	}

	/**
	 * アイコンクリック時の処理です.
	 * pan, examine, zoom, region, view_target, fit_selection の場合のみ選択状態のスタイルを反映
	 * 
	 * @param event
	 */
	function clickViewMode(event) {
		if (self.loadingModel) {
			window.alert('モデル読み込み中です。ツールバーの操作はできません。');
			return;
		}
		var button = event.target.className.replace('button view_mode ', '').replace(' selected', '');
		switch (button) {
		case 'walkthrough':
			self.walkthrough();
			return;		
		case 'home':
			self.home();
			return;
		case 'pan':
		case 'zoom':
		case 'region':
		case 'examine':
			self.player.view.setOperationMode({mode: 'view', subMode: button});
			break;
		case 'view_target':
			if (self.player.view.getOperationMode().subMode === 'gazingPoint') {
				setViewGazingPointModeEnd();
			} else {
				self.opeMode = self.player.view.getOperationMode();
				self.player.view.setOperationMode({mode: 'view', subMode: 'gazingPoint'});
			}
			break;
		case 'wt_pan':
			self.walkthroughPan();
			break;			
		case 'wt_walk':
			self.walkthroughWalk();		
			break;			
		case 'wt_look_around':
			self.walkthroughLookAround();			
			break;			
		case 'wt_region':
			self.walkthroughRegion();
			break;			
		case 'wt_backAndForth':
			self.walkthroughBackAndForth();			
			break;			
		case 'area_fit':
			self.player.view.fit(self.player.model.getSelections());
			return;
		case 'rotate_left':
			self.player.view.rotateViewingCamera(0, 0, 90.0);
			return;
		case 'rotate_right':
			self.player.view.rotateViewingCamera(0, 0, -90.0);
			return;
		case 'sel_trans_sel':
			self.selTransSel();
			return;
		case 'sel_trans_nosel':
			self.selTransNosel();
			return;
		case 'fixUp':
			self.fixUp();
			return;			
		case 'fit_selection':
			self.fitSelection();
			return;
		case 'change_display':
			self.changeDisplay();
			return;
		case 'front':
		case 'back':
		case 'right':
		case 'left':
		case 'top':
		case 'bottom':
		case 'isometric1':
		case 'isometric2':
		case 'isometric3':
		case 'isometric4':
			self.player.view.setDirection(button);
			return;
		case 'search':
			self.search($(this));
			return;
		default:
			return;
		}
		$('.view_mode').removeClass('selected');
		$(this).addClass('selected');
		
		//
		// 直前の処理で一律にツールバーの選択解除を行っているため
		// その処理に関係なく選択状態の設定が必要な処理を以下で行う
		//		
		reSelectedToolbar();
	}

	/**
	 * 注視点指定モードを終了します.
	 */
	function setViewGazingPointModeEnd() {
		self.player.view.setOperationMode(self.opeMode);
		$('.view_mode').removeClass('selected');
		//
		// 直前の処理で一律にツールバーの選択解除を行っているため
		// その処理に関係なく選択状態の設定が必要な処理を以下で行う
		//		
		reSelectedToolbar();
		if (self.opeMode.mode === 'view') {
			$('.' + self.opeMode.subMode).addClass('selected');
		}
	}

	/**
	 * フィット選択ボタンクリック時の処理です.
	 */
	this.fitSelection = function() {
		if (self.player.model.fitSelection) {
			self.player.model.fitSelection = false;
			$('.fit_selection').removeClass('selected');
		} else {
			self.player.model.fitSelection = true;
			$('.fit_selection').addClass('selected');
		}
	}

	/**
	 * 選択中のパートの表示状態を切り替えます.
	 */
	this.changeDisplay = function() {
		var groups = self.player.model.getSelections();
		if (groups.length > 0) {
			if (groups[0].visibility) {
				self.player.model.hideGroups(groups);
			} else {
				self.player.model.showGroups(groups);
			}
			var params = [];
			params.updateType = 'VISIBILITY_UPDATE_ALL';
			params.updateTagetElems = self.player.model.getGroupVisibilities();
			self.controller.notify(params);
		}
	};

	/**
	 * ホームボタンクリック時の処理です.
	 */
	this.home = function() {
		self.player.model.setGroupVisibilities(self.homeState);
        self.player.view.setViewingCameraParameters(self.initCamera);
        self.player.model.setGroupPositions(self.initPosition);		
		var params = [];
		params.updateType = 'VISIBILITY_UPDATE_ALL';
		params.updateTagetElems = self.homeState;
		self.controller.notify(params);
	};

	/**
	 * 検索ボタン(ツールバー)クリック時の処理です．
	 * 検索コンポーネントの表示 および 検索ボタン(ツールバー)の選択状態を切り替えます．
	 * 
	 */
	this.search = function($button) {
		if ($button.hasClass('selected')) {
			$('#search').hide();
			$button.removeClass('selected');
		} else {
			$('#search').show();
			$('#search_key').focus();
			$button.addClass('selected');
		}
	};
	
	/**
	 * ウォークスルーボタン(ツールバー)クリック時の処理です．
	 */
	this.walkthrough = function($button) {
		
		$('.view_mode.pan').removeClass('selected');
		$('.view_mode.examine').removeClass('selected');
		$('.view_mode.zoom').removeClass('selected');
		$('.view_mode.region').removeClass('selected');
		$('.view_mode.view_target').removeClass('selected');
		
        $('.view_mode.wt_pan').removeClass('selected');
        $('.view_mode.wt_walk').removeClass('selected');
        $('.view_mode.wt_look_around').removeClass('selected');
        $('.view_mode.wt_region').removeClass('selected');
        $('.view_mode.wt_backAndForth').removeClass('selected');		
		
		if(self.player.view.getOperationMode().mode === 'view'){
			//
			// 現在形状確認モードであるため ウォークスルーモードに変更します.
			//
			self.player.view.setOperationMode({mode:'walk',subMode:'walk'});
			
			$('.view_mode.walkthrough').addClass('selected');
			$('.view_mode.wt_walk').addClass('selected');
			
			$('.view_mode.pan').hide();
			$('.view_mode.examine').hide();
			$('.view_mode.zoom').hide();
			$('.view_mode.region').hide();
			$('.view_mode.view_target').hide();
			
			$('.view_mode.rotate_left').hide();
			$('.view_mode.rotate_right').hide();
			$('.view_mode.fit_selection').hide();
			$('.view_mode.fixUp').hide();
			
            $('.view_mode.wt_pan').show();
            $('.view_mode.wt_walk').show();
            $('.view_mode.wt_look_around').show();
            $('.view_mode.wt_region').show();
            $('.view_mode.wt_backAndForth').show();
            
            $('.view_mode.front').hide();
            $('.view_mode.back').show();
            $('.view_mode.right').show();
            $('.view_mode.left').show();
            $('.view_mode.top').hide();
            $('.view_mode.bottom').hide();
            $('.view_mode.isometric1').hide();
            $('.view_mode.isometric2').hide();
            $('.view_mode.isometric3').hide();
            $('.view_mode.isometric4').hide();
            
            var divToolbar1 = document.querySelector("#toolbar_1_body");
            toolBar1ViewWidth = divToolbar1.style.width;
            divToolbar1.style.width = toolBar1WalkWidth;
            
            var divToolbar2 = document.querySelector("#toolbar_2_body");
            divToolbar2.style.height = toolBar2WalkHeightWalk;             
			
		} else {
			//
			// 現在ウォークスルーモードであるため 形状確認モードに変更します.
			//			
			self.player.view.setOperationMode({mode:'view',subMode:'examine'});
			
			$('.view_mode.walkthrough').removeClass('selected');
			$('.view_mode.examine').addClass('selected');
			
			$('.view_mode.pan').show();
			$('.view_mode.examine').show();
			$('.view_mode.zoom').show();
			$('.view_mode.region').show();
			$('.view_mode.view_target').show();
			
			$('.view_mode.rotate_left').show();
			$('.view_mode.rotate_right').show();
			$('.view_mode.fit_selection').show();
			$('.view_mode.fixUp').show();			
			
            $('.view_mode.wt_pan').hide();
            $('.view_mode.wt_walk').hide();
            $('.view_mode.wt_look_around').hide();
            $('.view_mode.wt_region').hide();
            $('.view_mode.wt_backAndForth').hide();
			
            $('.view_mode.front').show();
            $('.view_mode.back').show();
            $('.view_mode.right').show();
            $('.view_mode.left').show();
            $('.view_mode.top').show();
            $('.view_mode.bottom').show();
            $('.view_mode.isometric1').show();
            $('.view_mode.isometric2').show();
            $('.view_mode.isometric3').show();
            $('.view_mode.isometric4').show();
            
            var divToolbar1 = document.querySelector("#toolbar_1_body");
            divToolbar1.style.width = toolBar1ViewWidth;            
            
            var divToolbar2 = document.querySelector("#toolbar_2_body");
            divToolbar2.style.height = toolBar2ViewHeight;
		}
		
	};
	
	/**
	 * 上方向固定ボタンクリック時の処理です.
	 */
	this.fixUp = function() {
		var displaySettings = self.player.view.getDisplaySettings();
		displaySettings.fixUp = !displaySettings.fixUp;
		self.player.view.setDisplaySettings(displaySettings);
		
		if (displaySettings.fixUp) {
			$('.view_mode.fixUp').addClass('selected');
        } else {
            $('.view_mode.fixUp').removeClass('selected');
        }
	};
	
	/**
	 * 選択半透明ボタンクリック時の処理です.
	 */
	this.selTransSel = function() {
		if (self.player.selectionTransparentMode === lt.SEL_TRANS_SEL) {
            self.player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
            $('.view_mode.sel_trans_sel').removeClass('selected');
        } else {
            self.player.selectionTransparentMode = lt.SEL_TRANS_SEL;
            $('.view_mode.sel_trans_sel').addClass('selected');
            $('.view_mode.sel_trans_nosel').removeClass('selected');
        }
	};	
	
	/**
	 * 選択外半透明ボタンクリック時の処理です.
	 */
	this.selTransNosel = function() {
		if (self.player.selectionTransparentMode === lt.SEL_TRANS_NO_SEL) {
            self.player.selectionTransparentMode = lt.SEL_TRANS_NORMAL;
            $('.view_mode.sel_trans_nosel').removeClass('selected');
        } else {
            self.player.selectionTransparentMode = lt.SEL_TRANS_NO_SEL;
            $('.view_mode.sel_trans_nosel').addClass('selected');
            $('.view_mode.sel_trans_sel').removeClass('selected');
        }
	};
	
	/**
	 * ウォークスルーのパンボタンクリック時の処理です.
	 */
	this.walkthroughPan = function() {
		self.player.view.setOperationMode({mode: 'walk', subMode: 'pan'});
		
        $('.view_mode.front').hide();
        $('.view_mode.back').show();
        $('.view_mode.right').show();
        $('.view_mode.left').show();
        $('.view_mode.top').hide();
        $('.view_mode.bottom').hide();
        $('.view_mode.isometric1').hide();
        $('.view_mode.isometric2').hide();
        $('.view_mode.isometric3').hide();
        $('.view_mode.isometric4').hide();
        
        var divToolbar2 = document.querySelector("#toolbar_2_body");
        divToolbar2.style.height = toolBar2WalkHeightPan;
	};
	
	/**
	 * ウォークスルーのウォークボタンクリック時の処理です.
	 */
	this.walkthroughWalk = function() {
		self.player.view.setOperationMode({mode: 'walk', subMode: 'walk'});
		
        $('.view_mode.front').hide();
        $('.view_mode.back').show();
        $('.view_mode.right').show();
        $('.view_mode.left').show();
        $('.view_mode.top').hide();
        $('.view_mode.bottom').hide();
        $('.view_mode.isometric1').hide();
        $('.view_mode.isometric2').hide();
        $('.view_mode.isometric3').hide();
        $('.view_mode.isometric4').hide();
        
        var divToolbar2 = document.querySelector("#toolbar_2_body");
        divToolbar2.style.height = toolBar2WalkHeightWalk;     
	};
	
	/**
	 * ウォークスルーの見回すボタンクリック時の処理です.
	 */
	this.walkthroughLookAround = function() {
		self.player.view.setOperationMode({mode: 'walk', subMode: 'look'});
		
        $('.view_mode.front').show();
        $('.view_mode.back').hide();
        $('.view_mode.right').show();
        $('.view_mode.left').show();
        $('.view_mode.top').show();
        $('.view_mode.bottom').show();
        $('.view_mode.isometric1').hide();
        $('.view_mode.isometric2').hide();
        $('.view_mode.isometric3').hide();
        $('.view_mode.isometric4').hide();
        
        var divToolbar2 = document.querySelector("#toolbar_2_body");
        divToolbar2.style.height = toolBar2WalkHeightLook;       
	};
	
	/**
	 * ウォークスルーの拡大縮小ボタンクリック時の処理です.
	 */
	this.walkthroughRegion = function() {
		self.player.view.setOperationMode({mode: 'walk', subMode: 'region'});
		
        $('.view_mode.front').hide();
        $('.view_mode.back').hide();
        $('.view_mode.right').hide();
        $('.view_mode.left').hide();
        $('.view_mode.top').hide();
        $('.view_mode.bottom').hide();
        $('.view_mode.isometric1').hide();
        $('.view_mode.isometric2').hide();
        $('.view_mode.isometric3').hide();
        $('.view_mode.isometric4').hide();
        
        var divToolbar2 = document.querySelector("#toolbar_2_body");
        divToolbar2.style.height = toolBar2WalkHeightRegion;       
	};
	
	/**
	 * ウォークスルーの前進後退ボタンクリック時の処理です.
	 */
	this.walkthroughBackAndForth = function() {
		self.player.view.setOperationMode({mode: 'walk', subMode: 'backAndForth'});
		
        $('.view_mode.front').hide();
        $('.view_mode.back').hide();
        $('.view_mode.right').hide();
        $('.view_mode.left').hide();
        $('.view_mode.top').hide();
        $('.view_mode.bottom').hide();
        $('.view_mode.isometric1').hide();
        $('.view_mode.isometric2').hide();
        $('.view_mode.isometric3').hide();
        $('.view_mode.isometric4').hide();
        
        var divToolbar2 = document.querySelector("#toolbar_2_body");
        divToolbar2.style.height = toolBar2WalkHeightBack;
	};
	
	/**
	 * 現在のビューのプロパティ設定に応じツールバーの選択状態を反映する処理です.
	 */
	function reSelectedToolbar() {
		
		var displaySettings = self.player.view.getDisplaySettings();
		if (displaySettings.fixUp) {
			$('.view_mode.fixUp').addClass('selected');
        }
		
		if (self.player.selectionTransparentMode === lt.SEL_TRANS_SEL) {
			$('.view_mode.sel_trans_sel').addClass('selected');
		} else if (self.player.selectionTransparentMode === lt.SEL_TRANS_NO_SEL) {
			$('.view_mode.sel_trans_nosel').addClass('selected');
		}
		
		if(self.player.view.getOperationMode().mode === 'walk'){
			$('.view_mode.walkthrough').addClass('selected');		
		}
		
		if(self.player.model.fitSelection){
			$('.fit_selection').addClass('selected');
		}
	}	

	this.player.addEventListener('ltViewGazingPoint', setViewGazingPointModeEnd);
};