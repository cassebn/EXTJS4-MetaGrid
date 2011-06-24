
Ext.JSON.encodeDate = function(d)  {
    //return d.format('"Y-m-d H:i:s.u"');
	return d.format('"m/d/Y"');
};

//Maximize window override to make sure window doesn't take 100% of screen real estate
Ext.override(Ext.Window, {
	maximize : function(){
	    if(!this.maximized){
	        this.expand(false);
	        this.restoreSize = this.getSize();
	        this.restorePos = this.getPosition(true);
	        if (this.maximizable){
	            this.tools.maximize.hide();
	            this.tools.restore.show();
	        }
	        this.maximized = true;
	        
	        if(this.collapsible){
	            this.tools.toggle.hide();
	        }

	        this.setPosition(20,20);
	        
	        this.setSize(Ext.ComponentQuery.query('#app-viewport')[0].getWidth()-50, Ext.ComponentQuery.query('#app-viewport')[0].getHeight()-50);
	        
	        this.fireEvent('maximize', this);
	    }
	    return this;
	}
});

Ext.override(Ext.form.field.ComboBox, {
	trigger1Cls:Ext.baseCSSPrefix+"form-clear-trigger",
    trigger2Cls:Ext.baseCSSPrefix+"form-arrow-trigger",
    onTrigger2Click:function(){
        var me=this;
        if(!me.readOnly&&!me.disabled){
            if(me.isExpanded){me.collapse();}
            else{
                me.onFocus({});
                if(me.triggerAction==="all"){me.doQuery(me.allQuery,true);}
                else{me.doQuery(me.getRawValue());}
            }
            me.inputEl.focus();
        }
    },
    onTrigger1Click:function(){
    	var me=this;
    	me.clearValue();
    }
	
});

