Ext.define('pt.view.window.AdminWindow', {
	extend: 'Ext.window.Window',
	alias : 'widget.adminwindow',
	title: 'Admin Window',
	height: 600,
	width: 400,
	layout: 'fit',
	iconCls: 'icon-grid',
	constrain: true,
	maximizable: true,
	autoShow: true,
	initComponent: function() {
		Ext.apply(this, {
			items: this.buildItems(),
			bbar: {
				xtype: 'toolbar',
				items: [{
					xtype: 'tbfill'
				},{
					text: 'Close',
					iconCls: 'icon-cancel',
					handler: this.onClose,
					scope: this
				}]
			}
		});
		this.callParent();
	},
	buildItems: function() {
		return [];
	},
	onClose: function() {
		this.close();
	}
});