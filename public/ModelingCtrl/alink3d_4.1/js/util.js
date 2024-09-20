/**
 * jQueryオブジェクトの子要素の数を取得します.
 */
var getChildrenCount = function($parent) {
	var childrenCount = 0;
	$parent.children().each(function() {
		childrenCount++;
	});
	return childrenCount;
};

/**
 * ${model}の選択中のユーザーIDを取得します.
 * 
 * @param  model
 * @return 選択中のユーザーID
 */
var getSelectUserIds = function(model) {
	var selectIds = [];
	$.each(model.getSelections(), function(i, group) {
		if (isDisplay(group)) {
			var idGroup = model.getGroupByUniqueId(group.uniqueId);
			if (isDisplay(idGroup)) {
				selectIds[idGroup.userIdBase] = true;
			}
		}
	});
	return selectIds;
};

/**
 * ${model}の選択中のグループIDを取得します.
 * 
 * @param  model
 * @return 選択中のグループID
 */
var getSelectGroupIds = function(model) {
	var selectIds = [];
	$.each(model.getSelections(), function(i, group) {
		if (isDisplay(group)) {
			var idGroup = model.getGroupByUniqueId(group.uniqueId);
			if (isDisplay(idGroup)) {
				selectIds[idGroup.uniqueId] = true;
			}
		}
	});
	return selectIds;
};

/**
 * ピクセル表示をパーセント表示に変換します.
 * <p>パーセント表示のものはそのまま返します</p>
 * 
 * @param  value
 * @param  allSize
 * @return ピクセル値
 */
var pixelToPercent = function(value, allSize) {
	return pixelToPercentInt(value, allSize) + '%';
};

/**
 * ピクセル表示をパーセント表示に変換します.
 * <p>パーセント表示のものは数値にして返します</p>
 * 
 * @param  value
 * @param  allSize
 * @return パーセント値
 */
var pixelToPercentInt = function(value, allSize) {
	if (value.indexOf('%') !== -1) {
		return convertInt(value);
	}
	if (value.indexOf('px') !== -1) {
		return convertInt(value) / convertInt(allSize) * 100;
	}
	return 0;
};

/**
 * パーセント表示をピクセル表示に変換します.
 * <p>ピクセル表示のものはそのまま返します</p>
 * 
 * @param  value
 * @param  allSize
 * @return ピクセル値
 */
var percentToPixel = function(value, allSize) {
	return percentToPixelInt(value, allSize) + 'px';
};

/**
 * パーセント表示をピクセル表示に変換します.
 * <p>ピクセル表示のものは数値にして返します</p>
 * 
 * @param  value
 * @param  allSize
 * @return ピクセル値
 */
var percentToPixelInt = function(value, allSize) {
	if (value.indexOf('px') !== -1) {
		return convertInt(value);
	}
	if (value.indexOf('%') !== -1) {
		return convertInt(allSize) * convertInt(value) / 100;
	}
	return 0;
};

/**
 * ピクセル表示、パーセント表示の値を数値型に変換します.
 * <p>Ex. 123px→123、90%→90</p>
 * 
 * @param  value
 * @return 数値
 */
var convertInt = function(value) {
	return isNaN(value) ? parseFloat(value.replace(/px|\%/g, '')) : value;
};

/**
 * 対象のグループが表示対象かどうか判定します.
 * 
 * @param  group
 * @return Boolean
 */
var isDisplay = function(group) {
	if(group.groupClass !== lt.GROUP_CLASS_NORMAL){
		return false;
	}
	var type = group.groupType;
	return type === lt.GROUP_TYPE_ASSEMBLY || type === lt.GROUP_TYPE_PART || type === lt.GROUP_TYPE_EMPTY || type === lt.GROUP_TYPE_ERRROR;
};