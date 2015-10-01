$(function(){

  var vueModel = new Vue({
    el: '#comment_form',
    data: {
      comment: '',
      size: '',
      color: '',
      type: ''
    },

    created: function(){
      this.comment = '（´・ω・｀）< まあ、押してみそ';
    },

    methods:{

      onSend: function(e){
         messageDataStore.push({content: this.comment, type: 'text'});
      },

      onSendLgtm: function(e){
        $.ajax({
          url: "http://lgtm.in/g"
        }).done(function(data){
          var lgtmUrl = data.match(/(<.+ class="form-control" id="imageUrl" name="imageUrl">)/);
          if (0 < lgtmUrl.length) {
            var url = lgtmUrl[0]
                        .replace(/^(<input type="text" value=")/, '')
                        .replace(/(" class="form-control" id="imageUrl" name="imageUrl">)$/, '');

            messageDataStore.push({content: url, type: 'image'});
          } else {
            alert('画像がとれなかったよ・・・');
          }
        }).fail(function(data){
          alert('つながらないよ・・・');
        });
      }
    }
  });

});
