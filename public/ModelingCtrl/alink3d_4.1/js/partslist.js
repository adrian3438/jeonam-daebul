/**
 * 部品表クラスです.
 */
PartList = function(params) {
	'use strict';
	var self = this;
	/** コントローラ. */
	this.controller = null;
	/** プレイヤー. */
	this.player;
	/** グリッド表示用のjQueryオブジェクト. */
	this.mainGrid;
	/** グリッド. */
	this.grid;
	/** グリッドのカラム. */
	this.columns;
	/** 表示するパートのタイプ. */
	this.type;
	/** 表示開始階層. */
	this.levelFrom;
	/** 表示終了階層. */
	this.levelTo;
	/** ソート順. */
	this.order;
	/** 同一視するカラムのフォーマットの組みあわせ. */
	this.groupby = '';
	/** ソートするカラム番号. */
	this.sort;
	/** アセンブリ表示フラグ. */
	this.isDispAssembly = false;
	/** コンポーネント表示フラグ */
	this.isDispComponent = false;

	var checkboxSelector = new Slick.CheckboxSelectColumn({
		cssClass: 'slick-cell-checkboxsel',
	});
	var buttonSelector = new Slick.ButtonSelectColumn({
		cssClass: 'slick-cell-buttonsel',
	});
	var options = {
		multiColumnSort: true,
		rowHeight: 25,
		syncColumnCellResize: true,
	};

	/**
	 * パーツリストの列を設定します.
	 * 
	 * @param columns
	 */
	this.setColumns = function(columns) {
		self.columns = [];
		var param;
		var count = 0;
		$.each(columns, function(i, column) {
			switch (column.type) {
			case 1:
				param = checkboxSelector.getColumnDefinition();
				param.type = column.type;
				param.width = column.width;
				delete param.name;
				delete param.toolTip;
				self.columns.push(param);
				break;
			case 2:
				param = buttonSelector.getColumnDefinition();
				param.type = column.type;
				param.minWidth = column.width;
				param.width = column.width;
				self.columns.push(param);
				break;
			default:
				self.columns.push({
					id: count,
					type: column.type,
					name: column.name,
					field: count,
					width: convertInt(column.width),
					format: column.format,
					formatter: column.formatter,
					folderId: column.folderId,
					searchAttributeName: column.searchAttributeName,
					windowTarget: column.windowTarget,
					sortable: true,
					defaultSortAsc: false
				});
				break;
			}
			count++;
		});
	};

	if (params === undefined) {
		throw new Error('ltError: Required argument. method=PartsList, argument=params');
	} else {
		Object.keys(params).forEach(function(key) {
			self[key] = params[key];
			if (key === 'columns') {
				self.setColumns(params[key]);
			}
		});
	}

	/**
	 * 他のオブジェクトの更新時の処理です.
	 * 
	 * @param params
	 */
	this.update = function(params) {
		if (self.isDispComponent && params.selfObj !== this) {
			var selGrpIds = [], sels = [];
			switch (params.updateType) {
			case 'SELECT_ON':
				var data = self.grid.getData();
				if (data) {
					selGrpIds = getSelectGroupIds(self.player.model);
					var selUserIds = getSelectUserIds(self.player.model);
					$.each(data, function(i, record) {
						if (selUserIds[record.Key]) {
							sels.push(i);
						}
					});
					for (var groupId in selGrpIds) {
						var parentGroupId = self.getDispGroupId(groupId, data);
						if (parentGroupId && parentGroupId !== groupId) {
							sels.push(self.getRowNo(parentGroupId, data));
							selGrpIds[groupId] = false;
							selGrpIds[parentGroupId] = true;
						}
					}
					if (sels.length > 0) {
						sels.sort(function(a, b) {
							if (a > b) return -1;
							if (a < b) return 1;
							return 0;
						});
						self.grid.scrollRowIntoView(sels[0]);
					}
					self.grid.setSelectedRows(sels);
					var ids = [];
					for (var groupId in selGrpIds) {
						if (selGrpIds[groupId]) {
							ids.push(groupId);
						}
					}
					var params = [];
					params.updateTagetElems = ids;
					params.selfObj = self;
					params.updateType = 'SELECT_ON';
					params.single = true;
					self.controller.notify(params, true);
				}
				break;
			case 'SELECT_OFF':
				var records = self.grid.getSelectedRows();
				if (records.length > 0) {
					selGrpIds = getSelectGroupIds(self.player.model);
					var data = self.grid.getData();
					$.each(records, function(i, record) {
						if (selGrpIds[data[record].Key]) {
							sels.push(i);
						}
					});
					self.grid.setSelectedRows(sels);
				}
				break;
			case 'SELECT_CLEAR':
				self.grid.setSelectedRows([]);
				break;
			default:
				break;
			}
		}
	}

	/**
	 * Controllerを設定します.
	 * 
	 * @param controller
	 */
	this.registController = function(controller) {
		this.controller = controller;
	};	

	/**
	 * 部品表構築用のデータを取得します.
	 * 
	 * @return 部品表構築用のデータ
	 */
	this.getPartListData = function() {
		var level = 1;
		var partData = [];
		var addedNames = [];
		var groups = self.player.model.getTopGroups();
		self.setChildData(groups, partData, addedNames, level);
		return partData;
	};

	/**
	 * 部品表の子データを設定します.
	 * 
	 * @param children
	 * @param partData
	 * @param addedNames
	 * @param level
	 */
	this.setChildData = function(children, partData, addedNames, level) {
		if (children) {
			for (var i = 0; i < children.length; i++) {
				var group = children[i];
				var ret = true;
				if (!self.levelFrom || self.levelFrom <= level) {
					ret = self.addRowData(group, partData, addedNames)
				}
				if (ret) {
					if (group.groupType !== lt.GROUP_TYPE_PART && (!self.levelTo || self.levelTo > level)) {
						self.setChildData(group.getChildren(), partData, addedNames, level + 1);
					}
				}
			}
		}
	};

	/**
	 * 部品表構築用のデータを設定します.
	 * 
	 * @param group
	 * @param partData
	 * @param addedNames
	 */
	this.addRowData = function(group, partData, addedNames) {
		var addedName = false,
		    grpCnt = 0;
		if (self.isDisplay(group)) {
			var part = [];
			part.Key = String(group.userIdBase);
			$.each(self.columns, function(i, column) {
				switch (column.type) {
				case 1:
				case 2:
					part[i] = '';
					break;
				case 3:
					var userIdBase = group.userIdBase;
					if (addedNames[userIdBase] !== undefined) {
						addedName = true;
						break;
					}
					addedNames[userIdBase] = true;
					var groups = self.player.model.getGroupsByUserIdBase(userIdBase);
					if (groups) {
						$.each(groups, function(i, grp) {
							if (self.isDisplay(grp)) {
								grpCnt++;
							}
						});
						part[i] = grpCnt;
						part.name = userIdBase;
					}
					break;
				default:
					part[i] = group.getAltName(column.format);
					break;
				}
			});
			if (!addedName) {
				partData.push(part);
			}
		}
		return true;
	};

	/**
	 * options の設定
	 * 
	 * @param params
	 *            オプション
	 */
	this.setOptions = function(params) {
		if (params.multiColumnSort !== undefined) {
			options.multiColumnSort = params.multiColumnSort;
		}
		if (params.rowHeight !== undefined) {
			options.rowHeight = params.rowHeight;
		}
		if (params.syncColumnCellResize !== undefined) {
			options.syncColumnCellResize = params.syncColumnCellResize;
		}
	};

	/**
	 * パーツリストを生成します.
	 */
	this.createPartsList = function() {
		if (!self.isDispComponent) {
			return;
		}
		var partData = self.getPartListData();
		self.setOrderby(partData);
		self.setGroupby(partData);
		self.grid = new Slick.Grid(self.mainGrid, partData, self.columns, options);
		self.grid.setSelectionModel(new Slick.RowSelectionModel());
		self.grid.registerPlugin(checkboxSelector);
		self.grid.registerPlugin(buttonSelector);
		self.grid.setSelectedRows([]);
		/**
		 * ソート処理
		 * @param e
		 * @param args
		 */
		self.grid.onSort.subscribe(function(e, args) {
			var sels = [], selGrpIds = [], result;
			var cols = args.sortCols;
			var tmpSels = self.grid.getSelectedRows();

			var dataTemp = self.grid.getData();
			tmpSels.forEach(function(row) {
				selGrpIds.push(dataTemp[row].Key);
			});

			// フィット選択が有効の場合
			// ソート処理を実施すると意図せずフィット選択が
			// 動作してしまうため、一時的に抑制する。
			var tempFitSelection = self.player.model.fitSelection;
			self.player.model.fitSelection = false;
			self.grid.setSelectedRows([]);
			partData.sort(function(dataRow1, dataRow2) {
				for (var colCnt = 0; colCnt < cols.length; colCnt++) {
					var field = cols[colCnt].sortCol.field;
					var sign = cols[colCnt].sortAsc ? 1 : -1;
					var value1 = dataRow1[field],
					    value2 = dataRow2[field];
					if (typeof value1 === 'string') {
						value1 = value1.toLowerCase();
					}
					if (typeof value2 === 'string') {
						value2 = value2.toLowerCase();
					}
					result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
					if (result != 0) {
						return result;
					}
				}
				return 0;
			});

			// ソート後の選択対象のグループのidをキーにして
			// 選択状態を復帰
			dataTemp.forEach(function(value, index) {
				if (selGrpIds.indexOf(value.Key) != -1) {
					sels.push(index);
				}
			});
			self.grid.setSelectedRows(sels);
			self.player.model.fitSelection = tempFitSelection;
			self.grid.invalidate();
			self.grid.render();
		});
		/**
		 * 行選択変更イベント
		 * 
		 * @param event
		 * @param args
		 */
		self.grid.onSelectedRowsChanged.subscribe(function(event, args) {
			var dataTemp = self.grid.getData();
			var ids = [];
			args.rows.forEach(function(row) {
				ids.push(dataTemp[row].Key);
			});
			var params = [];
			params.updateTagetElems = self.getGroupIdsByUserIdBase(ids);
			if(params.updateTagetElems == undefined){
				return;
			}
			params.selfObj = self;
			params.updateType = 'SELECT_ON';
			params.single = true;
			self.controller.notify(params);
		});
	};
	/**
	 * 設定ファイルの値でソートします.
	 * 
	 * @param partData
	 */
	this.setOrderby = function(partData) {
		var sign = self.order === 'asc' ? 1 : -1;
		partData.sort(function(record1, record2) {
			var value1 = record1[self.sort - 1];
			var value2 = record2[self.sort - 1];
			if (typeof value1 === 'string') {
				value1 = value1.toLowerCase();
			}
			if (typeof value2 === 'string') {
				value2 = value2.toLowerCase();
			}
			return (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
		});
	};
	/**
	 * 設定ファイルの値でグルーピングします.
	 * 
	 * @param partData
	 */
	this.setGroupby = function(partData) {
		var indexArray = [];
		$.each(formats, function(index, format) {
			if (self.groupby.indexOf(format) !== -1) {
				indexArray.push(index);
			}
		});
		var valueArray = {};
		var removeIndex = {};
		$.each(partData, function(row, record) {
			var value = '';
			$.each(indexArray, function(i, index) {
				value += record[index];
			});
			if (!valueArray[value]) {
				valueArray[value] = 1;
			} else {
				removeIndex[row] = 1;
			}
		});
		partData.some(function(value, i) {
		    if (removeIndex[value]) {
		    	partData.splice(i, 1);
		    }
		});
	};
	/**
	 * 追加選択の設定を変更する
	 * 
	 * @param keyType
	 */
	this.setAdditionalSelection = function(keyType) {
		if (self.grid !== undefined && (keyType === 'none' || keyType === 'control' || keyType === 'shift')) {
			var options = self.grid.getOptions();
			options.additionalSelection = keyType;
			self.grid.setOptions(options);
		}
	};

	/**
	 * 対象のグループが表示対象かどうか判定します.
	 * 
	 * @param  group
	 * @return Boolean
	 */
	this.isDisplay = function(group) {
		if(group.groupClass !== lt.GROUP_CLASS_NORMAL){
			return false;
		}
		var type = group.groupType;
		switch (this.type) {
		case 'assembly':
			return type === lt.GROUP_TYPE_ASSEMBLY || type === lt.GROUP_TYPE_EMPTY || type === lt.GROUP_TYPE_ERRROR;
		case 'part':
			return type === lt.GROUP_TYPE_PART || type === lt.GROUP_TYPE_EMPTY || type === lt.GROUP_TYPE_ERRROR;
		case 'all':
			return type === lt.GROUP_TYPE_ASSEMBLY || type === lt.GROUP_TYPE_PART || type === lt.GROUP_TYPE_EMPTY || type === lt.GROUP_TYPE_ERRROR;
		default:
			return false;
		}
	};

	/**
	 * ユーザーIDから名称一致(%除く)するグループを取得し、<br />
	 * そのグループIDを返します.
	 * 
	 * @param  userIds
	 * @return グループIDリスト
	 */
	this.getGroupIdsByUserIdBase = function(userIds) {
		if(self.player.fileLoading){
			return;
		}
		var groupIds = [];
		$.each(userIds, function(i, userId) {
			$.each(self.player.model.getGroupsByUserIdBase(userId), function(j, group) {
				var baseGroups = self.player.model.getGroupsByUserIdBase(group.userIdBase);
				$.each(baseGroups, function(k, baseGroup) {
					if (self.isDisplay(baseGroup)) {
						groupIds.push(baseGroup.uniqueId);
					}
				});
			});
		});
		return groupIds;
	};

	/**
	 * 部品表に表示しているパートを取得します.<br />
	 * ${groupId}が部品表に表示されていなければ、親パートのIDで取得します
	 * 
	 * @param  groupId
	 * @param  data
	 * @return 部品表に表示しているパート
	 */
	this.getDispGroupId = function(groupId, data) {
		var result = false;
		var group = self.player.model.getGroupByUniqueId(groupId);
		$.each(data, function(i, record) {
			if (group.userIdBase === record.Key) {
				result = true;
				return;
			}
		});
		if (!result) {
			var parent = group.getParent();
			return (parent) ? self.getDispGroupId(parent.uniqueId, data) : null;
		} else {
			return groupId;
		}
	};

	/**
	 * 指定したユーザーID(%除く)の行番号を取得します.
	 * 
	 * @param  groupId
	 * @param  data
	 * @return 行番号
	 */
	this.getRowNo = function(groupId, data) {
		var index = null;
		var group = self.player.model.getGroupByUniqueId(groupId);
		$.each(data, function(i, record) {
			if (record.Key === group.userIdBase) {
				index = i;
				return;
			}
		});
		return index;
	};

	/**
	 * link2docformatter, link2web3dformatter カラムクリック処理
	 */
	$('#partslist').click(function(e) {
		var target = $(e.target);
		if (!target.hasClass('link2docformatter') && !target.hasClass('link2web3dformatter')) {
			return;
		}

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
		};
		if (target.hasClass('link2docformatter')) {
			data.DocumentTypes = [ "0" ]; // ドキュメント検索
		} else if (target.hasClass('link2web3dformatter')) {
			data.ObjectTypes = [ "CAP" ]; // Web3D コンテンツ検索
		}
		if (folderId !== undefined && folderId.length > 0) {
			data.FolderIDs = [ folderId ];
		}
		val.data = JSON.stringify(data);

		if (windowTarget == undefined || windowTarget.length == 0) {
			windowTarget = '_blank';
		}
		if(player.fileLoading){
			return;
		}
		var asm = false;
		var part = false;
		var xml = 'TopAssy';
		var gs = player.model.getGroupsByUserId(value);
		if(gs.length == 0){
			//alert(1);
			return;
		}
		if(gs[0].groupType != lt.GROUP_TYPE_ASSEMBLY){
			//alert(2);
			return;
		}
		var chs = gs[0].getChildren();
		chs.forEach(function(ch){ 
			if(ch.groupType == lt.GROUP_TYPE_ASSEMBLY)asm = true;
			if(ch.groupType == lt.GROUP_TYPE_PART)part = true;
		});
		if(asm == true && part == false)xml = 'AssyOnly';
		if(asm == true && part == true)xml = 'AssyPart';
		if(asm == false && part == true)xml = 'PartOnly';
		var url=location.href;
		var newurl = url.substring(0, url.indexOf('?')) + '?' + 'id=' + value + '&xml=' + xml;
		var xx = window.open(newurl, '_self');
		//alert(xx);
		return;
	});
};

