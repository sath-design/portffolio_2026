# 1. プロジェクト基本要件：Interactive Skill Genome (Ryden Style)
| 項目 | 内容 |
|---|---|
| サイト名称 | SHIGEHARU IMOTO Portfolio 2026 |
| 開発環境 | Antigravity (AI-native Coding) |
| コア機能 | Vue 3 + Lenis + GSAP による「キネティック・スクロール体験」。<br>文字解読演出 (Cipher) と全幅ラインアニメーション。 |
| デザイン原則 | **Ryden Style** (Light Mode / Swiss Typographic / Kinetic) |
| 配色 | Bg: `#EEEEF3`, Text: `#111111`, Accent: `#000000` |

# 2. ディレクトリ構成（AI可読性重視）
AIが各filesの役割を即座に把握し、循環参照を防ぐためのクリーンな構成です。

```
/root
├── docs/                 # 【最重要】AIの記憶保持用ドキュメント
│   ├── context.md        # プロジェクトの魂（コンセプト、デザイン原則）
│   ├── task.md           # タスクリスト
│   └── architecture.md   # 技術スタック詳細
├── src/
│   ├── components/       # UIコンポーネント (Vue 3, <script setup>)
│   │   ├── genome/       # SkillGrid (Sticky Parallax)
│   │   ├── home/         # Hero, ContentSections (Works, Philosophy)
│   │   └── common/       # Header, Footer, BackgroundGrid
│   ├── assets/           # 画像、フォント、データ（skills.json）
│   └── styles/           # SCSS (Global mixins, variables, reset)
├── public/
└── package.json
```

# 3. 実装フェーズ（Current: Phase 6）
AIへの指示を出す際の「フェーズ」分けです。

- **Phase 1-2**: 環境構築と基本レイアウト [完了]
- **Phase 3**: アニメーション基盤 (GSAP, ScrollTrigger) 導入 [完了]
- **Phase 4**: コンテンツ実装 (Hero, Works Prototype) [完了]
- **Phase 5**: **Ryden Style Deep Dive** [完了]
  - Light Mode化 (`#EEEEF3`)
  - "Cipher" テキストアニメーション
  - 全幅下線演出 (`100vw` Breakout)
  - 2カラムグリッド Works
- **Phase 6**: **Refinement & Integrity** [現在進行中]
  - ドキュメント整合性の確保
  - モバイルレスポンシブの最終調整
  - パフォーマンスチューニング

# 4. コンテキスト維持
- `docs/context.md`: デザインの絶対的なルールブック。迷ったらここに戻る。
- `src/styles/_variables.scss`: 色やフォントの単一情報源（SSOT）。

# 5. バージョン管理
- コミット前に必ず `npm run dev` で動作確認を行う。
- アニメーションの変更時は「イージング（動きの質感）」を言葉で説明してUserの承認を得る。

