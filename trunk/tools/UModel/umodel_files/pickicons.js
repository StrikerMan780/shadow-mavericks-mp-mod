function pickicons(state) {
  var expireDate = new Date()
  var expstring=expireDate.setDate(expireDate.getDate()+30)

  document.cookie = "tapestryicons=" + state + "; expires="+expireDate.toGMTString()
}



