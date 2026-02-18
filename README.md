# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages（手動觸發部署）

#### 功能描述

透過 GitHub Actions workflow `deploy-pages.yml`，以手動觸發（`workflow_dispatch`）的方式，將 `main` branch 的 React app 建置並部署到 GitHub Pages。部署網址為 `https://winedays.github.io/kcouper-lovable-fe/`。

#### 使用說明

1. **前置設定（僅需一次）**：前往 GitHub repo → **Settings** → **Pages** → **Source**，選擇 **GitHub Actions**。
2. **觸發部署**：
   - 前往 GitHub repo → **Actions** 頁面
   - 左側選擇 **Deploy to GitHub Pages** workflow
   - 點選右上角 **Run workflow** 按鈕
   - Branch 選擇 `main`，點選 **Run workflow** 確認執行
3. **確認部署結果**：workflow 執行完成後，前往 `https://winedays.github.io/kcouper-lovable-fe/` 確認頁面是否正常顯示。

#### 參數說明

| 參數 | 說明 |
|------|------|
| `ref: main` | Checkout 時固定使用 `main` branch 的程式碼 |
| `node-version: 20` | 使用 Node.js 20，與專案 `.nvmrc` 一致 |
| `--base=/kcouper-lovable-fe/` | Vite build 時設定 base path，對應 GitHub Pages project site 路徑 |
| `path: dist` | 上傳 Vite 建置產出的 `dist` 目錄作為部署 artifact |

#### 注意事項

- GitHub Pages Source 必須設為 **GitHub Actions**，而非 "Deploy from a branch"，否則部署會失敗。
- Workflow 使用 `concurrency` 設定，同時間只會有一個部署在執行，且不會取消進行中的部署。
- 此 workflow 僅能手動觸發，不會在 push 或 PR 時自動執行。
- 若需要變更部署的 base path（例如改用自訂網域），需同步修改 `--base` 參數。
- Workflow 需要 `pages: write` 和 `id-token: write` 權限，這些已在 workflow 中宣告。

#### 範例：手動觸發 workflow（GitHub CLI）

```bash
gh workflow run "Deploy to GitHub Pages" --ref main
```

### Lovable

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
