process.parentPort.once('message', event => {
    const [port] = event.ports
    port.start()

    let lastTime = performance.now()

    setInterval(()=> {
        const beforeAlloc = performance.now()
        // const data = new Uint8Array(4000_0000)  // large array
        const data = new Uint8Array(4000)
        const afterAlloc = performance.now()

        const beforeSend = performance.now()
        port.postMessage(data)
        const afterSend = performance.now()

        const now = performance.now()
        // alloc's time was almost negligible, while postMessage took more than 90% of the time
        console.log(`alloc: ${parseInt(afterAlloc - beforeAlloc)}, send: ${parseInt(afterSend - beforeSend)}, time since last: ${parseInt(now - lastTime)}`)
        lastTime = now
    }, 1000 / 30)
})

