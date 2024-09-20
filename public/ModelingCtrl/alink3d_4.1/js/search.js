/**
 * 検索クラスです.
 */
Search = function(params) {
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
	this.columns = [ {
		id: 0,
		name: '名称',
		field: 0
	}, {
		id: 1,
		name: 'タイプ',
		field: 1
	} ];
	/** コンポーネント表示フラグ */
	this.isDispComponent = false;

	/** 非表示フラグ 重ね合わせレイアウトの初期表示に使用 */
	this.hidden = false;

	var options = {
		syncColumnCellResize: true,
		forceFitColumns: true
	};

	if (params === undefined) {
		throw new Error('ltError: Required argument. method=Search, argument=params');
	} else {
		Object.keys(params).forEach(function(key) {
			self[key] = params[key];
		});
	}

	/**
	 * 他のオブジェクトの更新時の処理です.
	 * 何もしません．
	 * 
	 * @param params
	*/
	this.update = function(params) {
	};

	/**
	 * Controllerを設定します.
	 * 
	 * @param controller
	 */
	this.registController = function(controller) {
		this.controller = controller;
	};	

	/**
	 * 検索結果を生成します.
	 * 
	 */
	this.createSearchResultList = function(resultData) {
		if (!self.isDispComponent) {
			return;
		}
		self.grid = new Slick.Grid(self.mainGrid, resultData, self.columns, options);
		self.grid.setSelectionModel(new Slick.RowSelectionModel());
		self.grid.setSelectedRows([]);

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
			params.selfObj = self;
			params.updateType = 'SELECT_ON';
			params.single = true;
			self.controller.notify(params);
		});

		// 検索結果件数
		$('#search_result_count').html(resultData.length);

		// 重ね合わせレイアウトの初期表示時
		// ここまで組み立てた後で非表示にしないと grid のカラムの幅が狭くなってしまう
		if (self.hidden) {
			if (ini.component.length == 1) {
				$('#search').hide();
				$('[id^=toolbar]').find('.search').removeClass('selected');
			}
			self.hidden = false;
		}
	};

	/**
	 * 対象のグループが表示対象かどうか判定します.
	 * 
	 * @param  group
	 * @return Boolean
	 */
	this.isDisplay = function(group) {
		var type = group.groupType;
		return type === lt.GROUP_TYPE_ASSEMBLY || type === lt.GROUP_TYPE_PART || type === lt.GROUP_TYPE_EMPTY || type === lt.GROUP_TYPE_ERRROR;
	};

	/**
	 * ユーザーIDから名称一致(%除く)するグループを取得し、<br />
	 * そのグループIDを返します.
	 * 
	 * @param  userIds
	 * @return グループIDリスト
	 */
	this.getGroupIdsByUserIdBase = function(userIds) {
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
	 * 検索ボタン押下時の処理．
	 * 
	 */
	$('#search_btn').click(function() {
		var searchkey = $.trim($('#search_key').val()),
			searchkeys = searchkey.split(' ');
		if (searchkey.length == 0 || searchkeys.length == 0) {
			console.log('search key is empty.');
			return;
		}

		if (searchcacheurl == null || searchcacheurl.length == 0) {
			console.log('searchcacheurl is empty');
			return;
		}

		if (searchData == null) {
			// 検索用 json データ取得
			$.ajaxSetup({async: false});
			$.getJSON(
				searchcacheurl,
				function(data) {
					searchData = data;
				}
			);
			$.ajaxSetup({async: true});
		}

		var resultData = [];
		var partKeys = [];

		// 検索
		$.each(searchData, function(i, d) {
			var partname = d.k;
			var propvalue = d.v;
			var isMatch = true;

			if ($.inArray(partname, partKeys) != -1) {
				return;
			}

			$.each(searchkeys, function(j, key) {
				var matchword = key.replace(/\?/g, '.');
				matchword = matchword.replace(/\*/g, '.*');
				var regexp = new RegExp(matchword);
				if(!regexp.test(partname)){
					isMatch = false;
					return false;
				}
			});
			if (!isMatch) {
				isMatch = true;
				$.each(searchkeys, function(j, key) {
					var matchword = key.replace(/\?/g, '.');
					matchword = matchword.replace(/\*/g, '.*');
					var regexp = new RegExp(matchword);
					if(!regexp.test(propvalue)){
						isMatch = false;
						return false;
					}
				});
			}

			if (isMatch) {
				var disptype = '';
				var group = self.player.model.getGroupsByUserId(partname);
				if (group.length > 0) {
					if (group[0].groupType === lt.GROUP_TYPE_ASSEMBLY) {
						disptype = 'アセンブリ';
					} else if (group[0].groupType === lt.GROUP_TYPE_PART) {
						disptype = 'パート';
					}
				}
				var part = {
					Key: partname,
					name: partname
				};
				part[0] = partname;
				part[1] = disptype;
				resultData.push(part);
				partKeys.push(partname);
			}
		});

		self.createSearchResultList(resultData);
	});

	/**
	 * 検索キーのテキストエリア内で Enter キー押下時は検索ボタンをクリックする
	 * 
	 */
	$('#search_key').keydown(function(e) {
		if (e.keyCode === 13) {
			$('#search_btn').click();
		}
	});

};

