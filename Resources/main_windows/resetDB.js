var tabGroup = Titanium.UI.currentTabGroup;
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';

var resetDBButton = Titanium.UI.createButton({
	title: 'Reset Database',
	font: {
		fontSize: 32,
		fontWeight: 'bold'
	},
	width: 'auto',
	height: 'auto',
	top: 10,
	left: 5
});

resetDBButton.addEventListener('click', function(){
	var db = Ti.Database.open('ExpenseTrackerDemo');
	db.execute('DROP TABLE IF EXISTS expenses');
	db.execute("CREATE TABLE IF NOT EXISTS expenses (expenseID INTEGER PRIMARY KEY, expenseType TEXT, expenseAmount INTEGER, expenseDate TEXT, expenseImageURI TEXT)");
	db.close();
	alert('Database has been reset.');
	tabGroup.setActiveTab(0);
});
win.add(resetDBButton);