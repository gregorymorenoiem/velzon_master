<#
.SYNOPSIS
  Agrega los archivos especificados en un único documento,
  incluyendo la ruta relativa de cada uno y su contenido.

.DESCRIPTION
  - Procesa únicamente los archivos listados en el array `$filesToInclude`.
  - Escribe un encabezado y luego el contenido completo de cada archivo en 'code_bundle.txt'.
  - No recorre el árbol de directorios; usa la lista explícita.
#>

# 1. Define la raíz del proyecto y el archivo de salida
$rootPath   = 'C:\scr\React-TS\React-TS\Master\'
$outputFile = Join-Path $rootPath 'code_bundle.txt'

# 2. Lista de rutas relativas a incluir (solo los paths solicitados)
$filesToInclude = @(
    'src\common\data\devicesChartData.ts',
    'src\common\data\devicesKpis.ts',
    'src\common\data\devicesMockData.ts',
    'src\common\data\index.ts',
    'src\helpers\AuthType\fakeBackend.ts',
    'src\helpers\fakebackend_helper.ts',
    'src\helpers\url_helper.ts',
    'src\slices\device\reducer.ts',
    'src\slices\device\thunk.ts',
    'src\slices\index.ts',
    'src\slices\thunks.ts',
    'src\pages\Devices\components\DeviceWizard.tsx',
    'src\pages\Devices\sections\DevicesChart.tsx',
    'src\pages\Devices\sections\DevicesKpis.tsx',
    'src\pages\Devices\sections\DevicesMap.tsx',
    'src\pages\Devices\sections\DevicesTable.tsx',
    'src\pages\Devices\sections\DeviceTestWizardModal.tsx',
    'src\pages\Devices\sections\DeviceWizardModal.tsx',
    'src\pages\Devices\sections\index.tsx',
    'src\pages\Devices\sections\MaintenanceModal.tsx',
    'src\pages\Devices\sections\SettingsModal.tsx',
    'src\pages\Devices\Devices.tsx'
)


# 3. Eliminar bundle existente si lo hay
if (Test-Path $outputFile) {
    Remove-Item $outputFile -Force
}

# 4. Escribir encabezado en el archivo
'## Code Bundle - Aggregated Files' | Out-File -FilePath $outputFile -Encoding UTF8
'' | Out-File -Append -FilePath $outputFile -Encoding UTF8

# 5. Iterar y agregar cada archivo
foreach ($relativePath in $filesToInclude) {
    $fullPath = Join-Path $rootPath $relativePath

    if (Test-Path $fullPath) {
        "---- File: $relativePath ----" | Out-File -Append -FilePath $outputFile -Encoding UTF8
        Get-Content -Path $fullPath | Out-File -Append -FilePath $outputFile -Encoding UTF8
        '' | Out-File -Append -FilePath $outputFile -Encoding UTF8
    } else {
        "## WARNING: File not found -> $relativePath" | Out-File -Append -FilePath $outputFile -Encoding UTF8
        '' | Out-File -Append -FilePath $outputFile -Encoding UTF8
    }
}

# 6. Mensaje de finalización
Write-Host "✅ Proceso completado. Bundle generado en: $outputFile"
