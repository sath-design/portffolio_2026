# アーキテクチャ定義 (Architecture Definition)

## 技術スタック (Technology Stack)
- **ビルドツール**: Vite
- **コアフレームワーク**: Vue.js 3 (Composition API, `<script setup>`)
- **スタイリング**: SCSS 
  - 変数管理 (`_variables.scss`) による厳格な色・フォント管理。background: `#EEEEF3`。
- **アニメーション基盤**: 
  - **GSAP (GreenSock)**: ScrollTrigger, TextPlugin を使用した複雑な演出制御。
  - **Lenis**: WebGLライクな滑らかな慣性スクロール（Inertia Scroll）の実現。
  - **Canvas API**: `BackgroundGrid.vue` 等での背景演出。

## ディレクトリ構成 (Directory Structure)
```
/root
├── docs/                 # プロジェクトドキュメント
├── src/
│   ├── components/       # Vueコンポーネント
│   │   ├── genome/       # SkillGrid.vue (スキル一覧セクション)
│   │   ├── home/         # Hero.vue, ContentSections.vue (Works, Philosophy)
│   │   └── common/       # Header.vue, Footer.vue, BackgroundGrid.vue, LoadingScreen.vue
│   ├── assets/           # 静的リソース
│   │   └── data/         # skills.json (実績データ)
│   ├── styles/           # SCSS
│   │   ├── _variables.scss # Light Mode配色定義
│   │   ├── _mixins.scss    
│   │   ├── _typography.scss # Suisse Typography定義
│   │   └── main.scss       # グローバルエントリ
│   ├── App.vue
│   └── main.js
├── public/
└── package.json
```

## データ構造 (Data Structure - Genome)
### スキルノード (Skill Node)
```json
{
  "id": "node_001",
  "label": "Web Design",
  "category": "Creative", // Creative | Engineering | Business
  "magnitude": 0.8,       // 0.0 - 1.0 (ノードの大きさ/重要度)
  "connections": ["node_002", "node_005"], // 関連スキルへのID参照
  "details": {
    "description": "Swiss Style, UI/UX",
    "achievements": [ "Project A", "Award B" ]
  }
}
```
