var win = Titanium.UI.currentWindow;

var f = Ti.Filesystem.getFile(win.entryImage);

// Big thanks to Matthew Apperson for helping out with the code for the image view.
// https://gist.github.com/1220705
var imageView = Titanium.UI.createImageView({
	image: f,
	width:450,
	height:338,
	top:10
});
win.add(imageView);

var l = Titanium.UI.createLabel({
	text:'Tap image to return',
	font: {
		fontSize: 32,
		fontWeight: 'bold'
	},
	color:'#999',
	bottom:20,
	width:'auto',
	height:'auto'
});
win.add(l);

imageView.addEventListener('click', function(){
	win.close();
});