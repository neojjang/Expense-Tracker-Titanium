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
				'font-size': '24px',
				color:'#000',
				title: 'Type: '+rows.fieldByName('expenseType')+'\nAmount: $'+rows.fieldByName('expenseAmount')+'\nDate: '+rows.fieldByName('expenseDate')+'\n'+'Tap to see image',
				entryImage: rows.fieldByName('expenseImageURI'),
				imagePageScript: 'entry_image.js'
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

tableview.addEventListener('click', function(e){
	if (e.rowData.imagePageScript){
		var win = Titanium.UI.createWindow({
			url:e.rowData.imagePageScript,
			entryImage:e.rowData.entryImage,
			title:'Expense Image'
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

win.add(tableview);