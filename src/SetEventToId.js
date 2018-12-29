function setEventToId() {

}

setEventToId.prototype.setEvent = function(id, event) {
  const item = document.getElementById(id);
  item.addEventListener("click", event)
}

export default setEventToId