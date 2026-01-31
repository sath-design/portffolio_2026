# 1. プロジェクト基本要件：Interactive Skill Genome (Ryden Style)
| 項目 | 内容 |
|---|---|
| サイト名称 | SHIGEHARU IMOTO Portfolio 2026 |
| 本番URL | https://ariesplus.com/portfolio_2026/ |
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

- **Phase 1-5**: Foundation & Ryden Style Core [完了]
- **Phase 6-11**: Refinement, Content & Interaction [完了]
- **Phase 12**: Visual Impact & Professional Tone [完了]
- **Renovation**: Recruiter Appeal Enhancement (Works/Modal) [完了]
- **Current Phase**: **Final Polish & Verification** [現在進行中]
  - ドキュメント整合性の確保
  - 最終ビルドとデプロイ前の実機確認 (Post-Deployment Check)

# 4. コンテキスト維持
- `docs/context.md`: デザインの絶対的なルールブック。迷ったらここに戻る。
- `src/styles/_variables.scss`: 色やフォントの単一情報源（SSOT）。

# 5. バージョン管理
- コミット前に必ず `npm run dev` で動作確認を行う。
- アニメーションの変更時は「イージング（動きの質感）」を言葉で説明してUserの承認を得る。

