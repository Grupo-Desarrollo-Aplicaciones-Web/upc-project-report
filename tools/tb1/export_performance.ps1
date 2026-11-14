$ErrorActionPreference = 'Stop'
$taskRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$taskName = 'upc-pre-202620-1asi0730-16127-creditor-performance-tb1'
$taskDocPath = Join-Path $taskRoot ('deliverables/tb1/' + $taskName + '.docx')
$taskPdfPath = Join-Path $taskRoot ('deliverables/tb1/' + $taskName + '.pdf')
$taskEditor = $null
$taskDocument = $null
try {
    $taskEditor = New-Object -ComObject Word.Application
    $taskEditor.Visible = $false
    $taskEditor.DisplayAlerts = 0
    $taskDocument = $taskEditor.Documents.Open($taskDocPath, $false, $true)
    $taskDocument.ExportAsFixedFormat($taskPdfPath, 17)
    Write-Output ('Exported PDF via available Office-compatible COM interface: ' + $taskPdfPath)
}
finally {
    if ($taskDocument) { try { $taskDocument.Close(0) } catch {} }
    if ($taskEditor) { try { $taskEditor.Quit() } catch {} }
}
