/**
 * View3Dクラスです.
 */
View3D = function(params) {
	'use strict';
	var self = this;
	/** プレイヤー. */
	this.player = params.player;
	/** コントローラオブジェクト. */
	this.controller = null;

	/**
	 * 更新通知を受け取り、状態を更新します.
	 * 
	 * @param params
	 */
	this.update = function(params) {
		var group;
		if (params.selfObj === this) {
			return;
		}
		switch (params.updateType) {
		case 'SELECT_ON':
			self.player.model.clearSelection();
			$.each(params.updateTagetElems, function(i, elem) {
				group = self.player.model.getGroupByUniqueId(elem);
				if (group) {
					self.player.model.addSelection(group);
				}
			});
			if (self.player.model.fitSelection) {
				self.player.view.fit(self.player.model.getSelections());
			}
			break;
		case 'SELECT_OFF':
			var groups = self.player.model.getSelections();
			params.updateTagetElems[0];
			self.player.model.clearSelection();
			$.each(groups, function(i, group) {
				if (group.uniqueId !== params.updateTagetElems[0]) {
					self.player.model.addSelection(group);
				}
			});
			if (self.player.model.fitSelection) {
				self.player.view.fit(self.player.model.getSelections());
			}
			break;
		case 'SELECT_CLEAR':
			self.player.model.clearSelection();
			if (self.player.model.fitSelection) {
				self.player.view.fit([]);
			}
			break;
		case 'VISIBILITY_ON_ONLY':
			$.each(params.updateTagetElems, function(i, elem) {
				group = self.player.model.getGroupByUniqueId(elem);
				if (group) {
					group.visibility = true;
				}
			});
			break;
		case 'VISIBILITY_OFF_ONLY':
			$.each(params.updateTagetElems, function(i, elem) {
				group = self.player.model.getGroupByUniqueId(elem);
				if (group) {
					group.visibility = false;
				}
			});
			break;
		case 'VISIBILITY_ON':
			break;
		case 'VISIBILITY_OFF':
			break;
		case 'VISIBILITY_ON_OTHER_OFF':
			break;
		default:
			break;
		}
		self.updateViewPart(params.single);
		self.updateViewAll();
	}

	/**
	 * コントローラを設定します.
	 * 
	 * @param controller
	 */
	this.registController = function(controller) {
		this.controller = controller;
	};

	/**
	 * モデルの要素選択状態が変化した際の通知処理を行います.
	 * 
	 * @param event
	 */
	function onSelectChange(event) {		
		'use strict';
		if(self.player.fileLoading){
			return;
		}
		if (event && event.selectedGroups !== undefined) {
			var params = [];
			params.updateTagetElems = [];
			if (event.selectedGroups.length > 0) {
				$.each(self.player.model.getSelections(), function(i, group) {
					params.updateTagetElems.push(String(group.userId));
				});
				params.updateType = 'SELECT_ON';
			} else {
				params.updateType = 'SELECT_CLEAR';
			}
			self.updateViewPart();
			self.updateViewAll();
			params.selfObj = self;
			self.controller.notify(params);
		}
	}

	/**
	 * 選択Viewのプレイヤーの表示を更新します.
	 * 
	 * @param isSingle
	 */
	this.updateViewPart = function(isSingle) {
		var player = self.player.part;
		if (player) {
			if(player.fileLoading){
				return;
			}
			player.model.hideAllGroups();
			var parts = [];
			var userIdBase = {};
			$.each(self.player.model.getSelections(), function(i, group) {
				var groups = player.model.getGroupsByUserId(group.userId);
				if (groups != null && groups.length == 1) {
					if (!isSingle || !userIdBase[group.userIdBase]) {
						userIdBase[group.userIdBase] = true;
						parts.push(groups[0]);
					}
				}
			});
			if (parts.length > 0) {
				player.model.showGroups(parts);
				player.view.fit(parts);
			}
		}
	};

	/**
	 * 全体Viewのプレイヤーの表示を更新します.
	 */
	this.updateViewAll = function() {
		var player = self.player.all;
		if (player) {
			player.model.clearSelection();
			$.each(self.player.model.getSelections(), function(i, group) {
				var groups = player.model.getGroupsByUserId(group.userId);
				if (groups != null && groups.length == 1) {
					player.model.addSelection(groups[0]);
				}
			});
		}
	};
	self.player.addEventListener('ltSelectChange', onSelectChange);

};