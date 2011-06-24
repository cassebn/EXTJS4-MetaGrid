Ext.define('pt.controller.PropertyController', {
	extend: 'Ext.app.Controller',

	stores: ['PropertyStore'],

	models: ['PropertyModel'],

	views: ['grid.PropertyGrid'],

	refs: [{
		ref: 'propertyGrid',
		selector: 'propertygrid' //by alias
	},{
		ref: 'deleteBtn',
		selector: '#deleteBtn'  //by itemId
	}
	],

	init: function() {
		var me = this;
		this.control({
			'propertygrid': {
				selectionchange: this.onSelectChange,
				itemdblclick: this.onUpdate
			},
			'propertygrid button[action=addProperty]': {
				click: this.onAdd
			},
			'propertygrid button[action=deleteProperty]': {
				click: this.onDelete
			}
		});
	},
	onSelectChange: function(selModel, selections) {
		//console.log('onSelectChange', this);
		//console.log('pg', this.getPropertyGrid());
		this.getDeleteBtn().setDisabled(selections.length === 0);
	},
	onDelete: function() {
		var selection = this.getPropertyGrid().getSelectionModel().getSelection()[0];
		if (selection) {
			console.log('delete',selection)
			this.getPropertyStoreStore().remove(selection);
			this.getPropertyStoreStore().sync();  //use if autoSync=false on Store
		}
	},
	onAdd: function() {
		var me = this;
		var rec = Ext.ModelManager.create({
			PRPTY_ID: '0',
			PRPTY_NM: 'New Property',
			PRPTY_OWNR_ID: '',
			PRPTY_VAL_TXT: '',
			PRPTY_DESC: '',
			PRPTY_INIT_VAL_TXT: '',
			PRPTY_ATMTC_LOAD_CD: 'N'
		}, 'pt.model.PropertyModel');

		var win = Ext.widget('appwindow', {
			maximizable: false,
			actionBtnTxt: 'Submit',
			actionBtnIconCls: 'icon-accept',
			iconCls: 'icon-form',
			width: 300,
			buildItems: function() {
				return me.onBuildForm();
			},
			onActionBtnOnClick: function() {
				var form = this.down('form').getForm();
				if (form.isValid()) {
					var rec = form.getRecord();
					var values = form.getValues();
					rec.set(values);
					this.close();
					Ext.data.StoreManager.lookup('PropertyStore').insert(0, rec);
					me.getPropertyStoreStore().sync();
				}
			},
			onReset: function() {
				var frm = Ext.ComponentQuery.query('propertyform')[0];
				me.onResetForm(frm,rec);
			}
		});
		win.down('form').loadRecord(rec);
	},
	onBuildForm: function() {
		var form = Ext.widget('propertyform', {
			listeners: {
				afterrender: function() {
					var grid = Ext.ComponentQuery.query('propertygrid');
					var gridColumns = grid[0].columns;
					for(i=0;i<gridColumns.length;i++) {
						this.add({
							xtype: gridColumns[i].editor?gridColumns[i].editor.xtype:'displayfield',
							store: gridColumns[i].editor?gridColumns[i].editor.store:null,
							fieldLabel:gridColumns[i].renderData.text,
							name:gridColumns[i].dataIndex,
							allowBlank: gridColumns[i].editor?gridColumns[i].editor.allowBlank:true,
							grow: gridColumns[i].editor?gridColumns[i].editor.grow:false,
							formBind: gridColumns[i].editor?gridColumns[i].editor.formBind:false//,
							//multiSelect: gridColumns[i].editor?gridColumns[i].editor.multiSelect:false
						});
					}
				}
			}
		});
		return form;
	},
	onUpdate: function(view, rec, item, index, e) {
		var me = this;
		var win = Ext.widget('appwindow', {
			maximizable: false,
			actionBtnTxt: 'Update',
			actionBtnIconCls: 'icon-accept',
			iconCls: 'icon-form',
			width: 300,
			buildItems: function() {
				return me.onBuildForm();
			},
			onActionBtnOnClick: function() {
				var form = this.down('form').getForm();
				if (form.isValid()) {
					var rec = form.getRecord();
					var values = form.getValues();
					rec.set(values);
					me.getPropertyStoreStore().sync();
					this.close();
				}
			},
			onReset: function() {
				//this.down('form').getForm().reset();
				//this.down('form').getForm().loadRecord(rec);
				var frm = Ext.ComponentQuery.query('propertyform')[0];
				me.onResetForm(frm,rec);
			}
		});
		win.down('form').loadRecord(rec);
	},
	onResetForm: function(frm,rec) {
		// Function receives array and returns a filtered array.
		Ext.ComponentQuery.pseudos.invalid = function(items) {
		    var i = 0, l = items.length, c, result = [];
		    for (; i < l; i++) {
		        if (!(c = items[i]).isValid()) {
		            result.push(c);
		        }
		    }
		    return result;
		};
		//var frm = Ext.ComponentQuery.query('propertyform');
		//frm[0].query('{isValid()}');
		var invalidFields = frm.query('field:invalid');
		Ext.each(invalidFields,function(item){
		    item.clearInvalid();
		});
		frm.loadRecord(rec);
	}
});