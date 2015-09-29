var milkcocoa = new MilkCocoa("iceif4m398g.mlkcca.com");
var messageDataStore = milkcocoa.dataStore("hogehoge");

$(function(){
  messageDataStore.on('push', function(pushed) {
    $('#output').text(pushed.value.content);
    console.dir(pushed);
  });
});
