param(
    [string]$OutputDir = (Join-Path $PSScriptRoot '../../deliverables/tb1/expositores')
)

# Use a new hidden Word instance; never attach to the user's active documents.
$ErrorActionPreference = 'Stop'
$taskDirectory = (Resolve-Path -LiteralPath $OutputDir).Path
foreach ($taskPerson in @('juan-manuel', 'sebastian', 'miguel-angel')) {
    $taskWord = $null
    $taskDocument = $null
    try {
        $taskWord = New-Object -ComObject Word.Application
        $taskWord.Visible = $false
        $taskWord.DisplayAlerts = 0
        $taskWord.AutomationSecurity = 3
        $taskDocx = Join-Path $taskDirectory "creditor-tb1-guion-$taskPerson.docx"
        $taskPdf = Join-Path $taskDirectory "creditor-tb1-guion-$taskPerson.pdf"
        if (-not (Test-Path -LiteralPath $taskDocx -PathType Leaf)) {
            throw "Missing document: $taskDocx"
        }
        $taskDocument = $taskWord.Documents.Open($taskDocx, $false, $true)
        $taskDocument.Repaginate()
        $taskDocument.ExportAsFixedFormat($taskPdf, 17)
        Write-Output $taskPdf
    }
    finally {
        if ($null -ne $taskDocument) {
            try {
                $taskDocument.Close(0)
            }
            catch {
                if ($_.Exception.HResult -notin @(-2147023174, -2147023170)) { throw }
            }
        }
        if ($null -ne $taskWord) {
            try {
                $taskWord.Quit(0)
            }
            catch {
                # A hidden Word instance may exit when its last document closes.
                if ($_.Exception.HResult -notin @(-2147023174, -2147023170)) { throw }
            }
        }
        if ($null -ne $taskDocument) {
            [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskDocument)
        }
        if ($null -ne $taskWord) {
            [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskWord)
        }
    }
}
