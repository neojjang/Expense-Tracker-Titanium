// Initilize SQLite Database
var db = Ti.Database.open('ExpenseTrackerDemo');
db.execute("CREATE TABLE IF NOT EXISTS expenses (expenseID INTEGER PRIMARY KEY, expenseType TEXT, expenseAmount INTEGER, expenseDate TEXT, expenseImageURI TEXT)");

Titanium.UI.setBackgroundColor('#FFF');
var tabGroup = Titanium.UI.createTabGroup();


var win1 = Titanium.UI.createWindow({
	url:'main_windows/expense.js',
    title:'Expense',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'expense.png',
    title:'Expense',
    window:win1
});


var win2 = Titanium.UI.createWindow({
	url:'main_windows/entries.js',
    title:'Entries',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'entries.png',
    title:'Entries',
    window:win2
});
win2.addEventListener('focus', function() { Ti.API.debug('window 2 focus: true'); });

var win3 = Titanium.UI.createWindow({
	url:'main_windows/resetDB.js',
    title:'Reset DB',
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({  
    icon:'resetDB.png',
    title:'Reset DB',
    window:win3
});



tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);


tabGroup.open();