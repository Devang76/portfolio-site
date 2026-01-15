
$msg = Read-Host "Enter a description of your changes (Press Enter for default)"
if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "Update portfolio content" }

Write-Host "Stage 1: Adding files..."
git add .

Write-Host "Stage 2: Committing changes..."
git commit -m "$msg"

Write-Host "Stage 3: Pushing to GitHub..."
git push origin main

Write-Host "---------------------------------------------------"
Write-Host "Success! Your changes are on their way to GitHub."
Write-Host "Your hosting platform (Render/Vercel) will detect this and update the live site automatically in 1-2 minutes."
Write-Host "---------------------------------------------------"
Pause
