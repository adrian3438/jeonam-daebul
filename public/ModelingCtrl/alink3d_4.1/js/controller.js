/**
 * コントローラクラスです.
 */
Controller = function() {
	'use strict';
	/** コントローラオブジェクト. */
	var self = this;
	/** 更新中フラグ. */
	this.isUpdate = false;
	/** 更新通知対象オブジェクト. */
	this.objects = [];

	/**
	 * 各オブジェクトに対する更新通知を行います.
	 * 
	 * @param params
	 * @param ignore
	 */
	this.notify = function(params, ignore) {
		if (this.isUpdate && !ignore) {
			return;
		}
		this.isUpdate = true;
		$.each(this.objects, function(i, obj) {
			if (obj) {
				obj.update(params);
			}
		});
		this.isUpdate = false;
	};

	/**
	 * 更新通知対象オブジェクトに登録します.
	 * 
	 * @param obj
	 *            更新通知対象オブジェクト
	 */
	this.regist = function(obj) {
		this.objects.push(obj);
	};
};