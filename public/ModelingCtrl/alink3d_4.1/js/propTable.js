/**
 * プロパティクラスです.
 */
PropTable = function(params) {
	'use strict';
	var self = this;
	/** プレイヤー. */
	this.player = params.player;
	/** コントローラオブジェクト. */
	this.controller = null;
	/** トップアセンブリ表示フラグ. */
	this.topAssembly = false;
	/** 表示するプロパティ. */
	this.property = null;
	/** コンポーネント表示フラグ */
	this.isDispComponent = false;
	this.formatter = null;
	this.folderId = null;
	this.searchAttributeName = null;
	this.windowTarget = "_blank";

	if (params === undefined) {
		throw new Error('ltError: Required argument. method=PropTable, argument=params');
	} else {
		Object.keys(params).forEach(function(key) {
			self[key] = params[key];
		});
	}

	/**
	 * 他のオブジェクトの更新時の処理です.
	 * 
	 * @param params
	 */
	this.update = function(params) {
		if (self.isDispComponent && !self.topAssembly && params.selfObj !== this) {
			switch (params.updateType) {
			case 'SELECT_ON':
				self.setProperty();
				break;
			case 'SELECT_OFF':
				self.setProperty();
				break;
			case 'SELECT_CLEAR':
				$.each(self.property, function(i, prop) {
					$('#' + prop.name).html('');
				});
				break;
			default:
				break;
			}
		}
	};

	/**
	 * コントローラを設定します.
	 * 
	 * @param controller
	 */
	this.registController = function(controller) {
		this.controller = controller;
	};

	/**
	 * プロパティを作成します.
	 */
	this.createPropTable = function() {
		if (!self.isDispComponent) {
			return;
		}
		self.setProperty();
	};

	/**
	 * 画面上にプロパティを設定します.
	 */
	this.setProperty = function() {
		var group = self.getDispGroup();
		if (group) {
			$.each(self.property, function(i, prop) {
				switch (prop.formatter) {
				case undefined:
				case null:
				case 'htmlformatter':
					var val = prop.format;
					var m = null;
					while (m = val.match(/\$\{[^{}]*\}\.\{[^{}]*?\}/)) {
						var pv = group.getAltName(m[0]);
						val = val.replace(m[0], pv);
					}
					while (m = val.match(/\$\{[^{}]*\}/)) {
						var pv = group.getAltName(m[0]);
						val = val.replace(m[0], pv);
					}
					$('#' + prop.name).html(val);
					break;
				case 'link2docformatter':
					var value = group.getAltName(prop.format);
					var searchAttributeName = prop.searchAttributeName;
					var folderId = prop.folderId === undefined ? '' : prop.folderId;
					$('#' + prop.name).html('<a href="javascript:void(0)" class="link2docformatter" data-val="' + value + '" data-attr="' + searchAttributeName + '" data-fid="' + folderId + '">表示</a>');
					$('#' + prop.name + ' a').on('click', function(e) {
						var target = $(e.target);
						var value = target.data('val'),
							searchAttributeName = target.data('attr'),
							folderId = target.data('fid'),
							windowTarget = target.data('win');

						var val = {
							type: 'json',
							ver: apiver
						};
						var data = {
							Keyword: '"' + searchAttributeName + ':' + value + '"',
							WildeCard: '1',
							DocumentTypes: ['0']
						};
						if (folderId !== undefined && folderId.length > 0) {
							data.FolderIDs = [ folderId ];
						}
						val.data = JSON.stringify(data);

						if (windowTarget == undefined || windowTarget.length == 0) {
							windowTarget = '_blank';
						}

						$.getJSON(
							basexcmurl + 'API/SEARCH_OBJECT2',
							val,
							function(data) {
								if (data.Objects == null || data.Objects.length == 0) {
									return;
								}
								$.getJSON(
									basexcmurl + 'API/QUERY_DOCUMENT',
									{
										type: 'json',
										ver: apiver,
										data: JSON.stringify({DocumentID: data.Objects[0].ObjectID, HistoryFlag:'1'})
									},
									function(qdres) {
										if (qdres.Info.Success && qdres.Documents != null && qdres.Documents.length > 0) {
											var doc = qdres.Documents[0];
											if (doc.ContentHistorys != null && doc.ContentHistorys.length > 0) {
												var hst = doc.ContentHistorys[0];
												if (hst.ContentZIPURL != null && hst.ContentZIPURL != '') {
													window.open(hst.ContentZIPURL, '_blank');
												} else if (hst.ContentURL != null && hst.ContentURL != '') {
													window.open(hst.ContentURL, '_blank');
												}
											}
										}
									}
								);
							}
						);
					});
					break;
				case 'link2web3dformatter':
					var value = group.getAltName(prop.format);
					var searchAttributeName = prop.searchAttributeName;
					var folderId = prop.folderId === undefined ? '' : prop.folderId;
					var windowTarget = prop.windowTarget === undefined ? '' : prop.windowTarget;
					$('#' + prop.name).html('<a href="javascript:void(0)" class="link2web3dformatter" data-val="' + value + '" data-attr="' + searchAttributeName + '" data-fid="' + folderId + '" data-win="' + windowTarget + '">表示</a>');
					$('#' + prop.name + ' a').on('click', function(e) {
						var target = $(e.target);

						var value = target.data('val'),
							searchAttributeName = target.data('attr'),
							folderId = target.data('fid'),
							windowTarget = target.data('win');

						var val = {
							type: 'json',
							ver: apiver
						};
						var data = {
							Keyword: '"' + searchAttributeName + ':' + value + '"',
							WildeCard: '1',
							ObjectTypes: ['CAP']
						};
						if (folderId !== undefined && folderId.length > 0) {
							data.FolderIDs = [ folderId ];
						}
						val.data = JSON.stringify(data);

						if (windowTarget == undefined || windowTarget.length == 0) {
							windowTarget = '_blank';
						}

						var url=location.href;
				//		var newurl = url.substring(0, url.indexOf('?')) + '?' + 'id=' + value + '&xml=' + xml;
						//window.open(newurl, '_self');
						//alert(url);
						//alert(self.player.fileLoading);
						if(self.player.fileLoading){
							return;
						}
						history.back();
						return;

					});
					break;
				}
			});
		}
	};
	
	/**
	 * プロパティテーブルに表示するグループを取得します.
	 */
	this.getDispGroup = function() {
		var dispGroup = null;
		if (self.topAssembly) {
			$.each(self.player.model.getTopGroups(), function(i, group) {
				if (group.groupType === lt.GROUP_TYPE_ASSEMBLY && group.groupClass === lt.GROUP_CLASS_NORMAL) {
					dispGroup = group;
					return;
				}
			});
		} else {
			$.each(self.player.model.getSelections(), function(i, group) {
				if (isDisplay(group)) {
					var idGroups = self.player.model.getGroupsByUserId(group.userId);
					if (idGroups) {
						$.each(idGroups, function(j, idGroup) {
							if (isDisplay(idGroup)) {
								dispGroup = idGroup;
							}
						});
					}
				}
			});
		}
		return dispGroup;
	};
};