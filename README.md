# OIC2025-Front04
# JavaScriptで作る！インタラクティブメニュー実装ガイド

このドキュメントは、JavaScriptの学習者向けに、Webサイトでよく使われる「ハンバーガーメニュー」と「サイドメニュー」の実装方法を、手順を追いながら学べるように構成されています。

## 1. この課題で完成するもの

この課題を最後まで進めると、以下のような2種類の動くメニューを持ったWebページが完成します。

**完成形の動作**

* **サイドメニュー（PC表示）**
    画面の左端にマウスカーソルを合わせると、左からサイドメニューがスライドして表示されます。メニューが表示されている間は、メインコンテンツが右にずれます。マウスカーソルをサイドメニューから外すと、メニューは自動的に隠れます。
* **ハンバーガーメニュー（スマホ・タブレット表示）**
    画面の幅が狭くなると、ヘッダーのナビゲーションメニューが消え、代わりに右上にハンバーガーアイコン（三本線のアイコン）が表示されます。ハンバーガーアイコンをクリックすると、上から下にナビゲーションメニューがスライドして表示されます。もう一度アイコンをクリックすると、メニューはスライドして隠れます。

## 2. 開発のステップ

HTMLで骨組みを作り、CSSで見た目を整え、JavaScriptで動きをつける、という流れで開発を進めていきましょう。各ステップは「課題→ヒント→解法」の順で構成されているので、まずはヒントを元に自分で考えて実装してみましょう。

### ステップ1: HTMLでページの骨組みを作る

まずは、Webページのコンテンツの土台となるHTMLを記述します。

**【課題1】**
ヘッダー、ナビゲーションメニュー、ハンバーガーメニューのアイコン、サイドメニュー、メインコンテンツの各要素をHTMLで配置してください。

**【考え方のヒント】**

* ヘッダーやナビゲーションにはどんなHTMLタグが適切でしょうか？（`<header>`, `<nav>`, `<ul>`, `<li>`など）
* ハンバーガーアイコンは、`<div>`タグを3つ重ねることで表現できます。
* 後でJavaScriptやCSSから操作しやすいように、特定の要素には`id`や`class`属性で名前を付けておきましょう。例えば、ハンバーガーアイコンには`menu-toggle`、ナビゲーションメニューには`nav-links`、サイドメニューには`sidebar`といった名前を付けます。

**【解法】**
以下はHTMLの解答例です。各要素がどのような役割を持っているか確認しましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamburger and Side Menu</title>
    <!-- CSSファイルを読み込む -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- サイドメニューエリア -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-content">
            <h3>サイドメニュー</h3>
            <ul>
                <li><a href="#">プロフィール</a></li>
                <li><a href="#">設定</a></li>
                <li><a href="#">ログアウト</a></li>
            </ul>
        </div>
    </div>

    <!-- ヘッダーエリア -->
    <header>
        <nav>
            <!-- ハンバーガーメニューアイコン -->
            <div class="menu-toggle" id="menu-toggle">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <!-- ナビゲーションリンク -->
            <ul class="nav-links" id="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- メインコンテンツエリア -->
    <main>
        <h1>ようこそ！</h1>
        <p>画面の左端にマウスカーソルを合わせると、サイドメニューが開きます。</p>
        <p>画面幅が狭いときは、右上のハンバーガーアイコンをクリックするとナビゲーションメニューが開閉します。</p>
    </main>

    <!-- JavaScriptファイルはbodyの最後に読み込むのが一般的 -->
    <script src="app.js"></script>
