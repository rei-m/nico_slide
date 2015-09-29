var milkcocoa = new MilkCocoa("iceif4m398g.mlkcca.com");
var messageDataStore = milkcocoa.dataStore("hogehoge");

$(function(){
  $('#send').on('click', function(e){
    messageDataStore.push({title : "title", content : "content"});
    alert("おくったよ");
  });
});
