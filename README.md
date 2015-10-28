Nico Slide
========

リスナーがコメントをニコ動っぽく投稿しながらわいわいLTできるフレームワークです。

## Sample
- [Slide](http://rei-m.github.io/nico_slide/)
- [Comment](http://rei-m.github.io/nico_slide/comment/)

## Usage
- `/comment/index.html`からコメントを投稿すると、ブラウザで開かれている`index.html` にコメントが流れます。
- コメントはBaas上に保存されませんが、`質問を投稿する`ボタンで投稿した場合のみBaas上に保存されて後から見返すことができます。

## Install
1. コメントの送受信はBaasの`Milkcocoa`を使っていますので[こちら](https://mlkcca.com)からアカウントを作成してください。

2. `Milkcocoa`上でアプリケーションを作成してAPIキーを取得してください。アップするサーバーのドメインがわかっているのであればクライアントの設定からドメインの制限をしておいたほうがよいでしょう。

3. APIキーを`js/lib/dataStore.js`に組み込んでください。また、同ファイル内のdatastore名も合わせて設定してください。

4. `index.html`を開いてスライドを編集してください

5. Webサーバーにアップして`/index.html`と`/comment/index.html`を開いてください。`/comment/index.html`からコメントを投稿して、`/index.html`にコメントが流れれば準備完了です。

## Licence

[MIT](https://github.com/rei-m/magic_bot/blob/master/LICENCE.txt)

## Author

[rei-m](https://github.com/rei-m)
