Ext.define('pt.view.form.PropertyForm', {
	extend: 'Ext.form.Panel',
	alias : 'widget.propertyform',
	autoHeight: true,
	width: 300,
	iconCls: 'icon-form',
	padding: '5 10 5 10',
	style: 'background-color: #fff;',
    border: false,
    fieldDefaults: {
        msgTarget: 'side',
        anchor: '100%'
    },
    defaults: {
        flex: 1,
        layout: 'anchor'
    },
	initComponent: function() {
		Ext.apply(this, {
			items: this.buildItems()
		});
		this.callParent();
	},
	buildItems: function() {
		return [];
	}
});