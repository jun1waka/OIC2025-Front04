// --- ハンバーガーメニュー機能 ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        // 'active'クラスをトグル（付け外し）する
        navLinks.classList.toggle('active');

        // slideToggle風の動きをJavaScriptで実装
        if (navLinks.classList.contains('active')) {
            // メニューを開くとき：max-heightをコンテンツの実際の高さに設定
            // scrollHeightは要素のコンテンツ全体の高さをピクセル単位で取得するプロパティ
            navLinks.style.maxHeight = navLinks.scrollHeight + "px";
        } else {
            // メニューを閉じるとき：max-heightをnullにリセット（CSSの0が適用される）
            navLinks.style.maxHeight = null;
        }
    });
}

// --- サイドメニュー機能 ---
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('main');
const openTriggerWidth = 20; // 画面左端からこのピクセル以内にマウスが来たら開く

if (sidebar) {
    // マウスが画面の左端に近づいたらメニューを開く
    document.addEventListener('mousemove', function(e) {
        // e.clientXはブラウザ表示領域の左端からのマウスのX座標
        if (e.clientX <= openTriggerWidth) {
            sidebar.classList.add('open');
            if (mainContent) {
              mainContent.style.marginLeft = "250px"; // メインコンテンツを押し出す
            }
        }
    });

    // マウスがサイドバー領域から離れたらメニューを閉じる
    sidebar.addEventListener('mouseleave', function() {
        sidebar.classList.remove('open');
        if (mainContent) {
          mainContent.style.marginLeft = "0"; // メインコンテンツを元の位置に戻す
        }
    });
}
