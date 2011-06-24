/**
 * Ext.ux.Notify
 *
 * @author  Ben Cassel
 * @date    May 12, 2011
 *
 * @class 	Ext.ux.Notify
 * 
 * @original author Edouard Fattal
 * @original date	March 14, 2008
 * @original class 	Ext.ux.Notification
 * 
 * @extends Ext.window.Window
 * 
 * Refactored to work with EXTJS4+
 */
Ext.ux.NotifyMgr = {
	positions: []
};
Ext.define('Ext.ux.Notify', {
	extend: 'Ext.window.Window',
	alias : 'widget.notify',
	title: 'Notify Window',
	autoHeight: true,
	autoShow: true,
	autoDestroy: true,
	width: this.width || 200,
	bodyStyle: this.bodyStyle || "padding: 10px;",
	iconCls: this.iconCls || "icon-info",
	resizable: false,
	plain: false,
	initComponent: function() {
		this.hideDelay = this.hideDelay || 3000;
		if (this.autoDestroy) {
			this.task = new Ext.util.DelayedTask(this.hide, this);
		} else {
			this.closable = true;
		}
		Ext.apply(this, {

		});
		this.callParent();
		this.on('show', this.animShow, this);
	},
	onDestroy: function() {
		Ext.Array.remove(Ext.ux.NotifyMgr.positions,this.pos);
		this.superclass.onDestroy.call(this);
	},
	hide: function() {
		Ext.Array.remove(Ext.ux.NotifyMgr.positions,this.pos);
		this.superclass.onHide.call(this);
	},
	animShow: function() {
		this.pos = 0;
		while (Ext.ux.NotifyMgr.positions.indexOf(this.pos) > -1) {
			this.pos ++;
		}
		Ext.ux.NotifyMgr.positions.push(this.pos);
		this.setSize(this.width, 100);
		this.alignTo(document, "br-br", [0, 60 - ((this.getSize().height + 10) * this.pos)]);
		this.animate({
			to: {
				x: this.getPosition()[0]-20,
				y: this.getPosition()[1]-70
			},
			easing:'easeIn',
			duration: 500,
			listeners: {
				afteranimate: {
					fn: function() {
						this.on('move', function() {
							Ext.Array.remove(Ext.ux.NotifyMgr.positions,this.pos);
							if (this.autoDestroy) {
								this.task.cancel();
							}
						}, this);
						if (this.autoDestroy) {
							this.task.delay(this.hideDelay);
						}
					}
				},
				scope: this
			}
		});
	},
	focus: Ext.emptyFn
});