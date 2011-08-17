var tabGroup = Titanium.UI.currentTabGroup;
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
var data = [];

// Big thanks to Martin Slater and Aaron Saunders for helping out with the code for the listener.
// http://developer.appcelerator.com/question/124302/reload-sqlite-db-on-every-tab-view
tabGroup.addEventListener('focus', function(e){
	// setTimeout() hack since listener does not run w/o it (maybe a Titanium bug)
	setTimeout(function(){
		var db = Ti.Database.open('ExpenseTrackerDemo');
		var rows = db.execute('SELECT * FROM expenses ORDER BY expenseDate DESC');
		data = [];
		while (rows.isValidRow()) {
			data.push({
				width: 'auto',
				height: 'auto',
				title:'Type: '+rows.fieldByName('expenseType')+'\nAmount: $'+rows.fieldByName('expenseAmount')+'\nDate: '+rows.fieldByName('expenseDate'),
				rightImage: rows.fieldByName('expenseImageURI')
			});
			rows.next();
		}
		rows.close();
		db.close();
		
		tableview.setData(data);
	},10);
});

var tableview = Ti.UI.createTableView({
	data: data
});

win.add(tableview);