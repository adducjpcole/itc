#Requires -Version 7.0

# Introducting the antonym to the SoC, the ToC - "tangling of concerns".
# Converts your HTML file's external CSS and JS files as inline.
#
# Supported: local CSS files (url() function and <link> element)
#            local JS files  (only <script> element)
# Unsupported: external CSS and JS files.
#
# Example Usage: ./.scripts/htm-toc.ps1 ./conversion

param (
  [string] $RepoDir,
  [string] $RootDir = "./"
)

# Find HTML file
$HtmlFile = $null
if (Test-Path $RepoDir -PathType Container) {
  $RepoDir = Convert-Path $RepoDir
  $HtmlFile = Join-Path $RepoDir "/index.html" -Resolve
}
elseif (Test-Path $RepoDir -PathType Leaf) {
  $HtmlFile = Convert-Path $RepoDir
  $RepoDir = (Split-Path -Path $RepoDir -Parent -Resolve)
}
else {
  Write-Host "error " -ForegroundColor Red -NoNewline
  Write-Host "Cannot find index.html."
  exit
}

# Check if $RootDir is valid
if (Test-Path $RootDir -PathType Container) {
  $RootDir = Convert-Path $RootDir
}
elseif (Test-Path $RootDir -PathType Leaf) {
  $RootDir = (Split-Path -Path $RootDir -Parent -Resolve)
}
else {
  Write-Host "error " -ForegroundColor Red -NoNewline
  Write-Host "Invalid page root."
  exit
}

# Create dist/ and create proper files
$DistDir = Join-Path $RepoDir "/dist"
[void](New-Item -ItemType "directory" -Path $DistDir -Force)
$DistFile = New-Item -ItemType "file" -Path (Join-Path $DistDir "/index.html") -Force

$FileStream = $DistFile.OpenWrite()
$StreamWriter = [System.IO.StreamWriter]::new($FileStream)

$StreamWriter.WriteLine("<!-- Tangled by https://github.com/cyjico -->")

function Get-UriContent {
  param (
    [string]$uri,
    [string]$baseDir = $RepoDir
  )

  $wildPath = $(
    if ($uri.StartsWith("/")) {
      "$RootDir/$uri"
    }
    else {
      "$baseDir/$uri"
    }
  )
  if (Test-Path -Path $wildPath) {
    $literalPath = Convert-Path $wildPath
    $content = Get-Content -Path $literalPath -Raw

    # Check for `url()` inside CSS content and replace with inlined content
    if ($uri -match "\.css$") {
      $content = $content -replace "@import url\(""?(?!https?://)([^""\)]+)""?\);", {
        $nestedUri = $null
        if ($_ -match "(?<=@import url\(""?)([^""\)]+)(?=""?\);)") {
          $nestedUri = $Matches[0]
        }

        # Recursively retrieve the content for the nested URI
        $nestedContent = Get-UriContent -uri $nestedUri -baseDir (Split-Path $literalPath -Parent)
        if ($nestedContent) {
          return "/* Starting of $nestedUri */`n$nestedContent`n/* Ending of $nestedUri */"
        }
      }
    }
  
    return $content
  }
  else {
    Write-Host "info " -ForegroundColor Cyan -NoNewline
    Write-Host "Unhandled URI. (uri: $uri) (baseDir: $baseDir)"
    return $null
  }
}

# Writing to the "master" index.html file
foreach ($line in [System.IO.File]::ReadLines($HtmlFile)) {
  if ($line -match "<(link|script)[^ ]*(?: (?:href|src)=`"([^`"]+)`"|(?: \w+=`"[^`"]+`"))+") {
    $tagName = $Matches.1
    $tagUri = $Matches.2

    $tagContent = Get-UriContent -uri $tagUri
    if ($tagContent) {
      # Check if the tag is a link to an external stylesheet
      if (($tagName -eq "link") -and ($Matches.0 -match "(?: rel=""stylesheet""| href=""[^""]+\.css""){2}")) {
        $tagName = "style"
      }

      $StreamWriter.WriteLine("<!-- Starting of $($line.Trim()) -->")
      $StreamWriter.WriteLine("<$tagName>")
      $StreamWriter.WriteLine("$tagContent")
      $StreamWriter.WriteLine("</$tagName>")
      $StreamWriter.WriteLine("<!-- Ending of $($line.Trim()) -->")
      continue
    }
  }

  $StreamWriter.WriteLine("$line")
}

$StreamWriter.Dispose()
$FileStream.Dispose()

Write-Host "success " -ForegroundColor Green -NoNewline
Write-Host "Generated $(Resolve-Path $DistFile -Relative)."
