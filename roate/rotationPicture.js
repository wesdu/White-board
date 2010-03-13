var isIE = /*@cc_on!@*/!1;
function rotationPicture(img){
	if (!img) return;
	this._img = typeof img == 'string'?document.getElementById(img):img;
	this.r = 1;
	this.addBtn();
	this.bind();
}
rotationPicture.prototype.addBtn = function(){
	this._rRight = document.createElement('BUTTON');
	this._rRight.setAttribute('id','rRight');
	this._rRight.className = 'rotation';
	if (!isIE){
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		canvas.setAttribute('width',this._img.width);
		canvas.setAttribute('height',this._img.height);
		ctx.drawImage(this._img,0,0);
		this._ghost = this._img;
		this._img.parentNode.replaceChild(canvas,this._img);
		this._img = canvas;
	}
	this._img.parentNode.insertBefore(this._rRight,this._img);
};
rotationPicture.prototype.bind = function(){
	var _this = this;
	if (window.attachEvent){
		this._rRight.attachEvent('onclick',rotation);
	}else{
		this._rRight.addEventListener('click',rotation,false);
	}
	
	function rotation(){
		if (_this.r > 3) _this.r = 0;
		if(isIE){
			_this._img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(Rotation=' + _this.r + ')';
		}else{
			var ctx = _this._img.getContext('2d');
			switch (_this.r){
				case 0:
					_this._img.setAttribute('width',_this._ghost.width);
					_this._img.setAttribute('height',_this._ghost.height);
					ctx.drawImage(_this._ghost,0,0);
					break;
				case 1:
					_this._img.setAttribute('width',_this._ghost.height);
					_this._img.setAttribute('height',_this._ghost.width);
					ctx.rotate(90*Math.PI/180);
					ctx.drawImage(_this._ghost,0,-_this._ghost.height);
					break;
				case 2:
					_this._img.setAttribute('width',_this._ghost.width);
					_this._img.setAttribute('height',_this._ghost.height);
					ctx.rotate(180*Math.PI/180);
					ctx.drawImage(_this._ghost,-_this._ghost.width,-_this._ghost.height);
					break;
				case 3:
					_this._img.setAttribute('width',_this._ghost.height);
					_this._img.setAttribute('height',_this._ghost.width);
					ctx.rotate(270*Math.PI/180);
					ctx.drawImage(_this._ghost,-_this._ghost.width,0);
					break;
			}
		}
		_this.r++;
	}
};