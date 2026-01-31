# 1. プロジェクト・ビジョン
名称: SHIGEHARU IMOTO Portfolio 2026
コンセプト: 「Kinetic Swiss & Interactive Genome」
Ryden.co.jp にインスパイアされた、静謐なスイス・スタイルと動的なキネティック・タイポグラフィの融合。慣性スクロール（Lenis）とGSAPを駆使し、ユーザーの操作に呼応して情報が「解読（Cipher）」され、線が走り、空間が再構築される没入型ポートフォリオ。

# 2. 開発者のアイデンティティ：井本 芝栄（SHIGEHARU IMOTO）
肩書き: Full-stack Creative Technologist / Web Designer
経歴: 16年以上のキャリア。大規模開発（SEGAプロジェクト等）から、個人事業（NFT/Web3/サービス開発）まで横断的な知見を持つ。
強み: 「作る」だけで終わらせず、市場価値や収益（1.52 ETH / note収益等）へ変換できる実装力とビジネス視点。
人間性: 論理的かつ前衛的。技術を「情緒的な体験」へと昇華させる探究心。

# 3. デザイン・レギュレーション（Light Mode / Ryden Style）
AIは以下の原則を全てのコンポーネントに適用すること。

- **配色**:
  - 背景: `#EEEEF3` (落ち着いたオフホワイト)
  - 文字: `#111111` (完全な黒ではなく、視認性の高いダークグレー/黒)
  - アクセント: `#000000` (太さと動きで強調)

- **タイポグラフィ**:
  - 欧文: `Outfit` (Display, Weight 700/900), `Inter` (Body)
  - 和文: `Noto Sans JP`
  - 演出: 巨大なタイポグラフィ（`clamp`使用）、改行を許さない一行表示（`white-space: nowrap`）、サイファー（解読）アニメーション。

- **レイアウト**:
  - グリッドシステム: 12カラムグリッドを基本としつつ、あえて枠をはみ出す（Breakout）フルスクリーン演出を多用する。
  - 余白: 圧倒的なネガティブスペース。

# 4. インタラクション仕様：Kinetic Order
- **Cipher Reveal**: 見出しは「A -> B -> ...」と高速で文字コードが遷移し、解読される演出で表示する。
- **Full-screen Underline**: 見出しの出現と同時に、極太（15px）の黒いラインが画面の左端から右端まで（`100vw`）を横断する。
- **Inertia Scroll (Lenis)**: 全体に慣性スクロールを適用し、「重厚感」と「滑らかさ」を両立させる。
- **Parallax**: 背景や画像はスクロール速度とずらして配置し、奥行きを演出する。

# 5. 技術スタック・ディレクトリ構成
- **Core**: Vue.js 3 (Composition API)
- **Styling**: SCSS (Scoped & Global Variables)
- **Animation**: GSAP (ScrollTrigger, TextPlugin), Lenis (Smooth Scroll)
- **Background**: Canvas API (Custom Grid Animation)

**主要ディレクトリ**:
- `/src/components/home/`: ヒーロー、イントロ、作品一覧（Works）
- `/src/components/genome/`: スキル詳細（Sticky Parallax Grid）
- `/src/styles/`: global styles, variables

# 6. AIへの動作命令
- 常に `docs/progress.log` を確認し、前回の意思決定を継承すること。
- コードを生成する前に、その設計が「Rydenスタイル（動的かつ静謐）」に合致しているか自己検証せよ。
- 「過剰な色数」よりも「動きの質感（イージング）」と「黒のインパクト」にリソースを割け。
- **言語設定**: ユーザーとの対話、および `implementation_plan.md` 等の作成計画は**常に日本語**で行うこと。