formatters = {
		htmlformatter: function(row, cell, value, columnDef, dataContext) {
			return value;
		},
		link2docformatter: function(row, cell, value, columnDef, dataContext) {
			var searchAttributeName = columnDef.searchAttributeName;
			var folderId = columnDef.folderId === undefined ? '' : columnDef.folderId;
			return '<a href="javascript:void(0)" class="link2docformatter" data-val="' + value + '" data-attr="' + searchAttributeName + '" data-fid="' + folderId + '">Link</a>'
		},
		link2web3dformatter: function(row, cell, value, columnDef, dataContext) {
			var gs = player.model.getGroupsByUserId(value);
			if(gs.length == 0){
				//alert(1);
				return;
			}
			if(gs[0].groupType != lt.GROUP_TYPE_ASSEMBLY){
				//alert(2);
				return;
			}

			var searchAttributeName = columnDef.searchAttributeName;
			var folderId = columnDef.folderId === undefined ? '' : columnDef.folderId;
			var windowTarget = columnDef.windowTarget === undefined ? '' : columnDef.windowTarget;
			return '<a href="javascript:void(0)" class="link2web3dformatter" data-val="' + value + '" data-attr="' + searchAttributeName + '" data-fid="' + folderId + '" data-win="' + windowTarget + '">Detail</a>'
		}
};