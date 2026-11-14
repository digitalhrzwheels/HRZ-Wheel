Write-Host "🔄 Rebuilding site with latest Hashnode posts..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! Deploying to Cloudflare..." -ForegroundColor Green
   wrangler pages deploy dist --project-name=hrz-wheel
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Deploy completed successfully!" -ForegroundColor Green
        Write-Host "🌐 Your blog is now updated at: https://hrz-wheels.pages.dev/blog" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Deploy failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
}
