$ErrorActionPreference = 'Stop'
$docs = 'C:\Users\Lenovo\Desktop\hku\med-safe\docs'
$pairs = @(
  @{ zh = 'decision-logic.md'; en = 'decision-logic.en.md' },
  @{ zh = 'offline.md';        en = 'offline.en.md' },
  @{ zh = 'submission.md';     en = 'submission.en.md' },
  @{ zh = 'data-inventory.md'; en = 'data-inventory.en.md' }
)

function Get-Info($path) {
  $lines = [System.IO.File]::ReadAllLines($path)
  $headings = @(); $tables = @(); $bullets = 0; $ordered = 0; $quotes = 0; $fences = 0
  $i = 0
  $curTable = $null
  while ($i -lt $lines.Count) {
    $l = $lines[$i]
    if ($l -match '^#{1,6} ') { $headings += $l }
    elseif ($l -match '^- ') { $bullets++ }
    elseif ($l -match '^\d+\. ') { $ordered++ }
    elseif ($l -match '^>') { $quotes++ }
    elseif ($l -match '^```') { $fences++ }
    if ($l -match '^\|') {
      $cols = ($l.Trim('|') -split '\|').Count
      if ($null -eq $curTable) { $curTable = @{ rows = 0; cols = @() } }
      $curTable.rows++
      $curTable.cols += $cols
    } elseif ($null -ne $curTable) {
      $tables += ("rows=$($curTable.rows) cols=$(($curTable.cols | Select-Object -Unique) -join ',')")
      $curTable = $null
    }
    $i++
  }
  if ($null -ne $curTable) { $tables += ("rows=$($curTable.rows) cols=$(($curTable.cols | Select-Object -Unique) -join ',')") }
  return [pscustomobject]@{
    Lines = $lines.Count; Headings = ($headings -join ' ;; ')
    Tables = ($tables -join ' ;; '); Bullets = $bullets; Ordered = $ordered
    Quotes = $quotes; Fences = $fences
  }
}

foreach ($p in $pairs) {
  $zh = Get-Info (Join-Path $docs $p.zh)
  $en = Get-Info (Join-Path $docs $p.en)
  Write-Output "=== $($p.zh)  /  $($p.en) ==="
  Write-Output ("  lines      zh={0}  en={1}" -f $zh.Lines, $en.Lines)
  Write-Output ("  headings#  zh={0}  en={1}" -f (($zh.Headings -split ' ;; ').Count), (($en.Headings -split ' ;; ').Count))
  Write-Output ("  tables     zh=[{0}]" -f $zh.Tables)
  Write-Output ("             en=[{0}]" -f $en.Tables)
  Write-Output ("  bullets    zh={0}  en={1}" -f $zh.Bullets, $en.Bullets)
  Write-Output ("  ordered    zh={0}  en={1}" -f $zh.Ordered, $en.Ordered)
  Write-Output ("  quotes     zh={0}  en={1}" -f $zh.Quotes, $en.Quotes)
  Write-Output ("  fences     zh={0}  en={1}" -f $zh.Fences, $en.Fences)
}
