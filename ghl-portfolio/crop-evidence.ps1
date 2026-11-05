Add-Type -AssemblyName System.Drawing
$buyerSource = (Get-ChildItem 'C:/Users/USER/Downloads' -Filter 'screencapture-app-notion-p-Phase-II-Wall-Street*').FullName
$funnelSource = (Get-ChildItem 'C:/Users/USER/Downloads' -Filter 'screencapture-app-notion-p-FULL-HBW*').FullName
function Save-EvidenceCrop($source, $slug, $name, $x, $y, $w, $h) {
 $folder=Join-Path (Get-Location) ('ghl-portfolio/dist/projects/'+$slug)
 New-Item -ItemType Directory -Path $folder -Force | Out-Null
 $image=[System.Drawing.Bitmap]::FromFile($source)
 $crop=$image.Clone([System.Drawing.Rectangle]::new($x,$y,$w,$h),[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
 $crop.Save((Join-Path $folder $name),[System.Drawing.Imaging.ImageFormat]::Png)
 $crop.Dispose();$image.Dispose()
}
Save-EvidenceCrop $buyerSource 'real-estate-buyer-follow-up' 'pipeline.png' 540 1245 595 315
Save-EvidenceCrop $buyerSource 'real-estate-buyer-follow-up' 'email-templates.png' 625 1810 270 255
Save-EvidenceCrop $buyerSource 'real-estate-buyer-follow-up' 'workflows.png' 525 2770 610 320
Save-EvidenceCrop $funnelSource 'real-estate-funnel-automation' 'registration-workflow.png' 438 1128 704 306
Save-EvidenceCrop $funnelSource 'real-estate-funnel-automation' 'attendee-workflow.png' 438 1748 704 306

