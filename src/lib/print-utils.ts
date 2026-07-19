export function printElement(id: string, title?: string) {
  const el = document.getElementById(id)
  if (!el) return
  const original = document.title
  if (title) document.title = title
  const clone = el.cloneNode(true) as HTMLElement
  const wrapper = document.createElement("div")
  wrapper.appendChild(clone)
  wrapper.style.cssText = "direction:rtl;padding:20px;font-family:Cairo,sans-serif"
  const win = window.open("", "_blank")
  if (!win) return
  win.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="utf-8"><title>${title || "طباعة"}</title>`)
  const styles = document.querySelectorAll("style,link[rel=stylesheet]")
  styles.forEach((s) => win.document.head.appendChild(s.cloneNode(true)))
  win.document.write(`<style>@page { margin: 1cm } body { font-family: Cairo, sans-serif; }</style>`)
  win.document.write("</head><body>")
  win.document.body.appendChild(wrapper)
  win.document.write("</body></html>")
  win.document.close()
  setTimeout(() => { win.focus(); win.print(); win.close() }, 500)
  document.title = original
}

export function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const rows = data.map((row) => headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))
  const csv = [headers.join(","), ...rows].join("\r\n")
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = `${filename}.csv`; a.click()
  URL.revokeObjectURL(url)
}

export function downloadExcel(data: Record<string, unknown>[], filename: string) {
  let html = "<table>"
  if (data.length) {
    html += "<tr>" + Object.keys(data[0]).map((k) => `<th>${k}</th>`).join("") + "</tr>"
    data.forEach((row) => {
      html += "<tr>" + Object.values(row).map((v) => `<td>${v ?? ""}</td>`).join("") + "</tr>"
    })
  }
  html += "</table>"
  const blob = new Blob(["\uFEFF" + html], { type: "application/vnd.ms-excel;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = `${filename}.xls`; a.click()
  URL.revokeObjectURL(url)
}

export function downloadPDF(elementId: string, filename: string) {
  const el = document.getElementById(elementId)
  if (!el) return
  const clone = el.cloneNode(true) as HTMLElement
  const wrapper = document.createElement("div")
  wrapper.appendChild(clone)
  wrapper.style.cssText = "direction:rtl;padding:20px;font-family:Cairo,sans-serif"
  const win = window.open("", "_blank")
  if (!win) return
  win.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="utf-8"><title>${filename}</title>`)
  const styles = document.querySelectorAll("style,link[rel=stylesheet]")
  styles.forEach((s) => win.document.head.appendChild(s.cloneNode(true)))
  win.document.write(`<style>@page { margin: 1cm } body { font-family: Cairo, sans-serif; }</style>`)
  win.document.write("</head><body>")
  win.document.body.appendChild(wrapper)
  win.document.write("</body></html>")
  win.document.close()
}

export type ExportFormat = "csv" | "excel" | "pdf" | "print"

export function handleExport(format: ExportFormat, data: Record<string, unknown>[], elementId: string, filename: string) {
  switch (format) {
    case "csv": return downloadCSV(data, filename)
    case "excel": return downloadExcel(data, filename)
    case "pdf": return downloadPDF(elementId, filename)
    case "print": return printElement(elementId, filename)
  }
}
