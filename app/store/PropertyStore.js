Ext.define('pt.store.PropertyStore', {
    extend: 'Ext.data.Store',
    model: 'pt.model.PropertyModel',
    autoLoad: true,
    autoDestroy: true,
    requires: [
    	'Ext.ux.Notify'
    ],
    proxy: {
        type: 'ajax',
        api: {
            create: 'data/createProperty.json',
            read: 'data/property.json',
            update: 'data/updateProperty.json',
            destroy: 'data/deleteProperty.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'PRPTY_ID',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'data'
        },
        sorters: [{
            property: 'PRPTY_OWNR_ID',
            direction: 'ASC'
        }]
    },
    listeners: {
        write: function(proxy, operation){
            if (operation.action == 'destroy') {
                //do something
            }
            Ext.widget('notify',{
			    title:Ext.util.Format.uppercase(operation.action),
			    html: operation.resultSet.message
			});
        },
        load: function(){
			var arr = this.proxy.reader.jsonData.columns;
			var grid = Ext.ComponentQuery.query('propertygrid')[0];
			grid.reconfigure(this,arr);
        }
    }
});


