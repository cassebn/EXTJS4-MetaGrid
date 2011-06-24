Ext.define('pt.view.grid.PropertyGrid' , {
	extend: 'Ext.grid.Panel',
	alias : 'widget.propertygrid',
	store: 'PropertyStore',
	
	requires: [
		'pt.view.window.AppWindow',
		'pt.view.form.PropertyForm'
	],
	
	initComponent: function() {
		Ext.apply(this, {
			frame: false,
			border: false,
			selType: 'rowmodel',
			viewConfig: {
	            stripeRows: true
	       },
			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					iconCls: 'icon-add',
					text: 'Add',
					itemId: 'addBtn',
					action: 'addProperty'
				},{
					iconCls: 'icon-delete',
					text: 'Delete',
					disabled: true,
					itemId: 'deleteBtn',
					action: 'deleteProperty'
				}]
			}],
			columns: []
		});
		this.callParent();
	}
});