$(function(){

  /**
   * コメント投稿用VueModel
   */
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

      /**
       * 投稿ボタン押下時
       */
      onSend: function(e){
        messageDataStore.send({
          content: this.comment,
          size: this.size,
          color: this.color,
          speed: this.speed,
          type: 'text'
        });
      },

      /**
       * 質問投稿ボタン押下時
       */
      onSendQuestion: function(e){
        messageDataStore.push({
          content: this.comment,
          size: this.size,
          color: this.color,
          speed: this.speed,
          type: 'question'
        });
      },

      /**
       * LGTMボタン押下時
       */
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

      /**
       * いいねボタン押下時
       */
      onSendFeelGood: function(e) {
        messageDataStore.send({
          content: './image/iineppoi.png',
          speed: 10,
          size: '50',
          type: 'image'
        });
      },

      /**
       * なるほどボタン押下時
       */
      onSendISee: function(e) {
        messageDataStore.send({
          content: 'φ(・ω・ ) < なるほど !',
          speed: 10,
          size: '36px',
          color: '#f59200',
          type: 'text'
        });
      },

      /**
       * わからんボタン押下時
       */
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

  /**
   * 質問一覧VueModel
   */
  var questionVM = new Vue({
    el: '#question_list',
    data: {
      questions: []
    },
    created: function() {

      // 画面表示時に投稿済の質問の一覧を取得してすべて表示する
      messageDataStore.stream().next(function(err, data) {
        data.map(function(v) {
          questionVM.questions.push({
            text: v.value.content,
            time: formatDateToString(new Date(v.timestamp))
          });
        });
      });
    }
  });

  /**
   * 質問投稿時のイベントハンドラ
   */
  messageDataStore.on('push', function(pushed) {

    // 質問の投稿を受け取ったら一覧に追加表示する
    questionVM.questions.push({
      text: pushed.value.content,
      time: formatDateToString(new Date(pushed.timestamp))
    });
  });

  /**
   * 日付をyyyyMMdd HH:mm:ss の形式に変換する
   *
   * @param  {object} date Dateオブジェクト
   * @return {string}      フォーマット後の文字列
   */
  var formatDateToString = function(date) {
    return date.getFullYear() + '/' +
          ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
          ('0' + date.getDate()).slice(-2) + ' ' +
          ('0' + date.getHours()).slice(-2) + ':' +
          ('0' + date.getMinutes()).slice(-2) + ':' +
          ('0' + date.getSeconds()).slice(-2);
  };
});
