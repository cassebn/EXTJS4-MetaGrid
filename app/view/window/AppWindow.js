Ext.define('pt.view.window.AppWindow', {
	extend: 'Ext.window.Window',
	alias : 'widget.appwindow',
	title: 'Application Window',
	autoHeight: true,
	width: 300,
	layout: 'fit',
	iconCls: 'icon-grid',
	constrain: true,
	maximizable: true,
	resizable: false,
	modal: true,
	actionBtnTxt: 'Submit',
	actionBtnIconCls: 'icon-accept',
	autoShow: true,
	initComponent: function() {
		Ext.apply(this, {
			items: this.buildItems(),
			bbar: {
				xtype: 'toolbar',
				items: [{
					text: 'Reset',
					iconCls: 'icon-refresh-small',
					handler: this.onReset,
					ref: '../resetBtn',
					scope: this
				},{
					xtype: 'tbfill'
				},{
					text: 'Close',
					iconCls: 'icon-cancel',
					handler: this.onClose,
					scope: this
				},{
					xtype: 'tbseparator'
				},{
					text: this.actionBtnTxt,
					iconCls: this.actionBtnIconCls,
					handler: this.onActionBtnOnClick,
					disabled: this.actionBtnDisabled || false,
					ref: '../actionBtn',
					scope: this
				}]
			},
			keys: [{
				key: [10,13],
				fn: function() {
					if (this.form && this.form.getForm().isValid()) {
						this.onActionBtnOnClick();
					}
				},
				scope: this
			}]
		});
		this.callParent();
	},
	buildItems: function() {
		return [];
	},
	onActionBtnOnClick: function() {
		this.el.mask('The "onActionBtnOnClick()" has not been configured yet.');
	},
	onClose: function() {
		this.close();
	},
	onReset: function() {
		this.el.mask('The "onResetBtnOnClick()" has not been configured yet.');
	}
});