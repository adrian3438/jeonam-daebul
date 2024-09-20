! function(e) {
    var t = {};

    function a(i) {
        if (t[i]) return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, a), r.l = !0, r.exports
    }
    a.m = e, a.c = t, a.d = function(e, t, i) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (a.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) a.d(i, r, function(t) {
                return e[t]
            }.bind(null, r));
        return i
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "", a(a.s = 0)
}([function(e, t, a) {
    a(1), a(2), a(3), a(4), a(5), a(6), a(7), a(8), e.exports = a(9)
}, function(e, t) {
    Assytree = function(e) {
        "use strict";
        var t = this;
        if (this.controller = null, this.player, this.topNodeName, this.mainTree, this.nodeCreateLevel, this.nodeExpandLevel, this.scrollbar, this.isDispComponent = !1, void 0 === e) throw new Error("ltError: Required argument. method=Assytree, argument=params");

        function a(e) {
            switch (e) {
                case lt.GROUP_TYPE_ASSEMBLY:
                    return "Assy.png";
                case lt.GROUP_TYPE_PART:
                    return "Part.png";
                case lt.GROUP_TYPE_BODY:
                    return "Body.png";
                case lt.GROUP_TYPE_EMPTY:
                    return "Empty.png";
                case lt.GROUP_TYPE_ERRROR:
                    return "Error.png";
                case lt.GROUP_TYPE_MESH:
                default:
                    return !1
            }
        }
        Object.keys(e).forEach((function(a) {
            t[a] = e[a]
        })), t.scrollbar.perfectScrollbar(), this.update = function(e) {
            if (t.isDispComponent && e.selfObj !== this) {
                var a = [],
                    i = t.player.model.getSelections();
                switch (e.updateType) {
                    case "SELECT_ON":
                        $.each(i, (function(e, t) {
											console.log(t);
														// CompanyAjax(t.userId); //클릭할떄 실행함수
                            a.push(t.uniqueId)
                        })), t.activeNodes(a);
                        break;
                    case "SELECT_OFF":
                        t.deActiveNode(), $.each(i, (function(e, t) {
                            a.push(t.uniqueId)
                        })), t.activeNodes(a);
                        break;
                    case "SELECT_CLEAR":
                        t.deActiveNode();
                        break;
                    case "VISIBILITY_ON_ONLY":
                    case "VISIBILITY_OFF_ONLY":
                    case "VISIBILITY_ON":
                    case "VISIBILITY_OFF":
                    case "VISIBILITY_ON_OTHER_OFF":
                        break;
                    case "VISIBILITY_UPDATE_ALL":
                        t.mainTree.dynatree("getTree").visit((function(t) {
                            void 0 !== e.updateTagetElems[t.data.id] && t.select(e.updateTagetElems[t.data.id])
                        }))
                }
            }
        }, this.registController = function(e) {
            this.controller = e
        }, this.getAssyTreeData = function() {
            var e = [];
            return e.topNode = {
                title: t.topNodeName,
                key: t.topNodeName,
                expand: t.nodeExpandLevel && t.nodeExpandLevel >= 1,
                icon: !1,
                select: !0,
                unselectable: !0
            }, t.setChildData(t.player.model.getTopGroups(), 1, e, !0), e
        }, this.setChildData = function(e, i, r, o) {
            if (e) {
                o || (r.chNodes = []);
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    if (n.groupClass === lt.GROUP_CLASS_NORMAL && n.groupType !== lt.GROUP_TYPE_BODY && n.groupType !== lt.GROUP_TYPE_MESH) {
                        var l = {
                            title: n.getAltName(t.altNameFormat),
                            key: n.userId,
                            expand: i < t.nodeExpandLevel,
                            icon: a(n.groupType),
                            select: n.visibility,
                            id: n.uniqueId,
                            chNodes: []
                        };
                        (!t.nodeCreateLevel || i < t.nodeCreateLevel) && t.setChildData(n.getChildren(), i + 1, l.chNodes, !1), r.push(l)
                    }
                }
            }
        }, this.createAssyTree = function() {
            if (t.isDispComponent) {
                var e = t.getAssyTreeData();
                try {
                    t.mainTree.dynatree("getTree").enableUpdate(!1);
                    var a = t.mainTree.dynatree("getRoot");
                    a.removeChildren();
                    var i = a.addChild(e.topNode);
                    $.each(e, (function(e, a) {
                        t.createTree(i.addChild(a), a.chNodes)
                    })), t.mainTree.dynatree("getTree").enableUpdate(!0), t.scrollbar.scrollTop(0), t.scrollbar.scrollLeft(0), t.scrollbar.perfectScrollbar("update")
                } catch (e) {}
                t.mainTree.dynatree("option", "selectMode", 3)
            }
        }, this.activeNodes = function(e) {
            t.deActiveNode(), $.each(e, (function(e, a) {
                var i = t.mainTree.dynatree("getTree").getNodeById(a);
                i && (i.activate(null, !0), i.focus())
            }))
        }, this.deActiveNode = function() {
            for (var e = t.mainTree.dynatree("getActiveNode"), a = e.length - 1; a >= 0; a--) {
                var i = e[a];
                i && i.deactivate(null, !0)
            }
        }, this.createTree = function(e, a) {
            $.each(a, (function(a, i) {
                t.createTree(e.addChild(i), i.chNodes)
            }))
        }, this.selectParent = function(e, a, i, r) {
            if (-1 == e.userId.indexOf("Root") && null != a) {
                !0 === a.bSelected || !0 === a.hasSubSel ? i.updateTagetElems.push(String(e.uniqueId)) : r.updateTagetElems.push(String(e.uniqueId));
                var o = e.getParent();
                o && t.selectParent(o, a.parent, i, r)
            }
        }, this.selectChildren = function(e, a, i, r, o) {
            var s = 0;
            $.each(e, (function(e, n) {
                if (n.groupType === lt.GROUP_TYPE_BODY || n.groupType === lt.GROUP_TYPE_SHELL || n.groupType === lt.GROUP_TYPE_MESH) {
                    o ? i.updateTagetElems.push(String(n.uniqueId)) : r.updateTagetElems.push(String(n.uniqueId)), (l = n.getChildren()) && t.selectChildren(l, void 0, i, r, o)
                } else {
                    if (a && s < a.length) {
                        var l, d = a[s];
                        d.bSelected ? i.updateTagetElems.push(String(n.uniqueId)) : r.updateTagetElems.push(String(n.uniqueId)), (l = n.getChildren()) && t.selectChildren(l, d.childList, i, r, d.bSelected)
                    }
                    s++
                }
            }))
        }, this.updateSelectedNodeState = function(e) {
            var a = t.mainTree.dynatree("getActiveNode");
            if (a.length > 0)
                for (var i = e.tree.options, r = a.length - 1; r >= 0; r--) {
                    var o = a[r];
                    o && (o.isParentNode(o, e) || o === e) && $(o.span).addClass(i.classNames.active)
                }
        }, $(document).on("contextmenu", (function() {
            return !1
        })), this.mainTree.dynatree().dynatree("option", "onExpand", (function(e, a) {
            setTimeout((function() {
                t.scrollbar.perfectScrollbar("update")
            }), 300), t.updateSelectedNodeState(a)
        })), this.mainTree.dynatree().dynatree("option", "onSelect", (function(e, a) {
            if (void 0 !== e && void 0 !== a) {
                var i = t.player.model.getGroupByUniqueId(a.data.id);
                if (i) {
                    var r = [],
                        o = [];
                    r.updateTagetElems = [], o.updateTagetElems = [], i.visibility = a.bSelected, i.visibility ? r.updateTagetElems.push(String(i.uniqueId)) : o.updateTagetElems.push(String(i.uniqueId));
                    var s = i.getParent();
                    s && t.selectParent(s, a.parent, r, o);
                    var n = i.getChildren();
                    n && t.selectChildren(n, a.childList, r, o, a.bSelected), r.selfObj = t, r.updateType = "VISIBILITY_ON_ONLY", t.controller.notify(r), o.selfObj = t, o.updateType = "VISIBILITY_OFF_ONLY", t.controller.notify(o)
                }
            }
        })), this.mainTree.dynatree().dynatree("option", "onActivate", (function(e) {
            var a = [];
            a.updateTagetElems = [];
            var i = t.mainTree.dynatree("getActiveNode");
            if (0 === i.length) a.selfObj = t, a.updateType = "SELECT_CLEAR", t.controller.notify(a);
            else {
                for (var r = i.length - 1; r >= 0; r--) {
                    var o = i[r];
                    o && a.updateTagetElems.push(String(o.data.id))
                }
                a.selfObj = t, a.updateType = "SELECT_ON", t.controller.notify(a)
            }
        })), this.mainTree.dynatree().dynatree("option", "onDeactivate", (function(e) {
            var a = [];
            a.updateTagetElems = [], a.updateTagetElems.push(String(e.data.id)), a.selfObj = t, a.updateType = "SELECT_OFF", t.controller.notify(a)
        }))
    }
}, function(e, t) {
    PartList = function(e) {
        "use strict";
        var t = this;
        this.controller = null, this.player, this.mainGrid, this.grid, this.columns, this.type, this.levelFrom, this.levelTo, this.order, this.groupby = "", this.sort, this.isDispAssembly = !1, this.isDispComponent = !1;
        var a = new Slick.CheckboxSelectColumn({
                cssClass: "slick-cell-checkboxsel"
            }),
            i = new Slick.ButtonSelectColumn({
                cssClass: "slick-cell-buttonsel"
            }),
            r = {
                multiColumnSort: !0,
                rowHeight: 25,
                syncColumnCellResize: !0
            };
        if (this.setColumns = function(e) {
                var r;
                t.columns = [];
                var o = 0;
                $.each(e, (function(e, s) {
                    switch (s.type) {
                        case 1:
                            (r = a.getColumnDefinition()).type = s.type, r.width = s.width, delete r.name, delete r.toolTip, t.columns.push(r);
                            break;
                        case 2:
                            (r = i.getColumnDefinition()).type = s.type, r.minWidth = s.width, r.width = s.width, t.columns.push(r);
                            break;
                        default:
                            t.columns.push({
                                id: o,
                                type: s.type,
                                name: s.name,
                                field: o,
                                width: convertInt(s.width),
                                format: s.format,
                                formatter: s.formatter,
                                folderId: s.folderId,
                                searchAttributeName: s.searchAttributeName,
                                windowTarget: s.windowTarget,
                                sortable: !0,
                                defaultSortAsc: !1
                            })
                    }
                    o++
                }))
            }, void 0 === e) throw new Error("ltError: Required argument. method=PartsList, argument=params");
        Object.keys(e).forEach((function(a) {
            t[a] = e[a], "columns" === a && t.setColumns(e[a])
        })), this.update = function(e) {
            if (t.isDispComponent && e.selfObj !== this) {
                var a = [],
                    i = [];
                switch (e.updateType) {
                    case "SELECT_ON":
                        if (d = t.grid.getData()) {
                            a = getSelectGroupIds(t.player.model);
                            var r = getSelectUserIds(t.player.model);
                            for (var o in $.each(d, (function(e, t) {
                                    r[t.Key] && i.push(e)
                                })), a) {
                                var s = t.getDispGroupId(o, d);
                                s && s !== o && (i.push(t.getRowNo(s, d)), a[o] = !1, a[s] = !0)
                            }
                            i.length > 0 && (i.sort((function(e, t) {
                                return e > t ? -1 : e < t ? 1 : 0
                            })), t.grid.scrollRowIntoView(i[0])), t.grid.setSelectedRows(i);
                            var n = [];
                            for (var o in a) a[o] && n.push(o);
                            (e = []).updateTagetElems = n, e.selfObj = t, e.updateType = "SELECT_ON", e.single = !0, t.controller.notify(e, !0)
                        }
                        break;
                    case "SELECT_OFF":
                        var l = t.grid.getSelectedRows();
                        if (l.length > 0) {
                            a = getSelectGroupIds(t.player.model);
                            var d = t.grid.getData();
                            $.each(l, (function(e, t) {
                                a[d[t].Key] && i.push(e)
                            })), t.grid.setSelectedRows(i)
                        }
                        break;
                    case "SELECT_CLEAR":
                        t.grid.setSelectedRows([])
                }
            }
        }, this.registController = function(e) {
            this.controller = e
        }, this.getPartListData = function() {
            var e = [],
                a = t.player.model.getTopGroups();
            return t.setChildData(a, e, [], 1), e
        }, this.setChildData = function(e, a, i, r) {
            if (e)
                for (var o = 0; o < e.length; o++) {
                    var s = e[o],
                        n = !0;
                    (!t.levelFrom || t.levelFrom <= r) && (n = t.addRowData(s, a, i)), n && s.groupType !== lt.GROUP_TYPE_PART && (!t.levelTo || t.levelTo > r) && t.setChildData(s.getChildren(), a, i, r + 1)
                }
        }, this.addRowData = function(e, a, i) {
            var r = !1,
                o = 0;
            if (t.isDisplay(e)) {
                var s = [];
                s.Key = String(e.userIdBase), $.each(t.columns, (function(a, n) {
                    switch (n.type) {
                        case 1:
                        case 2:
                            s[a] = "";
                            break;
                        case 3:
                            var l = e.userIdBase;
                            if (void 0 !== i[l]) {
                                r = !0;
                                break
                            }
                            i[l] = !0;
                            var d = t.player.model.getGroupsByUserIdBase(l);
                            d && ($.each(d, (function(e, a) {
                                t.isDisplay(a) && o++
                            })), s[a] = o, s.name = l);
                            break;
                        default:
                            s[a] = e.getAltName(n.format)
                    }
                })), r || a.push(s)
            }
            return !0
        }, this.setOptions = function(e) {
            void 0 !== e.multiColumnSort && (r.multiColumnSort = e.multiColumnSort), void 0 !== e.rowHeight && (r.rowHeight = e.rowHeight), void 0 !== e.syncColumnCellResize && (r.syncColumnCellResize = e.syncColumnCellResize)
        }, this.createPartsList = function() {
            if (t.isDispComponent) {
                var e = t.getPartListData();
                t.setOrderby(e), t.setGroupby(e);
                try {
                    t.grid = new Slick.Grid(t.mainGrid, e, t.columns, r)
                } catch (e) {}
                t.grid.setSelectionModel(new Slick.RowSelectionModel), t.grid.registerPlugin(a), t.grid.registerPlugin(i), t.grid.setSelectedRows([]), t.grid.onSort.subscribe((function(a, i) {
                    var r, o = [],
                        s = [],
                        n = i.sortCols,
                        l = t.grid.getSelectedRows(),
                        d = t.grid.getData();
                    l.forEach((function(e) {
                        s.push(d[e].Key)
                    }));
                    var c = t.player.model.fitSelection;
                    t.player.model.fitSelection = !1, t.grid.setSelectedRows([]), e.sort((function(e, t) {
                        for (var a = 0; a < n.length; a++) {
                            var i = n[a].sortCol.field,
                                o = n[a].sortAsc ? 1 : -1,
                                s = e[i],
                                l = t[i];
                            if ("string" == typeof s && (s = s.toLowerCase()), "string" == typeof l && (l = l.toLowerCase()), 0 != (r = (s == l ? 0 : s > l ? 1 : -1) * o)) return r
                        }
                        return 0
                    })), d.forEach((function(e, t) {
                        -1 != s.indexOf(e.Key) && o.push(t)
                    })), t.grid.setSelectedRows(o), t.player.model.fitSelection = c, t.grid.invalidate(), t.grid.render()
                })), t.grid.onSelectedRowsChanged.subscribe((function(e, a) {
                    var i = t.grid.getData(),
                        r = [];
                    a.rows.forEach((function(e) {
                        r.push(i[e].Key)
                    }));
                    var o = [];
                    o.updateTagetElems = t.getGroupIdsByUserIdBase(r), null != o.updateTagetElems && (o.selfObj = t, o.updateType = "SELECT_ON", o.single = !0, t.controller.notify(o))
                }))
            }
        }, this.setOrderby = function(e) {
            var a = "asc" === t.order ? 1 : -1;
            e.sort((function(e, i) {
                var r = e[t.sort - 1],
                    o = i[t.sort - 1];
                return "string" == typeof r && (r = r.toLowerCase()), "string" == typeof o && (o = o.toLowerCase()), (r == o ? 0 : r > o ? 1 : -1) * a
            }))
        }, this.setGroupby = function(e) {
            var a = [];
            $.each(formats, (function(e, i) {
                -1 !== t.groupby.indexOf(i) && a.push(e)
            }));
            var i = {},
                r = {};
            $.each(e, (function(e, t) {
                var o = "";
                $.each(a, (function(e, a) {
                    o += t[a]
                })), i[o] ? r[e] = 1 : i[o] = 1
            })), e.some((function(t, a) {
                r[t] && e.splice(a, 1)
            }))
        }, this.setAdditionalSelection = function(e) {
            if (void 0 !== t.grid && ("none" === e || "control" === e || "shift" === e)) {
                var a = t.grid.getOptions();
                a.additionalSelection = e, t.grid.setOptions(a)
            }
        }, this.isDisplay = function(e) {
            if (e.groupClass !== lt.GROUP_CLASS_NORMAL) return !1;
            var t = e.groupType;
            switch (this.type) {
                case "assembly":
                    return t === lt.GROUP_TYPE_ASSEMBLY || t === lt.GROUP_TYPE_EMPTY || t === lt.GROUP_TYPE_ERRROR;
                case "part":
                    return t === lt.GROUP_TYPE_PART || t === lt.GROUP_TYPE_EMPTY || t === lt.GROUP_TYPE_ERRROR;
                case "all":
                    return t === lt.GROUP_TYPE_ASSEMBLY || t === lt.GROUP_TYPE_PART || t === lt.GROUP_TYPE_EMPTY || t === lt.GROUP_TYPE_ERRROR;
                default:
                    return !1
            }
        }, this.getGroupIdsByUserIdBase = function(e) {
            if (!t.player.fileLoading) {
                var a = [];
                return $.each(e, (function(e, i) {
                    $.each(t.player.model.getGroupsByUserIdBase(i), (function(e, i) {
                        var r = t.player.model.getGroupsByUserIdBase(i.userIdBase);
                        $.each(r, (function(e, i) {
                            t.isDisplay(i) && a.push(i.uniqueId)
                        }))
                    }))
                })), a
            }
        }, this.getDispGroupId = function(e, a) {
            var i = !1,
                r = t.player.model.getGroupByUniqueId(e);
            if ($.each(a, (function(e, t) {
                    r.userIdBase !== t.Key || (i = !0)
                })), i) return e;
            var o = r.getParent();
            return o ? t.getDispGroupId(o.uniqueId, a) : null
        }, this.getRowNo = function(e, a) {
            var i = null,
                r = t.player.model.getGroupByUniqueId(e);
            return $.each(a, (function(e, t) {
                t.Key !== r.userIdBase || (i = e)
            })), i
        }, 
				$("#partslist").click((function(e) {
//					window.open('LinkInfo/LinkInfo.html');
				}))
        $("#partslist > .slick-row").click((function(e) {
						var slick_cell_prdNm = $(this).find(".slick-cell r0");
						CompanyAjax(slick_cell_prdNm);
        }))
    }, formatters = {
        htmlformatter: function(e, t, a, i, r) {
            return a
        },
        link2docformatter: function(e, t, a, i, r) {
            return '<a href="javascript:void(0)" class="link2docformatter" data-val="' + a + '" data-attr="' + i.searchAttributeName + '" data-fid="' + (void 0 === i.folderId ? "" : i.folderId) + '">Link</a>'
        },
        link2web3dformatter: function(e, t, a, i, r) {
            var o = player.model.getGroupsByUserId(a);
            if (0 != o.length && o[0].groupType == lt.GROUP_TYPE_ASSEMBLY) return '<a href="javascript:void(0)" class="link2web3dformatter" data-val="' + a + '" data-attr="' + i.searchAttributeName + '" data-fid="' + (void 0 === i.folderId ? "" : i.folderId) + '" data-win="' + (void 0 === i.windowTarget ? "" : i.windowTarget) + '">Link</a>'
        }
    }
}, function(e, t) {
    Controller = function() {
        "use strict";
        this.isUpdate = !1, this.objList = [], this.notify = function(e) {
            this.isUpdate || (this.isUpdate = !0, this.objList.forEach((function(t) {
                t && t.update(e)
            })), this.isUpdate = !1)
        }, this.registController = function(e) {
            this.objList.push(e)
        }
    }
}, function(e, t) {
    View3D = function(e) {
        "use strict";
        var t = this;
        this.player = e.player, this.controller = null, this.update = function(e) {
            var a;
            if (e.selfObj !== this) {
                switch (e.updateType) {
                    case "SELECT_ON":
                        t.player.model.clearSelection(), $.each(e.updateTagetElems, (function(e, i) {
                            (a = t.player.model.getGroupByUniqueId(i)) && t.player.model.addSelection(a)
                        })), t.player.model.fitSelection && t.player.view.fit(t.player.model.getSelections());
                        break;
                    case "SELECT_OFF":
                        var i = t.player.model.getSelections();
                        e.updateTagetElems[0], t.player.model.clearSelection(), $.each(i, (function(a, i) {
                            i.uniqueId !== e.updateTagetElems[0] && t.player.model.addSelection(i)
                        })), t.player.model.fitSelection && t.player.view.fit(t.player.model.getSelections());
                        break;
                    case "SELECT_CLEAR":
                        t.player.model.clearSelection(), t.player.model.fitSelection && t.player.view.fit([]);
                        break;
                    case "VISIBILITY_ON_ONLY":
                        $.each(e.updateTagetElems, (function(e, i) {
                            (a = t.player.model.getGroupByUniqueId(i)) && (a.visibility = !0)
                        }));
                        break;
                    case "VISIBILITY_OFF_ONLY":
                        $.each(e.updateTagetElems, (function(e, i) {
                            (a = t.player.model.getGroupByUniqueId(i)) && (a.visibility = !1)
                        }))
                }
                t.updateViewPart(e.single), t.updateViewAll()
            }
        }, this.registController = function(e) {
            this.controller = e
        }, this.updateViewPart = function(e) {
            var a = t.player.part;
            if (a) {
                if (a.fileLoading) return;
                a.model.hideAllGroups();
                var i = [],
                    r = {};
                $.each(t.player.model.getSelections(), (function(t, o) {
                    var s = a.model.getGroupsByUserId(o.userId);
                    null != s && 1 == s.length && (e && r[o.userIdBase] || (r[o.userIdBase] = !0, i.push(s[0])))
                })), i.length > 0 && (a.model.showGroups(i), a.view.fit(i))
            }
        }, this.updateViewAll = function() {
            var e = t.player.all;
            e && (e.model.clearSelection(), $.each(t.player.model.getSelections(), (function(t, a) {
                var i = e.model.getGroupsByUserId(a.userId);
                null != i && 1 == i.length && e.model.addSelection(i[0])
            })))
        };
        try {
            t.player.addEventListener("ltSelectChange", (function(e) {
                if (!t.player.fileLoading && e && void 0 !== e.selectedGroups) {
                    var a = [];
                    a.updateTagetElems = [], e.selectedGroups.length > 0 ? ($.each(t.player.model.getSelections(), (function(e, t) {
                        a.updateTagetElems.push(String(t.userId))
                    })), a.updateType = "SELECT_ON") : a.updateType = "SELECT_CLEAR", t.updateViewPart(), t.updateViewAll(), a.selfObj = t, t.controller.notify(a)
                }
            }))
        } catch (e) {}
    }
}, function(e, t) {
    Toolbar = function(e) {
        "use strict";
        var t = this;
        this.controller = null, this.opeMode, this.player, this.operation = !1, this.direction = !1, this.homeState = [], this.initCamera = {}, this.initPosition = [], this.loadingModel = !1;
        var a = "215px";
        if (void 0 === e) throw new Error("ltError: Required argument. method=Toolbar, argument=params");

        function i(e) {
            if (t.loadingModel) window.alert("3D Modeling Loading.. The function of Toolbar will not provide.");
            else {
                var a = e.target.className.replace("button view_mode ", "").replace(" selected", "");
                switch (a) {
                    case "walkthrough":
                        return void t.walkthrough();
                    case "home":
                        return void t.home();
                    case "pan":
                    case "zoom":
                    case "region":
                    case "examine":
                        t.player.view.setOperationMode({
                            mode: "view",
                            subMode: a
                        });
                        break;
                    case "view_target":
                        "gazingPoint" === t.player.view.getOperationMode().subMode ? r() : (t.opeMode = t.player.view.getOperationMode(), t.player.view.setOperationMode({
                            mode: "view",
                            subMode: "gazingPoint"
                        }));
                        break;
                    case "wt_pan":
                        t.walkthroughPan();
                        break;
                    case "wt_walk":
                        t.walkthroughWalk();
                        break;
                    case "wt_look_around":
                        t.walkthroughLookAround();
                        break;
                    case "wt_region":
                        t.walkthroughRegion();
                        break;
                    case "wt_backAndForth":
                        t.walkthroughBackAndForth();
                        break;
                    case "area_fit":
                        return void t.player.view.fit(t.player.model.getSelections());
                    case "rotate_left":
                        return void t.player.view.rotateViewingCamera(0, 0, 90);
                    case "rotate_right":
                        return void t.player.view.rotateViewingCamera(0, 0, -90);
                    case "sel_trans_sel":
                        return void t.selTransSel();
                    case "sel_trans_nosel":
                        return void t.selTransNosel();
                    case "fixUp":
                        return void t.fixUp();
                    case "fit_selection":
                        return void t.fitSelection();
                    case "change_display":
                        return void t.changeDisplay();
                    case "front":
                    case "back":
                    case "right":
                    case "left":
                    case "top":
                    case "bottom":
                    case "isometric1":
                    case "isometric2":
                    case "isometric3":
                    case "isometric4":
                        return void t.player.view.setDirection(a);
                    case "search":
                        return void t.search($(this));
                    default:
                        return
                }
                $(".view_mode").removeClass("selected"), $(this).addClass("selected"), o()
            }
        }

        function r() {
            t.player.view.setOperationMode(t.opeMode), $(".view_mode").removeClass("selected"), o(), "view" === t.opeMode.mode && $("." + t.opeMode.subMode).addClass("selected")
        }

        function o() {
            t.player.view.getDisplaySettings().fixUp && $(".view_mode.fixUp").addClass("selected"), t.player.selectionTransparentMode === lt.SEL_TRANS_SEL ? $(".view_mode.sel_trans_sel").addClass("selected") : t.player.selectionTransparentMode === lt.SEL_TRANS_NO_SEL && $(".view_mode.sel_trans_nosel").addClass("selected"), "walk" === t.player.view.getOperationMode().mode && $(".view_mode.walkthrough").addClass("selected"), t.player.model.fitSelection && $(".fit_selection").addClass("selected")
        }
        Object.keys(e).forEach((function(a) {
            t[a] = e[a]
        })), this.update = function(e) {
            e.selfObj === this && e.updateType
        }, this.registController = function(e) {
            this.controller = e
        }, $(".view_mode").each((function() {
            $(this).on("click", i)
        })), $(".img_header").length > 0 && ($(".img_header").on("click", (function() {
            var e = $(this); - 1 !== e.attr("src").indexOf("open") ? (e.attr("src", e.attr("src").replace("open", "close")), e.parent("div").parent("div").children("div:last-child").hide()) : (e.attr("src", e.attr("src").replace("close", "open")), e.parent("div").parent("div").children("div:last-child").show())
        })), $(".img_header").on("mouseover", (function() {
            $(this).css("cursor", "pointer")
        }))), this.fitSelection = function() {
            t.player.model.fitSelection ? (t.player.model.fitSelection = !1, $(".fit_selection").removeClass("selected")) : (t.player.model.fitSelection = !0, $(".fit_selection").addClass("selected"))
        }, this.changeDisplay = function() {
            var e = t.player.model.getSelections();
            if (e.length > 0) {
                e[0].visibility ? t.player.model.hideGroups(e) : t.player.model.showGroups(e);
                var a = [];
                a.updateType = "VISIBILITY_UPDATE_ALL", a.updateTagetElems = t.player.model.getGroupVisibilities(), t.controller.notify(a)
            }
        }, this.home = function() {
            t.player.model.setGroupVisibilities(t.homeState), t.player.view.setViewingCameraParameters(t.initCamera), t.player.model.setGroupPositions(t.initPosition);
            var e = [];
            e.updateType = "VISIBILITY_UPDATE_ALL", e.updateTagetElems = t.homeState, t.controller.notify(e)
        }, this.search = function(e) {
            e.hasClass("selected") ? ($("#search").hide(), e.removeClass("selected")) : ($("#search").show(), $("#search_key").focus(), e.addClass("selected"))
        }, this.walkthrough = function(e) {
            if ($(".view_mode.pan").removeClass("selected"), $(".view_mode.examine").removeClass("selected"), $(".view_mode.zoom").removeClass("selected"), $(".view_mode.region").removeClass("selected"), $(".view_mode.view_target").removeClass("selected"), $(".view_mode.wt_pan").removeClass("selected"), $(".view_mode.wt_walk").removeClass("selected"), $(".view_mode.wt_look_around").removeClass("selected"), $(".view_mode.wt_region").removeClass("selected"), $(".view_mode.wt_backAndForth").removeClass("selected"), "view" === t.player.view.getOperationMode().mode) {
                t.player.view.setOperationMode({
                    mode: "walk",
                    subMode: "walk"
                }), $(".view_mode.walkthrough").addClass("selected"), $(".view_mode.wt_walk").addClass("selected"), $(".view_mode.pan").hide(), $(".view_mode.examine").hide(), $(".view_mode.zoom").hide(), $(".view_mode.region").hide(), $(".view_mode.view_target").hide(), $(".view_mode.rotate_left").hide(), $(".view_mode.rotate_right").hide(), $(".view_mode.fit_selection").hide(), $(".view_mode.fixUp").hide(), $(".view_mode.wt_pan").show(), $(".view_mode.wt_walk").show(), $(".view_mode.wt_look_around").show(), $(".view_mode.wt_region").show(), $(".view_mode.wt_backAndForth").show(), $(".view_mode.front").hide(), $(".view_mode.back").show(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").hide(), $(".view_mode.bottom").hide(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide();
                var i = document.querySelector("#toolbar_1_body");
                a = i.style.width, i.style.width = "470px", document.querySelector("#toolbar_2_body").style.height = "130px"
            } else {
                t.player.view.setOperationMode({
                    mode: "view",
                    subMode: "examine"
                }), $(".view_mode.walkthrough").removeClass("selected"), $(".view_mode.examine").addClass("selected"), $(".view_mode.pan").show(), $(".view_mode.examine").show(), $(".view_mode.zoom").show(), $(".view_mode.region").show(), $(".view_mode.view_target").show(), $(".view_mode.rotate_left").show(), $(".view_mode.rotate_right").show(), $(".view_mode.fit_selection").show(), $(".view_mode.fixUp").show(), $(".view_mode.wt_pan").hide(), $(".view_mode.wt_walk").hide(), $(".view_mode.wt_look_around").hide(), $(".view_mode.wt_region").hide(), $(".view_mode.wt_backAndForth").hide(), $(".view_mode.front").show(), $(".view_mode.back").show(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").show(), $(".view_mode.bottom").show(), $(".view_mode.isometric1").show(), $(".view_mode.isometric2").show(), $(".view_mode.isometric3").show(), $(".view_mode.isometric4").show(), (i = document.querySelector("#toolbar_1_body")).style.width = a, document.querySelector("#toolbar_2_body").style.height = "430px"
            }
        }, this.fixUp = function() {
            var e = t.player.view.getDisplaySettings();
            e.fixUp = !e.fixUp, t.player.view.setDisplaySettings(e), e.fixUp ? $(".view_mode.fixUp").addClass("selected") : $(".view_mode.fixUp").removeClass("selected")
        }, this.selTransSel = function() {
            t.player.selectionTransparentMode === lt.SEL_TRANS_SEL ? (t.player.selectionTransparentMode = lt.SEL_TRANS_NORMAL, $(".view_mode.sel_trans_sel").removeClass("selected")) : (t.player.selectionTransparentMode = lt.SEL_TRANS_SEL, $(".view_mode.sel_trans_sel").addClass("selected"), $(".view_mode.sel_trans_nosel").removeClass("selected"))
        }, this.selTransNosel = function() {
            t.player.selectionTransparentMode === lt.SEL_TRANS_NO_SEL ? (t.player.selectionTransparentMode = lt.SEL_TRANS_NORMAL, $(".view_mode.sel_trans_nosel").removeClass("selected")) : (t.player.selectionTransparentMode = lt.SEL_TRANS_NO_SEL, $(".view_mode.sel_trans_nosel").addClass("selected"), $(".view_mode.sel_trans_sel").removeClass("selected"))
        }, this.walkthroughPan = function() {
            t.player.view.setOperationMode({
                mode: "walk",
                subMode: "pan"
            }), $(".view_mode.front").hide(), $(".view_mode.back").show(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").hide(), $(".view_mode.bottom").hide(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide(), document.querySelector("#toolbar_2_body").style.height = "130px"
        }, this.walkthroughWalk = function() {
            t.player.view.setOperationMode({
                mode: "walk",
                subMode: "walk"
            }), $(".view_mode.front").hide(), $(".view_mode.back").show(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").hide(), $(".view_mode.bottom").hide(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide(), document.querySelector("#toolbar_2_body").style.height = "130px"
        }, this.walkthroughLookAround = function() {
            t.player.view.setOperationMode({
                mode: "walk",
                subMode: "look"
            }), $(".view_mode.front").show(), $(".view_mode.back").hide(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").show(), $(".view_mode.bottom").show(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide(), document.querySelector("#toolbar_2_body").style.height = "215px"
        }, this.walkthroughRegion = function() {
            t.player.view.setOperationMode({
                mode: "walk",
                subMode: "region"
            }), $(".view_mode.front").hide(), $(".view_mode.back").hide(), $(".view_mode.right").hide(), $(".view_mode.left").hide(), $(".view_mode.top").hide(), $(".view_mode.bottom").hide(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide(), document.querySelector("#toolbar_2_body").style.height = "35px"
        }, this.walkthroughBackAndForth = function() {
            t.player.view.setOperationMode({
                mode: "walk",
                subMode: "backAndForth"
            }), $(".view_mode.front").hide(), $(".view_mode.back").hide(), $(".view_mode.right").hide(), $(".view_mode.left").hide(), $(".view_mode.top").hide(), $(".view_mode.bottom").hide(), $(".view_mode.isometric1").hide(), $(".view_mode.isometric2").hide(), $(".view_mode.isometric3").hide(), $(".view_mode.isometric4").hide(), document.querySelector("#toolbar_2_body").style.height = "35px"
        };
        try {
            this.player.addEventListener("ltViewGazingPoint", r)
        } catch (e) {}
    }
}, function(e, t) {
    PropTable = function(e) {
        "use strict";
        var t = this;
        if (this.player = e.player, this.controller = null, this.topAssembly = !1, this.property = null, this.isDispComponent = !1, this.formatter = null, this.folderId = null, this.searchAttributeName = null, this.windowTarget = "_blank", void 0 === e) throw new Error("ltError: Required argument. method=PropTable, argument=params");
        Object.keys(e).forEach((function(a) {
            t[a] = e[a]
        })), this.update = function(e) {
            if (t.isDispComponent && !t.topAssembly && e.selfObj !== this) switch (e.updateType) {
                case "SELECT_ON":
                case "SELECT_OFF":
                    t.setProperty();
                    break;
                case "SELECT_CLEAR":
                    $.each(t.property, (function(e, t) {
                        $("#" + t.name).html("")
                    }))
            }
        }, this.registController = function(e) {
            this.controller = e
        }, this.createPropTable = function() {
            t.isDispComponent && t.setProperty()
        }, this.setProperty = function() {
            var e = t.getDispGroup();
            e && $.each(t.property, (function(a, i) {
                switch (i.formatter) {
                    case void 0:
                    case null:
                    case "htmlformatter":
                        for (var r = i.format, o = null; o = r.match(/\$\{[^{}]*\}\.\{[^{}]*?\}/);) {
                            var s = e.getAltName(o[0]);
                            r = r.replace(o[0], s)
                        }
                        for (; o = r.match(/\$\{[^{}]*\}/);) {
                            s = e.getAltName(o[0]);
                            r = r.replace(o[0], s)
                        }
                        $("#" + i.name).html(r);
                        break;
                    case "link2docformatter":
                        var n = e.getAltName(i.format),
                            l = i.searchAttributeName,
                            d = void 0 === i.folderId ? "" : i.folderId;
                        $("#" + i.name).html('<a href="javascript:void(0)" class="link2docformatter" data-val="' + n + '" data-attr="' + l + '" data-fid="' + d + '">表示</a>'), $("#" + i.name + " a").on("click", (function(e) {
                            var t = $(e.target),
                                a = t.data("val"),
                                i = t.data("attr"),
                                r = t.data("fid"),
                                o = t.data("win"),
                                s = {
                                    type: "json",
                                    ver: apiver
                                },
                                n = {
                                    Keyword: '"' + i + ":" + a + '"',
                                    WildeCard: "1",
                                    DocumentTypes: ["0"]
                                };
                            void 0 !== r && r.length > 0 && (n.FolderIDs = [r]), s.data = JSON.stringify(n), null != o && 0 != o.length || (o = "_blank"), $.getJSON(basexcmurl + "API/SEARCH_OBJECT2", s, (function(e) {
                                null != e.Objects && 0 != e.Objects.length && $.getJSON(basexcmurl + "API/QUERY_DOCUMENT", {
                                    type: "json",
                                    ver: apiver,
                                    data: JSON.stringify({
                                        DocumentID: e.Objects[0].ObjectID,
                                        HistoryFlag: "1"
                                    })
                                }, (function(e) {
                                    if (e.Info.Success && null != e.Documents && e.Documents.length > 0) {
                                        var t = e.Documents[0];
                                        if (null != t.ContentHistorys && t.ContentHistorys.length > 0) {
                                            var a = t.ContentHistorys[0];
                                            null != a.ContentZIPURL && "" != a.ContentZIPURL ? window.open(a.ContentZIPURL, "_blank") : null != a.ContentURL && "" != a.ContentURL && window.open(a.ContentURL, "_blank")
                                        }
                                    }
                                }))
                            }))
                        }));
                        break;
                    case "link2web3dformatter":
                        n = e.getAltName(i.format), l = i.searchAttributeName, d = void 0 === i.folderId ? "" : i.folderId;
                        var c = void 0 === i.windowTarget ? "" : i.windowTarget;
                        $("#" + i.name).html('<a href="javascript:void(0)" class="link2web3dformatter" data-val="' + n + '" data-attr="' + l + '" data-fid="' + d + '" data-win="' + c + '">表示</a>'), $("#" + i.name + " a").on("click", (function(e) {
                            var a = $(e.target),
                                i = a.data("val"),
                                r = a.data("attr"),
                                o = a.data("fid"),
                                s = a.data("win"),
                                n = {
                                    type: "json",
                                    ver: apiver
                                },
                                l = {
                                    Keyword: '"' + r + ":" + i + '"',
                                    WildeCard: "1",
                                    ObjectTypes: ["CAP"]
                                };
                            void 0 !== o && o.length > 0 && (l.FolderIDs = [o]), n.data = JSON.stringify(l), null != s && 0 != s.length || (s = "_blank");
                            location.href;
                            t.player.fileLoading || history.back()
                        }))
                }
            }))
        }, this.getDispGroup = function() {
            var e = null;
            return t.topAssembly ? $.each(t.player.model.getTopGroups(), (function(t, a) {
                a.groupType !== lt.GROUP_TYPE_ASSEMBLY || a.groupClass !== lt.GROUP_CLASS_NORMAL || (e = a)
            })) : $.each(t.player.model.getSelections(), (function(a, i) {
                if (isDisplay(i)) {
                    var r = t.player.model.getGroupsByUserId(i.userId);
                    r && $.each(r, (function(t, a) {
                        isDisplay(a) && (e = a)
                    }))
                }
            })), e
        }
    }
}, function(e, t) {
    Search = function(e) {
        "use strict";
        var t = this;
        this.controller = null, this.player, this.mainGrid, this.grid, this.columns = [{
            id: 0,
            name: "name",
            field: 0
        }, {
            id: 1,
            name: "type",
            field: 1
        }], this.isDispComponent = !1, this.hidden = !1;
        var a = {
            syncColumnCellResize: !0,
            forceFitColumns: !0
        };
        if (void 0 === e) throw new Error("ltError: Required argument. method=Search, argument=params");
        Object.keys(e).forEach((function(a) {
            t[a] = e[a]
        })), this.update = function(e) {}, this.registController = function(e) {
            this.controller = e
        }, this.createSearchResultList = function(e) {
            t.isDispComponent && (t.grid = new Slick.Grid(t.mainGrid, e, t.columns, a), t.grid.setSelectionModel(new Slick.RowSelectionModel), t.grid.setSelectedRows([]), t.grid.onSelectedRowsChanged.subscribe((function(e, a) {
                var i = t.grid.getData(),
                    r = [];
                a.rows.forEach((function(e) {
                    r.push(i[e].Key)
                }));
                var o = [];
                o.updateTagetElems = t.getGroupIdsByUserIdBase(r), o.selfObj = t, o.updateType = "SELECT_ON", o.single = !0, t.controller.notify(o)
            })), $("#search_result_count").html(e.length), t.hidden && (1 == ini.component.length && ($("#search").hide(), $("[id^=toolbar]").find(".search").removeClass("selected")), t.hidden = !1))
        }, this.isDisplay = function(e) {
            var t = e.groupType;
            return t === lt.GROUP_TYPE_ASSEMBLY || t === lt.GROUP_TYPE_PART || t === lt.GROUP_TYPE_EMPTY || t === lt.GROUP_TYPE_ERRROR
        }, this.getGroupIdsByUserIdBase = function(e) {
            var a = [];
            return $.each(e, (function(e, i) {
                $.each(t.player.model.getGroupsByUserIdBase(i), (function(e, i) {
                    var r = t.player.model.getGroupsByUserIdBase(i.userIdBase);
                    $.each(r, (function(e, i) {
                        t.isDisplay(i) && a.push(i.uniqueId)
                    }))
                }))
            })), a
        }, $("#search_btn").click((function() {
            var e = $.trim($("#search_key").val()),
                a = e.split(" ");
            if (0 != e.length && 0 != a.length)
                if (null != searchcacheurl && 0 != searchcacheurl.length) {
                    null == searchData && ($.ajaxSetup({
                        async: !1
                    }), $.getJSON(searchcacheurl, (function(e) {
                        searchData = e
                    })), $.ajaxSetup({
                        async: !0
                    }));
                    var i = [],
                        r = [];
                    $.each(searchData, (function(e, o) {
                        var s = o.k,
                            n = o.v,
                            l = !0;
                        if (-1 == $.inArray(s, r) && ($.each(a, (function(e, t) {
                                var a = t.replace(/\?/g, ".");
                                if (a = a.replace(/\*/g, ".*"), !new RegExp(a).test(s)) return l = !1, !1
                            })), l || (l = !0, $.each(a, (function(e, t) {
                                var a = t.replace(/\?/g, ".");
                                if (a = a.replace(/\*/g, ".*"), !new RegExp(a).test(n)) return l = !1, !1
                            }))), l)) {
                            var d = "",
                                c = t.player.model.getGroupsByUserId(s);
                            c.length > 0 && (c[0].groupType === lt.GROUP_TYPE_ASSEMBLY ? d = "アセンブリ" : c[0].groupType === lt.GROUP_TYPE_PART && (d = "パート"));
                            var p = {
                                Key: s,
                                name: s
                            };
                            p[0] = s, p[1] = d, i.push(p), r.push(s)
                        }
                    })), t.createSearchResultList(i)
                } else console.log("searchcacheurl is empty");
            else console.log("search key is empty.")
        })), $("#search_key").keydown((function(e) {
            13 === e.keyCode && $("#search_btn").click()
        }))
    }
}, function(e, t) {}, function(module, exports) {
    ! function() {
        "use strict";
        var COMPONENT_ID_PLAYER = "web3dPlayer",
            COMPONENT_ID_PLAYER_MAIN = "web3dPlayer_main",
            COMPONENT_ID_PLAYER_PART = "web3dPlayer_part",
            COMPONENT_ID_PLAYER_ALL = "web3dPlayer_all",
            COMPONENT_ID_TOOLBAR = "toolbar",
            COMPONENT_ID_ASSY_TREE = "assytree",
            COMPONENT_ID_PROP_TABLE = "propTable",
            COMPONENT_ID_PART_LIST = "partslist",
            COMPONENT_ID_CONTENT = "staticContent",
            COMPONENT_ID_SEARCH = "search";
        $((function() {
            initDisp(), initMain(), setLayout($("body")), adjustComponent()
        }));
        var initDisp = function() {
                var e = $("body");
                ini.component && $.each(ini.component, (function(t, a) {
                    e.append(createComponent(a, e))
                })), createPlayer(), createAssyTree(), createPartList(), createPropTable(), createstaticContents(), createToolbar(), createSearch()
            },
            createComponent = function(e, t) {
                var a = $("<div></div>");
                return setSize(a, t, e), e.region ? a.addClass(e.region) : (a.attr("id", e.id), setPosition(a, t, e), !0 === e.draggable && a.addClass("drag-drop"), setProperty(a, e)), e.component && $.each(e.component, (function(e, t) {
                    a.append(createComponent(t, a))
                })), a
            },
            setSize = function(e, t, a) {
                var i, r;
                "body" === t.selector ? (i = window.innerWidth, r = window.innerHeight) : (i = t.css("width"), r = t.css("height")), t.attr("id") ? (e.css("position", "absolute"), e.css("width", a.width ? percentToPixel(a.width, i) : "0px"), e.css("height", a.height ? percentToPixel(a.height, r) : "0px")) : (e.css("float", "left"), e.css("width", a.width ? percentToPixel(a.width, i) : i), e.css("height", a.height ? percentToPixel(a.height, r) : r))
            },
            setPosition = function(e, t, a) {
                a.positionLeft ? e.css("left", pixelToPercent(a.positionLeft, t.css("width"))) : a.positionRight ? e.css("right", pixelToPercent(a.positionRight, t.css("width"))) : e.css("left", "0px"), a.positionTop ? e.css("top", pixelToPercent(a.positionTop, t.css("height"))) : a.positionBottom ? e.css("bottom", pixelToPercent(a.positionBottom, t.css("height"))) : e.css("top", "0px")
            },
            renderComponent = function(e, t, a) {
                return e.id ? renderDispComponent(e, t, a) : renderLayoutComponent(e, t)
            },
            setProperty = function(e, t) {
                switch (t.id) {
                    case COMPONENT_ID_PLAYER:
                        createPlayerParam(e, t.property);
                        break;
                    case COMPONENT_ID_TOOLBAR:
                        createToolbarParam(e, t.property);
                        break;
                    case COMPONENT_ID_ASSY_TREE:
                        createAssyTreeParam(t.property);
                        break;
                    case COMPONENT_ID_PROP_TABLE:
                        createPropTableParam(t.property);
                        break;
                    case COMPONENT_ID_PART_LIST:
                        createPartListParam(t.property);
                        break;
                    case COMPONENT_ID_CONTENT:
                        createStaticContent(e, t.property);
                        break;
                    case COMPONENT_ID_SEARCH:
                        createSearchParam(t.property)
                }
            },
            createPlayerParam = function($div, props) {
                var type = getType(props, "main");
                $div.attr("id", $div.attr("id") + "_" + type), setDefaultPlayerParam(type), $.each(props, (function(i, prop) {
                    switch (prop.name) {
                        case "annotationFontFamily":
                        case "dimensionFontFamily":
                            playerParam[type][prop.name] = prop.value.split(",");
                            break;
                        case "minimumFPS":
                        case "shadowIntensity":
                            playerParam[type][prop.name] = parseFloat(prop.value);
                            break;
                        case "currentCoordinate":
                        case "fixUp":
                        case "fxaaEnabled":
                        case "shadowMapEnabled":
                        case "ssaoEnabled":
                        case "displaySurface":
                        case "displayCurveInside":
                            playerParam[type][prop.name] = "true" === prop.value;
                            break;
                        case "coordinate":
                        case "projection":
                            playerParam[type][prop.name] = eval(prop.value);
                            break;
                        default:
                            playerParam[type][prop.name] = prop.value
                    }
                }))
            },
            setDefaultPlayerParam = function(e) {
                playerParam[e] = {}, playerParam[e].elementId = COMPONENT_ID_PLAYER + "_" + e
            },
            createAssyTreeParam = function(e) {
                assyTreeParam.topNodeName = id, $.each(e, (function(e, t) {
                    switch (t.name) {
                        case "nodeCreateLevel":
                        case "nodeExpandLevel":
                            assyTreeParam[t.name] = parseInt(t.value, 10);
                            break;
                        case "altNameFormat":
                            assyTreeParam[t.name] = t.value
                    }
                })), assyTreeParam.altNameFormat || (assyTreeParam.altNameFormat = "${XVL_NAME}")
            },
            createToolbarParam = function(e, t) {
                var a = getType(t);
                a && (e.attr("id", e.attr("id") + "_" + a), toolbarParam[a] = {
                    button: []
                }, $.each(t, (function(e, t) {
                    switch (t.name) {
                        case "direction":
                            toolbarParam[a].direction = t.value;
                            break;
                        case "button":
                            toolbarParam[a].button.push(t.value)
                    }
                })))
            },
            createPartListParam = function(e) {
                partListParam.columns = [];
                var t = {};
                $.each(e, (function(e, a) {
                    t[a.name] = a.value
                })), partListParam.type = "all", partListParam.levelFrom = 1, $.each(e, (function(e, a) {
                    switch (a.name) {
                        case "type":
                        case "levelFrom":
                        case "levelTo":
                        case "groupby":
                        case "sort":
                        case "order":
                            partListParam[a.name] = a.value;
                            break;
                        default:
                            createPartColumnParam(t, a.name)
                    }
                }))
            },
            createPartColumnParam = function(e, t) {
                var a = t.match(/title\[(\d+)\]/);
                if (null != a && a.length > 1) {
                    var i = a[1],
                        r = e["width[" + i + "]"] ? convertInt(e["width[" + i + "]"] + "px") : 10;
                    switch (e["type[" + i + "]"]) {
                        case "prop":
                            var o = {
                                type: 0,
                                name: e["title[" + i + "]"],
                                width: r,
                                format: e["format[" + i + "]"],
                                folderId: e["folderId[" + i + "]"],
                                searchAttributeName: e["searchAttributeName[" + i + "]"],
                                windowTarget: e["windowTarget[" + i + "]"]
                            };
                            null != e["formatter[" + i + "]"] && (o.formatter = formatters[e["formatter[" + i + "]"]]), partListParam.columns.push(o), formats[i] = e["format[" + i + "]"];
                            break;
                        case "qty":
                            partListParam.columns.push({
                                type: 3,
                                name: e["title[" + i + "]"],
                                width: r,
                                format: ""
                            })
                    }
                }
            },
            createPropTableParam = function(e) {
                var t = {};
                $.each(e, (function(e, a) {
                    t[a.name] = a.value
                })), propTableParam.property = [], propTableParam.topAssembly = !1, $.each(e, (function(e, a) {
                    var i = a.name.match(/name\[(\d+)\]/);
                    null != i && i.length > 1 ? propTableParam.property.push({
                        name: a.value,
                        format: t["format[" + i[1] + "]"],
                        formatter: t["formatter[" + i[1] + "]"],
                        folderId: t["folderId[" + i[1] + "]"],
                        searchAttributeName: t["searchAttributeName[" + i[1] + "]"],
                        windowTarget: t["windowTarget[" + i[1] + "]"]
                    }) : "type" === a.name && (propTableParam.topAssembly = "top" == a.value)
                }))
            },
            createStaticContent = function(e, t) {
                $.each(t, (function(t, a) {
                    switch (a.name) {
                        case "id":
                            e.attr("id", a.value);
                            break;
                        case "url":
                            staticContents[e.attr("id")] = a.value
                    }
                }))
            },
            createSearchParam = function(e) {
                $.each(e, (function(e, t) {
                    switch (t.name) {
                        case "hidden":
                            searchParam[t.name] = "true" === t.value;
                            break;
                        default:
                            searchParam[t.name] = t.value
                    }
                }))
            },
            getType = function(e, t) {
                var a = t;
                return $.each(e, (function(e, t) {
                    switch (t.name) {
                        case "type":
                            return void(a = t.value)
                    }
                })), a
            },
            createPlayer = function() {
                var e = $('<div id="progress_waku"></div>');
                $("body").append(e), e.append($('<div id="progress"></div>')), e.append($("<span>0%</span>")), e.hide(), $("#" + COMPONENT_ID_PLAYER_PART).length > 0 && createDivComponent(COMPONENT_ID_PLAYER_PART), $("#" + COMPONENT_ID_PLAYER_ALL).length > 0 && createDivComponent(COMPONENT_ID_PLAYER_ALL)
            },
            createAssyTree = function() {
                0 != $("#" + COMPONENT_ID_ASSY_TREE).length && (assyTreeParam.isDispComponent = !0, createDivComponent(COMPONENT_ID_ASSY_TREE), $("#assyTree_body").append($('<div id="tree"></div>')), $("#tree").dynatree({
                    imagePath: "/" + ver + "/dynatree/css/dynatree/custom/",
                    persist: !1,
                    clickFolderMode: 2,
                    checkbox: !0,
                    selectMode: 2,
                    fx: {
                        height: "toggle",
                        duration: 200
                    },
                    noLink: !1,
                    debugLevel: 0,
                    additionalSelection: "NONE"
                }))
            },
            createPropTable = function() {
                if (0 != $("#" + COMPONENT_ID_PROP_TABLE).length) {
                    propTableParam.isDispComponent = !0, createDivComponent(COMPONENT_ID_PROP_TABLE);
                    var e = '<table border="0" height="100%" width="100%">';
                    $.each(propTableParam.property, (function(t, a) {
                        e += "<tr>", e += '<th class="proptitle">' + a.name + "</th>", e += '<th class="propval" id="' + a.name + '"></th>', e += "</tr>"
                    })), e += "</table>", $("#propTable_body").html(e)
                }
            },
            createstaticContents = function() {
                $.each(staticContents, (function(e, t) {
                    $.ajax(t, {
                        type: "get",
                        dataType: "html"
                    }).done((function(t) {
                        "" != templatebaseurl && (t = t.replace(/\$\{baseUrl\}/g, templatebaseurl + "static/")), $("#" + e).html(t)
                    }))
                }))
            },
            createPartList = function() {
                0 != $("#" + COMPONENT_ID_PART_LIST).length && (partListParam.isDispComponent = !0, createDivComponent(COMPONENT_ID_PART_LIST))
            },
            createToolbar = function() {
                var e = "/" + ver + "/toolbar/img/svg/";
                for (var t in toolbarParam) {
                    var a = toolbarParam[t],
                        i = $("#toolbar_" + t),
                        r = $('<div id="toolbar_' + t + '_header"></div>'),
                        o = $('<div id="toolbar_' + t + '_body"></div>');
                    if (i.append(r), i.append(o), a && "horizontal" === a.direction) r.css("width", "20px"), r.css("height", i.css("height")), r.append($('<img src="/' + ver + '/toolbar/img/open-yoko.png" class="img_header" />')), r.css("position", "absolute"), o.css("left", "20px"), o.css("width", convertInt(i.css("width")) - 20 + "px"), o.css("height", i.css("height")), o.css("position", "absolute"), i.css("width", "0px");
                    else {
                        r.css("width", i.css("width")), r.css("height", "20px"), r.append($('<img src="/' + ver + '/toolbar/img/open-tate.png" class="img_header" />')), o.css("width", i.css("width"));
                        try {
                            o.css("height", convertInt(i.css("height")) - 20 + "px")
                        } catch (e) {}
                        i.css("height", "0px"), r.css("position", "relative"), o.css("position", "relative")
                    }
                    try {
                        $.each(a.button, (function(t, a) {
                            var i = $('<img src="' + e + "icon-" + a + '.svg" class="button view_mode ' + a + '" />');
                            if ("search" === a) {
                                if (ini.component.length > 1) return;
                                i.addClass("selected")
                            }
                            o.append(i)
                        }))
                    } catch (e) {}
                    i.hasClass("drag-drop") && (i.removeClass("drag-drop"), r.addClass("drag-drop")), i.addClass("toolbar")
                }
                $(".view_mode.pan").show(), $(".view_mode.examine").show(), $(".view_mode.zoom").show(), $(".view_mode.region").show(), $(".view_mode.view_target").show(), $(".view_mode.wt_pan").hide(), $(".view_mode.wt_walk").hide(), $(".view_mode.wt_look_around").hide(), $(".view_mode.wt_region").hide(), $(".view_mode.wt_backAndForth").hide(), $(".view_mode.front").show(), $(".view_mode.back").show(), $(".view_mode.right").show(), $(".view_mode.left").show(), $(".view_mode.top").show(), $(".view_mode.bottom").show(), $(".view_mode.isometric1").show(), $(".view_mode.isometric2").show(), $(".view_mode.isometric3").show(), $(".view_mode.isometric4").show()
            },
            createSearch = function() {
                if (0 != $("#" + COMPONENT_ID_SEARCH).length) {
                    searchParam.isDispComponent = !0, createDivComponent(COMPONENT_ID_SEARCH);
                    var e = $("#" + COMPONENT_ID_SEARCH + "_body"),
                        t = $('<div id="search_form"></div>');
                    t.append($('<span>検索キー： </span><input type="text" id="search_key" />')), t.append($('<button type="button" id="search_btn">検索</button>')), e.append(t);
                    var a = $("<hr />");
                    e.append(a);
                    var i = $('<div id="search_result"></div>');
                    e.append(i);
                    var r = $('<div>検索結果 (<span id="search_result_count">0</span>)</div>');
                    i.append(r);
                    var o = $('<div id="search_result_list"></div>');
                    i.append(o);
                    var s = e.width() - 8,
                        n = e.height() - (o.offset().top - e.offset().top) - 8;
                    o.css("width", percentToPixel("100%", s + "px")), o.css("height", percentToPixel("100%", n + "px"))
                }
            },
            setLayout = function(e) {
                e || (e = $("body"));
                var t = 0,
                    a = 0,
                    i = 0,
                    r = 0,
                    o = e.children("div.east");
                o.length > 0 && (t = convertInt(o.css("width")) - 7, o.css("width", t + "px"));
                var s = e.children("div.west");
                s.length > 0 && (a = convertInt(s.css("width")) - 7, s.css("width", a + "px"));
                var n = e.children("div.north");
                n.length > 0 && (i = convertInt(n.css("height")) - 7, n.css("height", i + "px"));
                var l = e.children("div.south");
                l.length > 0 && (r = convertInt(l.css("height")) - 7, l.css("height", r + "px")), e.layout({
                    closable: !1,
                    center__paneSelector: ".center",
                    east__paneSelector: ".east",
                    east__size: t,
                    west__paneSelector: ".west",
                    west__size: a,
                    north__paneSelector: ".north",
                    north__size: i,
                    south__paneSelector: ".south",
                    south__size: r,
                    center__onresize_end: layoutsChange,
                    east__onresize_end: layoutsChange,
                    west__onresize_end: layoutsChange,
                    north__onresize_end: layoutsChange,
                    south__onresize_end: layoutsChange
                }), e.children().each((function() {
                    $(this).children("div.center").length > 0 && setLayout($(this))
                }))
            },
            adjustComponent = function() {
                var e = $("#" + COMPONENT_ID_PLAYER_MAIN);
                e.children().each((function() {
                    var t = $(this);
                    if (t.attr("id")) {
                        var a = t.children("div:last-child");
                        t.find("input[type=checkbox]").on("click", (function() {
                            $(this).prop("checked") ? a.show() : a.hide()
                        })), e.parent().append(t)
                    }
                }))
            },
            layoutsChange = function(e, t, a, i, r) {
                1 == ini.component.length ? t.find("div").each((function() {
                    if ($(this).attr("id")) switch ($(this).attr("id")) {
                        case COMPONENT_ID_PLAYER_MAIN:
                            setDivSize($(this)), setCanvas($(this))
                    }
                })) : t.find("div").each((function() {
                    if ($(this).attr("id")) switch ($(this).attr("id")) {
                        case COMPONENT_ID_PLAYER_MAIN:
                            setDivSize($(this)), setCanvas($(this));
                            break;
                        case COMPONENT_ID_PLAYER_PART:
                        case COMPONENT_ID_PLAYER_ALL:
                            setDivSize($(this)), setChildSize($(this)), setCanvas($(this));
                            break;
                        case COMPONENT_ID_ASSY_TREE:
                        case COMPONENT_ID_PROP_TABLE:
                        case COMPONENT_ID_CONTENT:
                            setDivSize($(this)), setChildSize($(this));
                            break;
                        case COMPONENT_ID_PART_LIST:
                            setDivSize($(this)), setChildSize($(this)), $(this).find(".slick-viewport").css("height", $(this).parent().css("height"));
                            break;
                        case COMPONENT_ID_SEARCH:
                            setDivSize($(this)), setChildSize($(this));
                            var e = $("#" + COMPONENT_ID_SEARCH + "_body"),
                                t = $("#search_result_list"),
                                a = e.width() - 8,
                                i = e.height() - (t.offset().top - e.offset().top) - 8;
                            t.css("width", percentToPixel("100%", a + "px")), t.css("height", percentToPixel("100%", i + "px"))
                    }
                }))
            },
            setDivSize = function(e, t) {
                void 0 === t ? (e.css("width", e.parent().css("width")), e.css("height", e.parent().css("height"))) : t ? e.css("width", e.parent().css("width")) : e.css("height", e.parent().css("height"))
            },
            setChildSize = function(e, t) {
                e.children().each((function() {
                    $(this).hasClass("toolbar") || $(this).hasClass("ui-layout-resizer") || (void 0 === t ? ($(this).css("width", e.css("width")), $(this).attr("width", e.css("width")), $(this).attr("id") && -1 === $(this).attr("id").indexOf("_header") && ($(this).css("height", e.css("height")), $(this).attr("height", e.css("height")))) : t ? ($(this).css("width", e.css("width")), $(this).attr("width", e.css("width"))) : $(this).attr("id") && -1 === $(this).attr("id").indexOf("_header") && ($(this).css("height", e.css("height")), $(this).attr("height", e.css("height"))))
                }))
            },
            setCanvas = function(e, t) {
                e.find("canvas").each((function() {
                    var a = e.children("div[id$=_body]");
                    0 == a.length && (a = e), void 0 === t ? ($(this).css("width", a.css("width")), $(this).attr("width", a.css("width")), $(this).css("height", a.css("height")), $(this).attr("height", a.css("height"))) : t ? ($(this).css("width", a.css("width")), $(this).attr("width", a.css("width"))) : ($(this).css("height", a.css("height")), $(this).attr("height", a.css("height"))), e.attr("id") === COMPONENT_ID_PLAYER_MAIN ? player.resize($(this).width(), $(this).height()) : e.attr("id") === COMPONENT_ID_PLAYER_PART ? player.part.resize($(this).width(), $(this).height()) : e.attr("id") === COMPONENT_ID_PLAYER_ALL && player.all.resize($(this).width(), $(this).height())
                }))
            },
            createDivComponent = function(e) {
                var t = $("#" + e),
                    a = $('<div id="' + e + '_header"></div>'),
                    i = $('<div id="' + e + '_body"></div>');
                t.append(a), t.append(i), t.parent().attr("id") && (createSwitchControl(e), a.css("height", "20px")), a.css("width", t.css("width")), a.css("position", "relative"), i.css("width", t.css("width")), i.css("height", convertInt(t.css("height")) - convertInt(a.css("height")) + "px"), i.css("position", "relative"), t.hasClass("drag-drop") && (t.removeClass("drag-drop"), a.addClass("drag-drop"))
            },
            createSwitchControl = function(e) {
                var t = $("#" + e + "_header"),
                    a = $("#" + e + "_body"),
                    i = $('<label class="switch"></label>'),
                    r = $('<span class="label"></span>'),
                    o = $('<input type="checkbox" checked="checked" />');
                t.append(i), i.append(o), i.append(r), r.append($('<span class="on"></span>')), r.append($('<span class="separator"></span>')), r.append($('<span class="off"></span>'));
                var s = e === COMPONENT_ID_PLAYER_PART || e === COMPONENT_ID_PLAYER_ALL;
                o.on("click", (function() {
                    $(this).prop("checked") ? (a.show(), s && setCanvas($("#" + e))) : (a.hide(), s || a.parent("div").css("height", "20px"))
                }))
            };
        $(document).on("contextmenu", (function() {
            return !1
        }));
        var controller = null,
            view3DParam = {},
            assyTree = null,
            partList = null,
            propTable = null,
            toolbar = null,
            view3D = null,
            COMPONENT_ID_ASSY_TREE = "assyTree",
            dispProgress = !1,
            param = {};

        function initMain() {
					try {
							param.elementId = playerParam.main.elementId
					} catch (e) {}
					param.currentCoordinate = !0;
					try {
							player = new lt.Player(param), player.addEventListener("ltLoad", loadModelEnd), player.addEventListener("ltLoadTexture", loadTextureEnd), player.addEventListener("ltDownloadProgress", loadModelProgress), player.addEventListener("ltLoadError", loadError), player.addEventListener('ltSelectChange', selectChange);
					} catch (e) {}
					if (playerParam.part) {
							playerParam.part.build2DScene = !1, playerParam.part.elementId += "_body";
							try {
									player.part = new lt.Player(playerParam.part)
							} catch (e) {}
							player && player.part && (player.part.addEventListener("ltLoad", loadModelPartEnd), player.part.addEventListener("ltLoadTexture", loadPartTextureEnd))
					}

					view3DParam.player = player, 
					view3D = new View3D(view3DParam), 
					assyTreeParam.player = player, 
					assyTreeParam.mainTree = $("#tree"), 
					assyTreeParam.scrollbar = $("#assyTree_body"), 
					assyTreeParam.nodeCreateLevel = 100, 
					assyTreeParam.nodeExpandLevel = 1, 
					assyTreeParam.topNodeName = id, 
					assyTreeParam.altNameFormat = "${XVL_NAME}";

					try {
						assyTree = new Assytree(assyTreeParam)
					} catch (e) {}
						partListParam.isDispComponent = !0, 
						partListParam.player = player, 
						partListParam.mainGrid = $("#partslist_body"), 
						partList = new PartList(partListParam), 
						propTableParam.player = player, 
						propTable = new PropTable(propTableParam), 
						toolbarParam.player = player, 
						(toolbar = new Toolbar(toolbarParam)).loadingModel = !1, 
						toolbar.toolBarWalkWidth = "590px", 
						toolbar.toolBar2WalkHeight = "130px", 
						toolbar.toolBar2WalkHeightPan = "130px", 
						toolbar.toolBar2WalkHeightWalk = "130px", 
						toolbar.toolBar2WalkHeightLook = "215px", 
						toolbar.toolBar2WalkHeightRegion = "35px", 
						toolbar.toolBar2WalkHeightBack = "35px", 
						(controller = new Controller).registController(view3D), 
						controller.registController(assyTree), 
						controller.registController(partList), 
						controller.registController(propTable), 
						controller.registController(toolbar), 
						view3D.registController(controller), 
						assyTree.registController(controller),
						partList.registController(controller), 
						propTable.registController(controller), 
						toolbar.registController(controller), 
						$("#progress").progressbar({
							value: 0,
							max: 100
						}), loadModel()
        }

        function $elem(e) {
            return document.getElementById(e)
        }

        function loadModelEnd() {
            player.fileLoading || loadModelCompleted()
        }

        function loadTextureEnd() {
            loadModelCompleted()
        }

        function loadModelCompleted() {
            player.view.enableRedraw = !0, toolbar.loadingModel = !1, dispProgress = !1, $("#progress_waku").hide(), assyTree.createAssyTree(), partList.createPartsList(), propTable.createPropTable(), toolbar.homeState = player.model.getGroupVisibilities(), toolbar.initCamera = player.view.getViewingCameraParameters(), toolbar.initPosition = player.model.getGroupPositions(), toolbar.initColorTransparencies = player.model.getColorTransparencies(), player.part && (player.part.view.enableRedraw = !1, player.part.loadFile({
                url: url
            })), player.view.enableViewSelection = !0, player.view.emptySelectionClear = !0, player.selectionTransparentMode = lt.SEL_TRANS_NORMAL, $("#view_mode_viewer_pan, #view_mode_viewer_rotate, #view_mode_viewer_zoom, #view_mode_viewer_region").removeClass("selected"), $("#view_mode_look_around, #view_mode_wt_pan, #view_mode_walk, #view_mode_wt_backAndForth, #view_mode_wt_region").removeClass("selected"), $("#view_mode_viewer_rotate").addClass("selected"), $("#view_mode_viewer_pickTrans").removeClass("selected"), $("#view_mode_viewer_pickTransNot").removeClass("selected"), $("#view_mode_viewer_gazingpoint").removeClass("selected");
            var e = player.view.getDisplaySettings();
            e.fixUp ? $("#view_mode_viewer_fixUp").addClass("selected") : $("#view_mode_viewer_fixUp").removeClass("selected"), !e.displaySurface && e.displayCurveInside ? ($("#view_mode_viewer_wire").addClass("selected"), $("#view_mode_viewer_shading").removeClass("selected"), $("#view_mode_viewer_wireshading").removeClass("selected")) : e.displaySurface && !e.displayCurveInside ? ($("#view_mode_viewer_wire").removeClass("selected"), $("#view_mode_viewer_shading").addClass("selected"), $("#view_mode_viewer_wireshading").removeClass("selected")) : e.displaySurface && e.displayCurveInside && ($("#view_mode_viewer_wire").removeClass("selected"), $("#view_mode_viewer_shading").removeClass("selected"), $("#view_mode_viewer_wireshading").addClass("selected")), $("#view_mode_viewer_changeMode").removeClass("selected"), $("#view_mode_viewer_pan").show(), $("#view_mode_viewer_rotate").show(), $("#view_mode_viewer_zoom").show(), $("#view_mode_viewer_region").show(), $("#view_mode_viewer_gazingpoint").show(), $("#rotateViewLeft").show(), $("#rotateViewRight").show(), $("#view_mode_viewer_fitSelection").show(), $("#view_mode_viewer_fixUp").show(), document.getElementById("menu_toolbar_1_body").style.width = toolbar.toolBarWidth, $("#view_mode_wt_pan").hide(), $("#view_mode_walk").hide(), $("#view_mode_look_around").hide(), $("#view_mode_wt_region").hide(), $("#view_mode_wt_backAndForth").hide(), $("#viewFront").show(), $("#viewBack").show(), $("#viewRight").show(), $("#viewLeft").show(), $("#viewTop").show(), $("#viewBottom").show(), $("#viewIsometric1").show(), $("#viewIsometric2").show(), $("#viewIsometric3").show(), $("#viewIsometric4").show(), document.getElementById("menu_toolbar_2_body").style.height = toolbar.toolBar2Height
        }

        function loadModelProgress(e) {
            var t;
            "json" == e.fileType && (t = 0 === e.loaded || 0 === e.total ? 0 : e.loaded / e.total / 2), "bin" == e.fileType && (t = 0 === e.loaded || 0 === e.total ? .5 : .5 + e.loaded / e.total / 2), t = parseInt(100 * t), $("#progress").progressbar("value", t), $("#progress_waku span").text(t + "%"), 100 !== t && dispProgress ? $("#progress_waku").show() : $("#progress_waku").hide()
        }

        function loadError(e) {
            player.view.enableRedraw = !0, toolbar.loadingModel = !1, dispProgress = !1, $("#progress_waku").hide();
            var t = "";
            t += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_MAIN, t += e.url, t += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_DETAIL, t += "errorType: " + e.errorType + "\n", t += "url: " + e.url + "\n", t += "httpStatus: " + e.httpStatus + "\n", t += "message: " + e.message + "\n", t += "stack: " + e.stack + "\n", window.alert(t)
        }

        function loadPartError(e) {
            var t = "[PART]";
            t += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_MAIN, t += e.url, t += XVL_WEB3D_ERR_LOADING_MODEL_FAILURE_DETAIL, t += "errorType: " + e.errorType + "\n", t += "url: " + e.url + "\n", t += "httpStatus: " + e.httpStatus + "\n", t += "message: " + e.message + "\n", t += "stack: " + e.stack + "\n", window.alert(t)
        }

        function loadPartTextureEnd() {
            player.part.view.enableRedraw = !0
        }

        function loadModelPartEnd() {
            0 === player.part.model.numberOfTextures && (player.part.view.enableRedraw = !0), player.part.model.hideAllGroups(), player.part.view.enableRectangleSelection = !0, player.part.view.emptySelectionClear = !0, player.part.view.additionalSelection = "none", player.part.view.viewSelectionTarget = "shape", player.part.view.viewSelectionUnit = "part", $("#web3dPlayer_part").parent().parent().css("height", "100%")
        }

        function loadModel() {
            try {
                player.view.enableRedraw = !1, toolbar.loadingModel = !0, dispProgress = !0, player.loadFile({
                    url: url
                })
            } catch (e) {}
        }

        function createDivComponent(e) {
            var t = $("#" + e),
                a = $('<div id="' + e + '_header"></div>'),
                i = $('<div id="' + e + '_body"></div>');
            t.append(a), t.append(i), createSwitchControl(e), a.css("height", "20px"), a.css("width", t.css("width")), a.css("position", "relative"), i.css("width", t.css("width"));
            try {
                i.css("height", convertInt(t.css("height")) - convertInt(a.css("height")) + "px")
            } catch (e) {}
            i.css("position", "relative"), t.hasClass("drag-drop") && (t.removeClass("drag-drop"), a.addClass("drag-drop"))
        }

        function createSwitchControl(e) {
            var t = $("#" + e + "_header"),
                a = $("#" + e + "_body"),
                i = $('<label class="switch"></label>'),
                r = $('<span class="label"></span>'),
                o = $('<input type="checkbox" checked="checked" />');
            t.append(i), i.append(o), i.append(r), r.append($('<span class="on"></span>')), r.append($('<span class="separator"></span>')), r.append($('<span class="off"></span>'));
            o.on("click", (function() {
                $(this).prop("checked") ? a.show() : (a.hide(), a.parent("div").css("height", "20px"))
            }))
        }
    }()
}]);

function CompanyAjax(PrdNm){
	$.ajax({
		url : "/dots3d/companylist_ajax.php",
		type : "POST",
		data : {"PrdNm":PrdNm},
		dataType: "html",
		async : true,
		success: function(data){
			$("#company_list_part .web3dTbl tbody").html(data);
		}
	});

	ArticleyAjax(PrdNm);
}

function ArticleyAjax(PrdNm){
	$.ajax({
		url : "/dots3d/articlelist_ajax.php",
		type : "POST",
		data : {"PrdNm":PrdNm},
		dataType: "html",
		async : true,
		success: function(data){
			$("#web3d_post .web3dTbl tbody").html(data);
		}
	});		
}

function TreeClick(threedId, threedTitle) {
	var companySeq = $("#companySeq").val();
	var promotinSeq = $("#promotinSeq").val();
	
	// alert("3d 카테고리번호 : " +threedId);
	// alert("3d 카테고리명 : " +threedTitle);


    $("#threedId2").val(threedId);
	$("#threedTitle2").val(threedTitle);
    $("#partUniqueSpec").val(threedTitle);
    $("#partUniqueDrawing").val(threedTitle);
    $("#partUniqueManuel").val(threedTitle);
    $("#partUniqueVideo").val(threedTitle);
    $("#partUniqueTrouble").val(threedTitle);
    $("#partUniqueMemo").val(threedTitle);

    // 사용자 화면 처리 값
    $("#userPartUniqueSpec").val(threedTitle);
    $("#selected_parts_name").text(threedTitle);
    partChange(threedTitle);
    
}

function SupplyIns(){	
	var companySeq = $("#companySeq").val();
	var promotinSeq = $("#promotinSeq").val();
	var threedId = $("#threedId").val();
	var threedTitle = $("#threedTitle").val();

	if(!companySeq) { alert("<?=$lang['dots3d_chk_company_exist']?>"); return; }
	if(!threedId) { alert("<?=$lang['dots3d_select_item_on_bom']?>"); return; }
	
	isAjaxing = true;

	$.ajax({
		url : "/dots3d/suppliers_on_3d_Ins_ajax.php",
		type : "POST",
		data : {"Mode":"Insert", "companySeq":companySeq, "promotinSeq":promotinSeq, "threedId":threedId, "threedTitle":threedTitle},
		dataType : 'json',
		async : true,
		success: function(data){
			if(data.result == "success") {
				isAjaxing = false;
				alert("Your company registered as vendor for selected item.");
				suppliers_on_3d();
			} else if (data.result == "LoginNull")	{
				isAjaxing = false;
				alert(data.resultMsg);
			} else if (data.result == "overlap")	{
				isAjaxing = false;
				alert(data.resultMsg);
			} else if (data.result == "Error")	{
				isAjaxing = false;
				alert(data.resultMsg);
			}
		},
		error: function(request, status, error) {
			isAjaxing = false;
			alert(error);
		}
	});		
}

function suppliers_on_3d() {
	var companySeq = $("#companySeq").val();
	var promotinSeq = $("#promotinSeq").val();
	var threedId = $("#threedId").val();
	var threedTitle = $("#threedTitle").val();
	$.ajax({
		url : "/dots3d/suppliers_on_3d_sel_ajax.php",
		type : "POST",
		data : {"companySeq":companySeq, "promotinSeq":promotinSeq, "threedId":threedId, "threedTitle":threedTitle},
		dataType: "html",
		async : true,
		success: function(data){
			$("#web3d_post .web3dTbl tbody").html(data);
		}
	});
}

function SupplyList(){
	var companySeq = $("#companySeq").val();
	var promotinSeq = $("#promotinSeq").val();
	var threedId = $("#threedId").val();
	var threedTitle = $("#threedTitle").val();

	if(!companySeq) { alert("해당 기업 값이 존재하지 않습니다."); return; }
	if(!threedId) { alert("Please select one of item on BOM list in left BOM tree."); return; }
	
	isAjaxing = true;

	$.ajax({
		url : "/dots3d/_inc_dots3d_suppliersL.php",
		type : "POST",
		data : {"companySeq":companySeq, "promotinSeq":promotinSeq, "threedId":threedId, "threedTitle":threedTitle},
		dataType : 'html',
		async : true,
		success: function(data){
			$(".dots3d-suppliers-list-wrap",  top.document).html(data);
			$(".dots3d-suppliers-list-wrap",  top.document).addClass("on");
		},
		error: function(request, status, error) {
			isAjaxing = false;
			alert(error);
		}
	});		
}

function onloadsize(){
	var windowWidth = $( window ).width();
	if(windowWidth < 1300) {
		$("#web3dPlayer_part input, #assyTree input ").trigger( "click" );
	}
}

$(window).load(function(){
	onloadsize();
});

// 품번이 변경될 때 마다 사양 정보 불러온다.
function partChange( changedPartId ) {
    console.log("품번 변경 실행 ChangedPartId"+changedPartId);
    //alert("품번 변경 : "+changedPartId);
    // 품번의 Aloin
    console.log("제품 변경 시작");
    var modelingId = $("#modeling_id").val();
    var partUniqueSpec = $("#partUniqueSpec").val();
    var partUniqueDrawing = $("#partUniqueDrawing").val();
    var partUniqueManuel = $("#partUniqueManuel").val();
    var partUniqueVideo = $("#partUniqueVideo").val();
    var partUniqueTrouble = $("#partUniqueTrouble").val();
    var partUniqueMemo = $("#partUniqueMemo").val();
    $("#partUniqueSpec").val(partUniqueSpec);
    $("#partUniqueDrawing").val(partUniqueDrawing);
    $("#partUniqueManuel").val(partUniqueManuel);
    $("#partUniqueVideo").val(partUniqueVideo);
    $("#partUniqueTrouble").val(partUniqueTrouble);
    $("#partUniqueMemo").val(partUniqueMemo);
    //var threedId = $("#threedId").val();

   
    // 부품 사양 정보 처리
    $("#part_name").val("");
    $("#part_supplier_id").val("");
    $("#part_supply_price").val("");
    $("#part_sales_price").val("");
    $("#part_manufactured_date").val("");
    $("#part_release_date").val("");
    $("#part_inspection_terms").val("");
    $("#part_last_inspection_date").val("");
    $("#part_next_inspection_date").val("");
    $("#part_expire_date").val("");
    $("#part_spec_kr").val("");
    $("#part_spec_en").val("");

    var partTabIdx = $("#part_popUp_tab_idx").val();
    console.log("탭클릭 ID : "+partTabIdx);
    switch(partTabIdx) {

        case '1' : // 탭 클릭시 사양정보 가져오기
            console.log("부품 사양 탭 클릭");

            isAjaxing = true;
        
            $.ajax({
            	url : "/alink3d_4.1/inc/_getPartsSpec.php",
            	type : "POST",
            	data : {"modelingId":modelingId, "partId":changedPartId, "userMode":$("#userMode").val()},
            	dataType : 'json',
            	async : true,
            	success: function(response){
                    //let json = JSON.parse(response);
                    if(response.result == "success") {
                        var date = new Date();
                        var partId = response.part_id; // 부품 Idx 값\
                        var manufacturedDate = new Date(response.part_manufactured_date);
                        manufacturedDate.setDate(manufacturedDate.getDate()+1);
                        var releaseDate = new Date(response.part_release_date);
                        releaseDate.setDate(releaseDate.getDate()+1);
                        var lastInspectionDate = new Date(response.part_last_inspection_date);
                        lastInspectionDate.setDate(lastInspectionDate.getDate()+1);
                        var nextInspectionDate = new Date(response.part_next_inspection_date);
                        nextInspectionDate.setDate(nextInspectionDate.getDate()+1);
                        var expireDate = new Date(response.part_expire_date);
                        expireDate.setDate(expireDate.getDate()+1)
                        var partName = response.part_name;
                        var supplierId = response.part_supplier_id;
                        var supplyPrice = response.part_supply_price;
                        var salesPrice = response.part_sales_price;
                        // var partSpec_kr = response.part_spec_kr;
        
                        console.log("공급업체 ID"+supplierId);
                        console.log("관리 품명"+partName);
                        // console.log("partSpec : "+partSpec_kr);
                        
                        $("#modeling_id").val(response.modeling_id);
        
                        // 부품 사양 정보 전달
                        $("#part_id_drawing").val(partId);
                        $("#part_name").val(partName);
                        $("#part_supplier_id").val(supplierId);
                        // if (!supplyPrice) {
                        //     $("#part_supply_price").val(supplyPrice.toLocaleString('en-US'));                
                        //     //$("#part_supply_price").val(supplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));                
                        // } else {
                        //     $("#part_supply_price").val("");
                        // }
                        // if (!salesPrice) {
                        //     $("#part_sales_price").val(salesPrice.toLocaleString('en-US'));
                        // }
                       
                        $("#part_supply_price").val(supplyPrice.toLocaleString('en-US'));   
                        $("#part_sales_price").val(salesPrice.toLocaleString('en-US'));
                        
                        //$("#part_sales_price").val(salesPrice.toLocaleString('en-US'));
                        
                        if(response.part_manufactured_date == "0000-00-00 00:00:00"){
                            $("#part_manufactured_date").val('');
                        } else {
                            $("#part_manufactured_date").val(manufacturedDate.toISOString().substring(0, 10));
                        }

                        if(response.part_release_date === "0000-00-00 00:00:00"){
                            $("#part_release_date").val('');
                        } else {
                            $("#part_release_date").val(releaseDate.toISOString().substring(0, 10));
                        }
                        
                        if(response.part_last_inspection_date === "0000-00-00 00:00:00"){
                            $("#part_last_inspection_date").val('');
                        } else {
                            $("#part_last_inspection_date").val(lastInspectionDate.toISOString().substring(0, 10));
                        }

                        if(response.part_next_inspection_date === '0000-00-00 00:00:00'){
                            $("#part_next_inspection_date").val('');
                        } else {
                            $("#part_next_inspection_date").val(nextInspectionDate.toISOString().substring(0, 10));
                        }

                        if(response.part_expire_date === '0000-00-00 00:00:00'){
                            $("#part_expire_date").val('');
                        } else {
                            $("#part_expire_date").val(expireDate.toISOString().substring(0, 10));
                        }

                        $("#part_inspection_terms").val(response.part_inspection_terms);

                        // 관리자 쪽 summernote 출력
                        $('#part_spec_kr').summernote('code', response.part_spec_kr);
                        $('#part_spec_en').summernote('code', response.part_spec_en);
                        // 사용자 쪽 textArea 출력
                        $("#part_spec_kr").val(response.part_spec_kr);
                        // $("#part_spec_en").val(response.part_spec_en);
                        // $("#part_spec").val(response.part_spec);

        
                        // 카다로그 정보 전달을 위한 부품 ID 전달
                        $("#parts_id_manuel").val(partId);
                        $("#parts_id_video").val(partId);
                        $("#parts_id_trouble").val(partId);
                        $("#parts_id_memo").val(partId);
                        $("#selected_parts_name").text(changedPartId);
                        
                        
                    } else if (response.result == "nonExist") {
                        $("#part_id_drawing").val('');
                    }
                    // $(".dots3d-suppliers-list-wrap",  top.document).html(data);
                    // $(".dots3d-suppliers-list-wrap",  top.document).addClass("on");
                    },
                error: function(request, status, error) {
                    isAjaxing = false;
                    alert(error);
                }
            }); break;

        case "2" :
                    
            // 부품 도면 정보 처리 - 현재 tag 안에 있는 모든 tag들 제거는 empty() 함수를 사용
            // $("#file_historyBox").empty();
            console.log("부품 도면 탭 클릭");
        
            isAjaxing = true;
        
            $.ajax({
                type : "GET",
                data :  {"modelingId":modelingId, "changePartId":changedPartId,  "userMode":$("#userMode").val()},
                url : "/alink3d_4.1/inc/_getPartsDrawing.php",
                success : function(res) {
                    let json = JSON.parse(res);
                    $('.file_historyBox').html(json.partDrawings);
                },
                error: function(request, status, error) {
                    isAjaxing = false;
                    alert(error);
                }
            }); break;
            
        case "3" :

            // 품질검사
            // 부품 품질검사 정보 호출
            isAjaxing = true;
           
            $.ajax({
                type : "GET",
                data : {"modelingId":modelingId, "changePartId":changedPartId,  "userMode":$("#userMode").val()},
                url : "/alink3d_4.1/inc/_getPartsInspection.php",
                success : function(res) {
                    let json = JSON.parse(res);
                    $('#partsInspectionList').html(json.partsInspection);
                }
            })
            break;

        case "4" :

            // 부품 메뉴얼 정보 처리 - 기존의 DIV안의 내용을 제거한다.
            //$("#partManuels").val("");
            // $("#partManuels").empty();
        
            isAjaxing = true;
            $.ajax({
                type : "GET",
                data : {"modelingId":modelingId, "changePartId":changedPartId,  "userMode":$("#userMode").val()},
                url : "/alink3d_4.1/inc/_getPartsManuel.php",
                success : function (res) {
                    let json = JSON.parse(res);
                    $(".parts_manuel_kr_box").html(json.partManuelsKr);
                    $(".parts_manuel_en_box").html(json.partManuelsEn);
                },
                error: function(request, status, error) {
                    isAjaxing = false;
                    alert(error);
                }
            }); break;

        case "5" :
            // 관련 영상
            $.ajax({
                type : "GET",
                url : "/alink3d_4.1/inc/_getPartsVideo.php",
                data :  {"modelingId":modelingId, "changePartId":changedPartId,  "userMode":$("#userMode").val()},
                success : function(res){
                    let json = JSON.parse(res);
                    console.log(json);
                    $("#parts_video_kr").html(json.partsVideoKr);
                    $("#parts_video_en").html(json.partsVideoEn);
                }
            })
            break;

        case "6" :

            // 부품 트러블 슈팅 정보 처리 - 기존의 DIV안의 내용을 제거한다.
            // $(".parts_trouble_kr_box .trouble_fileBox").empty();
            // $(".parts_trouble_en_box .trouble_fileBox").empty();
        
            isAjaxing = true;
            console.log("부품 트러블 선택 변경");
            $.ajax({
                url : "/alink3d_4.1/inc/_getPartsTrouble.php",
                type : "POST",
                data : {"modelingId":modelingId, "changePartId":changedPartId, "userMode":$("#userMode").val()},
                async : true,
                success: function(response){
                    let json = JSON.parse(response);
                    console.log("부품 트러블 선택 변경");
                    console.log(json.partsTroubleKr);
                    $(".parts_trouble_kr_box .trouble_fileBox").html(json.partsTroubleKr);
                    $(".parts_trouble_en_box .trouble_fileBox").html(json.partsTroubleEn);
                    
                },
                error: function(request, status, error) {
                    isAjaxing = false;
                    alert(error);
                }
            });
            break;

        case "7" :

            // 부품 메모 정보 가져오기
            var parts_id_memo = $("#parts_id_memo").val();
            var partUniqueMemo = $("#partUniqueMemo").val();
        
            isAjaxing = true;
            console.log("부품 메모 탭 선택");
            $.ajax({
                url : "/alink3d_4.1/inc/_getPartsMemo.php",
                type : "POST",
                data : {"modelingId":modelingId, "parts_id_memo":parts_id_memo, "partUniqueMemo":partUniqueMemo, "userMode":$("#userMode").val()},
                async : true,
                success: function(response){
                    let json = JSON.parse(response);
                    console.log("부품 메모탭 내용 변경");
                    console.log(json.partsMemoList);
                    $("#parts_memo_list").html(json.partsMemoList);
                    
                },
                error: function(request, status, error) {
                    isAjaxing = false;
                    alert(error);
                }
            });
            break;
            
            default : break;
    }

    // 사용자 화면 처리
    var userPartUniqueSpec = $("#userPartUniqueSpec").val();
    $("#userPartUniqueSpec").val(userPartUniqueSpec);

}

// BMC 관련 추가 ------------------------------------------------
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
    const iFrameMsgType_HideList = 20009;

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
            case iFrameMsgType_HideList:
                setHideList(data)
                break;
            default:
                break;
        }
    });
	// 그룹 선택 이벤트
    var clickModel;
    
	function selectChange(event) {

        console.log("선택 변경");
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
        // controller.notify(Parameters);
        console.log(groups)
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

    function setHideList () {
        $("#hideItem").on("click", function () {
            alert("tset");
            var itemId = 'selections-' + clickModel[0].elementId;
            var list = document.getElementById('itemId');
            var item = document.createElement('li');
            item.id = itemId;
            var button = document.createElement('button');
            button.innerText = clickModel[0].elementId;
            button.onclick = function () {
                // 다시 보여줄 것
                var selection = player.model.getGroupsByElementIds([this.innerText]);
                player.model.showGroups(selection);
    
                var removeId = 'selections-' + this.innerText;
                document.getElementById(removeId).remove();
            }
    
            item.appendChild(button);
            list.appendChild(item);
    
            player.model.hideGroups(clickModel);
    
        });
    }

	// 1. 거래처관리
	$("#viewMore_1").on("click", function(){
		$.magnificPopup.open({
			items: {
				src: '#viewMore_1_modal',
				type: 'inline'
			}
		});
	});

	// 2. 공급업체등록
	$("#viewMore_2").on("click", function(){
		$.magnificPopup.open({
			items: {
				src: '#viewMore_2_modal',
				type: 'inline'
			}
		});
	});

	// var mouseX, mouseY;
	// function mousemove(event){
	// 	mouseX = event.clientX;
	// 	mouseY = event.clientY;
	// }
	
	// window.addEventListener('mousemove', mousemove);

	// DB에서 건전부위, 관심부위, 집중부위 목록을 가져와서 배열로 전달
	function changeColorFromCheckResult() {

		// 위치를 알 방법을 찾아야 할 듯
		const hostUrl = $("#server-url", parent.document).val();
        console.log("HOST Url : "+hostUrl);


		//const requestUrl = hostUrl + "/alink3d_4.1/inc/_getProcessColor.php";
        //const requestUrl = hostUrl + "/alink3d_4.1/data/get-3d-modeling-info.php";
        const requestUrl = "/dotsAdmin/alink3d_4.1/inc/_getProcessColor.php";
		//const inspId = $("#insp-master-id", parent.document).val();
        const modelingId = $("#modeling_id").val();

		console.log(requestUrl);
		console.log("모델링 ID : "+modelingId);

		var formData = new FormData();
		formData.append('modelingId', modelingId);

		// 목록 가져오기
		$.ajax({
			url: requestUrl,
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			// async: false,
			success: function (response) {
				console.log(response);
				let json = $.parseJSON(response);
				console.log(json);

				// 건전부위
				if (json.yellow.length > 0) {
					const groups_yellow = player.model.getGroupsByElementIds(json.yellow);
					player.assignColoring(color_yellow, groups_yellow);
				}

				// 관심부위
				if (json.blue.length > 0) {
					const groups_blue = player.model.getGroupsByElementIds(json.blue);
					player.assignColoring(color_blue, groups_blue);
				}

				// 집중부위
				if (json.red.length > 0) {
					const groups_red = player.model.getGroupsByElementIds(json.red);
					player.assignColoring(color_red, groups_red);
				}
			},
			error: function (request, status, error) {
				// 실패시 처리
				console.log("code = " + request.status + " message = " + request.responseText + " error = " + error);
			}
		});
	}

    function changeColorProcessResult() {

        // 색상 관련 변경
        var color_yellow = 0; // #040404
        var color_blue = 1;
        var color_red = 2;

        color_yellow = player.addColoring("#f8a5fb", 0);
        //color_yellow = player.addColoring("#f41933", 0);
		color_blue = player.addColoring("blue", 0);
		color_red = player.addColoring("red", 0);

		// 위치를 알 방법을 찾아야 할 듯
		const hostUrl = $("#server-url", parent.document).val();
        console.log("HOST Url : "+hostUrl);


		//const requestUrl = hostUrl + "/alink3d_4.1/inc/_getProcessColor.php";
        //const requestUrl = hostUrl + "/alink3d_4.1/data/get-3d-modeling-info.php";
        const requestUrl = "/alink3d_4.1/inc/_getProcessColor.php";
		//const inspId = $("#insp-master-id", parent.document).val();
        const modelingId = $("#modeling_id").val();

		console.log(requestUrl);
		console.log("모델링 ID : "+modelingId);

		var formData = new FormData();
		formData.append('modelingId', modelingId);

		// 목록 가져오기
		$.ajax({
			url: requestUrl,
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			// async: false,
			success: function (response) {
				console.log(response);
				let json = $.parseJSON(response);
				console.log(json);

				// 건전부위
				if (json.yellow.length > 0) {
					const groups_yellow = player.model.getGroupsByElementIds(json.yellow);
					player.assignColoring(color_yellow, groups_yellow);
				}

				// 관심부위
				if (json.blue.length > 0) {
					const groups_blue = player.model.getGroupsByElementIds(json.blue);
					player.assignColoring(color_blue, groups_blue);
				}

				// 집중부위
				if (json.red.length > 0) {
					const groups_red = player.model.getGroupsByElementIds(json.red);
					player.assignColoring(color_red, groups_red);
				}
			},
			error: function (request, status, error) {
				// 실패시 처리
				console.log("code = " + request.status + " message = " + request.responseText + " error = " + error);
			}
		});
	}

    function ColorAnalysisProcessResult(selectColor) {

        // 색상 관련 변경
        var color_yellow = 0; // #040404
        var color_blue = 1;
        var color_red = 2;

        color_yellow = player.addColoring(selectColor, 0);
        //color_yellow = player.addColoring("#f41933", 0);
		color_blue = player.addColoring("blue", 0);
		color_red = player.addColoring("red", 0);

		// 위치를 알 방법을 찾아야 할 듯
		const hostUrl = $("#server-url", parent.document).val();
        console.log("HOST Url : "+hostUrl);


		//const requestUrl = hostUrl + "/alink3d_4.1/inc/_getProcessColor.php";
        //const requestUrl = hostUrl + "/alink3d_4.1/data/get-3d-modeling-info.php";
        const requestUrl = "/alink3d_4.1/inc/_getProcessColor.php";
		//const inspId = $("#insp-master-id", parent.document).val();
        const modelingId = $("#modeling_id").val();

		console.log(requestUrl);
		console.log("모델링 ID : "+modelingId);

		var formData = new FormData();
		formData.append('modelingId', modelingId);

		// 목록 가져오기
		$.ajax({
			url: requestUrl,
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			// async: false,
			success: function (response) {
				console.log(response);
				let json = $.parseJSON(response);
				console.log(json);

				// 건전부위
				if (json.yellow.length > 0) {
					const groups_yellow = player.model.getGroupsByElementIds(json.yellow);
					player.assignColoring(color_yellow, groups_yellow);
				}

				// 관심부위
				if (json.blue.length > 0) {
					const groups_blue = player.model.getGroupsByElementIds(json.blue);
					player.assignColoring(color_blue, groups_blue);
				}

				// 집중부위
				if (json.red.length > 0) {
					const groups_red = player.model.getGroupsByElementIds(json.red);
					player.assignColoring(color_red, groups_red);
				}
			},
			error: function (request, status, error) {
				// 실패시 처리
				console.log("code = " + request.status + " message = " + request.responseText + " error = " + error);
			}
		});
	}

	function hiddenItems(){
        if(clickModel==null){
            alert("선택해주세요.");
        }else{

            $(".item-list-btn").addClass("on");
            $(".hide-list").show();
            var itemId = 'selections-' + clickModel[0].elementId;
            var liId = itemId.replaceAll(" ","");
            var list = document.getElementById('itemId');
            var item = document.createElement('li');

            item.id = liId;
            var button = document.createElement('button');
            // button.innerText = clickModel[0].elementId;
            var customBtn = "<i class=\"fa-solid fa-eye-slash\"></i>";
            button.innerHTML = customBtn;
            button.value = clickModel[0].elementId;
            
            button.onclick = function () {
                // 다시 보여줄 것
                // var selection = player.model.getGroupsByElementIds([this.innerText]);
                var selection = player.model.getGroupsByElementIds([this.value]);
                player.model.showGroups(selection);

                // var removeId = 'selections-' + this.innerText;
                var removeId = 'selections-' + this.value;
                var removeLiId = removeId.replaceAll(" ","");
                document.getElementById(removeLiId).remove();
            }            

            item.appendChild(button);
            list.appendChild(item);
            console.log(liId);
            $("#"+liId).append(clickModel[0].elementId);
            // $(document.getElementById('itemId')).append(customBtn);        
            
            player.model.hideGroups(clickModel);
            clickModel = null;
        }
	}

    // 클릭한 id 에서 PDF 가져오기
    // function updatePdf(uId){       
        
    //     $.ajax({
    //         url: "updatePdfP.php",
    //         data:{"uId":uId},
    //         // data : formData,
    //         type : "POST",
    //         async : false,
    //         success: function(data){
    //             let json = JSON.parse(data);
    //             if(json.result == "1") {
    //                 $("#bookList").empty();
    //                 $("#bookList").append(json.loadHtml);
    //             }else if(json.result == "0"){
    //                 $("#bookList").empty();
    //                 $("#bookList").append(json.loadHtml);
    //             } else {
    //                 isAjaxing = false;
    //                 alert("선택오류! 관리자에게 문의해주시기 바랍니다.");
    //                 return;
    //             }
    //         },
    //         error: function(request, status, error) {
    //             isAjaxing = false;
    //             alert(error);
    //         }
    //     })
    // }

    function itemList(){
        $(".hide-list").toggle();
        $(".item-list-btn").toggleClass("on");
    }

	function testAb(){
		self.player.view.setDirection("top");
	}

	function btnWire(){
	   var ds = self.player.view.getDisplaySettings();
        ds.displaySurface = false;
        ds.displayCurveInside = true;
        self.player.view.setDisplaySettings(ds);
	}

	function btnSurface(){
	   var ds = self.player.view.getDisplaySettings();
        ds.displaySurface = true;
        ds.displayCurveInside = false;
        self.player.view.setDisplaySettings(ds);
	}

	function btnWireSurface(){
	   var ds = self.player.view.getDisplaySettings();
        ds.displaySurface = true;
        ds.displayCurveInside = true;
        self.player.view.setDisplaySettings(ds);
	}

//	$(".view-button-box li").on("click",function(){
//		var mode = $(this).data("type");
//		switch (button) {
//			case 'home':
//				self.home();
//				return;	
//		}
//	});