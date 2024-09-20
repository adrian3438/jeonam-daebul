/**
 * 構成ツリークラスです.
 */
Assytree = function(params) {
	'use strict';
	var self = this;
	/** コントローラ. */
	this.controller = null;
	/** プレイヤー. */
	this.player;
	/** 最上位のノード名. */
	this.topNodeName;
	/** 構成ツリーのjQueryオブジェクト. */
	this.mainTree;
	/** 作成するノードの階層. */
	this.nodeCreateLevel;
	/** 初期に広げるノードの階層. */
	this.nodeExpandLevel;
	/** スクロールバーのjQueryオブジェクト. */
	this.scrollbar;
	/** コンポーネント表示フラグ */
	this.isDispComponent = false;

	if (params === undefined) {
		throw new Error('ltError: Required argument. method=Assytree, argument=params');
	} else {
		Object.keys(params).forEach(function(key) {
			self[key] = params[key];
		});
		self.scrollbar.perfectScrollbar();
	}

	/**
	 * 他のオブジェクトの更新時の処理です.
	 * 
	 * @param params
	 */
	this.update = function(params) {
		if (self.isDispComponent && params.selfObj !== this) {
			var selIds = [];
			var groups = self.player.model.getSelections();
			switch (params.updateType) {
			case 'SELECT_ON':
				$.each(groups, function(i, group) {
					selIds.push(group.uniqueId);
				});
				self.activeNodes(selIds);
				break;
			case 'SELECT_OFF':
				self.deActiveNode();
				$.each(groups, function(i, group) {
					selIds.push(group.uniqueId);
				});
				self.activeNodes(selIds);
				break;
			case 'SELECT_CLEAR':
				self.deActiveNode();
				break;
			case 'VISIBILITY_ON_ONLY':
				break;
			case 'VISIBILITY_OFF_ONLY':
				break;
			case 'VISIBILITY_ON':
				break;
			case 'VISIBILITY_OFF':
				break;
			case 'VISIBILITY_ON_OTHER_OFF':
				break;   
			case 'VISIBILITY_UPDATE_ALL':
				self.mainTree.dynatree('getTree').visit(function(object) {
					if (params.updateTagetElems[object.data.id] !== undefined) {
						object.select(params.updateTagetElems[object.data.id]);
					}
				});
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
	 * 構成ツリーデータを作成します.
	 * 
	 * @return 構成ツリーデータ
	 */
	this.getAssyTreeData = function() {
		var treeNodes = [];
		treeNodes.topNode = {
			title: self.topNodeName,
			key: self.topNodeName,
			expand: self.nodeExpandLevel > 1,
			icon: false,
			select: true,
			unselectable: true,
		};
		self.setChildData(self.player.model.getTopGroups(), 0, treeNodes, true);
		return treeNodes;
	};

	/**
	 * 構成ツリーの子データを設定します.
	 * 
	 * @param children
	 * @param nodeLevel
	 * @param treeNodes
	 * @param isTop
	 */
	this.setChildData = function(children, nodeLevel, treeNodes, isTop) {
		if (children) {
			if (!isTop) {
				treeNodes.chNodes = [];
			}
			for (var i = 0; i < children.length; i++) {
				var group = children[i];
				if (group.groupClass === lt.GROUP_CLASS_NORMAL &&
						group.groupType !== lt.GROUP_TYPE_BODY && group.groupType !== lt.GROUP_TYPE_MESH) {
					var node = {
						title: group.getAltName(self.altNameFormat),
						key: group.userId,
						expand: nodeLevel < self.nodeExpandLevel,
						icon: getTreeIcon(group.groupType),
						select: group.visibility,
						id: group.uniqueId,
						chNodes: [],
					};
					if (!self.nodeCreateLevel || nodeLevel < self.nodeCreateLevel) {
						self.setChildData(group.getChildren(), nodeLevel++, node.chNodes, false);
					}
					treeNodes.push(node);
				}
			}
		}
	};

	/**
	 * ツリーに表示するアイコンのファイル名を取得します.
	 * <p>アイコン未指定の場合はfalseを返します</p>
	 * 
	 * @return アイコン画像名
	 */
	function getTreeIcon(elemType) {
		switch (elemType) {
		case lt.GROUP_TYPE_ASSEMBLY:
			return 'Assy.png';
		case lt.GROUP_TYPE_PART:
			return 'Part.png';
		case lt.GROUP_TYPE_BODY:
			return 'Body.png';
		case lt.GROUP_TYPE_EMPTY:
			return 'Empty.png';
		case lt.GROUP_TYPE_ERRROR:
			return 'Error.png';
		case lt.GROUP_TYPE_MESH:
		default:
			return false;
		}
	}

	/**
	 * 最初に構成ツリーを作成します.
	 */
	this.createAssyTree = function() {
		if (!self.isDispComponent) {
			return
		}
		var treeNodes = self.getAssyTreeData();
		try {
			self.mainTree.dynatree('getTree').enableUpdate(false);
			var rootNode = self.mainTree.dynatree('getRoot');
			rootNode.removeChildren();  
			var topNode = rootNode.addChild(treeNodes.topNode);
			$.each(treeNodes, function(i, treeNode) {
				self.createTree(topNode.addChild(treeNode), treeNode.chNodes);
			});
			self.mainTree.dynatree('getTree').enableUpdate(true);
			self.scrollbar.scrollTop(0);
			self.scrollbar.scrollLeft(0);
			self.scrollbar.perfectScrollbar('update');
		} catch (ex) {
			console.warn(ex);
		}
		self.mainTree.dynatree('option', 'selectMode', 3);
	};

	/**
	 * 指定要素のノードに対して選択状態を設定します.
	 * 
	 * @param ids
	 */
	this.activeNodes = function(ids) {
		self.deActiveNode();
		$.each(ids, function(i, id) {
			var node = self.mainTree.dynatree('getTree').getNodeById(id);
			if (node) {
				node.activate(null, true);
				node.focus();
			}
		});
	};
	
	/**
	 * ノードの選択状態を解除します.
	 */
	this.deActiveNode = function() {
		var nodes = self.mainTree.dynatree('getActiveNode');
		for (var i = nodes.length - 1; i >= 0; i--) {
			var activeNode = nodes[i];
			if (activeNode) {
				activeNode.deactivate(null, true);
			}
		}
	};
	
	/**
	 * 子階層を再帰的にTree変換します.
	 * 
	 * @param childNode
	 * @param treeNodes
	 */
	this.createTree = function(childNode, treeNodes) {
		$.each(treeNodes, function(i, treeNode) {
			self.createTree(childNode.addChild(treeNode), treeNode.chNodes);
		});
	};
	
	/**
	 * ノード選択時の処理です.
	 * 
	 * @param select
	 * @param node
	 */
	function onSelect(select, node) {
		if (select !== undefined && node !== undefined) {
			var group = self.player.model.getGroupByUniqueId(node.data.id);
			if (group) {
				var onParams = [];
				var offParams = [];
				onParams.updateTagetElems = [];
				offParams.updateTagetElems = [];
				group.visibility = node.bSelected;
				if(group.visibility){
					onParams.updateTagetElems.push(String(group.uniqueId));
				} else {
					offParams.updateTagetElems.push(String(group.uniqueId));
				}

				var parent = group.getParent();
				if (parent) {
					self.selectParent(parent, node.parent, onParams, offParams);
				}
				var children = group.getChildren();
				if (children) {
					self.selectChildren(children, node.childList, onParams, offParams, node.bSelected);
				}
				onParams.selfObj = self;
				onParams.updateType = 'VISIBILITY_ON_ONLY';
				self.controller.notify(onParams);
				offParams.selfObj = self;
				offParams.updateType = 'VISIBILITY_OFF_ONLY';
				self.controller.notify(offParams);
			}
		}
	}

	/**
	 * 親ノードへの連携処理を行います.
	 * 
	 * @param group
	 * @param node
	 * @param onParams
	 * @param offParams
	 */
	this.selectParent = function(group, node, onParams, offParams) {
		if (group.userId.indexOf('Root') == -1 && node != null) {
			if (node.bSelected === true || node.hasSubSel === true) {
				onParams.updateTagetElems.push(String(group.uniqueId));
			} else {
				offParams.updateTagetElems.push(String(group.uniqueId));
			}
			var parent = group.getParent();
			if (parent) {
				self.selectParent(parent, node.parent, onParams, offParams);
			}
		}
	};

	/**
	 * 子ノードへの連携処理を行います.
	 * 
	 * @param groups
	 * @param nodes
	 * @param onParams
	 * @param offParams
	 * @param parentVis
	 */
	this.selectChildren = function(groups, nodes, onParams, offParams, parentVis) {
		var index = 0;
		$.each(groups, function(i, group) {
			if (group.groupType === lt.GROUP_TYPE_BODY || group.groupType === lt.GROUP_TYPE_SHELL || group.groupType === lt.GROUP_TYPE_MESH) {
				if(parentVis){
					onParams.updateTagetElems.push(String(group.uniqueId));
				} else {
					offParams.updateTagetElems.push(String(group.uniqueId));
				}
				var children = group.getChildren();
				if(children){
					self.selectChildren(children, undefined, onParams, offParams, parentVis);
				}

			} else  {
				if (nodes && index < nodes.length) {
					var node = nodes[index];
					if (node.bSelected) {
						onParams.updateTagetElems.push(String(group.uniqueId));
					} else {
						offParams.updateTagetElems.push(String(group.uniqueId));
					}
					var children = group.getChildren();
					if (children) {
						self.selectChildren(children, node.childList, onParams, offParams, node.bSelected);
					}
				}
				index++;
			}
		});
	};

	
	/**
	 * ノード開閉時の処理です.
	 * 
	 * @param exdpand
	 * @param node
	 */
	function onExpand(expand, node) {
		setTimeout(function() {
			self.scrollbar.perfectScrollbar('update');
		}, 300);
		self.updateSelectedNodeState(node);
	}

	/**
	 * ノードを開閉じた事で、クリアされている選択状態を元に戻します.
	 * ※選択処理の通知は発生しません
	 * 
	 * @param selectNode
	 */
	this.updateSelectedNodeState = function(selectNode) {
		var nodes = self.mainTree.dynatree('getActiveNode');
		if (nodes.length > 0) {
			var opts = selectNode.tree.options;
			for (var i = nodes.length - 1; i >= 0; i--) {
				var activeNode = nodes[i];
				if (activeNode) {
					if (activeNode.isParentNode(activeNode, selectNode) || activeNode === selectNode) {
						$(activeNode.span).addClass(opts.classNames.active);
					} 
				}
			}
		}
	};

	/**
	 * アクティブ状態になった時の処理です.
	 * 
	 * @param node
	 */
	function onActivate(node) {
		var params = [];
		params.updateTagetElems = [];
		var nodes = self.mainTree.dynatree('getActiveNode');
		if (nodes.length === 0) {
			params.selfObj = self;
			params.updateType = 'SELECT_CLEAR';
			self.controller.notify(params);			 
		} else {
			for (var i = nodes.length - 1; i >= 0; i--) {
				var activeNode = nodes[i];
				if (activeNode) {
					params.updateTagetElems.push(String(activeNode.data.id));
				}
			}
			params.selfObj = self;
			params.updateType = 'SELECT_ON';
			self.controller.notify(params);
		}
	}

	/**
	 * 非アクティブ状態になった時の処理です.
	 * 
	 * @param node
	 */
	function onDeactivate(node) {
		var params = [];
		params.updateTagetElems = [];
		params.updateTagetElems.push(String(node.data.id));
		params.selfObj = self;
		params.updateType = 'SELECT_OFF';
		self.controller.notify(params);
	}

	$(document).on('contextmenu', function() {
		return false;
	});

	this.mainTree.dynatree().dynatree('option', 'onExpand', onExpand);
	this.mainTree.dynatree().dynatree('option', 'onSelect', onSelect);
	this.mainTree.dynatree().dynatree('option', 'onActivate', onActivate);
	this.mainTree.dynatree().dynatree('option', 'onDeactivate', onDeactivate);
};