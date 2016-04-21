/**
 * Creation of Elements
 *
 * @author Juan Acuña - Beru
 * @update 21/04/2016
 */

var Elements = function(){
  this._save = [];
  this._element = null;
}

Elements.prototype.new = function ( element ) {
  this._element = document.createElement( element );
}

Elements.prototype.save = function(){
  this._save.push( this._element );
}

Elements.prototype.add = function ( attribute , value ){
  if( attribute && value ) this._element.setAttribute( attribute , value );
  if( attribute && !value ) this._element.innerHTML = attribute;
}

Elements.prototype.addTo = function ( element ){
  element.appendChild( this._element );
}

Elements.prototype.get = function(){
  return this._element;
}

Elements.prototype.getById = function( id ){
  this._element = document.getElementById( id );
}

Elements.prototype.addToSave = function(){
  this._save[ this._save.length-1 ].appendChild( this._element );
}

Elements.prototype.restore = function(){
  this._save.pop();
}
