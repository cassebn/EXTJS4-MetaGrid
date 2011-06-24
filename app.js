Ext.Loader.setConfig({
    enabled: true,
    paths: {
		'Ext.ux': 'app/ux'
	}
});
  
Ext.application({
	name: 'pt',
	appFolder: 'app',

	controllers: [
		'PropertyController'
	],
	
	requires: [
        'Ext.layout.*',
  		'Ext.form.*',
  		'Ext.window.*',
  		'Ext.grid.*',
  		'pt.view.window.AdminWindow'
    ],
    
	launch: function() {
		Ext.create('Ext.container.Viewport', {
			itemId: 'app-viewport',
			layout: 'fit',
			items: [{
				xtype:'adminwindow',
				height: 400,
				width: 700,
				buildItems: function() {
					return {
						xtype: 'propertygrid'
					}
				}
			}]
		});
	}
});