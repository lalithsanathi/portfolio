#!/usr/bin/env node
// Wraps `vite` so you always see clear status.
// Vite 8 (Rolldown) has a ~30-40s silent cold start; this keeps you informed
// and prints a big banner the moment the server actually responds.

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import http from 'node:http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const viteBin = resolve(__dirname, '..', 'node_modules', '.bin', 'vite')

const PORT = Number(process.env.PORT) || 5173
const URL = `http://localhost:${PORT}/`
// Poll over IPv4 explicitly — Node 22's default DNS order prefers ::1,
// but vite binds IPv4 by default, so localhost pings would silently fail.
const PING_URL = `http://127.0.0.1:${PORT}/`

const c = {
  dim:   (s) => `\x1b[2m${s}\x1b[0m`,
  bold:  (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan:  (s) => `\x1b[36m${s}\x1b[0m`,
  yellow:(s) => `\x1b[33m${s}\x1b[0m`,
}

const start = Date.now()
process.stdout.write(
  `\n${c.cyan('◐')} ${c.bold('starting vite dev server')} ${c.dim('(vite 8 cold start is ~30-40s, hang tight)')}\n` +
  `${c.dim('  target → ')}${c.cyan(URL)}\n\n`
)

const child = spawn(viteBin, ['--host', ...process.argv.slice(2)], {
  stdio: ['inherit', 'inherit', 'inherit'],
  env: process.env,
})

const forward = (sig) => () => child.kill(sig)
process.on('SIGINT', forward('SIGINT'))
process.on('SIGTERM', forward('SIGTERM'))
child.on('exit', (code) => process.exit(code ?? 0))

let announced = false
const ping = () =>
  new Promise((res) => {
    const req = http.get(PING_URL, { family: 4 }, (r) => {
      r.resume()
      res(Boolean(r.statusCode && r.statusCode < 500))
    })
    req.on('error', () => res(false))
    req.setTimeout(1000, () => { req.destroy(); res(false) })
  })

;(async () => {
  const deadlineMs = 120_000
  const t0 = Date.now()
  while (!announced && Date.now() - t0 < deadlineMs) {
    await new Promise((r) => setTimeout(r, 500))
    if (await ping()) {
      const secs = ((Date.now() - start) / 1000).toFixed(1)
      process.stdout.write(
        `\n${c.green('●')} ${c.bold('ready')} ${c.dim(`in ${secs}s`)}  →  ${c.cyan(URL)}\n\n`
      )
      announced = true
      break
    }
  }
  if (!announced) {
    process.stdout.write(
      `\n${c.yellow('!')} ${c.bold('vite did not respond after 120s')} ${c.dim('— check output above for errors')}\n\n`
    )
  }
})()
