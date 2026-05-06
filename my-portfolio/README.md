# 個人作品集網站

使用 **React + TypeScript** 開發的個人作品集，包含三個主要區塊：

| 區塊 | 說明 |
|------|------|
| 網站介紹 | 技術架構、功能說明 |
| 個人簡介 | 自我介紹、技能、學習歷程 |
| 小遊戲 | 程式術語猜字遊戲（Hangman） |

## 技術棧

- React 18
- TypeScript 5
- Vite 5
- CSS Modules
- GitHub Actions（自動部署）

---

## 部署到 GitHub Pages（步驟）

### 1. 建立 GitHub Repository

到 [GitHub](https://github.com) 新增一個公開 Repository，名稱例如 `my-portfolio`。

### 2. 上傳程式碼

```bash
cd my-portfolio
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/my-portfolio.git
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 進入 Repository → **Settings** → **Pages**
2. **Source** 選 `GitHub Actions`
3. 儲存後等待 Actions 自動執行

### 4. 完成！

約 1-2 分鐘後，網站會部署到：

```
https://你的帳號.github.io/my-portfolio/
```

---

## 本機開發

```bash
npm install
npm run dev
```

## 打包

```bash
npm run build
```
