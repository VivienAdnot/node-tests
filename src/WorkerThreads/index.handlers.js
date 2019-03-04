const { Worker } = require('worker_threads')

function runService(workerData) {

    return new Promise((resolve, reject) => {

        const worker = new Worker('./src/WorkerThreads/service.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {

            if (code !== 0) {

                reject(new Error(`Worker stopped with exit code ${code}`));

            }

        });

    });

}

exports.runWorker = (req, res, next) => {

    runService('world')
    .then((result) => {

        res.data = result;
        next();

    })
    .catch(next);

};