</body>
</html>
```

### ステップ2: CSSで見た目をデザインする

次に、HTMLで作った骨組みにCSSでスタイルを適用し、見た目を整えていきます。

**【課題2】**

* PCで表示したときの基本的なレイアウト（ヘッダー、ナビゲーション）を作成してください。
* サイドメニューを、最初は画面の外に隠しておき、`open`というクラスが付いたときに表示されるように設定してください。開閉時にアニメーションも付けましょう。
* 画面幅が768px以下になったら、PC用のナビゲーションメニューを隠し、ハンバーガーアイコンを表示させるように設定してください。

**【考え方のヒント】**

* **サイドメニュー**: 画面の左側に常に固定するには`position: fixed;`を使います。最初は見えないようにするには`width: 0;`が便利です。幅が変わるときに滑らかなアニメーションを付けるには`transition`プロパティを使います。
* **レスポンシブ対応**: 画面幅に応じてスタイルを切り替えるには、メディアクエリ`@media (max-width: 768px) { ... }`を使います。要素の表示・非表示は`display: none;`や`display: flex;`で切り替えます。
* **ハンバーガーメニュー（開閉時）**: クリックで開閉するメニューは、`max-height`を0からコンテンツの高さまで変化させることで、スライドダウンするようなアニメーションが実現できます。`transition`プロパティを`max-height`に設定しておきましょう。

**【解法】**
以下はCSSの解答例です。PC表示、サイドメニュー、レスポンシブ対応（メディアクエリ）の3つのブロックに分かれています。

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    /* サイドメニュー表示時にメインコンテンツが動くアニメーション */
    transition: margin-left .5s; 
}

/* --- ヘッダーとナビゲーション（PC） --- */
header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    position: relative;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* ハンバーガーメニューアイコン（PCでは非表示） */
.menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.menu-toggle .bar {
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 4px 0;
}

/* ナビゲーションリンク（PC） */
.nav-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.nav-links li {
    margin: 0 15px;
}

.nav-links a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
}

/* --- メインコンテンツ --- */
main {
    padding: 20px;
    /* サイドメニューで押し出すアニメーション */
    transition: margin-left .5s; 
}

/* --- サイドメニュー --- */
.sidebar {
    height: 100%;
    width: 0; /* 初期状態では非表示（幅を0にする） */
    position: fixed; /* 画面に固定 */
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden; /* 横方向にはみ出したコンテンツを隠す */
    transition: 0.5s; /* 幅が変わるアニメーション */
    padding-top: 60px;
    color: white;
}

/* JavaScriptによってこのクラスが付くと、サイドメニューが開く */
.sidebar.open {
    width: 250px; /* 開いたときの幅 */
}

.sidebar-content {
    padding: 8px 8px 8px 32px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar a {
    padding: 8px 0;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidebar a:hover {
    color: #f1f1f1;
}

/* --- メディアクエリ（レスポンシブ対応） --- */
@media (max-width: 768px) {
    /* ハンバーガーアイコンを表示 */
    .menu-toggle {
        display: flex; 
    }

    /* PC用のナビゲーションリンクを非表示にする準備 */
    .nav-links {
        position: absolute;
        top: 60px; /* ヘッダーの下に配置 */
        left: 0;
        width: 100%;
        flex-direction: column;
        background-color: #333;
        text-align: center;
        
        /* スライドアニメーションの初期設定 */
        max-height: 0; /* 最初は高さを0にして隠す */
        overflow: hidden; /* はみ出したコンテンツを隠す */
        transition: max-height 0.4s ease-in-out; /* 高さが変わるアニメーション */
    }

    /* JavaScriptによってこのクラスが付くと、メニューが開く */
    .nav-links.active {
       /* JavaScript側でmax-heightが設定されるため、CSSでの記述は不要 */
    }

    .nav-links li {
        margin: 15px 0;
    }
}
```

### ステップ3: JavaScriptでメニューを動かす

最後に、JavaScriptを使ってユーザーの操作（クリックやマウス移動）に応じてCSSのクラスを付け外しし、メニューを開閉させます。

**【課題3】**

* **サイドメニュー**:
    マウスカーソルが画面の左端から20pxの範囲内に入ったら、サイドメニューの要素に`open`クラスを追加し、メインコンテンツを右にずらしてください。マウスカーソルがサイドメニューの領域から外れたら、`open`クラスを削除し、メインコンテンツの位置を元に戻してください。
* **ハンバーガーメニュー**:
    ハンバーガーアイコンがクリックされたら、ナビゲーションメニューの要素の`active`クラスを付け外し（トグル）してください。`active`クラスが付いたとき（メニューを開くとき）は、メニューの高さをコンテンツ全体の高さ（`scrollHeight`）に設定してください。`active`クラスが外れたとき（メニューを閉じるとき）は、高さを`null`に戻してCSSの`max-height: 0`が適用されるようにしてください。

**【考え方のヒント】**

