var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
var expenseType, expenseAmount, expenseDate, expenseImagePath = null;

var expenseTypeLabel = Ti.UI.createLabel({
	text: 'Expense Type',
	width: 'auto',
	height: 'auto',
	left: 5
});
win.add(expenseTypeLabel);

var expenseTypePicker = Ti.UI.createPicker();

var expenseTypeData = [];
expenseTypeData[0]=Ti.UI.createPickerRow({title:'Food',custom_item:'Food'});
expenseTypeData[1]=Ti.UI.createPickerRow({title:'Gas',custom_item:'Gas'});
expenseTypeData[2]=Ti.UI.createPickerRow({title:'Misc',custom_item:'Misc'});

expenseTypePicker.selectionIndicator = true;
expenseTypePicker.add(expenseTypeData);
win.add(expenseTypePicker);
expenseTypePicker.setSelectedRow(0,0,false);



var expenseAmountLabel = Titanium.UI.createLabel({
	text: 'Expense Amount',
	width: 'auto',
	height: 'auto',
	left: 5
});

win.add(expenseAmountLabel);

var expenseAmountField = Titanium.UI.createTextField({
	width: 'auto',
	height: 'auto',
	left: 5,
	width: 250,
	value: '1.25'
});

win.add(expenseAmountField);



var expenseDateLabel = Ti.UI.createLabel({
	text: 'Expense Date',
	width: 'auto',
	height: 'auto',
	left: 5
});
win.add(expenseDateLabel);

var minDate = new Date();
minDate.setFullYear(2009);
minDate.setMonth(0);
minDate.setDate(1);

var maxDate = new Date();
maxDate.setFullYear(2012);
maxDate.setMonth(11);
maxDate.setDate(31);

var valueDate = new Date();

var datePicker = Ti.UI.createPicker({
	type: Ti.UI.PICKER_TYPE_DATE,
	minDate: minDate,
	maxDate: maxDate,
	value: valueDate
});
datePicker.selectionIndicator = true;
win.add(datePicker);


var expenseImage = Titanium.UI.createButton({
	title:'Capture Expense Image',
	width: 'auto',
	height: 'auto',
	top: 5,
	left: 5
});

expenseImage.addEventListener('click', function(){
	Titanium.Media.showCamera({
		success:function(event){
			expenseImagePath = event.media.nativePath;
		},
		saveToPhotoGallery:true,
		allowEditing:false,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
});
win.add(expenseImage);


var submitExpenseButton = Titanium.UI.createButton({
	title: 'Submit Expense',
	width: 'auto',
	height: 'auto',
	top: 10,
	left: 5
});

submitExpenseButton.addEventListener('click', function(){
	var validateResult, saveResult;
	validateResult = validateExpenseForm();
	if (validateResult === true){
		saveResult = saveExpenseForm();
	}
	if (saveResult === true){
		resetExpenseForm();
	}
});
win.add(submitExpenseButton);

function validateExpenseForm(){
	var validateVar = true;
	expenseAmount = expenseAmountField.value;
	
	if (expenseAmount == ''){
		validateVar = false;
	}
	
	if (validateVar == true && expenseImagePath == null){
		validateVar = false;
	}
	
	if(validateVar == false){
		alert('The form can not be empty and must have an Expense Image set.');
	}
	return validateVar;
}

function saveExpenseForm(){
	var saveVar, saveMsg;
	try {
		expenseType = expenseTypePicker.getSelectedRow(0),
		expenseAmount = expenseAmountField.value,
		expenseDate = datePicker.value;
		var db = Ti.Database.open('ExpenseTrackerDemo');
		db.execute('INSERT INTO expenses (expenseType, expenseAmount, expenseDate, expenseImageURI) values (?, ?, ?, ?)', expenseType, expenseAmount, String.formatDate(expenseDate, 'medium'), expenseImagePath);
		db.close();
		saveVar = true;
		saveMsg = 'Expense has been added.';
	} catch(e) {
		saveVar = false;
		saveMsg = 'Expense has not been added. Error: '+e;
	}
	alert(saveMsg);
	return saveVar;
}

function resetExpenseForm(){
	expenseTypePicker.setSelectedRow(0,0,false);
	expenseAmountField.value = '1.25';
	var valueDate = new Date();
	datePicker.value = valueDate;
	expenseImagePath = null;
}