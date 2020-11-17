const {exec}= require('child_process');

async function temp() {
    executeStuff()
    console.log('this is js code before time out')
    setTimeout(() => {
        console.log('this is js code')
    }, 3)
}

function executeStuff() {
    exec('python3 trial.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });    
} 

temp()