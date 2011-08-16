var tabGroup = Titanium.UI.currentTabGroup;
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
var data = [];

tabGroup.addEventListener('focus', function(e){
	// setTimeout() hack since listener does not register w/o it (maybe a Titanium bug)
	setTimeout(function(){
		Ti.API.debug('Did window focus? If so do reload.');

		var db = Ti.Database.open('ExpenseTrackerDemo');
		var rows = db.execute('SELECT * FROM expenses ORDER BY expenseDate DESC');
		db.close();
		Ti.API.debug('row count: '+rows.rowCount);
		
		while (rows.isValidRow()) {
			data.push({
				width: 'auto',
				height: 'auto',
				title:'Type: '+rows.fieldByName('expenseType')+'\nAmount: $'+rows.fieldByName('expenseAmount')+'\nDate: '+rows.fieldByName('expenseDate'),
				rightImage: rows.fieldByName('expenseImageURI')
			});
			rows.next();
		}
		
		// Big problem here as-is. This does not replace the data, only appends.
		tableview.setData(data);

		Ti.API.debug('Data should be reloaded.');
	},10);
});

var tableview = Ti.UI.createTableView({
	data: data
});

win.add(tableview);