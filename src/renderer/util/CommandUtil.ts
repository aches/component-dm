const copydir = require('copy-dir');
const path = require('path');
export class CommandUtil {


   static execPackageCmd(workspace: string, outputPath:string ,folder: string, target: string, processCall: Function, errorCall: Function): Promise<boolean> {
       console.log(workspace,folder,target)
       return new Promise<boolean>((resolve, reject) =>{
            const { spawn } = require('child_process');
            let result = true;
            //const ls = spawn(/^win/.test(process.platform) ? 'cmd.exe' : 'sh', ['dir'],{ cwd : path });
            //const ls = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['--version'],{ cwd : path });
            //['run','dev','--folder=widget\biology\r12','--target=r12_jytbqs'],
            const ls = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm',
                ['run','build',`${folder}/Main`],
                { cwd : workspace ,killSignal :'WIDGET'});
            //npm run dev --folder=D:\Workspaces\huohua_component\widget\biology\r12 --target=r12_jytbqs
            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                processCall(data);
            });

            ls.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
                result = false;
                errorCall(data);

            });

            ls.on('close', (code) => {
                const distPath = path.join(workspace,'dist');
                const output = path.join(outputPath,target);
                console.info('from', distPath);
                console.info('to', output);
                //copydir.sync(distPath, output);

                console.log(`子进程退出码：${code}`);

                resolve(result);
            });
        });

        //删除进程
        //ls.kill('SIGTERM')
    }
}