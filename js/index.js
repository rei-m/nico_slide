document.addEventListener("DOMContentLoaded", function(event) {

  var commentArea = document.getElementById('main-slide');

  // コメント追加時のObserverを作成
  var mo = new MutationObserver(function(mutationRecords){

    // Element削除時は何もしない
    if(mutationRecords[0].addedNodes.length === 0) {
      return;
    }

    // commentAreaに追加されたcommentを取得
    var el = mutationRecords[0].addedNodes[0];

    // 初期表示時の位置とアニメーションのスタイルを設定
    el.style.right = '-' + el.offsetWidth + 'px';
    el.style.top = Math.floor( Math.random() * 90 ) + '%';
    el.style.webkitTransform = 'translate(-' + (commentArea.offsetWidth * 2) + 'px, 0px)';
    el.style.webkitTransitionDuration = el.speed + 's';
    el.style.zIndex = 9999;

    // アニメーションが終わったら消す
    setTimeout(function() {
      commentArea.removeChild(el);
    }, el.speed * 1000);

  });

  // コメント表示領域の監視を開始。
  mo.observe(commentArea, {childList:true, attributes: false, attributeOldValue: false});

  // MilkCocoaからコメントを受け取った時のコールバック
  var onReceiveMessage = function(pushed) {

    // コメントを表示するElementを作成
    var el = document.createElement('div');
    el.className = 'comment';

    var values = pushed.value;

    if(values.type === 'image' || values.content.toLowerCase().search(/^((http|https):\/\/.+(\.jpg|\.gif|\.png))/) === 0) {
      var image = new Image(values.size);
      image.onload = function(e){
        el.speed = values.speed;
        el.appendChild(this);
        commentArea.appendChild(el);
      };
      image.src = values.content;
    } else {
      el.innerHTML = values.content
        .split('\n')
        .map(function(v) {
          return escapeHtml(v);
        })
        .join('<br />');
      el.style.color = values.color;
      el.style['font-size'] = values.size;
      el.speed = values.speed;
      commentArea.appendChild(el);
    }
  };

  messageDataStore.on('send', onReceiveMessage);
  messageDataStore.on('push', onReceiveMessage);

  // HTMLエスケープ用
  var escapeHtml = function(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
  };

});
