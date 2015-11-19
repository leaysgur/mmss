# mmss
My Mp3 S(earch|treaming) Server!

## なにこれ
自分のためのmp3配信サーバー / クライアントです。

- 主にiTunesでmp3をバックアップ
- アーティスト名/アルバム名/アーティスト名 - 曲名.mp3

そんな音源を、いま15,000ファイルくらい(150GBもあった)VPSに貯めてます。
それを、Webから聴けるように。

## 動機
いま現在はSubsonicというストリーミングサーバーのアプリを使ってます。
ただコレが、

- Javaで動いてるのでコレのためだけにJava環境がいる..
- UIいけてない(framesetおばけ)
- モバイルからAPI叩くのは有料
- ログイン機能ついてるけど、URL構造知ってたら音源DLできちゃう(！)

という不満があったので、作ろうかと。

あとは、「TSUTAYAにいる時に、コレが借りたことあるアルバムかどうか調べたい」っていうシーンが多いので、ファイル検索の機能もセットで。

## DEMO

## 機能
- アルバム検索
- ログイン認証(ガワだけ)
- アルバム再生
- リピート再生
- 自動曲送り
- キーボードからのコントロール
- 再生情報の通知
- モバイルでも使える！(最適化してないけど)

## みどころ
### Express v4

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

### Vueify

```html
<style lang="scss">
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

Polymerよりも格段に使いやすかった(個人の感想です)

- styleで`stylus`とか`scss`とか使える
- scriptで`coffee`とか`babel`とかも使える
- 空でも`style`タグ書いたらそれが挿入されちゃうので注意

### 音源を返す / 鳴らす
```javascript
res.set({ 'Content-Type': 'audio/mpeg' });

var readStream = fs.createReadStream(filePath);
readStream.pipe(res);
```

これを、

```javascript
var blob = new window.Blob([res], { type: 'audio/mpeg' });
var objectUrl = window.URL.createObjectURL(blob);

var audio = new Audio(objectUrl);
```

こう。
Web Audio APIなら`createBufferSource`に`decodeAudioData`したものを。

この取り回しの違いが・・・。

### 通知
```javascript
new Notification('これだけで通知が出せる時代');
```

[5分でわかった気になるWeb Notifications API - console.lealog();](http://lealog.hateblo.jp/entry/2015/10/07/105102)

### postMessage
EventEmitterなんて用意しなくてももうコレでいいのでは！速いし！

## 作ってみて
一言でいうと、「みんなiTunesつかおう」です。

### クライアントで頑張ってはいけない
- 物理的にファイルにアクセスできないWeb、しかもAPIベースでやるもんじゃない
- やるならサーバーでがっつりバッチ処理とか交えてスタティックにおれだけのさいきょうの(ry
- そうでなくてもFileSystem x 配列処理 x 増え続けるファイル数 = 死

### バイナリが読めないと何もできない
- 音源ファイルに近くないとUIの表示すらままならない
- というのも、ファイル名からは曲順すらわからない
- 楽曲の情報はID3 tagというmp3の埋め込みデータ(バイナリ)を解析して使う
  - ただjsのライブラリでちゃんと動くのが少ない(ように思えた)
  - Disk numberまで取れるjsの実装は見つけられず
  - 画像も取れるけどこんなものをxhrで送りつけるなんてとんでもない！

### 気になるパフォーマンス
- 最初は15,000ファイルを`fs`でトラバーサルする起動時がパフォーマンスの悩みになると思ってた
- 全然そんなことなかった
- `readFile`してバイナリ解析するほうがよっぽど遅い
- アルバムのデータ(と、それぞれの曲データ)とってくるところが一番遅い
- めっちゃ遅い

### WebでAudio
- このレベルでもHTML Audioだと既に辛い
- けどWeb Audioはそういう用途じゃないのでコレはコレで辛い
- 辛い
