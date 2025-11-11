(function () {
    "use strict";

    // --- 各アプリの設定を定義（ここだけ編集すれば全アプリ対応） ---
    const appSettings = {
        123: { // アプリID: 123 の場合
            buttons: [
                { label: '新規登録', action: 'kintoneNewRecord', appId: 123 },
                { label: '一覧を見る', action: 'kintoneView', appId: 123 }
            ]
        },
        456: { // アプリID: 456 の場合
            buttons: [
                { label: '不良率集計を見る', action: 'open', url: '/k/789/' }
            ]
        },
        789: { // アプリID: 789 の場合
            buttons: [
                { label: '外部リンク', action: 'open', url: 'https://example.com' }
            ]
        },
        1444: {
            buttons: [
                { label: '新規登録', action: 'kintoneNewRecord', appId: 1444 },
                { label: '一覧を見る', action: 'kintoneView', appId: 1444 }
            ]
        },
    };

    // --- 共通の処理 ---
    const appId = kintone.app.getId();
    const config = appSettings[appId];
    if (!config) return; // 設定がないアプリはスキップ

    kintone.events.on('app.record.index.show', function (event) {
        if (document.getElementById('custom-common-buttons')) return;

        const space = document.createElement('div');
        space.id = 'custom-common-buttons';
        space.style.display = 'flex';
        space.style.gap = '8px';
        space.style.margin = '8px';

        config.buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.label;
            button.className = 'kintoneplugin-button-normal';
            button.onclick = () => {
                if (btn.action === 'open') {
                    window.open(btn.url, '_blank');
                } else if (btn.action === 'kintoneView') {
                    location.href = `/k/${btn.appId}/`;
                } else if (btn.action === 'kintoneNewRecord') {
                    location.href = `/k/${btn.appId}/edit`;
                }
            };
            space.appendChild(button);
        });

        kintone.app.getHeaderMenuSpaceElement().appendChild(space);
        return event;
    });
})();
