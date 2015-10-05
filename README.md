# mmss
My Music Streaming Server!

## TODO
### 今日
- [ ] 見た目を全力で取り繕う

### 明日
- [ ] 見た目残り
- [ ] このREADMEをプレゼンできるように


## なにこれ
自分のための音楽配信サーバーです。
ディレクトリ構成やファイル名やら拡張子やら、すべて自分専用です。

- 主にiTunesでmp3をバックアップ
- アーティスト名/アルバム名/アーティスト名 - 曲名.mp3

そんな音源を、いま15,000ファイルくらい(150GBくらい)VPSに貯めてます。

## 動機
いま現在はSubsonicというストリーミングサーバーのアプリを使ってます。
ただコレが、

- Javaで動いてるのでコレのためだけにJava環境..
- 昔は日本語に弱くて文字化けがひどく、今も一部残り続けてる
- UIいけてない(framesetおばけ)
- モバイルからAPI叩くのは有料
- ログイン機能ついてるけど、URL構造知ってたら音源DLできちゃう

という不満があり、なら作るか！と。

あとは、「TSUTAYAにいる時に、コレが借りたことあるアルバムかどうか調べたい」っていうシーンが多いので、ファイル検索の機能もセットで。

## DEMO
[URL](#)

## 使ったもの
- Express v4

ルーター・コントローラーまわりの書きやすさUP！
```javascript
// ページを返す
app.use('/',    require('routes/index'));
// APIで叩く
app.use('/api', require('routes/api'));

// ログイン後だけ通るやつ
app.use('/',    middleware.isLogin,    require('routes/auth/index'));
app.use('/api', middleware.isLoginAPI, require('routes/auth/api'));
```

- Vueify

```html
<style>
  p { color: navy; }
</style>

<template>
  <p>
    {{msg}} world!
  </p>
</template>

<script>
  module.exports = {
    data: function() {
      return { msg: 'Hello' };
    }
  };
</script>
```

またこのパターン。
ただしPolymerよりも格段に使いやすかった(個人の感想です)

## 作ってみて
一言でいうと、「iTunesは神！」

### クライアントで頑張ってはいけない
- 物理的にファイルにアクセスできないWebで、APIベースでやるもんじゃない
- やるならサーバーでがっつりバッチ処理とか交えてスタティックにおれだけのさいきょうの(ry
- FileSystem x 配列処理 x 増え続けるファイル数 = 死

### バイナリが読めない
- ファイル名からは曲順すらわからん
- 楽曲の情報はID3 tagというmp3の埋め込みデータ(バイナリ)を解析して使う
  - ただjsのライブラリでちゃんと動くのが少ない(ように思えた)
  - Disk numberまで取れるjsの実装がない
  - 画像も取れるけどこんなものをxhrで送りつけるなんてとんでもない！

### NotificationsAPI
- ブログかいたよ
