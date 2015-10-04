$(function(){

  var formVM = new Vue({
    el: '#comment_form',
    data: {
      comment: '',
      size: '36px',
      color: '#000000',
      speed: 10
    },

    created: function(){
      this.comment = '（´・ω・｀）< 押してみそ';
    },

    methods:{

      onSend: function(e){
        messageDataStore.send({
          content: this.comment,
          size: this.size,
          color: this.color,
          speed: this.speed,
          type: 'text'
        });
      },

      onSendQuestion: function(e){
        messageDataStore.push({
          content: this.comment,
          size: this.size,
          color: this.color,
          speed: this.speed,
          type: 'question'
        });
      },

      onSendLgtm: function(e){
        $.ajax({
          url: "http://lgtm.in/g"
        }).done(function(data){
          var lgtmUrl = data.match(/(<input type="text" value=.+ class="form-control" id="imageUrl" name="imageUrl">)/);
          if (0 < lgtmUrl.length) {
            var url = lgtmUrl[0]
                        .replace(/^(<input type="text" value=")/, '')
                        .replace(/(" class="form-control" id="imageUrl" name="imageUrl">)$/, '');

            messageDataStore.send({
              content: url,
              speed: 10,
              size: '150',
              type: 'image'
            });
          } else {
            alert('画像がとれなかったよ・・・');
          }
        }).fail(function(data){
          alert('つながらないよ・・・');
        });
      },

      onSendFeelGood: function(e) {
        messageDataStore.send({
          content: './image/iineppoi.png',
          speed: 10,
          size: '50',
          type: 'image'
        });
      },
      onSendISee: function(e) {
        messageDataStore.send({
          content: 'φ(・ω・ ) < なるほど !',
          speed: 10,
          size: '36px',
          color: '#f59200',
          type: 'text'
        });
      },
      onSendCantUnderstand: function(e) {
        messageDataStore.send({
          content: '( ﾟДﾟ) < なるほど、まったくわからん',
          speed: 10,
          size: '36px',
          color: '#9525a8',
          type: 'text'
        });
      }
    }
  });

  var questionVM = new Vue({
    el: '#question_list',
    data: {
      questions: []
    },
    created: function(){
      messageDataStore.stream().next(function(err, data) {
        data.map(function(v) {
          var sendDate = new Date(v.timestamp);
          questionVM.questions.push({
            text: v.value.content,
            time: sendDate.getFullYear() + '/' +
                  ('0' + (sendDate.getMonth() + 1)).slice(-2) + '/' +
                  ('0' + sendDate.getDate()).slice(-2) + ' ' +
                  ('0' + sendDate.getHours()).slice(-2) + ':' +
                  ('0' + sendDate.getMinutes()).slice(-2) + ':' +
                  ('0' + sendDate.getSeconds()).slice(-2)
          });
        });
      });
    }
  });

  messageDataStore.on('push', function(pushed) {

    var sendDate = new Date(pushed.timestamp);

    questionVM.questions.push({
      text: pushed.value.content,
      time: sendDate.getFullYear() + '/' +
            ('0' + (sendDate.getMonth() + 1)).slice(-2) + '/' +
            ('0' + sendDate.getDate()).slice(-2) + ' ' +
            ('0' + sendDate.getHours()).slice(-2) + ':' +
            ('0' + sendDate.getMinutes()).slice(-2) + ':' +
            ('0' + sendDate.getSeconds()).slice(-2)
    });
  });
});