* **要素の取得**: まずは`document.getElementById()`や`document.querySelector()`を使って、操作したいHTML要素（サイドバー、アイコン、メニューなど）をJavaScriptの変数に格納します。
* **イベント処理**: マウスの動きを検知するには`document.addEventListener('mousemove', function(e) { ... })`を使います。マウスのX座標は`e.clientX`で取得できます。マウスが要素から離れたことを検知するには`element.addEventListener('mouseleave', ...)`を使います。クリックを検知するには`element.addEventListener('click', ...)`を使います。
* **クラス操作**: クラスを追加するには`element.classList.add('クラス名')`を使います。クラスを削除するには`element.classList.remove('クラス名')`を使います。クラスを付け外し（トグル）するには`element.classList.toggle('クラス名')`が便利です。
* **スタイル操作**: JavaScriptからCSSプロパティを変更するには`element.style.プロパティ名 = '値'`と記述します。（例: `mainContent.style.marginLeft = "250px";`）
* 要素のコンテンツがどれくらいの高さを持つかは`element.scrollHeight`で取得できます。

**【解法】**
以下はJavaScriptの解答例です。各処理が何をしているのか、コメントで詳しく解説しています。

```javascript
// --- ハンバーガーメニュー機能 ---

// 1. HTMLから操作したい要素を取得し、変数に格納する
const menuToggle = document.getElementById('menu-toggle'); // ハンバーガーアイコン
const navLinks = document.getElementById('nav-links');     // ナビゲーションメニュー

// 2. 要素がページに存在する場合のみ処理を実行する（エラー防止のため）
if (menuToggle && navLinks) {
    // 3. ハンバーガーアイコンがクリックされたら、中の処理を実行するように設定する
    menuToggle.addEventListener('click', function() {
        // 'active'クラスをトグル（あれば削除、なければ追加）する
        // これにより、CSSの .nav-links.active スタイルが適用/解除される
        navLinks.classList.toggle('active');

        // 4. メニューの開閉に応じて、スライドアニメーションのための高さを設定する
        if (navLinks.classList.contains('active')) {
            // メニューを開くとき：max-heightをコンテンツの実際の高さに設定する
            // scrollHeightは、隠れている部分も含めた要素のコンテンツ全体の高さをピクセル単位で取得するプロパティ
            navLinks.style.maxHeight = navLinks.scrollHeight + "px";
        } else {
            // メニューを閉じるとき：max-heightをnullにリセットする
            // これにより、CSSで設定したmax-height: 0;が適用される
            navLinks.style.maxHeight = null;
        }
    });
}

// --- サイドメニュー機能 ---

// 1. HTMLから操作したい要素を取得し、変数に格納する
const sidebar = document.getElementById('sidebar');                 // サイドバー本体
const mainContent = document.querySelector('main');                 // メインコンテンツ
const openTriggerWidth = 20; // 画面左端からこのピクセル以内にマウスが来たら開く

// 2. サイドバー要素がページに存在する場合のみ処理を実行する
if (sidebar) {
    // 3. マウスが画面上で動いたときの処理を設定する
    document.addEventListener('mousemove', function(e) {
        // e.clientXは、ブラウザの表示領域の左端からマウスカーソルまでのX座標を取得する
        // マウスが画面の左端（openTriggerWidthで指定した範囲）に近づいたら
        if (e.clientX <= openTriggerWidth) {
            // サイドバーに'open'クラスを追加して表示させる
            sidebar.classList.add('open');
            if (mainContent) {
              // メインコンテンツに左マージンを追加して、メニューに隠れないように右へ押し出す
              mainContent.style.marginLeft = "250px"; 
            }
        }
    });

    // 4. マウスがサイドバーの領域から離れたときの処理を設定する
    sidebar.addEventListener('mouseleave', function() {
        // サイドバーから'open'クラスを削除して非表示にする
        sidebar.classList.remove('open');
        if (mainContent) {
          // メインコンテンツの左マージンを0に戻して、元の位置に表示する
          mainContent.style.marginLeft = "0"; 
        }
    });
}
```

## 4. まとめ

お疲れ様でした！この課題を通して、以下の重要なJavaScriptのテクニックを学ぶことができました。

* **DOM操作**: `getElementById`や`querySelector`でHTML要素を取得し、操作する。
* **イベントリスナー**: `addEventListener`でクリックやマウスの動きといったユーザーのアクションを検知する。
* **クラスリスト操作**: `classList`プロパティ (`add`, `remove`, `toggle`) を使って、CSSのクラスを動的に変更する。
* **スタイル操作**: `style`プロパティで、CSSを直接書き換える。
* **レスポンシブデザインとの連携**: メディアクエリで切り替えたCSSを、JavaScriptでさらに動的に制御する。

これらの知識は、Web制作において非常に応用範囲の広いものです。ぜひ色々なパターンのメニュー作成に挑戦してみてください。
