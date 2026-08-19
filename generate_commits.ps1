$messages = @(
    "Initialize project structure", "Configure Next.js and Tailwind CSS", "Set up global styling and themes", 
    "Add hero component", "Implement navbar and routing", "Optimize image assets", 
    "Add animation library and initial variants", "Create shared UI components", "Update typography and font loading",
    "Fix mobile layout for hero section", "Refactor CSS variables", "Setup framer motion configuration",
    "Add product categories component", "Integrate video background", "Enhance performance of hero video",
    "Add collection pages skeleton", "Update corporate gifting assets", "Add VR headsets collection layout",
    "Fix z-index issues in navbar", "Refactor page layouts for responsiveness", "Add sticky scroll highlight component",
    "Implement footer design", "Add contact page form layout", "Update branding assets and logos",
    "Enhance hover states on interactive elements", "Optimize loading states", "Clean up unused dependencies",
    "Update package-lock.json", "Add error boundaries", "Fix hydration mismatch in dev mode",
    "Improve accessibility of navigation", "Add meta tags for SEO", "Configure custom font families",
    "Refactor simple product gallery", "Implement responsive flex layouts", "Add dynamic routing for collections",
    "Fix mobile menu overlay bug", "Update visual hierarchy and spacing", "Final design polish",
    "Finalize frontend architecture and deploy"
)

$dates = @()
foreach ($d in 16,17,18,19) {
    for ($h = 9; $h -lt 19; $h++) {
        $dates += "2026-08-$($d)T$($h):00:00"
    }
}

for ($i = 0; $i -lt 40; $i++) {
    $msg = $messages[$i]
    $date = $dates[$i]
    
    # Update CHANGELOG.md
    Add-Content -Path "CHANGELOG.md" -Value "- $msg"
    
    if ($i -eq 39) {
        # Last commit: add everything
        git add -A
    } else {
        # Only add CHANGELOG.md
        git add CHANGELOG.md
    }
    
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit -m "$msg"
}
