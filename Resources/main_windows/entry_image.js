var win = Titanium.UI.currentWindow;

var imageView = Titanium.UI.createImageView({
	image: win.entryImage,
	top:10
});
win.add(imageView);

var l = Titanium.UI.createLabel({
	text:'Tap image to return',
	bottom:20,
	width:'auto',
	height:'auto',
	color:'#999'
});
win.add(l);

imageView.addEventListener('click', function(){
	win.close();
});